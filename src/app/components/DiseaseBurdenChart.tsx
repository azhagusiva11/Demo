'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DiagnosisItem {
  code: string;
  description: string;
  count: number;
  percentage: number;
}

interface Props {
  data: DiagnosisItem[];
}

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';

export default function DiseaseBurdenChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.count - a.count).slice(0, 12);

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-bold mb-1" style={{ color: NAVY }}>Disease Burden — Top 12 Diagnoses</h3>
      <p className="text-xs mb-4" style={{ color: '#7A7267' }}>30-day consultation distribution by ICD-10 category</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 160, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#7A7267' }} />
          <YAxis
            type="category"
            dataKey="description"
            tick={{ fontSize: 11, fill: '#1B2A4A' }}
            width={150}
          />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
            formatter={(value: any, _name: any, props: any) =>
              [`${value} (${props.payload.percentage.toFixed(1)}%)`, 'Consultations']
            }
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {sorted.map((_, i) => (
              <Cell key={i} fill={i < 3 ? AMBER : NAVY} fillOpacity={i < 3 ? 1 : 0.75} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
