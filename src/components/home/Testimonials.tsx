import Image from 'next/image'
import { ArrowRight, Camera, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { getProductReviews, getReviewSummary } from '@/lib/product-reviews'

export function Testimonials() {
    const reviews = getProductReviews(300)
    const summary = getReviewSummary(reviews)
    const photoReviews = reviews.filter((review) => review.image).slice(0, 3)
    const featureReview = reviews.find((review) => !review.image && review.rating === 5) || reviews[0]

    return (
        <section className="bg-blush-dark/30 py-20 lg:py-28">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
                <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <span className="mb-4 block font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold sm:text-sm">
                            Customer Love
                        </span>
                        <h2 className="font-display text-4xl leading-tight text-espresso md:text-5xl">
                            Real reviews, real wedding details.
                        </h2>
                        <p className="mt-5 font-sans text-base leading-relaxed text-gray-600 md:text-lg">
                            See why couples trust Custom Wedding Co. for personalized gifts, keepsakes, and day-of details that feel thoughtful from the first look.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-5 lg:items-end">
                        <div className="grid grid-cols-3 gap-4 border-y border-gold/25 py-4 text-left lg:min-w-[360px]">
                            <div>
                                <p className="font-display text-3xl text-espresso">{summary.averageRating.toFixed(1)}</p>
                                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600">Avg rating</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-espresso">{summary.reviewCountLabel}</p>
                                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600">Reviews</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-espresso">{summary.productCountLabel}</p>
                                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600">Products</p>
                            </div>
                        </div>

                        <Button href="/reviews" variant="primary" size="md" className="gap-2">
                            Read All Reviews
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid gap-5 sm:grid-cols-3">
                        {photoReviews.map((review) => (
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
                            <StarRating rating={featureReview.rating} starClassName="h-5 w-5" />
                            <p className="mt-6 font-serif text-3xl leading-tight text-cream lg:text-4xl">
                                "{featureReview.text}"
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col gap-5 border-t border-cream/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gold">
                                    {featureReview.reviewerName}
                                </p>
                                <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-cream/75">
                                    {featureReview.productName}
                                </p>
                            </div>
                            <Button href="/reviews" variant="secondary" size="sm" className="shrink-0 gap-2">
                                View Wall
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}
