'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from './CheckoutProvider';
import { useCart } from '@/context/CartContext';
import swell from '@/lib/swell';

export default function PaymentForm() {
  const { step, setStep, submitOrder, contact, address } = useCheckout();
  const { cart } = useCart();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cardStatus, setCardStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const isLocked = step < 4;

  const log = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString();
    console.log(`[CWC Pay ${ts}] ${msg}`);
    setDebugLog(prev => [...prev, `${ts} ${msg}`]);
    // Also set document title for easy screenshot reading
    if (typeof document !== 'undefined') {
      document.title = `[PAY] ${msg.substring(0, 80)}`;
    }
  }, []);

  // Mount Stripe card element when step reaches 4
  useEffect(() => {
    if (step !== 4) return;

    if (cardStatus === 'idle') {
      setCardStatus('loading');
      log('Step 4 reached, starting mount...');

      const mountCard = async () => {
        try {
          // 1. Verify swell object
          log(`swell type: ${typeof swell}`);
          log(`swell.payment type: ${typeof (swell as any).payment}`);
          log(`createElements type: ${typeof (swell as any).payment?.createElements}`);

          if (!(swell as any).payment?.createElements) {
            throw new Error('swell.payment.createElements is not available');
          }

          // 2. Check payment settings
          log('Fetching payment settings...');
          try {
            const ps = await (swell as any).settings.payments();
            log(`Settings card: ${JSON.stringify(ps?.card || 'NO_CARD')}`);
          } catch (settingsErr: any) {
            log(`Settings fetch error: ${settingsErr?.message}`);
          }

          // 3. Check cart state
          log('Checking cart...');
          try {
            const c = await swell.cart.get();
            log(`Cart: id=${(c as any)?.id?.substring(0,8)}, items=${(c as any)?.items?.length || 0}`);
          } catch (cartErr: any) {
            log(`Cart error: ${cartErr?.message}`);
          }

          // 4. Check DOM container
          const container = document.getElementById('card-element-container');
          log(`DOM #card-element-container: ${container ? 'FOUND' : 'NOT FOUND'}`);
          if (!container) {
            throw new Error('Container #card-element-container not in DOM');
          }

          // 5. Call createElements
          log('Calling swell.payment.createElements...');
          await (swell as any).payment.createElements({
            card: {
              elementId: '#card-element-container',
              options: {
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
              },
              onReady: () => {
                log('✅ Stripe card onReady fired!');
                setCardStatus('ready');
              },
              onError: (err: any) => {
                log(`❌ Stripe card onError: ${err?.message || JSON.stringify(err)}`);
                setErrorMsg(err?.message || 'Card input error.');
              },
            },
          });

          log('createElements resolved successfully');
          setCardStatus(prev => prev === 'loading' ? 'ready' : prev);
        } catch (e: any) {
          log(`❌ MOUNT EXCEPTION: ${e?.message}`);
          log(`Stack: ${e?.stack?.substring(0, 200)}`);
          setCardStatus('error');
          setErrorMsg(e?.message || 'Credit card input could not be loaded.');
        }
      };

      // Delay to ensure DOM container is rendered
      const timer = setTimeout(mountCard, 600);
      return () => clearTimeout(timer);
    }
  }, [step, cardStatus, log]);

  // Reset mount flags if user navigates away from step 4
  useEffect(() => {
    if (step < 4) {
      setCardStatus('idle');
      setErrorMsg('');
      setDebugLog([]);
    }
  }, [step]);

  // Tokenize and submit order
  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardStatus !== 'ready') return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Set billing address on cart
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

      // Tokenize
      await (swell as any).payment.tokenize({
        card: {
          onError: (err: any) => {
            console.error('Tokenize error:', err);
            setErrorMsg(err?.message || 'Payment failed. Please check your card details.');
            setIsSubmitting(false);
          },
          onSuccess: async () => {
            try {
              const orderId = await submitOrder();
              if (orderId) {
                router.push(`/checkout/success?order_id=${orderId}`);
              } else {
                setErrorMsg('Order could not be placed.');
                setIsSubmitting(false);
              }
            } catch (orderErr: any) {
              setErrorMsg(orderErr?.message || 'Order submission failed.');
              setIsSubmitting(false);
            }
          },
        },
      });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Payment failed.');
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
              {cardStatus === 'loading' && (
                <div className="w-full h-[44px] bg-gray-100 rounded animate-pulse flex items-center justify-center text-xs text-gray-400">
                  Loading payment form...
                </div>
              )}
              {cardStatus === 'error' && (
                <p className="text-red-500 text-xs">Could not load card input. See debug log below.</p>
              )}
              <div id="card-element-container" className={`min-h-[44px] ${cardStatus === 'loading' ? 'hidden' : 'block'}`} />
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
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm font-sans text-red-700">
              ⚠ {errorMsg}
            </div>
          )}

          {/* Debug log - ALWAYS VISIBLE for debugging */}
          {debugLog.length > 0 && (
            <div className="bg-gray-900 text-green-400 px-4 py-3 text-xs font-mono max-h-48 overflow-auto rounded-lg border-2 border-yellow-400">
              <p className="text-yellow-300 font-bold mb-1">DEBUG LOG ({debugLog.length} entries):</p>
              {debugLog.map((line, i) => (
                <div key={i} className={line.includes('❌') ? 'text-red-400 font-bold' : line.includes('✅') ? 'text-green-300 font-bold' : ''}>{line}</div>
              ))}
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
