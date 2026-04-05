'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

interface DoctorStat {
  name: string;
  antibiotic_rate: number;
  ppi_rate: number;
  total_consults: number;
}

interface Props {
  doctorStats: Record<string, DoctorStat>;
}

const NAVY = '#1B2A4A';
const RED = '#C0392B';

export default function AntibioticStewardship({ doctorStats }: Props) {
  const data = Object.values(doctorStats).map(d => ({
    name: d.name,
    rate: Math.round(d.antibiotic_rate * 100),
    consults: d.total_consults,
    isOutlier: d.antibiotic_rate > 0.4,
  }));

  const deptMean = Math.round(
    Object.values(doctorStats).reduce((sum, d) => sum + d.antibiotic_rate, 0) / Object.values(doctorStats).length * 100
  );

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-bold mb-1" style={{ color: NAVY }}>Antibiotic Stewardship</h3>
      <p className="text-xs mb-4" style={{ color: '#7A7267' }}>Antibiotic prescription rate per physician — department target: &lt;20%</p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ left: 10, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#1B2A4A' }} />
          <YAxis
            tick={{ fontSize: 11, fill: '#7A7267' }}
            domain={[0, 60]}
            tickFormatter={v => `${v}%`}
          />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
            formatter={(value: any) => [`${value}%`, 'Antibiotic Rate']}
          />
          <ReferenceLine
            y={deptMean}
            stroke="#B87A4B"
            strokeDasharray="6 4"
            strokeWidth={2}
            label={{ value: `Dept Mean: ${deptMean}%`, position: 'right', fontSize: 10, fill: '#B87A4B' }}
          />
          <ReferenceLine
            y={20}
            stroke="#27774A"
            strokeDasharray="3 3"
            label={{ value: 'Target: 20%', position: 'right', fontSize: 10, fill: '#27774A' }}
          />
          <Bar dataKey="rate" radius={[4, 4, 0, 0]} maxBarSize={50}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.isOutlier ? RED : NAVY} fillOpacity={entry.isOutlier ? 1 : 0.75} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Outlier insight card */}
      {data.some(d => d.isOutlier) && (
        <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: '#FDF0F0', border: '1px solid #E8C5C5' }}>
          <p className="text-xs font-bold" style={{ color: RED }}>
            Outlier Detected: {data.find(d => d.isOutlier)?.name} at {data.find(d => d.isOutlier)?.rate}%
          </p>
          <p className="text-xs mt-1" style={{ color: '#8B4040' }}>
            Prescribes Azithromycin in most URI cases. Department norm: supportive care with Paracetamol only.
          </p>
        </div>
      )}
    </div>
  );
}
