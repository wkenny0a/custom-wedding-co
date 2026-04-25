import { Suspense } from 'react';
import { Metadata } from 'next';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';

export const metadata: Metadata = {
  title: 'Order Confirmed! | Custom Wedding Co.',
  description: 'Thank you for your order.',
};

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🎁</div>
          <p className="font-serif text-2xl text-espresso">Confirming your order…</p>
        </div>
      </div>
    }>
      <OrderConfirmation />
    </Suspense>
  );
}
