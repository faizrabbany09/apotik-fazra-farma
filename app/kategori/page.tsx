"use client";

import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Obat Khusus',
    slug: 'obat-khusus',
    description: 'Obat dengan indikasi khusus dan resep dokter.',
    colorTheme: 'text-emerald-600',
  },
  {
    id: 2,
    name: 'Obat Untuk Usia Dewasa',
    slug: 'obat-untuk-usia-dewasa',
    description: 'Obat yang ditujukan untuk pasien dewasa.',
    colorTheme: 'text-rose-600',
  },
  {
    id: 3,
    name: 'Vitamin/Suplemen Dewasa',
    slug: 'vitamin-suplemen-dewasa',
    description: 'Vitamin dan suplemen untuk kesehatan orang dewasa.',
    colorTheme: 'text-amber-600',
  },
  {
    id: 4,
    name: 'Obat Untuk Anak/Bayi',
    slug: 'obat-untuk-anak-bayi',
    description: 'Obat yang aman untuk anak-anak dan bayi.',
    colorTheme: 'text-fuchsia-600',
  },
  {
    id: 5,
    name: 'Mata & Telinga',
    slug: 'mata-telinga',
    description: 'Produk perawatan mata dan telinga.',
    colorTheme: 'text-indigo-600',
  },
  {
    id: 6,
    name: 'Mulut, Hidung Dan Tenggorokan',
    slug: 'mulut-hidung-tenggorokan',
    description: 'Obat untuk masalah mulut, hidung, dan tenggorokan.',
    colorTheme: 'text-cyan-600',
  },
  {
    id: 7,
    name: 'Perawatan Kulit (Jamur/Gatal/Alergi)',
    slug: 'perawatan-kulit',
    description: 'Produk untuk mengatasi jamur, gatal, dan alergi kulit.',
    colorTheme: 'text-emerald-500',
  },
  {
    id: 8,
    name: 'Produk Kewanitaan, Skincare & Bodycare',
    slug: 'produk-kewanitaan-skincare-bodycare',
    description: 'Skincare, bodycare, dan produk khusus wanita.',
    colorTheme: 'text-rose-500',
  },
  {
    id: 9,
    name: 'Obat Maag / Lambung',
    slug: 'obat-maag-lambung',
    description: 'Obat untuk masalah pencernaan dan maag.',
    colorTheme: 'text-amber-500',
  },
  {
    id: 10,
    name: 'Obat Diare / Sakit Perut',
    slug: 'obat-diare-sakit-perut',
    description: 'Obat mengatasi diare serta nyeri perut.',
    colorTheme: 'text-fuchsia-500',
  },
  {
    id: 11,
    name: 'P3K & Perlengkapan Kesehatan',
    slug: 'p3k-perlengkapan-kesehatan',
    description: 'Perlengkapan pertolongan pertama dan kesehatan.',
    colorTheme: 'text-indigo-500',
  },
  {
    id: 12,
    name: 'Obat Ambeien (Wasir)',
    slug: 'obat-ambeien-wasir',
    description: 'Produk untuk mengatasi ambeien atau wasir.',
    colorTheme: 'text-cyan-500',
  },
  {
    id: 13,
    name: 'Obat Gosok Dan Obat Oles',
    slug: 'obat-gosok-oles',
    description: 'Obat oles dan gosok untuk nyeri otot dan sendi.',
    colorTheme: 'text-emerald-400',
  },
  {
    id: 14,
    name: 'Vitamin/Suplemen Anak/Bayi',
    slug: 'vitamin-suplemen-anak-bayi',
    description: 'Vitamin khusus untuk pertumbuhan anak dan bayi.',
    colorTheme: 'text-rose-400',
  },
  {
    id: 15,
    name: 'Anak Dan Bayi',
    slug: 'anak-dan-bayi',
    description: 'Produk kebutuhan khusus anak dan bayi.',
    colorTheme: 'text-amber-400',
  },
  {
    id: 16,
    name: 'Produk 18+ (Kondom & Pil KB)',
    slug: 'produk-18-kondom-pil-kb',
    description: 'Produk dewasa seperti kondom dan pil KB.',
    colorTheme: 'text-fuchsia-400',
  },
  {
    id: 17,
    name: 'Herbal (Jamu, Madu, Dan Lainnya)',
    slug: 'herbal-jamu-madu',
    description: 'Produk herbal tradisional termasuk jamu dan madu.',
    colorTheme: 'text-indigo-400',
  },
  {
    id: 18,
    name: 'Ibu Hamil Dan Menyusui',
    slug: 'ibu-hamil-menyusui',
    description: 'Produk khusus untuk ibu hamil dan menyusui.',
    colorTheme: 'text-cyan-400',
  },
  {
    id: 19,
    name: 'Minyak Urut Dan Minyak Gosok',
    slug: 'minyak-urut-gosok',
    description: 'Minyak urut dan gosok untuk relaksasi otot.',
    colorTheme: 'text-emerald-300',
  },
  {
    id: 20,
    name: 'Perawatan Rambut',
    slug: 'perawatan-rambut',
    description: 'Produk perawatan rambut dan kulit kepala.',
    colorTheme: 'text-rose-300',
  },
  {
    id: 21,
    name: 'Obat Sembelit / Susah BAB',
    slug: 'obat-sembelit-susah-bab',
    description: 'Obat untuk mengatasi sembelit dan susah BAB.',
    colorTheme: 'text-amber-300',
  },
  {
    id: 22,
    name: 'Hewan Peliharaan',
    slug: 'hewan-peliharaan',
    description: 'Produk kesehatan untuk hewan peliharaan.',
    colorTheme: 'text-fuchsia-300',
  },
  {
    id: 23,
    name: 'Lain-Lain',
    slug: 'lain-lain',
    description: 'Berbagai produk lain yang tidak termasuk kategori di atas.',
    colorTheme: 'text-indigo-300',
  },
];

export default function KategoriPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800">Kategori Produk</h1>
      <p className="text-sm text-slate-500 mb-6">Temukan produk berdasarkan kategori berikut</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/kategori/${category.slug}`}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-emerald-500 transition-all"
          >
            <div className="flex items-center gap-3">
              {/* Icon placeholder */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 ${category.colorTheme}`}>
                <span className="font-semibold">{category.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className={`font-semibold ${category.colorTheme}`}>{category.name}</h2>
                <p className="text-sm text-slate-500">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
