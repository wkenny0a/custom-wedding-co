import Link from 'next/link'

export function CategoryGrid() {
    const categories = [
        { title: 'Paper Goods', count: 12, slug: 'paper-goods' },
        { title: 'Décor & Signage', count: 8, slug: 'decor-signage' },
        { title: 'Keepsakes', count: 6, slug: 'keepsakes' },
        { title: 'Sentimental Gifts', count: 4, slug: 'sentimental-gifts' },
    ]

    return (
        <section className="py-20 lg:py-28 bg-white border-y border-gold/10">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gray-400 font-bold text-xs sm:text-sm mb-4">
                        Shop by Category
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso mb-6">
                        Find Exactly What You Need
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <Link
                            href={`/shop/${cat.slug}`}
                            key={i}
                            className="group relative aspect-[3/4] overflow-hidden bg-espresso text-cream flex items-end p-8"
                        >
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-espresso-light opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-0"></div>

                            <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                <h3 className="font-serif text-2xl lg:text-3xl mb-1">{cat.title}</h3>
                                <p className="font-sans text-xs uppercase tracking-widest text-gold-pale opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {cat.count} Products
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
