"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { ProductCardProps } from '@/components/ui/ProductCard';
import HeroSection from '@/components/HeroSection';
import { ArrowRight } from 'lucide-react';

// ─── Data Produk Lengkap untuk Randomizer ─────────────────────────────────────
const allProducts: ProductCardProps[] = [
  { id: '1', name: 'Paracetamol 500mg - 10 Tablet',          price: 8500,  category: 'Obat Bebas',         isPrescription: false },
  { id: '2', name: 'Amoxicillin 500mg - Strip 10 Kapsul',    price: 15000, category: 'Obat Keras',          isPrescription: true  },
  { id: '3', name: 'Vitamin C 1000mg Imboost Force',         price: 75000, category: 'Vitamin & Suplemen',  isPrescription: false },
  { id: '4', name: 'CTM 4mg - Strip 12 Tablet',              price: 5000,  category: 'Obat Bebas Terbatas', isPrescription: false },
  { id: '5', name: 'OBH Combi Batuk Flu 100ml',              price: 23500, category: 'Obat Bebas Terbatas', isPrescription: false },
  { id: '6', name: 'Promag Tablet Herbal Box 6 Strip',       price: 12000, category: 'Obat Maag / Lambung', isPrescription: false },
  { id: '7', name: 'Enervon C Multivitamin 30 Tablet',       price: 42000, category: 'Vitamin & Suplemen',  isPrescription: false },
  { id: '8', name: 'Betadine Antiseptic Ointment 10g',       price: 28000, category: 'P3K & Perlengkapan',  isPrescription: false },
];

export default function Home() {
  // State Produk yang Ditampilkan (Diacak setiap refresh)
  const [displayProducts, setDisplayProducts] = useState<ProductCardProps[]>(allProducts.slice(0, 4));

  // Acak urutan produk setiap kali halaman dimuat / di-refresh
  useEffect(() => {
    const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
    setDisplayProducts(shuffled.slice(0, 4));
  }, []);

  return (
    <div className="flex-grow w-full">

      {/* 1. HERO SECTION BANNER */}
      <HeroSection />

      {/* 2. PRODUK PILIHAN */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 py-10 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              Produk Pilihan &amp; Penawaran Hari Ini
            </h2>
            <p className="text-xs text-slate-400">
              Pilihan obat terbaik untuk kesehatan keluarga yang diperbarui berkala
            </p>
          </div>
          <Link
            href="/kategori"
            prefetch={false}
            className="inline-flex items-center gap-1 text-emerald-600 font-bold hover:text-emerald-700 transition-colors text-xs md:text-sm"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={displayProducts} />
      </section>

    </div>
  );
}
