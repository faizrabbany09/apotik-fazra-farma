"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { ProductCardProps } from '@/components/ui/ProductCard';
import {
  Search,
  ShieldCheck,
  Truck,
  ArrowRight,
  Store,
  Pill,
  X,
  ExternalLink,
  Clock,
} from 'lucide-react';

// ─── Data Produk untuk Autocomplete ──────────────────────────────────────────
const searchMockProducts = [
  { id: '1',  nama: 'Paracetamol 500mg - 10 Tablet',      harga: 8500,  kategori: 'Obat Bebas' },
  { id: '2',  nama: 'Amoxicillin 500mg - Strip 10 Kapsul', harga: 15000, kategori: 'Obat Keras' },
  { id: '3',  nama: 'Vitamin C 1000mg Imboost Force',      harga: 75000, kategori: 'Vitamin & Suplemen' },
  { id: '4',  nama: 'CTM 4mg - Strip 12 Tablet',           harga: 5000,  kategori: 'Obat Bebas Terbatas' },
  { id: '5',  nama: 'OBH Combi Batuk Flu 100ml',           harga: 23500, kategori: 'Obat Bebas Terbatas' },
  { id: '6',  nama: 'Promag Tablet Herbal Box 6 Strip',    harga: 12000, kategori: 'Obat Maag / Lambung' },
  { id: '7',  nama: 'Enervon C Multivitamin 30 Tablet',    harga: 42000, kategori: 'Vitamin & Suplemen' },
  { id: '8',  nama: 'Betadine Antiseptic Ointment 10g',    harga: 28000, kategori: 'P3K & Perlengkapan Kesehatan' },
  { id: '9',  nama: 'Siladex Antitussive Sirup 60ml',      harga: 18500, kategori: 'Obat Bebas Terbatas' },
  { id: '10', nama: 'Bodrex Extra 10 Tablet',              harga: 7000,  kategori: 'Obat Bebas' },
];

// ─── Data Produk Lengkap untuk Randomizer ─────────────────────────────────────
const allProducts: ProductCardProps[] = [
  { id: '1', name: 'Paracetamol 500mg - 10 Tablet',          price: 8500,  category: 'Obat Bebas',         isPrescription: false },
  { id: '2', name: 'Amoxicillin 500mg - Strip 10 Kapsul',    price: 15000, category: 'Obat Keras',          isPrescription: true  },
  { id: '3', name: 'Vitamin C 1000mg Imboost Force',         price: 75000, category: 'Vitamin & Suplemen',  isPrescription: false },
  { id: '4', name: 'CTM 4mg - Strip 12 Tablet',              price: 5000,  category: 'Obat Bebas Terbatas', isPrescription: false },
  { id: '5', name: 'OBH Combi Batuk Flu 100ml',              price: 23500, category: 'Obat Bebas Terbatas', isPrescription: false },
  { id: '6', name: 'Promag Tablet Herbal Box 6 Strip',       price: 12000, category: 'Obat Maag / Lambung', isPrescription: false },
  { id: '7', name: 'Enervon C Multivitamin 30 Tablet',       price: 42000, category: 'Vitamin & Suplemen',  isPrescription: false },
  { id: '8', name: 'Betadine Antiseptic Ointment 10g',       price: 28000, category: 'P3K & Perlengkapan',  isPrescription: false },
];

// ─── Format harga ke Rupiah ───────────────────────────────────────────────────
function formatRupiah(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(val);
}

export default function Home() {
  const router = useRouter();

  // State Search & Autocomplete
  const [searchQuery, setSearchQuery] = useState('');
  const [liveResults, setLiveResults] = useState<typeof searchMockProducts>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State Produk yang Ditampilkan (Diacak setiap refresh)
  const [displayProducts, setDisplayProducts] = useState<ProductCardProps[]>(allProducts.slice(0, 4));

  // Ref untuk deteksi klik di luar area search
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Acak urutan produk setiap kali halaman dimuat / di-refresh
  useEffect(() => {
    const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
    setDisplayProducts(shuffled.slice(0, 4));
  }, []);

  useEffect(() => {
    const q = searchQuery.trim();

    if (q.length > 0) {
      const filtered = searchMockProducts.filter(
        (item) => item.nama.toLowerCase().includes(q.toLowerCase())
      );
      setLiveResults(filtered);
      setIsDropdownOpen(true);
    } else {
      setLiveResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    const q = searchQuery.trim();
    if (q) {
      router.push(`/produk?q=${encodeURIComponent(q)}`);
    } else {
      router.push('/produk');
    }
  };

  return (
    <div className="space-y-8 md:space-y-10 pb-12">

      {/* ═══════════════════════════════════════════════════════════
          1. SEARCH BAR + LIVE AUTOCOMPLETE DROPDOWN
      ══════════════════════════════════════════════════════════════ */}
      <div ref={searchContainerRef} className="relative z-40 max-w-2xl mx-auto">
        <form onSubmit={handleSearch}>
          <div className="flex items-center bg-white rounded-full border border-slate-200 shadow-sm hover:border-slate-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all px-4 py-2.5 gap-2">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim().length > 0) {
                  setIsDropdownOpen(true);
                }
              }}
              placeholder="Cari obat, vitamin, resep, atau kebutuhan medis..."
              className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm outline-none"
              autoComplete="off"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setIsDropdownOpen(false); }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs md:text-sm rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-sm shadow-emerald-600/20"
            >
              Cari
            </button>
          </div>
        </form>

        {/* DROPDOWN AUTOCOMPLETE */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-2xl z-50 border border-slate-100 overflow-hidden">
            {liveResults.length > 0 ? (
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                <div className="px-4 py-2 bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Ditemukan {liveResults.length} produk
                </div>

                {liveResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push(`/produk/${item.id}`);
                    }}
                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-emerald-50/60 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                          {item.nama}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                          {item.kategori}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-emerald-600 flex-shrink-0">
                      {formatRupiah(item.harga)}
                    </p>
                  </div>
                ))}

                <div
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push(`/produk?q=${encodeURIComponent(searchQuery.trim())}`);
                  }}
                  className="px-4 py-3 text-center text-xs font-semibold text-emerald-600 hover:bg-emerald-50 cursor-pointer transition-colors border-t border-slate-100"
                >
                  Lihat semua hasil untuk &quot;{searchQuery}&quot; →
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-sm font-semibold text-slate-500">Obat tidak ditemukan</p>
                <p className="text-xs text-slate-400 mt-1">
                  Coba kata kunci lain seperti &quot;paracetamol&quot;, &quot;vitamin&quot;, atau &quot;batuk&quot;.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          2. HERO BANNER (Modern 2-Column Responsive Layout)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl shadow-emerald-950/20 border border-emerald-800/40">
        {/* Ambient Glow Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Subtle geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Kolom Kiri: Teks & Tombol Aksi */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-200 border border-white/15 text-xs font-semibold backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Layanan Apotek Resmi &amp; Terpercaya
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Kesehatan Anda Prioritas Utama Kami
            </h1>

            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-xl">
              Pesan obat bebas, tebus resep dokter, dan konsul vitamin dengan mudah, aman, dan tepat waktu.
            </p>
          </div>

          {/* Kolom Kanan: Visual & Trust Badge Glassmorphism */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-800/50 via-emerald-900/60 to-teal-950/60 border border-white/15 p-5 sm:p-6 flex flex-col gap-4 sm:gap-5 overflow-hidden shadow-inner backdrop-blur-sm">
              
              {/* Background ambient glow inside container */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
              
              {/* Top info badge inside visual container */}
              <div className="relative z-10 flex items-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-medium text-emerald-100 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Buka Setiap Hari (08.30 - 22.30)</span>
                </div>
              </div>

              {/* Glassmorphism Credentials Trust Badge */}
              <div className="relative z-10 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-xl">
                <div className="flex items-center gap-2.5 font-bold text-white text-xs sm:text-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/30 border border-emerald-300/40 flex items-center justify-center text-emerald-300 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block leading-tight">Izin Resmi Kemenkes &amp; BPOM</span>
                    <span className="text-[10px] text-emerald-200 font-normal">Legalitas Terverifikasi &amp; Resmi</span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-white/15 text-[10px] sm:text-[11px] font-mono text-emerald-100 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/75 shrink-0">SIPA :</span>
                    <span className="font-semibold text-white tracking-wide text-right">85/SIPAR/DPMPTSP-BTM/01/V/2024</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/75 shrink-0">STRA :</span>
                    <span className="font-semibold text-white tracking-wide text-right">DD00001169357195</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. INFO CARDS (Produk Original, Grab, Operasional)
      ══════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Produk Original */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:border-emerald-200 transition-all">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">100% Produk Original</h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Semua obat &amp; vitamin bersumber langsung dari distributor resmi BPOM.
            </p>
          </div>
        </div>

        {/* Pengiriman via Grab */}
        <a
          href="https://app.grab.com/s/eiuIBBV3"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-emerald-50/80 p-5 rounded-2xl border-2 border-emerald-500 flex flex-col justify-between shadow-sm hover:bg-emerald-100/70 transition-all cursor-pointer group"
        >
          <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-950 group-hover:text-emerald-800 transition-colors">
                Pengiriman Instant via Grab
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Layanan pesan antar obat eksklusif dan aman menggunakan kurir Grab.
              </p>
            </div>
          </div>

          <div className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold text-white bg-emerald-600 rounded-xl group-hover:bg-emerald-700 w-full shadow-sm transition-colors">
            <span>Pesan via GrabMart</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </div>
        </a>

        {/* Informasi Apotek */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:border-emerald-200 transition-all">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
            <Store className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800">Informasi Operasional</h3>
            <div className="text-xs text-slate-500 space-y-1 leading-relaxed">
              <p><span className="font-medium text-slate-700">Alamat:</span> Komplek Pertokoan Legenda Malaka No.6, Batam</p>
              <p><span className="font-medium text-slate-700">Telp:</span> 0813-6170-8899</p>
              <p><span className="font-medium text-slate-700">Jam Buka:</span> Setiap Hari (08.30 - 22.30 WIB)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. PRODUK PILIHAN & PENAWARAN HARI INI (Randomizer ON)
          Sekarang menggunakan ProductGrid agar tombol Tambah
          terhubung ke CartContext.
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              Produk Pilihan &amp; Penawaran Hari Ini
            </h2>
            <p className="text-xs text-slate-400">
              Pilihan obat terbaik untuk kesehatan keluarga yang diperbarui berkala
            </p>
          </div>
          <Link
            href="/kategori"
            prefetch={false}
            className="inline-flex items-center gap-1 text-emerald-600 font-bold hover:text-emerald-700 transition-colors text-xs md:text-sm"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ProductGrid: tersambung ke CartContext tanpa prop drilling */}
        <ProductGrid products={displayProducts} />
      </section>

    </div>
  );
}
