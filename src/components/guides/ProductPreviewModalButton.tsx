'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, X } from 'lucide-react'
import { ProductGallery } from '@/components/products/ProductGallery'
import { ProductInfo } from '@/components/products/ProductInfo'

export type PreviewProduct = {
    _id?: string
    name?: string
    images?: unknown[]
} & Record<string, unknown>

type ProductPreviewModalButtonProps = {
    label: string
    product: PreviewProduct | null
    fallbackHref: string
    className?: string
}

export function ProductPreviewModalButton({
    label,
    product,
    fallbackHref,
    className = '',
}: ProductPreviewModalButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedVariantImageUrl, setSelectedVariantImageUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false)
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    if (!product?._id) {
        return (
            <Link href={fallbackHref} className={className}>
                {label}
                <ArrowRight className="h-4 w-4" />
            </Link>
        )
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={className}
            >
                {label}
                <ArrowRight className="h-4 w-4" />
            </button>

            {isOpen ? (
                <div
                    className="fixed inset-0 z-[90] flex items-end justify-center bg-espresso/70 px-0 py-0 backdrop-blur-sm sm:items-center sm:px-6 sm:py-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Customize ${product.name || 'product'}`}
                >
                    <button
                        type="button"
                        className="absolute inset-0 h-full w-full cursor-default"
                        aria-label="Close product preview"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative z-10 flex max-h-[92svh] w-full max-w-[1180px] flex-col overflow-hidden bg-cream shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:max-h-[88vh] sm:border sm:border-gold/30">
                        <div className="flex items-center justify-between border-b border-gold/20 bg-cream-dark px-4 py-3 sm:px-5">
                            <div className="min-w-0">
                                <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold">
                                    Product Preview
                                </p>
                                <p className="truncate font-serif text-xl leading-tight text-espresso sm:text-2xl">
                                    {product.name || 'Personalized product'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center border border-gold/30 text-espresso transition-colors hover:bg-espresso hover:text-cream"
                                aria-label="Close product preview"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
                                <div>
                                    <ProductGallery
                                        images={product.images}
                                        selectedVariantImageUrl={selectedVariantImageUrl}
                                        onClearVariantImage={() => setSelectedVariantImageUrl(null)}
                                    />
                                    <Link
                                        href={fallbackHref}
                                        className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-espresso"
                                    >
                                        Open full product page
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </Link>
                                </div>

                                <ProductInfo
                                    product={product}
                                    onStyleImageSelect={(url) => setSelectedVariantImageUrl(url)}
                                    hideMobileSticky
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
