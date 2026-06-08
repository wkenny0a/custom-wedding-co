'use client';

import { useCart } from '@/context/CartContext';

export default function OrderSummaryPanel() {
  const { cart } = useCart();

  if (!cart) return null;

  const EXPRESS_SHIPPING_PRODUCT_ID = '6a269ab4ca51510012a16442';
  const items: any[] = cart.items || [];
  const hasExpress = items.some((item: any) => item.product?.id === EXPRESS_SHIPPING_PRODUCT_ID);
  
  // Filter out the Express Shipping product from display list
  const displayItems = items.filter((item: any) => item.product?.id !== EXPRESS_SHIPPING_PRODUCT_ID);

  // Raw cart totals
  const rawSubtotal = cart.sub_total ?? cart.grand_total ?? 0;
  const discount = cart.discount_total ?? 0;
  const grandTotal = cart.grand_total ?? 0;

  // Calculate adjusted subtotal and shipping for display
  const displaySubtotal = hasExpress ? Math.max(0, rawSubtotal - 15) : rawSubtotal;
  const displayShippingPrice = hasExpress ? 15 : 0;
  const freeShipping = !hasExpress && displaySubtotal > 0;

  // Calculate pre-built bundle savings compared to individual keepsakes MSRP
  let totalBundleSavings = 0;
  displayItems.forEach((item: any) => {
    const slug = item.product?.slug || '';
    const name = (item.product?.name || item.description || '').toLowerCase();
    
    // Signature box tier ($113.97 MSRP)
    if (slug === 'the-bridesmaid-proposal-box' || (name.includes('the bridesmaid proposal box') && !name.includes('luxe'))) {
      const msrpValue = 113.97;
      totalBundleSavings += (msrpValue - (item.price || 0)) * item.quantity;
    }
    // Luxe box tier ($228.95 MSRP)
    else if (slug === 'the-bridesmaid-luxe-proposal-box' || name.includes('the bridesmaid luxe proposal box') || name.includes('luxe')) {
      const msrpValue = 228.95;
      totalBundleSavings += (msrpValue - (item.price || 0)) * item.quantity;
    }
  });

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gold-pale/20">
        <h2 className="font-serif text-xl text-espresso">Your Order</h2>
        <p className="text-xs font-sans text-espresso/50 uppercase tracking-widest mt-1">
          {displayItems.length} item{displayItems.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Line Items */}
      <div className="divide-y divide-gold-pale/20">
        {displayItems.map((item: any) => {
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
          <span>${displaySubtotal.toFixed(2)}</span>
        </div>

        {totalBundleSavings > 0 && (
          <div className="bg-green-50 border border-green-200/50 rounded-xl px-4 py-3 text-xs font-sans text-green-800 space-y-1 my-2">
            <div className="flex justify-between font-semibold">
              <span>🎉 Bundle Gifting Savings</span>
              <span>−${totalBundleSavings.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-green-700/80 leading-normal">
              You saved <strong>${totalBundleSavings.toFixed(2)}</strong> by choosing pre-built personalized proposal keepsakes instead of buying them separately!
            </p>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm font-sans text-green-700">
            <span>Discount</span>
            <span>−${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm font-sans text-espresso/70">
          <span>Shipping</span>
          <span className={freeShipping ? 'text-green-700 font-semibold' : ''}>
            {hasExpress ? (
              'Express Shipping — $15.00'
            ) : (
              'Free Standard Shipping'
            )}
          </span>
        </div>

        <div className="flex justify-between font-serif text-lg text-espresso border-t border-gold-pale/30 pt-3 mt-2">
          <span>Total</span>
          <span className="font-medium">${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Premium Trust Section */}
      <div className="px-6 py-5 bg-cream/40 border-t border-gold-pale/20 space-y-4">
        <p className="text-center font-serif text-xs uppercase tracking-wider text-espresso/60 font-semibold">
          Your Purchase is Fully Guaranteed
        </p>
        
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="text-lg flex-shrink-0">🎨</span>
            <div>
              <p className="text-xs font-serif font-bold text-espresso">Artisan Proofing Process</p>
              <p className="text-[10px] font-sans text-espresso/60 leading-normal mt-0.5">
                We email a digital design mockup of your custom box lid within 24 hours. Production starts only after your design is approved!
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <span className="text-lg flex-shrink-0">🛡️</span>
            <div>
              <p className="text-xs font-serif font-bold text-espresso">The Custom Wedding Co. Guarantee</p>
              <p className="text-[10px] font-sans text-espresso/60 leading-normal mt-0.5">
                Any keepsake that arrives misspelled, incorrect, or damaged will be immediately replaced and shipped within 24 hours — free of charge.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-lg flex-shrink-0">🔒</span>
            <div>
              <p className="text-xs font-serif font-bold text-espresso">Secured & Encrypted Payments</p>
              <p className="text-[10px] font-sans text-espresso/60 leading-normal mt-0.5">
                All transactions are encrypted with AES-256 SSL security protocols and processed via Stripe. Your card data is never stored.
              </p>
            </div>
          </div>
        </div>

        {/* Secure Checkout Badges */}
        <div className="flex justify-center items-center gap-6 pt-3 border-t border-gold-pale/10">
          <div className="flex items-center gap-1.5 opacity-55 hover:opacity-80 transition-opacity">
            <svg className="w-3.5 h-3.5 text-espresso/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[9px] font-sans uppercase font-bold tracking-wider text-espresso/70">SSL Secured</span>
          </div>
          
          <div className="flex items-center gap-1.5 opacity-55 hover:opacity-80 transition-opacity">
            <svg className="w-3.5 h-3.5 text-espresso/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
            <span className="text-[9px] font-sans uppercase font-bold tracking-wider text-espresso/70">PCI Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
