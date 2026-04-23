import Link from 'next/link'
import Image from 'next/image'

export function CategoryGrid() {
    const categories = [
        { title: 'Stationery & Paper', count: 3, slug: 'stationery-paper-goods', image: '/images/category_paper.png' },
        { title: 'Signs & Signage', count: 3, slug: 'welcome-signs-signage', image: '/images/category_signs.png' },
        { title: 'Wedding Keepsakes', count: 4, slug: 'wedding-keepsakes', image: '/images/category_guest_books.png' },
        { title: 'Favors & Gifts', count: 9, slug: 'favors-gifts', image: '/images/category_favors.png' },
        { title: 'Bridal Party Gifts', count: 11, slug: 'bridal-party-gifts', image: '/images/category_bridesmaid.png' },
        { title: 'Ceremony Details', count: 5, slug: 'ceremony-details', image: '/images/category_cake_toppers.png' },
        { title: 'Tabletop & Bar', count: 6, slug: 'tabletop-barware', image: '/images/category_table_decor.png' },
        { title: 'Groomsmen Gifts', count: 5, slug: 'groomsmen-gifts', image: '/images/category_keepsakes.png' },
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

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {categories.map((cat, i) => (
                        <Link
                            href={`/shop/${cat.slug}`}
                            key={i}
                            className={`group relative overflow-hidden bg-espresso text-cream flex items-end p-6 lg:p-8 ${
                                i < 4 ? 'aspect-[3/4]' : 'aspect-[3/3.5]'
                            }`}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-colors duration-500" />
                            </div>

                            <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                <h3 className="font-serif text-xl lg:text-2xl xl:text-3xl mb-1">{cat.title}</h3>
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
