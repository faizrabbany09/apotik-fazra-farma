import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductGrid } from '@/components/ui/ProductGrid';

// Helper to convert slug to Title Case
const formatTitle = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Dummy product data (8 items) – akan diganti dengan fetch Supabase
const dummyProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  name: `Produk Kesehatan ${i + 1}`,
  price: (i + 1) * 12500,
  category: i % 3 === 0 ? 'Obat Keras' : i % 2 === 0 ? 'Obat Bebas Terbatas' : 'Obat Bebas',
  isPrescription: i % 3 === 0,
}));

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = formatTitle(resolvedParams.slug);

  return (
    <section className="space-y-6 pb-12">
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
          Menampilkan obat &amp; produk kesehatan dalam kategori {title}
        </p>
      </div>

      {/* ProductGrid menghubungkan CartContext ke setiap ProductCard */}
      <ProductGrid products={dummyProducts} />
    </section>
  );
}
