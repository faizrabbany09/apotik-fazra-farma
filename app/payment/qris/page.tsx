"use client";

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function QrisPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const method = searchParams.get('method') || 'qris';
  const bank = searchParams.get('bank') || 'BCA';
  const namaParam = searchParams.get('nama');
  const orderIdParam = searchParams.get('orderId');
  const totalParam = searchParams.get('total');

  const nama = namaParam || 'Pelanggan';
  const orderId = orderIdParam || 'FZ-' + Math.floor(1000 + Math.random() * 9000);
  const totalBayarDisplay = totalParam
    ? `Rp ${parseInt(totalParam, 10).toLocaleString('id-ID')}`
    : 'Rp 42.000';

  // State nomor Virtual Account (16 digit simulasi)
  const [vaNumber] = useState(() => `8807${Math.floor(100000000000 + Math.random() * 900000000000)}`);
  const [copied, setCopied] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit dalam detik
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoRedirectRef = useRef<NodeJS.Timeout | null>(null);

  // Format VA menjadi spasi per 4 angka (contoh: 8807 0851 0432 2222)
  const formattedVa = vaNumber.replace(/(.{4})/g, '$1 ').trim();

  // Format detik menjadi MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCopyVA = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(vaNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSimulasiBayar = () => {
    if (autoRedirectRef.current) clearTimeout(autoRedirectRef.current);
    router.push(`/success?nama=${encodeURIComponent(nama)}&orderId=${orderId}`);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    autoRedirectRef.current = setTimeout(() => {
      router.push(`/success?nama=${encodeURIComponent(nama)}&orderId=${orderId}`);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoRedirectRef.current) clearTimeout(autoRedirectRef.current);
    };
  }, [router, nama, orderId]);

  return (
    <div className="flex flex-col items-center min-h-[70vh] pb-24 md:pb-8">
      {/* Header Komponen Atas */}
      <div className="w-full max-w-md text-center px-4 pt-4 space-y-1">
        <div className="flex justify-center mb-3">
          <div className="bg-emerald-100 p-3 rounded-full">
            {method === 'transfer' ? (
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            )}
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
          {method === 'transfer' ? `Transfer Bank ${bank}` : 'Scan QR Code untuk Membayar'}
        </h1>
        <p className="text-sm text-slate-500">
          {method === 'transfer'
            ? `Petunjuk pembayaran Virtual Account ${bank}`
            : 'Gunakan aplikasi e-wallet atau mobile banking Anda'}
        </p>
      </div>

      {/* Konten Utama (Conditional Rendering) */}
      {method === 'transfer' ? (
        /* ===== Flat Shopee-Native Style Virtual Account UI ===== */
        <div className="w-full bg-white border-t border-b border-gray-200 mt-6 text-left">
          <div className="max-w-md mx-auto px-5 py-4 space-y-4">

            {/* Baris 1: Header Bank */}
            <div className="pb-4 border-b border-gray-200">
              <h2 className="text-base md:text-lg font-bold text-slate-800">
                Bank {bank} <span className="font-normal text-slate-500 text-xs md:text-sm">(Dicek Otomatis)</span>
              </h2>
            </div>

            {/* Baris 2: Seksi Nomor Rekening & Tombol Salin */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">No. Rekening:</p>
                <p className="text-xl md:text-2xl font-bold text-orange-500 tracking-wide font-mono">
                  {formattedVa}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyVA}
                className="text-teal-600 font-bold text-sm tracking-wider hover:text-teal-700 active:scale-95 transition-all cursor-pointer pl-3"
              >
                {copied ? 'TERSALIN' : 'SALIN'}
              </button>
            </div>

            {/* Baris 3: Teks Instruksi */}
            <div className="pt-2 space-y-3 text-xs md:text-sm pb-1">
              <p className="text-teal-600 font-semibold flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Dicek dalam 10 menit setelah pembayaran berhasil
              </p>

              <p className="text-gray-500 leading-relaxed">
                Bayar pesanan ke Virtual Account di atas sebelum membuat pesanan kembali dengan Virtual Account agar nomor tetap sama.
              </p>

              <p className="text-gray-500 font-medium">
                Hanya menerima dari Bank {bank}
              </p>
            </div>

            {/* Baris 4: Total Pembayaran */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="text-xs md:text-sm text-gray-500">Total Pembayaran</span>
              <span className="text-base md:text-lg font-extrabold text-emerald-600">{totalBayarDisplay}</span>
            </div>

          </div>
        </div>
      ) : (
        /* ===== QR Code Placeholder UI (Tetap Utuh) ===== */
        <div className="w-full max-w-md px-4 mt-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5 text-center">
            <div className="mx-auto w-52 h-52 bg-slate-50 border-2 border-slate-200 rounded-xl flex flex-col items-center justify-center">
              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-sm ${
                      [0,1,4,5,6,9,10,12,14,15,18,19,20,23,24].includes(i)
                        ? 'bg-slate-800'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider">QRIS PLACEHOLDER</span>
            </div>

            <div className="flex justify-between items-center px-1">
              <span className="text-sm text-slate-500">Total Bayar</span>
              <span className="text-lg font-extrabold text-emerald-600">{totalBayarDisplay}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bagian Timer & Button (Bawah) */}
      <div className="w-full max-w-md px-4 space-y-6 text-center mt-6">
        {/* Timer Hitung Mundur */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-center gap-3">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm">
            <span className="text-amber-700 font-medium">Sisa Waktu: </span>
            <span className="text-amber-800 font-bold tabular-nums">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Info auto-redirect */}
        <p className="text-xs text-slate-400 leading-relaxed">
          Halaman ini akan otomatis berpindah ke konfirmasi pesanan saat pembayaran terdeteksi.
        </p>

        {/* Tombol Simulasi */}
        <button
          onClick={handleSimulasiBayar}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Simulasi Bayar Berhasil
        </button>
      </div>

    </div>
  );
}

export default function QrisPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-slate-400 text-sm">
          Memuat halaman pembayaran...
        </div>
      }
    >
      <QrisPaymentContent />
    </Suspense>
  );
}
