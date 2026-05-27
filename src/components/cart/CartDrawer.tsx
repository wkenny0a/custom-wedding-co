'use client'

import { useCart } from '@/context/CartContext'
import { X, Minus, Plus, Trash2, ShieldCheck, HeartHandshake, Sparkles, Crown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

type CartOption = {
    name?: string;
    value?: string;
}

type CartItem = {
    id: string;
    product_id?: string;
    product?: {
        id?: string;
        name?: string;
        images?: Array<{ file?: { url?: string } }>;
    };
    price?: number;
    price_total?: number;
    quantity?: number;
    options?: CartOption[];
    metadata?: {
        welcome_box_free_value?: string;
        welcome_box_total_savings?: string;
        welcome_box_volume_discount?: string;
    };
}

// --- CONFIGURATION ---
const FREE_SHIPPING_THRESHOLD = 99;
const RUSH_PROCESSING_FEE = 19.00;

// Tiered Discount System
const DISCOUNT_TIERS = [
    { min: 150, discount: 15, label: '15% OFF', coupon: 'savebig15' },
    { min: 300, discount: 20, label: '20% OFF', coupon: 'savebig20' },
    { min: 500, discount: 25, label: '25% OFF', coupon: 'savebig25' },
];

// TODO: Replace with real Swell Product IDs when available in the dashboard
const RUSH_PROCESSING_PRODUCT_ID = '69e9a9c652ca2a001272aa14'; 
const UPSELL_PRODUCT_ID = '69e9cbd8bb3d1b001278c282';

export function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, addToCart, applyCoupon, removeCoupon, isLoading } = useCart()
    
    // Fallback UI states if API integration for dummy IDs fails
    const [mockRushAdded, setMockRushAdded] = useState(false)
    const [mockUpsellAdded, setMockUpsellAdded] = useState(false)
    const [isActionLoading, setIsActionLoading] = useState(false)

    // Track auto-applied coupon to prevent redundant calls
    const appliedAutoCode = useRef<string | null>(null)
    const isApplyingCoupon = useRef(false)

    const items: CartItem[] = cart?.items || []
    
    // Calculate display subtotal including mock items if API isn't ready
    let subtotal = cart?.sub_total ?? cart?.subTotal ?? items.reduce((sum: number, item) => sum + (item.price_total ?? ((item.price ?? 0) * (item.quantity ?? 1))), 0)
    
    if (mockRushAdded) subtotal += RUSH_PROCESSING_FEE;
    if (mockUpsellAdded) subtotal += 9.99; // mock heirloom rose set price

    // Tiered Discount Progress
    const currentTier = [...DISCOUNT_TIERS].reverse().find(t => subtotal >= t.min) || null;
    const ALL_AUTO_COUPONS = DISCOUNT_TIERS.map(t => t.coupon);
    const currentCartCoupon = cart?.coupon_code || '';
    const isCartCouponAuto = ALL_AUTO_COUPONS.includes(currentCartCoupon);

    // Auto-apply / swap / remove coupon based on subtotal
    useEffect(() => {
        if (!cart || isLoading || isApplyingCoupon.current) return;

        const targetCode = currentTier?.coupon || null;

        // Skip if the correct coupon is already applied
        if (targetCode === appliedAutoCode.current && targetCode === currentCartCoupon) return;
        // Skip if a non-auto (manual) coupon is applied and we shouldn't override it
        if (currentCartCoupon && !isCartCouponAuto && !targetCode) return;

        const syncCoupon = async () => {
            isApplyingCoupon.current = true;
            try {
                if (!targetCode && isCartCouponAuto) {
                    await removeCoupon();
                    appliedAutoCode.current = null;
                } else if (targetCode && targetCode !== currentCartCoupon) {
                    if (currentCartCoupon && isCartCouponAuto) {
                        await removeCoupon();
                    }
                    await applyCoupon(targetCode);
                    appliedAutoCode.current = targetCode;
                }
            } catch (e) {
                console.warn('[AutoDiscount] Coupon sync failed:', e);
            } finally {
                isApplyingCoupon.current = false;
            }
        };

        const timer = setTimeout(syncCoupon, 500);
        return () => clearTimeout(timer);
    }, [subtotal, currentCartCoupon, currentTier, isLoading, cart, applyCoupon, isCartCouponAuto, removeCoupon]);

    if (!isCartOpen) return null

    const handleQuantityChange = async (itemId: string, currentQuantity: number, delta: number) => {
        const newQuantity = Math.max(0, currentQuantity + delta)
        if (newQuantity === 0) {
            await removeFromCart(itemId)
        } else {
            await updateQuantity(itemId, newQuantity)
        }
    }

    const handleToggleRushProcessing = async () => {
        setIsActionLoading(true)
        try {
            const existingItem = items.find((i) => i.product?.id === RUSH_PROCESSING_PRODUCT_ID)
            
            if (existingItem) {
                // Remove it if it is already in the cart
                await removeFromCart(existingItem.id)
                setMockRushAdded(false)
            } else {
                // Add it
                try {
                    await addToCart(RUSH_PROCESSING_PRODUCT_ID, 1)
                } catch (e) {
                    console.warn("Concierge Product ID failed. Using mock state.", e)
                    setMockRushAdded(true)
                }
            }
        } finally {
            setIsActionLoading(false)
        }
    }

    const handleAddUpsell = async () => {
        setIsActionLoading(true)
        try {
            await addToCart(UPSELL_PRODUCT_ID, 1)
        } catch {
            console.warn("Upsell Product ID not configured in Swell. Using mock state.")
            setMockUpsellAdded(true)
        } finally {
            setIsActionLoading(false)
        }
    }

    // Free Shipping Progress
    const amountAwayFromFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
    const progressPercentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
    const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

    // Tiered Discount Display
    const nextTier = DISCOUNT_TIERS.find(t => subtotal < t.min) || null;
    const currentDiscount = currentTier?.discount || 0;
    const savingsAmount = subtotal * (currentDiscount / 100);
    const maxTier = DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1];
    const discountProgress = Math.min(100, (subtotal / maxTier.min) * 100);
    const amountToNextTier = nextTier ? nextTier.min - subtotal : 0;
    
    // To identify if real upsells/rush are in the items array
    const hasRealRush = items.some((i) => i.product?.id === RUSH_PROCESSING_PRODUCT_ID)
    const isRushActive = hasRealRush || mockRushAdded;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-espresso/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            <div className="relative w-full max-w-md bg-cream h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20 bg-cream-dark/50">
                    <h2 className="font-display text-2xl text-espresso flex items-center gap-2">
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 -mr-2 text-espresso hover:text-gold transition-colors duration-300"
                    >
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Free Shipping Progress Bar */}
                {items.length > 0 && (
                    <div className={`px-6 py-4 bg-white ${hasFreeShipping ? '' : 'border-b border-gold/10'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-sans text-xs font-semibold text-espresso uppercase tracking-wider">
                                {amountAwayFromFreeShipping > 0 
                                    ? `You're $${amountAwayFromFreeShipping.toFixed(2)} away from Free Shipping` 
                                    : `✨ You've unlocked Free Shipping!`}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-espresso/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gold transition-all duration-700 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Tiered Discount Progress Bar — only shows after free shipping unlocked */}
                {items.length > 0 && hasFreeShipping && (
                    <div className="px-6 pt-1 pb-4 bg-white border-b border-gold/10">
                        {/* Header text */}
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-sans text-xs font-semibold text-espresso uppercase tracking-wider">
                                {currentTier && !nextTier
                                    ? `🎉 Max discount unlocked — ${currentTier.label}!`
                                    : nextTier
                                        ? `$${amountToNextTier.toFixed(2)} away from ${nextTier.label}`
                                        : 'Spend more, save more!'}
                            </span>
                            {currentDiscount > 0 && (
                                <span className="font-sans text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                    −${savingsAmount.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Multi-tier progress bar */}
                        <div className="relative">
                            {/* Track background */}
                            <div className="h-2 w-full bg-espresso/8 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700 ease-out"
                                    style={{
                                        width: `${discountProgress}%`,
                                        background: currentDiscount >= 25
                                            ? 'linear-gradient(90deg, #C5A467, #A67C3D, #7C5C28)'
                                            : currentDiscount >= 20
                                                ? 'linear-gradient(90deg, #C5A467, #A67C3D)'
                                                : currentDiscount >= 15
                                                    ? 'linear-gradient(90deg, #C5A467, #D4B87A)'
                                                    : '#C5A467',
                                    }}
                                />
                            </div>

                            {/* Tier markers */}
                            <div className="relative h-5 mt-1">
                                {DISCOUNT_TIERS.map((tier) => {
                                    const position = (tier.min / maxTier.min) * 100;
                                    const isReached = subtotal >= tier.min;
                                    return (
                                        <div
                                            key={tier.min}
                                            className="absolute flex flex-col items-center"
                                            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                                        >
                                            {/* Dot / checkmark */}
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all duration-500 ${
                                                isReached
                                                    ? 'bg-gold text-white shadow-sm shadow-gold/40 scale-110'
                                                    : 'bg-espresso/10 text-espresso/40'
                                            }`}>
                                                {isReached ? '✓' : ''}
                                            </div>
                                            {/* Label */}
                                            <span className={`font-sans text-[9px] font-semibold mt-0.5 whitespace-nowrap transition-colors duration-300 ${
                                                isReached ? 'text-gold' : 'text-espresso/30'
                                            }`}>
                                                ${tier.min} · {tier.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading / Empty State */}
                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                    {isLoading && items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-espresso/60 font-sans tracking-wide">
                            Loading your selections...
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display text-2xl text-espresso">Your cart is empty</h3>
                            <p className="font-sans text-espresso/70 text-sm max-w-[250px]">
                                Let&apos;s create something beautiful for your special day.
                            </p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 px-8 py-3.5 bg-espresso text-cream uppercase tracking-widest text-xs font-bold hover:bg-espresso-light transition-colors duration-500 shadow-md"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {/* Line Items */}
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b border-gold/10 pb-6 group">
                                    {/* Product Image */}
                                    <div className="relative w-20 h-28 bg-gray-100 flex-shrink-0 overflow-hidden">
                                        {item.product?.images?.[0]?.file?.url ? (
                                            <Image
                                                src={item.product.images[0].file.url}
                                                alt={item.product?.name || 'Cart item'}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-serif text-lg leading-tight text-espresso pr-4">
                                                {item.product?.name}
                                            </h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-800 transition-colors duration-300 mt-1"
                                                disabled={isLoading}
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} strokeWidth={1.5} />
                                            </button>
                                        </div>

                                        {/* Selected Options */}
                                        <div className="mt-1.5 flex flex-col gap-0.5">
                                            {item.options?.map((opt, idx) => (
                                                <span key={idx} className="font-sans text-[11px] text-gray-500">
                                                    <span className="font-semibold text-espresso">{opt.name}:</span> {opt.value}
                                                </span>
                                            ))}
                                            {item.metadata?.welcome_box_free_value && (
                                                <span className="font-sans text-[11px] text-gray-500">
                                                    <span className="font-semibold text-espresso">Free Box Value:</span> {item.metadata.welcome_box_free_value}
                                                </span>
                                            )}
                                            {item.metadata?.welcome_box_total_savings && (
                                                <span className="font-sans text-[11px] text-gray-500">
                                                    <span className="font-semibold text-espresso">Total Savings:</span> {item.metadata.welcome_box_total_savings}
                                                </span>
                                            )}
                                            {item.metadata?.welcome_box_volume_discount && (
                                                <span className="font-sans text-[11px] text-gray-500">
                                                    <span className="font-semibold text-espresso">Volume Discount:</span> {item.metadata.welcome_box_volume_discount}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center border border-espresso/20 bg-white">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity ?? 1, -1)}
                                                    disabled={isLoading}
                                                    className="p-1.5 text-espresso/70 hover:text-gold hover:bg-cream-dark transition-colors duration-300 disabled:opacity-50"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-sans text-xs font-semibold text-espresso w-8 text-center">
                                                    {item.quantity ?? 1}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity ?? 1, 1)}
                                                    disabled={isLoading}
                                                    className="p-1.5 text-espresso/70 hover:text-gold hover:bg-cream-dark transition-colors duration-300 disabled:opacity-50"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <span className="font-sans font-medium text-espresso">
                                                ${(item.price_total ?? ((item.price ?? 0) * (item.quantity ?? 1))).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* One-Click Upsell Block */}
                            {!mockUpsellAdded && !items.some((i) => i.product?.id === UPSELL_PRODUCT_ID) && (
                                <div className="mt-2 bg-cream-dark/40 p-4 border border-gold/20 flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-white relative flex-shrink-0 overflow-hidden border border-espresso/10">
                                        <Image src="https://cdn.swell.store/customweddingco/69ea40d08a8d0f0012a7ec2e/f15db5b27a760f4da5bf0d3ba6b75970/roses-classic-cream.jpg" alt="Heirloom Rose Set" fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif text-md text-espresso">Everlasting Heirloom Rose Set</h4>
                                        <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5">25 museum-quality faux roses with flexible botanical stems</p>
                                        <span className="font-sans font-medium text-espresso text-xs block mt-1">+$9.99</span>
                                    </div>
                                    <button 
                                        onClick={handleAddUpsell}
                                        disabled={isActionLoading}
                                        className="px-4 py-2 bg-white border border-espresso text-espresso text-xs font-sans tracking-wider uppercase hover:bg-espresso hover:text-white transition-colors duration-300 disabled:opacity-50 whitespace-nowrap"
                                    >
                                        + Add
                                    </button>
                                </div>
                            )}

                        </div>
                    )}
                </div>

                {/* Footer Section (Order Bump, Totals, Trust Zone, Checkout) */}
                {items.length > 0 && (
                    <div className="bg-white border-t border-gold/20 flex flex-col">
                        
                        {/* Concierge Order Bump */}
                        <div className="px-6 py-4 border-b border-espresso/5 flex items-start gap-3 bg-cream/30">
                            <input 
                                type="checkbox" 
                                id="rush-processing"
                                checked={isRushActive}
                                onChange={handleToggleRushProcessing}
                                disabled={isActionLoading}
                                className="mt-1 w-4 h-4 text-gold border-espresso/30 rounded focus:ring-gold"
                            />
                            <div className="flex flex-col">
                                <label htmlFor="rush-processing" className="font-serif text-espresso text-md cursor-pointer select-none flex items-center gap-1.5">
                                    Personal Product Specialist <Crown className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                                </label>
                                <p className="font-sans text-[11px] text-espresso/70 mt-0.5 leading-tight">
                                    1-on-1 dedicated concierge service guiding your heirloom from initial design proofs to final artisan production and shipping. <span className="font-semibold text-espresso block mt-0.5">(+${RUSH_PROCESSING_FEE.toFixed(2)})</span>
                                </p>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-end text-espresso">
                                <div className="flex flex-col">
                                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-espresso/70">Subtotal</span>
                                    <span className="font-sans text-[10px] text-gray-400 mt-0.5">Shipping & taxes calculated at checkout</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    {currentDiscount > 0 && (
                                        <span className="font-sans text-xs text-espresso/40 line-through">${subtotal.toFixed(2)}</span>
                                    )}
                                    <span className="font-serif text-2xl font-medium">
                                        ${currentDiscount > 0 ? (subtotal * (1 - currentDiscount / 100)).toFixed(2) : subtotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Applied discount badge */}
                            {currentDiscount > 0 && isCartCouponAuto && (
                                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 -mt-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 text-sm">🎉</span>
                                        <div>
                                            <span className="font-sans text-xs font-bold text-green-800 uppercase tracking-wider">
                                                {currentTier?.coupon}
                                            </span>
                                            <span className="font-sans text-[10px] text-green-600 ml-1.5">applied</span>
                                        </div>
                                    </div>
                                    <span className="font-sans text-sm font-bold text-green-700">
                                        −${savingsAmount.toFixed(2)}
                                    </span>
                                </div>
                            )}

                            <Link
                                href="/checkout"
                                className="w-full bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 mt-2 text-center hover:bg-espresso-light transition-all duration-500 shadow-md hover:shadow-lg block"
                            >
                                Secure Checkout
                            </Link>

                            {/* Trust & Reassurance Zone */}
                            <div className="flex justify-center items-center gap-6 mt-2">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <ShieldCheck className="w-4 h-4 text-espresso/60" strokeWidth={1.5} />
                                    <span className="font-sans text-[9px] uppercase tracking-wider text-espresso/60">Secure<br/>Checkout</span>
                                </div>
                                <div className="h-6 w-px bg-gold/30"></div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <HeartHandshake className="w-4 h-4 text-espresso/60" strokeWidth={1.5} />
                                    <span className="font-sans text-[9px] uppercase tracking-wider text-espresso/60">Satisfaction<br/>Guaranteed</span>
                                </div>
                                <div className="h-6 w-px bg-gold/30"></div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <Sparkles className="w-4 h-4 text-espresso/60" strokeWidth={1.5} />
                                    <span className="font-sans text-[9px] uppercase tracking-wider text-espresso/60">Made To<br/>Order</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
