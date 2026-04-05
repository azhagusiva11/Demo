'use client';

import { useState } from 'react';
import DepartmentSummaryBar from './components/DepartmentSummaryBar';
import DocumentationView from './components/DocumentationView';
import ClinicalCaptureView from './components/ClinicalCaptureView';
import ClinicalIntelligenceView from './components/ClinicalIntelligenceView';
import IntelligenceStack from './components/IntelligenceStack';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let summaryData: any = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  summaryData = require('../../demo/mock_summary.json');
} catch {
  // fallback
}

type View = 'documentation' | 'capture' | 'intelligence' | 'stack';

const NAVY = '#1B2A4A';

const views: { key: View; label: string; subtitle: string }[] = [
  { key: 'documentation', label: 'Documentation', subtitle: 'Does it work at scale?' },
  { key: 'capture', label: 'Clinical Capture', subtitle: 'What did 7,500 consultations actually contain?' },
  { key: 'intelligence', label: 'Clinical Intelligence', subtitle: 'What the data revealed' },
  { key: 'stack', label: 'Intelligence Stack', subtitle: 'Why this compounds' },
];

export default function DashboardClient() {
  const [activeView, setActiveView] = useState<View>('documentation');
  const summary = summaryData as Record<string, unknown>;

  const diagnosisDistribution = (summary.diagnosis_distribution as { code: string; description: string; count: number; percentage: number }[]) || [];
  const deptAvgMeds = (summary.department_avg_meds_per_rx as number) || 3.8;
  const deptAbxViralPct = (summary.department_abx_viral_uri_pct as number) || 34.6;
  const deptPpiNonGastricPct = (summary.department_ppi_without_indication_pct as number) || 27.2;

  const currentView = views.find(v => v.key === activeView)!;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* SIMULATED DATA banner */}
      <div className="sticky top-0 z-50 text-center py-1.5 text-xs font-semibold tracking-wide text-white" style={{ backgroundColor: '#C0392B' }}>
        SIMULATED DATA — Representative of expected pilot output from one OPD department
      </div>

      {/* Department summary bar */}
      <DepartmentSummaryBar />

      {/* 4-tab navigation */}
      <div className="px-6 py-3 flex flex-wrap gap-1" style={{ borderBottom: '1px solid #E5E0D8' }}>
        {views.map(v => (
          <button
            key={v.key}
            onClick={() => setActiveView(v.key)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: activeView === v.key ? NAVY : 'transparent',
              color: activeView === v.key ? '#fff' : '#7A7267',
              border: activeView === v.key ? 'none' : '1px solid #E5E0D8',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* View subtitle */}
      <div className="px-6 pt-5 pb-2 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7267' }}>{currentView.subtitle}</p>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 pb-8 max-w-7xl mx-auto">
        {activeView === 'documentation' && <DocumentationView />}
        {activeView === 'capture' && <ClinicalCaptureView diagnosisDistribution={diagnosisDistribution} />}
        {activeView === 'intelligence' && (
          <ClinicalIntelligenceView
            deptAvgMeds={deptAvgMeds}
            deptAbxViralPct={deptAbxViralPct}
            deptPpiNonGastricPct={deptPpiNonGastricPct}
          />
        )}
        {activeView === 'stack' && <IntelligenceStack />}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center" style={{ borderTop: '1px solid #E5E0D8' }}>
        <p className="text-xs" style={{ color: '#9A938B' }}>
          LIET Clinic Space — Clinical Intelligence Platform · Data generated for demonstration purposes only
        </p>
      </div>
    </div>
  );
}
