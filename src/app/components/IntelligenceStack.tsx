'use client';

import { useState } from 'react';
import { Mic, Database, ShieldCheck, TrendingUp, FlaskConical, Dna, Target, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';
const GREEN = '#27774A';
const GRAY = '#9A938B';

interface Layer {
  id: number;
  name: string;
  subtitle: string;
  status: 'LIVE' | 'PROVEN' | 'ROADMAP';
  icon: React.ElementType;
  description: string;
  metrics?: string[];
  proof?: string;
}

const LAYERS: Layer[] = [
  {
    id: 1, name: 'Voice Capture', subtitle: 'Ambient Clinical Documentation',
    status: 'LIVE', icon: Mic,
    description: 'Real-time multilingual voice capture during consultation. Supports English, Tamil, Kannada, Hindi mixed-code speech.',
    metrics: ['Avg note generation: 32 seconds', '94% documentation completeness', '100% ABDM-structured output'],
  },
  {
    id: 2, name: 'Structured Data Engine', subtitle: 'Clinical NLP + ICD-10 Coding',
    status: 'LIVE', icon: Database,
    description: 'Converts unstructured voice notes into structured clinical data: ICD-10 codes, medication lists, vitals, complaint ontology.',
    metrics: ['14 diagnosis categories mapped', '7,500 consultations processed', 'Automatic ICD-10 assignment'],
  },
  {
    id: 3, name: 'Clinical Safety', subtitle: 'Drug Interaction + Withdrawal Guard',
    status: 'LIVE', icon: ShieldCheck,
    description: 'Real-time medication safety: drug-drug interactions, withdrawn drug blocking, dose validation, contraindication alerts.',
    metrics: ['49 interactions flagged in March', '5 withdrawn drugs blocked', 'Serotonin syndrome caught 5 times'],
  },
  {
    id: 4, name: 'Longitudinal Engine / TTT', subtitle: 'Tempo-Topology-Trajectory Framework',
    status: 'LIVE', icon: TrendingUp,
    description: 'Tracks disease progression across visits, even when patients see different doctors. Uses the Tempo-Topology-Trajectory (TTT) framework to detect clinical phenotypes that emerge over time.',
    metrics: ['Mrs. Lakshmi: Rising BP across 3 visits flagged', 'Cross-doctor pattern detection', 'Proteinuria progression identified'],
  },
  {
    id: 5, name: 'Synthetic Validation', subtitle: 'Rare Disease Detection Proof',
    status: 'PROVEN', icon: FlaskConical,
    description: 'Validated on synthetic cohort of 88 Fabry Disease patients. TTT framework achieved 100% Disease Capture Rate across all clinical phenotype patterns.',
    proof: 'Fabry Disease — 88 patients, 100% DCR',
    metrics: ['Acroparesthesia → Proteinuria → LVH trajectory', 'Renal → Cardiac → Neurological topology', 'Progressive multi-system tempo detected'],
  },
  {
    id: 6, name: 'Pharmacogenomic Layer', subtitle: 'Genetic Variant–Drug Response',
    status: 'ROADMAP', icon: Dna,
    description: 'Map patient genetic variants to drug metabolism profiles. Predict adverse reactions before prescription based on CYP450 polymorphisms.',
    metrics: ['CYP2D6, CYP2C19 variant coverage planned', 'Integration with ABDM health records', 'Personalized dosing recommendations'],
  },
  {
    id: 7, name: 'Precision Medicine', subtitle: 'Individualized Treatment Protocols',
    status: 'ROADMAP', icon: Target,
    description: 'Combine longitudinal clinical data, genomic profiles, and population health patterns to generate individualized treatment recommendations.',
    metrics: ['Evidence-based protocol selection', 'Population cohort matching', 'Outcome prediction modeling'],
  },
];

const statusConfig: Record<string, { bg: string; border: string; text: string; label: string; dashed?: boolean }> = {
  LIVE: { bg: '#E8F5EC', border: '#A8D4B4', text: GREEN, label: 'LIVE' },
  PROVEN: { bg: '#FFF8F0', border: '#E8D8C5', text: AMBER, label: 'PROVEN' },
  ROADMAP: { bg: '#F5F3EF', border: '#D5D0C8', text: GRAY, label: 'ROADMAP', dashed: true },
};

export default function IntelligenceStack() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(4); // TTT expanded by default

  const toggle = (id: number) => setExpandedLayer(prev => prev === id ? null : id);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white rounded-lg p-5 shadow-sm" style={{ borderLeft: `4px solid ${NAVY}` }}>
        <h3 className="text-sm font-bold" style={{ color: NAVY }}>7-Layer Clinical Intelligence Architecture</h3>
        <p className="text-xs mt-1" style={{ color: '#7A7267' }}>
          From voice capture to precision medicine — each layer builds on the one below.
          Green = deployed and generating value. Amber = validated with evidence. Gray = roadmap.
        </p>
      </div>

      {/* Layer Stack */}
      <div className="space-y-2">
        {LAYERS.map((layer) => {
          const sc = statusConfig[layer.status];
          const isExpanded = expandedLayer === layer.id;
          return (
            <div
              key={layer.id}
              className="rounded-lg overflow-hidden transition-all"
              style={{
                border: `${sc.dashed ? '2px dashed' : '1px solid'} ${sc.border}`,
                backgroundColor: isExpanded ? '#fff' : '#FAFAF8',
              }}
            >
              <button
                onClick={() => toggle(layer.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/50 transition-colors"
              >
                {/* Layer number */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                >
                  {layer.id}
                </div>

                {/* Icon */}
                <layer.icon className="w-5 h-5 shrink-0" style={{ color: sc.text }} />

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold truncate" style={{ color: NAVY }}>{layer.name}</p>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                    >
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-xs truncate" style={{ color: '#7A7267' }}>{layer.subtitle}</p>
                </div>

                {/* Expand */}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 shrink-0" style={{ color: '#7A7267' }} />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0" style={{ color: '#7A7267' }} />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1" style={{ borderTop: `1px solid ${sc.border}` }}>
                  <p className="text-xs leading-relaxed" style={{ color: '#4A4540' }}>{layer.description}</p>

                  {layer.proof && (
                    <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: '#FFF8F0', border: '1px solid #E8D8C5' }}>
                      <p className="text-xs font-bold" style={{ color: AMBER }}>
                        Validation: {layer.proof}
                      </p>
                    </div>
                  )}

                  {layer.metrics && (
                    <ul className="mt-3 space-y-1">
                      {layer.metrics.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#4A4540' }}>
                          <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: sc.text }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Flow Diagram */}
      <div className="bg-white rounded-lg p-5 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: '#7A7267' }}>Data Flow</h4>
        <div className="flex flex-wrap items-center justify-center gap-1 text-xs">
          {['Voice', 'Structure', 'Safety', 'Longitudinal', 'Genomic', 'Precision'].map((step, i) => {
            const isLive = i < 4;
            const isProven = i === 3; // Longitudinal has proven validation
            const isRoadmap = i >= 4;
            const color = isRoadmap ? GRAY : (isProven ? AMBER : GREEN);
            return (
              <div key={step} className="flex items-center gap-1">
                <span
                  className="px-3 py-1.5 rounded font-semibold"
                  style={{
                    backgroundColor: isRoadmap ? '#F5F3EF' : (isLive ? '#E8F5EC' : '#FFF8F0'),
                    color,
                    border: `1px ${isRoadmap ? 'dashed' : 'solid'} ${isRoadmap ? '#D5D0C8' : (isLive ? '#A8D4B4' : '#E8D8C5')}`,
                  }}
                >
                  {step}
                </span>
                {i < 5 && <ChevronRight className="w-3 h-3" style={{ color: '#D5D0C8' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mrs. Lakshmi TTT Deep Dive */}
      <div className="bg-white rounded-lg p-5 shadow-sm" style={{ borderLeft: `4px solid ${AMBER}` }}>
        <h4 className="text-sm font-bold mb-1" style={{ color: NAVY }}>TTT Framework — Mrs. Lakshmi Devi</h4>
        <p className="text-xs mb-4" style={{ color: '#7A7267' }}>
          Longitudinal pattern detected across 3 visits, 3 different doctors, 20 days
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tempo */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F6F2', border: '1px solid #E5E0D8' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C0392B' }} />
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: NAVY }}>Tempo</p>
            </div>
            <p className="text-lg font-bold" style={{ color: '#C0392B' }}>Progressive</p>
            <p className="text-xs mt-1" style={{ color: '#7A7267' }}>
              Symptoms worsening over 20-day window. BP rising: 138 → 142 → 146 mmHg systolic.
              New symptom emergence at each visit.
            </p>
          </div>

          {/* Topology */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F6F2', border: '1px solid #E5E0D8' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AMBER }} />
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: NAVY }}>Topology</p>
            </div>
            <p className="text-lg font-bold" style={{ color: AMBER }}>MSK → Neuro → Renal</p>
            <p className="text-xs mt-1" style={{ color: '#7A7267' }}>
              Visit 1: Joint pain (musculoskeletal). Visit 2: Numbness/neuropathy (neurological).
              Visit 3: Proteinuria (renal). Sequential organ system involvement.
            </p>
          </div>

          {/* Trajectory */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F6F2', border: '1px solid #E5E0D8' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C0392B' }} />
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: NAVY }}>Trajectory</p>
            </div>
            <p className="text-lg font-bold" style={{ color: '#C0392B' }}>Progressive Multi-System</p>
            <p className="text-xs mt-1" style={{ color: '#7A7267' }}>
              Pattern consistent with progressive multi-organ disease. System recommends nephrology referral
              and comprehensive metabolic workup.
            </p>
          </div>
        </div>

        {/* Timeline mini */}
        <div className="mt-4 flex items-center gap-2 text-xs overflow-x-auto">
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: GREEN }} />
            <span style={{ color: '#7A7267' }}>Mar 5</span>
            <span className="font-semibold" style={{ color: NAVY }}>Joint pain</span>
          </div>
          <div className="w-8 h-px" style={{ backgroundColor: '#E5E0D8' }} />
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: AMBER }} />
            <span style={{ color: '#7A7267' }}>Mar 16</span>
            <span className="font-semibold" style={{ color: NAVY }}>Neuropathy + interaction caught</span>
          </div>
          <div className="w-8 h-px" style={{ backgroundColor: '#E5E0D8' }} />
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C0392B' }} />
            <span style={{ color: '#7A7267' }}>Mar 25</span>
            <span className="font-semibold" style={{ color: NAVY }}>Proteinuria → nephrology referral</span>
          </div>
        </div>
      </div>

      {/* Fabry Validation Card */}
      <div className="bg-white rounded-lg p-5 shadow-sm" style={{ borderLeft: `4px solid ${GREEN}` }}>
        <h4 className="text-sm font-bold mb-1" style={{ color: NAVY }}>Synthetic Validation: Fabry Disease Cohort</h4>
        <p className="text-xs mb-3" style={{ color: '#7A7267' }}>
          TTT framework validated against synthetic cohort of 88 Fabry Disease patients
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold" style={{ color: GREEN }}>88</p>
            <p className="text-xs" style={{ color: '#7A7267' }}>Synthetic patients</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: GREEN }}>100%</p>
            <p className="text-xs" style={{ color: '#7A7267' }}>Disease Capture Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: NAVY }}>3</p>
            <p className="text-xs" style={{ color: '#7A7267' }}>TTT dimensions validated</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: NAVY }}>7</p>
            <p className="text-xs" style={{ color: '#7A7267' }}>Phenotype patterns detected</p>
          </div>
        </div>
        <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: '#E8F5EC', border: '1px solid #A8D4B4' }}>
          <p className="text-xs" style={{ color: GREEN }}>
            <strong>Key trajectory:</strong> Acroparesthesia → Proteinuria → Left Ventricular Hypertrophy.
            System identified progressive multi-organ involvement consistent with Fabry Disease phenotype
            in all 88 synthetic records.
          </p>
        </div>
      </div>
    </div>
  );
}
