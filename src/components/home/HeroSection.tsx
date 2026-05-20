import { Button } from '@/components/ui/Button'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
    return (
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center w-full overflow-hidden">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-espresso/45 z-10" />
                <Image
                    src="/images/hero_wedding.png"
                    alt="Elegant wedding reception table"
                    fill
                    className="object-cover absolute inset-0 z-0"
                    priority
                />
            </div>

            <div className="relative z-20 max-w-[1280px] w-full px-6 lg:px-12 flex flex-col items-center text-center">
                <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-6 animate-in slide-in-from-bottom-5 fade-in duration-700">
                    Handcrafted with Love
                </span>
                <h1 className="font-display text-cream text-[clamp(2.4rem,5vw,4rem)] leading-tight mb-8 max-w-4xl animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">
                    Heirloom Wedding Details, Custom Crafted For You.
                </h1>
                <p className="font-serif text-cream text-lg sm:text-xl md:text-2xl max-w-2xl text-cream/90 mb-12 italic leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
                    Join 10,000+ brides who elevated their day. Artisanal design, delivered in 2 weeks.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-center animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500">
                    <Button variant="secondary" size="lg" href="/shop" className="shadow-[0_0_20px_rgba(184,154,82,0.3)] hover:shadow-[0_0_30px_rgba(184,154,82,0.5)] border border-gold-light hover:-translate-y-0.5 transition-all duration-300">
                        Design Your Keepsake
                    </Button>
                    <Button variant="outline" size="lg" href="/shop?filter=bestseller" className="border-gold text-cream hover:bg-gold hover:text-espresso">
                        View Bestsellers
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gold animate-bounce">
                <span className="font-sans uppercase text-[0.65rem] tracking-widest font-semibold">Discover</span>
                <ArrowDown size={16} />
            </div>
        </section>
    )
}
