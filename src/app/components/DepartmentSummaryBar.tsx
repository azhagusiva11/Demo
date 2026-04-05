'use client';

import { Activity, Users, Calendar } from 'lucide-react';

interface Props {
  totalConsultations: number;
  doctors: number;
  workingDays: number;
  department: string;
}

export default function DepartmentSummaryBar({ totalConsultations, doctors, workingDays, department }: Props) {
  const stats = [
    { label: 'consultations', value: totalConsultations.toLocaleString('en-IN'), icon: Activity },
    { label: 'doctors', value: doctors, icon: Users },
    { label: 'days', value: workingDays, icon: Calendar },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 px-6 py-3" style={{ borderBottom: '1px solid #E5E0D8', backgroundColor: '#F5F3EF' }}>
      <span className="text-sm font-bold" style={{ color: '#1B2A4A' }}>{department}</span>
      <span style={{ color: '#E5E0D8' }}>|</span>
      {stats.map(s => (
        <div key={s.label} className="flex items-center gap-1.5">
          <s.icon className="w-3.5 h-3.5" style={{ color: '#1B2A4A' }} />
          <span className="text-sm font-semibold" style={{ color: '#1B2A4A' }}>{s.value}</span>
          <span className="text-xs" style={{ color: '#7A7267' }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
