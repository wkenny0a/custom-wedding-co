'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from './CheckoutProvider';
import { useCart } from '@/context/CartContext';
import swell from '@/lib/swell';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Cache the promise so we don't recreate it
let stripePromiseCache: any = null;

function Spinner() {
  return (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

// Separate component that uses Stripe hooks
function PaymentFormContent() {
  const { step, setStep, submitOrder, contact, address } = useCheckout();
  const { cart } = useCart();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const isLocked = step < 4;

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not loaded');
      }

      // Generate token using Stripe JS
      const { error, token } = await stripe.createToken(cardElement, {
        name: `${contact.firstName} ${contact.lastName}`,
        address_line1: address?.address1,
        address_city: address?.city,
        address_state: address?.state,
        address_zip: address?.zip,
        address_country: address?.country,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!token) {
        throw new Error('Could not securely tokenize card.');
      }

      // Pass the token to Swell
      await swell.cart.update({
        billing: {
          method: 'card',
          card: {
            token: token.id
          },
          ...(sameAsShipping && address ? {
            name: `${contact.firstName} ${contact.lastName}`,
            address1: address.address1,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
          } : {})
        }
      } as any);

      // Submit the order
      const orderId = await submitOrder();
      if (orderId) {
        router.push(`/checkout/success?order_id=${orderId}`);
      } else {
        throw new Error('Order could not be placed.');
      }
    } catch (err: any) {
      console.error('Payment failed:', err);
      setErrorMsg(err?.message || 'Payment failed. Please check your card details.');
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

          {/* Review summary */}
          <div className="bg-cream/40 border border-gold-pale/20 rounded-xl px-5 py-4 text-sm font-sans text-espresso/70 space-y-1.5">
            <p className="font-semibold text-espresso text-xs uppercase tracking-wider mb-2">Review Before Paying</p>
            <p>📧 {contact.email}</p>
            <p>💳 Payments are processed securely with Stripe</p>
            <p>✦ Order confirmation will be emailed immediately after</p>
          </div>

          {/* Credit Card Zone */}
          <form onSubmit={handleCardSubmit} className="space-y-4">
            <div className="bg-white border border-gold-pale/40 rounded-lg p-4">
              <div className="min-h-[44px] flex flex-col justify-center">
                <CardElement 
                  options={{
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '16px',
                        color: '#3B2F2F',
                        '::placeholder': { color: '#3B2F2F66' },
                      },
                      invalid: { color: '#dc2626' },
                    },
                  }}
                />
              </div>
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

            <button
              type="submit"
              disabled={isSubmitting || !stripe || !elements}
              className={`w-full py-4 font-sans text-sm uppercase tracking-widest transition-all duration-300 rounded-lg flex items-center justify-center gap-2 ${
                (isSubmitting || !stripe || !elements)
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

export default function PaymentForm() {
  const { step } = useCheckout();
  const [stripePromise, setStripePromise] = useState<any>(null);

  useEffect(() => {
    if (step >= 4 && !stripePromiseCache) {
      // Fetch public key securely
      const auth = btoa(process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY + ':');
      fetch('https://customweddingco.swell.store/api/settings/payments', {
        headers: { 'Authorization': `Basic ${auth}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data?.card?.publishable_key) {
          stripePromiseCache = loadStripe(data.card.publishable_key);
          setStripePromise(stripePromiseCache);
        }
      })
      .catch(err => {
        console.error('Failed to load Stripe configuration:', err);
      });
    } else if (stripePromiseCache && !stripePromise) {
      setStripePromise(stripePromiseCache);
    }
  }, [step, stripePromise]);

  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent />
    </Elements>
  );
}
