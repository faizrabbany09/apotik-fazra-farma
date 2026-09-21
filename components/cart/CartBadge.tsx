"use client";

import { useCart } from '@/context/CartContext';

interface CartBadgeProps {
  className?: string;
}

export function CartBadge({ className }: CartBadgeProps) {
  const { totalCount, isLoaded } = useCart();

  if (!isLoaded || totalCount === 0) {
    return null;
  }

  return (
    <span
      className={
        className ||
        "absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-in zoom-in-75 duration-200"
      }
    >
      {totalCount > 99 ? '99+' : totalCount}
    </span>
  );
}

export function MobileCartBadge() {
  const { totalCount, isLoaded } = useCart();

  if (!isLoaded || totalCount === 0) {
    return null;
  }

  return (
    <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-75 duration-200">
      {totalCount > 99 ? '99+' : totalCount}
    </span>
  );
}
