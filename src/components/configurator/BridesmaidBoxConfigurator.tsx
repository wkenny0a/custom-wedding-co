'use client';

import React, { useState } from 'react';
import { BoxColorOption, ProductItem, ConfiguratorState } from './types';
import StepBoxColor from './StepBoxColor';
import StepPersonalization from './StepPersonalization';
import StepProducts from './StepProducts';
import { useCart } from '@/context/CartContext';

// ─── Social Proof Data ───────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: 'Taylor S.',
    location: 'Nashville, TN',
    text: 'My bridesmaids literally cried when they opened these. The gold foil message on the inside lid was the most thoughtful detail. Worth every single penny.',
    rating: 5,
    date: 'March 2025',
  },
  {
    name: 'Maria L.',
    location: 'Miami, FL',
    text: 'Ordered 6 boxes, all arrived beautifully packaged and exactly as I designed them. The ribbon on the outside made the unboxing feel so luxurious.',
    rating: 5,
    date: 'January 2025',
  },
  {
    name: 'Priya K.',
    location: 'San Francisco, CA',
    text: "The personalized lid message was the cherry on top — my girls immediately said yes! Came faster than expected and the quality exceeded what I expected.",
    rating: 5,
    date: 'April 2025',
  },
];

const FAQS = [
  {
    q: 'How long does production take?',
    a: 'Standard production is 5–7 business days. We also offer rush processing (3 business days) — just add the Personal Concierge option at checkout.',
  },
  {
    q: 'Can I create a different box for each bridesmaid?',
    a: 'Absolutely. Simply complete the builder once per box, customizing the inner lid message and item selection for each person. Each box is crafted individually.',
  },
  {
    q: 'Can I change my message after ordering?',
    a: 'You can update your message within 2 hours of placing your order by contacting us. After production begins, changes are not possible.',
  },
  {
    q: 'Is everything inside gift-ready when it arrives?',
    a: 'Yes — your items are arranged inside the box with your chosen shredded paper. The box arrives sealed and ready to present.',
  },
  {
    q: 'What if my bridesmaid doesn\'t like something in the box?',
    a: 'We stand behind every order with our satisfaction guarantee. Contact us within 14 days and we\'ll make it right.',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BridesmaidBoxConfigurator({
  catalogProducts = [],
  baseBoxProduct = null,
  title = "Design Your Bridesmaid Box",
  presetMessage = "Will you be my bridesmaid, Carly?",
  emptyCategoryText = 'No products found in the "bridesmaid-box" category.',
  theme = 'bridesmaid'
}: {
  catalogProducts?: ProductItem[],
  baseBoxProduct?: any,
  title?: string,
  presetMessage?: string,
  emptyCategoryText?: string,
  theme?: 'bridesmaid' | 'groomsman'
}) {
  const t = theme === 'groomsman' ? {
    emoji: '🤵',
    heroSub: 'The Box That Makes Him Say "Let\'s Go"',
    heroDesc: '4,200+ grooms have used this builder to create the moment their guys said "I\'m in." Build yours in 3 easy steps.',
    quantityQuestion: 'How many groomsmen are you gifting?',
    statsCount: '847 grooms',
    ugcSubtitle: "Here's what some of our grooms received ↓",
    partyName: 'groomsman party',
    singularName: 'groomsman',
    reviewHeader: 'What Our Customers Say'
  } : {
    emoji: '👰',
    heroSub: 'The Box That Makes Her Cry Happy Tears',
    heroDesc: '4,200+ brides have used this builder to create the moment their girls said "I\'m in." Build yours in 3 easy steps.',
    quantityQuestion: 'How many bridesmaids are you gifting?',
    statsCount: '847 brides',
    ugcSubtitle: "Here's what some of our brides received ↓",
    partyName: 'bridal party',
    singularName: 'bridesmaid',
    reviewHeader: 'What Our Brides Say'
  };

  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = landing/quantity selector
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boxQuantity, setBoxQuantity] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addToCart, addMultipleToCart, removeFromCart, setIsCartOpen, cart, applyCoupon } = useCart();

  const [state, setState] = useState<ConfiguratorState>({
    boxColor: null,
    personalizationMessage: '',
    personNames: [],
    includeShreddedPaper: false,
    includeBowTie: false,
    selectedProducts: [],
    baseBoxCartItemId: undefined
  });

  const handleInjectBaseBox = async () => {
    if (!baseBoxProduct) return;
    setIsSubmitting(true);
    try {
      if (state.baseBoxCartItemId) {
        try { await removeFromCart(state.baseBoxCartItemId); } catch (e) { }
      }

      const baseOptions = [];
      if (state.boxColor) baseOptions.push({ name: 'Box Color', value: state.boxColor.name });
      if (state.includeShreddedPaper) baseOptions.push({ name: 'Matching Shredded Paper', value: 'Yes' });
      if (state.includeBowTie) baseOptions.push({ name: 'Exterior Bow Tie Ribbon', value: 'Yes' });
      if (state.personalizationMessage.trim()) baseOptions.push({ name: 'Inner Lid Message', value: state.personalizationMessage });
      if (state.personNames.length > 0) baseOptions.push({ name: 'Bridesmaid Names', value: state.personNames.join(', ') });
      if (boxQuantity > 1) baseOptions.push({ name: 'Quantity', value: String(boxQuantity) });

      const updatedCart = await addToCart(baseBoxProduct.id, boxQuantity, baseOptions, null, true);

      if (updatedCart && updatedCart.items && updatedCart.items.length > 0) {
        const newestItem = updatedCart.items[updatedCart.items.length - 1];
        setState(s => ({ ...s, baseBoxCartItemId: newestItem.id }));
      }
    } catch (error) {
      console.error("Failed to inject base box silently:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToStep = async (targetStep: number) => {
    if (targetStep === 3 && currentStep < 3) {
      await handleInjectBaseBox();
    }
    setCurrentStep(targetStep);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => goToStep(Math.min(currentStep + 1, 3));
  const prevStep = () => goToStep(Math.max(currentStep - 1, 0));

  const setBoxColor = (color: BoxColorOption) => setState(s => ({ ...s, boxColor: color }));
  const setPersonalizationMessage = (msg: string) => setState(s => ({ ...s, personalizationMessage: msg }));
  const setPersonNames = (names: string[]) => setState(s => ({ ...s, personNames: names }));
  const setIncludeShreddedPaper = (include: boolean) => setState(s => ({ ...s, includeShreddedPaper: include }));
  const setIncludeBowTie = (include: boolean) => setState(s => ({ ...s, includeBowTie: include }));

  const addProduct = async (product: ProductItem) => {
    setIsSubmitting(true);
    try {
      let itemOptions: any[] = [];
      if (product.isCustomizable && product.customOptions && product.customOptions.length > 0) {
        itemOptions = product.customOptions.map(opt => ({ name: opt.name, value: opt.value }));
      }
      const updatedCart = await addToCart(product.id, boxQuantity, itemOptions, null, true);
      const newestItem = updatedCart?.items?.[updatedCart.items.length - 1];
      const newProduct = { ...product, cartItemId: newestItem?.id };
      setState(s => ({ ...s, selectedProducts: [...s.selectedProducts, newProduct] }));
    } catch (error) {
      console.error("Cart addition failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeProduct = async (productId: string) => {
    const productToRemove = state.selectedProducts.find(p => p.id === productId);
    if (!productToRemove) return;
    setIsSubmitting(true);
    try {
      if (productToRemove.cartItemId) {
        await removeFromCart(productToRemove.cartItemId);
      }
      setState(s => ({ ...s, selectedProducts: s.selectedProducts.filter(p => p.id !== productId) }));
    } catch (error) {
      console.error("Cart removal failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Coupon code mapping for volume discounts
  const getCouponCode = (q: number) => {
    if (q >= 5) return 'BRIDE45';
    if (q === 4) return 'BRIDE35';
    if (q === 3) return 'BRIDE25';
    if (q === 2) return 'BRIDE15';
    return null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Auto-apply volume discount coupon
      const couponCode = getCouponCode(boxQuantity);
      if (couponCode) {
        try {
          await applyCoupon(couponCode);
        } catch (e) {
          console.warn('Coupon auto-apply failed (may not exist yet):', couponCode, e);
        }
      }
    } catch (e) {
      console.error('Error during checkout prep:', e);
    } finally {
      setIsSubmitting(false);
    }

    const checkoutLink = cart?.checkoutUrl || cart?.checkout_url;
    if (checkoutLink) {
      window.location.href = checkoutLink;
    } else {
      setIsCartOpen(true);
    }
  };

  const steps = [
    { num: 1, label: 'Box Color' },
    { num: 2, label: 'Inner Lid' },
    { num: 3, label: 'Fill Box' },
  ];

  const [isCustomQuantity, setIsCustomQuantity] = useState(false);

  // Deep Volume Discount Logic
  const getDiscount = (q: number) => {
    if (q >= 5) return 45;
    if (q === 4) return 35;
    if (q === 3) return 25;
    if (q === 2) return 15;
    return 0;
  };

  const discountAmount = getDiscount(boxQuantity);

  return (
    <div className="w-full">

      {/* ─── SOCIAL PROOF TOP BAR ─────────────────────────────────── */}
      <div className="w-full bg-espresso text-cream py-3 px-4 mb-0">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-sans tracking-wide">
          <div className="flex items-center gap-2">
            <StarRating count={5} />
            <span className="text-cream/90">4.9 from <strong>{t.statsCount}</strong></span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">🎁 <strong>3,200+</strong> boxes crafted & delivered</span>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">✦ Free personalization on every box</span>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">🚚 Ships in 5–7 business days</span>
        </div>
      </div>

      {/* ─── MAIN CONFIGURATOR CARD ───────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto bg-white/40 backdrop-blur-md border border-gold-pale/20 shadow-xl rounded-3xl p-6 md:p-12 mt-6">

        {/* ─── STEP 0: QUANTITY SELECTOR LANDING ─────────────────── */}
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-4">{t.heroSub}</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">{title}</h2>
              <p className="text-espresso-light/80 text-lg max-w-2xl mx-auto">
                {t.heroDesc}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="max-w-lg mx-auto mb-10">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl mb-1">{t.emoji} {t.quantityQuestion}</h3>
                <p className="text-sm text-espresso-light/70">The more you buy, the more you save! Get up to 45% off.</p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5].map(q => (
                  <button
                    key={q}
                    onClick={() => { setBoxQuantity(q); setIsCustomQuantity(false); }}
                    className={`py-4 rounded-xl text-xl font-serif border-2 transition-all duration-300 hover:-translate-y-1 ${!isCustomQuantity && boxQuantity === q
                      ? 'border-gold bg-gold/10 text-espresso shadow-md scale-105'
                      : 'border-gold-pale/40 text-espresso-light hover:border-gold hover:bg-white/60'
                      }`}
                  >
                    {q}
                  </button>
                ))}
                
                {/* Expandable Infinite Volume Toggle */}
                {isCustomQuantity ? (
                   <input
                     type="number"
                     min="6"
                     value={boxQuantity >= 6 ? boxQuantity : 6}
                     onChange={(e) => setBoxQuantity(parseInt(e.target.value) || 6)}
                     className="py-4 w-full rounded-xl text-xl font-serif border-2 border-gold bg-gold/10 text-center text-espresso shadow-md focus:outline-none scale-105 transition-all duration-300"
                   />
                ) : (
                   <button
                     onClick={() => { setBoxQuantity(6); setIsCustomQuantity(true); }}
                     className="py-4 rounded-xl text-xl font-serif border-2 border-gold-pale/40 text-espresso-light hover:border-gold hover:bg-white/60 transition-all duration-300"
                   >
                     6+
                   </button>
                )}
              </div>
              
              {discountAmount > 0 && (
                <div className="mt-4 text-center bg-gold/10 border border-gold/30 rounded-xl py-3 px-4 text-sm font-sans text-espresso animate-in fade-in duration-300">
                  🎉 You qualify for a <strong>{discountAmount}% volume discount</strong> — applied heavily at checkout!
                </div>
              )}
            </div>

            {/* UGC Preview Strip */}
            <div className="mb-10">
              <p className="text-center text-xs uppercase tracking-widest text-gray-400 mb-5">{t.ugcSubtitle}</p>
              <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
                {[
                  { bg: 'bg-stone-100', emoji: '🤍', label: 'Premium Cream' },
                  { bg: 'bg-rose-50', emoji: '🌸', label: 'Light Pink' },
                  { bg: 'bg-slate-900', emoji: '🖤', label: 'Matte Black' },
                ].map((box) => (
                  <div key={box.label} className={`${box.bg} rounded-2xl aspect-square flex flex-col items-center justify-center shadow-sm border border-gold-pale/20`}>
                    <span className="text-4xl mb-2">{box.emoji}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">{box.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center border-t border-gold-pale/50 pt-8">
              <button
                onClick={() => { setCurrentStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-10 py-4 bg-espresso text-cream uppercase tracking-widest text-sm hover:bg-espresso-light transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Building My Box →
              </button>
            </div>
          </div>
        )}

        {/* ─── STEPS 1–3 ─────────────────────────────────────────── */}
        {currentStep >= 1 && (
          <>
            {/* Step 1 Header */}
            {currentStep === 1 && (
              <div className="text-center mb-10 animate-in fade-in duration-700">
                <h2 className="font-serif text-4xl md:text-5xl mb-4">{title}</h2>
                <p className="text-espresso-light/80 text-lg max-w-2xl mx-auto">
                  {boxQuantity > 1
                    ? `Building ${boxQuantity} boxes — one design for your whole ${t.partyName}.`
                    : `Create a beautifully curated, personalized gift for your ${t.singularName}.`}
                </p>
                {discountAmount > 0 && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 text-xs font-sans text-espresso">
                    🎉 {discountAmount}% multi-box discount applied
                  </div>
                )}
              </div>
            )}

            {/* Stepper Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-2 md:gap-4 w-full max-w-2xl">
                {steps.map((step, index) => (
                  <React.Fragment key={step.num}>
                    <div
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => step.num <= currentStep && goToStep(step.num)}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg transition-colors duration-500 ${currentStep === step.num
                          ? 'bg-gold text-white'
                          : currentStep > step.num
                            ? 'bg-espresso text-cream'
                            : 'bg-cream-dark text-gray-400'
                          }`}
                      >
                        {currentStep > step.num ? '✓' : step.num}
                      </div>
                      <span className={`text-xs uppercase tracking-widest mt-2 hidden md:block transition-colors duration-300 ${currentStep >= step.num ? 'text-espresso' : 'text-gray-400'}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-[1px] mb-6 md:mb-0 transition-colors duration-500 ${currentStep > step.num ? 'bg-espresso/40' : 'bg-gold-pale/50'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step Components */}
            <div className="w-full min-h-[400px]">
              {currentStep === 1 && (
                <StepBoxColor
                  selectedColor={state.boxColor}
                  onSelectColor={setBoxColor}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {currentStep === 2 && (
                <StepPersonalization
                  quantity={boxQuantity}
                  message={state.personalizationMessage}
                  presetMessage={presetMessage}
                  personNames={state.personNames}
                  onChangeNames={setPersonNames}
                  onChangeMessage={setPersonalizationMessage}
                  includeShreddedPaper={state.includeShreddedPaper}
                  onToggleShreddedPaper={setIncludeShreddedPaper}
                  includeBowTie={state.includeBowTie}
                  onToggleBowTie={setIncludeBowTie}
                  selectedColor={state.boxColor}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {currentStep === 3 && (
                <StepProducts
                  catalogProducts={catalogProducts}
                  selectedProducts={state.selectedProducts}
                  onAddProduct={addProduct}
                  onRemoveProduct={removeProduct}
                  onPrev={prevStep}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  emptyCategoryText={emptyCategoryText}
                  quantity={boxQuantity}
                  personNames={state.personNames}
                  discountPercent={discountAmount}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* ─── SOCIAL PROOF WALL (Below builder) ──────────────────────── */}
      <div className="w-full max-w-5xl mx-auto mt-16 mb-8 px-4">

        {/* Reviews */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3">{t.reviewHeader}</span>
          <h3 className="font-serif text-3xl md:text-4xl text-espresso">Real Reactions. Real Tears.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <StarRating count={review.rating} />
              <p className="font-serif text-lg text-espresso mt-4 mb-5 leading-relaxed">
                "{review.text}"
              </p>
              <div className="border-t border-gold-pale/30 pt-4">
                <span className="font-sans text-sm font-semibold text-espresso block">{review.name}</span>
                <span className="font-sans text-xs text-gray-400">{review.location} · {review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { icon: '🎨', label: 'Free Personalization', sub: 'On every box' },
            { icon: '✉️', label: 'Proof in 24hrs', sub: 'Approve before we print' },
            { icon: '📦', label: 'Arrives Gift-Ready', sub: 'No wrapping needed' },
            { icon: '💛', label: 'Satisfaction Guarantee', sub: '14-day promise' },
          ].map((badge) => (
            <div key={badge.label} className="bg-white/60 border border-gold-pale/20 rounded-2xl p-5 text-center">
              <span className="text-3xl block mb-2">{badge.icon}</span>
              <span className="font-serif text-sm text-espresso font-semibold block">{badge.label}</span>
              <span className="font-sans text-xs text-gray-400 mt-1 block">{badge.sub}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl text-espresso text-center mb-8">Common Questions</h3>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gold-pale/30 rounded-xl overflow-hidden bg-white/50">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/40 transition-colors duration-200"
                >
                  <span className="font-serif text-espresso text-base pr-4">{faq.q}</span>
                  <span className={`text-gold font-sans text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm font-sans text-espresso-light leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300 border-t border-gold-pale/20 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
