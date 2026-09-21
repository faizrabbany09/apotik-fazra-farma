"use client";

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { addItem } = useCart();

  // Gunakan React.use() untuk unwrap params sesuai standar Next.js 15
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // State untuk mengontrol Modal, Kuantitas, dan File
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Menyimpan aksi mana yang ingin dilakukan pengguna (Beli Langsung atau Keranjang)
  const [pendingAction, setPendingAction] = useState<'cart' | 'buy' | null>(null);

  // Dummy Data Logic: Jika ID adalah '2', kita simulasikan sebagai obat keras
  const isKeras = id === '2';

  const product = {
    id,
    title: isKeras ? 'Amoxicillin 500mg - Strip 10 Kapsul' : 'Paracetamol 500mg - 10 Tablet',
    price: isKeras ? 15000 : 8500,
    category: isKeras ? 'Obat Keras' : 'Obat Bebas',
    categoryLabel: isKeras ? 'Obat Keras / Resep' : 'Obat Bebas',
    description: isKeras
      ? 'Amoxicillin adalah antibiotik penisilin yang digunakan untuk mengobati berbagai macam infeksi bakteri, seperti infeksi saluran pernapasan, saluran kemih, dan kulit. Obat ini bekerja dengan menghentikan pertumbuhan bakteri.'
      : 'Paracetamol adalah obat analgesik (pereda nyeri) dan antipiretik (penurun panas) yang banyak digunakan untuk meredakan sakit kepala ringan hingga sedang, sakit gigi, serta mengurangi demam.',
    indikasi: isKeras
      ? 'Infeksi telinga tengah, radang amandel, infeksi tenggorokan, laringitis, bronkitis, paru-paru basah, dan infeksi saluran kemih.'
      : 'Meringankan rasa sakit pada keadaan sakit kepala, sakit gigi dan menurunkan demam.',
    dosis: isKeras
      ? 'PENGGUNAAN OBAT INI HARUS SESUAI DENGAN PETUNJUK DOKTER. Dewasa: 250-500 mg tiap 8 jam. Anak: 20 mg/kgBB/hari terbagi tiap 8 jam.'
      : 'Dewasa: 1-2 tablet, 3-4 kali sehari. Anak 6-12 tahun: 1/2-1 tablet, 3-4 kali sehari.',
    stock: 12,
    // Sementara null; akan diisi dengan URL Supabase Storage setelah integrasi database
    imageUrl: null as string | null,
  };


  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(product.price);

  const executeAction = (type: 'cart' | 'buy') => {
    // Tambahkan produk ke CartContext (global state + localStorage)
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity,
      // imageUrl akan diisi saat data asli tersedia dari Supabase
      imageUrl: product.imageUrl ?? null,
    });

    if (type === 'buy') {
      router.push('/checkout');
    }
  };

  const handleActionClick = (type: 'cart' | 'buy') => {
    if (product.category === 'Obat Keras') {
      setPendingAction(type);
      setIsModalOpen(true);
    } else {
      executeAction(type);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleConfirmUpload = () => {
    setIsModalOpen(false);
    console.log(`[STATE] Resep "${selectedFile?.name}" telah divalidasi dan diunggah.`);
    if (pendingAction) {
      executeAction(pendingAction);
    }
    setSelectedFile(null);
    setPendingAction(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <div className="space-y-6 pb-24 md:pb-0 relative z-0">
        {/* Tombol Kembali */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Kembali ke Beranda
        </Link>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">

          {/* 1. Area Gambar Produk */}
          <div className="w-full md:w-5/12 lg:w-1/3 bg-slate-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 min-h-[300px]">
            <div className="w-full max-w-[250px] aspect-square bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-slate-300 overflow-hidden relative">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 80vw, 250px"
                />
              ) : (
                <>
                  <svg className="w-20 h-20 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="text-xs font-medium tracking-wide">GAMBAR PRODUK</span>
                </>
              )}
            </div>
          </div>

          {/* 2. Sisi Kanan: Info Produk */}
          <div className="w-full md:w-7/12 lg:w-2/3 p-6 md:p-8 flex flex-col">
            {/* Badge Kategori */}
            <div className="flex items-center gap-2 mb-3">
              {product.category === 'Obat Bebas' && (
                <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-black flex-shrink-0" title="Obat Bebas"></div>
              )}
              {product.category === 'Obat Bebas Terbatas' && (
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-black flex-shrink-0" title="Obat Bebas Terbatas"></div>
              )}
              {product.category === 'Obat Keras' && (
                <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-black flex items-center justify-center flex-shrink-0" title="Obat Keras">
                  <span className="text-black text-xs font-bold leading-none">K</span>
                </div>
              )}
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {product.categoryLabel}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-2">
              {product.title}
            </h1>

            <p className="text-3xl font-extrabold text-emerald-600 mb-6">
              {formattedPrice}
            </p>

            <div className="w-full h-px bg-slate-100 mb-6"></div>

            {/* 3. Section Deskripsi, Indikasi, Dosis */}
            <div className="space-y-5 flex-grow">
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Deskripsi</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Indikasi Umum</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{product.indikasi}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Dosis & Aturan Pakai</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{product.dosis}</p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100 my-6"></div>

            {/* 4. Logic Khusus Alert & Tombol berdasarkan Obat Keras */}
            <div className="mt-auto space-y-5">
              {product.category === 'Obat Keras' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 items-start">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <h4 className="font-bold text-red-800 text-sm">Wajib Resep Dokter</h4>
                    <p className="text-red-600 text-xs mt-1 leading-relaxed">Obat ini mewajibkan upload resep dokter asli.</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {/* Tombol Counter Kuantitas */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 shrink-0 md:w-32 justify-between">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-emerald-600 font-bold active:scale-95"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-emerald-600 font-bold active:scale-95"
                  >
                    +
                  </button>
                </div>

                {/* Tombol Aksi Kanan (Responsive: Stack on mobile, inline on desktop) */}
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <button
                    onClick={() => handleActionClick('buy')}
                    className="flex-1 font-bold py-3.5 px-4 rounded-lg flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-colors active:scale-[0.98]"
                  >
                    Beli Langsung
                  </button>
                  <button
                    onClick={() => handleActionClick('cart')}
                    className="flex-1 font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-colors active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Keranjang
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Upload Resep */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity">
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Upload Resep Dokter</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPendingAction(null);
                }}
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-sm text-slate-600 leading-relaxed">
                Silakan unggah foto resep asli dari dokter untuk produk <strong className="text-slate-800">{product.title}</strong>. Pastikan tulisan pada resep terbaca dengan jelas.
              </p>

              {!selectedFile ? (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors group cursor-pointer relative bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <svg className="w-10 h-10 text-slate-400 group-hover:text-emerald-500 mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-sm font-semibold text-slate-700">Pilih foto atau tarik ke sini</span>
                  <span className="text-xs text-slate-500 mt-1">Format: JPG, PNG (Max 5MB)</span>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-700 truncate">{selectedFile.name}</p>
                      <p className="text-xs text-slate-400">Siap diupload</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="ml-3 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                    title="Ganti File"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPendingAction(null);
                }}
                className="flex-1 py-2.5 px-4 font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors active:scale-[0.98]"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={!selectedFile}
                className="flex-[2] py-2.5 px-4 font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-[0.98]"
              >
                {selectedFile
                  ? (pendingAction === 'buy' ? 'Upload & Beli Langsung' : 'Upload & Masukkan Keranjang')
                  : 'Pilih Foto Dahulu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
