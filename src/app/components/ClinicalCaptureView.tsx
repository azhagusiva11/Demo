'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';

interface DiagnosisItem {
  code: string;
  description: string;
  count: number;
  percentage: number;
}

interface Props {
  diagnosisDistribution: DiagnosisItem[];
}

export default function ClinicalCaptureView({ diagnosisDistribution }: Props) {
  const top10 = [...diagnosisDistribution]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(d => ({
      label: `${d.description} (${d.code})`,
      count: d.count,
      percentage: d.percentage,
    }));

  return (
    <div className="space-y-6">
      {/* Two stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>3.2</p>
          <p className="text-sm font-semibold mt-2" style={{ color: NAVY }}>Clinical Problems Addressed Per Consultation</p>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: '#7A7267' }}>
            Primary care literature reports 2.5–3.5 problems per visit. Standard coding workflows capture 1.0–1.5. Structured voice capture closes this gap.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>1,925</p>
          <p className="text-sm font-semibold mt-2" style={{ color: NAVY }}>Unique Patient Records Created</p>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: '#7A7267' }}>
            Each with structured diagnoses, medications, vitals, and clinical reasoning — linked longitudinally across visits
          </p>
        </div>
      </div>

      {/* Disease burden chart */}
      <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
        <h3 className="text-base font-bold" style={{ color: NAVY }}>What patients actually presented with</h3>
        <p className="text-xs mt-1 mb-6" style={{ color: '#7A7267' }}>
          Disease burden from structured consultation data — not from billing codes or discharge summaries
        </p>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={top10} layout="vertical" margin={{ left: 220, right: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#7A7267' }} />
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fontSize: 12, fill: NAVY, fontWeight: 500 }}
              width={210}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
              formatter={(value: any, _name: any, props: any) =>
                [`${Number(value).toLocaleString('en-IN')} (${props.payload.percentage}%)`, 'Consultations']
              }
            />
            <Bar dataKey="count" fill={NAVY} radius={[0, 4, 4, 0]} barSize={22} fillOpacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insight bar */}
      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0', borderLeft: `4px solid ${AMBER}` }}>
        <p className="text-sm" style={{ color: NAVY }}>
          This clinical profile is generated from what was spoken during consultations. It represents the actual disease burden of this department — visible for the first time in structured, queryable form.
        </p>
      </div>
    </div>
  );
}
