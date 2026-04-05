'use client';

import { TrendingUp, Clock, FileCheck, Users } from 'lucide-react';

interface KPI {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
}

interface Props {
  view: 'clinical' | 'prescribing' | 'safety' | 'intelligence';
  summary: {
    total_consultations: number;
    unique_patients: number;
    avg_note_generation_time: number;
    avg_documentation_completeness: number;
    safety_summary: {
      total_interactions: number;
      high_severity: number;
      withdrawn_blocked: number;
    };
    avg_consultation_duration: number;
  };
}

export default function KPICards({ view, summary }: Props) {
  const kpis: Record<string, KPI[]> = {
    clinical: [
      { label: 'Total Consultations', value: summary.total_consultations.toLocaleString('en-IN'), icon: TrendingUp, color: '#1B2A4A', borderColor: '#B87A4B' },
      { label: 'Unique Patients', value: summary.unique_patients.toLocaleString('en-IN'), icon: Users, color: '#1B2A4A', borderColor: '#1B2A4A' },
      { label: 'Avg Note Time', value: `${summary.avg_note_generation_time.toFixed(0)}s`, subtitle: 'AI-generated', icon: Clock, color: '#27774A', borderColor: '#27774A' },
      { label: 'Documentation', value: `${(summary.avg_documentation_completeness * 100).toFixed(0)}%`, subtitle: 'Completeness', icon: FileCheck, color: '#27774A', borderColor: '#27774A' },
    ],
    prescribing: [
      { label: 'Total Consultations', value: summary.total_consultations.toLocaleString('en-IN'), icon: TrendingUp, color: '#1B2A4A', borderColor: '#1B2A4A' },
      { label: 'Avg Consult Duration', value: `${(summary.avg_consultation_duration / 60).toFixed(1)} min`, icon: Clock, color: '#1B2A4A', borderColor: '#1B2A4A' },
      { label: 'Dept. Antibiotic Rate', value: '27%', subtitle: 'Target: <20%', icon: TrendingUp, color: '#C0392B', borderColor: '#C0392B' },
      { label: 'Pantoprazole Overuse', value: '28%', subtitle: 'of all consults', icon: TrendingUp, color: '#B87A4B', borderColor: '#B87A4B' },
    ],
    safety: [
      { label: 'Interactions Flagged', value: summary.safety_summary.total_interactions, icon: TrendingUp, color: '#B87A4B', borderColor: '#B87A4B' },
      { label: 'High Severity', value: summary.safety_summary.high_severity, icon: TrendingUp, color: '#C0392B', borderColor: '#C0392B' },
      { label: 'Withdrawn Blocked', value: summary.safety_summary.withdrawn_blocked, icon: TrendingUp, color: '#C0392B', borderColor: '#C0392B' },
      { label: 'Documentation', value: `${(summary.avg_documentation_completeness * 100).toFixed(0)}%`, icon: FileCheck, color: '#27774A', borderColor: '#27774A' },
    ],
    intelligence: [
      { label: 'Layers Live', value: '4 of 7', subtitle: 'Voice → Structure → Safety → Longitudinal', icon: TrendingUp, color: '#27774A', borderColor: '#27774A' },
      { label: 'Fabry Validation', value: '100%', subtitle: 'DCR on 88 patients', icon: TrendingUp, color: '#B87A4B', borderColor: '#B87A4B' },
      { label: 'TTT Framework', value: 'Active', subtitle: 'Tempo-Topology-Trajectory', icon: TrendingUp, color: '#1B2A4A', borderColor: '#1B2A4A' },
      { label: 'Safety Events', value: summary.safety_summary.total_interactions, subtitle: 'Caught this month', icon: TrendingUp, color: '#C0392B', borderColor: '#C0392B' },
    ],
  };

  const cards = kpis[view] || kpis.clinical;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(card => (
        <div
          key={card.label}
          className="bg-white rounded-lg p-4 shadow-sm"
          style={{ borderLeft: `4px solid ${card.borderColor}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <card.icon className="w-4 h-4" style={{ color: card.color }} />
            <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: '#7A7267' }}>
              {card.label}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
          {card.subtitle && (
            <p className="text-xs mt-0.5" style={{ color: '#9A938B' }}>{card.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
