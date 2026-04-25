'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderConfirmation() {
  const params = useSearchParams();
  const orderId = params.get('order_id') || '';

  const NEXT_STEPS = [
    {
      icon: '📧',
      title: 'Confirmation Email',
      desc: 'Check your inbox — a confirmation with your order details is on its way.',
      time: 'Within 5 minutes',
    },
    {
      icon: '🎨',
      title: 'Design Proof',
      desc: "Our artisan team will send you a digital proof of your personalised lid message for approval.",
      time: 'Within 24 hours',
    },
    {
      icon: '📦',
      title: 'Handcrafted & Shipped',
      desc: 'Once you approve your proof, we handcraft your order and ship it with tracking.',
      time: '5–7 business days',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">

      {/* Success Hero */}
      <div className="text-center mb-14">
        <div className="text-7xl mb-6 animate-bounce">🎉</div>
        <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-4">
          Your Order is Confirmed!
        </h1>
        <p className="font-sans text-lg text-espresso/70 max-w-xl mx-auto">
          Thank you for trusting Custom Wedding Co. with your special moment. Your order is now in our artisan team's hands.
        </p>
        {orderId && (
          <div className="mt-5 inline-flex items-center gap-2 bg-white/60 border border-gold-pale/30 rounded-full px-5 py-2 text-sm font-sans text-espresso/60">
            Order ID: <strong className="text-espresso">{orderId.slice(0, 8).toUpperCase()}</strong>
          </div>
        )}
      </div>

      {/* What Happens Next */}
      <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gold-pale/20">
          <h2 className="font-serif text-2xl text-espresso">What Happens Next</h2>
        </div>
        <div className="divide-y divide-gold-pale/20">
          {NEXT_STEPS.map((s, i) => (
            <div key={i} className="flex gap-5 px-6 py-5">
              <div className="text-3xl flex-shrink-0">{s.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className="font-serif text-lg text-espresso">{s.title}</h3>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-gold bg-gold/10 border border-gold/20 rounded-full px-3 py-1 flex-shrink-0">
                    {s.time}
                  </span>
                </div>
                <p className="text-sm font-sans text-espresso/60 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question CTA */}
      <div className="bg-espresso/5 border border-espresso/10 rounded-2xl px-6 py-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg text-espresso mb-1">Have a question?</h3>
          <p className="text-sm font-sans text-espresso/60">Our team typically responds within 2 hours.</p>
        </div>
        <a
          href="mailto:hello@customweddingco.com"
          className="px-6 py-3 bg-espresso text-cream font-sans text-sm uppercase tracking-widest hover:bg-espresso-light transition-colors rounded-lg flex-shrink-0"
        >
          Contact Us
        </a>
      </div>

      {/* Cross-sell */}
      <div className="text-center">
        <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold font-semibold mb-2">
          While you wait
        </p>
        <h3 className="font-serif text-2xl text-espresso mb-6">Complete Your Wedding Look</h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop/bridal"
            className="px-6 py-3 bg-white border border-gold-pale/40 text-espresso font-sans text-sm uppercase tracking-widest hover:bg-cream-dark/30 transition-colors rounded-lg"
          >
            Bridal Party Gifts
          </Link>
          <Link
            href="/shop/stationery"
            className="px-6 py-3 bg-white border border-gold-pale/40 text-espresso font-sans text-sm uppercase tracking-widest hover:bg-cream-dark/30 transition-colors rounded-lg"
          >
            Wedding Stationery
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 bg-espresso text-cream font-sans text-sm uppercase tracking-widest hover:bg-espresso-light transition-colors rounded-lg"
          >
            Shop All →
          </Link>
        </div>
      </div>

    </div>
  );
}
