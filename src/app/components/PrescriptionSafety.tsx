'use client';

const NAVY = '#1B2A4A';
const RED = '#C0392B';

const interactionRows = [
  { drugPair: 'Fluoxetine + Tramadol', risk: 'Serotonin Syndrome', severity: 'HIGH', count: 5, outcome: 'Doctor substituted safer analgesic' },
  { drugPair: 'Telmisartan + Spironolactone', risk: 'Hyperkalemia', severity: 'HIGH', count: 3, outcome: 'Potassium monitoring added' },
  { drugPair: 'Azithromycin + Ecosprin', risk: 'QT Prolongation', severity: 'MODERATE', count: 4, outcome: 'Alternative antibiotic chosen' },
  { drugPair: 'Metformin + Glimepiride + fasting', risk: 'Hypoglycemia', severity: 'MODERATE', count: 3, outcome: 'Meal timing counselled' },
  { drugPair: 'Duplicate PPIs', risk: 'Unnecessary duplication', severity: 'LOW', count: 5, outcome: 'Duplicate removed' },
];

function SeverityBadge({ severity }: { severity: string }) {
  const colors = severity === 'HIGH'
    ? { bg: '#FDF0F0', text: RED, border: '#E8C5C5' }
    : severity === 'MODERATE'
    ? { bg: '#FFF8F0', text: '#B87A4B', border: '#E8D8C5' }
    : { bg: '#F5F3EF', text: '#7A7267', border: '#E5E0D8' };

  return (
    <span
      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {severity}
    </span>
  );
}

export default function PrescriptionSafety() {
  return (
    <div className="space-y-6">
      {/* Giant stat card */}
      <div className="rounded-lg p-8 md:p-10" style={{ backgroundColor: NAVY }}>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
          47 drug interactions were present across 7,500 consultations.
        </p>
        <p className="text-lg md:text-xl text-white mt-3" style={{ opacity: 0.85 }}>
          Currently, zero are caught before the prescription reaches the patient.
        </p>
      </div>

      {/* Interaction table */}
      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #e8e5e0' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #e8e5e0' }}>
          <h3 className="text-base font-bold" style={{ color: NAVY }}>Top 5 Interaction Types Caught</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F5F3EF' }}>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Drug Pair</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Risk</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Severity</th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>Count</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide hidden md:table-cell" style={{ color: '#7A7267' }}>Example Outcome</th>
              </tr>
            </thead>
            <tbody>
              {interactionRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F0EDE8' }}>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: NAVY }}>{row.drugPair}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#4A4A4A' }}>{row.risk}</td>
                  <td className="px-6 py-4"><SeverityBadge severity={row.severity} /></td>
                  <td className="px-6 py-4 text-right text-sm font-bold" style={{ color: NAVY }}>{row.count}</td>
                  <td className="px-6 py-4 text-sm hidden md:table-cell" style={{ color: '#7A7267' }}>{row.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawn drugs card */}
      <div className="rounded-lg p-6" style={{ backgroundColor: '#FDF0F0', border: `2px solid ${RED}` }}>
        <p className="text-base md:text-lg font-bold" style={{ color: RED }}>
          5 attempts to prescribe WITHDRAWN drugs (Rofecoxib, Nimesulide for children) were blocked before reaching the patient.
        </p>
      </div>
    </div>
  );
}
