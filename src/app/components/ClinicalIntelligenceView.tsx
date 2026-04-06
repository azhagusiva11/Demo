'use client';

import PrescriptionSafety from './PrescriptionSafety';
import ClinicalSignals from './ClinicalSignals';
import PatientTimeline from './PatientTimeline';
import ClinicalDataPreview from './ClinicalDataPreview';

interface Props {
  deptAvgMeds: number;
  deptAbxViralPct: number;
  deptPpiNonGastricPct: number;
}

export default function ClinicalIntelligenceView({ deptAvgMeds, deptAbxViralPct, deptPpiNonGastricPct }: Props) {
  return (
    <div className="space-y-10">
      {/* Section A: Prescription Safety */}
      <PrescriptionSafety
        deptAvgMeds={deptAvgMeds}
        deptAbxViralPct={deptAbxViralPct}
        deptPpiNonGastricPct={deptPpiNonGastricPct}
      />

      {/* Section B: Clinical Signals */}
      <ClinicalSignals />

      {/* Section C: Mrs. Lakshmi Timeline */}
      <PatientTimeline />

      {/* Section D: Clinical Data Preview */}
      <div className="mt-10">
        <ClinicalDataPreview />
      </div>
    </div>
  );
}
