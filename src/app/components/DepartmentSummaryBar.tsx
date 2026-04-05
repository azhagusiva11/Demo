'use client';

import { Activity, Users, Calendar, ShieldAlert } from 'lucide-react';

interface Props {
  totalConsultations: number;
  doctors: number;
  workingDays: number;
  safetyFlags: number;
}

export default function DepartmentSummaryBar({ totalConsultations, doctors, workingDays, safetyFlags }: Props) {
  const stats = [
    { label: 'Consultations', value: totalConsultations.toLocaleString('en-IN'), icon: Activity, color: '#1B2A4A' },
    { label: 'Doctors', value: doctors, icon: Users, color: '#1B2A4A' },
    { label: 'Working Days', value: workingDays, icon: Calendar, color: '#1B2A4A' },
    { label: 'Safety Flags', value: safetyFlags, icon: ShieldAlert, color: '#C0392B' },
  ];

  return (
    <div className="flex flex-wrap gap-4 md:gap-8 px-6 py-3 border-b" style={{ borderColor: '#E5E0D8', backgroundColor: '#F5F3EF' }}>
      {stats.map(s => (
        <div key={s.label} className="flex items-center gap-2">
          <s.icon className="w-4 h-4" style={{ color: s.color }} />
          <span className="text-sm font-semibold" style={{ color: '#1B2A4A' }}>{s.value}</span>
          <span className="text-xs" style={{ color: '#7A7267' }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
