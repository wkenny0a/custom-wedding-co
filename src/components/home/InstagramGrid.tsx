import Image from 'next/image'

const instagramPosts = [
    { src: '/images/instagram_1.png', alt: 'Custom wedding welcome sign with calligraphy and florals' },
    { src: '/images/instagram_2.png', alt: 'Styled reception table with monogram napkins and gold details' },
    { src: '/images/instagram_3.png', alt: 'Bride holding personalized leather vow book' },
    { src: '/images/instagram_4.png', alt: 'Custom wax seal stickers on wedding envelopes' },
    { src: '/images/instagram_5.png', alt: 'Bridesmaids opening personalized gift boxes' },
    { src: '/images/instagram_6.png', alt: 'Wedding cake with custom acrylic cake topper' },
    { src: '/images/instagram_7.png', alt: 'Custom neon Better Together sign on greenery wall' },
    { src: '/images/instagram_8.png', alt: 'Personalized wedding guest book at reception' },
]

export function InstagramGrid() {
    return (
        <section className="py-20 lg:py-28 bg-cream">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        Join The Community
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso mb-6">
                        Share Your Moment
                    </h2>
                    <a href="#" className="font-sans font-medium text-espresso hover:text-gold transition-colors underline underline-offset-4">
                        @customweddingco
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {instagramPosts.map((post, i) => (
                        <a
                            key={i}
                            href="#"
                            className={`relative aspect-square overflow-hidden group ${i >= 6 ? 'hidden lg:block' : ''}`}
                        >
                            <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                                <span className="text-cream text-sm font-sans uppercase tracking-widest font-semibold">Shop Look</span>
                            </div>
                            <Image
                                src={post.src}
                                alt={post.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
