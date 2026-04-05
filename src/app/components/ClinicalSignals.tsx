'use client';

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';

const signals = [
  {
    observation: 'Possible pyelonephritis under-recognition',
    reason: '67 patients presented with dysuria. 12 also mentioned flank pain during consultation. Only 3 had urine culture ordered.',
    action: 'Spoken symptom capture surfaced a possible escalation gap not visible in coded workflows.',
  },
  {
    observation: 'Peripheral neuropathy screening gap',
    reason: '38 diabetic patients mentioned numbness or tingling. 22 had no nerve conduction study or B12 level ordered.',
    action: 'Early neuropathy detection opportunity identified from unstructured spoken complaints.',
  },
  {
    observation: 'Multi-system progressive pattern — cross-visit detection',
    reason: '1 patient (Mrs. Lakshmi, 52F, diabetic). Visit 1: joint pain alongside diabetes. Visit 2 (different doctor): fatigue + numbness — Tramadol interaction caught and blocked. Visit 3 (third doctor): proteinuria found. No single doctor saw the full trajectory.',
    action: 'System connected three visits across 8 months. Pattern classification: progressive tempo, sequential multi-system topology (MSK \u2192 neurological \u2192 renal), worsening trajectory.',
  },
];

export default function ClinicalSignals() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold" style={{ color: NAVY }}>Clinical Signals from Structured Consultation Data</h3>
        <p className="text-xs mt-1" style={{ color: '#7A7267' }}>
          Patterns surfaced from spoken clinical data — not visible in routine coding workflows
        </p>
      </div>

      {signals.map((signal, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-5"
          style={{ border: '1px solid #e8e5e0', borderTop: `3px solid ${AMBER}` }}
        >
          <p className="text-sm font-bold" style={{ color: NAVY }}>{signal.observation}</p>
          <p className="text-sm mt-2" style={{ color: '#4A4540' }}>{signal.reason}</p>
          <p className="text-sm mt-2 italic" style={{ color: '#7A7267' }}>{signal.action}</p>
        </div>
      ))}
    </div>
  );
}
