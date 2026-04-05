'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  avgNoteTime: number;
  avgCompleteness: number;
  totalConsultations: number;
  avgConsultDuration: number;
}

const COLORS = ['#27774A', '#B87A4B', '#1B2A4A', '#7A7267'];

export default function DocumentationMetrics({ avgNoteTime, avgCompleteness, totalConsultations, avgConsultDuration }: Props) {
  const completenessData = [
    { name: 'Complete', value: Math.round(avgCompleteness * 100) },
    { name: 'Partial', value: 100 - Math.round(avgCompleteness * 100) },
  ];

  const timeSavedMinutes = Math.round(totalConsultations * 8); // 8 min saved per consult
  const timeSavedHours = Math.round(timeSavedMinutes / 60);

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-bold mb-1" style={{ color: '#1B2A4A' }}>Documentation Efficiency</h3>
      <p className="text-xs mb-4" style={{ color: '#7A7267' }}>AI-generated clinical documentation metrics</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Completeness donut */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={completenessData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill="#27774A" />
                <Cell fill="#E5E0D8" />
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-2xl font-bold mt-1" style={{ color: '#27774A' }}>{Math.round(avgCompleteness * 100)}%</p>
          <p className="text-xs" style={{ color: '#7A7267' }}>Documentation Completeness</p>
        </div>

        {/* Key metrics */}
        <div className="space-y-4 flex flex-col justify-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#7A7267' }}>Avg Note Generation</p>
            <p className="text-xl font-bold" style={{ color: '#1B2A4A' }}>{avgNoteTime.toFixed(0)} seconds</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#7A7267' }}>Avg Consult Duration</p>
            <p className="text-xl font-bold" style={{ color: '#1B2A4A' }}>{(avgConsultDuration / 60).toFixed(1)} minutes</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#7A7267' }}>ABDM Structured Output</p>
            <p className="text-xl font-bold" style={{ color: '#27774A' }}>100%</p>
          </div>
        </div>

        {/* Time saved highlight */}
        <div className="flex flex-col justify-center p-4 rounded-lg" style={{ backgroundColor: '#F0F7F2', border: '1px solid #C8E0CE' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#27774A' }}>Estimated Time Saved</p>
          <p className="text-3xl font-bold mt-1" style={{ color: '#27774A' }}>{timeSavedHours.toLocaleString('en-IN')}</p>
          <p className="text-sm" style={{ color: '#27774A' }}>doctor-hours</p>
          <p className="text-xs mt-2" style={{ color: '#5A8D63' }}>
            At 8 minutes saved per consultation across {totalConsultations.toLocaleString('en-IN')} consults
          </p>
        </div>
      </div>
    </div>
  );
}
