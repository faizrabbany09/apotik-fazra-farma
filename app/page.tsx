"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductCard, ProductCardProps } from '@/components/ui/ProductCard';
import {
  Search,
  MessageCircle,
  ShoppingBag,
  FileText,
  ShieldCheck,
  Truck,
  ArrowRight,
  Store,
  Pill,
  X,
  ExternalLink,
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

// ─── Data Produk Rekomendasi ──────────────────────────────────────────────────
const dummyProducts: ProductCardProps[] = [
  { id: '1', name: 'Paracetamol 500mg - 10 Tablet',          price: 8500,  category: 'Obat Bebas',         isPrescription: false },
  { id: '2', name: 'Amoxicillin 500mg - Strip 10 Kapsul',    price: 15000, category: 'Obat Keras',          isPrescription: true  },
  { id: '3', name: 'Vitamin C 1000mg Imboost Force',         price: 75000, category: 'Vitamin & Suplemen',  isPrescription: false },
  { id: '4', name: 'CTM 4mg - Strip 12 Tablet',              price: 5000,  category: 'Obat Bebas Terbatas', isPrescription: false },
];

// ─── Format harga ke Rupiah ───────────────────────────────────────────────────
function formatRupiah(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(val);
}

// ═════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const router = useRouter();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [liveResults, setLiveResults] = useState<typeof searchMockProducts>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref untuk deteksi klik di luar area search
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // ── EFEK UTAMA: filter + buka/tutup dropdown setiap searchQuery berubah ──
  useEffect(() => {
    const q = searchQuery.trim();

    if (q.length > 0) {
      // Filter berdasarkan nama ATAU kategori (case-insensitive)
      const filtered = searchMockProducts.filter(
        (item) => item.nama.toLowerCase().startsWith(q.toLowerCase())
      );
      setLiveResults(filtered);
      setIsDropdownOpen(true);   // ← BUKA dropdown
    } else {
      setLiveResults([]);
      setIsDropdownOpen(false);  // ← TUTUP dropdown jika kosong
    }
  }, [searchQuery]);

  // ── EFEK: tutup dropdown saat klik di luar ────────────────────────────────
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

  // ── Handler submit form cari ──────────────────────────────────────────────
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
    <div className="space-y-6 md:space-y-8 pb-12">

      {/* ═══════════════════════════════════════════════════════════
          1. SEARCH BAR + LIVE AUTOCOMPLETE DROPDOWN
      ══════════════════════════════════════════════════════════════ */}
      {/*
        PENTING: div ini harus `relative` agar dropdown `absolute` di dalamnya
        melayang relatif terhadap div ini, bukan relatif terhadap <main>.
        z-50 memastikan dropdown selalu di atas semua elemen lain.
      */}
      <div ref={searchContainerRef} className="relative z-50 max-w-2xl mx-auto">

        {/* Form pencarian */}
        <form onSubmit={handleSearch}>
          <div className="flex items-center bg-white rounded-full border border-slate-200 shadow-sm hover:border-slate-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all px-4 py-2 gap-2">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                // Buka kembali dropdown jika input sudah ada isinya
                if (searchQuery.trim().length > 0) {
                  setIsDropdownOpen(true);
                }
              }}
              placeholder="Cari obat, vitamin, resep, atau kebutuhan medis..."
              className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm outline-none"
              autoComplete="off"
            />

            {/* Tombol hapus teks */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setIsDropdownOpen(false); }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Tombol Cari */}
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs md:text-sm rounded-full transition-colors flex-shrink-0 cursor-pointer"
            >
              Cari
            </button>
          </div>
        </form>

        {/* ── DROPDOWN AUTOCOMPLETE ──────────────────────────────────────
            Kelas wajib: absolute, w-full, bg-white, shadow-lg, rounded-md, z-50
        ────────────────────────────────────────────────────────────────── */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-md z-50 border border-slate-100 overflow-hidden">

            {liveResults.length > 0 ? (
              /* ── Ada hasil ── */
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {/* Header count */}
                <div className="px-4 py-2 bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Ditemukan {liveResults.length} produk
                </div>

                {/* List hasil */}
                {liveResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push(`/produk/${item.id}`);
                    }}
                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-emerald-50 cursor-pointer group transition-colors"
                  >
                    {/* Ikon + Nama + Kategori */}
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

                    {/* Harga */}
                    <p className="text-sm font-bold text-emerald-600 flex-shrink-0">
                      {formatRupiah(item.harga)}
                    </p>
                  </div>
                ))}

                {/* Footer: Lihat semua */}
                <div
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push(`/produk?q=${encodeURIComponent(searchQuery.trim())}`);
                  }}
                  className="px-4 py-3 text-center text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer transition-colors border-t border-slate-100"
                >
                  Lihat semua hasil untuk &quot;{searchQuery}&quot; →
                </div>
              </div>
            ) : (
              /* ── Tidak ada hasil ── */
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
          2. HERO BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-emerald-600 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-3 max-w-xl">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Kesehatan Anda Prioritas Kami
          </h1>
          <p className="text-white/95 text-sm md:text-base leading-relaxed">
            Pesan obat bebas, tebus resep dokter, dan beli vitamin dengan mudah, aman, dan cepat.
          </p>
        </div>

        <div className="w-full md:w-auto bg-emerald-700/60 border border-emerald-500/30 rounded-xl p-4 text-xs space-y-1.5 flex-shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>Izin Apotek Resmi</span>
          </div>
          <p className="text-white/90 text-[11px] leading-relaxed">
            SIA: 503/SIA/123.45/2026<br />
            SIPA: 19900101/SIPA-12.34/2026
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. QUICK MENU (3 Item Sejajar)
      ══════════════════════════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto">
          {/* Konsultasi → WhatsApp */}
          <a
            href="https://wa.me/6281361708899?text=Halo%20Apotek%20Fazra%20Farma,%20saya%20ingin%20konsultasi%20kesehatan/obat."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3.5 md:p-5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all group flex flex-col items-center text-center gap-2.5"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 stroke-[1.75]" />
            </div>
            <span className="font-semibold text-xs md:text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">
              Konsultasi
            </span>
          </a>

          {/* Cara Belanja */}
          <Link
            href="/cara-belanja"
            className="bg-white p-3.5 md:p-5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all group flex flex-col items-center text-center gap-2.5"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 stroke-[1.75]" />
            </div>
            <span className="font-semibold text-xs md:text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">
              Cara Belanja
            </span>
          </Link>

          {/* Tebus Resep → WhatsApp */}
          <a
            href="https://wa.me/6281361708899?text=Halo%20Apotek%20Fazra%20Farma,%20saya%20ingin%20menebus%20resep%20dokter."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3.5 md:p-5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all group flex flex-col items-center text-center gap-2.5"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <FileText className="w-5 h-5 md:w-6 md:h-6 stroke-[1.75]" />
            </div>
            <span className="font-semibold text-xs md:text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">
              Tebus Resep
            </span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. INFO CARDS
      ══════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Produk Original */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-start gap-4 shadow-sm hover:border-emerald-100 transition-all">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">100% Produk Original</h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Semua obat & vitamin bersumber langsung dari distributor resmi BPOM.
            </p>
          </div>
        </div>

        {/* Pengiriman via Grab — Clickable link ke GrabMart dengan visual CTA */}
        <a
          href="https://app.grab.com/s/eiuIBBV3"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-emerald-50/80 p-5 rounded-xl border-2 border-emerald-500 flex flex-col justify-between shadow-sm hover:bg-emerald-100/70 hover:shadow-md transition-all cursor-pointer group"
        >
          {/* Ikon ExternalLink di pojok kanan atas */}
          <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-emerald-600/70 group-hover:text-emerald-700 transition-colors" />

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-emerald-600 text-white flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-950 group-hover:text-emerald-800 transition-colors">
                Pengiriman via Grab
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Layanan pesan antar obat eksklusif dan aman menggunakan kurir Grab.
              </p>
            </div>
          </div>

          <div className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold text-white bg-emerald-600 rounded-lg group-hover:bg-emerald-700 w-full shadow-sm transition-colors">
            <span>Pesan Sekarang</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </div>
        </a>

        {/* Informasi Apotek */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-start gap-4 shadow-sm hover:border-emerald-100 transition-all">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
            <Store className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800">Informasi Apotek</h3>
            <div className="text-xs text-slate-500 space-y-1 leading-relaxed">
              <p><span className="font-medium text-slate-700">Alamat:</span> Depan wedrink, KOMPLEK PERTOKOAN, Jl. Hang Kesturi Jl. Legenda Malaka No.6, Batam</p>
              <p><span className="font-medium text-slate-700">Telp:</span> 0813-6170-8899</p>
              <p><span className="font-medium text-slate-700">Jam Buka:</span> Setiap Hari (08.30 - 22.30)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. REKOMENDASI PRODUK
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">Rekomendasi Produk</h2>
            <p className="text-xs text-slate-400">Produk pilihan terbaik untuk kesehatan keluarga Anda</p>
          </div>
          <Link
            href="/produk"
            className="inline-flex items-center gap-1 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-xs md:text-sm"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

    </div>
  );
}
