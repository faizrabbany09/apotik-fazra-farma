import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] pb-24 md:pb-0">
      <div className="w-full max-w-md text-center space-y-6 px-4">

        {/* Icon Centang Hijau */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200/50">
            <svg className="w-14 h-14 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Judul & Sub-judul */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Pesanan Berhasil Dibuat!
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            Terima kasih, pesanan Anda telah masuk dan sedang menunggu pembayaran/proses.
          </p>
        </div>

        {/* Card Detail Pesanan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-4 text-left">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Nomor Pesanan</span>
            <span className="font-bold text-slate-800 tracking-wide">#FZ-123456</span>
          </div>
          <div className="h-px bg-slate-100"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Total Tagihan</span>
            <span className="text-lg font-extrabold text-emerald-600">Rp 42.000</span>
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/pesanan"
            className="flex-1 py-3 px-4 font-bold rounded-lg border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-colors active:scale-[0.98] text-center text-sm md:text-base"
          >
            Cek Status Pesanan
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 px-4 font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98] text-center text-sm md:text-base"
          >
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}
