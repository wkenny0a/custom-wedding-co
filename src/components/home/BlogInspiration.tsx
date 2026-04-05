import Link from 'next/link'
import Image from 'next/image'

export function BlogInspiration() {
    const articles = [
        {
            title: 'The Complete Guide to Wedding Invitation Etiquette',
            excerpt: 'From wording to timing — everything you need to know about your invitation suite, decoded for modern couples.',
            category: 'Paper Goods',
            image: '/images/blog_invitations.png',
            slug: '/blog/wedding-invitation-etiquette',
        },
        {
            title: 'Styling Your Wedding Day: Tips From Our Creative Team',
            excerpt: 'How to create a cohesive aesthetic from ceremony to reception, using personalized details that tell your story.',
            category: 'Planning',
            image: '/images/blog_planning.png',
            slug: '/blog/styling-your-wedding-day',
        },
        {
            title: '10 Thoughtful Bridesmaids\' Gift Ideas They\'ll Actually Love',
            excerpt: 'Move beyond the generic — discover personalized keepsakes that celebrate each member of your bridal party.',
            category: 'Gifts',
            image: '/images/blog_dresses.png',
            slug: '/blog/bridesmaid-gift-ideas',
        },
    ]

    return (
        <section className="py-20 lg:py-28 bg-cream-dark">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        Wedding Journal
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso mb-4">
                        Inspiration & Ideas
                    </h2>
                    <p className="font-sans text-espresso/70 text-base max-w-xl">
                        Expert advice, styling tips, and real wedding features to help plan your dream celebration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, i) => (
                        <Link
                            href={article.slug}
                            key={i}
                            className="group bg-white border border-gold/10 overflow-hidden hover:shadow-lg transition-shadow duration-500"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <span className="font-sans uppercase tracking-widest text-[0.65rem] font-bold text-gold mb-3 block">
                                    {article.category}
                                </span>
                                <h3 className="font-serif text-xl lg:text-2xl text-espresso leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <p className="font-sans text-sm text-espresso/70 leading-relaxed mb-4">
                                    {article.excerpt}
                                </p>
                                <span className="font-sans uppercase tracking-wider text-xs font-semibold text-espresso group-hover:text-gold transition-colors duration-300">
                                    Read More →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
