'use client';

import { useState } from 'react';
import DepartmentSummaryBar from './components/DepartmentSummaryBar';
import PrescriptionSafety from './components/PrescriptionSafety';
import DoctorVariance from './components/DoctorVariance';
import HiddenClinicalData from './components/HiddenClinicalData';
import IntelligenceStack from './components/IntelligenceStack';

type View = 'safety' | 'variance' | 'clinical' | 'intelligence';

const NAVY = '#1B2A4A';

const views: { key: View; label: string }[] = [
  { key: 'safety', label: 'Prescription Safety' },
  { key: 'variance', label: 'Doctor Variance' },
  { key: 'clinical', label: 'Hidden Clinical Data' },
  { key: 'intelligence', label: 'Intelligence Stack' },
];

export default function DashboardClient() {
  const [activeView, setActiveView] = useState<View>('safety');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8', fontFamily: "'DM Sans', sans-serif" }}>
      {/* SIMULATED DATA banner */}
      <div className="sticky top-0 z-50 text-center py-1.5 text-xs font-semibold tracking-wide text-white" style={{ backgroundColor: '#C0392B' }}>
        SIMULATED DATA — Representative of expected pilot output
      </div>

      {/* Department summary bar */}
      <DepartmentSummaryBar
        totalConsultations={7500}
        doctors={5}
        workingDays={30}
        department="Apollo Mysore General Medicine OPD"
      />

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

      {/* Content */}
      <div className="px-4 md:px-6 py-6 space-y-6 max-w-7xl mx-auto">
        {activeView === 'safety' && <PrescriptionSafety />}
        {activeView === 'variance' && <DoctorVariance />}
        {activeView === 'clinical' && <HiddenClinicalData />}
        {activeView === 'intelligence' && <IntelligenceStack />}
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
