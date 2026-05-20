'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Hotspot {
    id: string
    top: string
    left: string
    productName: string
    price: string
    slug: string
}

const hotspots: Hotspot[] = [
    {
        id: 'welcome-sign',
        top: '35%',
        left: '8%',
        productName: 'Acrylic Welcome Sign',
        price: '$89',
        slug: 'acrylic-welcome-sign',
    },
    {
        id: 'vow-books',
        top: '55%',
        left: '25%',
        productName: 'Custom Vow Books',
        price: '$35',
        slug: 'custom-vow-books',
    },
    {
        id: 'table-number',
        top: '40%',
        left: '52%',
        productName: 'Gold Table Numbers',
        price: '$12',
        slug: 'gold-table-numbers',
    },
    {
        id: 'menu-card',
        top: '72%',
        left: '70%',
        productName: 'Calligraphy Menu Cards',
        price: '$4.50',
        slug: 'calligraphy-menu-cards',
    },
    {
        id: 'place-cards',
        top: '65%',
        left: '42%',
        productName: 'Wax Seal Place Cards',
        price: '$3.25',
        slug: 'wax-seal-place-cards',
    },
]

export function ShopTheLook() {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        Curated Styling
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso mb-4">
                        Shop the Look
                    </h2>
                    <p className="font-sans text-espresso/70 text-base max-w-xl">
                        Tap the dots to discover every piece in this styled tablescape — each one customized just for you.
                    </p>
                </div>

                {/* Shop the Look Image Container */}
                <div className="relative w-full aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm shadow-lg">
                    <Image
                        src="/images/shop_the_look_scene.png"
                        alt="Styled wedding tablescape with custom products"
                        fill
                        className="object-cover"
                    />

                    {/* Hotspot Dots */}
                    {hotspots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute z-20"
                            style={{ top: spot.top, left: spot.left }}
                        >
                            {/* Pulse Ring */}
                            <div className="absolute -inset-2 rounded-full bg-white/30 animate-ping" />

                            {/* Dot */}
                            <button
                                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                                onMouseEnter={() => setActiveHotspot(spot.id)}
                                onMouseLeave={() => setActiveHotspot(null)}
                                className="relative w-6 h-6 rounded-full bg-white/90 border-2 border-gold shadow-lg cursor-pointer hover:bg-gold hover:scale-110 transition-all duration-300 flex items-center justify-center"
                                aria-label={`View ${spot.productName}`}
                            >
                                <span className="w-2 h-2 rounded-full bg-gold" />
                            </button>

                            {/* Tooltip / Product Card */}
                            {activeHotspot === spot.id && (
                                <div
                                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white shadow-xl border border-gold/20 p-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
                                >
                                    <p className="font-serif text-lg text-espresso leading-tight mb-1">
                                        {spot.productName}
                                    </p>
                                    <p className="font-sans text-sm text-gold font-bold mb-3">
                                        {spot.price}
                                    </p>
                                    <Link
                                        href={`/products/${spot.slug}`}
                                        className="font-sans uppercase tracking-wider text-[0.65rem] font-semibold text-espresso hover:text-gold transition-colors underline underline-offset-4"
                                    >
                                        Shop Now →
                                    </Link>
                                    {/* Tooltip Arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gold/20 rotate-45 -mt-1.5" />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Subtle overlay hint */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso/40 to-transparent h-24 z-10 pointer-events-none" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <span className="font-sans uppercase tracking-widest text-[0.6rem] font-semibold text-cream/80 bg-espresso/50 px-4 py-2 backdrop-blur-sm">
                            ✦ Tap the dots to shop each piece
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
