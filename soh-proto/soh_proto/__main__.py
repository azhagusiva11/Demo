"""Command line entry point.

    python -m soh_proto simulate --out data --cars 3
    python -m soh_proto estimate data/car_000 [--bms-soh 0.95]
    python -m soh_proto validate --out results
"""

import argparse
import json
from pathlib import Path

import numpy as np

from .estimate import Config, estimate_car, format_report
from .log import read_car, write_session
from .simulate import make_car, simulate_car_sessions
from . import validate


def main(argv=None):
    p = argparse.ArgumentParser(prog="soh_proto")
    sub = p.add_subparsers(dest="cmd", required=True)

    ps = sub.add_parser("simulate", help="write synthetic charging logs")
    ps.add_argument("--out", type=Path, default=Path("data"))
    ps.add_argument("--cars", type=int, default=3)
    ps.add_argument("--sessions", type=int, default=8)
    ps.add_argument("--seed", type=int, default=1)

    pe = sub.add_parser("estimate", help="estimate SoH from a folder of session CSVs")
    pe.add_argument("folder", type=Path)
    pe.add_argument("--n-series", type=int, default=96)
    pe.add_argument("--nominal-ah", type=float, default=180.0)
    pe.add_argument("--bms-soh", type=float, help="car's own SoH figure (0-1), to cross-check")

    pv = sub.add_parser("validate", help="accuracy check on a simulated fleet")
    pv.add_argument("--out", type=Path, default=Path("results"))
    pv.add_argument("--cars", type=int, default=60)
    pv.add_argument("--seed", type=int, default=7)

    a = p.parse_args(argv)

    if a.cmd == "simulate":
        rng = np.random.default_rng(a.seed)
        for k in range(a.cars):
            car = make_car(rng, f"car_{k:03d}")
            folder = a.out / car.car_id
            folder.mkdir(parents=True, exist_ok=True)
            for s in simulate_car_sessions(rng, car, a.sessions):
                write_session(folder / f"{s.name}.csv", s)
            # Ground truth is kept outside the car folder so the estimator can't see it.
            (a.out / f"{car.car_id}_truth.json").write_text(json.dumps(car.to_dict(), indent=2))
            print(f"{folder}: true SoH {car.true_soh:.1%}, BMS says {car.bms_soh:.1%}")

    elif a.cmd == "estimate":
        cfg = Config(n_series=a.n_series, nominal_ah=a.nominal_ah)
        r = estimate_car(read_car(a.folder), cfg)
        print(format_report(a.folder.name, r, a.bms_soh))

    elif a.cmd == "validate":
        print(json.dumps(validate.run(a.cars, a.seed, a.out), indent=2))
        print(f"wrote {a.out / 'validation.json'} and {a.out / 'validation.png'}")


if __name__ == "__main__":
    main()
