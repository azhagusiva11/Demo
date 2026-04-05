'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, ShieldAlert, Activity } from 'lucide-react';

interface Visit {
  id: string;
  date: string;
  doctor_name: string;
  complaints: string[];
  diagnoses: { code: string; description: string; type: string }[];
  medications: { brand: string; generic: string; dosage: string }[];
  vitals: { bp_systolic: number; bp_diastolic: number; pulse: number; temp: number; spo2: number };
  interactions_flagged: { type: string; severity: string; description: string }[];
  safety_flags: { type: string; severity: string; description: string }[];
}

interface Props {
  visits: Visit[];
  patientName?: string;
  patientAge?: number;
  patientSex?: string;
}

const NAVY = '#1B2A4A';
const AMBER = '#B87A4B';
const RED = '#C0392B';
const GREEN = '#27774A';

export default function PatientTimeline({ visits, patientName = 'Mrs. Lakshmi Devi', patientAge = 58, patientSex = 'Female' }: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (i: number) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-5 h-5" style={{ color: NAVY }} />
        <div>
          <h3 className="text-sm font-bold" style={{ color: NAVY }}>Patient Timeline: {patientName}</h3>
          <p className="text-xs" style={{ color: '#7A7267' }}>{patientAge}yr, {patientSex} — Longitudinal view across {visits.length} visits</p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#E5E0D8' }} />

        <div className="space-y-4">
          {visits.map((visit, i) => {
            const hasFlag = visit.interactions_flagged.length > 0 || visit.safety_flags.length > 0;
            const isOpen = expanded[i];
            return (
              <div key={i} className="relative pl-10">
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 top-4 w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: hasFlag ? RED : GREEN,
                    borderColor: '#fff',
                    boxShadow: '0 0 0 2px ' + (hasFlag ? '#E8C5C5' : '#C8E0CE'),
                  }}
                />

                <div
                  className="rounded-lg overflow-hidden"
                  style={{ border: `1px solid ${hasFlag ? '#E8C5C5' : '#E5E0D8'}` }}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 text-left"
                  >
                    <div>
                      <p className="text-xs font-bold" style={{ color: NAVY }}>
                        Visit {i + 1} — {new Date(visit.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#7A7267' }}>
                        {visit.doctor_name} · {visit.complaints.join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasFlag && <ShieldAlert className="w-4 h-4" style={{ color: RED }} />}
                      {isOpen ? <ChevronUp className="w-4 h-4" style={{ color: '#7A7267' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#7A7267' }} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 space-y-3" style={{ borderTop: '1px solid #F0EDE8' }}>
                      {/* Vitals */}
                      <div className="flex flex-wrap gap-3 pt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: '#F5F3EF', color: '#1B2A4A' }}>
                          BP: {visit.vitals.bp_systolic}/{visit.vitals.bp_diastolic}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: '#F5F3EF', color: '#1B2A4A' }}>
                          PR: {visit.vitals.pulse}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: '#F5F3EF', color: '#1B2A4A' }}>
                          Temp: {visit.vitals.temp}°F
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: '#F5F3EF', color: '#1B2A4A' }}>
                          SpO2: {visit.vitals.spo2}%
                        </span>
                      </div>

                      {/* Diagnoses */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#7A7267' }}>Diagnoses</p>
                        {visit.diagnoses.map((dx, j) => (
                          <p key={j} className="text-xs" style={{ color: '#1B2A4A' }}>
                            <span className="font-mono text-[10px] mr-1" style={{ color: AMBER }}>{dx.code}</span>
                            {dx.description}
                            {dx.type === 'primary' && <span className="text-[10px] ml-1 font-semibold" style={{ color: AMBER }}>(Primary)</span>}
                          </p>
                        ))}
                      </div>

                      {/* Medications */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#7A7267' }}>Rx</p>
                        {visit.medications.map((med, j) => (
                          <p key={j} className="text-xs" style={{ color: '#1B2A4A' }}>
                            <strong>{med.brand}</strong> <span style={{ color: '#7A7267' }}>({med.generic})</span> — {med.dosage}
                          </p>
                        ))}
                      </div>

                      {/* Safety flags */}
                      {hasFlag && (
                        <div className="rounded-lg p-3" style={{ backgroundColor: '#FDF0F0', border: '1px solid #E8C5C5' }}>
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-3.5 h-3.5" style={{ color: RED }} />
                            <p className="text-xs font-bold" style={{ color: RED }}>Safety Flag</p>
                          </div>
                          {[...visit.interactions_flagged, ...visit.safety_flags].map((flag, j) => (
                            <p key={j} className="text-xs mt-0.5" style={{ color: '#8B4040' }}>
                              <span className="font-semibold">[{flag.severity}]</span> {flag.description || flag.type}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
