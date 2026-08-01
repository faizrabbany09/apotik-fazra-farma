"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, PackageX } from 'lucide-react';

export interface ProductItem {
  id: string;
  nama: string;
  harga: number;
  kategori: string;
  deskripsi: string;
  isPrescription: boolean;
}

const mockProducts: ProductItem[] = [
  {
    id: '1',
    nama: 'Paracetamol 500mg - 10 Tablet',
    harga: 8500,
    kategori: 'Obat Bebas',
    deskripsi: 'Meringankan sakit kepala, sakit gigi, dan menurunkan demam.',
    isPrescription: false,
  },
  {
    id: '2',
    nama: 'Amoxicillin 500mg - Strip 10 Kapsul',
    harga: 15000,
    kategori: 'Obat Keras',
    deskripsi: 'Antibiotik untuk mengobati berbagai jenis infeksi bakteri.',
    isPrescription: true,
  },
  {
    id: '3',
    nama: 'Vitamin C 1000mg Imboost Force',
    harga: 75000,
    kategori: 'Vitamin & Suplemen',
    deskripsi: 'Suplemen imun tubuh untuk daya tahan harian dan pemulihan.',
    isPrescription: false,
  },
  {
    id: '4',
    nama: 'CTM 4mg - Strip 12 Tablet',
    harga: 5000,
    kategori: 'Obat Bebas Terbatas',
    deskripsi: 'Antihistamin untuk pereda gejala alergi, bersin, dan gatal-gatal.',
    isPrescription: false,
  },
  {
    id: '5',
    nama: 'OBH Combi Batuk Flu 100ml',
    harga: 23500,
    kategori: 'Obat Bebas Terbatas',
    deskripsi: 'Obat batuk sirup hitam untuk meredakan batuk berdahak disertai flu dan demam.',
    isPrescription: false,
  },
  {
    id: '6',
    nama: 'Promag Tablet Herbal Box 6 Strip',
    harga: 12000,
    kategori: 'Obat Maag / Lambung',
    deskripsi: 'Meredakan gejala maag, perut kembung, dan rasa perih asam lambung.',
    isPrescription: false,
  },
  {
    id: '7',
    nama: 'Enervon C Multivitamin 30 Tablet',
    harga: 42000,
    kategori: 'Vitamin & Suplemen',
    deskripsi: 'Kombinasi Vitamin C dan Vitamin B Kompleks untuk menjaga kebugaran tubuh.',
    isPrescription: false,
  },
  {
    id: '8',
    nama: 'Betadine Antiseptic Ointment 10g',
    harga: 28000,
    kategori: 'P3K & Perlengkapan Kesehatan',
    deskripsi: 'Salep antiseptik untuk mencegah infeksi pada luka bakar ringan dan luka potong.',
    isPrescription: false,
  },
  {
    id: '9',
    nama: 'Siladex Antitussive Sirup 60ml',
    harga: 18500,
    kategori: 'Obat Bebas Terbatas',
    deskripsi: 'Meredakan batuk kering tidak berdahak yang gatal di tenggorokan.',
    isPrescription: false,
  },
  {
    id: '10',
    nama: 'Bodrex Extra 10 Tablet',
    harga: 7000,
    kategori: 'Obat Bebas',
    deskripsi: 'Meredakan sakit kepala menahun dan nyeri otot.',
    isPrescription: false,
  },
];

function ProdukContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);

  // Multi-criteria filter: nama OR kategori OR deskripsi
  const filteredProducts = mockProducts.filter((product) => {
    if (!initialQuery.trim()) return true;
    const q = initialQuery.toLowerCase().trim();
    return (
      product.nama.toLowerCase().includes(q) ||
      product.kategori.toLowerCase().includes(q) ||
      product.deskripsi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header Navigation */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kembali
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Daftar Produk Kesehatan
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          {initialQuery ? (
            <span>
              Hasil pencarian untuk <span className="font-semibold text-emerald-700">&quot;{initialQuery}&quot;</span> ({filteredProducts.length} produk)
            </span>
          ) : (
            <span>Menampilkan seluruh katalog produk Fazra Farma ({filteredProducts.length} produk)</span>
          )}
        </p>
      </div>

      {/* Grid Products or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center justify-center shadow-sm my-8">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <PackageX className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-700 mb-1">
            Produk tidak ditemukan
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-md mb-6">
            Maaf, kami tidak dapat menemukan produk yang sesuai dengan kata kunci <span className="font-semibold text-slate-600">"{initialQuery}"</span>.
          </p>
          <button
            onClick={() => {
              router.push('/produk');
            }}
            className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs md:text-sm rounded-lg hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
          >
            Tampilkan Semua Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/produk/${product.id}`}
              className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all flex flex-col h-full"
            >
              {/* Product Thumbnail / Badge */}
              <div className="relative h-36 md:h-44 w-full bg-slate-50 flex items-center justify-center p-4">
                <div className="w-full h-full bg-white/60 rounded-lg border border-slate-100 flex flex-col items-center justify-center text-slate-300">
                  <ShoppingCart className="w-8 h-8 mb-1 text-slate-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium text-slate-400">FAZRA FARMA</span>
                </div>

                {/* Badge Golongan */}
                <div className="absolute top-3 left-3 flex items-center gap-1">
                  {product.isPrescription ? (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full border border-red-600 shadow-sm">
                      K (Resep)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full border border-emerald-600 shadow-sm">
                      Bebas
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3.5 md:p-4 flex flex-col flex-grow">
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                  {product.kategori}
                </span>

                <h3 className="font-bold text-slate-800 text-xs md:text-sm line-clamp-2 leading-snug mb-1.5 group-hover:text-emerald-600 transition-colors">
                  {product.nama}
                </h3>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {product.deskripsi}
                </p>

                <div className="mt-auto pt-2 border-t border-slate-50 flex items-center justify-between">
                  <p className="text-emerald-600 font-extrabold text-sm md:text-base">
                    {formatRupiah(product.harga)}
                  </p>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    Detail
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProdukPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-400 text-sm">
          Memuat katalog produk...
        </div>
      }
    >
      <ProdukContent />
    </Suspense>
  );
}
