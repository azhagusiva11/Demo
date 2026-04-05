#!/usr/bin/env python3
"""
Generate Mock OPD Consultation Data for Liet Co-Pilot Demo Dashboard.

Hospital: Apollo Hospitals, Mysore (simulated)
Department: General Medicine OPD
Period: March 1-30, 2026 (26 working days)
Records: 7,500 consultations across 5 doctors

Usage:
    python scripts/generate_mock_data.py

Output:
    demo/mock_data.json    — 7,500 individual consultation records
    demo/mock_summary.json — pre-aggregated statistics
"""

import json
import math
import os
import random
import sys
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from pathlib import Path

# ---------------------------------------------------------------------------
# Reproducibility
# ---------------------------------------------------------------------------
random.seed(42)

# ---------------------------------------------------------------------------
# Constants & Configuration
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = SCRIPT_DIR.parent / "demo"
MOCK_DATA_PATH = OUTPUT_DIR / "mock_data.json"
MOCK_SUMMARY_PATH = OUTPUT_DIR / "mock_summary.json"

TARGET_RECORDS = 7500

# March 2026 working days (Sundays: 1, 8, 15, 22, 29)
SUNDAYS = {1, 8, 15, 22, 29}
WORKING_DAYS = sorted([d for d in range(1, 31) if d not in SUNDAYS])  # 26 days

# ---------------------------------------------------------------------------
# Doctors
# ---------------------------------------------------------------------------
DOCTORS = {
    "DR-001": {"name": "Dr. Anand",  "abx_rate": 0.24, "ppi_rate": 0.20},
    "DR-002": {"name": "Dr. Priya",  "abx_rate": 0.18, "ppi_rate": 0.15},
    "DR-003": {"name": "Dr. Rajan",  "abx_rate": 0.22, "ppi_rate": 0.25},
    "DR-004": {"name": "Dr. Meena",  "abx_rate": 0.20, "ppi_rate": 0.22},
    "DR-005": {"name": "Dr. Suresh", "abx_rate": 0.52, "ppi_rate": 0.68},
}
DOCTOR_IDS = list(DOCTORS.keys())

# ---------------------------------------------------------------------------
# Indian Names
# ---------------------------------------------------------------------------
MALE_FIRST = [
    "Rajesh", "Suresh", "Ganesh", "Venkatesh", "Karthik", "Arun", "Vijay",
    "Ramesh", "Kumar", "Mohan", "Prakash", "Harish", "Dinesh", "Naveen",
    "Srinivas", "Mahesh", "Anand", "Ravi", "Ashok", "Manoj",
]
FEMALE_FIRST = [
    "Lakshmi", "Priya", "Divya", "Kavitha", "Meena", "Anitha", "Radha",
    "Geetha", "Suma", "Asha", "Deepa", "Jaya", "Nandini", "Saroja",
    "Kamala", "Vani", "Rekha", "Savitri", "Uma", "Padma",
]
LAST_NAMES = [
    "Kumar", "Reddy", "Rao", "Sharma", "Nair", "Pillai", "Iyer", "Iyengar",
    "Gowda", "Shetty", "Hegde", "Patil", "Murthy", "Swamy", "Prasad",
    "Naidu", "Das", "Menon", "Varma", "Kamath",
]

# ---------------------------------------------------------------------------
# Diagnosis Definitions
# ---------------------------------------------------------------------------
DIAGNOSES = [
    {"code": "I10",   "desc": "Essential Hypertension",       "weight": 0.22},
    {"code": "E11.9", "desc": "Type 2 Diabetes Mellitus",     "weight": 0.18},
    {"code": "J06.9", "desc": "Upper Respiratory Infection",   "weight": 0.14},
    {"code": "K21.0", "desc": "Gastroesophageal Reflux",       "weight": 0.10},
    {"code": "D50.9", "desc": "Iron Deficiency Anemia",        "weight": 0.08},
    {"code": "N39.0", "desc": "Urinary Tract Infection",       "weight": 0.06},
    {"code": "M54.5", "desc": "Low Back Pain",                 "weight": 0.05},
    {"code": "M17.9", "desc": "Osteoarthritis",                "weight": 0.04},
    {"code": "F32.9", "desc": "Major Depressive Disorder",     "weight": 0.03},
    {"code": "E55.9", "desc": "Vitamin D Deficiency",          "weight": 0.03},
    {"code": "G43.9", "desc": "Migraine",                      "weight": 0.02},
    {"code": "E03.9", "desc": "Hypothyroidism",                "weight": 0.02},
    {"code": "J45.9", "desc": "Asthma",                        "weight": 0.02},
    {"code": "J30.4", "desc": "Allergic Rhinitis",             "weight": 0.01},
]
DIAG_CODES = [d["code"] for d in DIAGNOSES]
DIAG_WEIGHTS = [d["weight"] for d in DIAGNOSES]
DIAG_MAP = {d["code"]: d["desc"] for d in DIAGNOSES}

# ---------------------------------------------------------------------------
# Complaint Templates
# ---------------------------------------------------------------------------
COMPLAINTS_MAP = {
    "I10":   ["Headache for {d} days", "Dizziness on standing", "Blurred vision", "Neck pain"],
    "E11.9": ["Increased thirst for {d} weeks", "Frequent urination", "Fatigue", "Tingling in feet", "Blurred vision"],
    "J06.9": ["Cough for {d} days", "Sore throat", "Runny nose", "Sneezing", "Mild fever for {d} days", "Body ache"],
    "K21.0": ["Burning in chest for {d} days", "Acid reflux after meals", "Bloating", "Nausea"],
    "D50.9": ["Fatigue for {d} weeks", "Weakness", "Pale skin", "Breathlessness on exertion"],
    "N39.0": ["Burning urination for {d} days", "Frequent urination", "Lower abdominal pain", "Cloudy urine"],
    "M54.5": ["Low back pain for {d} days", "Pain radiating to legs", "Difficulty bending", "Morning stiffness"],
    "M17.9": ["Knee pain for {d} weeks", "Joint stiffness in morning", "Swelling in knee", "Difficulty climbing stairs"],
    "F32.9": ["Low mood for {d} weeks", "Loss of interest", "Sleep disturbance", "Poor appetite", "Fatigue"],
    "E55.9": ["Body pain for {d} weeks", "Fatigue", "Muscle cramps", "Bone pain"],
    "G43.9": ["Severe headache for {d} days", "Nausea with headache", "Sensitivity to light", "Throbbing pain one side"],
    "E03.9": ["Weight gain for {d} months", "Fatigue", "Cold intolerance", "Dry skin", "Constipation"],
    "J45.9": ["Wheezing for {d} days", "Shortness of breath", "Chest tightness", "Cough at night"],
    "J30.4": ["Sneezing for {d} days", "Runny nose", "Itchy eyes", "Nasal congestion"],
}

# ---------------------------------------------------------------------------
# Medication Mappings
# ---------------------------------------------------------------------------
MEDS = {
    "Telmikind 40":      {"generic": "Telmisartan 40mg",         "dosage": "1 OD"},
    "Amlokind 5":        {"generic": "Amlodipine 5mg",           "dosage": "1 OD"},
    "Amlokind-AT":       {"generic": "Amlodipine+Atenolol",      "dosage": "1 OD"},
    "Glycomet 500":      {"generic": "Metformin 500mg",           "dosage": "1 BD"},
    "Glycomet 1000":     {"generic": "Metformin 1000mg",          "dosage": "1 BD"},
    "Amaryl 1":          {"generic": "Glimepiride 1mg",           "dosage": "1 OD before breakfast"},
    "Jalra 50":          {"generic": "Vildagliptin 50mg",         "dosage": "1 BD"},
    "Dolo 650":          {"generic": "Paracetamol 650mg",         "dosage": "1 TDS"},
    "Azee 500":          {"generic": "Azithromycin 500mg",        "dosage": "1 OD x 3 days"},
    "Pantocid 40":       {"generic": "Pantoprazole 40mg",         "dosage": "1 OD before breakfast"},
    "Autrin":            {"generic": "Iron+Folic Acid",           "dosage": "1 OD"},
    "Folvite 5":         {"generic": "Folic Acid 5mg",            "dosage": "1 OD"},
    "Augmentin 625":     {"generic": "Amoxicillin+Clavulanate",   "dosage": "1 BD x 5 days"},
    "Cefixime 200":      {"generic": "Cefixime 200mg",            "dosage": "1 BD x 5 days"},
    "Norflox 400":       {"generic": "Norfloxacin 400mg",         "dosage": "1 BD x 5 days"},
    "Ultracet":          {"generic": "Tramadol+Paracetamol",      "dosage": "1 BD"},
    "Fluoxetine 20":     {"generic": "Fluoxetine 20mg",           "dosage": "1 OD morning"},
    "Shelcal 500":       {"generic": "Calcium+Vitamin D3",        "dosage": "1 BD"},
    "Thyronorm 50":      {"generic": "Levothyroxine 50mcg",       "dosage": "1 OD empty stomach"},
    "Montair LC":        {"generic": "Montelukast+Levocetirizine","dosage": "1 OD at night"},
    "Asthalin Inhaler":  {"generic": "Salbutamol Inhaler",        "dosage": "2 puffs SOS"},
    "Ecosprin 75":       {"generic": "Aspirin 75mg",              "dosage": "1 OD after lunch"},
    "Spironolactone 25": {"generic": "Spironolactone 25mg",       "dosage": "1 OD"},
}

# Language distribution
LANGUAGES = ["English", "English+Tamil", "English+Kannada", "English+Hindi", "English"]
LANG_WEIGHTS = [0.40, 0.25, 0.20, 0.10, 0.05]

# ---------------------------------------------------------------------------
# Safety Event Definitions (47 total)
# ---------------------------------------------------------------------------
SAFETY_EVENTS = []

# 5x Fluoxetine + Tramadol → Serotonin Syndrome — HIGH
for _ in range(5):
    SAFETY_EVENTS.append({
        "type": "Fluoxetine + Tramadol interaction",
        "severity": "HIGH",
        "description": "Risk of Serotonin Syndrome — concurrent use of SSRI and Tramadol",
        "drugs": ["Fluoxetine 20", "Ultracet"],
        "diag_required": "F32.9",
    })

# 3x Telmisartan + Spironolactone → Hyperkalemia — HIGH
for _ in range(3):
    SAFETY_EVENTS.append({
        "type": "Telmisartan + Spironolactone interaction",
        "severity": "HIGH",
        "description": "Risk of Hyperkalemia — concurrent ARB and potassium-sparing diuretic",
        "drugs": ["Telmikind 40", "Spironolactone 25"],
        "diag_required": "I10",
    })

# 3x Metformin + Glimepiride + skipped meals → Hypoglycemia — MODERATE
for _ in range(3):
    SAFETY_EVENTS.append({
        "type": "Metformin + Glimepiride hypoglycemia risk",
        "severity": "MODERATE",
        "description": "Hypoglycemia risk with dual oral hypoglycemics and reported skipped meals",
        "drugs": ["Glycomet 500", "Amaryl 1"],
        "diag_required": "E11.9",
        "extra_complaint": "Skipped meals frequently",
    })

# 4x Azithromycin + Ecosprin → QT prolongation — MODERATE
for _ in range(4):
    SAFETY_EVENTS.append({
        "type": "Azithromycin + Aspirin QT prolongation",
        "severity": "MODERATE",
        "description": "QT prolongation risk with Azithromycin in patient on Aspirin",
        "drugs": ["Azee 500", "Ecosprin 75"],
        "diag_required": "J06.9",
    })

# 5x Duplicate PPI — LOW
for _ in range(5):
    SAFETY_EVENTS.append({
        "type": "Duplicate PPI prescribed",
        "severity": "LOW",
        "description": "Duplicate Proton Pump Inhibitor — Pantoprazole already in active medications",
        "drugs": ["Pantocid 40", "Pantocid 40"],
        "diag_required": None,
    })

# 3x Rofecoxib attempted — CRITICAL
for _ in range(3):
    SAFETY_EVENTS.append({
        "type": "Withdrawn drug blocked: Rofecoxib",
        "severity": "CRITICAL",
        "description": "BLOCKED — Rofecoxib withdrawn from market due to cardiovascular risk",
        "drugs": [],
        "diag_required": "M54.5",
        "withdrawn": True,
    })

# 2x Nimesulide for child — CRITICAL
for _ in range(2):
    SAFETY_EVENTS.append({
        "type": "Withdrawn drug blocked: Nimesulide (pediatric)",
        "severity": "CRITICAL",
        "description": "BLOCKED — Nimesulide banned for pediatric use due to hepatotoxicity risk",
        "drugs": [],
        "diag_required": "J06.9",
        "withdrawn": True,
        "pediatric": True,
    })

# 22x Various moderate interactions
MODERATE_INTERACTIONS = [
    {"type": "NSAID + ACE inhibitor interaction", "description": "Risk of renal impairment — NSAID may reduce antihypertensive effect"},
    {"type": "Metformin + contrast dye risk", "description": "Risk of lactic acidosis if Metformin not withheld before contrast study"},
    {"type": "Amlodipine + Simvastatin interaction", "description": "Increased risk of myopathy with high-dose Simvastatin and Amlodipine"},
    {"type": "Metformin + alcohol warning", "description": "Increased risk of lactic acidosis with alcohol use in Metformin patients"},
    {"type": "Glimepiride + beta-blocker masking", "description": "Beta-blocker may mask hypoglycemia symptoms in diabetic patient"},
    {"type": "NSAID + antiplatelet bleeding risk", "description": "Increased GI bleeding risk with concurrent NSAID and Aspirin"},
    {"type": "ACE inhibitor + potassium supplement", "description": "Risk of hyperkalemia with concurrent ACE inhibitor and potassium"},
    {"type": "Levothyroxine + calcium timing", "description": "Calcium may reduce Levothyroxine absorption — separate by 4 hours"},
    {"type": "Metformin + renal function alert", "description": "Monitor renal function — eGFR declining in patient on Metformin"},
    {"type": "Tramadol + SSRI serotonergic risk", "description": "Serotonergic risk with Tramadol in patient with SSRI history"},
    {"type": "Fluoroquinolone + theophylline", "description": "Increased theophylline levels with concurrent fluoroquinolone"},
]
for i in range(22):
    interaction = MODERATE_INTERACTIONS[i % len(MODERATE_INTERACTIONS)]
    SAFETY_EVENTS.append({
        "type": interaction["type"],
        "severity": "MODERATE",
        "description": interaction["description"],
        "drugs": [],
        "diag_required": None,
    })

assert len(SAFETY_EVENTS) == 47, f"Expected 47 safety events, got {len(SAFETY_EVENTS)}"


# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------

def clamp(value, lo, hi):
    """Clamp a numeric value to [lo, hi]."""
    return max(lo, min(hi, value))


def generate_age():
    """Bimodal age distribution: 35% 25-40, 50% 50-70, 10% 5-18, 5% 70+."""
    r = random.random()
    if r < 0.35:
        return random.randint(25, 40)
    elif r < 0.85:
        return random.randint(50, 70)
    elif r < 0.95:
        return random.randint(5, 18)
    else:
        return random.randint(70, 85)


def generate_sex():
    """55% Male, 45% Female."""
    return "Male" if random.random() < 0.55 else "Female"


def generate_bmi():
    """Normal distribution mean 26.5, SD 4.5, clamped 16-45."""
    return round(clamp(random.gauss(26.5, 4.5), 16.0, 45.0), 1)


def generate_name(sex):
    """Generate a realistic South Indian name."""
    if sex == "Male":
        first = random.choice(MALE_FIRST)
    else:
        first = random.choice(FEMALE_FIRST)
    last = random.choice(LAST_NAMES)
    return f"{first} {last}"


def generate_time_slot(slot_index, total_slots):
    """
    Distribute consultations between 08:30-17:30 with lunch gap 13:00-14:00.
    Morning: 08:30-13:00 (270 min), Afternoon: 14:00-17:30 (210 min).
    Total available: 480 min.
    """
    morning_minutes = 270  # 08:30 to 13:00
    afternoon_minutes = 210  # 14:00 to 17:30
    total_minutes = morning_minutes + afternoon_minutes

    offset = int((slot_index / max(total_slots, 1)) * total_minutes)
    offset += random.randint(-3, 3)  # small jitter
    offset = clamp(offset, 0, total_minutes - 1)

    if offset < morning_minutes:
        base = datetime(2026, 3, 1, 8, 30)
        actual = base + timedelta(minutes=offset)
    else:
        base = datetime(2026, 3, 1, 14, 0)
        actual = base + timedelta(minutes=offset - morning_minutes)

    return actual.strftime("%H:%M")


def select_diagnosis(age, sex, bmi, day_of_month):
    """
    Select a primary diagnosis using weighted random selection,
    adjusted by demographic constraints.
    """
    adjusted_weights = list(DIAG_WEIGHTS)

    for i, diag in enumerate(DIAGNOSES):
        code = diag["code"]
        w = adjusted_weights[i]

        if code == "I10":
            if age <= 45:
                w *= 0.3
            if bmi <= 27:
                w *= 0.6
            if sex == "Female":
                w *= 0.7
        elif code == "E11.9":
            if age <= 40:
                w *= 0.2
            if bmi <= 28:
                w *= 0.5
        elif code == "J06.9":
            if age < 20 or age > 45:
                w *= 0.5
            # Seasonal: 60% in first 10 days
            if day_of_month <= 10:
                w *= 1.6
            else:
                w *= 0.7
        elif code == "D50.9":
            if sex == "Male":
                w *= 0.25
            if age < 18 or age > 45:
                w *= 0.4
        elif code == "N39.0":
            if sex == "Male":
                w *= 0.4
            if age < 20 or age > 55:
                w *= 0.4
        elif code == "M54.5":
            if age < 30 or age > 60:
                w *= 0.3
        elif code == "M17.9":
            if age <= 50:
                w *= 0.2
            if bmi <= 28:
                w *= 0.5
            if sex == "Male":
                w *= 0.6
        elif code == "F32.9":
            if age < 25 or age > 55:
                w *= 0.3
        elif code == "E55.9":
            if sex == "Male":
                w *= 0.5
            if age < 20 or age > 50:
                w *= 0.4
        elif code == "G43.9":
            if sex == "Male":
                w *= 0.4
            if age < 20 or age > 45:
                w *= 0.3
        elif code == "E03.9":
            if sex == "Male":
                w *= 0.25
            if age < 30 or age > 55:
                w *= 0.4
        elif code == "J45.9":
            # Bimodal: children + 40-60
            if 18 < age < 40 or age > 60:
                w *= 0.3
        elif code == "J30.4":
            if age < 15 or age > 40:
                w *= 0.3

        adjusted_weights[i] = w

    # Normalize
    total = sum(adjusted_weights)
    adjusted_weights = [w / total for w in adjusted_weights]

    chosen = random.choices(DIAGNOSES, weights=adjusted_weights, k=1)[0]
    return chosen["code"]


def apply_comorbidity_rules(primary_code, age, sex, bmi):
    """
    Apply multi-diagnosis rules. Returns list of additional diagnosis codes.
    """
    additional = []

    if primary_code == "E11.9":
        if random.random() < 0.40:
            additional.append("I10")
        if random.random() < 0.30:
            additional.append("K21.0")
    elif primary_code == "I10":
        if random.random() < 0.35:
            additional.append("E11.9")
    elif primary_code == "D50.9":
        if random.random() < 0.20:
            additional.append("E03.9")

    return additional


def generate_vitals(diagnoses_codes, age):
    """Generate vitals based on diagnoses."""
    has_htn = "I10" in diagnoses_codes
    has_uri = "J06.9" in diagnoses_codes

    if has_htn:
        bp_sys = random.randint(140, 180)
        bp_dia = random.randint(85, 110)
    else:
        bp_sys = random.randint(110, 135)
        bp_dia = random.randint(70, 85)

    pulse = random.randint(65, 90)
    if has_uri:
        pulse = random.randint(75, 100)

    if has_uri:
        temp = round(random.uniform(99.0, 102.5), 1)
    else:
        temp = round(random.uniform(97.5, 98.8), 1)

    spo2 = random.randint(95, 99)
    if "J45.9" in diagnoses_codes:
        spo2 = random.randint(92, 97)

    return {
        "bp_systolic": bp_sys,
        "bp_diastolic": bp_dia,
        "pulse": pulse,
        "temp": temp,
        "spo2": spo2,
    }


def generate_complaints(primary_code):
    """Generate 1-3 complaints from templates."""
    templates = COMPLAINTS_MAP.get(primary_code, ["General malaise"])
    n = random.randint(1, min(3, len(templates)))
    selected = random.sample(templates, n)
    result = []
    for t in selected:
        if "{d}" in t:
            t = t.format(d=random.randint(2, 14))
        result.append(t)
    return result


def generate_medications(diagnoses_codes, age, bmi, sex, doctor_id, bp_systolic=130, hba1c=None):
    """
    Generate medication list based on diagnoses and doctor profile.
    Returns (medications_list, is_antibiotic, is_ppi).
    """
    meds_list = []
    is_antibiotic = False
    is_ppi = False
    doctor = DOCTORS[doctor_id]

    added_brands = set()

    def add_med(brand):
        if brand not in added_brands:
            added_brands.add(brand)
            info = MEDS[brand]
            meds_list.append({
                "brand": brand,
                "generic": info["generic"],
                "dosage": info["dosage"],
            })

    # HTN medications
    if "I10" in diagnoses_codes:
        if age >= 50:
            add_med("Telmikind 40")
        else:
            add_med("Amlokind 5")
        if bp_systolic > 160:
            add_med("Amlokind-AT")

    # DM medications
    if "E11.9" in diagnoses_codes:
        if hba1c is None:
            hba1c = round(random.uniform(6.5, 10.5), 1)
        add_med("Glycomet 500")
        if hba1c > 8.5:
            add_med("Glycomet 1000")
        if hba1c > 7.5:
            if random.random() < 0.5:
                add_med("Amaryl 1")
            else:
                add_med("Jalra 50")

    # URI medications
    if "J06.9" in diagnoses_codes:
        add_med("Dolo 650")
        # Doctor-specific antibiotic prescribing
        if doctor_id == "DR-005":
            # Dr. Suresh prescribes antibiotics for most URI
            if random.random() < 0.85:
                add_med("Azee 500")
                is_antibiotic = True
        else:
            if random.random() < doctor["abx_rate"]:
                add_med("Azee 500")
                is_antibiotic = True

    # GERD
    if "K21.0" in diagnoses_codes:
        add_med("Pantocid 40")
        is_ppi = True

    # Anemia
    if "D50.9" in diagnoses_codes:
        add_med("Autrin")
        add_med("Folvite 5")

    # UTI
    if "N39.0" in diagnoses_codes:
        uti_med = random.choice(["Augmentin 625", "Cefixime 200", "Norflox 400"])
        add_med(uti_med)
        is_antibiotic = True

    # Low back pain
    if "M54.5" in diagnoses_codes:
        add_med("Dolo 650")
        if random.random() < 0.4:
            add_med("Ultracet")

    # OA
    if "M17.9" in diagnoses_codes:
        add_med("Dolo 650")
        if random.random() < 0.5:
            add_med("Ultracet")

    # MDD
    if "F32.9" in diagnoses_codes:
        add_med("Fluoxetine 20")

    # Vitamin D
    if "E55.9" in diagnoses_codes:
        add_med("Shelcal 500")

    # Hypothyroid
    if "E03.9" in diagnoses_codes:
        add_med("Thyronorm 50")

    # Asthma
    if "J45.9" in diagnoses_codes:
        add_med("Montair LC")
        add_med("Asthalin Inhaler")

    # Allergic Rhinitis
    if "J30.4" in diagnoses_codes:
        add_med("Montair LC")

    # Cardiac risk: DM + HTN + age > 50
    if "E11.9" in diagnoses_codes and "I10" in diagnoses_codes and age > 50:
        add_med("Ecosprin 75")

    # Dr. Suresh unnecessary antibiotic prescribing for NON-URI/UTI cases
    # He adds Azee 500 "prophylactically" even when not indicated
    if doctor_id == "DR-005" and not is_antibiotic:
        # URI (14%) already handled above at 85%. UTI (6%) always gets abx.
        # For remaining ~80% of cases, need ~47% abx to hit 52% overall:
        # 0.14*0.85 + 0.06*1.0 + 0.80*X = 0.52  →  X ≈ 0.50
        if random.random() < 0.42:
            add_med("Azee 500")
            is_antibiotic = True
    # Other doctors: small chance of unnecessary antibiotic for non-URI/UTI
    elif not is_antibiotic and doctor_id != "DR-005":
        # Target: 18-24% overall. URI gives ~14%*rate + 6% UTI ≈ 9%.
        # Need ~10-15% more from non-indicated cases for 18-24% total:
        # 0.80 * X = 0.12 → X ≈ 0.15
        if random.random() < 0.12:
            add_med("Azee 500")
            is_antibiotic = True

    # Dr. Suresh PPI over-prescribing
    if doctor_id == "DR-005" and not is_ppi:
        if random.random() < doctor["ppi_rate"]:
            add_med("Pantocid 40")
            is_ppi = True
    elif not is_ppi:
        if random.random() < doctor["ppi_rate"] * 0.3:
            add_med("Pantocid 40")
            is_ppi = True

    return meds_list, is_antibiotic, is_ppi


def generate_timing():
    """Generate consultation timing metrics."""
    duration = int(clamp(random.gauss(270, 60), 180, 420))
    note_gen = int(clamp(random.gauss(32, 5), 22, 45))
    doc_complete = round(clamp(random.gauss(0.94, 0.03), 0.88, 0.98), 2)
    return duration, note_gen, doc_complete


def generate_language():
    """Generate language selection."""
    return random.choices(LANGUAGES, weights=LANG_WEIGHTS, k=1)[0]


# ---------------------------------------------------------------------------
# Patient Pool (for repeat visits)
# ---------------------------------------------------------------------------
def build_patient_pool(target_records):
    """
    Build a pool of patients. ~30% will have 2+ visits.
    We need ~5250 unique patients for 7500 records with 30% repeats.
    """
    # Estimate unique patients: if 30% have 2 visits on average
    # N_unique + 0.3 * N_unique = 7500  =>  N_unique ~= 5770
    unique_count = int(target_records / 1.3)
    patients = {}
    for i in range(1, unique_count + 1):
        pid = f"PT-{i:05d}"
        sex = generate_sex()
        age = generate_age()
        bmi = generate_bmi()
        name = generate_name(sex)
        patients[pid] = {
            "patient_id": pid,
            "patient_name": name,
            "patient_age": age,
            "patient_sex": sex,
            "patient_bmi": bmi,
        }
    return patients


def assign_patients_to_slots(patient_pool, target_records):
    """
    Assign patients to consultation slots across working days and doctors.
    Returns list of (day, doctor_id, patient_id) tuples.
    About 30% of patients get 2+ visits.
    """
    patient_ids = list(patient_pool.keys())
    assignments = []

    # Calculate how many slots each doctor-day needs.
    # total_doctor_days = len(WORKING_DAYS) * len(DOCTOR_IDS)
    # We need target_records spread across those doctor-days.
    total_doctor_days = len(WORKING_DAYS) * len(DOCTOR_IDS)
    base_per_slot = target_records // total_doctor_days
    remainder = target_records - base_per_slot * total_doctor_days

    slots_needed = []
    r_idx = 0
    for day in WORKING_DAYS:
        for doc_id in DOCTOR_IDS:
            n_patients = base_per_slot + (1 if r_idx < remainder else 0)
            # Add small random variation (+/- 3) while preserving total
            slots_needed.append((day, doc_id, n_patients))
            r_idx += 1

    total_slots = sum(s[2] for s in slots_needed)

    # Create a visit pool: all unique patients + ~30% repeats
    visit_pool = list(patient_ids)
    # Add repeat visits for ~30% of patients
    repeat_candidates = random.sample(patient_ids, int(len(patient_ids) * 0.30))
    for pid in repeat_candidates:
        n_extra = random.choices([1, 2], weights=[0.8, 0.2], k=1)[0]
        visit_pool.extend([pid] * n_extra)

    random.shuffle(visit_pool)

    # Trim or extend to match target
    if len(visit_pool) > target_records:
        visit_pool = visit_pool[:target_records]
    while len(visit_pool) < target_records:
        visit_pool.append(random.choice(patient_ids))

    # Distribute visits across slots
    idx = 0
    for day, doc_id, n_patients in slots_needed:
        for slot_i in range(n_patients):
            if idx < len(visit_pool):
                assignments.append((day, doc_id, visit_pool[idx], slot_i, n_patients))
                idx += 1

    # Trim to exact target
    assignments = assignments[:target_records]
    return assignments


# ---------------------------------------------------------------------------
# Mrs. Lakshmi Devi — Hardcoded Patient
# ---------------------------------------------------------------------------
LAKSHMI_ID = "PT-LAKSHMI"

def create_lakshmi_visits():
    """Create the 3 hardcoded visits for Mrs. Lakshmi Devi."""
    visits = []

    # Visit 1: March 5, Dr. Anand, DM review + joint pain
    visits.append({
        "id": None,  # will be assigned
        "date": "2026-03-05",
        "time": "10:30",
        "doctor_id": "DR-001",
        "doctor_name": "Dr. Anand",
        "patient_id": LAKSHMI_ID,
        "patient_name": "Lakshmi Devi",
        "patient_age": 58,
        "patient_sex": "Female",
        "patient_bmi": 29.4,
        "vitals": {
            "bp_systolic": 138,
            "bp_diastolic": 86,
            "pulse": 78,
            "temp": 98.4,
            "spo2": 97,
        },
        "complaints": ["Joint pain in both knees for 2 weeks", "Routine DM follow-up"],
        "diagnoses": [
            {"code": "E11.9", "description": "Type 2 Diabetes Mellitus", "type": "primary"},
            {"code": "M17.9", "description": "Osteoarthritis", "type": "secondary"},
        ],
        "medications": [
            {"brand": "Glycomet 500", "generic": "Metformin 500mg", "dosage": "1 BD"},
            {"brand": "Dolo 650", "generic": "Paracetamol 650mg", "dosage": "1 TDS"},
        ],
        "interactions_flagged": [],
        "safety_flags": [],
        "withdrawn_drug_blocked": False,
        "consultation_duration_seconds": 285,
        "note_generation_seconds": 30,
        "documentation_completeness": 0.95,
        "abdm_structured": True,
        "language": "English+Kannada",
        "is_antibiotic_prescribed": False,
        "is_ppi_prescribed": False,
    })

    # Visit 2: March 15, Dr. Priya, Fatigue + numbness, interaction flag
    visits.append({
        "id": None,
        "date": "2026-03-16",  # March 15 is Sunday, use March 16
        "time": "11:15",
        "doctor_id": "DR-002",
        "doctor_name": "Dr. Priya",
        "patient_id": LAKSHMI_ID,
        "patient_name": "Lakshmi Devi",
        "patient_age": 58,
        "patient_sex": "Female",
        "patient_bmi": 29.4,
        "vitals": {
            "bp_systolic": 142,
            "bp_diastolic": 88,
            "pulse": 82,
            "temp": 98.2,
            "spo2": 97,
        },
        "complaints": ["Persistent fatigue for 1 week", "Numbness in feet", "Knee pain not improving"],
        "diagnoses": [
            {"code": "E11.9", "description": "Type 2 Diabetes Mellitus", "type": "primary"},
            {"code": "M17.9", "description": "Osteoarthritis", "type": "secondary"},
        ],
        "medications": [
            {"brand": "Glycomet 500", "generic": "Metformin 500mg", "dosage": "1 BD"},
            {"brand": "Amaryl 1", "generic": "Glimepiride 1mg", "dosage": "1 OD before breakfast"},
            {"brand": "Dolo 650", "generic": "Paracetamol 650mg", "dosage": "1 TDS"},
        ],
        "interactions_flagged": [
            {
                "type": "Ultracet + Glimepiride hypoglycemia risk",
                "severity": "MODERATE",
                "description": "CAUGHT BY SYSTEM — Ultracet (Tramadol) initially prescribed for pain; flagged for hypoglycemia risk with Glimepiride. Doctor substituted with Dolo 650.",
                "action_taken": "Substituted Ultracet with Dolo 650",
            }
        ],
        "safety_flags": ["Interaction caught and resolved — Ultracet replaced with Dolo 650"],
        "withdrawn_drug_blocked": False,
        "consultation_duration_seconds": 340,
        "note_generation_seconds": 35,
        "documentation_completeness": 0.96,
        "abdm_structured": True,
        "language": "English+Kannada",
        "is_antibiotic_prescribed": False,
        "is_ppi_prescribed": False,
    })

    # Visit 3: March 25, Dr. Rajan, Routine follow-up, proteinuria flagged
    visits.append({
        "id": None,
        "date": "2026-03-25",
        "time": "09:45",
        "doctor_id": "DR-003",
        "doctor_name": "Dr. Rajan",
        "patient_id": LAKSHMI_ID,
        "patient_name": "Lakshmi Devi",
        "patient_age": 58,
        "patient_sex": "Female",
        "patient_bmi": 29.4,
        "vitals": {
            "bp_systolic": 148,
            "bp_diastolic": 92,
            "pulse": 80,
            "temp": 98.3,
            "spo2": 97,
        },
        "complaints": ["Routine follow-up", "Mild swelling in feet"],
        "diagnoses": [
            {"code": "E11.9", "description": "Type 2 Diabetes Mellitus", "type": "primary"},
            {"code": "I10", "description": "Essential Hypertension", "type": "secondary"},
        ],
        "medications": [
            {"brand": "Glycomet 500", "generic": "Metformin 500mg", "dosage": "1 BD"},
            {"brand": "Amaryl 1", "generic": "Glimepiride 1mg", "dosage": "1 OD before breakfast"},
            {"brand": "Telmikind 40", "generic": "Telmisartan 40mg", "dosage": "1 OD"},
            {"brand": "Ecosprin 75", "generic": "Aspirin 75mg", "dosage": "1 OD after lunch"},
        ],
        "interactions_flagged": [],
        "safety_flags": [
            "LONGITUDINAL ALERT: Proteinuria detected in urine test. Declining renal function pattern across 3 visits. Recommend nephrology referral and ACR monitoring."
        ],
        "withdrawn_drug_blocked": False,
        "consultation_duration_seconds": 360,
        "note_generation_seconds": 38,
        "documentation_completeness": 0.97,
        "abdm_structured": True,
        "language": "English+Kannada",
        "is_antibiotic_prescribed": False,
        "is_ppi_prescribed": False,
    })

    return visits


# ---------------------------------------------------------------------------
# Main Generation Logic
# ---------------------------------------------------------------------------
def generate_all_records():
    """Generate all 7,500 consultation records."""
    print(f"Generating {TARGET_RECORDS} mock OPD consultation records...")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Working days: {len(WORKING_DAYS)} (March 2026)")
    print(f"Doctors: {len(DOCTORS)}")
    print()

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Build patient pool
    patient_pool = build_patient_pool(TARGET_RECORDS)
    print(f"Patient pool: {len(patient_pool)} unique patients")

    # Assign patients to slots
    assignments = assign_patients_to_slots(patient_pool, TARGET_RECORDS - 3)  # Reserve 3 for Lakshmi
    print(f"Assignments generated: {len(assignments)}")

    # Create Lakshmi visits
    lakshmi_visits = create_lakshmi_visits()

    # Prepare safety event positions (scatter across records)
    safety_positions = sorted(random.sample(range(len(assignments)), min(47, len(assignments))))
    safety_event_idx = 0

    records = []
    record_counter = 0

    for i, (day, doc_id, patient_id, slot_i, total_slots) in enumerate(assignments):
        record_counter += 1
        cons_id = f"CONS-{record_counter:05d}"

        patient = patient_pool[patient_id]
        age = patient["patient_age"]
        sex = patient["patient_sex"]
        bmi = patient["patient_bmi"]

        date_str = f"2026-03-{day:02d}"
        time_str = generate_time_slot(slot_i, total_slots)

        # Select diagnosis
        primary_code = select_diagnosis(age, sex, bmi, day)
        additional_codes = apply_comorbidity_rules(primary_code, age, sex, bmi)
        all_diag_codes = [primary_code] + additional_codes

        # Build diagnoses list
        diagnoses_list = [
            {"code": primary_code, "description": DIAG_MAP[primary_code], "type": "primary"}
        ]
        for ac in additional_codes:
            if ac in DIAG_MAP:
                diagnoses_list.append(
                    {"code": ac, "description": DIAG_MAP[ac], "type": "secondary"}
                )

        # Generate vitals
        vitals = generate_vitals(all_diag_codes, age)

        # Generate complaints
        complaints = generate_complaints(primary_code)

        # Generate medications
        meds_list, is_abx, is_ppi = generate_medications(
            all_diag_codes, age, bmi, sex, doc_id,
            bp_systolic=vitals["bp_systolic"],
        )

        # Timing
        duration, note_gen, doc_complete = generate_timing()
        language = generate_language()

        # Safety events
        interactions_flagged = []
        safety_flags = []
        withdrawn_blocked = False

        if safety_event_idx < len(SAFETY_EVENTS) and i in safety_positions[:len(SAFETY_EVENTS)]:
            event = SAFETY_EVENTS[safety_event_idx]
            safety_event_idx += 1

            # Apply safety event
            interaction_entry = {
                "type": event["type"],
                "severity": event["severity"],
                "description": event["description"],
            }
            interactions_flagged.append(interaction_entry)
            safety_flags.append(f"{event['severity']}: {event['type']}")

            # Add the drugs from the safety event to medications if they exist
            for drug_brand in event.get("drugs", []):
                if drug_brand in MEDS and drug_brand not in {m["brand"] for m in meds_list}:
                    info = MEDS[drug_brand]
                    meds_list.append({
                        "brand": drug_brand,
                        "generic": info["generic"],
                        "dosage": info["dosage"],
                    })

            if event.get("extra_complaint"):
                complaints.append(event["extra_complaint"])

            if event.get("withdrawn"):
                withdrawn_blocked = True

            # Adjust flags for antibiotics/PPI from safety event drugs
            for drug_brand in event.get("drugs", []):
                if drug_brand == "Azee 500":
                    is_abx = True
                if drug_brand == "Pantocid 40":
                    is_ppi = True

        record = {
            "id": cons_id,
            "date": date_str,
            "time": time_str,
            "doctor_id": doc_id,
            "doctor_name": DOCTORS[doc_id]["name"],
            "patient_id": patient_id,
            "patient_name": patient["patient_name"],
            "patient_age": age,
            "patient_sex": sex,
            "patient_bmi": bmi,
            "vitals": vitals,
            "complaints": complaints,
            "diagnoses": diagnoses_list,
            "medications": meds_list,
            "interactions_flagged": interactions_flagged,
            "safety_flags": safety_flags,
            "withdrawn_drug_blocked": withdrawn_blocked,
            "consultation_duration_seconds": duration,
            "note_generation_seconds": note_gen,
            "documentation_completeness": doc_complete,
            "abdm_structured": True,
            "language": language,
            "is_antibiotic_prescribed": is_abx,
            "is_ppi_prescribed": is_ppi,
        }
        records.append(record)

        if record_counter % 1000 == 0:
            print(f"  Generated {record_counter} records...")

    # Insert Lakshmi visits at appropriate positions
    for lv in lakshmi_visits:
        record_counter += 1
        lv["id"] = f"CONS-{record_counter:05d}"
        records.append(lv)

    # Sort all records by date then time
    records.sort(key=lambda r: (r["date"], r["time"]))

    # Re-assign sequential IDs after sorting
    for idx, rec in enumerate(records):
        rec["id"] = f"CONS-{idx + 1:05d}"

    print(f"  Total records: {len(records)}")
    return records, patient_pool, lakshmi_visits


# ---------------------------------------------------------------------------
# Summary Generation
# ---------------------------------------------------------------------------
def generate_summary(records, patient_pool, lakshmi_visits):
    """Compute and return the summary statistics."""
    print("\nComputing summary statistics...")

    total = len(records)
    unique_patients = len(set(r["patient_id"] for r in records))
    working_days = len(WORKING_DAYS)

    # Average per doctor per day
    doctor_day_counts = defaultdict(lambda: defaultdict(int))
    for r in records:
        doctor_day_counts[r["doctor_id"]][r["date"]] += 1

    avg_per_doctor_per_day = round(total / (len(DOCTORS) * working_days), 1)

    # Timing averages
    avg_duration = round(sum(r["consultation_duration_seconds"] for r in records) / total, 1)
    avg_note_gen = round(sum(r["note_generation_seconds"] for r in records) / total, 1)
    avg_doc_complete = round(sum(r["documentation_completeness"] for r in records) / total, 3)

    # Diagnosis distribution
    diag_counter = Counter()
    for r in records:
        for d in r["diagnoses"]:
            diag_counter[d["code"]] += 1

    diagnosis_distribution = []
    for diag in DIAGNOSES:
        count = diag_counter.get(diag["code"], 0)
        diagnosis_distribution.append({
            "code": diag["code"],
            "description": diag["desc"],
            "count": count,
            "percentage": round(count / total * 100, 1),
        })
    diagnosis_distribution.sort(key=lambda x: x["count"], reverse=True)

    # Medication frequency
    med_counter = Counter()
    for r in records:
        for m in r["medications"]:
            med_counter[m["brand"]] += 1

    medication_frequency = []
    for brand, count in med_counter.most_common():
        generic = MEDS.get(brand, {}).get("generic", brand)
        medication_frequency.append({
            "brand": brand,
            "generic": generic,
            "count": count,
            "percentage": round(count / total * 100, 1),
        })

    # Doctor stats
    doctor_stats = {}
    for doc_id, doc_info in DOCTORS.items():
        doc_records = [r for r in records if r["doctor_id"] == doc_id]
        n = len(doc_records)
        if n == 0:
            continue
        abx_count = sum(1 for r in doc_records if r["is_antibiotic_prescribed"])
        ppi_count = sum(1 for r in doc_records if r["is_ppi_prescribed"])
        avg_dur = round(sum(r["consultation_duration_seconds"] for r in doc_records) / n, 1)
        doctor_stats[doc_id] = {
            "name": doc_info["name"],
            "total_consults": n,
            "antibiotic_rate": round(abx_count / n, 3),
            "ppi_rate": round(ppi_count / n, 3),
            "avg_duration": avg_dur,
        }

    # Safety summary
    all_interactions = []
    high_count = 0
    moderate_count = 0
    low_count = 0
    critical_count = 0
    withdrawn_count = 0

    interaction_type_counter = Counter()
    interaction_examples = {}

    for r in records:
        for inter in r["interactions_flagged"]:
            all_interactions.append(inter)
            sev = inter["severity"]
            if sev == "HIGH":
                high_count += 1
            elif sev == "MODERATE":
                moderate_count += 1
            elif sev == "LOW":
                low_count += 1
            elif sev == "CRITICAL":
                critical_count += 1

            itype = inter["type"]
            interaction_type_counter[itype] += 1
            if itype not in interaction_examples:
                interaction_examples[itype] = inter["description"]

        if r["withdrawn_drug_blocked"]:
            withdrawn_count += 1

    # Also count Lakshmi's interactions
    for lv in lakshmi_visits:
        for inter in lv.get("interactions_flagged", []):
            all_interactions.append(inter)
            sev = inter["severity"]
            if sev == "MODERATE":
                moderate_count += 1
            interaction_type_counter[inter["type"]] += 1
            if inter["type"] not in interaction_examples:
                interaction_examples[inter["type"]] = inter["description"]

    interaction_types = []
    for itype, count in interaction_type_counter.most_common():
        # Determine severity from events
        sev = "MODERATE"
        for e in SAFETY_EVENTS:
            if e["type"] == itype:
                sev = e["severity"]
                break
        # Check Lakshmi interactions
        for lv in lakshmi_visits:
            for inter in lv.get("interactions_flagged", []):
                if inter["type"] == itype:
                    sev = inter["severity"]
        interaction_types.append({
            "type": itype,
            "severity": sev,
            "count": count,
            "example": interaction_examples.get(itype, ""),
        })

    safety_summary = {
        "total_interactions": len(all_interactions),
        "high_severity": high_count,
        "moderate_severity": moderate_count,
        "low_severity": low_count,
        "critical_count": critical_count,
        "withdrawn_blocked": withdrawn_count,
        "interaction_types": interaction_types,
    }

    # Monthly trend
    daily_counts = defaultdict(lambda: {"total": 0, "uri_count": 0})
    for r in records:
        daily_counts[r["date"]]["total"] += 1
        for d in r["diagnoses"]:
            if d["code"] == "J06.9":
                daily_counts[r["date"]]["uri_count"] += 1
                break

    monthly_trend = []
    for day in WORKING_DAYS:
        date_str = f"2026-03-{day:02d}"
        entry = daily_counts[date_str]
        monthly_trend.append({
            "date": date_str,
            "total": entry["total"],
            "uri_count": entry["uri_count"],
        })

    # Language distribution
    lang_counter = Counter(r["language"] for r in records)
    language_distribution = dict(lang_counter.most_common())

    # Find Lakshmi's records in the final sorted list
    mrs_lakshmi_records = [r for r in records if r["patient_id"] == LAKSHMI_ID]

    summary = {
        "total_consultations": total,
        "unique_patients": unique_patients,
        "working_days": working_days,
        "doctors": len(DOCTORS),
        "avg_per_doctor_per_day": avg_per_doctor_per_day,
        "avg_consultation_duration": avg_duration,
        "avg_note_generation_time": avg_note_gen,
        "avg_documentation_completeness": avg_doc_complete,
        "diagnosis_distribution": diagnosis_distribution,
        "medication_frequency": medication_frequency,
        "doctor_stats": doctor_stats,
        "safety_summary": safety_summary,
        "monthly_trend": monthly_trend,
        "language_distribution": language_distribution,
        "mrs_lakshmi_visits": mrs_lakshmi_records,
    }

    return summary


# ---------------------------------------------------------------------------
# Entry Point
# ---------------------------------------------------------------------------
def main():
    print("=" * 60)
    print("Liet Co-Pilot — Mock OPD Data Generator")
    print("Apollo Hospitals, Mysore (Simulated)")
    print("=" * 60)
    print()

    records, patient_pool, lakshmi_visits = generate_all_records()

    # Write mock_data.json
    print(f"\nWriting {len(records)} records to {MOCK_DATA_PATH}...")
    with open(MOCK_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
    file_size_mb = MOCK_DATA_PATH.stat().st_size / (1024 * 1024)
    print(f"  Written: {MOCK_DATA_PATH} ({file_size_mb:.1f} MB)")

    # Generate and write summary
    summary = generate_summary(records, patient_pool, lakshmi_visits)
    print(f"\nWriting summary to {MOCK_SUMMARY_PATH}...")
    with open(MOCK_SUMMARY_PATH, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    summary_size_kb = MOCK_SUMMARY_PATH.stat().st_size / 1024
    print(f"  Written: {MOCK_SUMMARY_PATH} ({summary_size_kb:.1f} KB)")

    # Print key stats
    print()
    print("=" * 60)
    print("Generation Complete — Key Statistics")
    print("=" * 60)
    print(f"  Total consultations:      {summary['total_consultations']}")
    print(f"  Unique patients:          {summary['unique_patients']}")
    print(f"  Working days:             {summary['working_days']}")
    print(f"  Avg per doctor per day:   {summary['avg_per_doctor_per_day']}")
    print(f"  Avg consultation (sec):   {summary['avg_consultation_duration']}")
    print(f"  Avg note generation (s):  {summary['avg_note_generation_time']}")
    print(f"  Avg doc completeness:     {summary['avg_documentation_completeness']}")
    print()

    # Doctor breakdown
    print("  Doctor Performance:")
    for doc_id in sorted(summary["doctor_stats"]):
        ds = summary["doctor_stats"][doc_id]
        flag = " *** OUTLIER" if doc_id == "DR-005" else ""
        print(f"    {ds['name']:15s}  consults={ds['total_consults']:5d}  "
              f"abx={ds['antibiotic_rate']:.1%}  ppi={ds['ppi_rate']:.1%}  "
              f"avg_dur={ds['avg_duration']:.0f}s{flag}")

    print()
    print(f"  Safety events flagged:    {summary['safety_summary']['total_interactions']}")
    print(f"    HIGH severity:          {summary['safety_summary']['high_severity']}")
    print(f"    MODERATE severity:      {summary['safety_summary']['moderate_severity']}")
    print(f"    LOW severity:           {summary['safety_summary']['low_severity']}")
    print(f"    CRITICAL (withdrawn):   {summary['safety_summary']['critical_count']}")
    print()

    # Mrs. Lakshmi
    print(f"  Mrs. Lakshmi Devi visits: {len(summary['mrs_lakshmi_visits'])}")
    for lv in summary["mrs_lakshmi_visits"]:
        diag_str = ", ".join(d["code"] for d in lv["diagnoses"])
        flags = len(lv.get("interactions_flagged", [])) + len(lv.get("safety_flags", []))
        print(f"    {lv['date']} | {lv['doctor_name']:15s} | {diag_str} | flags={flags}")

    print()
    print("Done.")


if __name__ == "__main__":
    main()
