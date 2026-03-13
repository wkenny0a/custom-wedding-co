import Link from 'next/link'
import Image from 'next/image'

export function CategoryGrid() {
    const categories = [
        { title: 'Paper Goods', count: 12, slug: 'paper-goods', image: '/images/category_paper.png' },
        { title: 'Signs', count: 8, slug: 'signs', image: '/images/category_signs.png' },
        { title: 'Guest Books', count: 5, slug: 'guest-books', image: '/images/category_guest_books.png' },
        { title: 'Wedding Favors', count: 7, slug: 'wedding-favors', image: '/images/category_favors.png' },
        { title: 'Bridesmaids\' Gifts', count: 6, slug: 'bridesmaids-gifts', image: '/images/category_bridesmaid.png' },
        { title: 'Cake Toppers', count: 4, slug: 'cake-toppers', image: '/images/category_cake_toppers.png' },
        { title: 'Table Décor', count: 9, slug: 'table-decor', image: '/images/category_table_decor.png' },
        { title: 'Keepsakes', count: 6, slug: 'keepsakes', image: '/images/category_keepsakes.png' },
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
