"use client";

import Link from 'next/link';
import Image from 'next/image';

export interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
  isPrescription: boolean;
  onAddToCart?: (e: React.MouseEvent, product: ProductCardProps) => void;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  category,
  isPrescription,
  onAddToCart
}: ProductCardProps) {
  // Format harga ke Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col h-full">
      {/* Link Overlay ke Halaman Detail (Aman dari nesting button) */}
      <Link
        href={`/produk/${id}`}
        prefetch={false}
        className="absolute inset-0 z-0 focus:outline-none"
        aria-label={`Lihat detail ${name}`}
      />

      {/* Bagian Gambar / Placeholder (Next.js Image Optimized) */}
      <div className="relative h-40 md:h-48 w-full bg-slate-50/80 flex items-center justify-center p-4 overflow-hidden pointer-events-none">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-slate-100/60 rounded-xl flex flex-col items-center justify-center text-slate-300">
            <svg className="w-12 h-12 mb-1.5 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-[10px] font-semibold tracking-wider">APOTEK FAZRA</span>
          </div>
        )}

        {/* Badge Golongan Obat (Standar Indonesia) */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-auto">
          {category.toUpperCase().includes('BEBAS') && !category.toUpperCase().includes('TERBATAS') && !isPrescription && (
            <div className="w-4 h-4 rounded-full bg-emerald-500 border border-slate-900/40" title="Obat Bebas"></div>
          )}
          {category.toUpperCase().includes('TERBATAS') && !isPrescription && (
            <div className="w-4 h-4 rounded-full bg-blue-500 border border-slate-900/40" title="Obat Bebas Terbatas"></div>
          )}
          {(category.toUpperCase().includes('KERAS') || isPrescription) && (
            <div className="w-4 h-4 rounded-full bg-rose-500 border border-slate-900/40 flex items-center justify-center" title="Obat Keras">
              <span className="text-white text-[9px] font-black leading-none">K</span>
            </div>
          )}
        </div>
      </div>

      {/* Bagian Konten/Teks */}
      <div className="p-3.5 md:p-4 flex flex-col flex-grow relative z-10 pointer-events-none">
        <span className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {category}
        </span>

        {/* Nama Obat - Bold */}
        <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-2 leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>

        <div className="mt-auto">
          {/* Harga */}
          <p className="text-emerald-600 font-extrabold text-base md:text-lg mb-3">
            {formattedPrice}
          </p>

          {/* Tombol Tambah (Terisolasi dari Link) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onAddToCart) {
                onAddToCart(e, { id, name, price, imageUrl, category, isPrescription });
              }
            }}
            className="w-full min-h-[40px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold py-2 md:py-2.5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all text-xs md:text-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer pointer-events-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
