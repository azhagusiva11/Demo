'use client';

interface MedItem {
  brand: string;
  generic: string;
  count: number;
  percentage: number;
}

interface Props {
  data: MedItem[];
}

export default function PrescribingTable({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.count - a.count).slice(0, 15);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-3" style={{ borderBottom: '1px solid #E5E0D8' }}>
        <h3 className="text-sm font-bold" style={{ color: '#1B2A4A' }}>Top 15 Medications</h3>
        <p className="text-xs" style={{ color: '#7A7267' }}>By prescription frequency across all consultations</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: '#F5F3EF' }}>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: '#7A7267' }}>#</th>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: '#7A7267' }}>Brand Name</th>
              <th className="text-left px-4 py-2 font-semibold hidden md:table-cell" style={{ color: '#7A7267' }}>Generic</th>
              <th className="text-right px-4 py-2 font-semibold" style={{ color: '#7A7267' }}>Count</th>
              <th className="text-right px-4 py-2 font-semibold" style={{ color: '#7A7267' }}>% of Consults</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((med, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F0EDE8' }} className="hover:bg-gray-50/50">
                <td className="px-4 py-2.5 font-medium" style={{ color: '#9A938B' }}>{i + 1}</td>
                <td className="px-4 py-2.5 font-semibold" style={{ color: '#1B2A4A' }}>{med.brand}</td>
                <td className="px-4 py-2.5 hidden md:table-cell" style={{ color: '#7A7267' }}>{med.generic}</td>
                <td className="px-4 py-2.5 text-right font-bold" style={{ color: '#1B2A4A' }}>{med.count.toLocaleString('en-IN')}</td>
                <td className="px-4 py-2.5 text-right" style={{ color: '#7A7267' }}>{med.percentage.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
