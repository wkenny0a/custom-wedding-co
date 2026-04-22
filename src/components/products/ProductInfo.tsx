'use client'

import { useState, useEffect } from 'react'
import { StarRating } from '@/components/ui/StarRating'
import { Plus, Minus, ShieldCheck, Clock, Truck, Gift, Check, RotateCcw, Upload } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { MultiItemBuilder } from './MultiItemBuilder'
import Link from 'next/link'
import imageCompression from 'browser-image-compression'

export function ProductInfo({ product, onStyleImageSelect }: { product: any, onStyleImageSelect?: (url: string | null) => void }) {
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)
    const [customDesignFile, setCustomDesignFile] = useState<File | null>(null)
    const { addToCart, setIsCartOpen, cart } = useCart()

    // ── Classify options: use Swell's input_type for robust detection ──
    // Variant/select options: have values to choose from
    const isSelectOption = (opt: any) =>
        opt.input_type === 'select' || (opt.values && opt.values.length > 0 && opt.input_type !== 'short_text' && opt.input_type !== 'long_text')
    // Text input options: user types custom text
    const isTextInputOption = (opt: any) =>
        opt.input_type === 'short_text' || opt.input_type === 'long_text' ||
        (opt.variant === false && (!opt.values || opt.values.length === 0))

    const variantOptions = product.options?.filter((opt: any) => opt.active !== false && isSelectOption(opt)) || []
    const textOptions = product.options?.filter((opt: any) => opt.active !== false && isTextInputOption(opt)) || []

    // Per-item option names come from Sanity config (for multi-buy products)
    const perItemOptionNames: string[] = product.perItemOptionNames || []
    const isMultiBuy = product.isMultiBuy && perItemOptionNames.length > 0

    // Separate text options: per-item vs shared
    const perItemTextOptions = textOptions.filter((opt: any) => perItemOptionNames.includes(opt.name))
    const sharedTextOptions = textOptions.filter((opt: any) => !perItemOptionNames.includes(opt.name))

    // For non-multi-buy: use heuristic to detect per-item fields for Option A
    const isPerItemField = (name: string) => {
        const lower = name.toLowerCase()
        return lower.includes('name') || lower.includes('role') || lower.includes('title')
    }
    const optionAPerItemOptions = textOptions.filter((opt: any) => isPerItemField(opt.name))
    const optionASharedOptions = textOptions.filter((opt: any) => !isPerItemField(opt.name))
    const hasPerItemFieldsForOptionA = optionAPerItemOptions.length > 0

    // ── State: variant selections ──
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {}
        variantOptions.forEach((opt: any) => {
            if (opt.values && opt.values.length > 0) {
                initial[opt.name] = opt.values[0].name
            }
        })
        return initial
    })

    // ── State: text field values ──
    const [textFieldValues, setTextFieldValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {}
        textOptions.forEach((opt: any) => {
            initial[opt.name] = ''
        })
        return initial
    })

    const updateTextField = (name: string, value: string) => {
        setTextFieldValues(prev => ({ ...prev, [name]: value }))
    }

    // ── Option A: "Add & Customize Next" state ──
    const [itemsAdded, setItemsAdded] = useState(0)
    const [justAdded, setJustAdded] = useState<string | null>(null) // Name of the item just added, for toast

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta))
    }

    // Build the options array for Swell from current state
    const buildOptionsArray = () => {
        const options: any[] = []
        Object.entries(selectedVariants).forEach(([key, value]) => {
            options.push({ name: key, value })
        })
        Object.entries(textFieldValues).forEach(([key, value]) => {
            if (value?.trim()) {
                options.push({ name: key, value: value.trim() })
            }
        })
        return options
    }

    const uploadCustomDesignFile = async (): Promise<string | null> => {
        if (!customDesignFile) return null;
        
        let fileToUpload = customDesignFile;

        // Compress images automatically so Vercel does not block 4.5MB+ payloads
        if (customDesignFile.type.startsWith('image/')) {
            try {
                fileToUpload = await imageCompression(customDesignFile, {
                    maxSizeMB: 3.5, // Keep under 4MB limit
                    maxWidthOrHeight: 2500,
                    useWebWorker: true,
                });
            } catch (error) {
                console.warn('Image compression failed, attempting original file...', error);
            }
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);
        
        if (cart && cart.id) {
            formData.append('cartId', cart.id);
        } else {
            throw new Error("Unable to upload custom design: Invalid shopping cart session. Please refresh.");
        }
        
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        
        if (!res.ok) {
            let errorText = 'Failed to upload custom design';
            try {
                const err = await res.json();
                errorText = err.error || errorText;
            } catch (e) {
                errorText = await res.text();
            }
            throw new Error(
                res.status === 413 || errorText.includes('Entity Too Large') 
                ? 'File is too large! Please upload a file smaller than 4MB, OR an image we can automatically compress.' 
                : errorText
            );
        }
        
        const data = await res.json();
        return data.url;
    }

    // Standard add to cart
    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            const options = buildOptionsArray();
            if (customDesignFile) {
                const url = await uploadCustomDesignFile();
                if (url) {
                    options.push({ name: 'Custom Design File', value: url });
                }
            }
            await addToCart(product._id, quantity, options)
        } catch (error: any) {
            console.error('Error adding to Swell cart:', error)
            alert(error.message || "Failed to add to cart. Please try again.")
        } finally {
            setIsAdding(false)
        }
    }

    // Option A: Add & Customize Next
    const handleAddAndNext = async () => {
        setIsAdding(true)
        try {
            const options = buildOptionsArray();
            if (customDesignFile) {
                const url = await uploadCustomDesignFile();
                if (url) {
                    options.push({ name: 'Custom Design File', value: url });
                }
            }
            await addToCart(product._id, 1, options)

            // Determine a label for the toast
            const perItemFields = isMultiBuy ? perItemTextOptions : optionAPerItemOptions
            const nameField = perItemFields.find((o: any) => o.name.toLowerCase().includes('name'))
            const addedLabel = nameField ? textFieldValues[nameField.name] : `Item ${itemsAdded + 1}`

            setItemsAdded(prev => prev + 1)
            setJustAdded(addedLabel)

            // Reset only per-item text fields
            const resetFieldNames = perItemFields.map((o: any) => o.name)
            setTextFieldValues(prev => {
                const updated = { ...prev }
                resetFieldNames.forEach((name: string) => { updated[name] = '' })
                return updated
            })

            // Clear toast after 2.5s
            setTimeout(() => setJustAdded(null), 2500)

            // Auto-open cart when all items in the set are added
            if (itemsAdded + 1 >= quantity) {
                setTimeout(() => setIsCartOpen(true), 1000)
            }
        } catch (error) {
            console.error('Error adding to Swell cart:', error)
            alert("Failed to add to cart. Please try again.")
        } finally {
            setIsAdding(false)
        }
    }

    // Shared options object for MultiItemBuilder
    const sharedOptionsForBuilder: Record<string, string> = {
        ...selectedVariants,
        ...Object.fromEntries(
            sharedTextOptions.map((opt: any) => [opt.name, textFieldValues[opt.name] || ''])
        ),
    }

    // Helper to render a text input field
    const renderTextField = (opt: any) => {
        const isTextarea = opt.name.toLowerCase().includes('request') || opt.name.toLowerCase().includes('extra information')
        const isDate = opt.name.toLowerCase().includes('date')

        return (
            <div key={opt.name} className="flex flex-col gap-3">
                <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">
                    {opt.name} {opt.required !== false && <span className="text-red-500">*</span>}
                </label>
                {isTextarea ? (
                    <textarea
                        placeholder={opt.description || `Enter ${opt.name.toLowerCase()}`}
                        value={textFieldValues[opt.name] || ''}
                        onChange={(e) => updateTextField(opt.name, e.target.value)}
                        className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans min-h-[100px]"
                    />
                ) : (
                    <input
                        type={isDate ? 'text' : 'text'}
                        placeholder={opt.description || (isDate ? 'e.g. October 14, 2026' : `Enter ${opt.name.toLowerCase()}`)}
                        value={textFieldValues[opt.name] || ''}
                        onChange={(e) => updateTextField(opt.name, e.target.value)}
                        className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors font-sans"
                    />
                )}
            </div>
        )
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

            {/* ─── Customization Options ─── */}
            <div className="flex flex-col gap-6 mb-8">
                {/* Variant Selectors (always shared) */}
                {variantOptions.map((opt: any) => {
                    const isStyleOption = opt.name.toLowerCase() === 'style'
                    const isDesignStyleOption = opt.name.toLowerCase().includes('design')
                    const isQuantityOption = opt.name.toLowerCase().includes('quantity')
                    const isDropdownOption = isDesignStyleOption || isQuantityOption

                    // Check if "Custom Design" is currently selected for this option
                    const selectedValue = selectedVariants[opt.name] || ''
                    const isCustomDesignSelected = isDesignStyleOption && selectedValue.toLowerCase().includes('custom design')

                    return (
                        <div key={opt.id || opt.name} className="flex flex-col gap-3">
                            <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">{opt.name} <span className="text-red-500">*</span></label>

                            {isStyleOption ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {opt.values.map((val: any, index: number) => {
                                        const sanityMatch = product.styleVariantImages?.find(
                                            (sv: any) => sv.variantName === val.name
                                        )
                                        const imageUrl = sanityMatch?.imageUrl || product.images?.[index]?.file?.url

                                        return (
                                            <button
                                                key={val.id}
                                                onClick={() => {
                                                    setSelectedVariants(prev => ({ ...prev, [opt.name]: val.name }))
                                                    if (onStyleImageSelect) onStyleImageSelect(imageUrl || null)
                                                }}
                                                className={`relative w-full aspect-square border overflow-hidden transition-all ${selectedVariants[opt.name] === val.name
                                                    ? 'ring-2 ring-gold border-transparent'
                                                    : 'border-gold/30 hover:border-gold'
                                                    }`}
                                                aria-label={val.name}
                                                title={val.name}
                                            >
                                                {imageUrl ? (
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
                            ) : isDropdownOption ? (
                                <>
                                    <select
                                        value={selectedVariants[opt.name] || ''}
                                        onChange={(e) => {
                                            setSelectedVariants(prev => ({ ...prev, [opt.name]: e.target.value }))
                                            // Clear uploaded file if switching away from Custom Design
                                            if (isDesignStyleOption && !e.target.value.toLowerCase().includes('custom design')) {
                                                setCustomDesignFile(null)
                                            }
                                        }}
                                        className="w-full bg-transparent border border-gold/40 px-4 py-3 text-sm font-sans text-espresso focus:outline-none focus:border-espresso transition-colors appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234A2C2A' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                                    >
                                        {opt.values.map((val: any) => (
                                            <option key={val.id || val.name} value={val.name}>
                                                {val.name} {val.price && !val.name.includes('@') ? `— $${val.price.toFixed(2)}` : ''}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Custom Design Upload — appears when Design #12 (Custom Design) is selected */}
                                    {isCustomDesignSelected && (
                                        <div className="flex flex-col gap-2 p-4 border border-dashed border-gold/40 bg-cream/30 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="font-sans text-xs font-bold uppercase tracking-widest text-espresso/70">Upload Your Custom Design</label>
                                            <p className="font-sans text-xs text-espresso/50">Upload an image of your custom design (PNG, JPG, or PDF).</p>
                                            <label
                                                className="flex items-center gap-3 px-4 py-3 border border-gold/40 bg-white cursor-pointer hover:border-espresso transition-colors"
                                            >
                                                <Upload size={16} className="text-gold flex-shrink-0" />
                                                <span className="font-sans text-sm text-espresso truncate">
                                                    {customDesignFile ? customDesignFile.name : 'Choose file...'}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    className="hidden"
                                                    onChange={(e) => setCustomDesignFile(e.target.files?.[0] || null)}
                                                />
                                            </label>
                                            {customDesignFile && (
                                                <div className="flex items-center gap-2 text-xs font-sans text-green-700">
                                                    <Check size={14} />
                                                    <span>File selected: {customDesignFile.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
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
                                            {val.name} {val.price && !val.name.includes('@') ? `(+$${val.price})` : ''}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}

                {/* ─── Shared Text Fields (Multi-buy only) ─── */}
                {isMultiBuy && sharedTextOptions.map(renderTextField)}

                {/* ─── MULTI-BUY: Party Builder (Option B) ─── */}
                {isMultiBuy ? (
                    <MultiItemBuilder
                        product={product}
                        perItemOptionNames={perItemOptionNames}
                        sharedOptions={sharedOptionsForBuilder}
                        uploadCustomDesignFile={uploadCustomDesignFile}
                    />
                ) : (
                    <>
                        {/* ─── STANDARD / OPTION A: All Text Fields in exact Swell order ─── */}
                        {textOptions.map(renderTextField)}

                        {/* Items Added Toast */}
                        {justAdded && (
                            <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 text-green-800 text-sm font-sans animate-in slide-in-from-top-2 fade-in duration-300">
                                <Check size={16} className="text-green-600 flex-shrink-0" />
                                <span><strong>{justAdded}</strong> added to cart!</span>
                            </div>
                        )}

                        {/* Running Count Badge */}
                        {itemsAdded > 0 && !justAdded && (
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-cream border border-gold/30 text-espresso text-sm font-sans">
                                <span className="w-5 h-5 bg-gold text-cream text-xs font-bold flex items-center justify-center rounded-full">
                                    {itemsAdded}
                                </span>
                                <span>{itemsAdded} {itemsAdded === 1 ? 'item' : 'items'} added so far</span>
                            </div>
                        )}

                        {/* Quantity + Add To Cart Row */}
                        <div className="flex flex-col gap-3">
                            {/* Quantity Dropdown — hidden when a variant option already represents quantity */}
                            {!variantOptions.some((opt: any) => opt.name.toLowerCase().includes('quantity')) && (
                            <div className="flex flex-col gap-2">
                                <label className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Quantity</label>
                                <select
                                    value={quantity}
                                    onChange={(e) => {
                                        const newQty = Number(e.target.value)
                                        setQuantity(newQty)
                                        // Reset the add-next counter when qty changes
                                        setItemsAdded(0)
                                        setJustAdded(null)
                                    }}
                                    className="w-full sm:w-40 bg-transparent border border-gold/40 px-4 py-3 text-sm font-sans text-espresso focus:outline-none focus:border-espresso transition-colors appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234A2C2A' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                                >
                                    {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            )}

                            {/* Button: depends on quantity */}
                            {quantity === 1 || !hasPerItemFieldsForOptionA ? (
                                /* Standard: Add to Cart */
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className="w-full bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 hover:bg-espresso-light transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isAdding ? 'Adding...' : 'Add To Cart'}
                                </button>
                            ) : (
                                /* Multi-qty: Add & Customize Next loop */
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleAddAndNext}
                                        disabled={isAdding || itemsAdded >= quantity}
                                        className="flex-1 bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 hover:bg-espresso-light transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isAdding ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                                                Adding...
                                            </>
                                        ) : itemsAdded >= quantity ? (
                                            <>
                                                <Check size={15} />
                                                All {quantity} Added!
                                            </>
                                        ) : (
                                            <>
                                                <RotateCcw size={15} />
                                                Add & Customize Next ({itemsAdded + 1} of {quantity})
                                            </>
                                        )}
                                    </button>

                                    {itemsAdded > 0 && (
                                        <button
                                            onClick={() => setIsCartOpen(true)}
                                            className="px-6 py-4 border border-espresso text-espresso font-sans font-bold uppercase tracking-widest text-sm hover:bg-espresso hover:text-cream transition-colors"
                                        >
                                            View Cart ({itemsAdded})
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Proximity Trust Signals */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/20">
                            <div className="flex items-center gap-1.5 text-espresso/80">
                                <ShieldCheck size={15} className="text-gold" />
                                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Secure<br className="sm:hidden" /> Checkout</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-espresso/80">
                                <Truck size={15} className="text-gold" />
                                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Secure<br className="sm:hidden" /> Shipping</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-espresso/80">
                                <Check size={15} className="text-gold" />
                                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Satisfaction<br className="sm:hidden" /> Guarantee</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Bundle & Save Section */}
            {product.bundleProducts && product.bundleProducts.length > 0 && (
                <div className="border border-gold/30 bg-cream/30 p-5">
                    <div className="flex items-center gap-2.5 mb-4">
                        <Gift className="text-gold w-5 h-5" />
                        <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">Bundle It & Receive 20% Off!</h3>
                    </div>
                    <p className="font-sans text-xs text-espresso/70 mb-4">Add any of these items to your order for a 20% bundle discount.</p>
                    <div className="flex flex-col gap-3">
                        {product.bundleProducts.map((bp: any) => {
                            const originalPrice = Number(bp.price) || 0
                            const discountedPrice = (originalPrice * 0.8).toFixed(2)
                            const slug = bp.slug?.current || bp.slug

                            return (
                                <div key={bp.name} className="flex items-center gap-3 p-3 border border-gold/20 bg-white hover:border-gold/50 transition-colors">
                                    {bp.imageUrl && (
                                        <img
                                            src={bp.imageUrl}
                                            alt={bp.name}
                                            className="w-14 h-14 object-cover flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/products/${slug}`}
                                            className="font-sans text-sm font-medium text-espresso hover:text-gold transition-colors line-clamp-1"
                                        >
                                            {bp.name}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="font-sans text-xs text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                                            <span className="font-sans text-sm font-semibold text-gold">${discountedPrice}</span>
                                        </div>
                                    </div>
                                    <span className="font-sans text-[10px] uppercase tracking-wider bg-gold/10 text-gold px-2 py-1 font-bold flex-shrink-0">
                                        -20%
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
