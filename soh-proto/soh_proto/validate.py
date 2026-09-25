"""Fleet validation: run the estimator on simulated cars with known true SoH.

This checks that the code and the error model hold together. It does NOT
prove real-world accuracy; that needs real cars with a reference full
discharge test.
"""

import json
from pathlib import Path

import numpy as np

from .estimate import Config, estimate_car
from .simulate import make_car, simulate_car_sessions


def run(n_cars: int = 60, seed: int = 7, out_dir: Path | None = None) -> dict:
    rng = np.random.default_rng(seed)
    cfg = Config()
    rows = []
    for k in range(n_cars):
        car = make_car(rng, f"car_{k:03d}")
        sessions = simulate_car_sessions(rng, car, int(rng.integers(4, 13)))
        r = estimate_car(sessions, cfg)
        rows.append({
            "car_id": car.car_id,
            "true_soh": car.true_soh,
            "est_soh": r.soh,
            "ci95": r.ci95,
            "bms_soh": car.bms_soh,
            "naive_bms_soh": r.naive_bms_soh,
            "n_used": r.n_used,
            "n_total": r.n_total,
        })

    ok = [x for x in rows if np.isfinite(x["est_soh"])]
    err = np.array([x["est_soh"] - x["true_soh"] for x in ok])
    bms_err = np.array([x["bms_soh"] - x["true_soh"] for x in rows])
    naive_err = np.array([x["naive_bms_soh"] - x["true_soh"] for x in rows if np.isfinite(x["naive_bms_soh"])])
    covered = np.mean([abs(x["est_soh"] - x["true_soh"]) <= x["ci95"] for x in ok])

    def stats(e):
        return {
            "bias_pts": round(100 * float(np.mean(e)), 2),
            "mae_pts": round(100 * float(np.mean(np.abs(e))), 2),
            "p95_abs_pts": round(100 * float(np.percentile(np.abs(e), 95)), 2),
            "max_abs_pts": round(100 * float(np.max(np.abs(e))), 2),
            "within_3pts": round(float(np.mean(np.abs(e) <= 0.03)), 3),
        }

    summary = {
        "n_cars": n_cars,
        "cars_with_estimate": len(ok),
        "independent_method": stats(err),
        "bms_reported": stats(bms_err),
        "naive_bms_soc_method": stats(naive_err),
        "ci95_coverage": round(float(covered), 3),
        "mean_ci95_pts": round(100 * float(np.mean([x["ci95"] for x in ok])), 2),
    }

    if out_dir is not None:
        out_dir = Path(out_dir)
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "validation.json").write_text(json.dumps({"summary": summary, "cars": rows}, indent=2))
        _plot(rows, out_dir / "validation.png")
    return summary


def _plot(rows: list[dict], path: Path) -> None:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    t = np.array([x["true_soh"] for x in rows]) * 100
    e = np.array([x["est_soh"] for x in rows]) * 100
    ci = np.array([x["ci95"] for x in rows]) * 100
    b = np.array([x["bms_soh"] for x in rows]) * 100

    fig, ax = plt.subplots(figsize=(6.5, 6))
    lo, hi = 75, 101
    ax.plot([lo, hi], [lo, hi], color="#888", lw=1, label="perfect")
    ax.fill_between([lo, hi], [lo - 3, hi - 3], [lo + 3, hi + 3], color="#888", alpha=0.12, label="±3 pts")
    ax.scatter(t, b, s=22, color="#d1495b", alpha=0.7, label="car's own BMS figure")
    ax.errorbar(t, e, yerr=ci, fmt="o", ms=4, color="#2e6f9e", ecolor="#2e6f9e", alpha=0.8,
                elinewidth=0.8, label="independent estimate (95% CI)")
    ax.set(xlim=(lo, hi), ylim=(lo, hi), xlabel="true SoH (%)", ylabel="reported SoH (%)",
           title="Simulated fleet: independent estimate vs BMS")
    ax.legend(loc="upper left", frameon=False, fontsize=9)
    ax.grid(alpha=0.25)
    fig.tight_layout()
    fig.savefig(path, dpi=130)
    plt.close(fig)
