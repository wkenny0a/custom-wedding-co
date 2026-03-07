'use client'

import { useState } from 'react'
import { StarRating } from '@/components/ui/StarRating'
import { Plus, Minus, ShieldCheck, Clock, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function ProductInfo({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1)
    const [customNames, setCustomNames] = useState('')
    const [weddingDate, setWeddingDate] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const { addToCart } = useCart()

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta))
    }

    // Extract the primary option (e.g., Material & Size) from Swell data
    const primaryOption = product.options?.length > 0 ? product.options[0] : null
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
        primaryOption?.values?.[0]?.id || null
    )
    const selectedVariantName = primaryOption?.values?.find((v: any) => v.id === selectedVariantId)?.name || ''

    // Helper booleans for Custom Options logic
    const hasCustomNames = product.options?.some((opt: any) => opt.name === 'Custom Names') || false
    const hasWeddingDate = product.options?.some((opt: any) => opt.name === 'Wedding Date') || false

    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            // Build the options array for Swell
            const options = []

            if (primaryOption && selectedVariantName) {
                options.push({ name: primaryOption.name, value: selectedVariantName })
            }

            if (customNames) {
                options.push({ name: 'Custom Names', value: customNames })
            }

            if (weddingDate) {
                options.push({ name: 'Wedding Date', value: weddingDate })
            }

            await addToCart(product._id, quantity, options)

        } catch (error) {
            console.error('Error adding to Swell cart:', error)
            alert("Failed to add to cart. Please try again.")
        } finally {
            setIsAdding(false)
        }
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

            <h1 className="font-display text-4xl lg:text-5xl text-espresso mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: product.name }}></h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gold/20">
                <StarRating rating={product.rating} count={product.reviewCount} />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl text-gold">{product.priceRange}</span>
                {product.priceNote && (
                    <span className="font-sans text-sm text-gray-500 uppercase tracking-wide">{product.priceNote}</span>
                )}
            </div>

            <div
                className="font-sans text-espresso/80 text-base leading-relaxed mb-8 prose prose-sm prose-espresso"
                dangerouslySetInnerHTML={{ __html: product.description || 'A beautifully customized piece for your special day.' }}
            />

            {/* Customization Options */}
            <div className="flex flex-col gap-6 mb-8">
                {/* Dynamic Variant Selector from Swell Options */}
                {primaryOption && (
                    <div className="flex flex-col gap-3">
                        <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">{primaryOption.name} <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {primaryOption.values.map((val: any) => (
                                <button
                                    key={val.id}
                                    onClick={() => setSelectedVariantId(val.id)}
                                    className={`py-3 px-4 border text-sm font-sans font-medium transition-all ${selectedVariantId === val.id
                                        ? 'border-espresso bg-espresso text-cream'
                                        : 'border-gold/30 bg-transparent text-espresso hover:border-gold'
                                        }`}
                                >
                                    {val.name} {val.price ? `(+$${val.price})` : ''}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Dynamic Text Input Customization fields mapped from Swell options */}
                {hasCustomNames && (
                    <div className="flex flex-col gap-3">
                        <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Custom Names <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Emma & Noah"
                            value={customNames}
                            onChange={(e) => setCustomNames(e.target.value)}
                            className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans"
                        />
                    </div>
                )}

                {hasWeddingDate && (
                    <div className="flex flex-col gap-3">
                        <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Wedding Date <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. October 14, 2026"
                            value={weddingDate}
                            onChange={(e) => setWeddingDate(e.target.value)}
                            className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans"
                        />
                    </div>
                )}
            </div>

            {/* Add To Cart Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-gold/20">
                <div className="flex items-center border border-espresso w-full sm:w-32">
                    <button onClick={() => handleQuantityChange(-1)} className="p-3 text-espresso hover:text-gold transition-colors w-10 flex justify-center"><Minus size={16} /></button>
                    <span className="font-sans font-semibold text-espresso flex-1 text-center">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="p-3 text-espresso hover:text-gold transition-colors w-10 flex justify-center"><Plus size={16} /></button>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full flex-1 bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 hover:bg-espresso-light transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isAdding ? 'Adding...' : 'Add To Cart'}
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
