import numpy as np
import pytest

from soh_proto import ocv
from soh_proto.estimate import Config, analyse_session, estimate_car
from soh_proto.log import read_car, write_session
from soh_proto.simulate import make_car, simulate_car_sessions, simulate_session


def test_ocv_inverse_round_trip():
    soc = np.linspace(0.02, 0.98, 50)
    assert np.allclose(ocv.soc_from_ocv(ocv.ocv(soc)), soc, atol=1e-3)


def _clean_car(rng, soh=0.9):
    car = make_car(rng, "t", true_soh=soh)
    car.i_gain, car.i_offset_a, car.v_gain, car.ocv_distort_v = 1.0, 0.0, 1.0, 0.0
    car.hysteresis_v = Config().hysteresis_v
    return car


def test_single_clean_session_recovers_capacity():
    rng = np.random.default_rng(0)
    car = _clean_car(rng)
    s = simulate_session(rng, car, "s", 0.2, 0.9, 11_000.0, rest_after_s=5400.0)
    r = analyse_session(s, Config())
    assert r.used
    assert r.capacity_ah == pytest.approx(car.true_ah, rel=0.01)


def test_short_rest_and_small_window_rejected():
    rng = np.random.default_rng(1)
    car = _clean_car(rng)
    short_rest = simulate_session(rng, car, "a", 0.2, 0.9, 11_000.0, rest_after_s=300.0)
    small = simulate_session(rng, car, "b", 0.5, 0.65, 11_000.0, rest_after_s=5400.0)
    assert not analyse_session(short_rest, Config()).used
    assert not analyse_session(small, Config()).used


def test_estimate_is_independent_of_biased_bms():
    rng = np.random.default_rng(2)
    car = make_car(rng, "t", true_soh=0.85)
    car.bms_soh = 0.93  # BMS 8 points optimistic
    sessions = simulate_car_sessions(rng, car, 20)
    r = estimate_car(sessions, Config())
    assert abs(r.soh - car.true_soh) < 0.02
    assert abs(r.soh - car.true_soh) <= r.ci95
    # Using the BMS's own SoC reproduces the BMS figure, not the truth.
    assert abs(r.naive_bms_soh - car.bms_soh) < 0.02


def test_csv_round_trip(tmp_path):
    rng = np.random.default_rng(3)
    car = make_car(rng, "t")
    for s in simulate_car_sessions(rng, car, 3):
        write_session(tmp_path / f"{s.name}.csv", s)
    loaded = read_car(tmp_path)
    assert len(loaded) == 3
    assert loaded[0].current_a.size > 10
