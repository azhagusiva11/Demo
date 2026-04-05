'use client';

const NAVY = '#1B2A4A';
const GREEN = '#27774A';
const AMBER = '#B87A4B';

export default function DocumentationView() {
  return (
    <div className="space-y-6">
      {/* Four stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>7,500</p>
          <p className="text-sm font-semibold mt-2" style={{ color: NAVY }}>Consultations Documented</p>
          <p className="text-xs mt-2" style={{ color: '#7A7267' }}>30 days, 5 doctors, zero workflow change</p>
        </div>

        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: GREEN }}>32s</p>
          <p className="text-sm font-semibold mt-2" style={{ color: NAVY }}>Average Note Generation</p>
          <p className="text-xs mt-2" style={{ color: '#7A7267' }}>JAMA April 2026 (Rotenstein et al, 8,581 clinicians): AI documentation saves 16 min/day</p>
        </div>

        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: GREEN }}>94%</p>
          <p className="text-sm font-semibold mt-2" style={{ color: NAVY }}>Documentation Completeness</p>
          <p className="text-xs mt-2" style={{ color: '#7A7267' }}>Chief complaint, history, examination, diagnosis, plan — structured and coded</p>
        </div>

        <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #e8e5e0' }}>
          <p className="text-4xl md:text-5xl font-bold" style={{ color: AMBER }}>55%</p>
          <p className="text-sm font-semibold mt-2" style={{ color: NAVY }}>Multilingual Consultations</p>
          <p className="text-xs mt-2" style={{ color: '#7A7267' }}>English + Tamil, Kannada, Hindi — code-switching handled natively</p>
        </div>
      </div>

      {/* Insight bar */}
      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #e8e5e0', borderLeft: `4px solid ${AMBER}` }}>
        <p className="text-sm" style={{ color: NAVY }}>
          At 8 minutes saved per consultation, this department recovered approximately 1,000 hours of clinical documentation time in 30 days.
        </p>
      </div>
    </div>
  );
}
