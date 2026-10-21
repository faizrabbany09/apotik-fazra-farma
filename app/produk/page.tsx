import Link from 'next/link';
import { ArrowLeft, PackageSearch } from 'lucide-react';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { createServerClient } from '@/lib/supabase/server';

/* ═══════════════════════════════════════════════════════════════════════════════
   HALAMAN KATALOG & HASIL PENCARIAN PRODUK — Apotek Fazra Farma
   ─────────────────────────────────────────────────────────────────────────────
   • Server Component (async) — data langsung di-fetch dari Supabase
   • Menangkap query parameter URL (?q=... atau ?search=...)
   • Query Supabase case-insensitive menggunakan method .ilike()
   • Mencari obat berdasarkan kolom "nama" dan kolom "kategori" di database
   • Menggunakan komponen ProductGrid & ProductCard resmi dengan integrasi cart
   • Logging console.log(data) di sisi server untuk kemudahan debugging
 ═══════════════════════════════════════════════════════════════════════════════ */

interface ProdukRow {
  id: string;
  nama: string;
  kategori: string;
  harga: number;
  stock: number;
}

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const rawQuery = (resolvedParams.q || resolvedParams.search || '').trim();
  const cleanKeyword = rawQuery.replace(/[,()]/g, ' ').trim();

  console.log('───────────────────────────────────────────────────────');
  console.log('[Search Debug] Kata Kunci Pencarian Diterima:', rawQuery || '(Semua Produk)');

  let products: ProdukRow[] = [];
  let fetchError: string | null = null;

  try {
    const supabase = createServerClient();

    let query = supabase
      .from('produk')
      .select('id, nama, kategori, harga, stock')
      .order('nama', { ascending: true });

    if (cleanKeyword) {
      // Pencarian fleksibel & case-insensitive dengan .ilike()
      // Mencari pada kolom 'nama' dan kolom 'kategori'
      query = query.or(`nama.ilike.%${cleanKeyword}%,kategori.ilike.%${cleanKeyword}%`);
    } else {
      // Jika tanpa kata kunci pencarian, tampilkan hingga 100 produk katalog awal
      query = query.limit(100);
    }

    const { data, error } = await query;

    console.log('[Search Debug] Data dari Supabase         :', data);
    console.log('[Search Debug] Total Produk Dikembalikan  :', data ? data.length : 0);
    if (error) {
      console.error('[Search Debug] Error dari Supabase       :', error);
    }
    console.log('───────────────────────────────────────────────────────');

    if (error) {
      console.error('[Supabase] Gagal mencari produk:', error.message);
      fetchError = error.message;
    } else {
      products = data ?? [];
    }
  } catch (err) {
    console.error('[Supabase] Exception saat mencari produk:', err);
    fetchError = 'Gagal menghubungi server database.';
  }

  // Map data Supabase ke format ProductGrid / ProductCard
  const mappedProducts = products.map((item) => ({
    id: item.id,
    name: item.nama,
    price: item.harga,
    category: item.kategori,
    isPrescription:
      item.kategori.toUpperCase().includes('KERAS') ||
      item.kategori.toUpperCase().includes('KHUSUS'),
  }));

  const hasSearch = Boolean(rawQuery);

  return (
    <section className="flex-1 flex-grow space-y-6 pb-8">
      {/* Header Navigasi & Judul */}
      <div>
        <Link
          href="/kategori"
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Kembali ke Kategori
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {hasSearch ? `Hasil Pencarian: "${rawQuery}"` : 'Katalog Produk Kesehatan'}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              {hasSearch
                ? `Ditemukan ${mappedProducts.length} produk yang sesuai dengan kata kunci "${rawQuery}"`
                : `Menampilkan seluruh katalog obat dan vitamin resmi Apotek Fazra Farma (${mappedProducts.length} produk)`}
            </p>
          </div>
          {hasSearch && (
            <Link
              href="/produk"
              prefetch={false}
              className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Hapus Filter Pencarian
            </Link>
          )}
        </div>
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
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center justify-center shadow-xs my-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <PackageSearch className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-base font-bold text-slate-800 mb-1">
            Produk Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
            {hasSearch ? (
              <>
                Maaf, tidak ada produk yang cocok dengan kata kunci{' '}
                <span className="font-semibold text-slate-700">&quot;{rawQuery}&quot;</span>.
                Pastikan ejaan benar atau gunakan kata kunci yang lebih umum.
              </>
            ) : (
              'Belum ada produk yang tersedia di katalog saat ini.'
            )}
          </p>
          {hasSearch && (
            <Link
              href="/produk"
              prefetch={false}
              className="px-5 py-2.5 bg-[#0A7A4F] hover:bg-[#063D2A] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm shadow-[#0A7A4F]/20 cursor-pointer"
            >
              Tampilkan Semua Produk
            </Link>
          )}
        </div>
      )}

      {/* Product Grid */}
      {mappedProducts.length > 0 && (
        <ProductGrid products={mappedProducts} />
      )}
    </section>
  );
}
