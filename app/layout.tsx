import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Traffic Floor - TLM Endüstriyel Zemin Sistemleri | Akademik İnşaat',
  description: 'Akademik İnşaat güvencesiyle Fransız Groupe TLM endüstriyel PVC zemin karoları, ağır ve yoğun trafik zemin sistemleri, hijyenik duvar panelleri resmi Türkiye temsilciliği.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-[#0f1113] text-[#e2e8f0] font-sans antialiased selection:bg-[#f97316] selection:text-white" suppressHydrationWarning>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
