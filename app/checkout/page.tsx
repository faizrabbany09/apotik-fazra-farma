"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const bankOptions = [
  { id: 'bca', name: 'BCA' },
  { id: 'bni', name: 'BNI' },
  { id: 'mandiri', name: 'Mandiri' },
  { id: 'bri', name: 'BRI' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items: orderItems, subtotal, clearCart } = useCart();
  const [nama, setNama] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State Metode Pembayaran Utama & Bank yang Dipilih
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer' | ''>('');
  const [selectedBank, setSelectedBank] = useState('');

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  const total = subtotal;

  const isSubmitDisabled = isLoading || !paymentMethod || (paymentMethod === 'transfer' && !selectedBank);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod) return;
    if (paymentMethod === 'transfer' && !selectedBank) return;

    setIsLoading(true);

    // Generate Nomor Pesanan / Antrean acak
    const orderId = 'FZ-' + Math.floor(1000 + Math.random() * 9000);

    try {
      const supabase = createClient();

      // Map rincian_pesanan sebagai JSON array produk
      const rincianPesanan = orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        category: item.category ?? null,
      }));

      // Tentukan nilai metode_bayar yang deskriptif
      const metodeBayar =
        paymentMethod === 'cod'
          ? 'Bayar di Apotek (COD)'
          : `Transfer Bank ${selectedBank}`;

      const { error } = await supabase.from('pesanan').insert({
        nama_pelanggan: nama,
        no_whatsapp: phone,
        rincian_pesanan: rincianPesanan,
        metode_bayar: metodeBayar,
        total_harga: total,
      });

      if (error) {
        throw error;
      }

      // Sukses: kosongkan keranjang lalu redirect
      clearCart();
      toast.success('Pesanan berhasil dibuat! Terima kasih, ' + nama + ' 🎉');

      const queryParams = `nama=${encodeURIComponent(nama)}&orderId=${orderId}&total=${total}`;

      if (paymentMethod === 'cod') {
        router.push(`/success?${queryParams}`);
      } else {
        router.push(
          `/payment/qris?method=transfer&bank=${encodeURIComponent(selectedBank)}&${queryParams}`
        );
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.';
      toast.error('Gagal membuat pesanan: ' + message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-28 md:pb-8">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-2 cursor-pointer"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Keranjang
        </button>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Checkout
        </h1>
      </div>

      <form onSubmit={handleCheckout}>
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ===== Kolom Kiri: Form Data Pemesan & Metode Pembayaran ===== */}
          <div className="flex-1 space-y-6">
            {/* Data Pemesan */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-emerald-100 p-2 rounded-xl">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="font-bold text-slate-800 text-lg">Data Pemesan</h2>
              </div>

              <div className="space-y-4">
                {/* Nama Pemesan */}
                <div>
                  <label htmlFor="nama" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Nama Pemesan
                  </label>
                  <input
                    id="nama"
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* No. HP */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Nomor HP / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-emerald-100 p-2 rounded-xl">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="font-bold text-slate-800 text-lg">Metode Pembayaran</h2>
              </div>

              <div className="space-y-3">

                {/* ─── 1. ACCORDION GROUP: TRANSFER BANK (Tanpa Radio Button Utama) ─── */}
                <div
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${
                    paymentMethod === 'transfer'
                      ? 'border-emerald-500 bg-emerald-50/40'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  {/* Header Accordion Transfer Bank */}
                  <div
                    onClick={() => {
                      if (paymentMethod === 'transfer') {
                        setPaymentMethod('');
                        setSelectedBank('');
                      } else {
                        setPaymentMethod('transfer');
                      }
                    }}
                    className="flex items-center justify-between p-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl flex-shrink-0 ${
                        paymentMethod === 'transfer'
                          ? 'text-emerald-600 bg-emerald-100'
                          : 'text-slate-400 bg-slate-50'
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800 text-sm">
                          Transfer Bank
                        </p>
                        <p className="text-xs text-slate-400">
                          {selectedBank && paymentMethod === 'transfer'
                            ? `Dipilih: Bank ${selectedBank}`
                            : 'Pilih bank tujuan (BCA, BNI, Mandiri, BRI)'}
                        </p>
                      </div>
                    </div>

                    {/* Chevron Icon Expand/Collapse */}
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform ${paymentMethod === 'transfer' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Expandable Daftar Pilihan Bank (Dengan Radio Button per Bank) */}
                  {paymentMethod === 'transfer' && (
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <p className="px-4 text-xs font-semibold text-slate-500 mb-1">
                        Pilih Bank Tujuan Transfer:
                      </p>
                      <div className="flex flex-col">
                        {bankOptions.map((bank, idx) => {
                          const isBankSelected = paymentMethod === 'transfer' && selectedBank === bank.name;
                          const isLast = idx === bankOptions.length - 1;

                          return (
                            <button
                              type="button"
                              key={bank.id}
                              onClick={() => {
                                setPaymentMethod('transfer');
                                setSelectedBank(bank.name);
                              }}
                              className={`flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer hover:bg-emerald-50/40 ${
                                !isLast ? 'border-b border-gray-100' : ''
                              }`}
                            >
                              {/* Radio Circle Kiri Per Bank */}
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                                isBankSelected
                                  ? 'border-2 border-emerald-600'
                                  : 'border-slate-300'
                              }`}>
                                {isBankSelected && (
                                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                )}
                              </div>

                              <span className={`text-sm tracking-tight ${
                                isBankSelected
                                  ? 'text-emerald-600 font-bold'
                                  : 'text-slate-700 font-medium'
                              }`}>
                                {bank.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── 2. BAYAR DI APOTEK (COD) ─── */}
                <div
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 bg-emerald-50/40'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <label
                    className="flex items-center gap-4 p-4 cursor-pointer"
                    onClick={() => {
                      setPaymentMethod('cod');
                      setSelectedBank('');
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => {
                        setPaymentMethod('cod');
                        setSelectedBank('');
                      }}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      paymentMethod === 'cod' ? 'border-emerald-500' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'cod' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      )}
                    </div>

                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      paymentMethod === 'cod' ? 'text-emerald-600 bg-emerald-100' : 'text-slate-400 bg-slate-50'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 text-sm">Bayar di Apotek</p>
                      <p className="text-xs text-slate-400">
                        Bayar langsung di kasir menggunakan Tunai, Debit, atau QRIS saat mengambil pesanan.
                      </p>
                    </div>
                  </label>
                </div>

              </div>
            </div>
          </div>

          {/* ===== Kolom Kanan: Ringkasan Pesanan ===== */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 sticky top-24 space-y-5">
              <h2 className="font-bold text-slate-800 text-lg">Ringkasan Pesanan</h2>

              {/* Daftar Item */}
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="text-slate-600 truncate pr-3">
                      {item.name}
                      <span className="text-slate-400 ml-1">×{item.quantity}</span>
                    </div>
                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-100"></div>

              {/* Subtotal */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">{formatRupiah(subtotal)}</span>
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Total Pembayaran</span>
                <span className="text-xl font-extrabold text-emerald-600">{formatRupiah(total)}</span>
              </div>

              {/* Tombol Buat Pesanan */}
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Buat Pesanan
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
