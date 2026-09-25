"""Open-circuit voltage (OCV) vs state-of-charge for a generic NMC cell.

The independent SoC measurement at the heart of this prototype: after the
pack has rested, terminal voltage ~= OCV, and OCV maps to SoC through a
chemistry curve. That SoC does NOT depend on the BMS's own capacity estimate.

The table is a representative NMC/graphite curve (not a specific OEM cell).
For a real car it must be replaced with a curve for that car's cells.
"""

import numpy as np
from scipy.interpolate import PchipInterpolator

_SOC = np.array([0.00, 0.05, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 0.95, 1.00])
_OCV = np.array([3.00, 3.35, 3.45, 3.55, 3.62, 3.67, 3.72, 3.80, 3.89, 3.98, 4.07, 4.12, 4.18])

_ocv_of_soc = PchipInterpolator(_SOC, _OCV)
_docv_dsoc = _ocv_of_soc.derivative()

# Dense monotone table for the inverse lookup.
_SOC_DENSE = np.linspace(0.0, 1.0, 2001)
_OCV_DENSE = _ocv_of_soc(_SOC_DENSE)


def ocv(soc):
    """Cell OCV [V] at SoC in [0, 1]."""
    return _ocv_of_soc(np.clip(soc, 0.0, 1.0))


def soc_from_ocv(v_cell):
    """SoC in [0, 1] from rested cell voltage [V]."""
    return np.interp(v_cell, _OCV_DENSE, _SOC_DENSE)


def slope(soc):
    """dOCV/dSoC [V per unit SoC]; sets how voltage noise turns into SoC error."""
    return _docv_dsoc(np.clip(soc, 0.0, 1.0))
