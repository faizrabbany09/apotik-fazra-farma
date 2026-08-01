"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function QrisPaymentPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit dalam detik
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoRedirectRef = useRef<NodeJS.Timeout | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Format detik menjadi MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    // Hitung mundur setiap 1 detik
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-redirect setelah 5 detik (simulasi pembayaran terdeteksi)
    // Note: We keep this for real QR detection, but it will be cleared when paymentSuccess becomes true.
    autoRedirectRef.current = setTimeout(() => {
      if (!paymentSuccess) {
        router.push('/success');
      }
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoRedirectRef.current) clearTimeout(autoRedirectRef.current);
    };
  }, [router, paymentSuccess]);

  const handleSimulatePay = () => {
    // Simulate successful payment
    if (autoRedirectRef.current) clearTimeout(autoRedirectRef.current);
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] pb-24 md:pb-0">
        <div className="w-full max-w-sm text-center space-y-6 px-4">
          <div className="flex justify-center mb-3">
            <div className="bg-emerald-100 p-3 rounded-full">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Pembayaran Berhasil!</h1>
          <p className="text-sm text-slate-500">Silakan ambil pesanan Anda langsung di toko Apotek Fazra Farma</p>
          <button
            onClick={() => router.push('/')}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98]"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] pb-24 md:pb-0">
      <div className="w-full max-w-sm text-center space-y-6 px-4">

        {/* Header */}
        <div className="space-y-1">
          <div className="flex justify-center mb-3">
            <div className="bg-emerald-100 p-3 rounded-full">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Scan QR Code untuk Membayar</h1>
          <p className="text-sm text-slate-500">Gunakan aplikasi e-wallet atau mobile banking Anda</p>
        </div>

        {/* QR Code Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          <div className="mx-auto w-52 h-52 bg-slate-50 border-2 border-slate-200 rounded-xl flex flex-col items-center justify-center">
            {/* Grid pattern sebagai placeholder QR */}
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

          {/* Total */}
          <div className="flex justify-between items-center px-1">
            <span className="text-sm text-slate-500">Total Bayar</span>
            <span className="text-lg font-extrabold text-emerald-600">Rp 42.000</span>
          </div>
        </div>

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
          onClick={handleSimulatePay}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
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
