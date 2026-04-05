import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LIET Clinic Space — Clinical Intelligence Demo',
  description: 'Apollo Hospitals Mysore — General Medicine OPD Intelligence Report',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
