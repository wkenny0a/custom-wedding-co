'use client';

import { useCart } from '@/context/CartContext';

export default function OrderSummaryPanel() {
  const { cart } = useCart();

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

      {/* Free Shipping Progress */}
      {subtotal < 99 && (
        <div className="px-6 pb-4">
          <div className="bg-cream-dark/40 rounded-xl px-4 py-3 text-xs font-sans text-espresso/70 text-center">
            Add <strong className="text-espresso">${(99 - subtotal).toFixed(2)}</strong> more for{' '}
            <span className="text-green-700 font-semibold">Free Shipping</span>
          </div>
        </div>
      )}

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
    </div>
  );
}
