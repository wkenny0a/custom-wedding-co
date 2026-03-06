import Link from 'next/link'

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
                    {Array.from({ length: 8 }).map((_, i) => (
                        <a
                            key={i}
                            href="#"
                            className={`relative aspect-square bg-gray-200 overflow-hidden group ${i >= 6 ? 'hidden lg:block' : ''}`}
                        >
                            <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                                <span className="text-cream text-sm font-sans uppercase tracking-widest font-semibold">Shop Look</span>
                            </div>
                            {/* Image Placeholder */}
                            <div className="w-full h-full bg-espresso-light/10 transition-transform duration-700 group-hover:scale-105" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
