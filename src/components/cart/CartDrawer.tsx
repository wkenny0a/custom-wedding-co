'use client'

import { useCart } from '@/context/CartContext'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'

export function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, isLoading } = useCart()

    if (!isCartOpen) return null

    const handleQuantityChange = async (itemId: string, currentQuantity: number, delta: number) => {
        const newQuantity = Math.max(0, currentQuantity + delta)
        if (newQuantity === 0) {
            await removeFromCart(itemId)
        } else {
            await updateQuantity(itemId, newQuantity)
        }
    }

    const items = cart?.items || []
    const subtotal = cart?.sub_total ?? cart?.subTotal ?? items.reduce((sum: number, item: any) => sum + ((item.price_total ?? item.price ?? 0) * (item.quantity ?? 1)), 0)

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-espresso/30 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            <div className="relative w-full max-w-md bg-cream h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gold/20">
                    <h2 className="font-display text-2xl text-espresso flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Your Cart
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 -mr-2 text-espresso hover:text-gold transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Loading / Empty State */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {isLoading && items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-espresso/60 font-sans">
                            Loading cart...
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                            <ShoppingBag className="w-12 h-12 text-gold/50" />
                            <p className="font-sans text-espresso/60">Your cart is currently empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 px-6 py-3 border border-espresso text-espresso uppercase tracking-widest text-xs font-bold hover:bg-espresso hover:text-cream transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item: any) => (
                            <div key={item.id} className="flex gap-4 border-b border-gold/10 pb-6">
                                {/* Product Image */}
                                <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0">
                                    {item.product?.images?.[0]?.file?.url ? (
                                        <Image
                                            src={item.product.images[0].file.url}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
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
                                            className="text-gray-400 hover:text-red-500 transition-colors mt-1"
                                            disabled={isLoading}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Selected Options (e.g., Size & Material, Custom Names) */}
                                    <div className="mt-1 flex flex-col gap-0.5">
                                        {item.options?.map((opt: any, idx: number) => (
                                            <span key={idx} className="font-sans text-xs text-gray-500">
                                                <span className="font-semibold text-espresso/70">{opt.name}:</span> {opt.value}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center border border-espresso/30 bg-white">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                                disabled={isLoading}
                                                className="p-1.5 text-espresso hover:text-gold transition-colors disabled:opacity-50"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-sans text-xs font-semibold text-espresso w-6 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                                disabled={isLoading}
                                                className="p-1.5 text-espresso hover:text-gold transition-colors disabled:opacity-50"
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
                        ))
                    )}
                </div>

                {/* Footer Section (Totals & Checkout) */}
                {items.length > 0 && (
                    <div className="border-t border-gold/20 p-6 bg-cream/50 flex flex-col gap-4">
                        <div className="flex justify-between items-center text-espresso">
                            <span className="font-sans text-sm uppercase tracking-wider">Subtotal</span>
                            <span className="font-serif text-xl">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="font-sans text-xs text-gray-400">
                            Shipping and taxes calculated at checkout.
                        </p>

                        <a
                            href={cart?.checkoutUrl || cart?.checkout_url || '#'}
                            className={`w-full bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 text-center hover:bg-espresso-light transition-colors shadow-md ${!(cart?.checkoutUrl || cart?.checkout_url) ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            Proceed to Checkout
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
