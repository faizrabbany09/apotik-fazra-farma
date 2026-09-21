"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileCartBadge } from '@/components/cart/CartBadge';

/**
 * BottomNav – Bottom navigation bar untuk mobile.
 * Dipisah sebagai Client Component agar bisa menggunakan
 * usePathname() tanpa membuat seluruh layout.tsx menjadi Client Component.
 */
export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Beranda',
      exact: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: '/kategori',
      label: 'Kategori',
      exact: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      href: '/keranjang',
      label: 'Keranjang',
      exact: false,
      badge: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around py-2.5 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            className={`relative flex flex-col items-center transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-500'
            }`}
          >
            {item.icon}
            <span className={`text-[10px] font-semibold mt-1 ${isActive ? 'text-emerald-600' : ''}`}>
              {item.label}
            </span>
            {/* Indikator aktif (dot di bawah ikon) */}
            {isActive && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
            )}
            {/* Badge keranjang */}
            {item.badge && <MobileCartBadge />}
          </Link>
        );
      })}
    </nav>
  );
}
