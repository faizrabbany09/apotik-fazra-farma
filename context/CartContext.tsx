"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  imageUrl?: string | null;
  isPrescription?: boolean;
}

interface CartContextType {
  items: CartItem[];
  /** Tambah atau update qty item di keranjang */
  addItem: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  /** Update qty dengan delta (+1 / -1). Jika qty <= 0 item dihapus. */
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  /** true setelah localStorage selesai di-load (aman untuk render) */
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Mulai dengan array kosong – data asli akan di-load dari localStorage
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart dari localStorage saat pertama mount (hydration safe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fazra_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('[CartContext] Gagal membaca keranjang dari localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Simpan ke localStorage setiap kali items berubah (setelah hydration)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('fazra_cart', JSON.stringify(items));
      } catch (e) {
        console.error('[CartContext] Gagal menyimpan keranjang ke localStorage:', e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qtyToAdd = Math.max(1, product.quantity ?? 1);
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => String(item.id) === String(product.id));
      if (existingIndex > -1) {
        // Produk sudah ada → tambah qty saja
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      // Produk baru → tambahkan ke list
      return [
        ...prev,
        {
          ...product,
          id: String(product.id),
          quantity: qtyToAdd,
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (String(item.id) === String(id)) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        // Hapus otomatis jika qty sampai 0 atau kurang
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        subtotal,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart harus digunakan di dalam CartProvider');
  }
  return context;
}
