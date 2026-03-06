import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export function BrandStory() {
    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-[4/5] bg-gray-100 relative z-10 shadow-xl overflow-hidden">
                            {/* Placeholder for story.jpg */}
                            <div className="w-full h-full bg-espresso/5" />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cream-dark z-0 rounded-bl-full hidden sm:block"></div>
                        <div className="absolute -top-6 -right-6 w-48 h-48 border border-gold/30 z-0 hidden lg:block"></div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                            Our Story
                        </span>
                        <h2 className="font-display text-4xl lg:text-5xl text-espresso mb-8 leading-tight">
                            Designed and Crafted <br className="hidden xl:block" />by Love
                        </h2>
                        <div className="font-sans text-espresso/80 text-base leading-relaxed mb-10 flex flex-col gap-4">
                            <p>
                                Custom Wedding Co. was born from a simple belief: your wedding should feel completely, unmistakably yours.
                            </p>
                            <p>
                                Every couple has a unique story — and we believe your wedding products should tell it. From the moment your guests open their invitations to the day you pack away your cherished vow books, we infuse every piece with artisanal care and personalization.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full mb-10 pb-10 border-b border-gold/20">
                            <div className="flex flex-col gap-1">
                                <span className="font-display pl-1 text-3xl text-gold">35K+</span>
                                <span className="font-sans text-xs uppercase tracking-wider text-gray-500 font-semibold">Happy Couples</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-display pl-1 text-3xl text-gold">4.9★</span>
                                <span className="font-sans text-xs uppercase tracking-wider text-gray-500 font-semibold">Average Rating</span>
                            </div>
                            <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                                <span className="font-display pl-1 text-3xl text-gold">24</span>
                                <span className="font-sans text-xs uppercase tracking-wider text-gray-500 font-semibold">Unique Products</span>
                            </div>
                        </div>

                        <Button variant="outline" size="md" href="/our-story">
                            Learn Our Story
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
