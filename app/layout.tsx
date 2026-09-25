import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { CartProvider } from '@/context/CartContext';
import { CartBadge } from '@/components/cart/CartBadge';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toaster } from 'sonner';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

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
          <footer className="bg-white border-t border-slate-200 pt-12 pb-24 md:pb-12 text-slate-600 transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
                
                {/* Kolom 1: Profil & Tentang Apotek */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/logo%20apotik_2.png"
                      alt="Logo Apotek Fazra Farma"
                      width={48}
                      height={48}
                      unoptimized={true}
                      className="object-contain h-10 w-auto"
                    />
                    <div>
                      <span className="text-base font-bold text-slate-900 block leading-tight">
                        Apotek Fazra Farma
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold">
                        Solusi Kesehatan Keluarga Anda
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Apotek resmi dan terpercaya melayani penyediaan obat bebas, vitamin, suplemen daya tahan tubuh, dan tebus resep dokter dengan jaminan keaslian 100%.
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Buka Setiap Hari: <strong>08.30 - 22.30 WIB</strong></span>
                  </div>
                </div>

                {/* Kolom 2: Navigasi Belanja */}
                <div className="lg:col-span-2 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Menu Belanja
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link href="/" prefetch={false} className="hover:text-emerald-600 transition-colors">
                        Beranda
                      </Link>
                    </li>
                    <li>
                      <Link href="/kategori" prefetch={false} className="hover:text-emerald-600 transition-colors">
                        Kategori Produk
                      </Link>
                    </li>
                    <li>
                      <Link href="/cara-belanja" prefetch={false} className="hover:text-emerald-600 transition-colors">
                        Cara Belanja
                      </Link>
                    </li>
                    <li>
                      <Link href="/keranjang" prefetch={false} className="hover:text-emerald-600 transition-colors">
                        Keranjang Belanja
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://app.grab.com/s/eiuIBBV3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        <span>GrabMart</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Kolom 3: Legalitas & Izin Resmi (SIPA / STRA / BPOM / Kemenkes) */}
                <div className="lg:col-span-3 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Izin Resmi &amp; Legalitas</span>
                  </h4>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Terverifikasi Kemenkes &amp; BPOM</span>
                    </div>

                    <div className="pt-1.5 border-t border-slate-200/60 font-mono text-[11px] space-y-1.5 text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-sans">Surat Izin Praktik Apoteker (SIPA):</span>
                        <span className="font-semibold text-slate-800 break-all">85/SIPAR/DPMPTSP-BTM/01/V/2024</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-sans">Surat Tanda Registrasi Apoteker (STRA):</span>
                        <span className="font-semibold text-slate-800 break-all">DD00001169357195</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-sans">Surat Izin Apotek (SIA):</span>
                        <span className="font-semibold text-slate-800 break-all">503/SIA/123.45/2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kolom 4: Kontak & Lokasi */}
                <div className="lg:col-span-3 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Lokasi &amp; Kontak
                  </h4>

                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Komplek Pertokoan Legenda Malaka No.6, Batam, Kepulauan Riau</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Konsultasi / WA: <a href="https://wa.me/6281361708899" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:underline">0813-6170-8899</a></span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <a
                      href="https://wa.me/6281361708899?text=Halo%20Apotek%20Fazra%20Farma,%20saya%20ingin%20konsultasi%20obat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs rounded-xl border border-emerald-200 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Hubungi Apoteker via WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Bottom Copyright & Disclaimer */}
              <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
                <p>
                  &copy; {new Date().getFullYear()} Apotek Fazra Farma. Seluruh hak cipta dilindungi.
                </p>
                <p className="text-center md:text-right">
                  Penyediaan obat keras memerlukan resep dokter resmi. 100% jaminan obat asli dan berizin.
                </p>
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
