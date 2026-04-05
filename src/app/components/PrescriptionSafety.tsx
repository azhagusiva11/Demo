'use client';

const NAVY = '#1B2A4A';
const RED = '#C0392B';
const AMBER = '#B87A4B';

const interactionRows = [
  { drugs: 'SSRI + Tramadol', risk: 'Serotonin syndrome', severity: 'HIGH', cases: 5, evidence: 'Boyer & Shannon, NEJM 2005' },
  { drugs: 'ARB + K-sparing diuretic', risk: 'Hyperkalemia', severity: 'HIGH', cases: 3, evidence: 'Juurlink et al, BMJ 2004' },
  { drugs: 'Macrolide + Antiplatelet', risk: 'QT prolongation', severity: 'MODERATE', cases: 4, evidence: 'Ray et al, NEJM 2012' },
  { drugs: 'Sulfonylurea + Biguanide + fasting', risk: 'Hypoglycemia', severity: 'MODERATE', cases: 3, evidence: 'UKPDS, Lancet 1998' },
  { drugs: 'Duplicate therapeutic class', risk: 'Unnecessary exposure', severity: 'LOW', cases: 5, evidence: 'WHO Prescribing Indicators' },
];

function SeverityBadge({ severity }: { severity: string }) {
  const style = severity === 'HIGH'
    ? { bg: '#FDF0F0', text: RED, border: '#E8C5C5' }
    : severity === 'MODERATE'
    ? { bg: '#FFF8F0', text: AMBER, border: '#E8D8C5' }
    : { bg: '#F5F3EF', text: '#7A7267', border: '#E5E0D8' };

  return (
    <span
      className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      {severity}
    </span>
  );
}

interface Props {
  deptAvgMeds: number;
  deptAbxViralPct: number;
  deptPpiNonGastricPct: number;
}

export default function PrescriptionSafety({ deptAvgMeds, deptAbxViralPct, deptPpiNonGastricPct }: Props) {
  return (
    <div className="space-y-6">
      {/* Section header */}
      <h3 className="text-base font-bold" style={{ color: NAVY }}>Prescription Safety Events</h3>

      {/* Giant stat card */}
      <div className="rounded-lg p-8 md:p-10" style={{ backgroundColor: NAVY }}>
        <p className="text-5xl md:text-6xl font-bold text-white">47</p>
        <p className="text-lg md:text-xl text-white mt-3">
          Prescription safety events identified across 7,500 consultations
        </p>
        <p className="text-sm text-white mt-3" style={{ opacity: 0.75 }}>
          WHO Global Patient Safety Report: adverse drug events cause 1 in 30 hospital admissions. OPD prescriptions are not systematically checked at point of care.
        </p>
      </div>

      {/* Interaction table */}
      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #e8e5e0' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F5F3EF' }}>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Drug Combination</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Clinical Risk</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Severity</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Cases</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide hidden lg:table-cell" style={{ color: '#7A7267' }}>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {interactionRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F0EDE8' }}>
                  <td className="px-5 py-4 text-sm font-semibold" style={{ color: NAVY }}>{row.drugs}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#4A4540' }}>{row.risk}</td>
                  <td className="px-5 py-4"><SeverityBadge severity={row.severity} /></td>
                  <td className="px-5 py-4 text-right text-sm font-bold" style={{ color: NAVY }}>{row.cases}</td>
                  <td className="px-5 py-4 text-xs hidden lg:table-cell" style={{ color: '#7A7267' }}>{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawn drugs card */}
      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0', borderLeft: `4px solid ${RED}` }}>
        <p className="text-sm" style={{ color: RED }}>
          <strong>5 prescriptions for drugs withdrawn in India were blocked</strong> — Rofecoxib (Merck withdrawal 2004), Nimesulide paediatric (CDSCO ban 2011)
        </p>
      </div>

      {/* Department prescribing benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-2xl font-bold" style={{ color: NAVY }}>{deptAvgMeds}</p>
          <p className="text-xs font-semibold mt-1" style={{ color: NAVY }}>Avg medications per prescription</p>
          <p className="text-xs mt-2" style={{ color: '#7A7267' }}>WHO optimal: 1.6–2.8 (WHO Drug Use Investigation Guidelines, 1993)</p>
        </div>
        <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-2xl font-bold" style={{ color: AMBER }}>{deptAbxViralPct}%</p>
          <p className="text-xs font-semibold mt-1" style={{ color: NAVY }}>Antibiotics in viral URI</p>
          <p className="text-xs mt-2" style={{ color: '#7A7267' }}>WHO AWaRe: supportive care recommended for uncomplicated viral illness</p>
        </div>
        <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-2xl font-bold" style={{ color: AMBER }}>{deptPpiNonGastricPct}%</p>
          <p className="text-xs font-semibold mt-1" style={{ color: NAVY }}>PPI without gastric indication</p>
          <p className="text-xs mt-2" style={{ color: '#7A7267' }}>Cochrane 2020: routine co-prescription increases C. difficile risk</p>
        </div>
      </div>
    </div>
  );
}
