"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function KeranjangPage() {
  const router = useRouter();
  const {
    items: cartItems,
    updateQuantity: updateQty,
    removeItem,
    subtotal,
  } = useCart();

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  const isEmpty = cartItems.length === 0;

  return (
    <div className="space-y-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-2 cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Keranjang Belanja
          </h1>
        </div>
        <span className="text-sm font-semibold text-slate-400">
          {cartItems.length} item
        </span>
      </div>

      {isEmpty ? (
        /* State kosong */
        <div className="bg-white rounded-2xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
          <svg className="w-20 h-20 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Keranjang Anda masih kosong</h2>
          <p className="text-sm text-slate-400 mb-6">Yuk, cari obat atau produk kesehatan yang Anda butuhkan.</p>
          <Link
            href="/kategori"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-emerald-600/20"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        /* Layout 2 Kolom */
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Kiri: Daftar Produk */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 md:p-5 flex gap-4 items-start shadow-sm"
              >
                {/* Placeholder Gambar */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>

                {/* Info Produk */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {/* Badge Golongan */}
                      <div className="flex items-center gap-1.5 mb-1">
                        {item.isPrescription ? (
                          <div className="w-4 h-4 rounded-full bg-rose-500 border border-slate-900/40 flex items-center justify-center" title="Obat Keras">
                            <span className="text-white text-[8px] font-bold leading-none">K</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 border border-slate-900/40" title="Obat Bebas"></div>
                        )}
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                    </div>

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
                      title="Hapus item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Harga & Quantity */}
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-emerald-600 font-extrabold text-base md:text-lg">
                      {formatRupiah(item.price * item.quantity)}
                    </p>

                    {/* Counter */}
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-emerald-600 font-bold active:scale-95 transition-colors cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold text-slate-800 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-emerald-600 font-bold active:scale-95 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Kanan: Ringkasan Belanja */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 sticky top-24 space-y-5 shadow-sm">
              <h2 className="font-bold text-slate-800 text-lg">Ringkasan Belanja</h2>

              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-600">
                    <span className="truncate pr-4">
                      {item.name} <span className="text-slate-400">×{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-100"></div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Subtotal</span>
                <span className="text-xl font-extrabold text-emerald-600">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              <button
                onClick={() => {
                  router.push('/checkout');
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98] flex items-center justify-center cursor-pointer text-center"
              >
                Lanjut ke Pembayaran
              </button>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                Dengan melanjutkan, Anda menyetujui syarat & ketentuan yang berlaku.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
