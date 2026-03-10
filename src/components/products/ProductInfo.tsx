'use client'

import { useState } from 'react'
import { StarRating } from '@/components/ui/StarRating'
import { Plus, Minus, ShieldCheck, Clock, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function ProductInfo({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1)
    const [customNames, setCustomNames] = useState('')
    const [customCoupleNames, setCustomCoupleNames] = useState('')
    const [weddingDate, setWeddingDate] = useState('')
    const [date, setDate] = useState('')
    const [extraRequests, setExtraRequests] = useState('')
    const [extraInformation, setExtraInformation] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const { addToCart } = useCart()

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta))
    }

    // Extract all select-based variant options
    const variantOptions = product.options?.filter((opt: any) => opt.values && opt.values.length > 0) || []

    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {}
        variantOptions.forEach((opt: any) => {
            if (opt.values && opt.values.length > 0) {
                initial[opt.name] = opt.values[0].name
            }
        })
        return initial
    })

    // Helper booleans for Custom Options logic
    const hasCustomNames = product.options?.some((opt: any) => opt.name === 'Custom Names') || false
    const hasCustomCoupleNames = product.options?.some((opt: any) => opt.name === 'Custom Couple Names') || false
    const hasWeddingDate = product.options?.some((opt: any) => opt.name === 'Wedding Date') || false
    const hasDate = product.options?.some((opt: any) => opt.name === 'Date') || false
    const hasExtraRequests = product.options?.some((opt: any) => opt.name === 'Extra Requests') || false
    const hasExtraInformation = product.options?.some((opt: any) => opt.name === 'Extra Information') || false

    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            // Build the options array for Swell
            const options: any[] = []

            // Push all selected dropdown variants
            Object.entries(selectedVariants).forEach(([key, value]) => {
                options.push({ name: key, value })
            })

            if (customNames) {
                options.push({ name: 'Custom Names', value: customNames })
            }

            if (customCoupleNames) {
                options.push({ name: 'Custom Couple Names', value: customCoupleNames })
            }

            if (weddingDate) {
                options.push({ name: 'Wedding Date', value: weddingDate })
            }

            if (date) {
                options.push({ name: 'Date', value: date })
            }

            if (extraRequests) {
                options.push({ name: 'Extra Requests', value: extraRequests })
            }

            if (extraInformation) {
                options.push({ name: 'Extra Information', value: extraInformation })
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
                {/* Dynamic Variant Selectors from Swell Options */}
                {variantOptions.map((opt: any) => {
                    const isStyleOption = opt.name.toLowerCase() === 'style'

                    return (
                        <div key={opt.id || opt.name} className="flex flex-col gap-3">
                            <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">{opt.name} <span className="text-red-500">*</span></label>

                            {isStyleOption ? (
                                // Render visual swatches if this is a 'Style' variant
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {opt.values.map((val: any, index: number) => {
                                        // 1. Try Sanity-managed style variant image (matched by name)
                                        const sanityMatch = product.styleVariantImages?.find(
                                            (sv: any) => sv.variantName === val.name
                                        )
                                        // 2. Fallback to Swell gallery image by index
                                        const imageUrl = sanityMatch?.imageUrl || product.images?.[index]?.file?.url

                                        return (
                                            <button
                                                key={val.id}
                                                onClick={() => setSelectedVariants(prev => ({ ...prev, [opt.name]: val.name }))}
                                                className={`relative w-full aspect-square border overflow-hidden transition-all ${selectedVariants[opt.name] === val.name
                                                    ? 'ring-2 ring-gold border-transparent'
                                                    : 'border-gold/30 hover:border-gold'
                                                    }`}
                                                aria-label={val.name}
                                                title={val.name}
                                            >
                                                {imageUrl ? (
                                                    // Ensure to use a standard HTML img to avoid Next/Image domain config issues in this rapid patch
                                                    <img
                                                        src={imageUrl}
                                                        alt={val.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-cream/50 text-xs font-sans text-espresso text-center p-2">
                                                        {val.name}
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            ) : (
                                // Standard text buttons for Size, Material, etc.
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {opt.values.map((val: any) => (
                                        <button
                                            key={val.id}
                                            onClick={() => setSelectedVariants(prev => ({ ...prev, [opt.name]: val.name }))}
                                            className={`py-3 px-4 border text-sm font-sans font-medium transition-all ${selectedVariants[opt.name] === val.name
                                                ? 'border-espresso bg-espresso text-cream'
                                                : 'border-gold/30 bg-transparent text-espresso hover:border-gold'
                                                }`}
                                        >
                                            {val.name} {val.price ? `(+$${val.price})` : ''}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}

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

                {hasCustomCoupleNames && (
                    <div className="flex flex-col gap-3">
                        <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Custom Couple Names <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Emma & Noah"
                            value={customCoupleNames}
                            onChange={(e) => setCustomCoupleNames(e.target.value)}
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

                {hasDate && (
                    <div className="flex flex-col gap-3">
                        <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Date <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. October 14, 2026"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans"
                        />
                    </div>
                )}

                {hasExtraRequests && (
                    <div className="flex flex-col gap-3">
                        <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Extra Requests</label>
                        <textarea
                            placeholder="Any special design requests or notes?"
                            value={extraRequests}
                            onChange={(e) => setExtraRequests(e.target.value)}
                            className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans min-h-[100px]"
                        />
                    </div>
                )}

                {hasExtraInformation && (
                    <div className="flex flex-col gap-3">
                        <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Extra Information</label>
                        <textarea
                            placeholder="Any extra details or customization requests?"
                            value={extraInformation}
                            onChange={(e) => setExtraInformation(e.target.value)}
                            className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans min-h-[100px]"
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
        </div>
    )
}
