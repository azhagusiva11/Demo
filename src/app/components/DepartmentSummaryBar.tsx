'use client';

const NAVY = '#1B2A4A';

export default function DepartmentSummaryBar() {
  return (
    <div className="px-6 py-3" style={{ borderBottom: '1px solid #E5E0D8', backgroundColor: '#F5F3EF' }}>
      <p className="text-sm" style={{ color: NAVY }}>
        <span className="font-bold">Apollo Hospitals Mysore</span>
        <span className="mx-2" style={{ color: '#E5E0D8' }}>|</span>
        <span>General Medicine OPD</span>
        <span className="mx-2" style={{ color: '#E5E0D8' }}>|</span>
        <span className="font-semibold">7,500</span> Consultations
        <span className="mx-2" style={{ color: '#E5E0D8' }}>|</span>
        <span className="font-semibold">5</span> Doctors
        <span className="mx-2" style={{ color: '#E5E0D8' }}>|</span>
        <span className="font-semibold">30</span> Days
        <span className="mx-2" style={{ color: '#E5E0D8' }}>|</span>
        <span>March 2026</span>
      </p>
    </div>
  );
}
