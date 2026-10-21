import Link from 'next/link';
import { ArrowLeft, PackageSearch } from 'lucide-react';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { createServerClient } from '@/lib/supabase/server';
import {
  getCategoryBySlug,
  getCategoryNameBySlug,
  getCategoryDbName,
} from '@/lib/categories';

/* ═══════════════════════════════════════════════════════════════════════════════
   HALAMAN KATEGORI [SLUG] — Menampilkan produk dari Supabase
   ─────────────────────────────────────────────────────────────────────────────
   • Server Component (async) — data di-fetch di sisi server
   • Query tabel "produk" difilter berdasarkan kolom "kategori"
   • Pencarian case-insensitive & fleksibel menggunakan .ilike()
   • Mendeteksi format huruf kapital di Supabase (misal: "PERAWATAN RAMBUT")
   • Dilengkapi logging console.log(data) di sisi server untuk kemudahan debug
 ═══════════════════════════════════════════════════════════════════════════════ */

// Tipe baris dari tabel "produk" di Supabase
interface ProdukRow {
  id: string;
  nama: string;
  kategori: string;
  harga: number;
  stock: number;
}

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. Pemetaan slug URL ke nama kategori tampilan dan nama kategori database
  const categoryInfo = getCategoryBySlug(slug);
  const categoryName = categoryInfo?.name ?? getCategoryNameBySlug(slug);

  // Judul ramah pengguna untuk UI (misal: "Perawatan Rambut", "Obat Untuk Usia Dewasa")
  const title =
    categoryName ??
    decodeURIComponent(slug)
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  // Format nama kategori untuk pencarian di database Supabase (biasanya huruf kapital semua)
  // Contoh: slug "perawatan-rambut" -> "PERAWATAN RAMBUT"
  const namaKategori = getCategoryDbName(slug);

  console.log('───────────────────────────────────────────────────────');
  console.log('[Kategori Debug] URL Slug Diterima        :', slug);
  console.log('[Kategori Debug] Judul Kategori (UI)     :', title);
  console.log('[Kategori Debug] Target Kategori (DB)    :', namaKategori);

  // 2. Fetch produk dari Supabase
  let products: ProdukRow[] = [];
  let fetchError: string | null = null;

  try {
    const supabase = createServerClient();

    let query = supabase
      .from('produk')
      .select('id, nama, kategori, harga, stock')
      .order('nama', { ascending: true });

    // Jika kategori memiliki beberapa variasi nama di Supabase (misal Obat Keras & Obat Keras Sirup)
    if (categoryInfo?.dbCategories && categoryInfo.dbCategories.length > 1) {
      query = query.in('kategori', categoryInfo.dbCategories);
    } else {
      // Query fleksibel dan case-insensitive menggunakan .ilike('kategori', `%${namaKategori}%`)
      query = query.ilike('kategori', `%${namaKategori}%`);
    }

    const { data, error } = await query;

    // Logging data hasil fetch dari Supabase ke terminal untuk debugging
    console.log('[Kategori Debug] Data dari Supabase       :', data);
    console.log('[Kategori Debug] Jumlah Produk Dikembalikan:', data ? data.length : 0);
    if (error) {
      console.error('[Kategori Debug] Error dari Supabase     :', error);
    }
    console.log('───────────────────────────────────────────────────────');

    if (error) {
      console.error('[Supabase] Gagal fetch produk:', error.message);
      fetchError = error.message;
    } else {
      products = data ?? [];
    }
  } catch (err) {
    console.error('[Supabase] Exception saat fetch produk:', err);
    fetchError = 'Gagal menghubungi server database.';
  }

  // 3. Map data Supabase → format yang dipakai ProductGrid / ProductCard
  const mappedProducts = products.map((item) => ({
    id: item.id,
    name: item.nama,
    price: item.harga,
    category: item.kategori,
    // Tandai sebagai resep jika kategori mengandung "Obat Khusus" atau "Obat Keras"
    isPrescription:
      item.kategori.toUpperCase().includes('KERAS') ||
      item.kategori.toUpperCase().includes('KHUSUS'),
  }));

  return (
    <section className="flex-1 flex-grow space-y-6 pb-8">
      {/* Back to categories */}
      <div>
        <Link
          href="/kategori"
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Kembali ke Kategori
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          {mappedProducts.length > 0
            ? `Menampilkan ${mappedProducts.length} produk dalam kategori ${title}`
            : `Menampilkan obat & produk kesehatan dalam kategori ${title}`}
        </p>
      </div>

      {/* Error State */}
      {fetchError && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-700">
          <p className="font-semibold mb-1">Gagal Memuat Produk</p>
          <p className="text-xs text-rose-500">{fetchError}</p>
        </div>
      )}

      {/* Empty State */}
      {!fetchError && mappedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <PackageSearch className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-base font-bold text-slate-700 mb-1">
            Belum Ada Produk
          </h3>
          <p className="text-sm text-slate-400 max-w-xs">
            Produk untuk kategori <span className="font-semibold">{title}</span> belum tersedia saat ini. Silakan cek kembali nanti.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {mappedProducts.length > 0 && (
        <ProductGrid products={mappedProducts} />
      )}
    </section>
  );
}
