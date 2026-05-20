'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function OrderSummaryPanel() {
  const { cart, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!cart) return null;

  const items: any[] = cart.items || [];
  const subtotal = cart.sub_total ?? cart.grand_total ?? 0;
  const shipping = cart.shipment_total ?? 0;
  const discount = cart.discount_total ?? 0;
  const grandTotal = cart.grand_total ?? 0;
  const freeShipping = shipping === 0 && subtotal > 0;

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gold-pale/20">
        <h2 className="font-serif text-xl text-espresso">Your Order</h2>
        <p className="text-xs font-sans text-espresso/50 uppercase tracking-widest mt-1">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Line Items */}
      <div className="divide-y divide-gold-pale/20">
        {items.map((item: any) => {
          const imgUrl = item.product?.images?.[0]?.file?.url ?? '';
          const options: { name: string; value: string }[] = item.options || [];
          const lineTotal = (item.price ?? 0) * (item.quantity ?? 1);

          return (
            <div key={item.id} className="flex gap-4 px-6 py-4">
              {/* Thumbnail */}
              <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-cream-dark/20 border border-gold-pale/20 relative">
                {imgUrl ? (
                  <img src={imgUrl} alt={item.product?.name ?? 'Product'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🎁</div>
                )}
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-espresso text-cream text-[10px] font-sans font-bold flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="font-serif text-sm text-espresso font-medium leading-tight">{item.product?.name ?? item.description}</p>
                {options.length > 0 && (
                  <div className="mt-1.5 space-y-0.5">
                    {options.map((opt, i) => (
                      <p key={i} className="text-[11px] font-sans text-espresso/60">
                        <span className="font-semibold text-espresso/70">{opt.name}:</span> {opt.value}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <p className="font-sans text-sm text-espresso font-medium flex-shrink-0">
                ${lineTotal.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="px-6 py-4 border-t border-gold-pale/20 space-y-2">
        <div className="flex justify-between text-sm font-sans text-espresso/70">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm font-sans text-green-700">
            <span>Discount</span>
            <span>−${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm font-sans text-espresso/70">
          <span>Shipping</span>
          <span className={freeShipping ? 'text-green-700 font-semibold' : ''}>
            {shipping === 0 ? (subtotal > 0 ? 'Calculated next' : 'Free') : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between font-serif text-lg text-espresso border-t border-gold-pale/30 pt-3 mt-2">
          <span>Total</span>
          <span className="font-medium">${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Coupon Code Field */}
      <div className="px-6 py-4 border-t border-gold-pale/20">
        {cart?.coupon_code ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-sm">🎉</span>
              <div>
                <span className="font-sans text-xs font-bold text-green-800 uppercase tracking-wider">
                  {cart.coupon_code}
                </span>
                <span className="font-sans text-[10px] text-green-600 ml-1.5">applied</span>
              </div>
            </div>
            <button
              onClick={async () => {
                setCouponLoading(true);
                setCouponError('');
                try {
                  await removeCoupon();
                  setCouponSuccess('');
                  setCouponCode('');
                } catch {
                  setCouponError('Failed to remove coupon');
                } finally {
                  setCouponLoading(false);
                }
              }}
              disabled={couponLoading}
              className="font-sans text-[10px] font-semibold text-red-500 hover:text-red-700 uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <label className="font-sans text-[10px] font-semibold text-espresso/60 uppercase tracking-wider block mb-2">
              Have a coupon code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError('');
                }}
                placeholder="Enter code"
                className="flex-1 px-4 py-2.5 bg-white border border-gold-pale/30 rounded-xl font-sans text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all uppercase tracking-wider"
              />
              <button
                onClick={async () => {
                  if (!couponCode.trim()) return;
                  setCouponLoading(true);
                  setCouponError('');
                  setCouponSuccess('');
                  try {
                    const result = await applyCoupon(couponCode.trim());
                    if (result?.errors) {
                      const msg = Object.values(result.errors).map((e: any) => e.message).join(', ');
                      setCouponError(msg || 'Invalid coupon code');
                    } else if (result?.coupon_code) {
                      setCouponSuccess(`${result.coupon_code} applied!`);
                      setCouponCode('');
                    } else {
                      setCouponError('Invalid or expired coupon code');
                    }
                  } catch {
                    setCouponError('Invalid or expired coupon code');
                  } finally {
                    setCouponLoading(false);
                  }
                }}
                disabled={couponLoading || !couponCode.trim()}
                className="px-5 py-2.5 bg-espresso text-cream font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-espresso-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {couponLoading ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    ...
                  </span>
                ) : 'Apply'}
              </button>
            </div>
            {couponError && (
              <p className="font-sans text-[11px] text-red-600 mt-2 flex items-center gap-1">
                <span>✕</span> {couponError}
              </p>
            )}
            {couponSuccess && (
              <p className="font-sans text-[11px] text-green-700 mt-2 flex items-center gap-1">
                <span>✓</span> {couponSuccess}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Free Shipping Progress */}
      {subtotal < 99 && (
        <div className="px-6 pb-4">
          <div className="bg-cream-dark/40 rounded-xl px-4 py-3 text-xs font-sans text-espresso/70 text-center">
            Add <strong className="text-espresso">${(99 - subtotal).toFixed(2)}</strong> more for{' '}
            <span className="text-green-700 font-semibold">Free Shipping</span>
          </div>
        </div>
      )}

      {/* Tiered Discount Progress — only after free shipping threshold */}
      {subtotal >= 99 && (() => {
        const TIERS = [
          { min: 150, discount: 15, label: '15% OFF' },
          { min: 300, discount: 20, label: '20% OFF' },
          { min: 500, discount: 25, label: '25% OFF' },
        ];
        const currentTier = [...TIERS].reverse().find(t => subtotal >= t.min) || null;
        const nextTier = TIERS.find(t => subtotal < t.min) || null;
        const currentDiscount = currentTier?.discount || 0;
        const savingsAmt = subtotal * (currentDiscount / 100);
        const maxTier = TIERS[TIERS.length - 1];
        const progress = Math.min(100, (subtotal / maxTier.min) * 100);
        const amtToNext = nextTier ? nextTier.min - subtotal : 0;

        return (
          <div className="px-6 pb-4">
            <div className="bg-cream-dark/20 rounded-xl px-4 py-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-[10px] font-semibold text-espresso uppercase tracking-wider">
                  {currentTier && !nextTier
                    ? `🎉 Max discount — ${currentTier.label}!`
                    : nextTier
                      ? `$${amtToNext.toFixed(2)} from ${nextTier.label}`
                      : 'Spend more, save more!'}
                </span>
                {currentDiscount > 0 && (
                  <span className="font-sans text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    −${savingsAmt.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="h-1.5 w-full bg-espresso/8 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: currentDiscount >= 25
                      ? 'linear-gradient(90deg, #C5A467, #A67C3D, #7C5C28)'
                      : currentDiscount >= 20
                        ? 'linear-gradient(90deg, #C5A467, #A67C3D)'
                        : '#C5A467',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                {TIERS.map((tier) => {
                  const isReached = subtotal >= tier.min;
                  return (
                    <span key={tier.min} className={`font-sans text-[9px] font-semibold transition-colors ${
                      isReached ? 'text-gold' : 'text-espresso/25'
                    }`}>
                      {isReached ? '✓ ' : ''}${tier.min} · {tier.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Trust Badges */}
      <div className="px-6 pb-5 flex justify-center gap-6 border-t border-gold-pale/20 pt-4">
        {[
          { icon: '🔒', label: 'Secure' },
          { icon: '✨', label: 'Handcrafted' },
          { icon: '💛', label: 'Guaranteed' },
        ].map(b => (
          <div key={b.label} className="flex flex-col items-center gap-1">
            <span className="text-lg">{b.icon}</span>
            <span className="text-[9px] font-sans uppercase tracking-wider text-espresso/50">{b.label}</span>
          </div>
        ))}
      </div>

      {/* Proof Approval Notice */}
      <div className="px-6 pb-5">
        <div className="bg-gradient-to-br from-cream-dark/30 to-cream-dark/10 border border-gold-pale/25 rounded-2xl px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-lg">📸</span>
            </div>
            <div>
              <h4 className="font-serif text-sm text-espresso font-medium leading-tight">
                Proof Photo Before We Ship
              </h4>
              <p className="font-sans text-[11px] text-espresso/60 mt-1.5 leading-relaxed">
                Within <strong className="text-espresso">24 hours</strong> of your order, we'll email you a 
                <strong className="text-espresso"> proof photo</strong> of your personalized item for your approval. 
                We won't ship until you're 100% happy with how it looks.
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  <span className="font-sans text-[10px] text-espresso/50 uppercase tracking-wider">Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  <span className="font-sans text-[10px] text-espresso/50 uppercase tracking-wider">Approve</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  <span className="font-sans text-[10px] text-espresso/50 uppercase tracking-wider">Ship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
