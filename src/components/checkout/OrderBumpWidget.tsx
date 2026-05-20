'use client';

import { useCheckout } from './CheckoutProvider';

export default function OrderBumpWidget() {
  const { bumpAdded, setBumpAdded, step } = useCheckout();

  if (step < 4) return null;

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 border-2 ${bumpAdded ? 'border-gold bg-gold/5' : 'border-dashed border-gold/40 bg-white/40'}`}>
      <label htmlFor="order-bump" className="flex items-start gap-4 px-6 py-5 cursor-pointer">
        {/* Custom Checkbox */}
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${bumpAdded ? 'bg-gold border-gold' : 'border-gray-300 bg-white'}`}
            onClick={() => setBumpAdded(!bumpAdded)}
          >
            {bumpAdded && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <input
            id="order-bump"
            type="checkbox"
            checked={bumpAdded}
            onChange={() => setBumpAdded(!bumpAdded)}
            className="sr-only"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold font-bold">
              ⚡ One-Time Offer — Only Available Here
            </span>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="font-serif text-xl text-espresso leading-tight">
              Add Personal Product Concierge
            </h3>
            <span className="font-sans font-bold text-espresso text-lg">+$19.00</span>
          </div>
          <p className="text-sm font-sans text-espresso/70 leading-relaxed">
            A dedicated specialist personally oversees your order — from digital design proofs within 24 hours to artisan production and shipping updates. We handle everything until you (and your bridesmaids) are thrilled.
          </p>
          {!bumpAdded && (
            <p className="text-[11px] font-sans text-espresso/40 mt-2 italic">
              Check the box above to add this to your order
            </p>
          )}
          {bumpAdded && (
            <p className="text-[11px] font-sans text-green-700 mt-2 font-semibold">
              ✓ Added to your order! Your specialist will reach out within 2 hours.
            </p>
          )}
        </div>

        {/* Decorative icon */}
        <div className="flex-shrink-0 text-3xl hidden sm:block">👑</div>
      </label>
    </div>
  );
}
