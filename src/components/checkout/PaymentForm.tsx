'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from './CheckoutProvider';
import { useCart } from '@/context/CartContext';
import swell from '@/lib/swell';

export default function PaymentForm() {
  const { step, setStep, submitOrder, contact, address } = useCheckout();
  const { cart } = useCart();
  const router = useRouter();

  const cardElementRef = useRef<any>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cardStatus, setCardStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const isLocked = step < 4;

  // Mount payment elements when step reaches 4
  useEffect(() => {
    if (step !== 4) return;

    if (cardStatus === 'idle') {
      setCardStatus('loading');
      const mountCard = async () => {
        try {
          cardElementRef.current = await (swell as any).payment.createElements({
            elementType: 'card',
            elementId: '#card-element-container',
          });
          setCardStatus('ready');
        } catch (e: any) {
          console.error('Card Elements mount failed:', e);
          setCardStatus('error');
          setErrorMsg('Credit card input could not be loaded. Please refresh and try again.');
        }
      };
      
      const timer = setTimeout(mountCard, 150);
      return () => clearTimeout(timer);
    }
  }, [step, cardStatus]);

  // Reset mount flags if user navigates away from step 4
  useEffect(() => {
    if (step < 4) {
      setCardStatus('idle');
      cardElementRef.current = null;
      setErrorMsg('');
    }
  }, [step]);

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardElementRef.current || cardStatus !== 'ready') return;
    
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      // Address object for billing
      if (sameAsShipping && address) {
        await swell.cart.update({
          billing: {
            name: `${contact.firstName} ${contact.lastName}`,
            address1: address.address1,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
          }
        } as any);
      }

      // Tokenize card
      await swell.payment.tokenize({
        card: cardElementRef.current,
      });
      
      // Submit order
      const orderId = await submitOrder();
      if (orderId) {
        router.push(`/checkout/success?order_id=${orderId}`);
      } else {
        setErrorMsg('Order could not be placed. Please try again.');
      }
    } catch (err: any) {
      console.error('Card payment error:', err);
      setErrorMsg(err?.message || 'Payment failed. Please check your card details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl overflow-hidden transition-opacity duration-300 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gold-pale/20">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-colors ${isLocked ? 'bg-cream-dark text-gray-400' : 'bg-gold text-white'}`}>
          4
        </div>
        <h2 className="font-serif text-xl text-espresso">Payment</h2>
        <div className="ml-auto flex items-center gap-2 text-[10px] font-sans uppercase tracking-wider text-espresso/40">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secured by Stripe
        </div>
      </div>

      {step === 4 && (
        <div className="px-6 py-6 space-y-6">

          {/* Review summary before payment */}
          <div className="bg-cream/40 border border-gold-pale/20 rounded-xl px-5 py-4 text-sm font-sans text-espresso/70 space-y-1.5">
            <p className="font-semibold text-espresso text-xs uppercase tracking-wider mb-2">Review Before Paying</p>
            <p>📧 {contact.email}</p>
            <p>💳 Payments are processed securely with Stripe</p>
            <p>✦ Order confirmation will be emailed immediately after</p>
          </div>

          {/* Credit Card Zone */}
          <form onSubmit={handleCardSubmit} className="space-y-4">
            <div className="bg-white border border-gold-pale/40 rounded-lg p-4">
              {cardStatus === 'loading' && (
                <div className="w-full h-[20px] bg-gray-100 rounded animate-pulse" />
              )}
              {cardStatus === 'error' && (
                <p className="text-red-500 text-xs">Could not load card input. Please refresh or try another method.</p>
              )}
              <div id="card-element-container" className={`min-h-[20px] ${cardStatus === 'loading' ? 'hidden' : 'block'}`} />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="same-billing"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
                className="accent-gold w-4 h-4 rounded border-gold-pale/40"
              />
              <label htmlFor="same-billing" className="text-xs font-sans text-espresso/70 cursor-pointer">
                Billing address is same as shipping
              </label>
            </div>

            {!sameAsShipping && (
              <div className="text-xs text-espresso/60 italic px-2">
                (Billing address updates will be prompted by your bank if needed, or matched automatically.)
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || cardStatus !== 'ready'}
              className={`w-full py-4 font-sans text-sm uppercase tracking-widest transition-all duration-300 rounded-lg flex items-center justify-center gap-2 ${
                (isSubmitting || cardStatus !== 'ready')
                  ? 'bg-espresso/40 text-cream/60 cursor-not-allowed'
                  : 'bg-espresso text-cream hover:bg-espresso-light shadow-sm hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? <><Spinner /> Processing…</> : 'Pay & Place Order'}
            </button>
          </form>

          {/* Trust line */}
          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex items-center gap-3 text-[10px] font-sans text-espresso/40 uppercase tracking-wider">
              <span>🔒 256-bit SSL Encrypted</span>
              <span>·</span>
              <span>💳 Powered by Stripe</span>
              <span>·</span>
              <span>✦ Safe & Secure Checkout</span>
            </div>
            <p className="text-[10px] font-sans text-espresso/30 text-center max-w-xs">
              Your payment is processed through Stripe's secure infrastructure. Your full card details are never saved on our servers.
            </p>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm font-sans text-red-700">
              ⚠ {errorMsg}
            </div>
          )}

          {/* Back button */}
          <div className="pt-2 border-t border-gold-pale/20">
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={isSubmitting}
              className="text-sm font-sans text-espresso/50 hover:text-espresso transition-colors uppercase tracking-wider"
            >
              ← Back to Shipping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
