'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const NAVY = '#1B2A4A';
const RED_AMBER = '#C0392B';
const BLUE = '#2E6B9E';
const PURPLE = '#7B4FA0';

const doctorData = [
  { name: 'Dr. Suresh', antibioticRate: 85, avgMeds: 6.2, ppiRate: 65 },
  { name: 'Dr. Meena', antibioticRate: 20, avgMeds: 3.6, ppiRate: 19 },
  { name: 'Dr. Rajan', antibioticRate: 25, avgMeds: 4.0, ppiRate: 22 },
  { name: 'Dr. Priya', antibioticRate: 15, avgMeds: 3.2, ppiRate: 12 },
  { name: 'Dr. Anand', antibioticRate: 28, avgMeds: 3.5, ppiRate: 18 },
];

// Department averages
const avgAntibiotic = doctorData.reduce((s, d) => s + d.antibioticRate, 0) / doctorData.length;
const avgMeds = doctorData.reduce((s, d) => s + d.avgMeds, 0) / doctorData.length;
const avgPpi = doctorData.reduce((s, d) => s + d.ppiRate, 0) / doctorData.length;

export default function DoctorVariance() {
  return (
    <div className="space-y-6">
      {/* Chart card */}
      <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
        <h3 className="text-base font-bold mb-1" style={{ color: NAVY }}>How Do My 5 Doctors Compare</h3>
        <p className="text-xs mb-6" style={{ color: '#7A7267' }}>Three metrics across all doctors — department average shown as dashed line</p>

        <div className="space-y-8">
          {/* Antibiotic Rate Chart */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: RED_AMBER }}>
              Antibiotic Rate for Viral Illness (% of URI/fever cases)
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={doctorData} layout="vertical" margin={{ left: 100, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#7A7267' }} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fill: NAVY, fontWeight: 600 }} width={95} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${value}%`, 'Antibiotic Rate']}
                />
                <ReferenceLine x={avgAntibiotic} stroke={NAVY} strokeDasharray="6 4" strokeWidth={2} label={{ value: `Dept avg: ${avgAntibiotic.toFixed(0)}%`, position: 'top', fontSize: 10, fill: NAVY }} />
                <Bar dataKey="antibioticRate" fill={RED_AMBER} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Avg Meds Chart */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: BLUE }}>
              Average Medications per Prescription
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={doctorData} layout="vertical" margin={{ left: 100, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" horizontal={false} />
                <XAxis type="number" domain={[0, 8]} tick={{ fontSize: 11, fill: '#7A7267' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fill: NAVY, fontWeight: 600 }} width={95} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [Number(value).toFixed(1), 'Avg Medications']}
                />
                <ReferenceLine x={avgMeds} stroke={NAVY} strokeDasharray="6 4" strokeWidth={2} label={{ value: `Dept avg: ${avgMeds.toFixed(1)}`, position: 'top', fontSize: 10, fill: NAVY }} />
                <Bar dataKey="avgMeds" fill={BLUE} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PPI Rate Chart */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: PURPLE }}>
              PPI Prescribed Without Gastric Indication (% of non-gastric cases)
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={doctorData} layout="vertical" margin={{ left: 100, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#7A7267' }} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fill: NAVY, fontWeight: 600 }} width={95} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${value}%`, 'PPI Rate']}
                />
                <ReferenceLine x={avgPpi} stroke={NAVY} strokeDasharray="6 4" strokeWidth={2} label={{ value: `Dept avg: ${avgPpi.toFixed(0)}%`, position: 'top', fontSize: 10, fill: NAVY }} />
                <Bar dataKey="ppiRate" fill={PURPLE} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insight card */}
      <div className="rounded-lg p-5" style={{ backgroundColor: '#FFFBF5', border: '1px solid #E8D8C5' }}>
        <p className="text-sm" style={{ color: NAVY }}>
          This comparison is generated automatically from structured consultation data. No manual audit required. No chart review. Updated daily.
        </p>
      </div>
    </div>
  );
}
