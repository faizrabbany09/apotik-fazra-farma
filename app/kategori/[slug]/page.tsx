

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Helper to convert slug to Title Case
const formatTitle = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Dummy product data (8 items)
const dummyProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Produk ${i + 1}`,
  price: (i + 1) * 10000,
}));

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = formatTitle(resolvedParams.slug);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Back to categories */}
      <div className="mb-4">
        <Link
          href="/kategori"
          className="inline-flex items-center gap-1 text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Kembali ke Kategori
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-6">{title}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col"
          >
            {/* Image placeholder */}
            <div className="bg-slate-100 aspect-square rounded-t-xl" />
            {/* Info */}
            <div className="p-3 flex flex-col flex-1">
              <h2 className="font-semibold text-slate-800 mb-1">{product.name}</h2>
              <p className="text-emerald-600 font-bold mb-2">Rp {product.price.toLocaleString()}</p>
              <button className="mt-auto w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-b-xl transition-colors">
                Tambah
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
