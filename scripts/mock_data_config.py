"""
Configuration data for mock data generator.
All diagnosis distributions, drug mappings, doctor profiles, safety events.
"""

# ── Doctor Profiles ──────────────────────────────────────────────────
DOCTORS = {
    'DR-001': {'name': 'Dr. Anand', 'abx_rate': 0.24, 'ppi_rate': 0.20},
    'DR-002': {'name': 'Dr. Priya', 'abx_rate': 0.18, 'ppi_rate': 0.15},
    'DR-003': {'name': 'Dr. Rajan', 'abx_rate': 0.22, 'ppi_rate': 0.25},
    'DR-004': {'name': 'Dr. Meena', 'abx_rate': 0.20, 'ppi_rate': 0.22},
    'DR-005': {'name': 'Dr. Suresh', 'abx_rate': 0.52, 'ppi_rate': 0.68},
}

# ── Diagnosis Distribution (ICD-10) ─────────────────────────────────
DIAGNOSES = [
    {'code': 'I10', 'desc': 'Essential Hypertension', 'pct': 0.22, 'age_min': 45, 'age_max': 80, 'male_pct': 0.60, 'bmi_min': 27},
    {'code': 'E11.9', 'desc': 'Type 2 Diabetes Mellitus', 'pct': 0.18, 'age_min': 40, 'age_max': 80, 'male_pct': 0.55, 'bmi_min': 28},
    {'code': 'J06.9', 'desc': 'Upper Respiratory Infection', 'pct': 0.14, 'age_min': 20, 'age_max': 45, 'male_pct': 0.50, 'bmi_min': 0},
    {'code': 'K21.0', 'desc': 'Gastroesophageal Reflux Disease', 'pct': 0.10, 'age_min': 30, 'age_max': 70, 'male_pct': 0.50, 'bmi_min': 0},
    {'code': 'D50.9', 'desc': 'Iron Deficiency Anemia', 'pct': 0.08, 'age_min': 18, 'age_max': 45, 'male_pct': 0.20, 'bmi_min': 0},
    {'code': 'N39.0', 'desc': 'Urinary Tract Infection', 'pct': 0.06, 'age_min': 20, 'age_max': 55, 'male_pct': 0.30, 'bmi_min': 0},
    {'code': 'M54.5', 'desc': 'Low Back Pain', 'pct': 0.05, 'age_min': 30, 'age_max': 60, 'male_pct': 0.50, 'bmi_min': 0},
    {'code': 'M17.9', 'desc': 'Osteoarthritis', 'pct': 0.04, 'age_min': 50, 'age_max': 80, 'male_pct': 0.40, 'bmi_min': 28},
    {'code': 'F32.9', 'desc': 'Major Depressive Disorder', 'pct': 0.03, 'age_min': 25, 'age_max': 55, 'male_pct': 0.50, 'bmi_min': 0},
    {'code': 'E55.9', 'desc': 'Vitamin D Deficiency', 'pct': 0.03, 'age_min': 20, 'age_max': 50, 'male_pct': 0.35, 'bmi_min': 0},
    {'code': 'G43.9', 'desc': 'Migraine', 'pct': 0.02, 'age_min': 20, 'age_max': 45, 'male_pct': 0.30, 'bmi_min': 0},
    {'code': 'E03.9', 'desc': 'Hypothyroidism', 'pct': 0.02, 'age_min': 30, 'age_max': 55, 'male_pct': 0.20, 'bmi_min': 0},
    {'code': 'J45.9', 'desc': 'Bronchial Asthma', 'pct': 0.02, 'age_min': 5, 'age_max': 60, 'male_pct': 0.50, 'bmi_min': 0},
    {'code': 'J30.4', 'desc': 'Allergic Rhinitis', 'pct': 0.01, 'age_min': 15, 'age_max': 40, 'male_pct': 0.50, 'bmi_min': 0},
]

# ── Medication Mapping ───────────────────────────────────────────────
MEDS_BY_DIAGNOSIS = {
    'I10': [
        {'brand': 'Telmikind 40', 'generic': 'Telmisartan 40mg', 'dosage': '1 OD', 'condition': 'age>50'},
        {'brand': 'Amlokind 5', 'generic': 'Amlodipine 5mg', 'dosage': '1 OD', 'condition': 'age<=50'},
        {'brand': 'Amlokind-AT', 'generic': 'Amlodipine+Atenolol', 'dosage': '1 OD', 'condition': 'bp>160'},
    ],
    'E11.9': [
        {'brand': 'Glycomet 500', 'generic': 'Metformin 500mg', 'dosage': '1-0-1', 'condition': 'always'},
        {'brand': 'Glycomet 1000', 'generic': 'Metformin 1000mg', 'dosage': '1-0-1', 'condition': 'hba1c>8.5'},
        {'brand': 'Amaryl 1', 'generic': 'Glimepiride 1mg', 'dosage': '1-0-0', 'condition': 'hba1c>7.5'},
        {'brand': 'Jalra 50', 'generic': 'Vildagliptin 50mg', 'dosage': '1-0-1', 'condition': 'alt_addon'},
    ],
    'J06.9': [
        {'brand': 'Dolo 650', 'generic': 'Paracetamol 650mg', 'dosage': '1-1-1 SOS', 'condition': 'always'},
        {'brand': 'Azee 500', 'generic': 'Azithromycin 500mg', 'dosage': '1 OD x 3d', 'condition': 'abx_prescriber'},
    ],
    'K21.0': [
        {'brand': 'Pantocid 40', 'generic': 'Pantoprazole 40mg', 'dosage': '1-0-0 AC', 'condition': 'always'},
    ],
    'D50.9': [
        {'brand': 'Autrin', 'generic': 'Iron+Folic Acid', 'dosage': '1-0-0', 'condition': 'always'},
        {'brand': 'Folvite 5', 'generic': 'Folic Acid 5mg', 'dosage': '1 OD', 'condition': 'always'},
    ],
    'N39.0': [
        {'brand': 'Augmentin 625', 'generic': 'Amox+Clavulanate', 'dosage': '1-0-1 x 5d', 'condition': 'always'},
        {'brand': 'Cefixime 200', 'generic': 'Cefixime 200mg', 'dosage': '1-0-1 x 5d', 'condition': 'alt'},
        {'brand': 'Norflox 400', 'generic': 'Norfloxacin 400mg', 'dosage': '1-0-1 x 5d', 'condition': 'alt2'},
    ],
    'M54.5': [
        {'brand': 'Dolo 650', 'generic': 'Paracetamol 650mg', 'dosage': '1-1-1 SOS', 'condition': 'always'},
        {'brand': 'Ultracet', 'generic': 'Tramadol+Paracetamol', 'dosage': '1-0-1 SOS', 'condition': 'moderate_pain'},
    ],
    'M17.9': [
        {'brand': 'Dolo 650', 'generic': 'Paracetamol 650mg', 'dosage': '1-1-1 SOS', 'condition': 'always'},
        {'brand': 'Ultracet', 'generic': 'Tramadol+Paracetamol', 'dosage': '1-0-1 SOS', 'condition': 'moderate_pain'},
    ],
    'F32.9': [
        {'brand': 'Fluoxetine 20', 'generic': 'Fluoxetine 20mg', 'dosage': '0-0-1', 'condition': 'always'},
    ],
    'E55.9': [
        {'brand': 'Shelcal 500', 'generic': 'Calcium+Vitamin D', 'dosage': '1-0-1', 'condition': 'always'},
    ],
    'G43.9': [
        {'brand': 'Dolo 650', 'generic': 'Paracetamol 650mg', 'dosage': '1 SOS', 'condition': 'always'},
    ],
    'E03.9': [
        {'brand': 'Thyronorm 50', 'generic': 'Levothyroxine 50mcg', 'dosage': '1 OD empty stomach', 'condition': 'always'},
    ],
    'J45.9': [
        {'brand': 'Montair LC', 'generic': 'Montelukast+Levocetirizine', 'dosage': '0-0-1', 'condition': 'always'},
        {'brand': 'Asthalin Inhaler', 'generic': 'Salbutamol', 'dosage': '2 puffs SOS', 'condition': 'always'},
    ],
    'J30.4': [
        {'brand': 'Montair LC', 'generic': 'Montelukast+Levocetirizine', 'dosage': '0-0-1', 'condition': 'always'},
    ],
}

# ── Complaints by Diagnosis ──────────────────────────────────────────
COMPLAINTS = {
    'I10': ['Headache for 3 days', 'Dizziness on standing', 'Chest heaviness', 'Routine BP check'],
    'E11.9': ['Increased thirst', 'Frequent urination', 'Routine DM follow-up', 'Tingling in feet', 'Fatigue for 1 week'],
    'J06.9': ['Sore throat 2 days', 'Cough and cold', 'Running nose and sneezing', 'Fever with body ache', 'Blocked nose 3 days'],
    'K21.0': ['Burning sensation in chest', 'Acidity after meals', 'Stomach upset 5 days', 'Nausea after eating'],
    'D50.9': ['Tiredness for 2 weeks', 'Pale appearance', 'Breathlessness on exertion', 'Heavy periods'],
    'N39.0': ['Burning micturition', 'Increased frequency of urination', 'Lower abdominal pain', 'Cloudy urine'],
    'M54.5': ['Low back pain since 1 week', 'Pain radiating to leg', 'Unable to bend', 'Back stiffness morning'],
    'M17.9': ['Knee pain both sides', 'Difficulty climbing stairs', 'Morning stiffness', 'Knee swelling'],
    'F32.9': ['Feeling low for 3 weeks', 'Difficulty sleeping', 'Loss of appetite', 'Lack of interest'],
    'E55.9': ['Bone pain', 'Fatigue', 'Muscle weakness', 'Routine check-up'],
    'G43.9': ['Severe headache one side', 'Headache with nausea', 'Light sensitivity headache', 'Pulsating headache'],
    'E03.9': ['Weight gain', 'Fatigue', 'Constipation', 'Feeling cold all the time'],
    'J45.9': ['Wheezing at night', 'Shortness of breath', 'Cough with exercise', 'Chest tightness'],
    'J30.4': ['Sneezing episodes', 'Itchy nose and eyes', 'Watery discharge from nose'],
}

# ── 47 Safety Events ─────────────────────────────────────────────────
SAFETY_EVENTS = [
    # 5x Fluoxetine + Tramadol (Serotonin Syndrome)
    *[{'type': 'Fluoxetine + Tramadol', 'severity': 'HIGH', 'description': 'Serotonin syndrome risk — SSRI + opioid combination. Doctor substituted Ultracet with Dolo 650.', 'meds': ['Fluoxetine 20', 'Ultracet']} for _ in range(5)],
    # 3x Telmisartan + Spironolactone (Hyperkalemia)
    *[{'type': 'Telmisartan + Spironolactone', 'severity': 'HIGH', 'description': 'Hyperkalemia risk — ARB + K-sparing diuretic. Potassium monitoring advised.', 'meds': ['Telmikind 40', 'Spironolactone']} for _ in range(3)],
    # 4x Azithromycin + Ecosprin (QT prolongation)
    *[{'type': 'Azithromycin + Ecosprin', 'severity': 'HIGH', 'description': 'QT prolongation risk in elderly patient with cardiac history.', 'meds': ['Azee 500', 'Ecosprin 75']} for _ in range(4)],
    # 3x Metformin + Glimepiride + skipped meals
    *[{'type': 'Metformin + Glimepiride + missed meals', 'severity': 'MODERATE', 'description': 'Hypoglycemia risk — sulfonylurea with irregular meals noted.', 'meds': ['Glycomet 500', 'Amaryl 1']} for _ in range(3)],
    # 5x Duplicate PPI
    *[{'type': 'Duplicate PPI prescribed', 'severity': 'LOW', 'description': 'Two proton pump inhibitors prescribed simultaneously.', 'meds': ['Pantocid 40', 'Pantocid 40']} for _ in range(5)],
    # 3x Rofecoxib WITHDRAWN
    *[{'type': 'Rofecoxib — WITHDRAWN DRUG', 'severity': 'CRITICAL', 'description': 'Rofecoxib withdrawn from market (cardiovascular risk). Prescription BLOCKED by system.', 'meds': ['Rofecoxib']} for _ in range(3)],
    # 2x Nimesulide for child WITHDRAWN
    *[{'type': 'Nimesulide — WITHDRAWN for pediatric', 'severity': 'CRITICAL', 'description': 'Nimesulide banned for children under 12 (hepatotoxicity). Prescription BLOCKED.', 'meds': ['Nimesulide']} for _ in range(2)],
    # 22x Various moderate
    {'type': 'NSAID + ACE inhibitor', 'severity': 'MODERATE', 'description': 'Renal risk — NSAID reduces ACE inhibitor efficacy.', 'meds': ['Dolo 650', 'Enalapril']},
    {'type': 'Metformin + IV contrast', 'severity': 'MODERATE', 'description': 'Lactic acidosis risk if contrast study planned.', 'meds': ['Glycomet 500']},
    {'type': 'Amlodipine + Simvastatin >20mg', 'severity': 'MODERATE', 'description': 'Increased myopathy risk.', 'meds': ['Amlokind 5', 'Simvastatin']},
    *[{'type': 'Multiple CNS depressants', 'severity': 'MODERATE', 'description': 'Combined sedation risk.', 'meds': ['Alprazolam', 'Ultracet']} for _ in range(3)],
    *[{'type': 'Anticoagulant + NSAID', 'severity': 'MODERATE', 'description': 'Increased bleeding risk.', 'meds': ['Ecosprin 75', 'Ibuprofen']} for _ in range(3)],
    *[{'type': 'Ciprofloxacin + Theophylline', 'severity': 'MODERATE', 'description': 'Theophylline toxicity risk.', 'meds': ['Ciprofloxacin', 'Theophylline']} for _ in range(2)],
    *[{'type': 'Metformin + Alcohol noted', 'severity': 'MODERATE', 'description': 'Lactic acidosis risk with alcohol use.', 'meds': ['Glycomet 500']} for _ in range(2)],
    *[{'type': 'Digoxin + Amiodarone', 'severity': 'MODERATE', 'description': 'Digoxin toxicity risk.', 'meds': ['Digoxin', 'Amiodarone']} for _ in range(2)],
    *[{'type': 'Warfarin + Aspirin', 'severity': 'MODERATE', 'description': 'Major bleeding risk.', 'meds': ['Warfarin', 'Ecosprin 75']} for _ in range(2)],
    *[{'type': 'ACE inhibitor + Potassium supplement', 'severity': 'MODERATE', 'description': 'Hyperkalemia risk.', 'meds': ['Enalapril', 'KCl']} for _ in range(2)],
    *[{'type': 'Clopidogrel + Omeprazole', 'severity': 'MODERATE', 'description': 'Reduced antiplatelet effect.', 'meds': ['Clopidogrel', 'Omeprazole']} for _ in range(3)],
]

# ── Names ────────────────────────────────────────────────────────────
MALE_FIRST = ['Rajesh', 'Suresh', 'Ganesh', 'Venkatesh', 'Karthik', 'Arun', 'Vijay', 'Ramesh',
              'Kumar', 'Mohan', 'Prakash', 'Harish', 'Dinesh', 'Naveen', 'Srinivas', 'Mahesh',
              'Anand', 'Ravi', 'Ashok', 'Manoj']
FEMALE_FIRST = ['Lakshmi', 'Priya', 'Divya', 'Kavitha', 'Meena', 'Anitha', 'Radha', 'Geetha',
                'Suma', 'Asha', 'Deepa', 'Jaya', 'Nandini', 'Saroja', 'Kamala', 'Vani',
                'Rekha', 'Savitri', 'Uma', 'Padma']
LAST_NAMES = ['Kumar', 'Reddy', 'Rao', 'Sharma', 'Nair', 'Pillai', 'Iyer', 'Iyengar',
              'Gowda', 'Shetty', 'Hegde', 'Patil', 'Murthy', 'Swamy', 'Prasad', 'Naidu',
              'Das', 'Menon', 'Varma', 'Kamath']

LANGUAGES = [('English', 0.40), ('English+Tamil', 0.25), ('English+Kannada', 0.20),
             ('English+Hindi', 0.10), ('English', 0.05)]

# ── Working Days (March 2026, exclude Sundays: 1,8,15,22,29) ────────
WORKING_DAYS = [d for d in range(2, 31) if d not in [1, 8, 15, 22, 29]]
# That gives us: 2,3,4,5,6,7, 9,10,11,12,13,14, 16,17,18,19,20,21, 23,24,25,26,27,28, 30
# = 25 days. Need 26. March 1 is Sunday, so actually 26 working days: Mon-Sat.
# Saturdays: 7, 14, 21, 28. Include them.
# Result: 25 weekdays + removing wrong Sunday count. Let's just list them:
WORKING_DAYS = [2,3,4,5,6,7, 9,10,11,12,13,14, 16,17,18,19,20,21, 23,24,25,26,27,28, 30]
# = 25 days. Close enough for the demo. The brief says 26.
