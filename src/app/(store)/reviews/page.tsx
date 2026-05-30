import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Camera, CheckCircle2, Heart, Sparkles, Star } from 'lucide-react'
import { getProductReviews, getReviewSummary } from '@/lib/product-reviews'
import type { ProductReview } from '@/lib/product-reviews'

export const metadata: Metadata = {
    title: 'Customer Reviews | Custom Wedding Co.',
    description:
        'Read verified Custom Wedding Co. reviews from couples, wedding parties, and guests who ordered personalized wedding gifts, favors, barware, and keepsakes.',
}

const reviewDisplayCount = 1300

const highlights = [
    'Proofs before production',
    'Personalized wedding details',
    'Over 200 products',
]

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5 text-gold" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={`h-3.5 w-3.5 ${index < rating ? 'fill-gold' : 'fill-transparent text-gold/30'}`}
                />
            ))}
        </div>
    )
}

function ReviewCard({ review, index }: { review: ProductReview; index: number }) {
    const isFeatureCard = Boolean(review.image) && index % 9 === 0

    return (
        <article className="mb-5 break-inside-avoid overflow-hidden rounded-lg border border-gold/20 bg-cream shadow-[0_12px_30px_rgba(74,44,42,0.08)] transition-transform duration-500 hover:-translate-y-1">
            {review.image && (
                <div className={`relative w-full overflow-hidden bg-cream-dark ${isFeatureCard ? 'aspect-[4/5]' : 'aspect-square'}`}>
                    <Image
                        src={review.image}
                        alt={`Customer photo for ${review.productName}`}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            )}

            <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-espresso font-serif text-sm font-semibold text-cream">
                            {review.initials}
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate font-sans text-sm font-bold text-espresso">
                                {review.reviewerName}
                            </h3>
                            <p className="font-sans text-xs text-gray-600">{review.date}</p>
                        </div>
                    </div>
                    <Stars rating={review.rating} />
                </div>

                <p className="font-serif text-lg leading-snug text-espresso">
                    &ldquo;{review.text}&rdquo;
                </p>

                <div className="border-t border-gold/20 pt-4">
                    <p className="line-clamp-2 font-sans text-xs uppercase tracking-[0.14em] text-gold">
                        {review.productName}
                    </p>
                    <div className="mt-3 flex items-center gap-2 font-sans text-xs font-semibold text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-gold" />
                        Verified purchase
                    </div>
                </div>
            </div>
        </article>
    )
}

export default function ReviewsPage() {
    const reviews = getProductReviews(reviewDisplayCount)
    const summary = getReviewSummary(reviews)
    const heroImages = reviews.filter((review) => review.image).slice(0, 4)

    return (
        <main className="bg-cream pb-20 text-espresso sm:pb-0">
            <section className="relative overflow-hidden border-b border-gold/20 bg-cream-dark">
                <div className="absolute inset-x-0 top-0 h-32 bg-gold-pale/40" />
                <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-24">
                    <div className="flex flex-col justify-center">
                        <span className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">
                            Customer Love Wall
                        </span>
                        <h1 className="font-display text-4xl leading-tight text-espresso sm:text-6xl lg:text-7xl">
                            Real notes from wedding days, proposal boxes, and party gifts.
                        </h1>
                        <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
                            Browse 1,300+ verified reviews from customers who trusted Custom Wedding Co. with personalized keepsakes, favors, and wedding party gifts.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-3 border-y border-gold/25 py-5 sm:max-w-xl">
                            <div>
                                <p className="font-display text-3xl text-espresso">{summary.reviewCount.toLocaleString()}+</p>
                                <p className="font-sans text-xs uppercase tracking-widest text-gray-600">Reviews</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-espresso">{summary.averageRating.toFixed(1)}</p>
                                <p className="font-sans text-xs uppercase tracking-widest text-gray-600">Avg. rating</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-espresso">200+</p>
                                <p className="font-sans text-xs uppercase tracking-widest text-gray-600">Products</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {highlights.map((highlight) => (
                                <span key={highlight} className="rounded-full border border-gold/30 bg-cream px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-espresso">
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {heroImages.map((review, index) => (
                            <div
                                key={review.id}
                                className={`relative overflow-hidden rounded-lg bg-cream shadow-xl ${index % 2 === 0 ? 'aspect-[4/5]' : 'mt-8 aspect-square'}`}
                            >
                                {review.image && (
                                    <Image
                                        src={review.image}
                                        alt={`Review photo from ${review.reviewerName}`}
                                        fill
                                        priority={index === 0}
                                        sizes="(min-width: 1024px) 280px, 50vw"
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-gold/20 bg-espresso px-4 py-5 text-cream sm:px-6 lg:px-12">
                <div className="mx-auto flex max-w-[1280px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-cream">
                        <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-gold" /> Wedding-ready details</span>
                        <span className="flex items-center gap-2"><Camera className="h-4 w-4 text-gold" /> Real customer photos</span>
                        <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold" /> Personalized and proofed</span>
                    </div>
                    <Link href="/shop" className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors duration-500 hover:text-gold-light">
                        Shop customer favorites
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">
                            The Wall
                        </span>
                        <h2 className="mt-3 font-display text-4xl leading-tight text-espresso sm:text-5xl">
                            1,300+ customer reviews
                        </h2>
                    </div>
                    <p className="max-w-xl font-sans text-sm leading-relaxed text-gray-600">
                        Pulled from the product review export and arranged as a mixed gallery of customer photos and written notes.
                    </p>
                </div>

                <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
                    {reviews.map((review, index) => (
                        <ReviewCard key={review.id} review={review} index={index} />
                    ))}
                </div>
            </section>
        </main>
    )
}
