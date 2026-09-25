"""Synthetic EV charging logs with a known true battery capacity.

Stands in for real cars until real OBD logs exist. Each car has a true SoH
that the estimator never sees, plus the error sources a real logger has:

- current sensor gain/offset error (fixed per car) and noise
- pack voltage gain error (fixed per car) and noise
- voltage hysteresis (rested voltage sits a few mV below OCV after driving,
  above OCV after charging)
- incomplete relaxation when the logger stops soon after charging
- the real cell's OCV curve differing from the generic curve the estimator
  assumes (ageing and cell-to-cell variation), which does not average out
- a BMS whose own SoH figure is biased (typically optimistic), which also
  drives the displayed SoC
"""

from dataclasses import dataclass, asdict

import numpy as np

from . import ocv
from .log import Session


@dataclass
class Car:
    car_id: str
    n_series: int
    nominal_ah: float
    true_soh: float
    bms_soh: float          # what the car reports
    i_gain: float           # current sensor gain error
    i_offset_a: float
    v_gain: float           # pack voltage sensor gain error
    hysteresis_v: float     # per-cell hysteresis magnitude
    ocv_distort_v: float    # per-cell deviation from the generic OCV curve (mid-SoC peak)
    pack_r_ohm: float

    @property
    def true_ah(self) -> float:
        return self.true_soh * self.nominal_ah

    def cell_ocv(self, soc: float) -> float:
        return float(ocv.ocv(soc)) + self.ocv_distort_v * np.sin(np.pi * soc)

    def to_dict(self) -> dict:
        return asdict(self)


def make_car(rng: np.random.Generator, car_id: str, true_soh: float | None = None) -> Car:
    true_soh = float(rng.uniform(0.78, 0.99)) if true_soh is None else true_soh
    bms_bias = rng.normal(0.02, 0.02)  # BMS figures tend to read high
    return Car(
        car_id=car_id,
        n_series=96,
        nominal_ah=180.0,  # ~64 kWh pack at 96s
        true_soh=true_soh,
        bms_soh=float(min(1.0, true_soh + bms_bias)),
        i_gain=float(rng.normal(1.0, 0.004)),
        i_offset_a=float(rng.normal(0.0, 0.15)),
        v_gain=float(rng.normal(1.0, 0.0005)),
        hysteresis_v=float(abs(rng.normal(0.003, 0.001))),
        ocv_distort_v=float(rng.normal(0.0, 0.004)),
        pack_r_ohm=0.10,
    )


def simulate_session(rng: np.random.Generator, car: Car, name: str,
                     soc_start: float, soc_end: float, power_w: float,
                     rest_after_s: float, dt: float = 10.0) -> Session:
    n = car.n_series
    q_true = car.true_ah
    q_bms = car.bms_soh * car.nominal_ah
    tau_s, rp_ohm = 600.0, 0.05  # pack polarization (RC) time constant and resistance

    # Residual from driving before plug-in decays with (unknown) parking time.
    park_s = rng.exponential(7200.0)
    vp = -0.006 * n * np.exp(-park_s / 900.0)
    hyst = -car.hysteresis_v * n  # rested after discharge: below OCV

    soc = soc_start
    soc_bms = soc_start + rng.normal(0.0, 0.01)
    temp = rng.uniform(8.0, 25.0)
    t, rows = 0.0, []

    def record(i_true):
        v_true = n * car.cell_ocv(soc) + hyst + vp + i_true * car.pack_r_ohm
        i_meas = i_true * car.i_gain + car.i_offset_a * (i_true > 0) + rng.normal(0, 0.3)
        v_meas = v_true * car.v_gain + rng.normal(0, 0.05)
        rows.append((t, i_meas, v_meas, 100 * soc_bms, temp))
        return i_meas

    # 1 minute plugged in before current flows.
    for _ in range(6):
        record(0.0)
        t += dt

    # Charge at constant power, tapering near full.
    while soc < soc_end:
        v_est = n * float(ocv.ocv(soc))
        taper = 1.0 if soc < 0.9 else max(0.25, (1.0 - soc) / 0.1)
        i = power_w * taper / v_est
        vp += (i * rp_ohm - vp) * (dt / tau_s)
        hyst += (car.hysteresis_v * n - hyst) * min(1.0, dt * i / (0.05 * q_true * 3600))
        i_meas = record(i)
        soc += i * dt / 3600 / q_true
        soc_bms += i_meas * dt / 3600 / q_bms
        t += dt

    # Rest: polarization relaxes toward zero; hysteresis stays.
    steps = int(rest_after_s / dt)
    for _ in range(steps):
        vp *= np.exp(-dt / tau_s)
        record(0.0)
        t += dt

    arr = np.array(rows)
    return Session(name, arr[:, 0], arr[:, 1], arr[:, 2], arr[:, 3], arr[:, 4])


def simulate_car_sessions(rng: np.random.Generator, car: Car, n_sessions: int) -> list[Session]:
    sessions = []
    for k in range(n_sessions):
        if rng.random() < 0.35:  # short top-up
            s0 = rng.uniform(0.40, 0.70)
            s1 = min(0.98, s0 + rng.uniform(0.10, 0.25))
        else:
            s0 = rng.uniform(0.08, 0.45)
            s1 = rng.uniform(0.75, 1.00)
        power = rng.choice([7_400.0, 11_000.0, 50_000.0], p=[0.4, 0.45, 0.15])
        rest = rng.choice([300.0, 1200.0, 2700.0, 5400.0], p=[0.25, 0.25, 0.3, 0.2])
        sessions.append(simulate_session(rng, car, f"session_{k:03d}", s0, s1, power, rest))
    return sessions
