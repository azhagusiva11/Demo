'use client';

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';
const RED = '#C0392B';
const GREEN = '#27774A';

export default function PatientTimeline() {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold" style={{ color: NAVY }}>Mrs. Lakshmi — Longitudinal Patient Timeline</h3>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-3 bottom-3 w-px" style={{ backgroundColor: '#E5E0D8' }} />

        {/* Visit 1 */}
        <div className="relative mb-8">
          <div className="absolute -left-5 top-1 w-4 h-4 rounded-full border-2" style={{ backgroundColor: GREEN, borderColor: GREEN }} />
          <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0' }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>January 2026</p>
            <p className="text-sm font-bold mt-1" style={{ color: NAVY }}>Visit 1 — Dr. Anand</p>
            <p className="text-sm mt-2" style={{ color: '#4A4540' }}>
              Diabetes review. HbA1c 7.8%. Metformin + Glimepiride.
            </p>
            <p className="text-sm mt-1" style={{ color: '#4A4540' }}>
              Joint pain mentioned as secondary complaint. Recorded as M25.50.
            </p>
            <div className="mt-3 rounded px-3 py-2" style={{ backgroundColor: '#F5F3EF', border: '1px solid #E5E0D8' }}>
              <p className="text-xs" style={{ color: '#7A7267' }}>System state: 1 visit. Baseline. No patterns.</p>
            </div>
          </div>
        </div>

        {/* Visit 2 */}
        <div className="relative mb-8">
          <div className="absolute -left-5 top-1 w-4 h-4 rounded-full border-2" style={{ backgroundColor: AMBER, borderColor: AMBER }} />
          <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0' }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>April 2026</p>
            <p className="text-sm font-bold mt-1" style={{ color: NAVY }}>Visit 2 — Dr. Priya</p>
            <p className="text-sm mt-2" style={{ color: '#4A4540' }}>
              Fatigue + numbness in feet + worsening joint pain.
            </p>
            {/* Safety flag */}
            <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: '#FDF0F0', border: `1px solid ${RED}`, borderLeft: `4px solid ${RED}` }}>
              <p className="text-xs font-bold" style={{ color: RED }}>
                SAFETY: Tramadol prescribed. Interaction with Glimepiride flagged — hypoglycemia risk. Substituted with paracetamol.
              </p>
            </div>
            <div className="mt-3 rounded px-3 py-2" style={{ backgroundColor: '#F5F3EF', border: '1px solid #E5E0D8' }}>
              <p className="text-xs" style={{ color: '#7A7267' }}>
                System state: 2 visits. Pattern forming. Joint pain (V1) + neuro symptoms (V2). Tempo: progressive. Topology: MSK + neurological.
              </p>
            </div>
          </div>
        </div>

        {/* Visit 3 */}
        <div className="relative">
          <div className="absolute -left-5 top-1 w-4 h-4 rounded-full border-2" style={{ backgroundColor: RED, borderColor: RED }} />
          <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0' }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>August 2026</p>
            <p className="text-sm font-bold mt-1" style={{ color: NAVY }}>Visit 3 — Dr. Rajan</p>
            <p className="text-sm mt-2" style={{ color: '#4A4540' }}>
              Routine checkup. Proteinuria found. eGFR: 72.
            </p>
            {/* Pattern alert */}
            <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: '#FFF8F0', border: `1px solid ${AMBER}`, borderLeft: `4px solid ${AMBER}` }}>
              <p className="text-xs font-bold" style={{ color: AMBER }}>
                PATTERN: Three organ systems involved across 8 months. MSK → neurological → renal. Sequential multi-system progression. Consider differential beyond standard diabetic nephropathy.
              </p>
            </div>
            <div className="mt-3 rounded px-3 py-2" style={{ backgroundColor: '#F5F3EF', border: '1px solid #E5E0D8' }}>
              <p className="text-xs" style={{ color: '#7A7267' }}>
                System state: 3 visits. Classification — Tempo: progressive. Topology: MSK → neuro → renal (sequential). Trajectory: progressive multi-system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insight bar */}
      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0', borderLeft: `4px solid ${AMBER}` }}>
        <p className="text-sm" style={{ color: NAVY }}>
          No individual doctor saw the full picture. The structured longitudinal record connected three isolated visits into a clinical trajectory. Previously trapped in three separate paper records across three different doctors.
        </p>
      </div>
    </div>
  );
}
