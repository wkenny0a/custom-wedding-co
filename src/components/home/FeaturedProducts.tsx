import { ProductCard } from '@/components/ui/ProductCard'

// We will fetch from Sanity later, using a dummy prop interface for now
export function FeaturedProducts({ products = [] }: { products?: any[] }) {
    // Dummy data just for rendering if none provided
    const displayProducts = products.length > 0 ? products : Array.from({ length: 8 }).map((_, i) => ({
        _id: `prod-${i}`,
        name: 'Custom Luxury Wedding Vow Books',
        slug: { current: 'custom-vow-books' },
        price: 35,
        priceNote: undefined,
        badge: i === 0 ? 'Bestseller' : i === 2 ? 'Trending' : undefined,
        category: { title: 'Sentimental Gifts' },
        rating: 4.9,
        reviewCount: 24,
        images: []
    }))

    return (
        <section className="py-20 lg:py-28 bg-cream">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        Our Bestsellers
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso mb-6">
                        Most Loved by Couples
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {displayProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
