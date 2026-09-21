import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 1,
    name: 'Obat Khusus',
    slug: 'obat-khusus',
    description: 'Obat dengan indikasi khusus dan resep dokter.',
    colorTheme: 'text-emerald-600',
    iconSrc: '/icons/obat khusus.png',
  },
  {
    id: 2,
    name: 'Obat Untuk Usia Dewasa',
    slug: 'obat-untuk-usia-dewasa',
    description: 'Obat yang ditujukan untuk pasien dewasa.',
    colorTheme: 'text-rose-600',
    iconSrc: '/icons/obatuntukdewasa.png',
  },
  {
    id: 3,
    name: 'Vitamin/Suplemen Dewasa',
    slug: 'vitamin-suplemen-dewasa',
    description: 'Vitamin dan suplemen untuk kesehatan orang dewasa.',
    colorTheme: 'text-amber-600',
    iconSrc: '/icons/vitamin.png',
  },
  {
    id: 4,
    name: 'Obat Untuk Anak/Bayi',
    slug: 'obat-untuk-anak-bayi',
    description: 'Obat yang aman untuk anak-anak dan bayi.',
    colorTheme: 'text-fuchsia-600',
    iconSrc: '/icons/ObatUntukAnak.png',
  },
  {
    id: 5,
    name: 'Mata & Telinga',
    slug: 'mata-telinga',
    description: 'Produk perawatan mata dan telinga.',
    colorTheme: 'text-indigo-600',
    iconSrc: '/icons/MataTelinga.png',
  },
  {
    id: 6,
    name: 'Mulut, Hidung Dan Tenggorokan',
    slug: 'mulut-hidung-tenggorokan',
    description: 'Obat untuk masalah mulut, hidung, dan tenggorokan.',
    colorTheme: 'text-cyan-600',
    iconSrc: '/icons/cough-syrup.png',
  },
  {
    id: 7,
    name: 'Perawatan Kulit (Jamur/Gatal/Alergi)',
    slug: 'perawatan-kulit',
    description: 'Produk untuk mengatasi jamur, gatal, dan alergi kulit.',
    colorTheme: 'text-emerald-500',
    iconSrc: '/icons/PerawatanKulitJamurGatalAlergi.png',
  },
  {
    id: 8,
    name: 'Produk Kewanitaan, Skincare & Bodycare',
    slug: 'produk-kewanitaan-skincare-bodycare',
    description: 'Skincare, bodycare, dan produk khusus wanita.',
    colorTheme: 'text-rose-500',
    iconSrc: '/icons/ProdukKewanitaanSkincareBodycare.png',
  },
  {
    id: 9,
    name: 'Obat Maag / Lambung',
    slug: 'obat-maag-lambung',
    description: 'Obat untuk masalah pencernaan dan maag.',
    colorTheme: 'text-amber-500',
    iconSrc: '/icons/ObatMaagLambung.png',
  },
  {
    id: 10,
    name: 'Obat Diare / Sakit Perut',
    slug: 'obat-diare-sakit-perut',
    description: 'Obat mengatasi diare serta nyeri perut.',
    colorTheme: 'text-fuchsia-500',
    iconSrc: '/icons/sakitperut.png',
  },
  {
    id: 11,
    name: 'P3K & Perlengkapan Kesehatan',
    slug: 'p3k-perlengkapan-kesehatan',
    description: 'Perlengkapan pertolongan pertama dan kesehatan.',
    colorTheme: 'text-indigo-500',
    iconSrc: '/icons/p3k.png',
  },
  {
    id: 12,
    name: 'Obat Ambeien (Wasir)',
    slug: 'obat-ambeien-wasir',
    description: 'Produk untuk mengatasi ambeien atau wasir.',
    colorTheme: 'text-cyan-500',
    iconSrc: '/icons/obat- sembelit.png',
  },
  {
    id: 13,
    name: 'Obat Gosok Dan Obat Oles',
    slug: 'obat-gosok-oles',
    description: 'Obat oles dan gosok untuk nyeri otot dan sendi.',
    colorTheme: 'text-emerald-500',
    iconSrc: '/icons/minyakgosok.png',
  },
  {
    id: 14,
    name: 'Vitamin/Suplemen Anak/Bayi',
    slug: 'vitamin-suplemen-anak-bayi',
    description: 'Vitamin khusus untuk pertumbuhan anak dan bayi.',
    colorTheme: 'text-rose-500',
    iconSrc: '/icons/VitaminSuplemenAnakBayi.png',
  },
  {
    id: 15,
    name: 'Anak Dan Bayi',
    slug: 'anak-dan-bayi',
    description: 'Produk kebutuhan khusus anak dan bayi.',
    colorTheme: 'text-amber-500',
    iconSrc: '/icons/anakdanbayi.png',
  },
  {
    id: 16,
    name: 'Produk 18+ (Kondom & Pil KB)',
    slug: 'produk-18-kondom-pil-kb',
    description: 'Produk dewasa seperti kondom dan pil KB.',
    colorTheme: 'text-fuchsia-500',
    iconSrc: '/icons/18.png',
  },
  {
    id: 17,
    name: 'Herbal (Jamu, Madu, Dan Lainnya)',
    slug: 'herbal-jamu-madu',
    description: 'Produk herbal tradisional termasuk jamu dan madu.',
    colorTheme: 'text-indigo-500',
    iconSrc: '/icons/herbal.png',
  },
  {
    id: 18,
    name: 'Ibu Hamil Dan Menyusui',
    slug: 'ibu-hamil-menyusui',
    description: 'Produk khusus untuk ibu hamil dan menyusui.',
    colorTheme: 'text-cyan-500',
    iconSrc: '/icons/bu HamilDanMenyusui.png',
  },
  {
    id: 19,
    name: 'Perawatan Rambut',
    slug: 'perawatan-rambut',
    description: 'Produk perawatan rambut dan kulit kepala.',
    colorTheme: 'text-rose-500',
    iconSrc: '/icons/perawatan-rambut.png',
  },
  {
    id: 20,
    name: 'Obat Sembelit / Susah BAB',
    slug: 'obat-sembelit-susah-bab',
    description: 'Obat untuk mengatasi sembelit dan susah BAB.',
    colorTheme: 'text-amber-500',
    iconSrc: '/icons/obat- sembelit.png',
  },
  {
    id: 21,
    name: 'Hewan Peliharaan',
    slug: 'hewan-peliharaan',
    description: 'Produk kesehatan untuk hewan peliharaan.',
    colorTheme: 'text-fuchsia-500',
    iconSrc: '/icons/hewan-peliharaan.png',
  },
  {
    id: 22,
    name: 'Lain-Lain',
    slug: 'lain-lain',
    description: 'Berbagai produk lain yang tidak termasuk kategori di atas.',
    colorTheme: 'text-indigo-500',
    iconSrc: '/icons/obat-lain-lain.png',
  },
];

export default function KategoriPage() {
  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Kategori Produk
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Jelajahi obat & produk kesehatan berdasarkan kebutuhan Anda
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/kategori/${category.slug}`}
            prefetch={false}
            className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md hover:border-emerald-300 transition-all group flex items-start gap-4"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 shrink-0 overflow-hidden p-1.5 group-hover:scale-105 transition-transform">
              <Image
                src={category.iconSrc}
                alt={category.name}
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={`font-bold text-base leading-snug ${category.colorTheme} group-hover:text-emerald-600 transition-colors`}>
                {category.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
