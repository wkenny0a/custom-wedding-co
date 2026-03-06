import { ProductCard } from '@/components/ui/ProductCard'

export function RelatedProducts({ related = [] }: { related?: any[] }) {
    const displayProducts = related.length > 0 ? related : Array.from({ length: 4 }).map((_, i) => ({
        _id: `related-${i}`,
        name: 'Personalized Silk Wedding Ribbon',
        slug: { current: 'silk-ribbon' },
        price: 18,
        category: { title: 'Day-Of Essentials' },
        rating: 4.7,
        reviewCount: 12,
        images: []
    }))

    return (
        <section className="py-20 lg:py-28 bg-cream border-t border-gold/10">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl text-espresso mb-4">
                        You May Also Love
                    </h2>
                    <div className="w-16 h-px bg-gold" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
