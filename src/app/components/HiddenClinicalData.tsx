'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';

const diagnosisData = [
  { name: 'Essential Hypertension', count: 1813 },
  { name: 'Gastroesophageal Reflux', count: 1799 },
  { name: 'Type 2 Diabetes Mellitus', count: 1590 },
  { name: 'Upper Respiratory Infection', count: 1244 },
  { name: 'Low Back Pain', count: 467 },
  { name: 'Urinary Tract Infection', count: 410 },
  { name: 'Iron Deficiency Anemia', count: 367 },
  { name: 'Major Depressive Disorder', count: 268 },
  { name: 'Vitamin D Deficiency', count: 193 },
  { name: 'Osteoarthritis', count: 180 },
];

export default function HiddenClinicalData() {
  return (
    <div className="space-y-6">
      {/* Two stat cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#7A7267' }}>Diagnoses Captured</p>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>3.2</p>
          <p className="text-sm mt-1" style={{ color: NAVY }}>average diagnoses per consultation</p>
          <p className="text-xs mt-3" style={{ color: '#7A7267' }}>
            Billing systems capture 1.1 diagnoses per visit. 2.1 diagnoses per visit are spoken, heard, and currently lost.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#7A7267' }}>Documentation Time</p>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: '#27774A' }}>32<span className="text-2xl ml-1">seconds</span></p>
          <p className="text-sm mt-1" style={{ color: NAVY }}>AI-generated clinical note</p>
          <p className="text-xs mt-3" style={{ color: '#7A7267' }}>
            Current method: 8–15 minutes. Notes done before the doctor moves to the next patient.
          </p>
        </div>
      </div>

      {/* Disease burden chart */}
      <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
        <h3 className="text-base font-bold mb-1" style={{ color: NAVY }}>
          Disease burden from what patients actually present with — not from billing codes.
        </h3>
        <p className="text-xs mb-4" style={{ color: '#7A7267' }}>Top 10 diagnoses by what was discussed in consultations</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={diagnosisData} layout="vertical" margin={{ left: 180, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#7A7267' }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: NAVY, fontWeight: 500 }}
              width={170}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [Number(value).toLocaleString('en-IN'), 'Consultations']}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {diagnosisData.map((_, i) => (
                <Cell key={i} fill={i < 3 ? AMBER : NAVY} fillOpacity={i < 3 ? 1 : 0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Three metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-5 text-center" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-3xl font-bold" style={{ color: '#27774A' }}>94%</p>
          <p className="text-xs font-semibold mt-1 uppercase tracking-wide" style={{ color: '#7A7267' }}>Documentation Completeness</p>
        </div>
        <div className="bg-white rounded-lg p-5 text-center" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-3xl font-bold" style={{ color: '#27774A' }}>100%</p>
          <p className="text-xs font-semibold mt-1 uppercase tracking-wide" style={{ color: '#7A7267' }}>ABDM Structured Output</p>
        </div>
        <div className="bg-white rounded-lg p-5 text-center" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-3xl font-bold" style={{ color: AMBER }}>55%</p>
          <p className="text-xs font-semibold mt-1 uppercase tracking-wide" style={{ color: '#7A7267' }}>Multilingual Consultations</p>
          <p className="text-[10px] mt-0.5" style={{ color: '#9A938B' }}>Tamil / Kannada / Hindi mix</p>
        </div>
      </div>
    </div>
  );
}
