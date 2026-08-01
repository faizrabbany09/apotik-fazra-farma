import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apotek Fazra Farma',
  description: 'Solusi Kesehatan Terpercaya untuk Keluarga Anda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      {/* pb-20 digunakan agar konten tidak tertutup oleh bottom navbar di mobile */}
      <body className={`${inter.className} bg-slate-50 text-slate-900 pb-20 md:pb-0 min-h-screen flex flex-col`}>
        
        {/* TOP NAVBAR: Tampil di semua ukuran layar (Mobile & Desktop) */}
        <header className="sticky top-0 z-50 bg-white shadow-sm px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="text-xl md:text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Apotek Fazra Farma
          </a>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="hover:text-emerald-500 font-medium transition-colors">Beranda</a>
            <a href="/kategori" className="hover:text-emerald-500 font-medium transition-colors">Kategori</a>
            <a href="/keranjang" className="hover:text-emerald-500 font-medium transition-colors">Keranjang</a>
          </nav>
        </header>

        {/* MAIN CONTENT: Menyesuaikan max-width agar rapi di layar besar */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </main>

        {/* BOTTOM NAVBAR: Muncul di Mobile (flex), Disembunyikan di Desktop (md:hidden) */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around py-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] pb-safe">
          <a href="/" className="flex flex-col items-center text-emerald-600">
            {/* Icon Home */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-semibold mt-1">Beranda</span>
          </a>
          <a href="/kategori" className="flex flex-col items-center text-slate-400 hover:text-emerald-600 transition-colors">
            {/* Icon Kategori */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            <span className="text-[10px] font-semibold mt-1">Kategori</span>
          </a>
          <a href="/keranjang" className="flex flex-col items-center text-slate-400 hover:text-emerald-600 transition-colors">
            {/* Icon Keranjang */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
            <span className="text-[10px] font-semibold mt-1">Keranjang</span>
          </a>
        </nav>
      </body>
    </html>
  )
}
