"use client";

import { useState } from 'react';
import Link from 'next/link';

// Dummy data pesanan (akan diganti global state nanti)
const orderItems = [
  { id: '1', name: 'Paracetamol 500mg - 10 Tablet', price: 8500, quantity: 2 },
  { id: '2', name: 'Amoxicillin 500mg - Strip 10 Kapsul', price: 15000, quantity: 1 },
];

export default function CheckoutPage() {
  const [nama, setNama] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const paymentOptions = [
    {
      value: 'transfer',
      label: 'Transfer Bank',
      desc: 'BCA, BNI, Mandiri, BRI',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
      ),
    },
    {
      value: 'qris',
      label: 'QRIS',
      desc: 'Scan QR dari e-wallet manapun',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
      ),
    },
    {
      value: 'cod',
      label: 'Bayar di Apotek',
      desc: 'Bayar langsung di kasir menggunakan Tunai, Debit, atau QRIS saat mengambil pesanan.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedOption = paymentOptions.find((opt) => opt.value === paymentMethod);
    const paymentLabel = selectedOption ? selectedOption.label : paymentMethod;

    const itemsText = orderItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (${item.quantity}x) - ${formatRupiah(item.price * item.quantity)}`
      )
      .join('\n');

    const message = `Halo Apotek Fazra Farma, saya ingin membuat pesanan Self Pick-Up (Ambil di Toko):\n\n` +
      `*Nama Pemesan:* ${nama || '-'}\n` +
      `*No. HP / WhatsApp:* ${phone || '-'}\n` +
      `*Metode Pembayaran:* ${paymentLabel}\n\n` +
      `*Daftar Pesanan:*\n${itemsText}\n\n` +
      `*Total Pembayaran:* ${formatRupiah(total)}`;

    const whatsappUrl = `https://wa.me/6281361708899?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 pb-28 md:pb-8">
      {/* Header */}
      <div>
        <Link
          href="/keranjang"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-2"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Keranjang
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ===== Kolom Kiri: Form Data Pemesan ===== */}
          <div className="flex-1 space-y-6">
            {/* Data Pemesan */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
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
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <h2 className="font-bold text-slate-800 text-lg">Metode Pembayaran</h2>
              </div>

              <div className="space-y-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === option.value
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={() => setPaymentMethod(option.value)}
                      className="sr-only"
                    />
                    {/* Custom Radio Circle */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      paymentMethod === option.value ? 'border-emerald-500' : 'border-slate-300'
                    }`}>
                      {paymentMethod === option.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      )}
                    </div>

                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      paymentMethod === option.value ? 'text-emerald-600 bg-emerald-100' : 'text-slate-400 bg-slate-50'
                    }`}>
                      {option.icon}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{option.label}</p>
                      <p className="text-xs text-slate-400">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ===== Kolom Kanan: Ringkasan Pesanan ===== */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 sticky top-24 space-y-5">
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
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Buat Pesanan via WhatsApp
              </button>

              <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pesanan Anda akan diteruskan secara otomatis ke WhatsApp Apotek Fazra Farma.
                </p>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
