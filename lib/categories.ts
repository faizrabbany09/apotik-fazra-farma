/**
 * Peta slug ↔ nama kategori resmi dan pemetaan kategori di Supabase.
 *
 * Slug dipakai di URL (contoh: /kategori/perawatan-rambut),
 * sedangkan nama kategori dipakai untuk judul tampilan di UI.
 *
 * Nilai `dbCategory` dan `dbCategories` memetakan slug ke nilai string asli
 * di kolom `kategori` pada tabel `produk` di Supabase (yang umumnya tersimpan
 * dalam format HURUF KAPITAL SEMUA).
 */

export interface CategoryInfo {
  slug: string;
  name: string;
  /** Nilai kategori utama di database Supabase (biasanya huruf kapital) */
  dbCategory?: string;
  /** Daftar variasi nilai kategori terkait di database */
  dbCategories?: string[];
}

export const categories: CategoryInfo[] = [
  {
    slug: 'obat-khusus',
    name: 'Obat Khusus',
    dbCategory: 'OBAT KERAS',
    dbCategories: ['OBAT KERAS', 'OBAT KERAS SIRUP'],
  },
  {
    slug: 'obat-untuk-usia-dewasa',
    name: 'Obat Untuk Usia Dewasa',
    dbCategory: 'OBAT UNTUK DEWASA',
    dbCategories: ['OBAT UNTUK DEWASA'],
  },
  {
    slug: 'vitamin-suplemen-dewasa',
    name: 'Vitamin/Suplemen Dewasa',
    dbCategory: 'VITAMIN DAN SUPLEMEN DEWASA',
    dbCategories: ['VITAMIN DAN SUPLEMEN DEWASA'],
  },
  {
    slug: 'obat-untuk-anak-bayi',
    name: 'Obat Untuk Anak/Bayi',
    dbCategory: 'OBAT DEMAM ANAK, BATUK DAN FLU ANAK/BAYI',
    dbCategories: ['OBAT DEMAM ANAK, BATUK DAN FLU ANAK/BAYI', 'SUPLEMEN DAN VITAMIN ANAK'],
  },
  {
    slug: 'mata-telinga',
    name: 'Mata & Telinga',
    dbCategory: 'MATA DAN TELINGA',
    dbCategories: ['MATA DAN TELINGA'],
  },
  {
    slug: 'mulut-hidung-tenggorokan',
    name: 'Mulut, Hidung Dan Tenggorokan',
    dbCategory: 'OBAT HIDUNG, MULUT DAN GIGI',
    dbCategories: ['OBAT HIDUNG, MULUT DAN GIGI', 'OBAT KUMUR'],
  },
  {
    slug: 'perawatan-kulit',
    name: 'Perawatan Kulit (Jamur/Gatal/Alergi)',
    dbCategory: 'SALEP KULIT',
    dbCategories: ['SALEP KULIT', 'BEDAK DAN SABUN'],
  },
  {
    slug: 'produk-kewanitaan-skincare-bodycare',
    name: 'Produk Kewanitaan, Skincare & Bodycare',
    dbCategory: 'PRODUK KEWANITAAN DAN KECANTIKAN',
    dbCategories: ['PRODUK KEWANITAAN DAN KECANTIKAN'],
  },
  {
    slug: 'obat-maag-lambung',
    name: 'Obat Maag / Lambung',
    dbCategory: 'OBAT MAAG / ASAM LAMBUNG',
    dbCategories: ['OBAT MAAG / ASAM LAMBUNG'],
  },
  {
    slug: 'obat-diare-sakit-perut',
    name: 'Obat Diare / Sakit Perut',
    dbCategory: 'OBAT DIARE/SAKIT PERUT',
    dbCategories: ['OBAT DIARE/SAKIT PERUT'],
  },
  {
    slug: 'p3k-perlengkapan-kesehatan',
    name: 'P3K & Perlengkapan Kesehatan',
    dbCategory: 'P3K',
    dbCategories: ['ALAT KESEHATAN DAN P3K', 'P3K'],
  },
  {
    slug: 'obat-ambeien-wasir',
    name: 'Obat Ambeien (Wasir)',
    dbCategory: 'OBAT AMBEIEN (WASIR)',
    dbCategories: ['OBAT AMBEIEN', 'WASIR'],
  },
  {
    slug: 'obat-gosok-oles',
    name: 'Obat Gosok Dan Obat Oles',
    dbCategory: 'MINYAK URUT DAN MINYAK GOSOK',
    dbCategories: [
      'MINYAK URUT DAN MINYAK GOSOK',
      'BALSEM DAN KRIM',
      'MINYAKGOSOK/BALSEM',
      'OBAT DEMAM, PEGAL, NYERI OTOT DAN SENDI',
    ],
  },
  {
    slug: 'vitamin-suplemen-anak-bayi',
    name: 'Vitamin/Suplemen Anak/Bayi',
    dbCategory: 'SUPLEMEN DAN VITAMIN ANAK',
    dbCategories: ['SUPLEMEN DAN VITAMIN ANAK'],
  },
  {
    slug: 'anak-dan-bayi',
    name: 'Anak Dan Bayi',
    dbCategory: 'IBU, ANAK DAN BAYI',
    dbCategories: ['IBU, ANAK DAN BAYI', 'OBAT DEMAM ANAK, BATUK DAN FLU ANAK/BAYI', 'SUPLEMEN DAN VITAMIN ANAK'],
  },
  {
    slug: 'produk-18-kondom-pil-kb',
    name: 'Produk 18+ (Kondom & Pil KB)',
    dbCategory: 'PRODUK DEWASA (18+)',
    dbCategories: ['PRODUK DEWASA (18+)'],
  },
  {
    slug: 'herbal-jamu-madu',
    name: 'Herbal (Jamu, Madu, Dan Lainnya)',
    dbCategory: 'HERBAL / JAMU',
    dbCategories: ['HERBAL / JAMU', 'HERBAL'],
  },
  {
    slug: 'ibu-hamil-menyusui',
    name: 'Ibu Hamil Dan Menyusui',
    dbCategory: 'IBU HAMIL DAN MENYUSUI',
    dbCategories: ['IBU HAMIL DAN MENYUSUI'],
  },
  {
    slug: 'perawatan-rambut',
    name: 'Perawatan Rambut',
    dbCategory: 'PERAWATAN RAMBUT',
    dbCategories: ['PERAWATAN RAMBUT'],
  },
  {
    slug: 'obat-sembelit-susah-bab',
    name: 'Obat Sembelit / Susah BAB',
    dbCategory: 'OBAT SEMBELLIT / KONSTIPASI',
    dbCategories: ['OBAT SEMBELLIT / KONSTIPASI'],
  },
  {
    slug: 'hewan-peliharaan',
    name: 'Hewan Peliharaan',
    dbCategory: 'HEWAN PELIHARAAN',
    dbCategories: ['HEWAN PELIHARAAN'],
  },
  {
    slug: 'lain-lain',
    name: 'Lain-Lain',
    dbCategory: 'LAIN LAIN',
    dbCategories: ['LAIN LAIN', 'MAKANAN'],
  },
];

/** Cari CategoryInfo lengkap berdasarkan slug URL (case-insensitive) */
export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  const normalizedSlug = slug.toLowerCase().trim();
  return categories.find((c) => c.slug.toLowerCase() === normalizedSlug);
}

/** Cari nama kategori ramah-pengguna dari slug URL. Mengembalikan null jika slug tidak dikenal. */
export function getCategoryNameBySlug(slug: string): string | null {
  return getCategoryBySlug(slug)?.name ?? null;
}

/**
 * Dapatkan string pencarian kategori untuk query database Supabase.
 * - Jika slug terdaftar, mengembalikan dbCategory (misal: "PERAWATAN RAMBUT").
 * - Jika slug tidak terdaftar secara eksplisit, mengonversi slug ke format huruf kapital
 *   (misal: "perawatan-rambut" -> "PERAWATAN RAMBUT", "obat-batuk" -> "OBAT BATUK").
 */
export function getCategoryDbName(slug: string): string {
  const cat = getCategoryBySlug(slug);
  if (cat?.dbCategory) {
    return cat.dbCategory;
  }
  return decodeURIComponent(slug).replace(/-/g, ' ').toUpperCase().trim();
}

/** Cari slug dari nama kategori (case-insensitive). Mengembalikan null jika nama tidak dikenal. */
export function getSlugByCategoryName(name: string): string | null {
  const normalized = name.toLowerCase().trim();
  return (
    categories.find(
      (c) =>
        c.name.toLowerCase() === normalized ||
        c.dbCategory?.toLowerCase() === normalized ||
        c.dbCategories?.some((db) => db.toLowerCase() === normalized)
    )?.slug ?? null
  );
}
