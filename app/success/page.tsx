"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Home, ShoppingBag, Store } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const nama = searchParams.get('nama') || 'Pelanggan';
  const orderId = searchParams.get('orderId') || 'FZ-' + Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="flex items-center justify-center min-h-[75vh] py-8 pb-24 md:pb-8">
      <div className="w-full max-w-md text-center space-y-6 px-4">

        {/* Icon Centang Hijau */}
        <div className="flex justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-emerald-600" />
          </div>
        </div>

        {/* Judul & Sub-judul */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Pembayaran Berhasil!
          </h1>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            Pesanan Anda telah diterima. Silakan tunjukkan Nomor Pengambilan ke kasir Apotek Fazra Farma.
          </p>
        </div>

        {/* Card Detail / Antrean Pengambilan */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4 text-left">
          {/* Header Card */}
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-500">
            <Store className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Bukti Pengambilan Obat
            </span>
          </div>

          {/* Nama Pemesan */}
          <div className="flex justify-between items-baseline">
            <span className="text-xs md:text-sm text-slate-500">Nama Pemesan</span>
            <span className="font-bold text-slate-800 text-sm md:text-base">{nama}</span>
          </div>

          {/* Nomor Pengambilan */}
          <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-4 text-center space-y-1">
            <span className="text-xs font-medium text-emerald-800 uppercase tracking-wider">
              Nomor Pengambilan
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-emerald-700 tracking-wider font-mono">
              {orderId}
            </div>
            <p className="text-[11px] text-emerald-600/90 font-medium">
              Sebutkan kode ini kepada petugas kasir
            </p>
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/kategori"
            className="flex-1 py-3.5 px-4 font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors active:scale-[0.98] text-center text-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-slate-500" />
            Belanja Lagi
          </Link>
          <Link
            href="/"
            className="flex-1 py-3.5 px-4 font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98] text-center text-sm flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-slate-400 text-sm">
          Memuat rincian pesanan...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
