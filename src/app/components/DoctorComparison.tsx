'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface DoctorStat {
  name: string;
  antibiotic_rate: number;
  ppi_rate: number;
  total_consults: number;
  avg_duration: number;
}

interface Props {
  doctorStats: Record<string, DoctorStat>;
}

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';
const RED = '#C0392B';

export default function DoctorComparison({ doctorStats }: Props) {
  const data = Object.entries(doctorStats).map(([id, d]) => ({
    name: d.name,
    consults: d.total_consults,
    abxRate: Math.round(d.antibiotic_rate * 100),
    ppiRate: Math.round(d.ppi_rate * 100),
    avgDuration: Math.round(d.avg_duration / 60 * 10) / 10,
    isOutlier: d.antibiotic_rate > 0.4 || d.ppi_rate > 0.5,
  }));

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-bold mb-1" style={{ color: NAVY }}>Physician Comparison</h3>
      <p className="text-xs mb-4" style={{ color: '#7A7267' }}>Prescribing patterns across 5 physicians — top 5 drug categories</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#1B2A4A' }} />
          <YAxis tick={{ fontSize: 11, fill: '#7A7267' }} domain={[0, 80]} tickFormatter={v => `${v}%`} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
            formatter={(value: any, name: any) => [`${value}%`, name]}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar name="Antibiotic %" dataKey="abxRate" radius={[4, 4, 0, 0]} maxBarSize={35}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.abxRate > 40 ? RED : NAVY} />
            ))}
          </Bar>
          <Bar name="PPI %" dataKey="ppiRate" radius={[4, 4, 0, 0]} maxBarSize={35}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.ppiRate > 50 ? RED : AMBER} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Stats table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E0D8' }}>
              <th className="text-left px-3 py-1.5 font-semibold" style={{ color: '#7A7267' }}>Doctor</th>
              <th className="text-right px-3 py-1.5 font-semibold" style={{ color: '#7A7267' }}>Consults</th>
              <th className="text-right px-3 py-1.5 font-semibold" style={{ color: '#7A7267' }}>Avg Duration</th>
              <th className="text-right px-3 py-1.5 font-semibold" style={{ color: '#7A7267' }}>ABx Rate</th>
              <th className="text-right px-3 py-1.5 font-semibold" style={{ color: '#7A7267' }}>PPI Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.name} style={{ borderBottom: '1px solid #F0EDE8' }}>
                <td className="px-3 py-2 font-medium" style={{ color: d.isOutlier ? RED : '#1B2A4A' }}>
                  {d.name} {d.isOutlier && '⚠'}
                </td>
                <td className="px-3 py-2 text-right" style={{ color: '#1B2A4A' }}>{d.consults}</td>
                <td className="px-3 py-2 text-right" style={{ color: '#7A7267' }}>{d.avgDuration} min</td>
                <td className="px-3 py-2 text-right font-bold" style={{ color: d.abxRate > 40 ? RED : '#1B2A4A' }}>{d.abxRate}%</td>
                <td className="px-3 py-2 text-right font-bold" style={{ color: d.ppiRate > 50 ? RED : '#1B2A4A' }}>{d.ppiRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
