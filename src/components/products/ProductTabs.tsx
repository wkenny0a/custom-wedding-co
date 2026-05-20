'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Camera, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import type { ProductReview } from '@/lib/product-reviews'

type ReviewSummary = {
    averageRating: number
    imageCount: number
    productCount: number
    reviewCount: number
    reviewCountLabel?: string
    productCountLabel?: string
}

type ProductTabsProps = {
    product: any
    siteReviews?: ProductReview[]
    siteReviewSummary?: ReviewSummary
}

function getProductSlug(product: any) {
    if (typeof product.slug === 'string') return product.slug
    return product.slug?.current || ''
}

function getSeed(value: string) {
    return value.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function pickRotatedReviews(reviews: ProductReview[], seed: number, count: number, step = 7) {
    if (reviews.length === 0) return []

    return Array.from({ length: Math.min(count, reviews.length) }, (_, index) => (
        reviews[(seed + index * step) % reviews.length]
    ))
}

export function ProductTabs({ product, siteReviews = [], siteReviewSummary }: ProductTabsProps) {
    const slug = getProductSlug(product)
    const hasSpecs = product.specifications && product.specifications.length > 0
    const hasReviews = slug !== 'personal-product-specialist'

    const [activeTab, setActiveTab] = useState(hasSpecs ? 'specifications' : (hasReviews ? 'reviews' : 'shipping'))

    const tabs: { id: string, label: string }[] = []

    if (hasSpecs) {
        tabs.push({ id: 'specifications', label: 'Specifications' })
    }

    if (hasReviews) {
        tabs.push({ id: 'reviews', label: 'Reviews' })
    }
    tabs.push({ id: 'shipping', label: 'Shipping' })

    const reviewPreview = useMemo(() => {
        const seed = getSeed(slug || product.name || 'custom-wedding-co')
        const photoPool = siteReviews.filter((review) => review.image)
        const textPool = siteReviews.filter((review) => !review.image && review.rating >= 5)
        const photoReviews = pickRotatedReviews(photoPool, seed, 3)
        const featureReview = textPool[seed % Math.max(textPool.length, 1)] || siteReviews[seed % Math.max(siteReviews.length, 1)]

        return {
            featureReview,
            photoReviews,
        }
    }, [product.name, siteReviews, slug])

    const fallbackSummary: ReviewSummary = {
        averageRating: product.rating || 5,
        imageCount: reviewPreview.photoReviews.length,
        productCount: 1,
        reviewCount: product.reviewCount || siteReviews.length || 0,
        productCountLabel: '200+',
    }

    const summary = siteReviewSummary || fallbackSummary
    const writeReviewHref = `mailto:info@customweddingco.com?subject=${encodeURIComponent(`Review for ${product.name}`)}&body=${encodeURIComponent(`Product: ${product.name}\n\nYour rating:\n\nYour review:\n\nOrder number, if you have it:`)}`

    return (
        <div className="w-full mt-16 pt-16 border-t border-gold/20">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-8 justify-center border-b border-gray-200 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 font-sans text-sm uppercase tracking-widest font-bold transition-all ${activeTab === tab.id
                            ? 'border-b-2 border-espresso text-espresso'
                            : 'text-gray-400 hover:text-espresso'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className={activeTab === 'reviews' ? 'mx-auto max-w-6xl' : 'mx-auto max-w-3xl'}>
                {activeTab === 'specifications' && product.specifications && (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm text-espresso border-collapse">
                            <tbody>
                                {product.specifications.map((spec: any, index: number) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <th className="py-4 font-semibold w-1/3">{spec.key}</th>
                                        <td className="py-4 text-gray-600">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="flex flex-col gap-8">
                        <div className="rounded-lg border border-gold/20 bg-cream p-6 sm:p-8">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-2xl">
                                    <span className="mb-3 block font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
                                        Customer Reviews
                                    </span>
                                    <h3 className="font-display text-3xl leading-tight text-espresso sm:text-4xl">
                                        Real notes from Custom Wedding Co. customers.
                                    </h3>
                                    <p className="mt-4 font-sans text-sm leading-relaxed text-gray-600 sm:text-base">
                                        Browse verified feedback from couples and wedding parties, then share your own experience with this piece.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-3 gap-4 border-y border-gold/25 py-4 text-left lg:min-w-[360px]">
                                        <div>
                                            <p className="font-display text-3xl text-espresso">{summary.averageRating.toFixed(1)}</p>
                                            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600">Avg rating</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl text-espresso">{summary.reviewCountLabel || summary.reviewCount}</p>
                                            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600">Reviews</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl text-espresso">{summary.productCountLabel || '200+'}</p>
                                            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600">Products</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                                        <a
                                            href={writeReviewHref}
                                            className="inline-flex items-center justify-center gap-2 bg-espresso px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-cream shadow-md transition-all duration-250 hover:bg-espresso-light hover:shadow-lg"
                                        >
                                            <Mail className="h-4 w-4" />
                                            Write a Review
                                        </a>
                                        <Button href="/reviews" variant="outline" size="md" className="gap-2">
                                            Read All
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="grid gap-5 sm:grid-cols-3">
                                {reviewPreview.photoReviews.map((review) => (
                                    <article key={review.id} className="overflow-hidden rounded-lg border border-gold/20 bg-cream shadow-[0_14px_34px_rgba(74,44,42,0.08)] transition-transform duration-500 hover:-translate-y-1">
                                        {review.image && (
                                            <div className="relative aspect-[4/5] bg-cream-dark">
                                                <Image
                                                    src={review.image}
                                                    alt={`Customer photo for ${review.productName}`}
                                                    fill
                                                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 33vw, 100vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-3 p-5">
                                            <StarRating rating={review.rating} starClassName="h-3.5 w-3.5" />
                                            <p className="line-clamp-4 font-serif text-lg leading-snug text-espresso">
                                                "{review.text}"
                                            </p>
                                            <div className="border-t border-gold/20 pt-3">
                                                <p className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-espresso">
                                                    {review.reviewerName}
                                                </p>
                                                <p className="mt-1 line-clamp-1 font-sans text-xs text-gray-600">
                                                    {review.productName}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {reviewPreview.featureReview && (
                                <article className="flex flex-col justify-between rounded-lg border border-gold/20 bg-espresso p-8 text-cream shadow-[0_18px_42px_rgba(74,44,42,0.14)] lg:p-10">
                                    <div>
                                        <div className="mb-8 flex flex-wrap gap-3">
                                            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                                                <ShieldCheck className="h-4 w-4" />
                                                Verified notes
                                            </span>
                                            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                                                <Camera className="h-4 w-4" />
                                                Customer photos
                                            </span>
                                        </div>
                                        <StarRating rating={reviewPreview.featureReview.rating} starClassName="h-5 w-5" />
                                        <p className="mt-6 font-serif text-3xl leading-tight text-cream lg:text-4xl">
                                            "{reviewPreview.featureReview.text}"
                                        </p>
                                    </div>

                                    <div className="mt-10 flex flex-col gap-5 border-t border-cream/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gold">
                                                {reviewPreview.featureReview.reviewerName}
                                            </p>
                                            <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-cream/75">
                                                {reviewPreview.featureReview.productName}
                                            </p>
                                        </div>
                                        <Link
                                            href="/reviews"
                                            className="inline-flex shrink-0 items-center justify-center gap-2 bg-gold px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-espresso transition-all duration-250 hover:bg-gold-light"
                                        >
                                            View Wall
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </article>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'shipping' && (
                    <div className="font-sans text-espresso/80 leading-relaxed flex flex-col gap-6">
                        <div>
                            <h4 className="font-bold text-espresso uppercase tracking-widest text-xs mb-2">Processing Time</h4>
                            <p className="text-sm">Once you approve your digital proof, your custom piece enters production. Please allow 3-5 business days for our artisans to craft your order.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-espresso uppercase tracking-widest text-xs mb-2">Shipping Transit</h4>
                            <p className="text-sm border-l-2 border-gold/40 pl-4 py-1 italic mb-2">Free Standard Shipping on orders over $99 within the contiguous US.</p>
                            <ul className="text-sm space-y-1 list-disc list-inside">
                                <li>Standard: 3-5 business days</li>
                                <li>Expedited: 2 business days</li>
                                <li>Overnight: Next business day</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-espresso uppercase tracking-widest text-xs mb-2">Returns Policy</h4>
                            <p className="text-sm">Due to the highly personalized nature of our products, we do not accept returns or exchanges unless the item arrives damaged or contains a spelling error that differs from your approved proof.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
