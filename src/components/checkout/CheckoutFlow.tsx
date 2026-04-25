'use client';

import { CheckoutProvider } from './CheckoutProvider';
import OrderSummaryPanel from './OrderSummaryPanel';
import ContactInfoForm from './ContactInfoForm';
import ShippingAddressForm from './ShippingAddressForm';
import ShippingMethodSelector from './ShippingMethodSelector';
import OrderBumpWidget from './OrderBumpWidget';
import PaymentForm from './PaymentForm';

export default function CheckoutFlow() {
  return (
    <CheckoutProvider>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left Column — Form Steps (3/5 width on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Star review trust signal */}
            <div className="flex items-center justify-center gap-3 py-3 bg-white/40 backdrop-blur-sm border border-gold-pale/20 rounded-2xl px-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-sans text-xs text-espresso/70">
                Trusted by <strong>3,200+</strong> brides · ✦ Free personalization · 🚚 Ships in 5–7 days
              </span>
            </div>

            {/* Step 1: Contact */}
            <ContactInfoForm />

            {/* Step 2: Shipping Address */}
            <ShippingAddressForm />

            {/* Step 3: Shipping Method */}
            <ShippingMethodSelector />

            {/* Order Bump — appears at payment step */}
            <OrderBumpWidget />

            {/* Step 4: Payment */}
            <PaymentForm />

          </div>

          {/* Right Column — Order Summary (2/5 width on desktop, shown at top on mobile) */}
          <div className="lg:col-span-2 order-first lg:order-last lg:sticky lg:top-[5.5rem]">
            <OrderSummaryPanel />
          </div>

        </div>
      </div>
    </CheckoutProvider>
  );
}
