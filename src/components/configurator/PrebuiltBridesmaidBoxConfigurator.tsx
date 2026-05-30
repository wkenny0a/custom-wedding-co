'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Check, Sparkles, ShoppingBag } from 'lucide-react';
import { trackViewContent } from '@/lib/analytics';

// ─── Constants ───────────────────────────────────────────────────────────────
const BOX_COLORS = [
  { id: 'cream', name: 'Premium Cream', hexCode: '#f3f1ea', imageUrl: '/images/boxes/box_closed_premium_cream.png', mostPopular: true },
  { id: 'pink', name: 'Light Pink', hexCode: '#f5c4c9', imageUrl: '/images/boxes/box_closed_light_pink.png', mostPopular: false },
  { id: 'black', name: 'Matte Black', hexCode: '#212121', imageUrl: '/images/boxes/box_closed_matte_black.png', mostPopular: false },
  { id: 'navy', name: 'Navy Blue', hexCode: '#3b5998', imageUrl: '/images/boxes/box_closed_navy_blue.png', mostPopular: false },
  { id: 'sky', name: 'Sky Blue', hexCode: '#88d8ed', imageUrl: '/images/boxes/box_closed_sky_blue.png', mostPopular: false }
];

const SHRED_COLORS = [
  { id: 'ivory', name: 'Ivory Cream', hexCode: '#FFFDF9' },
  { id: 'blush', name: 'Soft Blush', hexCode: '#FFF0F0' }
];

const REVIEWS = [
  {
    name: 'Sarah K.',
    location: 'Chicago, IL',
    text: 'I was hesitant about ordering pre-built boxes, but Custom Wedding Co. blew me away. The hairbrush and compact mirror are heirloom quality. Every bridesmaid was in tears reading their custom lid message!',
    rating: 5,
    date: 'April 2026'
  },
  {
    name: 'Emily R.',
    location: 'Boston, MA',
    text: 'The absolute easiest bridesmaid proposals. I ordered 5 Classic boxes. They arrived perfectly packed, smelling amazing (the lavender & vanilla notes!), and the custom lettering on the outside was gorgeous.',
    rating: 5,
    date: 'May 2026'
  },
  {
    name: 'Jessica T.',
    location: 'Austin, TX',
    text: 'A major hit! I upgraded to the Deluxe VIP tier and my girls loved the freshwater pearl bracelets. The packaging details alone make it look like a $200 gift box. Recommend 10/10!',
    rating: 5,
    date: 'May 2026'
  }
];

export interface PrebuiltBridesmaidBoxConfiguratorProps {
  baseBoxProduct: {
    id: string;
    name?: string;
    slug?: string;
  } | null;
  prebuiltStuffers: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    isCustomizable?: boolean;
    swellData?: unknown;
  }[];
}

export default function PrebuiltBridesmaidBoxConfigurator({
  baseBoxProduct,
  prebuiltStuffers
}: PrebuiltBridesmaidBoxConfiguratorProps) {
  const { addMultipleToCart, applyCoupon, setIsCartOpen } = useCart();

  // ─── State Management ──────────────────────────────────────────────────────
  const [selectedTier, setSelectedTier] = useState<'classic' | 'deluxe'>('classic');
  const [boxColor, setBoxColor] = useState(BOX_COLORS[0]);
  const [shredColor, setShredColor] = useState(SHRED_COLORS[0].name);
  const [boxQuantity, setBoxQuantity] = useState<number>(3);
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);
  const [bridesmaidName, setBridesmaidName] = useState<string>('Courtney');
  const [innerLidMessage, setInnerLidMessage] = useState<string>('Will you stand by me? Courtney, I couldn\'t do this without you.');
  
  // Tab states for the interactive preview (box, inside, lid)
  const [activePreviewTab, setActivePreviewTab] = useState<'box' | 'inside' | 'lid'>('box');
  
  // Carousel states for the visual grid
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (baseBoxProduct?.id) {
      trackViewContent({
        id: baseBoxProduct.id,
        name: baseBoxProduct.name || 'Prebuilt Bridesmaid Proposal Box',
        price: selectedTier === 'deluxe' ? 99 : 70,
        category: 'Gifts & Boxes'
      });
    }
  }, [baseBoxProduct, selectedTier]);

  // Dynamic products list based on selected tier
  const classicStufferSlugs = [
    'personalized-compact-mirror-custom-heirloom-bridal-gift',
    'the-heirloom-botanical-hairbrush',
    'bespoke-velvet-heirloom-jewelry-case',
    'bespoke-satin-sleep-collection'
  ];
  const deluxeStufferSlugs = [
    ...classicStufferSlugs,
    'dainty-pearl-bracelet-bridal',
    'artisan-soy-candle-bridal'
  ];

  const currentStufferSlugs = selectedTier === 'classic' ? classicStufferSlugs : deluxeStufferSlugs;
  const activeStuffers = prebuiltStuffers.filter(s => currentStufferSlugs.includes(s.slug));

  // Sync stuffer selections with active image carousel
  const carouselImages = [
    // Closed Box image (dynamically represents box color)
    {
      id: 'box-closed',
      title: `${boxColor.name} Closed Box`,
      url: boxColor.imageUrl || '/images/boxes/box_closed_premium_cream.png',
      isBox: true,
      isInside: false,
      isLid: false,
      isStuffer: false
    },
    // Opened Box preview (dynamic layout of items)
    {
      id: 'box-inside',
      title: 'Curated Items Inside',
      url: '/images/gift-boxes/bridesmaid-box.png', // Fallback to premium styled bridesmaid-box image
      isBox: false,
      isInside: true,
      isLid: false,
      isStuffer: false
    },
    // Custom printed inside lid
    {
      id: 'box-lid',
      title: 'Custom Lid Message',
      url: '/images/gift-boxes/how-it-works.png',
      isBox: false,
      isInside: false,
      isLid: true,
      isStuffer: false
    },
    // Stuffer close-ups
    ...activeStuffers.map(s => ({
      id: s.id,
      title: s.name,
      url: s.image,
      isBox: false,
      isInside: false,
      isLid: false,
      isStuffer: true
    }))
  ];

  // Map preview tabs directly to carousel images to keep it unified and interactive
  useEffect(() => {
    if (activePreviewTab === 'box') {
      setActiveCarouselIndex(0);
    } else if (activePreviewTab === 'inside') {
      setActiveCarouselIndex(1);
    } else if (activePreviewTab === 'lid') {
      setActiveCarouselIndex(2);
    }
  }, [activePreviewTab]);

  const handleCarouselChange = (index: number) => {
    setActiveCarouselIndex(index);
    if (index === 0) setActivePreviewTab('box');
    else if (index === 1) setActivePreviewTab('inside');
    else if (index === 2) setActivePreviewTab('lid');
    else setActivePreviewTab('inside'); // default focus if clicking a stuffer accessory
  };

  // ─── E-Commerce Integration ────────────────────────────────────────────────
  const handleAddToCart = async () => {
    if (!baseBoxProduct) return;
    setIsSubmitting(true);
    try {
      const itemsToInject = [];

      // 1. Core Base Box details
      const baseOptions = [];
      baseOptions.push({ name: 'Box Color', value: boxColor.name });
      baseOptions.push({ name: 'Matching Shredded Paper', value: shredColor });
      if (innerLidMessage.trim()) baseOptions.push({ name: 'Inner Lid Message', value: innerLidMessage.trim() });
      if (bridesmaidName.trim()) baseOptions.push({ name: 'Bridesmaid Name', value: bridesmaidName.trim() });

      itemsToInject.push({
        productId: baseBoxProduct.id,
        quantity: boxQuantity,
        options: baseOptions,
        metadata: { isPrebuiltBundle: 'yes', prebuiltTier: selectedTier }
      });

      // 2. Curate all preset stuffers in the chosen tier
      for (const stuffer of activeStuffers) {
        itemsToInject.push({
          productId: stuffer.id,
          quantity: boxQuantity,
          options: [], // standard preset items, personalized via digital proofing
          metadata: { isPrebuiltStuffer: 'yes', parentBundleId: baseBoxProduct.id }
        });
      }

      // 3. Batch inject all products into Swell cart in one go
      await addMultipleToCart(itemsToInject);

      // 4. Programmatically apply exclusive ad-coupon to hit $70 or $99 bundle prices!
      const couponCode = selectedTier === 'deluxe' ? 'PREBUILT99' : 'PREBUILT70';
      try {
        await applyCoupon(couponCode);
      } catch (couponError) {
        console.warn('Exclusive prebuilt coupon auto-apply failed:', couponCode, couponError);
      }

      setIsCartOpen(true);
    } catch (err) {
      console.error('Failed to add prebuilt box to cart:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Discount presets based on quantity
  const getVolumeDiscount = (q: number) => {
    if (q >= 5) return 45;
    if (q === 4) return 35;
    if (q === 3) return 25;
    if (q === 2) return 15;
    return 0;
  };

  const volumeDiscount = getVolumeDiscount(boxQuantity);

  return (
    <div className="w-full">
      {/* ─── 1. SOCIAL PROOF STRIP ──────────────────────────────────── */}
      <div className="w-full bg-espresso text-cream py-3.5 px-6 border-b border-gold/20 shadow-md">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm font-sans tracking-widest text-center">
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold">★ 4.9</span>
            <span className="text-cream/90">from 1,200+ happy couples</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <div className="flex items-center gap-2">
            <span>🎁</span>
            <span className="font-semibold">8,500+ welcome boxes delivered</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-cream/20" />
          <div className="flex items-center gap-2">
            <span className="text-gold-light font-bold">🎉</span>
            <span className="uppercase font-bold text-gold-light">Bulk discounts up to 45% off</span>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN LAYOUT CONTAINER ───────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* LEFT COLUMN: Product Grid & Working Carousel (6 Columns) */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 order-1">
            
            {/* Live Interactive Canvas Screen */}
            <div className="relative w-full aspect-[4/5] bg-white border border-gold/15 shadow-[0_24px_50px_rgba(74,44,42,0.06)] rounded-2xl overflow-hidden flex items-center justify-center">
              
              {/* Tab Selector Buttons overlay on Visual Preview */}
              <div className="absolute top-4 left-4 z-20 flex gap-2 bg-white/90 backdrop-blur-sm border border-gold/15 p-1 rounded-lg shadow-sm">
                <button
                  onClick={() => setActivePreviewTab('box')}
                  className={`px-4 py-1.5 rounded text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                    activePreviewTab === 'box'
                      ? 'bg-espresso text-cream shadow-sm'
                      : 'text-espresso/70 hover:bg-cream-dark/50'
                  }`}
                >
                  Box Top
                </button>
                <button
                  onClick={() => setActivePreviewTab('inside')}
                  className={`px-4 py-1.5 rounded text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                    activePreviewTab === 'inside'
                      ? 'bg-espresso text-cream shadow-sm'
                      : 'text-espresso/70 hover:bg-cream-dark/50'
                  }`}
                >
                  Inside Layout
                </button>
                <button
                  onClick={() => setActivePreviewTab('lid')}
                  className={`px-4 py-1.5 rounded text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                    activePreviewTab === 'lid'
                      ? 'bg-espresso text-cream shadow-sm'
                      : 'text-espresso/70 hover:bg-cream-dark/50'
                  }`}
                >
                  Inner Lid
                </button>
              </div>

              {/* Dynamic Overlay Rendering */}
              {activePreviewTab === 'box' && (
                <div className="w-full h-full relative animate-in fade-in duration-500">
                  {/* Closed Box Color Rendering */}
                  <div 
                    className="w-full h-full flex items-center justify-center transition-all duration-700"
                    style={{ backgroundColor: boxColor.hexCode + '15' }}
                  >
                    {/* Placeholder closed box with gold foil engraving */}
                    <div className="w-[85%] h-[85%] relative flex items-center justify-center">
                      <div 
                        className="w-80 h-80 rounded-2xl shadow-2xl relative flex flex-col items-center justify-center p-6 border-2 border-gold/20 transition-all duration-500"
                        style={{ backgroundColor: boxColor.hexCode }}
                      >
                        {/* Gold Foil Name Engraving Preview */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 pointer-events-none">
                          <span className="block font-sans text-xs uppercase tracking-[0.25em] text-gold/60 mb-2 font-bold">Custom Wedding Co.</span>
                          <h4 
                            className="font-display text-4xl md:text-5xl text-gold drop-shadow-sm tracking-wide lowercase italic first-letter:uppercase"
                            style={{ 
                              color: boxColor.id === 'cream' ? '#B89A52' : '#EFE3C2',
                              textShadow: '0px 1px 2px rgba(0,0,0,0.1)'
                            }}
                          >
                            {bridesmaidName || 'Courtney'}
                          </h4>
                          <span className="block h-px w-20 bg-gold/30 mx-auto mt-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'inside' && (
                <div className="w-full h-full relative p-8 flex flex-col items-center justify-center animate-in fade-in duration-500 bg-cream/35">
                  <div className="text-center mb-6">
                    <span className="font-sans text-xs uppercase tracking-widest text-espresso/60 font-bold block mb-1">Unboxing Layout Preview</span>
                    <span className="font-sans text-[10px] uppercase text-gold font-bold">Paper shred: {shredColor}</span>
                  </div>
                  
                  {/* Curated Products Layout */}
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {activeStuffers.map((stuffer, idx) => (
                      <div key={idx} className="bg-white border border-gold/10 p-3 rounded-xl flex items-center gap-3 shadow-sm hover:shadow transition-shadow">
                        <div className="relative w-12 h-12 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                          {stuffer.image ? (
                            <Image src={stuffer.image} alt={stuffer.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-espresso/40">No Image</div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-sans font-bold text-[10px] text-espresso uppercase tracking-wider truncate">{stuffer.name.split('|')[0].trim()}</h5>
                          <span className="font-sans text-[10px] text-gold font-bold">${stuffer.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePreviewTab === 'lid' && (
                <div className="w-full h-full bg-cream-dark p-8 md:p-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500 relative border-8 border-double border-gold/15">
                  <span className="absolute top-6 font-sans text-xs uppercase tracking-[0.2em] text-gold font-bold">Inside Lid Invitation Card</span>
                  <div className="max-w-md bg-white border border-gold/20 p-8 md:p-10 shadow-2xl rounded-sm my-6 flex flex-col justify-center min-h-[260px] relative">
                    {/* Ornamental Gold border */}
                    <div className="absolute inset-2 border border-gold/10 pointer-events-none" />
                    
                    <p className="font-serif text-2xl md:text-3xl text-espresso italic leading-relaxed font-light">
                      &quot;{innerLidMessage || 'Will you be my bridesmaid?'}&quot;
                    </p>
                  </div>
                  <span className="absolute bottom-6 font-sans text-[10px] text-espresso/60 uppercase tracking-widest">Hand-finished with gold foil letters</span>
                </div>
              )}

            </div>

            {/* Bottom Working Image Carousel */}
            <div className="relative w-full">
              <span className="text-[10px] uppercase font-sans font-bold text-espresso/50 tracking-wider mb-2 block text-center lg:text-left">
                📦 Carousel: Click to view details
              </span>
              <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
                {carouselImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleCarouselChange(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                      activeCarouselIndex === index
                        ? 'border-gold shadow-md scale-105 bg-white'
                        : 'border-transparent hover:border-gold-pale hover:bg-white/50'
                    }`}
                  >
                    {/* Render color previews or item icons */}
                    {img.isBox ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-1" style={{ backgroundColor: boxColor.hexCode }}>
                        <span className="font-sans text-[8px] font-bold uppercase tracking-wider text-center line-clamp-2" style={{ color: boxColor.id === 'cream' ? '#4A2C2A' : '#F7EFE3' }}>
                          Lid
                        </span>
                      </div>
                    ) : img.isInside ? (
                      <div className="w-full h-full bg-cream-dark flex items-center justify-center">
                        <span className="font-sans text-[8px] font-bold uppercase tracking-wider text-espresso">Items</span>
                      </div>
                    ) : img.isLid ? (
                      <div className="w-full h-full bg-white flex items-center justify-center border border-gold/10">
                        <span className="font-serif text-[8px] italic font-bold text-gold">Card</span>
                      </div>
                    ) : (
                      <Image src={img.url} alt={img.title} fill className="object-cover" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Builder Panel (5 Columns) */}
          <div className="lg:col-span-5 space-y-8 order-2">
            
            {/* Header Content */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-gold block">Prebuilt Bundle Offer</span>
              <h1 className="font-display text-4xl xl:text-5xl text-espresso tracking-wide leading-tight">
                The Prebuilt Bridesmaid Proposal Box
              </h1>
              <p className="font-serif text-lg md:text-xl text-espresso-light italic">
                &quot;Pick the box. Personalize every detail. Make each bridesmaid feel chosen.&quot;
              </p>
            </div>

            <hr className="border-gold/15" />

            {/* Description Block with MSRP & Bundle breakdown */}
            <div className="space-y-4 font-sans text-sm text-espresso-light/80 leading-relaxed bg-white/50 border border-gold/10 p-5 rounded-2xl">
              <h4 className="font-bold text-espresso text-base uppercase tracking-wider mb-2">🎁 What&apos;s Included</h4>
              <p>
                Simplify your proposals. This curated campaign preset is loaded with our absolute best-selling keepsakes, styled to fit perfectly inside our signature linen boxes. Yes, these are the **exact, premium keepsakes** sold individually across our catalog:
              </p>
              <ul className="space-y-2 mt-2 pl-1">
                <li className="flex items-start gap-2 text-espresso">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Premium Linen Box ($15 value):</strong> Custom gold embossed outside name + customized printed inner lid card.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Personalized Compact Mirror:</strong> Rose gold or silver metal casing with standard & 2x magnified dual-sided glass.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Heirloom Botanical Hairbrush:</strong> Premium wooden-back hairbrush with a beautiful rose gold nameplate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Bespoke Velvet Jewelry Case:</strong> Luxury travel accessory organizer in a rich, matching tone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Satin Sleep Collection:</strong> Satin sleep mask, matching scrunchie set, and satin envelope pouch.</span>
                </li>
                
                {/* Deluxe Tier additions */}
                {selectedTier === 'deluxe' && (
                  <div className="border-t border-gold/10 pt-2 mt-2 space-y-2 animate-in fade-in duration-300">
                    <li className="flex items-start gap-2 text-espresso font-semibold">
                      <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Dainty Freshwater Pearl Bracelet: 14k gold-filled tarnish-free chain.</span>
                    </li>
                    <li className="flex items-start gap-2 text-espresso font-semibold">
                      <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Artisan Scented Soy Candle: White tea & jasmine in gold-lidded jar.</span>
                    </li>
                  </div>
                )}
              </ul>
              
              <div className="border-t border-gold/15 pt-3 mt-3 flex items-center justify-between font-sans">
                <span className="text-xs uppercase text-gray-400 font-bold">MSRP Combined Value</span>
                <span className="line-through text-espresso/60">${selectedTier === 'deluxe' ? '145.00' : '110.00'}</span>
              </div>
            </div>

            {/* 1. TIER BUNDLE SELECTOR */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-espresso/60">Step 1: Choose Your Preset Tier</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedTier('classic')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-md relative ${
                    selectedTier === 'classic'
                      ? 'border-gold bg-gold/5 shadow-sm'
                      : 'border-gold-pale/35 bg-white/40 hover:border-gold'
                  }`}
                >
                  <span className="block font-serif text-lg font-bold text-espresso mb-1">Classic Keepsake Tier</span>
                  <p className="font-sans text-[11px] text-espresso-light/70 leading-relaxed mb-3">
                    Box + Compact Mirror + Botanical Brush + Velvet Travel Case + Satin Sleep Set.
                  </p>
                  <span className="font-sans text-xl font-bold text-espresso">$70.00 <span className="text-xs font-normal text-gold uppercase tracking-wider block sm:inline sm:ml-2">Save 36%</span></span>
                </button>

                <button
                  onClick={() => setSelectedTier('deluxe')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-md relative ${
                    selectedTier === 'deluxe'
                      ? 'border-gold bg-gold/5 shadow-sm'
                      : 'border-gold-pale/35 bg-white/40 hover:border-gold'
                  }`}
                >
                  <div className="absolute -top-2 right-4 bg-gold text-white text-[8px] font-sans uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full">
                    👑 Premium VIP
                  </div>
                  <span className="block font-serif text-lg font-bold text-espresso mb-1">Deluxe VIP Tier</span>
                  <p className="font-sans text-[11px] text-espresso-light/70 leading-relaxed mb-3">
                    Everything in Classic + Gold-Filled Freshwater Pearl Bracelet + Soy Candle.
                  </p>
                  <span className="font-sans text-xl font-bold text-espresso">$99.00 <span className="text-xs font-normal text-gold uppercase tracking-wider block sm:inline sm:ml-2">Save 32%</span></span>
                </button>
              </div>
            </div>

            {/* 2. BOX COLOR SELECTOR */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-espresso/60">Step 2: Choose Your Box Color</span>
              <div className="grid grid-cols-5 gap-3">
                {BOX_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setBoxColor(color)}
                    className={`flex flex-col items-center gap-1.5 p-2 border rounded-xl transition-all duration-300 hover:-translate-y-0.5 relative ${
                      boxColor.id === color.id
                        ? 'border-gold bg-white shadow-sm'
                        : 'border-transparent hover:border-gold-pale hover:bg-white/50'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border border-black/5 ${
                        boxColor.id === color.id ? 'scale-110 shadow-md' : ''
                      }`}
                      style={{ backgroundColor: color.hexCode }}
                    />
                    <span className="font-sans text-[9px] font-bold text-center leading-tight text-espresso/70 truncate w-full">{color.name.split(' ')[1] || color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. PERSONALIZATION INPUTS */}
            <div className="space-y-4 bg-white/45 border border-gold/10 p-5 rounded-2xl space-y-5">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-espresso/60 block -mb-2">Step 3: Personalization Details</span>
              
              {/* Bridesmaid Name */}
              <div className="space-y-1.5">
                <label className="font-sans font-bold text-[11px] text-espresso/80 uppercase tracking-wider block">Outside Box Foil Name</label>
                <input
                  type="text"
                  maxLength={16}
                  value={bridesmaidName}
                  onChange={(e) => setBridesmaidName(e.target.value)}
                  className="w-full bg-white border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold shadow-sm"
                  placeholder="Enter name for box top (e.g. Courtney)"
                />
              </div>

              {/* Inside Lid Card Invitation */}
              <div className="space-y-1.5">
                <label className="font-sans font-bold text-[11px] text-espresso/80 uppercase tracking-wider block">Inside Lid Invitation Text</label>
                <textarea
                  maxLength={100}
                  rows={2}
                  value={innerLidMessage}
                  onChange={(e) => setInnerLidMessage(e.target.value)}
                  className="w-full bg-white border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold shadow-sm leading-relaxed"
                  placeholder="Enter invitation message card text"
                />
                <span className="text-[10px] text-espresso/50 block text-right font-sans">{100 - innerLidMessage.length} characters remaining</span>
              </div>

              {/* Shredded paper selection */}
              <div className="space-y-2">
                <span className="font-sans font-bold text-[11px] text-espresso/80 uppercase tracking-wider block">Inside Shredded Paper Filler</span>
                <div className="flex gap-4">
                  {SHRED_COLORS.map(shred => (
                    <label key={shred.id} className="flex items-center gap-2 cursor-pointer font-sans text-xs text-espresso/80">
                      <input
                        type="radio"
                        name="shred-paper"
                        value={shred.name}
                        checked={shredColor === shred.name}
                        onChange={() => setShredColor(shred.name)}
                        className="accent-gold h-4 w-4"
                      />
                      <span>{shred.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. QUANTITY SELECTOR PRESETS */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-espresso/60 block">Step 4: Box Gifting Quantity</span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5].map(q => (
                  <button
                    key={q}
                    onClick={() => { setBoxQuantity(q); setIsCustomQuantity(false); }}
                    className={`py-3.5 rounded-xl text-lg font-serif border-2 transition-all duration-300 ${
                      !isCustomQuantity && boxQuantity === q
                        ? 'border-gold bg-gold/10 text-espresso shadow-md scale-105'
                        : 'border-gold-pale/35 bg-white/40 text-espresso-light hover:border-gold hover:bg-white/60'
                    }`}
                  >
                    {q}
                  </button>
                ))}
                
                {isCustomQuantity ? (
                  <input
                    type="number"
                    min="6"
                    value={boxQuantity >= 6 ? boxQuantity : 6}
                    onChange={(e) => setBoxQuantity(parseInt(e.target.value) || 6)}
                    className="py-3.5 w-full rounded-xl text-lg font-serif border-2 border-gold bg-gold/10 text-center text-espresso shadow-md focus:outline-none scale-105"
                  />
                ) : (
                  <button
                    onClick={() => { setBoxQuantity(6); setIsCustomQuantity(true); }}
                    className="py-3.5 rounded-xl text-lg font-serif border-2 border-gold-pale/35 bg-white/40 text-espresso-light hover:border-gold hover:bg-white/60"
                  >
                    6+
                  </button>
                )}
              </div>

              {volumeDiscount > 0 && (
                <div className="bg-gold/10 border border-gold/30 rounded-xl py-3 px-4 text-xs font-sans text-espresso text-center animate-in fade-in duration-300">
                  🎉 Bulk volume discount activated! Get <strong>{volumeDiscount}% off</strong> at checkout!
                </div>
              )}
            </div>

            <hr className="border-gold/15" />

            {/* 5. ADD TO CART BATCH PIPELINE TRIGGER */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline font-sans mb-1">
                <span className="text-espresso font-bold uppercase tracking-wider text-sm">Combined Bundle Total</span>
                <div className="text-right">
                  <span className="block font-sans text-2xl font-bold text-espresso">${(selectedTier === 'deluxe' ? 99 : 70) * boxQuantity}.00</span>
                  <span className="block text-[10px] text-gold font-bold uppercase tracking-widest">Free Personalization + Free Shipping</span>
                </div>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={isSubmitting}
                className="w-full py-4.5 bg-espresso text-cream text-center font-sans text-xs uppercase font-bold tracking-widest shadow-xl hover:bg-espresso-light hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-cream" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Bundling & Syncing Cart...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>Personalize & Add {boxQuantity} Box{boxQuantity > 1 ? 'es' : ''} to Cart</span>
                  </>
                )}
              </Button>
            </div>

          </div>

        </div>
      </div>

      {/* ─── 3. TRUST & AUTHORITY SECTION ───────────────────────────── */}
      <section className="w-full py-20 bg-cream-dark border-t border-b border-gold/15 mt-16 px-6">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block">Digital Proof Included</span>
            <h2 className="font-serif text-3xl md:text-4xl text-espresso">Thoughtful Details, Guaranteed Flawless</h2>
            <p className="font-sans text-sm text-espresso-light/80 leading-relaxed font-light">
              We specialize in bulk bridal party gifting. Every step of our artisan crafting process is designed to deliver a high-end unboxing moment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm text-center space-y-3">
              <span className="text-3xl block">✏️</span>
              <h4 className="font-serif text-xl text-espresso">1. Digital Proofing</h4>
              <p className="font-sans text-xs text-espresso-light/70 leading-relaxed">We send a digital proof within 24 hours. We do not print until you are 100% happy.</p>
            </div>
            <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm text-center space-y-3">
              <span className="text-3xl block">🎁</span>
              <h4 className="font-serif text-xl text-espresso">2. Arrives Gift-Ready</h4>
              <p className="font-sans text-xs text-espresso-light/70 leading-relaxed">No wrapping paper needed. Items are perfectly nested on soft shredded paper.</p>
            </div>
            <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm text-center space-y-3">
              <span className="text-3xl block">🚚</span>
              <h4 className="font-serif text-xl text-espresso">3. Timely Delivery</h4>
              <p className="font-sans text-xs text-espresso-light/70 leading-relaxed">Standard production is 5-7 business days. Rush processing options available.</p>
            </div>
            <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm text-center space-y-3">
              <span className="text-3xl block">💛</span>
              <h4 className="font-serif text-xl text-espresso">4. Love-It Promise</h4>
              <p className="font-sans text-xs text-espresso-light/70 leading-relaxed">If anything is imperfect, contact us within 14 days and we will immediately make it right.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. SOCIAL PROOF WALL ────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto py-20 px-6">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block">Customer Feedback</span>
          <h2 className="font-serif text-3xl md:text-4xl text-espresso">What Our Brides Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white border border-gold/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="flex gap-1 text-gold mb-4 text-sm">★★★★★</div>
              <p className="font-serif text-base text-espresso leading-relaxed italic mb-6">
                &quot;{review.text}&quot;
              </p>
              <div className="border-t border-gold/10 pt-4 flex justify-between items-center text-xs font-sans">
                <span className="font-bold text-espresso uppercase tracking-wider">{review.name}</span>
                <span className="text-espresso-light/60">{review.location} · {review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
