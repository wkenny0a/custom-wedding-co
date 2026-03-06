import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'

export function FeaturedProductSpotlights() {
    return (
        <section className="py-20 lg:py-28 bg-cream border-b border-gold/10">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">

                    {/* Spotlight 1 */}
                    <div className="flex flex-col group">
                        <Link href="/products/custom-song-lyrics-art" className="relative aspect-[4/5] bg-gray-200 overflow-hidden mb-8">
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-espresso/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <div className="w-full h-full bg-gray-100 transition-transform duration-700 group-hover:scale-105" />
                        </Link>
                        <div className="flex flex-col items-start pe-8">
                            <span className="uppercase text-xs tracking-[0.18em] text-gray-400 mb-3">Wall Art</span>
                            <h3 className="font-serif text-3xl text-espresso mb-4 group-hover:text-gold transition-colors">
                                Personalized Wedding Song Lyrics Wall Art
                            </h3>
                            <p className="font-sans text-espresso text-sm leading-relaxed mb-6 flex-1">
                                Turn the first song you danced to into a lasting piece of art. Beautifully typeset with your names and wedding date.
                            </p>
                            <div className="flex items-center justify-between w-full border-t border-gold/20 pt-6">
                                <span className="font-sans font-semibold text-lg text-espresso">$25.00</span>
                                <Button variant="outline" size="sm" href="/products/custom-song-lyrics-art">
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Spotlight 2 */}
                    <div className="flex flex-col group md:mt-24">
                        <Link href="/products/custom-vow-books" className="relative aspect-[4/5] bg-gray-200 overflow-hidden mb-8">
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-espresso/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <div className="w-full h-full bg-gray-100 transition-transform duration-700 group-hover:scale-105" />
                        </Link>
                        <div className="flex flex-col items-start pe-8">
                            <span className="uppercase text-xs tracking-[0.18em] text-gray-400 mb-3">Keepsakes</span>
                            <h3 className="font-serif text-3xl text-espresso mb-4 group-hover:text-gold transition-colors">
                                Custom Luxury Wedding Vow Books
                            </h3>
                            <p className="font-sans text-espresso text-sm leading-relaxed mb-6 flex-1">
                                Document the promises you made in beautiful, handcrafted vow books meant to be cherished forever.
                            </p>
                            <div className="flex items-center justify-between w-full border-t border-gold/20 pt-6">
                                <span className="font-sans font-semibold text-lg text-espresso">$35.00 <span className="text-xs font-normal text-gray-500">/ pair</span></span>
                                <Button variant="outline" size="sm" href="/products/custom-vow-books">
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
