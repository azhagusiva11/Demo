'use client';

import { Search } from 'lucide-react';

const NAVY = '#1B2A4A';

const queries = [
  {
    query: 'In the last 30 days, how many URI patients received antibiotics without fever above 101°F?',
    response: [
      { label: 'Total URI cases', value: '124' },
      { label: 'Antibiotics prescribed', value: '78 (63%)' },
      { label: 'Without documented fever >101°F', value: '61 (78% of antibiotic cases)' },
      { label: 'Guideline alignment (WHO AWaRe)', value: 'Below recommended threshold' },
    ],
  },
  {
    query: 'Which patients had 5 or more medications in a single visit?',
    response: [
      { label: 'Total patients', value: '42' },
      { label: 'Average age', value: '61' },
      { label: 'Most common combination', value: 'Antihypertensive + Metformin + Statin + PPI + Supplement' },
      { label: 'Polypharmacy interaction risk', value: 'Elevated' },
    ],
  },
];

export default function ClinicalDataPreview() {
  return (
    <div className="rounded-lg p-6" style={{ backgroundColor: '#F0EDE8', borderTop: '3px solid #B87A4B' }}>
      <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h3 className="text-base font-bold" style={{ color: NAVY }}>Clinical Data Intelligence</h3>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: '#F5F3EF', color: '#9A938B', border: '1px solid #E5E0D8' }}
        >
          Preview
        </span>
      </div>
      <p className="text-xs" style={{ color: '#7A7267' }}>
        Available after pilot — query your department&apos;s own structured clinical data
      </p>

      {/* Query cards */}
      <div className="space-y-4">
        {queries.map((q, i) => (
          <div
            key={i}
            className="rounded-lg p-5"
            style={{ backgroundColor: '#F5F3EF', borderLeft: `3px solid ${NAVY}` }}
          >
            {/* Query */}
            <div className="flex items-start gap-2 mb-3">
              <Search className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#9A938B' }} />
              <p className="text-sm" style={{ color: NAVY, fontFamily: "'DM Mono', 'Menlo', monospace" }}>{q.query}</p>
            </div>
            {/* Response */}
            <div className="space-y-1.5 pl-5">
              {q.response.map((r, j) => (
                <div key={j} className="flex gap-2 text-xs">
                  <span style={{ color: '#7A7267' }}>{r.label}:</span>
                  <span className="font-semibold" style={{ color: NAVY }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Closing lines */}
      <div className="pt-4 text-center">
        <p className="text-sm font-semibold" style={{ color: NAVY }}>
          This is not searching medical knowledge. This is querying your own clinical data.
        </p>
        <p className="text-xs mt-2" style={{ color: '#9A938B' }}>
          Every answer comes from your patients.
        </p>
      </div>
      </div>
    </div>
  );
}
