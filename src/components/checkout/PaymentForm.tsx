'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from './CheckoutProvider';
import { useCart } from '@/context/CartContext';
import swell from '@/lib/swell';

export default function PaymentForm() {
  const { step, setStep, submitOrder, isWorking, contact } = useCheckout();
  const { cart } = useCart();
  const router = useRouter();

  const paypalMountedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paypalStatus, setPaypalStatus] = useState<'idle' | 'loading' | 'ready' | 'approved' | 'error'>('idle');

  const isLocked = step < 4;

  // Mount PayPal button when step reaches 4
  useEffect(() => {
    if (step !== 4 || paypalMountedRef.current) return;
    paypalMountedRef.current = true;
    setPaypalStatus('loading');

    const mountPayPal = async () => {
      try {
        // swell.payment.createElements() renders a PayPal button into #paypal-button-container
        await (swell as any).payment.createElements({
          elementType: 'paypal',
          elementId: 'paypal-button-container',
          onSuccess: async (result: any) => {
            // Called after user approves in PayPal popup
            setPaypalStatus('approved');
            setIsSubmitting(true);
            try {
              // Update billing with PayPal result
              await swell.cart.update({ billing: { paypal: result } } as any);
              // Submit the order
              const orderId = await submitOrder();
              if (orderId) {
                router.push(`/checkout/success?order_id=${orderId}`);
              } else {
                setErrorMsg('Order could not be placed. Please try again.');
                setPaypalStatus('error');
              }
            } catch (err: any) {
              setErrorMsg(err?.message || 'Something went wrong. Please try again.');
              setPaypalStatus('error');
            } finally {
              setIsSubmitting(false);
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            setErrorMsg(err?.message || 'PayPal encountered an error. Please try again.');
            setPaypalStatus('error');
          },
          onCancel: () => {
            setPaypalStatus('ready');
            setErrorMsg('');
          },
        });
        setPaypalStatus('ready');
      } catch (e: any) {
        console.error('PayPal Elements mount failed:', e);
        setPaypalStatus('error');
        setErrorMsg('PayPal could not be loaded. Please use the fallback checkout link below.');
      }
    };

    // Small delay to ensure DOM node #paypal-button-container is rendered
    const timer = setTimeout(mountPayPal, 150);
    return () => clearTimeout(timer);
  }, [step, submitOrder, router]);

  // Reset mount flag if user navigates away from step 4 and comes back
  useEffect(() => {
    if (step < 4) {
      paypalMountedRef.current = false;
      setPaypalStatus('idle');
      setErrorMsg('');
    }
  }, [step]);

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
          Secured by PayPal
        </div>
      </div>

      {step === 4 && (
        <div className="px-6 py-6 space-y-6">

          {/* Review summary before payment */}
          <div className="bg-cream/40 border border-gold-pale/20 rounded-xl px-5 py-4 text-sm font-sans text-espresso/70 space-y-1.5">
            <p className="font-semibold text-espresso text-xs uppercase tracking-wider mb-2">Review Before Paying</p>
            <p>📧 {contact.email}</p>
            <p>💳 You'll be redirected to PayPal to complete payment securely</p>
            <p>✦ Order confirmation will be emailed immediately after</p>
          </div>

          {/* PayPal Button Zone */}
          <div>
            <p className="text-xs font-sans uppercase tracking-widest text-espresso/50 mb-3 text-center">
              Click below to pay securely with PayPal
            </p>

            {/* Loading skeleton */}
            {paypalStatus === 'loading' && (
              <div className="w-full h-[50px] bg-[#0070ba]/10 rounded-lg flex items-center justify-center gap-2 animate-pulse">
                <Spinner />
                <span className="text-sm font-sans text-[#0070ba]/60">Loading PayPal…</span>
              </div>
            )}

            {/* Approved state */}
            {paypalStatus === 'approved' && (
              <div className="w-full h-[50px] bg-green-50 border border-green-200 rounded-lg flex items-center justify-center gap-2">
                <span className="text-green-700 font-sans text-sm font-semibold">
                  ✓ PayPal Approved — Placing Your Order…
                </span>
                <Spinner />
              </div>
            )}

            {/* PayPal button container — Swell mounts here */}
            <div
              id="paypal-button-container"
              className={`w-full min-h-[50px] rounded-lg overflow-hidden transition-opacity duration-300 ${(paypalStatus === 'loading' || paypalStatus === 'approved') ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
            />

            {/* Fallback if PayPal button fails to mount */}
            {paypalStatus === 'error' && (
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm font-sans text-amber-800">
                  ⚠ PayPal button could not load in this environment.
                </div>
                {cart?.checkoutUrl && (
                  <a
                    href={cart.checkoutUrl}
                    className="w-full block bg-[#0070ba] text-white font-sans font-bold text-sm py-4 rounded-lg text-center hover:bg-[#005ea6] transition-colors shadow-md"
                  >
                    Continue to Swell Checkout →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* PayPal trust line */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="flex items-center gap-3 text-[10px] font-sans text-espresso/40 uppercase tracking-wider">
              <span>🔒 SSL Encrypted</span>
              <span>·</span>
              <span>💳 PayPal Buyer Protection</span>
              <span>·</span>
              <span>✦ No account required</span>
            </div>
            <p className="text-[10px] font-sans text-espresso/30 text-center max-w-xs">
              You'll be redirected to PayPal to complete payment. Your card details are never shared with us.
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
              disabled={isSubmitting || paypalStatus === 'approved'}
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
