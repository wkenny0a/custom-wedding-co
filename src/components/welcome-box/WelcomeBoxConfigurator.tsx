'use client';

import React, { useState } from 'react';
import { BoxColorOption, ProductItem, WelcomeBoxState, DesignOption } from './WelcomeBoxTypes';
import StepBoxColor from '@/components/configurator/StepBoxColor';
import StepDesignSelector from './StepDesignSelector';
import StepWelcomeProducts from './StepWelcomeProducts';
import { useCart } from '@/context/CartContext';

// ─── Volume Discount Tiers ───────────────────────────────────────────────────
const TIERS = [
  { min: 5,   discount: 0 },
  { min: 20,  discount: 10 },
  { min: 30,  discount: 20 },
  { min: 50,  discount: 40 },
  { min: 100, discount: 50 },
];

const getDiscount = (qty: number): number => {
  let discount = 0;
  for (const tier of TIERS) {
    if (qty >= tier.min) discount = tier.discount;
  }
  return discount;
};

const getDiscountLabel = (qty: number): string => {
  const d = getDiscount(qty);
  if (d === 0) return 'No discount';
  return `${d}% OFF`;
};

// ─── Quantity Presets ─────────────────────────────────────────────────────────
const PRESETS = [
  { qty: 5,   label: '5 boxes',   discount: 'No discount' },
  { qty: 20,  label: '20 boxes',  discount: '10% OFF' },
  { qty: 30,  label: '30 boxes',  discount: '20% OFF' },
  { qty: 50,  label: '50 boxes',  discount: '40% OFF' },
  { qty: 100, label: '100 boxes', discount: '50% OFF' },
];

// ─── Social Proof Data ───────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: 'Amanda R.',
    location: 'New York, NY',
    text: 'Our 200 guests each got a welcome box and we had people messaging us for WEEKS about how thoughtful it was.',
    rating: 5,
    date: 'March 2025',
  },
  {
    name: 'James & Sarah',
    location: 'Austin, TX',
    text: "We ordered 80 boxes and they arrived perfectly. The custom monogram on the lid made each one feel personal.",
    rating: 5,
    date: 'January 2025',
  },
  {
    name: 'Rachel M.',
    location: 'Denver, CO',
    text: "The volume pricing made it actually affordable. We got 50% off at 100 boxes and the quality was still amazing.",
    rating: 5,
    date: 'April 2025',
  },
];

const FAQS = [
  {
    q: "What's the minimum order?",
    a: '5 boxes. Volume discounts start at 20 boxes.',
  },
  {
    q: 'Can I use my own design on the lid?',
    a: "Yes! Design 12 lets you upload your own artwork. We accept JPG, PNG, and WEBP files up to 4.5MB. Your custom design will be printed on the lid of every box in your order.",
  },
  {
    q: 'Do all boxes get the same contents?',
    a: 'Yes, all boxes in a single order are identical — same lid design, same items inside, same welcome message. This keeps production efficient and pricing affordable.',
  },
  {
    q: 'What file formats do you accept for custom uploads?',
    a: 'JPG, PNG, and WEBP up to 4.5MB. For best results, use a high-resolution image (at least 1200×1200 pixels) with your design centered.',
  },
  {
    q: 'How far in advance should I order?',
    a: 'We recommend 3–4 weeks before your event for standard production. Rush processing is available for an additional fee.',
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

export default function WelcomeBoxConfigurator({
  catalogProducts = [],
  baseBoxProduct = null,
}: {
  catalogProducts?: ProductItem[];
  baseBoxProduct?: any;
}) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boxQuantity, setBoxQuantity] = useState<number>(5);
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addToCart, removeFromCart, setIsCartOpen, cart } = useCart();

  const [state, setState] = useState<WelcomeBoxState>({
    boxColor: null,
    selectedDesign: null,
    namesOrInitials: '',
    eventDate: '',
    customUploadUrl: '',
    customUploadFilename: '',
    welcomeMessage: '',
    selectedProducts: [],
    baseBoxCartItemId: undefined,
  });

  const discountAmount = getDiscount(boxQuantity);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleInjectBaseBox = async () => {
    if (!baseBoxProduct) return;
    setIsSubmitting(true);
    try {
      if (state.baseBoxCartItemId) {
        try { await removeFromCart(state.baseBoxCartItemId); } catch (e) { /* ignore */ }
      }

      const baseOptions: { name: string; value: string }[] = [];
      if (state.boxColor) baseOptions.push({ name: 'Box Color', value: state.boxColor.name });
      if (state.selectedDesign) baseOptions.push({ name: 'Lid Design', value: state.selectedDesign.name });
      if (state.namesOrInitials.trim()) baseOptions.push({ name: 'Names / Initials', value: state.namesOrInitials });
      if (state.eventDate.trim()) baseOptions.push({ name: 'Event Date', value: state.eventDate });
      if (state.customUploadUrl) baseOptions.push({ name: 'Custom Design URL', value: state.customUploadUrl });
      if (state.welcomeMessage.trim()) baseOptions.push({ name: 'Welcome Message', value: state.welcomeMessage });
      if (boxQuantity > 1) baseOptions.push({ name: 'Quantity', value: String(boxQuantity) });

      const updatedCart = await addToCart(baseBoxProduct.id, boxQuantity, baseOptions, null, true);

      if (updatedCart && updatedCart.items && updatedCart.items.length > 0) {
        const newestItem = updatedCart.items[updatedCart.items.length - 1];
        setState(s => ({ ...s, baseBoxCartItemId: newestItem.id }));
      }
    } catch (error) {
      console.error('Failed to inject base box silently:', error);
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
  const setSelectedDesign = (design: DesignOption) => setState(s => ({ ...s, selectedDesign: design }));
  const setNamesOrInitials = (v: string) => setState(s => ({ ...s, namesOrInitials: v }));
  const setEventDate = (v: string) => setState(s => ({ ...s, eventDate: v }));
  const setCustomUpload = (url: string, filename: string) => setState(s => ({ ...s, customUploadUrl: url, customUploadFilename: filename }));
  const setWelcomeMessage = (v: string) => setState(s => ({ ...s, welcomeMessage: v }));

  const addProduct = async (product: ProductItem) => {
    setIsSubmitting(true);
    try {
      let itemOptions: { name: string; value: string }[] = [];
      if (product.isCustomizable && product.customOptions && product.customOptions.length > 0) {
        itemOptions = product.customOptions.map(opt => ({ name: opt.name, value: opt.value }));
      }
      const updatedCart = await addToCart(product.id, 1, itemOptions, null, true);
      const newestItem = updatedCart?.items?.[updatedCart.items.length - 1];
      const newProduct = { ...product, cartItemId: newestItem?.id };
      setState(s => ({ ...s, selectedProducts: [...s.selectedProducts, newProduct] }));
    } catch (error) {
      console.error('Cart addition failed:', error);
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
      console.error('Cart removal failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/checkout';
    }
  };

  const steps = [
    { num: 1, label: 'Box Color' },
    { num: 2, label: 'Lid Design' },
    { num: 3, label: 'Fill Box' },
  ];

  return (
    <div className="w-full">

      {/* ─── SOCIAL PROOF TOP BAR ─────────────────────────────────── */}
      <div className="w-full bg-espresso text-cream py-3 px-4 mb-0">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-sans tracking-wide">
          <div className="flex items-center gap-2">
            <StarRating count={5} />
            <span className="text-cream/90">4.9 from <strong>1,200+ couples</strong></span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">🎁 <strong>8,500+</strong> welcome boxes delivered</span>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">✦ Volume discounts up to 50% off</span>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">🚚 Ships in 5–7 business days</span>
        </div>
      </div>

      {/* ─── MAIN CONFIGURATOR CARD ───────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto bg-white/40 backdrop-blur-md border border-gold-pale/20 shadow-xl rounded-3xl p-6 md:p-12 mt-6">

        {/* ─── STEP 0: QUANTITY & VOLUME DISCOUNT SELECTOR ──────── */}
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-4">
                Welcome Boxes Your Guests Will Actually Love
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Design Your Welcome Wedding Box</h2>
              <p className="text-espresso-light/80 text-lg max-w-2xl mx-auto">
                Create beautifully curated welcome boxes for every seat at your celebration. Pick a lid design, personalize with your names and date, fill with luxe surprises — and let us handle the rest.
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl mb-1">🎁 How many welcome boxes do you need?</h3>
                <p className="text-sm text-espresso-light/70">The more you order, the more you save! Volume discounts up to 50% off.</p>
              </div>

              {/* 3×2 Preset Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {PRESETS.map(p => (
                  <button
                    key={p.qty}
                    onClick={() => { setBoxQuantity(p.qty); setIsCustomQuantity(false); }}
                    className={`relative py-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-1 ${
                      !isCustomQuantity && boxQuantity === p.qty
                        ? 'border-gold bg-gold/10 text-espresso shadow-md scale-[1.02]'
                        : 'border-gold-pale/40 text-espresso-light hover:border-gold hover:bg-white/60'
                    }`}
                  >
                    <span className="font-serif text-2xl leading-none">{p.qty}</span>
                    <span className="text-[10px] uppercase tracking-wider font-sans text-espresso/50">{p.label}</span>
                    <span className={`text-[10px] uppercase tracking-widest font-sans font-bold mt-0.5 ${
                      p.discount === 'No discount' ? 'text-espresso/30' : 'text-gold'
                    }`}>
                      {p.discount}
                    </span>
                  </button>
                ))}

                {/* Custom Quantity Button / Input */}
                {isCustomQuantity ? (
                  <div className="relative py-3 rounded-xl border-2 border-gold bg-gold/10 shadow-md flex flex-col items-center justify-center gap-1 scale-[1.02]">
                    <input
                      type="number"
                      min="5"
                      value={boxQuantity}
                      onChange={(e) => setBoxQuantity(Math.max(5, parseInt(e.target.value) || 5))}
                      className="w-16 text-center text-2xl font-serif bg-transparent focus:outline-none text-espresso"
                      autoFocus
                    />
                    <span className="text-[10px] uppercase tracking-wider font-sans text-espresso/50">boxes</span>
                    <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${
                      discountAmount === 0 ? 'text-espresso/30' : 'text-gold'
                    }`}>
                      {getDiscountLabel(boxQuantity)}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => { setBoxQuantity(5); setIsCustomQuantity(true); }}
                    className="py-5 rounded-xl border-2 border-gold-pale/40 text-espresso-light hover:border-gold hover:bg-white/60 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-1"
                  >
                    <span className="font-serif text-2xl leading-none">✎</span>
                    <span className="text-[10px] uppercase tracking-wider font-sans text-espresso/50">Custom</span>
                    <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-espresso/30">Enter qty</span>
                  </button>
                )}
              </div>

              {/* Volume Discount Banner */}
              {discountAmount > 0 ? (
                <div className="mt-4 text-center bg-gold/10 border border-gold/30 rounded-xl py-3 px-4 text-sm font-sans text-espresso animate-in fade-in duration-300">
                  🎉 You qualify for <strong>{discountAmount}% volume discount</strong> — applied at checkout!
                </div>
              ) : (
                <div className="mt-4 text-center bg-cream-dark/30 border border-gold-pale/20 rounded-xl py-3 px-4 text-sm font-sans text-espresso/50 animate-in fade-in duration-300">
                  💡 Order 20+ boxes to unlock volume discounts starting at 10% off
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex justify-center border-t border-gold-pale/50 pt-8">
              <button
                onClick={() => { setCurrentStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-10 py-4 bg-espresso text-cream uppercase tracking-widest text-sm hover:bg-espresso-light transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Designing My Welcome Boxes →
              </button>
            </div>
          </div>
        )}

        {/* ─── STEPS 1–3 ─────────────────────────────────────────── */}
        {currentStep >= 1 && (
          <>
            {/* Step Header (shown on step 1) */}
            {currentStep === 1 && (
              <div className="text-center mb-10 animate-in fade-in duration-700">
                <h2 className="font-serif text-4xl md:text-5xl mb-4">Design Your Welcome Wedding Box</h2>
                <p className="text-espresso-light/80 text-lg max-w-2xl mx-auto">
                  Building {boxQuantity} boxes — one beautiful design for all your guests.
                </p>
                {discountAmount > 0 && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 text-xs font-sans text-espresso">
                    🎉 {discountAmount}% volume discount applied
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
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg transition-colors duration-500 ${
                          currentStep === step.num
                            ? 'bg-gold text-white'
                            : currentStep > step.num
                              ? 'bg-espresso text-cream'
                              : 'bg-cream-dark text-gray-400'
                        }`}
                      >
                        {currentStep > step.num ? '✓' : step.num}
                      </div>
                      <span className={`text-xs uppercase tracking-widest mt-2 hidden md:block transition-colors duration-300 ${
                        currentStep >= step.num ? 'text-espresso' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-[1px] mb-6 md:mb-0 transition-colors duration-500 ${
                        currentStep > step.num ? 'bg-espresso/40' : 'bg-gold-pale/50'
                      }`} />
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
                <StepDesignSelector
                  selectedDesign={state.selectedDesign}
                  onSelectDesign={setSelectedDesign}
                  namesOrInitials={state.namesOrInitials}
                  onChangeNamesOrInitials={setNamesOrInitials}
                  eventDate={state.eventDate}
                  onChangeEventDate={setEventDate}
                  customUploadUrl={state.customUploadUrl}
                  customUploadFilename={state.customUploadFilename}
                  onUploadComplete={setCustomUpload}
                  welcomeMessage={state.welcomeMessage}
                  onChangeWelcomeMessage={setWelcomeMessage}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {currentStep === 3 && (
                <StepWelcomeProducts
                  catalogProducts={catalogProducts}
                  selectedProducts={state.selectedProducts}
                  onAddProduct={addProduct}
                  onRemoveProduct={removeProduct}
                  onPrev={prevStep}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  quantity={boxQuantity}
                  selectedDesign={state.selectedDesign}
                  namesOrInitials={state.namesOrInitials}
                  eventDate={state.eventDate}
                  customUploadUrl={state.customUploadUrl}
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
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3">What Our Couples Say</span>
          <h3 className="font-serif text-3xl md:text-4xl text-espresso">Thousands of Happy Guests</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <StarRating count={review.rating} />
              <p className="font-serif text-lg text-espresso mt-4 mb-5 leading-relaxed">
                &ldquo;{review.text}&rdquo;
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
            { icon: '📦', label: 'Volume Discounts', sub: 'Up to 50% off at 100+' },
            { icon: '🎨', label: '12 Lid Designs', sub: 'Or upload your own' },
            { icon: '✉️', label: 'Custom Message', sub: 'Inside every lid' },
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
