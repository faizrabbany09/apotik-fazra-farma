"use client";

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Bike,
  Search,
  ShoppingCart,
  Store,
  CheckCircle2,
} from 'lucide-react';

const selfPickupSteps = [
  {
    number: 1,
    icon: Search,
    title: 'Cari Produk',
    description: 'Temukan produk kesehatan yang Anda butuhkan di website kami.',
  },
  {
    number: 2,
    icon: ShoppingCart,
    title: 'Masukkan Keranjang',
    description:
      'Pilih produk dan selesaikan pesanan. Detail pesanan Anda akan otomatis diteruskan ke WhatsApp admin kami.',
  },
  {
    number: 3,
    icon: Store,
    title: 'Ambil & Bayar di Apotek',
    description: (
      <>
        Admin kami akan menyiapkan pesanan Anda. Silakan datang ke Apotek Fazra Farma untuk mengambil barang tanpa perlu antre. Anda dapat membayar secara online melalui website (Transfer Bank), atau membayar langsung di kasir saat pengambilan menggunakan <span className="font-bold text-slate-700">Debit (EDC) maupun Tunai</span>.
      </>
    ),
  },
];

const grabFeatures = [
  'Transaksi 100% aman via aplikasi Grab',
  'Pengiriman cepat langsung ke rumah Anda',
  'Lacak pesanan secara real-time',
];

export default function CaraBelanja() {
  const router = useRouter();

  return (
    <div className="min-h-screen pb-16 space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Cara Belanja
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Pilih cara berbelanja yang paling nyaman untuk Anda.
        </p>
      </div>

      <div className="space-y-5">

        {/* ══════════════════════════════════════════════════════════════
            OPSI 1: PESAN ANTAR VIA GRAB (highlighted / primary)
        ══════════════════════════════════════════════════════════════ */}
        <div className="relative bg-emerald-600 rounded-2xl p-6 md:p-7 shadow-md overflow-hidden text-white">
          {/* Dekorasi background subtle */}
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-emerald-500/30 pointer-events-none" />
          <div className="absolute -right-2 -bottom-10 w-32 h-32 rounded-full bg-emerald-700/30 pointer-events-none" />

          {/* Badge */}
          <span className="inline-block mb-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white rounded-full">
            Opsi 1 · Layanan Utama
          </span>

          {/* Judul & Ikon */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Bike className="w-5 h-5 text-white stroke-[1.75]" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Pesan Antar via Grab
            </h2>
          </div>

          {/* Deskripsi */}
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
            Ingin pesanan langsung diantar ke rumah? Klik tombol{' '}
            <span className="font-semibold text-white">&quot;Beli via Grab&quot;</span>{' '}
            yang tersedia. Anda akan langsung diarahkan ke toko{' '}
            <span className="font-semibold text-white">GrabMart Apotek Fazra Farma</span>.
            Transaksi dan pengiriman 100% aman melalui aplikasi Grab.
          </p>

          {/* Feature list */}
          <ul className="space-y-1.5">
            {grabFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2 text-white/90 text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            OPSI 2: AMBIL DI TOKO (Self Pick-Up)
        ══════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-7 space-y-5">

          {/* Judul Opsi */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500">
              <Store className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <span className="inline-block mb-0.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 rounded-full">
                Opsi 2
              </span>
              <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                Ambil di Toko
                <span className="ml-2 text-xs font-semibold text-slate-400">(Self Pick-Up)</span>
              </h2>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Steps */}
          <div className="space-y-4">
            {selfPickupSteps.map(({ number, icon: Icon, title, description }, idx) => (
              <div key={number} className="flex items-start gap-4">
                {/* Ikon + Connector Line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Icon className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  {/* Garis vertikal antar step */}
                  {idx < selfPickupSteps.length - 1 && (
                    <div className="w-px h-6 bg-slate-200 mt-1" />
                  )}
                </div>

                {/* Konten */}
                <div className="pb-2 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                      0{number}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INFO APOTEK ─────────────────────────────────────────────── */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-6 space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            📍 Lokasi Apotek
          </h3>
          <div className="text-xs text-slate-600 space-y-1 leading-relaxed">
            <p>
              <span className="font-semibold text-slate-800">Alamat:</span>{' '}
              Depan wedrink, KOMPLEK PERTOKOAN, Jl. Hang Kesturi Jl. Legenda Malaka No.6, Batam
            </p>
            <p>
              <span className="font-semibold text-slate-800">Telepon / WhatsApp:</span>{' '}
              0813-6170-8899
            </p>
            <p>
              <span className="font-semibold text-slate-800">Jam Operasional:</span>{' '}
              Setiap Hari (08.30 – 22.30)
            </p>
          </div>
        </div>

      </div>

      {/* ── TAGLINE PENUTUP ─────────────────────────────────────────── */}
      <p className="mt-10 text-center text-sm italic text-slate-400">
        &ldquo;Kesehatan Anda Prioritas Kami&rdquo;
      </p>

    </div>
  );
}
