import Link from 'next/link'
import Image from 'next/image'

export function ShopByMoment() {
    const moments = [
        {
            title: 'Ceremony',
            subtitle: 'Signs, vow books & ceremony essentials',
            slug: 'ceremony',
            image: '/images/moment_ceremony.png',
        },
        {
            title: 'Reception',
            subtitle: 'Table décor, menus & guest books',
            slug: 'reception',
            image: '/images/moment_reception.png',
        },
        {
            title: 'Getting Ready',
            subtitle: 'Robes, gifts & bridal suite must-haves',
            slug: 'getting-ready',
            image: '/images/moment_getting_ready.png',
        },
        {
            title: 'Gifts',
            subtitle: 'Personalized keepsakes for your favorite people',
            slug: 'gifts',
            image: '/images/moment_gifts.png',
        },
    ]

    return (
        <section className="py-20 lg:py-28 bg-cream-dark">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        Plan Your Day
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso mb-4">
                        Shop by Moment
                    </h2>
                    <p className="font-sans text-espresso/70 text-base max-w-xl">
                        From the first look to the last dance — find everything you need for every part of your celebration.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {moments.map((moment, i) => (
                        <Link
                            href={`/shop?moment=${moment.slug}`}
                            key={i}
                            className="group relative aspect-[4/3] overflow-hidden"
                        >
                            {/* Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={moment.image}
                                    alt={moment.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
                                <h3 className="font-display text-3xl lg:text-4xl text-cream mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                                    {moment.title}
                                </h3>
                                <p className="font-serif italic text-cream/80 text-base lg:text-lg mb-4">
                                    {moment.subtitle}
                                </p>
                                <span className="font-sans uppercase tracking-widest text-xs font-semibold text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                    Shop Now →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
