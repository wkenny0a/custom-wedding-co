'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';

export default function CheckoutPage() {
  const { cart, isLoading } = useCart();
  const router = useRouter();

  // Guard: redirect to shop if cart is empty
  useEffect(() => {
    if (!isLoading && (!cart?.items || cart.items.length === 0)) {
      router.replace('/shop');
    }
  }, [cart, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin h-8 w-8 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="font-serif text-lg text-espresso/60">Loading your order…</p>
      </div>
    );
  }

  if (!cart?.items || cart.items.length === 0) {
    return null; // will redirect via useEffect
  }

  return <CheckoutFlow />;
}
