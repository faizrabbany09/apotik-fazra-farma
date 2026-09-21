import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { CartProvider } from '@/context/CartContext';
import { CartBadge } from '@/components/cart/CartBadge';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apotek Fazra Farma - Layanan Kesehatan & Obat Online Terpercaya',
  description: 'Beli obat bebas, vitamin, resep dokter, dan kebutuhan kesehatan terlengkap dengan pengiriman cepat di Apotek Fazra Farma Batam.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900 pb-20 md:pb-0 min-h-screen flex flex-col transition-colors duration-200 antialiased`}>
        <CartProvider>
          {/* TOP NAVBAR: Sticky Solid Header */}
          <header className="sticky top-0 z-50 bg-white border-b border-slate-200 transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              
              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <Image
                  src="/logo%20apotik_2.png"
                  alt="Logo Apotek"
                  width={180}
                  height={90}
                  quality={100}
                  unoptimized={true}
                  priority
                  className="object-contain h-12 w-auto md:h-14 lg:h-16 -ml-2"
                />
                <div>
                  <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
                    Apotek Fazra Farma
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium tracking-wide">
                    SIA: 503/SIA/123.45/2026
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links & Controls */}
              <div className="flex items-center gap-6">
                <nav className="hidden md:flex items-center gap-6">
                  <Link
                    href="/"
                    prefetch={false}
                    className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    Beranda
                  </Link>
                  <Link
                    href="/kategori"
                    prefetch={false}
                    className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    Kategori
                  </Link>
                  <Link
                    href="/cara-belanja"
                    prefetch={false}
                    className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    Cara Belanja
                  </Link>
                </nav>

                <div className="hidden md:flex items-center gap-3 border-l border-slate-200 pl-4 md:pl-6">
                  {/* Cart Button */}
                  <Link
                    href="/keranjang"
                    prefetch={false}
                    className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Keranjang Belanja"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {/* Badge Count Indicator Dinamis */}
                    <CartBadge />
                  </Link>
                </div>
              </div>

            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="hidden md:block bg-white border-t border-slate-200 py-8 transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Apotek Fazra Farma</span>
                <span>•</span>
                <span>Solusi Kesehatan Terpercaya Keluarga Anda</span>
              </div>
              <div className="flex gap-4">
                <span>Jl. Legenda Malaka No.6, Batam</span>
                <span>•</span>
                <span>WA: 0813-6170-8899</span>
              </div>
            </div>
          </footer>

          {/* BOTTOM NAVBAR (Mobile) – indikator halaman aktif dinamis */}
          <BottomNav />
          <Toaster position="top-center" richColors closeButton />
        </CartProvider>
      </body>
    </html>
  );
}
