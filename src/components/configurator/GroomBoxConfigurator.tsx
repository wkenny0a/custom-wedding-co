'use client';

import React, { useState, useEffect } from 'react';
import { BoxColorOption, ProductItem } from './types';
import { useCart } from '@/context/CartContext';

// ─── Filtered Groomsman Box Colors ──────────────────────────────────────────
const GROOM_BOX_COLORS: BoxColorOption[] = [
  { id: 'c1', name: 'Navy Blue', hexCode: '#3b5998', imageUrl: '/images/boxes/box_closed_navy_blue.png' },
  { id: 'c2', name: 'Sky Blue', hexCode: '#88d8ed', imageUrl: '/images/boxes/box_closed_sky_blue.png' },
  { id: 'c4', name: 'Premium Cream', hexCode: '#f3f1ea', imageUrl: '/images/boxes/box_closed_premium_cream.png', mostPopular: true },
  { id: 'c5', name: 'Light Pink', hexCode: '#f5c4c9', imageUrl: '/images/boxes/box_closed_light_pink.png' },
  { id: 'c7', name: 'Yellow', hexCode: '#ffd54f', imageUrl: '/images/boxes/box_closed_yellow.png' },
  { id: 'c8', name: 'Matte Black', hexCode: '#212121', imageUrl: '/images/boxes/box_closed_matte_black.png' }
];

// ─── Groomsman tailored reviews ─────────────────────────────────────────────
const GROOM_REVIEWS = [
  {
    name: 'Marcus K.',
    location: 'Austin, TX',
    text: "My groomsmen were completely blown away. The customized engraving on the wood, the navy box color, and the flasks were spectacular. Best proposal ever.",
    rating: 5,
    date: 'April 2026',
  },
  {
    name: 'David T.',
    location: 'Chicago, IL',
    text: "Ordered 6 groom boxes. They arrived perfectly packaged with all personalized items exactly as specified. The guys immediately said 'hell yes'. Highly recommend!",
    rating: 5,
    date: 'February 2026',
  },
  {
    name: 'Brad S.',
    location: 'Boston, MA',
    text: "The customized inner lid was a massive hit. Quality of the boxes is top tier, and the free passport holder felt so premium. Worth every single dollar.",
    rating: 5,
    date: 'May 2026',
  },
];

const FAQS = [
  {
    q: 'How long does production take?',
    a: 'Standard production is 5–7 business days. We also offer rush processing (3 business days) — just add the Personal Concierge option at checkout.',
  },
  {
    q: 'Can I customize each box differently?',
    a: 'Yes! Simply type the names separated by commas. Each groomsman box will be personalized with their respective name, making every gift unique.',
  },
  {
    q: 'Is everything gift-ready when it arrives?',
    a: 'Absolutely. All items are beautifully arranged inside each box with shredded paper. The boxes arrive sealed, decorated, and ready to hand to your groomsmen.',
  },
  {
    q: 'How do the free items work?',
    a: 'As you fill the box with stuffers, the progress bar tracks your unlocks: 2 items get you free shipping, 3 items add a premium leather passport holder to each box, and 4 items add a luxury signature pen with a presentation case to each box—completely free of charge!',
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

interface GroomBoxConfiguratorProps {
  catalogProducts?: ProductItem[];
  baseBoxProduct?: any;
  title?: string;
  presetMessage?: string;
  emptyCategoryText?: string;
}

export default function GroomBoxConfigurator({
  catalogProducts = [],
  baseBoxProduct = null,
  title = "Design Your Groom Box",
  presetMessage = "Will you be my groomsman, Brady?",
  emptyCategoryText = "No products found in the custom-groom-box category."
}: GroomBoxConfiguratorProps) {
  const { addMultipleToCart, setIsCartOpen, applyCoupon, cart } = useCart();

  // ─── Local Configuration State ────────────────────────────────────────────
  const [boxQuantity, setBoxQuantity] = useState<number>(1);
  const [isCustomQuantity, setIsCustomQuantity] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<BoxColorOption>(GROOM_BOX_COLORS[2]); // Default to Premium Cream
  const [personalizationMessage, setPersonalizationMessage] = useState<string>(presetMessage);
  const [personNames, setPersonNames] = useState<string[]>(['']);
  const [includeShreddedPaper, setIncludeShreddedPaper] = useState<boolean>(false);
  const [includeBowTie, setIncludeBowTie] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [viewingProduct, setViewingProduct] = useState<ProductItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'closed' | 'open' | 'lid'>('closed');
  const [previewIndex, setPreviewIndex] = useState<number>(0);

  // Sync preview names index when quantity/names array updates
  useEffect(() => {
    if (previewIndex >= boxQuantity) {
      setPreviewIndex(0);
    }
  }, [boxQuantity]);

  // Adjust personNames array length when quantity changes
  useEffect(() => {
    setPersonNames(prev => {
      const next = [...prev];
      while (next.length < boxQuantity) next.push('');
      return next.slice(0, boxQuantity);
    });
  }, [boxQuantity]);

  const handleNameChange = (index: number, value: string) => {
    const next = [...personNames];
    next[index] = value;
    setPersonNames(next);
  };

  const toggleProductSelection = (product: ProductItem) => {
    setSelectedProducts(prev => {
      const alreadySelected = prev.some(p => p.id === product.id);
      if (alreadySelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        // Automatically inject personalization options if the stuffer supports it
        let customOptions: { name: string, value: string }[] = [];
        if (product.isCustomizable && personNames.length > 0) {
          const nameValue = personNames.filter(n => n.trim()).join(', ') || personNames[0] || 'Brady';
          customOptions = [{ name: 'Personalization', value: nameValue }];
        }
        return [...prev, { ...product, customOptions }];
      }
    });
  };

  const getSelectedProduct = (productId: string) => selectedProducts.find(p => p.id === productId);
  const isProductSelected = (productId: string) => selectedProducts.some(p => p.id === productId);

  // ─── Dynamic Math & Free Milestones ───────────────────────────────────────
  const baseBoxPrice = Number(baseBoxProduct?.price) || 18.00;
  const stuffersPriceSum = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const singleBoxSubtotal = baseBoxPrice + stuffersPriceSum;
  const totalSubtotalBeforeDiscount = singleBoxSubtotal * boxQuantity;

  // Volume discounts
  const getVolumeDiscountPercent = (qty: number) => {
    if (qty >= 5) return 45;
    if (qty === 4) return 35;
    if (qty === 3) return 25;
    if (qty === 2) return 15;
    return 0;
  };
  const volumeDiscountPercent = getVolumeDiscountPercent(boxQuantity);
  const volumeDiscountSavings = totalSubtotalBeforeDiscount * (volumeDiscountPercent / 100);
  const discountedSubtotal = totalSubtotalBeforeDiscount - volumeDiscountSavings;

  // Free stuff triggers
  const itemsCount = selectedProducts.length;
  const freeShippingUnlocked = itemsCount >= 2;
  const freePassportUnlocked = itemsCount >= 3;
  const freePenUnlocked = itemsCount >= 4;

  const shippingValue = freeShippingUnlocked ? 19.00 : 0.00;
  const passportValue = freePassportUnlocked ? (25.00 * boxQuantity) : 0.00;
  const penValue = freePenUnlocked ? (30.00 * boxQuantity) : 0.00;
  const totalFreeGiftsValue = shippingValue + passportValue + penValue;

  const totalMoneySaved = volumeDiscountSavings + totalFreeGiftsValue;

  // Milestone Progress Bar math
  const getProgressPercentage = () => {
    if (itemsCount === 0) return 0;
    if (itemsCount === 1) return 20;
    if (itemsCount === 2) return 50; // free shipping
    if (itemsCount === 3) return 75; // free passport holder
    return 100; // free signature pen
  };

  const getCouponCode = (qty: number) => {
    if (qty >= 5) return 'GROOM45';
    if (qty === 4) return 'GROOM35';
    if (qty === 3) return 'GROOM25';
    if (qty === 2) return 'GROOM15';
    return null;
  };

  // ─── Batch add to Swell Cart ──────────────────────────────────────────────
  const handleAddToCart = async () => {
    if (selectedProducts.length === 0) return;
    setIsSubmitting(true);
    try {
      const baseOptions = [];
      if (selectedColor) baseOptions.push({ name: 'Box Color', value: selectedColor.name });
      if (includeShreddedPaper) baseOptions.push({ name: 'Matching Shredded Paper', value: 'Yes' });
      if (includeBowTie) baseOptions.push({ name: 'Exterior Bow Tie Ribbon', value: 'Yes' });
      if (personalizationMessage.trim()) baseOptions.push({ name: 'Inner Lid Message', value: personalizationMessage });
      
      const filledNames = personNames.filter(n => n.trim()).join(', ');
      if (filledNames) baseOptions.push({ name: 'Groomsmen Names', value: filledNames });
      if (boxQuantity > 1) baseOptions.push({ name: 'Quantity', value: String(boxQuantity) });

      // Add the free items as dynamic options of the box value in Swell
      const unlockedGifts = [];
      if (freeShippingUnlocked) unlockedGifts.push('Free Shipping ($19 Value)');
      if (freePassportUnlocked) unlockedGifts.push(`Free Leather Passport Holder x${boxQuantity} ($${25 * boxQuantity} Value)`);
      if (freePenUnlocked) unlockedGifts.push(`Free Signature Pen with Case x${boxQuantity} ($${30 * boxQuantity} Value)`);
      if (unlockedGifts.length > 0) {
        baseOptions.push({ name: 'Free Unlocked Gifts', value: unlockedGifts.join(', ') });
      }

      const itemsPayload: any[] = [];
      // 1. Add base box
      itemsPayload.push({
        productId: baseBoxProduct?.id || '69eca61c95f0540012066ec0',
        quantity: boxQuantity,
        options: baseOptions
      });

      // 2. Add each selected stuffer
      selectedProducts.forEach(stuffer => {
        let optionsArray: any[] = [];
        if (stuffer.isCustomizable) {
          const nameValue = personNames.filter(n => n.trim()).join(', ') || 'Brady';
          optionsArray = [{ name: 'Personalization', value: nameValue }];
        }
        itemsPayload.push({
          productId: stuffer.id,
          quantity: boxQuantity,
          options: optionsArray
        });
      });

      // Execute single batch addition in Swell Cart
      await addMultipleToCart(itemsPayload);

      // Auto-apply Swell coupon based on quantity
      const couponCode = getCouponCode(boxQuantity);
      if (couponCode) {
        try {
          await applyCoupon(couponCode);
        } catch (e) {
          console.warn('Coupon application failed:', e);
        }
      }

      setIsCartOpen(true);
    } catch (err) {
      console.error('Failed to checkout:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Carousel helpers
  const getModalImages = () => {
    if (!viewingProduct) return [];
    const swellImages = viewingProduct.swellData?.images || [];
    if (swellImages.length > 0) return swellImages.map((img: any) => img.file?.url).filter((url?: string) => !!url);
    return [viewingProduct.image || '/images/box_closed.png'];
  };
  const modalImages = getModalImages();
  const activeModalImageUrl = modalImages[currentImageIndex] || '/images/box_closed.png';

  return (
    <div className="w-full">
      {/* ─── Social Proof Banner ────────────────────────────────── */}
      <div className="w-full bg-espresso text-cream py-3 px-4 mb-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-sans tracking-wide">
          <div className="flex items-center gap-2">
            <StarRating count={5} />
            <span className="text-cream/90">4.9 from <strong>847 Grooms</strong></span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">🤵 <strong>The Ultimate Groomsman Box</strong> Builder</span>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">✦ Premium custom items & laser engravings</span>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <span className="text-cream/90">🚚 Quick 5-7 business day shipping</span>
        </div>
      </div>

      {/* ─── Main Configurator Grid ─────────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-3">Custom mixed bundle flow</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-espresso mb-3">{title}</h1>
          <p className="text-base text-espresso-light/80 max-w-2xl mx-auto">
            Design personalized groomsmen boxes with luxury keepsakes. Fill it all on one page and qualify for massive savings and free gifts!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─── LEFT PANEL: Sticky Visual Preview & Milestones (Sticky on Desktop) ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-6 flex flex-col gap-6">
            
            {/* Box Preview Card */}
            <div className="w-full bg-white border border-gold-pale/30 rounded-3xl overflow-hidden shadow-xl p-6">
              <p className="text-xs text-center text-gray-400 uppercase tracking-widest mb-4">Live Box Preview</p>
              
              {/* Tab Toggles for Preview */}
              <div className="flex justify-center gap-2 mb-6">
                {[
                  { id: 'closed', label: 'Box Closed' },
                  { id: 'open', label: 'Inside Box' },
                  { id: 'lid', label: 'Inner Lid typography' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-espresso text-cream shadow-sm'
                        : 'bg-cream-dark/40 text-espresso-light hover:bg-cream-dark/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Graphic Display Area */}
              <div className="w-full aspect-square bg-gray-50 border border-gold-pale/20 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-inner group">
                
                {/* 1. Closed Box Display */}
                {activeTab === 'closed' && (
                  <img
                    src={selectedColor?.imageUrl || '/images/box_closed.png'}
                    alt={`${selectedColor?.name || 'Groomsman'} Box Closed`}
                    className="w-[90%] h-[90%] object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* 2. Open Box Display (Shows chosen products nested inside) */}
                {activeTab === 'open' && (
                  <div className="w-full h-full relative flex flex-col items-center justify-center p-6">
                    <img
                      src="/images/box_open.png"
                      alt="Groom Box Open"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-40 z-0"
                    />
                    
                    {/* Selected Stuffers Display Overlay */}
                    {selectedProducts.length > 0 ? (
                      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 w-4/5 max-h-[80%] overflow-y-auto p-2 bg-white/70 backdrop-blur-sm rounded-xl border border-gold-pale/20">
                        {selectedProducts.map(p => (
                          <div key={p.id} className="flex flex-col items-center p-1.5 border border-gold-pale/10 rounded-lg bg-white/95 shadow-sm text-center">
                            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                            <span className="font-serif text-[10px] text-espresso font-semibold truncate w-full mt-1">{p.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative z-10 text-center px-6">
                        <span className="text-3xl block mb-2">🎁</span>
                        <p className="font-serif text-sm text-espresso-light italic">Your box is empty. Scroll down to choose stuffers!</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Lid Typography Message Display */}
                {activeTab === 'lid' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-white">
                    <div className="w-5/6 max-w-sm text-espresso">
                      <h4 className="font-serif text-2xl md:text-3xl leading-tight font-semibold italic animate-in fade-in duration-500">
                        {personalizationMessage || 'Will you be my groomsman?'}
                      </h4>
                      <p className="mt-6 text-[10px] tracking-[0.2em] uppercase text-espresso-light border-t border-gold-pale/30 pt-3">
                        {boxQuantity > 1
                          ? `Box ${previewIndex + 1} for: ${personNames[previewIndex] || '_____'}`
                          : personNames[0] ? `Tailored for: ${personNames[0]}` : 'Typography Preview'}
                      </p>
                    </div>

                    {/* Quantity Index controls */}
                    {boxQuantity > 1 && (
                      <div className="absolute bottom-4 flex items-center gap-3">
                        <button
                          onClick={() => setPreviewIndex(prev => prev > 0 ? prev - 1 : boxQuantity - 1)}
                          className="w-6 h-6 rounded-full bg-cream-dark/40 hover:bg-cream-dark flex items-center justify-center text-xs text-espresso"
                        >
                          ‹
                        </button>
                        <span className="text-[10px] font-sans text-espresso-light uppercase tracking-wider">
                          Box {previewIndex + 1} of {boxQuantity}
                        </span>
                        <button
                          onClick={() => setPreviewIndex(prev => prev < boxQuantity - 1 ? prev + 1 : 0)}
                          className="w-6 h-6 rounded-full bg-cream-dark/40 hover:bg-cream-dark flex items-center justify-center text-xs text-espresso"
                        >
                          ›
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Box attributes summary */}
              <div className="mt-4 pt-4 border-t border-gold-pale/20 flex flex-wrap justify-between text-xs text-espresso-light gap-2">
                <span>Color: <strong>{selectedColor?.name}</strong></span>
                {includeShreddedPaper && <span>✓ Shredded Paper</span>}
                {includeBowTie && <span>✓ Exterior Ribbon</span>}
              </div>
            </div>

            {/* ─── GAMIFIED PROGRESS BAR & MILESTONES ─── */}
            <div className="w-full bg-white border border-gold-pale/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gold/10 text-gold text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl border-l border-b border-gold/20">
                Unlock Free Gifts
              </div>
              <h3 className="font-serif text-lg text-espresso mb-4 font-semibold">Your Bundle Milestones</h3>
              
              {/* Progress track */}
              <div className="w-full bg-gray-100 h-2.5 rounded-full mb-6 relative">
                <div
                  className="bg-gradient-to-r from-gold-pale via-gold to-gold h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(209,183,119,0.5)]"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>

              {/* Milestones list */}
              <div className="flex flex-col gap-4">
                
                {/* 1. Free Shipping */}
                <div className={`flex items-start gap-4 p-3 rounded-2xl border transition-all duration-500 ${
                  freeShippingUnlocked
                    ? 'bg-gold/10 border-gold/30'
                    : 'bg-gray-50/50 border-gray-100 opacity-60'
                }`}>
                  <span className="text-2xl mt-0.5">{freeShippingUnlocked ? '🚚' : '🔒'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`font-serif text-sm font-semibold ${freeShippingUnlocked ? 'text-espresso' : 'text-gray-400'}`}>
                        2 Stuffers: Free Shipping
                      </span>
                      {freeShippingUnlocked && (
                        <span className="text-[10px] font-sans font-bold text-gold uppercase tracking-wider">Unlocked!</span>
                      )}
                    </div>
                    <p className="text-xs text-espresso-light/70 mt-0.5">Save $19.00 on delivery</p>
                  </div>
                </div>

                {/* 2. Free Passport Holder */}
                <div className={`flex items-start gap-4 p-3 rounded-2xl border transition-all duration-500 ${
                  freePassportUnlocked
                    ? 'bg-gold/10 border-gold/30'
                    : 'bg-gray-50/50 border-gray-100 opacity-60'
                }`}>
                  <span className="text-2xl mt-0.5">{freePassportUnlocked ? '🛂' : '🔒'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`font-serif text-sm font-semibold ${freePassportUnlocked ? 'text-espresso' : 'text-gray-400'}`}>
                        3 Stuffers: Free Passport Holder
                      </span>
                      {freePassportUnlocked && (
                        <span className="text-[10px] font-sans font-bold text-gold uppercase tracking-wider">Unlocked!</span>
                      )}
                    </div>
                    <p className="text-xs text-espresso-light/70 mt-0.5">Custom leather holder for each box ($25 each value)</p>
                    {freePassportUnlocked && (
                      <div className="mt-2 relative w-16 h-16 rounded-lg overflow-hidden border border-gold-pale/30">
                        <img src="/images/passport_holder.png" alt="Free Passport Holder" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Free Signature Pen with Case */}
                <div className={`flex items-start gap-4 p-3 rounded-2xl border transition-all duration-500 ${
                  freePenUnlocked
                    ? 'bg-gold/10 border-gold/30'
                    : 'bg-gray-50/50 border-gray-100 opacity-60'
                }`}>
                  <span className="text-2xl mt-0.5">{freePenUnlocked ? '✒️' : '🔒'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`font-serif text-sm font-semibold ${freePenUnlocked ? 'text-espresso' : 'text-gray-400'}`}>
                        4 Stuffers: Free Signature Pen with Case
                      </span>
                      {freePenUnlocked && (
                        <span className="text-[10px] font-sans font-bold text-gold uppercase tracking-wider">Unlocked!</span>
                      )}
                    </div>
                    <p className="text-xs text-espresso-light/70 mt-0.5">Matte black custom pen for each box ($30 each value)</p>
                    {freePenUnlocked && (
                      <div className="mt-2 relative w-16 h-16 rounded-lg overflow-hidden border border-gold-pale/30">
                        <img src="/images/signature_pen.png" alt="Free Signature Pen" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ─── RIGHT PANEL: Scrollable Form Options & Items Selection ─── */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Section 1: Groomsmen Quantity */}
            <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/20 rounded-3xl p-6 md:p-8 shadow-md">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">Step 1</span>
              <h2 className="font-serif text-2xl text-espresso mb-1">How many groomsmen are you gifting?</h2>
              <p className="text-xs text-espresso-light/60 mb-8">The more you build, the bigger the volume discount applied!</p>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6 pt-3">
                {[1, 2, 3, 4, 5].map(q => {
                  const discount = getVolumeDiscountPercent(q);
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => { setBoxQuantity(q); setIsCustomQuantity(false); }}
                      className={`py-4 rounded-xl text-xl font-serif border-2 transition-all duration-300 hover:-translate-y-0.5 relative ${
                        !isCustomQuantity && boxQuantity === q
                          ? 'border-gold bg-gold/10 text-espresso shadow-md scale-102 font-bold'
                          : 'border-gold-pale/30 bg-white text-espresso-light hover:border-gold hover:bg-white/80'
                      }`}
                    >
                      {discount > 0 && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-white text-[8px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10 animate-pulse">
                          {discount}% OFF
                        </span>
                      )}
                      {q}
                    </button>
                  );
                })}

                {isCustomQuantity ? (
                  <div className="relative w-full">
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-white text-[8px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10 animate-pulse">
                      45% OFF
                    </span>
                    <input
                      type="number"
                      min="6"
                      value={boxQuantity >= 6 ? boxQuantity : 6}
                      onChange={(e) => setBoxQuantity(Math.max(1, parseInt(e.target.value) || 6))}
                      className="py-4 w-full rounded-xl text-xl font-serif border-2 border-gold bg-gold/10 text-center text-espresso font-bold shadow-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setBoxQuantity(6); setIsCustomQuantity(true); }}
                    className="py-4 rounded-xl text-xl font-serif border-2 border-gold-pale/30 bg-white text-espresso-light hover:border-gold hover:bg-white/80 transition-all duration-300 relative"
                  >
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-white text-[8px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10 animate-pulse">
                      45% OFF
                    </span>
                    6+
                  </button>
                )}
              </div>

              {volumeDiscountPercent > 0 && (
                <div className="bg-gold/10 border border-gold/20 rounded-xl py-3 px-4 text-xs font-sans text-espresso font-semibold flex items-center gap-2.5 animate-in fade-in duration-300">
                  <span>🎉</span>
                  <span>Qualifies for a heavy <strong>{volumeDiscountPercent}% volume discount</strong> automatically at checkout!</span>
                </div>
              )}

              {/* UGC Review Images added back at Step One */}
              <div className="mt-8 border-t border-gold-pale/10 pt-6">
                <p className="text-[10px] uppercase tracking-widest text-espresso-light/60 font-sans font-bold mb-3 text-center">
                  See What Real Grooms Created
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-gold-pale/20 group">
                      <img 
                        src={`/images/ugc/groom-review-${num}.jpeg`}
                        alt={`Real groom box review ${num}`}
                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Box Color */}
            <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/20 rounded-3xl p-6 md:p-8 shadow-md animate-in fade-in duration-700">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">Step 2</span>
              <h2 className="font-serif text-2xl text-espresso mb-1">Choose Groomsman Box Color</h2>
              <p className="text-xs text-espresso-light/60 mb-6">Select a luxurious matte base shade for your gift boxes.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {GROOM_BOX_COLORS.map(color => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-3 p-3.5 border-2 rounded-xl transition-all duration-300 hover:-translate-y-0.5 relative bg-white/70 ${
                      selectedColor.id === color.id
                        ? 'border-gold shadow-md bg-white'
                        : 'border-transparent hover:border-gold-pale/50 hover:bg-white'
                    }`}
                  >
                    {color.mostPopular && (
                      <span className="absolute -top-2 left-3 bg-gold text-white text-[8px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                        ⭐ Most Loved
                      </span>
                    )}
                    <div
                      className={`w-10 h-10 rounded-full border border-black/5 flex-shrink-0 transition-transform duration-300 ${
                        selectedColor.id === color.id ? 'scale-105 shadow-inner' : ''
                      }`}
                      style={{ backgroundColor: color.hexCode }}
                    />
                    <span className="font-serif text-xs text-espresso font-semibold tracking-wide">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Inner Lid & Recipient Names */}
            <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/20 rounded-3xl p-6 md:p-8 shadow-md">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">Step 3</span>
              <h2 className="font-serif text-2xl text-espresso mb-1">Names & Secret Lid Message</h2>
              <p className="text-xs text-espresso-light/60 mb-6">Create the surprise with gold-embossed personalization.</p>
              
              {/* Inner Lid Message */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest font-sans font-bold text-espresso/70 mb-2">
                  Inner Lid Message
                </label>
                <input
                  type="text"
                  value={personalizationMessage}
                  onChange={e => setPersonalizationMessage(e.target.value)}
                  placeholder="e.g. Will you be my groomsman, Brady?"
                  className="w-full px-4 py-3 bg-white border border-gold-pale/40 rounded-xl font-serif text-base text-espresso focus:outline-none focus:ring-1 focus:ring-gold transition-shadow"
                />
              </div>

              {/* Recipient Names inputs grid */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-sans font-bold text-espresso/70 mb-2">
                  {boxQuantity > 1 ? 'Enter Recipient Names' : "Recipient's Name"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: boxQuantity }).map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewIndex(idx)}
                      className={`relative flex items-center border rounded-xl overflow-hidden bg-white px-3 transition-all ${
                        previewIndex === idx ? 'border-gold shadow-sm ring-1 ring-gold/20' : 'border-gold-pale/30'
                      }`}
                    >
                      <span className="text-[10px] font-sans font-bold text-gold/60 mr-2 flex-shrink-0">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={personNames[idx] || ''}
                        onChange={e => handleNameChange(idx, e.target.value)}
                        placeholder={`Name ${idx + 1}`}
                        className="w-full py-3 text-sm text-espresso font-serif bg-transparent focus:outline-none"
                      />
                      {previewIndex === idx && boxQuantity > 1 && (
                        <span className="text-[8px] font-sans font-bold text-gold uppercase tracking-wider flex-shrink-0 animate-pulse">
                          Previewing
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Shredded Paper & Ribbon Toggles */}
            <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/20 rounded-3xl p-6 md:p-8 shadow-md">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">Step 4</span>
              <h2 className="font-serif text-2xl text-espresso mb-1">Add Premium Finishes</h2>
              <p className="text-xs text-espresso-light/60 mb-6">Polished details that turn boxes into beautiful unwrapping sets.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shredded paper */}
                <button
                  type="button"
                  onClick={() => setIncludeShreddedPaper(prev => !prev)}
                  className={`flex items-start gap-4 p-4 border rounded-xl text-left bg-white transition-all duration-300 ${
                    includeShreddedPaper ? 'border-gold shadow-md' : 'border-gold-pale/20 hover:border-gold-pale/50'
                  }`}
                >
                  <span className="text-2xl mt-0.5">🍂</span>
                  <div>
                    <span className="font-serif text-sm text-espresso font-semibold block">Matching Shredded Paper</span>
                    <p className="text-[11px] text-espresso-light/70 mt-1 leading-relaxed">
                      Arranged shredded packing paper matching the box tone to pad items.
                    </p>
                  </div>
                </button>

                {/* Bow tie ribbon */}
                <button
                  type="button"
                  onClick={() => setIncludeBowTie(prev => !prev)}
                  className={`flex items-start gap-4 p-4 border rounded-xl text-left bg-white transition-all duration-300 ${
                    includeBowTie ? 'border-gold shadow-md' : 'border-gold-pale/20 hover:border-gold-pale/50'
                  }`}
                >
                  <span className="text-2xl mt-0.5">🎀</span>
                  <div>
                    <span className="font-serif text-sm text-espresso font-semibold block">Exterior Bow Tie Ribbon</span>
                    <p className="text-[11px] text-espresso-light/70 mt-1 leading-relaxed">
                      Luxurious matching ribbon hand-tied in a bow tie around the box.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Section 5: Stuffers Catalog */}
            <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/20 rounded-3xl p-6 md:p-8 shadow-md">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">Step 5</span>
              <h2 className="font-serif text-2xl text-espresso mb-1">Fill Your Groomsmen Box</h2>
              <p className="text-xs text-espresso-light/60 mb-6">Choose curated designer items. (Recommend 4 items for the ultimate unboxing experience!)</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {catalogProducts.length === 0 ? (
                  <div className="col-span-2 text-center py-12 text-espresso-light font-serif">
                    {emptyCategoryText}
                  </div>
                ) : (
                  catalogProducts.map(product => {
                    const isSelected = isProductSelected(product.id);
                    const selectedItem = getSelectedProduct(product.id);
                    
                    return (
                      <div
                        key={product.id}
                        className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 flex flex-col ${
                          isSelected ? 'border-gold shadow-md' : 'border-gold-pale/20'
                        }`}
                      >
                        {/* Stuffer Image */}
                        <div className="h-44 bg-gray-50 relative overflow-hidden group">
                          <img
                            src={product.image || '/images/box_closed.png'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {isSelected && (
                            <div className="absolute top-3 left-3 bg-espresso text-cream text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                              ✓ Added
                            </div>
                          )}
                          {product.isCustomizable && !isSelected && (
                            <div className="absolute top-3 right-3 bg-white/90 text-gold text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-gold/10">
                              ✨ Personalized
                            </div>
                          )}
                        </div>

                        {/* Stuffer Card Body */}
                        <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif font-semibold text-sm text-espresso leading-tight">{product.name}</h4>
                              <span className="font-sans text-xs text-gold font-bold ml-2">${product.price.toFixed(2)}</span>
                            </div>
                            
                            {/* Personalization state tag */}
                            {isSelected && selectedItem?.customOptions && (
                              <div className="mt-2 bg-gold/5 border border-gold/15 rounded-lg px-2 py-1.5 text-[10px] text-espresso-light leading-snug">
                                <span className="font-semibold text-espresso">Personalized:</span> {selectedItem.customOptions[0]?.value}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5 mt-auto">
                            <button
                              type="button"
                              onClick={() => toggleProductSelection(product)}
                              className={`py-2 w-full text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border ${
                                isSelected
                                  ? 'border-espresso text-espresso hover:bg-espresso hover:text-cream'
                                  : 'border-transparent bg-cream-dark text-espresso hover:bg-gold hover:text-white'
                              }`}
                            >
                              {isSelected ? 'Remove item' : 'Add to Box'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setViewingProduct(product)}
                              className="text-[9px] font-sans text-espresso/40 hover:text-espresso/70 transition-colors uppercase tracking-wider"
                            >
                              ⓘ View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ─── BOTTOM ADD-TO-CART SUMMARY BAR ─── */}
            <div className="bg-white border-2 border-gold rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gold/5 w-1/3 skew-x-12 -z-10 pointer-events-none" />
              
              {/* Pricing breakdown */}
              <div className="text-left w-full md:w-auto">
                <span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest block mb-1">
                  Summary ({boxQuantity} {boxQuantity > 1 ? 'Boxes' : 'Box'})
                </span>
                
                <div className="flex items-baseline gap-2.5">
                  {volumeDiscountPercent > 0 ? (
                    <>
                      <span className="font-sans text-sm text-espresso/40 line-through">
                        ${totalSubtotalBeforeDiscount.toFixed(2)}
                      </span>
                      <span className="font-serif text-3xl text-espresso font-bold">
                        ${discountedSubtotal.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="font-serif text-3xl text-espresso font-bold">
                      ${totalSubtotalBeforeDiscount.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Total savings value bubble */}
                {totalMoneySaved > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-gold/25 text-espresso text-[11px] font-sans font-bold px-3 py-1 rounded-full border border-gold/30">
                    🎉 Save ${totalMoneySaved.toFixed(2)} total!
                  </div>
                )}
              </div>

              {/* Add to cart big button */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isSubmitting || selectedProducts.length === 0}
                  className={`px-8 py-4 bg-espresso text-cream uppercase tracking-widest text-sm font-semibold rounded-xl transition-all duration-500 shadow-md hover:shadow-lg flex items-center justify-center gap-3 w-full sm:w-auto ${
                    (isSubmitting || selectedProducts.length === 0)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      : 'hover:bg-espresso-light hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Securing checkout...</span>
                    </>
                  ) : (
                    <span>Add to Cart & Checkout</span>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* ─── tail reviews & FAQ section ─────────────────── */}
        <div className="max-w-5xl mx-auto mt-24">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-3">Honest Testimonials</span>
            <h3 className="font-serif text-3xl text-espresso font-semibold">What Grooms Say About Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {GROOM_REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm border border-gold-pale/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <StarRating count={review.rating} />
                <p className="font-serif text-sm text-espresso-light leading-relaxed mt-4 mb-5 italic">
                  "{review.text}"
                </p>
                <div className="border-t border-gold-pale/20 pt-3 flex justify-between text-xs text-gray-400">
                  <span className="font-semibold text-espresso">{review.name}</span>
                  <span>{review.location}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl text-espresso text-center mb-8 font-semibold">Frequently Asked Questions</h3>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-gold-pale/25 rounded-xl overflow-hidden bg-white/40">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/40 transition-colors"
                  >
                    <span className="font-serif text-espresso text-base pr-4 font-semibold">{faq.q}</span>
                    <span className={`text-gold font-sans text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm font-sans text-espresso-light leading-relaxed animate-in fade-in slide-in-from-top-2 border-t border-gold-pale/15 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ─── Details Modal (ⓘ View Details) ─── */}
      {viewingProduct && typeof document !== 'undefined' && require('react-dom').createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300 p-4 sm:p-6 overflow-hidden">
          <div className="bg-cream w-full max-w-4xl max-h-[95vh] rounded-2xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-gold-pale/20">
            <button
              type="button"
              onClick={() => setViewingProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-espresso transition-colors font-bold shadow-md"
            >
              &#x2715;
            </button>

            {/* Modal Image Carousel */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 flex-shrink-0 relative group">
              <img
                src={activeModalImageUrl}
                alt={viewingProduct.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {modalImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setCurrentImageIndex(prev => (prev - 1 + modalImages.length) % modalImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-espresso shadow"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentImageIndex(prev => (prev + 1) % modalImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-espresso shadow"
                  >
                    &rarr;
                  </button>
                </>
              )}
            </div>

            {/* Modal Body */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-white">
              <span className="text-xs text-gold uppercase tracking-widest mb-2 block font-semibold">Product Description</span>
              <h4 className="font-serif text-3xl mb-1 text-espresso font-semibold">{viewingProduct.name}</h4>
              <p className="font-sans text-xl text-espresso/70 mb-5">${viewingProduct.price.toFixed(2)}</p>
              
              <div className="text-sm font-sans text-espresso-light leading-relaxed mb-6 space-y-3">
                <p>Curated and tailored to match the elevated aesthetic of a groomsman gift package. Hand-selected for utility, texture, and visual impact.</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Laser etched personalized details matching order personalization.</li>
                  <li>Sourced from custom premium materials.</li>
                  <li>Nestled perfectly in your chosen box shred paper alignment.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => { toggleProductSelection(viewingProduct); setViewingProduct(null); }}
                className={`py-3.5 w-full uppercase tracking-wider text-sm font-semibold rounded-xl border ${
                  isProductSelected(viewingProduct.id)
                    ? 'border-espresso text-espresso hover:bg-espresso hover:text-cream'
                    : 'border-transparent bg-gold text-white hover:bg-gold/95 shadow-md'
                }`}
              >
                {isProductSelected(viewingProduct.id) ? 'Remove from Box' : 'Add to Box'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
