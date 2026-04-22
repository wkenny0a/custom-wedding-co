'use client'

import { useCart } from '@/context/CartContext'
import { X, Minus, Plus, ShoppingBag, Trash2, ShieldCheck, HeartHandshake, Sparkles, Zap, PackagePlus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// --- CONFIGURATION ---
const FREE_SHIPPING_THRESHOLD = 99;
const RUSH_PROCESSING_FEE = 15.00;

// TODO: Replace with real Swell Product IDs when available in the dashboard
const RUSH_PROCESSING_PRODUCT_ID = 'mock_rush_processing_id'; 
const UPSELL_PRODUCT_ID = 'mock_upsell_wax_seals_id';

export function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, addToCart, isLoading } = useCart()
    
    // Fallback UI states if API integration for dummy IDs fails
    const [mockRushAdded, setMockRushAdded] = useState(false)
    const [mockUpsellAdded, setMockUpsellAdded] = useState(false)
    const [isActionLoading, setIsActionLoading] = useState(false)

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
            // Attempt to add a real product. If it fails, fallback to local state for demo.
            if (!mockRushAdded) {
                try {
                    await addToCart(RUSH_PROCESSING_PRODUCT_ID, 1)
                } catch (e) {
                    console.warn("Rush Processing Product ID not configured in Swell. Using mock state.")
                    setMockRushAdded(true)
                }
            } else {
                setMockRushAdded(false)
                // In a real scenario, we'd find the item in cart and Remove it.
            }
        } finally {
            setIsActionLoading(false)
        }
    }

    const handleAddUpsell = async () => {
        setIsActionLoading(true)
        try {
            await addToCart(UPSELL_PRODUCT_ID, 1)
        } catch (e) {
            console.warn("Upsell Product ID not configured in Swell. Using mock state.")
            setMockUpsellAdded(true)
        } finally {
            setIsActionLoading(false)
        }
    }

    const items = cart?.items || []
    
    // Calculate display subtotal including mock items if API isn't ready
    let subtotal = cart?.sub_total ?? cart?.subTotal ?? items.reduce((sum: number, item: any) => sum + ((item.price_total ?? item.price ?? 0) * (item.quantity ?? 1)), 0)
    
    if (mockRushAdded) subtotal += RUSH_PROCESSING_FEE;
    if (mockUpsellAdded) subtotal += 25; // mock wax seal price

    // Free Shipping Progress
    const amountAwayFromFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
    const progressPercentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
    
    // To identify if real upsells/rush are in the items array
    const hasRealRush = items.some((i: any) => i.product?.id === RUSH_PROCESSING_PRODUCT_ID)
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
                    <div className="px-6 py-4 bg-white border-b border-gold/10">
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
                                Let's create something beautiful for your special day.
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
                            {items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 border-b border-gold/10 pb-6 group">
                                    {/* Product Image */}
                                    <div className="relative w-20 h-28 bg-gray-100 flex-shrink-0 overflow-hidden">
                                        {item.product?.images?.[0]?.file?.url ? (
                                            <Image
                                                src={item.product.images[0].file.url}
                                                alt={item.product.name}
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
                                            {item.options?.map((opt: any, idx: number) => (
                                                <span key={idx} className="font-sans text-[11px] text-gray-500">
                                                    <span className="font-semibold text-espresso">{opt.name}:</span> {opt.value}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center border border-espresso/20 bg-white">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                                    disabled={isLoading}
                                                    className="p-1.5 text-espresso/70 hover:text-gold hover:bg-cream-dark transition-colors duration-300 disabled:opacity-50"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-sans text-xs font-semibold text-espresso w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                                    disabled={isLoading}
                                                    className="p-1.5 text-espresso/70 hover:text-gold hover:bg-cream-dark transition-colors duration-300 disabled:opacity-50"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <span className="font-sans font-medium text-espresso">
                                                ${((item.price_total ?? item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* One-Click Upsell Block */}
                            {!mockUpsellAdded && !items.some((i: any) => i.product?.id === UPSELL_PRODUCT_ID) && (
                                <div className="mt-2 bg-cream-dark/40 p-4 border border-gold/20 flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-white relative flex-shrink-0 flex items-center justify-center border border-espresso/10">
                                        <PackagePlus className="w-6 h-6 text-gold" strokeWidth={1} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif text-md text-espresso">Hand-Poured Wax Seals</h4>
                                        <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5">Add an elegant finishing touch to your suite</p>
                                        <span className="font-sans font-medium text-espresso text-xs block mt-1">+$25.00</span>
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
                        
                        {/* Rush Processing Order Bump */}
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
                                    Rush My Order <Zap className="w-3.5 h-3.5 text-orange" fill="currentColor" />
                                </label>
                                <p className="font-sans text-xs text-espresso/70 mt-0.5">
                                    Move to the front of the production queue <span className="font-semibold text-espresso">(+${RUSH_PROCESSING_FEE.toFixed(2)})</span>
                                </p>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-end text-espresso">
                                <div className="flex flex-col">
                                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-espresso/70">Subtotal</span>
                                    <span className="font-sans text-[10px] text-gray-400 mt-0.5">Shipping & taxes calculated at checkout</span>
                                </div>
                                <span className="font-serif text-2xl font-medium">${subtotal.toFixed(2)}</span>
                            </div>

                            <a
                                href={cart?.checkoutUrl || cart?.checkout_url || '#'}
                                className={`w-full bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 mt-2 text-center hover:bg-espresso-light transition-all duration-500 shadow-md hover:shadow-lg ${!(cart?.checkoutUrl || cart?.checkout_url) ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                Secure Checkout
                            </a>

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
