"""Charging-session log format.

One CSV per charging session, as it would come from an OBD/CAN logger:

    time_s, current_a, pack_voltage_v, soc_bms_pct, temp_c

- current_a is pack current, positive while charging.
- The log starts at plug-in (pack rested from parking) and should continue
  for a while after charging stops so the voltage can relax.
"""

import csv
from dataclasses import dataclass
from pathlib import Path

import numpy as np

COLUMNS = ["time_s", "current_a", "pack_voltage_v", "soc_bms_pct", "temp_c"]


@dataclass
class Session:
    name: str
    time_s: np.ndarray
    current_a: np.ndarray
    pack_voltage_v: np.ndarray
    soc_bms_pct: np.ndarray
    temp_c: np.ndarray


def write_session(path: Path, s: Session) -> None:
    with open(path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(COLUMNS)
        for row in zip(s.time_s, s.current_a, s.pack_voltage_v, s.soc_bms_pct, s.temp_c):
            w.writerow([f"{row[0]:.1f}", f"{row[1]:.3f}", f"{row[2]:.4f}", f"{row[3]:.2f}", f"{row[4]:.1f}"])


def read_session(path: Path) -> Session:
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        missing = set(COLUMNS) - set(reader.fieldnames or [])
        if missing:
            raise ValueError(f"{path}: missing columns {sorted(missing)}")
        rows = list(reader)
    cols = {c: np.array([float(r[c]) for r in rows]) for c in COLUMNS}
    return Session(name=Path(path).stem, **cols)


def read_car(folder: Path) -> list[Session]:
    return [read_session(p) for p in sorted(Path(folder).glob("*.csv"))]
