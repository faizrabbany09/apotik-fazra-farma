"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { CartBadge } from '@/components/cart/CartBadge';

/* ═══════════════════════════════════════════════════════════════════════════════
   HEADER / NAVBAR — Apotek Fazra Farma
   ─────────────────────────────────────────────────────────────────────────────
   • Sticky top-0 z-50, background putih transparan dengan blur (backdrop-blur-md)
   • Border bawah 1px #DCE9E3, tinggi baris 76px
   • Kiri: Logo (tinggi 46-48px, w-auto, object-contain, tanpa border/ring)
          sejajar vertikal (gap 12px) dengan "Apotek Fazra Farma" & "APOTEK RESMI BATAM"
   • Tengah: Kolom pencarian ("Cari nama obat atau vitamin…") + tombol "Cari"
   • Kanan: 4 Menu Navigasi Saja + Ikon Keranjang Belanja (Hidden di Mobile)
═══════════════════════════════════════════════════════════════════════════════ */

export const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Kategori Obat', href: '/kategori' },
  { name: 'Cara Belanja', href: '/cara-belanja' },
  { name: 'Info Apotik', href: '/info-apotek' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sinkronkan input pencarian jika URL memiliki parameter q atau search
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || params.get('search');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/produk?q=${encodeURIComponent(q)}`);
    } else {
      router.push('/produk');
    }
    setMobileMenuOpen(false);
  };

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#DCE9E3] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between gap-4 lg:gap-6 h-[76px]">

          {/* ── KIRI: Logo & Teks Apotek Fazra Farma ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/logo%20apotik_2.png"
              alt="Logo Apotek Fazra Farma"
              width={48}
              height={48}
              unoptimized
              priority
              className="h-[46px] sm:h-[48px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center leading-tight">
              <span className="text-base sm:text-lg font-black text-[#0E2019] tracking-tight block group-hover:text-[#0A7A4F] transition-colors">
                Apotek Fazra Farma
              </span>
              <span className="text-[10px] text-[#0A7A4F] font-bold tracking-wider uppercase block">
                APOTEK RESMI BATAM
              </span>
            </div>
          </Link>

          {/* ── TENGAH: Search Bar Lebar (Desktop & Tablet) ── */}
          <div className="hidden md:flex flex-1 max-w-lg lg:max-w-xl mx-2 lg:mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center w-full bg-[#F6FAF8] hover:bg-white focus-within:bg-white rounded-full border border-[#DCE9E3] focus-within:border-[#0A7A4F] transition-all pl-4 pr-1.5 py-1.5 shadow-2xs">
                <Search className="w-4 h-4 text-[#51655D] shrink-0 mr-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama obat atau vitamin…"
                  className="flex-1 bg-transparent text-[#0E2019] placeholder-[#51655D]/70 text-sm outline-none min-w-0 pr-3"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A7A4F] hover:bg-[#063D2A] text-white font-bold text-xs sm:text-sm rounded-full transition-all shrink-0 cursor-pointer shadow-sm shadow-[#0A7A4F]/20 active:scale-95"
                >
                  Cari
                </button>
              </div>
            </form>
          </div>

          {/* ── KANAN: 4 Menu Navigasi Saja + Ikon Keranjang Belanja ── */}
          <div className="flex items-center gap-1 lg:gap-3 shrink-0">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Menu Utama">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm transition-colors ${
                      active
                        ? 'text-[#0A7A4F] font-bold'
                        : 'text-[#51655D] hover:text-[#0A7A4F] font-semibold'
                    }`}
                  >
                    {link.name}
                    {/* Garis bawah hijau elegan pada menu aktif */}
                    {active && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2.5px] bg-[#0A7A4F] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Pemisah Vertikal Halus */}
            <div className="hidden lg:block h-6 w-px bg-[#DCE9E3] mx-1" aria-hidden="true" />

            {/* Ikon Keranjang Belanja (Sembunyi di Mobile: hidden md:flex) */}
            <Link
              href="/keranjang"
              className="hidden md:flex relative p-2.5 rounded-full text-[#0E2019] hover:text-[#0A7A4F] hover:bg-[#E3F5EC]/50 transition-colors"
              title="Keranjang Belanja"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              <CartBadge />
            </Link>

            {/* Tombol Hamburger Menu (Mobile) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0E2019] hover:bg-[#E3F5EC]/50 transition-colors cursor-pointer"
              aria-label="Toggle menu navigasi"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE SEARCH BAR ── */}
      <div className="md:hidden px-6 pb-3 pt-1 border-t border-[#DCE9E3]">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex items-center w-full bg-[#F6FAF8] rounded-full border border-[#DCE9E3] focus-within:border-[#0A7A4F] focus-within:bg-white pl-3.5 pr-1.5 py-1.5 transition-all">
            <Search className="w-4 h-4 text-[#51655D] shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama obat atau vitamin…"
              className="flex-1 bg-transparent text-[#0E2019] placeholder-[#51655D]/70 text-xs outline-none min-w-0 pr-2"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#0A7A4F] hover:bg-[#063D2A] text-white font-bold text-xs rounded-full cursor-pointer transition-colors shrink-0"
            >
              Cari
            </button>
          </div>
        </form>
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-[#DCE9E3] px-6 py-3 shadow-lg">
          <nav className="flex flex-col space-y-1" aria-label="Menu Mobile">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-[#E3F5EC] text-[#0A7A4F] font-bold border-l-4 border-[#0A7A4F]'
                      : 'text-[#51655D] hover:bg-[#F6FAF8]'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#0A7A4F]" />}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
