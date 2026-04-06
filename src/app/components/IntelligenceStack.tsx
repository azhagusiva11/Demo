'use client';

import { ChevronRight } from 'lucide-react';

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';
const GREEN = '#27774A';
const GRAY = '#9A938B';

interface Layer {
  id: number;
  name: string;
  description: string;
  status: 'LIVE' | 'PROVEN' | 'ROADMAP';
}

const LAYERS: Layer[] = [
  {
    id: 1, name: 'Voice Capture',
    description: '4 Indian languages, code-switching, 50+ clinical vocabulary corrections',
    status: 'LIVE',
  },
  {
    id: 2, name: 'Structured Data Engine',
    description: 'ICD-10 diagnoses, RxNorm medications, LOINC observations, FHIR R4 export',
    status: 'LIVE',
  },
  {
    id: 3, name: 'Clinical Safety',
    description: '51 drug interactions, 13 withdrawn drugs, 17 critical patterns, 7 deterministic rules',
    status: 'LIVE',
  },
  {
    id: 4, name: 'Longitudinal Pattern Engine',
    description: 'Cross-visit pattern detection. Tempo, topology, trajectory classification. Multi-system signal identification.',
    status: 'LIVE',
  },
  {
    id: 5, name: 'Clinical Reasoning Validation',
    description: 'Validated on complex longitudinal disease modelling before OPD application. Patient trajectories tested against international registry data (13,000+ patients) to ensure the pattern detection framework is clinically reliable over time.',
    status: 'PROVEN',
  },
  {
    id: 6, name: 'Pharmacogenomic Correlation',
    description: 'Drug-gene interaction checking. CYP2D6, CYP2C19 variant mapping. Indian population pharmacogenomics.',
    status: 'ROADMAP',
  },
  {
    id: 7, name: 'Precision Medicine',
    description: 'Clinical phenotype + genomic profile + longitudinal outcomes. Personalised treatment from Indian clinical data.',
    status: 'ROADMAP',
  },
];

const statusConfig: Record<string, { bg: string; border: string; text: string; label: string; dashed?: boolean }> = {
  LIVE: { bg: '#E8F5EC', border: '#A8D4B4', text: GREEN, label: 'LIVE' },
  PROVEN: { bg: '#FFF8F0', border: '#E8D8C5', text: AMBER, label: 'PROVEN' },
  ROADMAP: { bg: '#F5F3EF', border: '#D5D0C8', text: GRAY, label: 'ROADMAP', dashed: true },
};

const flowSteps = [
  { label: 'Voice', status: 'LIVE' },
  { label: 'Structure', status: 'LIVE' },
  { label: 'Safety', status: 'LIVE' },
  { label: 'Longitudinal', status: 'LIVE' },
  { label: 'Genomic', status: 'ROADMAP' },
  { label: 'Precision', status: 'ROADMAP' },
];

export default function IntelligenceStack() {
  return (
    <div className="space-y-6">
      {/* Intro paragraph */}
      <p className="text-sm leading-relaxed" style={{ color: NAVY }}>
        Views 1–3 show what 7,500 consultations in 30 days revealed using Layers 1–4 of the LIET intelligence stack. Those layers are live today. Here is the full architecture and where it leads as data compounds.
      </p>

      {/* 7 Layer cards */}
      <div className="space-y-3">
        {LAYERS.map((layer) => {
          const sc = statusConfig[layer.status];
          return (
            <div
              key={layer.id}
              className="bg-white rounded-lg p-5 flex items-start gap-4"
              style={{ border: `${sc.dashed ? '2px dashed' : '1px solid'} ${sc.border}` }}
            >
              {/* Layer number */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
              >
                {layer.id}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: NAVY }}>{layer.name}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#4A4540' }}>{layer.description}</p>
              </div>

              {/* Status badge */}
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5"
                style={{ backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
              >
                {sc.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Flow Diagram */}
      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0' }}>
        <div className="flex flex-wrap items-center justify-center gap-1 text-xs">
          {flowSteps.map((step, i) => {
            const isLive = step.status === 'LIVE';
            const isProven = step.status === 'PROVEN';
            const isRoadmap = step.status === 'ROADMAP';
            return (
              <div key={step.label} className="flex items-center gap-1">
                <span
                  className="px-3 py-1.5 rounded font-semibold"
                  style={{
                    backgroundColor: isRoadmap ? '#F5F3EF' : (isProven ? '#FFF8F0' : NAVY),
                    color: isRoadmap ? GRAY : (isProven ? AMBER : '#fff'),
                    border: `1px ${isRoadmap ? 'dashed' : 'solid'} ${isRoadmap ? '#D5D0C8' : (isProven ? '#E8D8C5' : NAVY)}`,
                  }}
                >
                  {step.label}
                </span>
                {i < flowSteps.length - 1 && <ChevronRight className="w-3 h-3" style={{ color: '#D5D0C8' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Engine validation card */}
      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0', borderLeft: `4px solid ${AMBER}` }}>
        <p className="text-sm leading-relaxed" style={{ color: NAVY }}>
          <strong>Engine Validation:</strong> The clinical reasoning engine was validated on complex longitudinal disease patterns before being applied to routine OPD. Patient trajectories were tested against international registry data from over 13,000 patients. The same pattern detection framework powers the safety checks and cross-visit analysis shown in Views 1–3.
        </p>
      </div>
    </div>
  );
}
