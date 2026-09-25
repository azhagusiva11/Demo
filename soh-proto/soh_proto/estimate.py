"""Independent battery capacity estimate from charging sessions.

Method (per session):
    capacity = charge put in [Ah] / (SoC_after - SoC_before)
where both SoC values come from the *rested pack voltage* via the OCV curve,
not from the BMS. Using the BMS's displayed SoC instead would be circular:
the BMS integrates current against its own capacity figure, so Ah / dSoC_bms
just gives back the BMS's own number, bias included (see naive_bms_capacity).

Sessions are combined by inverse-variance weighting. Per-session SoC error is
propagated from voltage error through the local OCV slope, so wide windows in
steep parts of the curve count most. Per-car systematic errors (current sensor
gain, OCV curve mismatch) don't average down and are added as a floor.
"""

from dataclasses import dataclass, field

import numpy as np

from . import ocv
from .log import Session


@dataclass
class Config:
    n_series: int = 96
    nominal_ah: float = 180.0
    charge_threshold_a: float = 1.0
    min_rest_s: float = 1800.0       # post-charge relaxation needed for a usable voltage
    min_window: float = 0.30         # minimum SoC swing per session
    hysteresis_v: float = 0.003      # assumed per-cell hysteresis correction
    sigma_v_cell: float = 0.0025     # per-cell rested-voltage uncertainty [V]
    sys_current_gain: float = 0.005  # 1-sigma current sensor gain error
    sys_ocv_model: float = 0.008     # 1-sigma error from OCV curve mismatch


@dataclass
class SessionResult:
    name: str
    used: bool
    reason: str = ""
    soc_start: float = np.nan
    soc_end: float = np.nan
    charge_ah: float = np.nan
    capacity_ah: float = np.nan
    sigma_ah: float = np.nan
    bms_capacity_ah: float = np.nan


@dataclass
class CarResult:
    capacity_ah: float
    soh: float
    ci95: float                      # half-width, in SoH units
    n_used: int
    n_total: int
    naive_bms_soh: float             # what Ah / dSoC_bms gives (tracks the BMS)
    sessions: list[SessionResult] = field(default_factory=list)


def analyse_session(s: Session, cfg: Config) -> SessionResult:
    charging = np.flatnonzero(s.current_a > cfg.charge_threshold_a)
    if charging.size == 0:
        return SessionResult(s.name, False, "no charging current")
    i0, i1 = charging[0], charging[-1]
    if i0 == 0:
        return SessionResult(s.name, False, "no rested voltage before charge")

    rest_s = s.time_s[-1] - s.time_s[i1]
    if rest_s < cfg.min_rest_s:
        return SessionResult(s.name, False, f"rest after charge {rest_s / 60:.0f} min < {cfg.min_rest_s / 60:.0f} min")

    v_pre = np.median(s.pack_voltage_v[:i0]) / cfg.n_series + cfg.hysteresis_v
    v_post = np.median(s.pack_voltage_v[-3:]) / cfg.n_series - cfg.hysteresis_v
    soc0, soc1 = float(ocv.soc_from_ocv(v_pre)), float(ocv.soc_from_ocv(v_post))
    window = soc1 - soc0

    charge_ah = float(np.trapezoid(np.clip(s.current_a, 0, None), s.time_s) / 3600)
    d_bms = (s.soc_bms_pct[i1 + 1] - s.soc_bms_pct[max(i0 - 1, 0)]) / 100
    bms_cap = charge_ah / d_bms if d_bms > 0.05 else np.nan

    res = SessionResult(s.name, False, "", soc0, soc1, charge_ah, bms_capacity_ah=bms_cap)
    if window < cfg.min_window:
        res.reason = f"SoC window {window:.0%} < {cfg.min_window:.0%}"
        return res

    sig_soc = np.hypot(cfg.sigma_v_cell / ocv.slope(soc0), cfg.sigma_v_cell / ocv.slope(soc1))
    res.capacity_ah = charge_ah / window
    res.sigma_ah = float(res.capacity_ah * sig_soc / window)
    res.used = True
    return res


def estimate_car(sessions: list[Session], cfg: Config) -> CarResult:
    results = [analyse_session(s, cfg) for s in sessions]
    used = [r for r in results if r.used]
    bms_caps = [r.bms_capacity_ah for r in results if np.isfinite(r.bms_capacity_ah)]
    naive = float(np.median(bms_caps)) / cfg.nominal_ah if bms_caps else np.nan

    if not used:
        return CarResult(np.nan, np.nan, np.nan, 0, len(results), naive, results)

    # Weighted mean with iterative 3-sigma outlier rejection.
    for _ in range(3):
        caps = np.array([r.capacity_ah for r in used])
        w = 1 / np.array([r.sigma_ah for r in used]) ** 2
        mean = float(np.sum(w * caps) / np.sum(w))
        keep = [r for r in used if abs(r.capacity_ah - mean) <= 3 * max(r.sigma_ah, 1e-9)]
        if len(keep) == len(used) or not keep:
            break
        for r in used:
            if r not in keep:
                r.used, r.reason = False, "outlier vs other sessions"
        used = keep

    caps = np.array([r.capacity_ah for r in used])
    w = 1 / np.array([r.sigma_ah for r in used]) ** 2
    mean = float(np.sum(w * caps) / np.sum(w))
    sig_stat = float(1 / np.sqrt(np.sum(w)))
    sig_sys = mean * np.hypot(cfg.sys_current_gain, cfg.sys_ocv_model)
    ci95 = 1.96 * np.hypot(sig_stat, sig_sys) / cfg.nominal_ah
    return CarResult(mean, mean / cfg.nominal_ah, float(ci95), len(used), len(results), naive, results)


def format_report(car_label: str, r: CarResult, bms_reported_soh: float | None = None) -> str:
    lines = [f"# Battery health estimate: {car_label}", ""]
    if not np.isfinite(r.soh):
        lines.append(f"No usable sessions ({r.n_total} logged). Need a charge of ≥30% SoC with ≥30 min rest after.")
    else:
        lines += [
            f"**Measured SoH: {r.soh:.1%} ± {r.ci95:.1%}** (95% interval)",
            f"Capacity: {r.capacity_ah:.1f} Ah from {r.n_used} of {r.n_total} sessions",
        ]
    if bms_reported_soh is not None:
        lines.append(f"Car's own (BMS) SoH: {bms_reported_soh:.1%}")
        if np.isfinite(r.soh):
            gap = bms_reported_soh - r.soh
            verdict = "DISAGREES with measurement" if abs(gap) > r.ci95 else "consistent with measurement"
            lines.append(f"BMS minus measured: {gap:+.1%} → {verdict}")
    lines += ["", "| session | used | SoC window | charge Ah | capacity Ah | note |", "|---|---|---|---|---|---|"]
    for s in r.sessions:
        win = f"{s.soc_start:.0%}→{s.soc_end:.0%}" if np.isfinite(s.soc_start) else "-"
        cap = f"{s.capacity_ah:.1f} ± {s.sigma_ah:.1f}" if np.isfinite(s.capacity_ah) else "-"
        ah = f"{s.charge_ah:.1f}" if np.isfinite(s.charge_ah) else "-"
        lines.append(f"| {s.name} | {'yes' if s.used else 'no'} | {win} | {ah} | {cap} | {s.reason} |")
    return "\n".join(lines)
