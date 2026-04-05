'use client';

import { ShieldAlert, AlertTriangle, Ban, Info } from 'lucide-react';

interface InteractionType {
  type: string;
  severity: string;
  count: number;
  example: string;
}

interface Props {
  totalInteractions: number;
  highSeverity: number;
  withdrawnBlocked: number;
  interactionTypes: InteractionType[];
}

export default function SafetyMetrics({ totalInteractions, highSeverity, withdrawnBlocked, interactionTypes }: Props) {
  const severityIcon = (severity: string) => {
    if (severity === 'CRITICAL') return <Ban className="w-3.5 h-3.5" style={{ color: '#C0392B' }} />;
    if (severity === 'HIGH') return <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#C0392B' }} />;
    if (severity === 'MODERATE') return <Info className="w-3.5 h-3.5" style={{ color: '#B87A4B' }} />;
    return <Info className="w-3.5 h-3.5" style={{ color: '#7A7267' }} />;
  };

  const severityBg = (severity: string) => {
    if (severity === 'CRITICAL') return { bg: '#FDF0F0', border: '#E8C5C5', text: '#C0392B' };
    if (severity === 'HIGH') return { bg: '#FDF0F0', border: '#E8C5C5', text: '#C0392B' };
    if (severity === 'MODERATE') return { bg: '#FFF8F0', border: '#E8D8C5', text: '#B87A4B' };
    return { bg: '#F5F3EF', border: '#E5E0D8', text: '#7A7267' };
  };

  return (
    <div className="space-y-4">
      {/* Three big cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-5 shadow-sm" style={{ borderLeft: '4px solid #B87A4B' }}>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5" style={{ color: '#B87A4B' }} />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: '#7A7267' }}>Interactions Flagged</span>
          </div>
          <p className="text-4xl font-bold" style={{ color: '#B87A4B' }}>{totalInteractions}</p>
          <p className="text-xs mt-1" style={{ color: '#9A938B' }}>Caught before reaching patient</p>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm" style={{ borderLeft: '4px solid #C0392B' }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" style={{ color: '#C0392B' }} />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: '#7A7267' }}>High Severity</span>
          </div>
          <p className="text-4xl font-bold" style={{ color: '#C0392B' }}>{highSeverity}</p>
          <p className="text-xs mt-1" style={{ color: '#9A938B' }}>Could cause serious adverse events</p>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm" style={{ borderLeft: '4px solid #C0392B' }}>
          <div className="flex items-center gap-2 mb-2">
            <Ban className="w-5 h-5" style={{ color: '#C0392B' }} />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: '#7A7267' }}>Withdrawn Drugs Blocked</span>
          </div>
          <p className="text-4xl font-bold" style={{ color: '#C0392B' }}>{withdrawnBlocked}</p>
          <p className="text-xs mt-1" style={{ color: '#9A938B' }}>Rofecoxib, Nimesulide (pediatric)</p>
        </div>
      </div>

      {/* Serotonin syndrome highlight card */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#FDF0F0', border: '1px solid #E8C5C5' }}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#C0392B' }} />
          <div>
            <p className="text-sm font-bold" style={{ color: '#C0392B' }}>Serotonin Syndrome Risk — Caught 5 Times</p>
            <p className="text-xs mt-1" style={{ color: '#8B4040' }}>
              Fluoxetine (SSRI) + Tramadol (Ultracet) combination detected in 5 depression patients prescribed pain relief.
              System flagged before prescription reached patient. Doctor substituted with Paracetamol.
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #E5E0D8' }}>
          <h4 className="text-sm font-bold" style={{ color: '#1B2A4A' }}>Interaction Breakdown</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: '#F5F3EF' }}>
                <th className="text-left px-4 py-2 font-semibold" style={{ color: '#7A7267' }}>Type</th>
                <th className="text-left px-4 py-2 font-semibold" style={{ color: '#7A7267' }}>Severity</th>
                <th className="text-right px-4 py-2 font-semibold" style={{ color: '#7A7267' }}>Count</th>
                <th className="text-left px-4 py-2 font-semibold hidden md:table-cell" style={{ color: '#7A7267' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {interactionTypes.map((item, i) => {
                const sev = severityBg(item.severity);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F0EDE8' }}>
                    <td className="px-4 py-2.5 font-medium" style={{ color: '#1B2A4A' }}>{item.type}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: sev.bg, color: sev.text, border: `1px solid ${sev.border}` }}
                      >
                        {severityIcon(item.severity)} {item.severity}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold" style={{ color: '#1B2A4A' }}>{item.count}</td>
                    <td className="px-4 py-2.5 hidden md:table-cell" style={{ color: '#7A7267' }}>{item.example}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
