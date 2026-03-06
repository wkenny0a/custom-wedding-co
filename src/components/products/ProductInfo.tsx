'use client'

import { useState } from 'react'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'
import { Minus, Plus, ShieldCheck, Clock, Truck } from 'lucide-react'

export function ProductInfo({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1)
    const [selectedVariant, setSelectedVariant] = useState('standard')

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta))
    }

    // Snipcart item attributes are used directly on the Add to Cart button
    const snipcartProps = {
        'className': 'snipcart-add-item w-full',
        'data-item-id': product._id,
        'data-item-price': product.price,
        'data-item-url': `/products/${product.slug.current}`,
        'data-item-image': '/placeholder.jpg',
        'data-item-name': product.name,
        'data-item-custom1-name': 'Variant',
        'data-item-custom1-options': 'Standard|Premium[+15.00]',
        'data-item-custom1-value': selectedVariant === 'standard' ? 'Standard' : 'Premium',
    }

    return (
        <div className="flex flex-col w-full text-left">
            {/* Breadcrumb & Badge */}
            <div className="flex flex-col gap-3 mb-4">
                <div className="font-sans text-xs uppercase tracking-widest text-gray-400">
                    Home / Shop / {product.category?.title} / <span className="text-espresso font-semibold">{product.name}</span>
                </div>
                {product.badge && (
                    <span className="inline-block bg-cream border border-gold/30 text-espresso px-3 py-1 text-xs uppercase tracking-widest font-bold self-start">
                        {product.badge}
                    </span>
                )}
            </div>

            <h1 className="font-display text-4xl lg:text-5xl text-espresso mb-4 leading-tight">
                {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gold/20">
                <StarRating rating={product.rating} count={product.reviewCount} />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl text-gold">${product.price.toFixed(2)}</span>
                {product.priceNote && (
                    <span className="font-sans text-sm text-gray-500 uppercase tracking-wide">{product.priceNote}</span>
                )}
            </div>

            <p className="font-sans text-espresso/80 text-base leading-relaxed mb-8">
                {product.shortDescription || 'A beautifully customized piece for your special day. Perfect for capturing memories and celebrating love with a uniquely personal touch.'}
            </p>

            {/* Customization Options */}
            <div className="flex flex-col gap-6 mb-8">
                {/* Variant Selector */}
                <div className="flex flex-col gap-3">
                    <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Select Option <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setSelectedVariant('standard')}
                            className={`py-3 px-4 border text-sm font-sans font-medium transition-all ${selectedVariant === 'standard'
                                    ? 'border-espresso bg-espresso text-cream'
                                    : 'border-gold/30 bg-transparent text-espresso hover:border-gold'
                                }`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setSelectedVariant('premium')}
                            className={`py-3 px-4 border text-sm font-sans font-medium transition-all ${selectedVariant === 'premium'
                                    ? 'border-espresso bg-espresso text-cream'
                                    : 'border-gold/30 bg-transparent text-espresso hover:border-gold'
                                }`}
                        >
                            Premium (+$15)
                        </button>
                    </div>
                </div>

                {/* Text Input Customization */}
                <div className="flex flex-col gap-3">
                    <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Custom Names <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="e.g. Emma & Noah"
                        className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Wedding Date</label>
                    <input
                        type="text"
                        placeholder="e.g. October 12, 2025"
                        className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans"
                    />
                </div>
            </div>

            {/* Add To Cart Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-gold/20">
                <div className="flex items-center border border-espresso w-full sm:w-32">
                    <button onClick={() => handleQuantityChange(-1)} className="p-3 text-espresso hover:text-gold transition-colors w-10 flex justify-center"><Minus size={16} /></button>
                    <span className="font-sans font-semibold text-espresso flex-1 text-center">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="p-3 text-espresso hover:text-gold transition-colors w-10 flex justify-center"><Plus size={16} /></button>
                </div>

                <button {...snipcartProps} className="flex-1 bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 hover:bg-espresso-light transition-colors shadow-md hover:shadow-lg">
                    Add To Cart
                </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-gold w-5 h-5 flex-shrink-0" />
                    <span className="font-sans text-sm text-espresso font-medium">Personalization Included</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="text-gold w-5 h-5 flex-shrink-0" />
                    <span className="font-sans text-sm text-espresso font-medium">Digital Proof Sent Within 24hrs</span>
                </div>
                <div className="flex items-center gap-3">
                    <Truck className="text-gold w-5 h-5 flex-shrink-0" />
                    <span className="font-sans text-sm text-espresso font-medium">Free Shipping on Orders $75+</span>
                </div>
            </div>
        </div>
    )
}
