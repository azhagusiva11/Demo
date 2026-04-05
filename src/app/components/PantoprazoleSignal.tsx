'use client';

import { AlertTriangle } from 'lucide-react';

interface DoctorStat {
  name: string;
  ppi_rate: number;
  total_consults: number;
}

interface Props {
  doctorStats: Record<string, DoctorStat>;
  totalConsultations: number;
}

const AMBER = '#B87A4B';

export default function PantoprazoleSignal({ doctorStats, totalConsultations }: Props) {
  const docs = Object.values(doctorStats);
  const overallPpiRate = docs.reduce((s, d) => s + d.ppi_rate * d.total_consults, 0) / totalConsultations;
  const overallPct = Math.round(overallPpiRate * 100);
  // Rough cost estimate: Pantocid 40 ~₹5/tablet, 1 OD for avg 10 days
  const avoidableCases = Math.round(totalConsultations * (overallPpiRate - 0.10)); // 10% is justified
  const monthlyCost = avoidableCases * 50; // ₹5 * 10 days

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm" style={{ borderLeft: `4px solid ${AMBER}` }}>
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: AMBER }} />
        <div>
          <h3 className="text-sm font-bold" style={{ color: '#1B2A4A' }}>Pantoprazole Over-Prescription Signal</h3>
          <p className="text-xs mt-1" style={{ color: '#7A7267' }}>
            Pantocid 40 prescribed in <strong>{overallPct}%</strong> of all consultations.
            Only ~10% have gastric symptoms as primary complaint.
          </p>
        </div>
      </div>

      {/* Doctor breakdown */}
      <div className="space-y-2 mb-4">
        {docs.sort((a, b) => b.ppi_rate - a.ppi_rate).map(d => {
          const pct = Math.round(d.ppi_rate * 100);
          const isOutlier = d.ppi_rate > 0.5;
          return (
            <div key={d.name} className="flex items-center gap-3">
              <span className="text-xs w-24 shrink-0" style={{ color: '#1B2A4A' }}>{d.name}</span>
              <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ backgroundColor: '#F0EDE8' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    backgroundColor: isOutlier ? '#C0392B' : AMBER,
                  }}
                />
              </div>
              <span className="text-xs font-bold w-10 text-right" style={{ color: isOutlier ? '#C0392B' : '#1B2A4A' }}>
                {pct}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Cost insight */}
      <div className="rounded-lg p-3" style={{ backgroundColor: '#FFF8F0', border: '1px solid #E8D8C5' }}>
        <p className="text-xs" style={{ color: '#8B6A40' }}>
          <strong>Estimated avoidable medication cost:</strong> ~₹{monthlyCost.toLocaleString('en-IN')}/month
          ({avoidableCases} potentially unnecessary prescriptions at ₹50/course)
        </p>
      </div>
    </div>
  );
}
