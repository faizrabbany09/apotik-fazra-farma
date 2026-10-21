"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    // Pada halaman Beranda, hero section melebar penuh (full-width) ujung ke ujung layar
    return <main className="flex-grow flex flex-col w-full pb-24 md:pb-0">{children}</main>;
  }

  // Pada halaman lainnya, pertahankan container terpusat max-w-6xl
  return (
    <main className="flex-grow flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-0">
      {children}
    </main>
  );
}
