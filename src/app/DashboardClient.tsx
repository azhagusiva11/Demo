'use client';

import { useState } from 'react';
import DepartmentSummaryBar from './components/DepartmentSummaryBar';
import KPICards from './components/KPICards';
import DiseaseBurdenChart from './components/DiseaseBurdenChart';
import DocumentationMetrics from './components/DocumentationMetrics';
import PrescribingTable from './components/PrescribingTable';
import DoctorComparison from './components/DoctorComparison';
import AntibioticStewardship from './components/AntibioticStewardship';
import PantoprazoleSignal from './components/PantoprazoleSignal';
import SafetyMetrics from './components/SafetyMetrics';
import PatientTimeline from './components/PatientTimeline';
import IntelligenceStack from './components/IntelligenceStack';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let summaryData: any = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  summaryData = require('../../demo/mock_summary.json');
} catch {
  // fallback
}

type View = 'clinical' | 'prescribing' | 'safety' | 'intelligence';

const NAVY = '#1B2A4A';

export default function DashboardClient() {
  const [activeView, setActiveView] = useState<View>('clinical');
  const summary = summaryData as Record<string, unknown>;

  const totalConsultations = (summary.total_consultations as number) || 7500;
  const uniquePatients = (summary.unique_patients as number) || 2100;
  const avgNoteTime = (summary.avg_note_generation_time as number) || 32;
  const avgCompleteness = (summary.avg_documentation_completeness as number) || 0.94;
  const avgDuration = (summary.avg_consultation_duration as number) || 270;
  const diagnosisDistribution = (summary.diagnosis_distribution as { code: string; description: string; count: number; percentage: number }[]) || [];
  const medicationFrequency = (summary.medication_frequency as { brand: string; generic: string; count: number; percentage: number }[]) || [];
  const doctorStats = (summary.doctor_stats as Record<string, { name: string; total_consults: number; antibiotic_rate: number; ppi_rate: number; avg_duration: number }>) || {};
  const safetySummary = (summary.safety_summary as { total_interactions: number; high_severity: number; moderate_severity: number; low_severity: number; withdrawn_blocked: number; interaction_types: { type: string; severity: string; count: number; example: string }[] }) || { total_interactions: 47, high_severity: 12, moderate_severity: 29, low_severity: 5, withdrawn_blocked: 5, interaction_types: [] };
  const mrsLakshmiVisits = (summary.mrs_lakshmi_visits as Record<string, unknown>[]) || [];

  const views: { key: View; label: string }[] = [
    { key: 'clinical', label: 'Clinical Overview' },
    { key: 'prescribing', label: 'Prescribing Intelligence' },
    { key: 'safety', label: 'Safety Audit' },
    { key: 'intelligence', label: 'Intelligence Stack' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* SIMULATED DATA banner */}
      <div className="sticky top-0 z-50 text-center py-1.5 text-xs font-semibold tracking-wide text-white" style={{ backgroundColor: '#C0392B' }}>
        SIMULATED DATA — Representative of expected pilot output
      </div>

      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid #E5E0D8' }}>
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: NAVY }}>LIET Clinic Space — Clinical Intelligence Report</h1>
        <p className="text-sm mt-1" style={{ color: '#7A7267' }}>
          General Medicine OPD, Apollo Hospitals Mysore · March 1–30, 2026
        </p>
      </div>

      {/* Department summary bar */}
      <DepartmentSummaryBar
        totalConsultations={totalConsultations}
        doctors={5}
        workingDays={26}
        safetyFlags={safetySummary.total_interactions}
      />

      {/* View toggle */}
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
        <KPICards
          view={activeView}
          summary={{
            total_consultations: totalConsultations,
            unique_patients: uniquePatients,
            avg_note_generation_time: avgNoteTime,
            avg_documentation_completeness: avgCompleteness,
            safety_summary: safetySummary,
            avg_consultation_duration: avgDuration,
          }}
        />

        {activeView === 'clinical' && (
          <>
            <DiseaseBurdenChart data={diagnosisDistribution} />
            <DocumentationMetrics
              avgNoteTime={avgNoteTime}
              avgCompleteness={avgCompleteness}
              totalConsultations={totalConsultations}
              avgConsultDuration={avgDuration}
            />
          </>
        )}

        {activeView === 'prescribing' && (
          <>
            <PrescribingTable data={medicationFrequency} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DoctorComparison doctorStats={doctorStats} />
              <AntibioticStewardship doctorStats={doctorStats} />
            </div>
            <PantoprazoleSignal doctorStats={doctorStats} totalConsultations={totalConsultations} />
          </>
        )}

        {activeView === 'intelligence' && (
          <IntelligenceStack />
        )}

        {activeView === 'safety' && (
          <>
            <SafetyMetrics
              totalInteractions={safetySummary.total_interactions}
              highSeverity={safetySummary.high_severity}
              withdrawnBlocked={safetySummary.withdrawn_blocked}
              interactionTypes={safetySummary.interaction_types}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <PatientTimeline
              visits={mrsLakshmiVisits as any[]}
              patientName="Mrs. Lakshmi Devi"
              patientAge={58}
              patientSex="Female"
            />
          </>
        )}
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
