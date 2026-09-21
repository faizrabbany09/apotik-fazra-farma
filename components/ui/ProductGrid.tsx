"use client";

import { useCart } from '@/context/CartContext';
import { ProductCard, ProductCardProps } from '@/components/ui/ProductCard';

interface ProductGridProps {
  products: Omit<ProductCardProps, 'onAddToCart'>[];
}

/**
 * ProductGrid – Client Component tipis yang menghubungkan ProductCard
 * (yang murni presentational) ke CartContext global.
 *
 * Server Component cukup melempar array produk ke sini;
 * logika cart tetap di sisi client tanpa mencemari Server Component.
 */
export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={(e, p) => {
            e.preventDefault();
            addItem({
              id: String(p.id),
              name: p.name,
              price: p.price,
              imageUrl: p.imageUrl ?? null,
              category: p.category,
              isPrescription: p.isPrescription,
              quantity: 1,
            });
          }}
        />
      ))}
    </div>
  );
}
