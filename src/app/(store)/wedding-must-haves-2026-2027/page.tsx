import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
    title: '2026/2027 Wedding Must-Haves for Guest Experience | Custom Wedding Co.',
    description: 'Discover personalized wedding guest experience ideas for 2026 and 2027, from engraved glassware and ceremony fans to premium favors and custom bar details.',
}

export default function WeddingMustHavesGuidePage() {
    return (
        <main className="min-h-screen bg-cream text-espresso pb-24 md:pb-0">
            {/* 1. Hero Section */}
            <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/guides/wedding-must-haves-2026-2027/hero-cover.png"
                        alt="2026/2027 Wedding Guide: Welcome Table"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6 pt-20">
                    <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-gold font-bold">
                        2026/2027 Wedding Guide
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-cream tracking-wide drop-shadow-lg leading-tight">
                        Wedding Must-Haves for an<br className="hidden md:block" />
                        <span className="italic text-gold-pale">Unforgettable Guest Experience</span>
                    </h1>
                    <p className="font-sans text-lg md:text-xl text-cream-dark max-w-3xl mx-auto font-light tracking-wide mb-10">
                        Thoughtful, personalized details your guests will notice, use, photograph, and remember.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full sm:w-auto">
                        <Button variant="primary" size="lg" href="/shop/favors-party-extras" className="w-full sm:w-auto">
                            Shop the 2026 Must-Haves
                        </Button>
                        <Button variant="outline" size="lg" href="#must-haves" className="w-full sm:w-auto">
                            See the 4 Ideas
                        </Button>
                    </div>
                    <div className="pt-6 font-sans text-xs md:text-sm text-cream/80 tracking-wider flex flex-wrap gap-x-4 gap-y-2 justify-center">
                        <span>Free personalization</span>
                        <span className="hidden sm:inline text-gold">•</span>
                        <span>Digital proof before production</span>
                        <span className="hidden sm:inline text-gold">•</span>
                        <span>Bulk-friendly wedding details</span>
                    </div>
                </div>
            </section>

            {/* 2. Intro / Why This Matters */}
            <section className="w-full py-24 px-6 bg-cream-dark text-center border-b border-gold/20">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="font-serif text-3xl md:text-5xl text-espresso">
                        Beyond Generic Favors
                    </h2>
                    <p className="font-sans text-lg text-espresso/80 leading-relaxed font-light max-w-3xl mx-auto">
                        Couples are moving away from traditional, throwaway favors. The best modern wedding details are beautiful, useful, and fiercely personal. From navigating the escort display to enjoying a signature cocktail, these pieces keep your guests comfortable and leave them with something truly worth keeping.
                    </p>
                </div>
            </section>

            {/* 2.5 Jump Section */}
            <section className="w-full py-12 px-6 bg-cream border-b border-gold/20">
                <div className="max-w-4xl mx-auto space-y-8 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-espresso">Shop the 4 Must-Haves</h2>
                    <p className="font-sans text-lg text-espresso/80 font-light">Choose the guest detail your carousel ad brought you here for.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="#pint-glasses" className="p-4 border border-espresso/10 rounded hover:border-gold hover:shadow-md transition-all bg-white group flex flex-col items-center justify-center gap-2">
                            <span className="font-sans font-bold text-xs uppercase tracking-wider text-espresso group-hover:text-gold text-center">Engraved Pint Glasses</span>
                        </Link>
                        <Link href="#ceremony-fans" className="p-4 border border-espresso/10 rounded hover:border-gold hover:shadow-md transition-all bg-white group flex flex-col items-center justify-center gap-2">
                            <span className="font-sans font-bold text-xs uppercase tracking-wider text-espresso group-hover:text-gold text-center">Ceremony Fans</span>
                        </Link>
                        <Link href="#agate-coasters" className="p-4 border border-espresso/10 rounded hover:border-gold hover:shadow-md transition-all bg-white group flex flex-col items-center justify-center gap-2">
                            <span className="font-sans font-bold text-xs uppercase tracking-wider text-espresso group-hover:text-gold text-center">Agate Coasters</span>
                        </Link>
                        <Link href="#acrylic-stirrers" className="p-4 border border-espresso/10 rounded hover:border-gold hover:shadow-md transition-all bg-white group flex flex-col items-center justify-center gap-2">
                            <span className="font-sans font-bold text-xs uppercase tracking-wider text-espresso group-hover:text-gold text-center">Acrylic Stirrers</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. Shoppable Must-Have Sections */}
            <section id="must-haves" className="w-full py-10">
                
                {/* A. Pint Glasses */}
                <article id="pint-glasses" className="scroll-mt-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center py-16 px-6">
                    <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden shadow-xl order-1 md:order-1">
                        <Image src="https://cdn.swell.store/customweddingco/69f34fc567ff990012341b7e/e1d7687ebd3916066a368d9a736bfb93/change_all_the_designs_to_202604302045.jpeg" alt="Engraved Pint Glasses Escort Display" fill className="object-cover" />
                    </div>
                    <div className="space-y-6 order-2 md:order-2">
                        <span className="font-serif text-6xl text-gold/30 block -mb-4">01</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-espresso">Engraved Pint Glasses That Double as Escort Cards</h3>
                        <p className="font-sans text-lg text-espresso/80 font-light">
                            Solve two wedding logistics at once. A stunning glassware display helps guests find their seats and gives them a premium vessel for the night. Long after the reception ends, it becomes their favorite glass at home.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Escort Display</span>
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Drinkware</span>
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Keepsake</span>
                        </div>
                        <div className="bg-white/50 border border-gold/20 p-4 rounded-sm flex flex-col gap-1 text-sm font-sans text-espresso/80 mb-6">
                            <span className="font-bold text-espresso">From $19.99</span>
                            <span>Best for escort displays + cocktail hour</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider rounded-sm">Proof Included</span>
                                <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider rounded-sm">Bulk-Friendly</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button href="/products/bespoke-engraved-groomsmen-pint-glass">Shop Personalized Glassware</Button>
                        </div>
                    </div>
                </article>

                {/* B. Handheld Fans */}
                <article id="ceremony-fans" className="scroll-mt-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center py-16 px-6">
                    <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden shadow-xl order-1 md:order-2">
                        <Image src="https://cdn.swell.store/customweddingco/69f051206748980012da193c/b65529525e7a785985e2631ad348879e/lets_keep_the_202604281352.jpeg" alt="Handheld Fans for Ceremony" fill className="object-cover" />
                    </div>
                    <div className="space-y-6 order-2 md:order-1">
                        <span className="font-serif text-6xl text-gold/30 block -mb-4">02</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-espresso">Handheld Fans for Warm Ceremony Days</h3>
                        <p className="font-sans text-lg text-espresso/80 font-light">
                            Nothing disrupts a beautiful outdoor summer ceremony quite like uncomfortable guests. These elegant, personalized handheld fans provide instant relief while tying seamlessly into your upscale wedding aesthetic.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Guest Comfort</span>
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Summer Weddings</span>
                        </div>
                        <div className="bg-white/50 border border-gold/20 p-4 rounded-sm flex flex-col gap-1 text-sm font-sans text-espresso/80 mb-6">
                            <span>Best for outdoor ceremonies</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider rounded-sm">Proof Included</span>
                                <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider rounded-sm">Bulk-Friendly</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button href="/products/bespoke-keepsake-handheld-fan">Shop Ceremony Fans</Button>
                        </div>
                    </div>
                </article>

                {/* Social Proof */}
                <div className="w-full bg-espresso text-cream py-16 px-6 my-10 border-y border-gold/20">
                    <div className="max-w-5xl mx-auto space-y-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-cream/10 pb-10">
                            <div className="space-y-2"><span className="block font-display text-3xl md:text-4xl text-gold-pale">10,000+</span><span className="font-sans text-sm uppercase tracking-widest text-cream/70">Couples</span></div>
                            <div className="space-y-2"><span className="block font-display text-3xl md:text-4xl text-gold-pale">4.9</span><span className="font-sans text-sm uppercase tracking-widest text-cream/70">Average Rating</span></div>
                            <div className="space-y-2"><span className="block font-display text-3xl md:text-4xl text-gold-pale">100%</span><span className="font-sans text-sm uppercase tracking-widest text-cream/70">Digital Proofs</span></div>
                            <div className="space-y-2"><span className="block font-display text-3xl md:text-4xl text-gold-pale">Yes</span><span className="font-sans text-sm uppercase tracking-widest text-cream/70">Bulk Orders</span></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <p className="font-sans text-sm md:text-base text-cream/90 italic">&quot;The glassware display became one of our guests&apos; favorite details.&quot;</p>
                            <p className="font-sans text-sm md:text-base text-cream/90 italic">&quot;Our proof was perfect and everything arrived beautifully packaged.&quot;</p>
                            <p className="font-sans text-sm md:text-base text-cream/90 italic">&quot;The personalized favors felt so much more elevated than anything generic.&quot;</p>
                        </div>
                    </div>
                </div>

                {/* Mid-Page Conversion Band */}
                <div className="w-full bg-cream-dark py-20 px-6 my-10 text-center border-y border-gold/20">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h3 className="font-display text-4xl md:text-5xl text-espresso">Make Every Guest Detail Feel Intentional</h3>
                        <p className="font-sans text-lg text-espresso/80 font-light">
                            From ceremony comfort to cocktail hour keepsakes, every piece can be personalized to your names, date, monogram, or wedding style.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button variant="primary" href="/shop/favors-party-extras" className="w-full sm:w-auto">Shop All Personalized Wedding Favors</Button>
                            <Button variant="outline" href="/shop/barware-drinkware" className="w-full sm:w-auto">Explore Barware Details</Button>
                        </div>
                    </div>
                </div>

                {/* C. Agate Coasters */}
                <article id="agate-coasters" className="scroll-mt-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center py-16 px-6">
                    <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden shadow-xl order-1 md:order-1">
                        <Image src="https://cdn.swell.store/customweddingco/69f4312fa09a9c0012b491f0/5e998da9cc03820d069ceb449627c533/replace_the_design_with_this_202605011248.jpeg" alt="Gold-Gilded Agate Coasters" fill className="object-cover" />
                    </div>
                    <div className="space-y-6 order-2 md:order-2">
                        <span className="font-serif text-6xl text-gold/30 block -mb-4">03</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-espresso">Gold-Gilded Agate Coasters as Premium Favors</h3>
                        <p className="font-sans text-lg text-espresso/80 font-light">
                            Elevate your place settings with these stunning natural agate coasters edged in gold. They are the ultimate premium favor—a beautiful piece of home decor your guests will actually use and cherish.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Premium Favor</span>
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Place Setting</span>
                        </div>
                        <div className="bg-white/50 border border-gold/20 p-4 rounded-sm flex flex-col gap-1 text-sm font-sans text-espresso/80 mb-6">
                            <span>Premium favor · Place setting detail</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider rounded-sm">Proof Included</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button href="/products/bespoke-gold-gilded-agate-coaster">Shop Agate Coasters</Button>
                        </div>
                    </div>
                </article>

                {/* D. Acrylic Stirrers */}
                <article id="acrylic-stirrers" className="scroll-mt-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center py-16 px-6">
                    <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden shadow-xl order-1 md:order-2">
                        <Image src="https://cdn.swell.store/customweddingco/69f202a02c69ec00120aa03f/253563317b42557c3483c4190de960e6/lets_replace_the_design_with_202604292059.jpeg" alt="Custom Acrylic Stirrers" fill className="object-cover" />
                    </div>
                    <div className="space-y-6 order-2 md:order-1">
                        <span className="font-serif text-6xl text-gold/30 block -mb-4">04</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-espresso">Custom Acrylic Stirrers for the Bar Moment</h3>
                        <p className="font-sans text-lg text-espresso/80 font-light">
                            The bar is the focal point of any reception. Add a &quot;wow&quot; factor to your signature cocktails with custom engraved acrylic stirrers. It&apos;s the small, photo-worthy detail that ties the whole room together.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Signature Drinks</span>
                            <span className="px-3 py-1 bg-white border border-espresso/10 text-xs uppercase tracking-wider text-espresso/60 font-bold rounded-full">Cocktail Hour</span>
                        </div>
                        <div className="bg-white/50 border border-gold/20 p-4 rounded-sm flex flex-col gap-1 text-sm font-sans text-espresso/80 mb-6">
                            <span>Best for signature drinks · Cocktail hour detail</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider rounded-sm">Bulk-Friendly</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button href="/products/bespoke-acrylic-cocktail-stirrers">Shop Acrylic Stirrers</Button>
                        </div>
                    </div>
                </article>

            </section>

            {/* 5. Trust / Process Section */}
            <section className="w-full py-24 px-6 bg-cream-dark border-t border-b border-gold/20">
                <div className="max-w-5xl mx-auto text-center space-y-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-espresso">The Custom Wedding Co. Process</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Process steps */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center font-serif text-2xl font-bold">1</div>
                            <h4 className="font-sans font-bold text-espresso uppercase tracking-wider text-sm">Choose Detail</h4>
                            <p className="font-sans text-sm text-espresso/70 font-light">Select your perfect guest experience item.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center font-serif text-2xl font-bold">2</div>
                            <h4 className="font-sans font-bold text-espresso uppercase tracking-wider text-sm">Personalize</h4>
                            <p className="font-sans text-sm text-espresso/70 font-light">Add names, dates, monograms, or artwork.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center font-serif text-2xl font-bold">3</div>
                            <h4 className="font-sans font-bold text-espresso uppercase tracking-wider text-sm">Review Proof</h4>
                            <p className="font-sans text-sm text-espresso/70 font-light">Approve your digital proof before production starts.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center font-serif text-2xl font-bold">4</div>
                            <h4 className="font-sans font-bold text-espresso uppercase tracking-wider text-sm">Craft & Ship</h4>
                            <p className="font-sans text-sm text-espresso/70 font-light">We carefully craft and ship your bespoke order.</p>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 font-sans text-sm text-espresso/80 font-bold uppercase tracking-widest">
                        <span>Free Personalization</span>
                        <span className="hidden md:inline text-gold">•</span>
                        <span>Bulk-Friendly</span>
                        <span className="hidden md:inline text-gold">•</span>
                        <span>Free Shipping Over $99</span>
                    </div>
                </div>
            </section>

            {/* 5.5 More 2026/2027 Must-Haves */}
            <section className="w-full py-24 px-6 bg-cream border-t border-gold/20">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="font-serif text-3xl md:text-5xl text-espresso">More 2026/2027 Guest Experiences & Keepsakes</h2>
                        <p className="font-sans text-lg text-espresso/80 font-light">Explore even more personalized details to elevate your wedding day.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Product 1 */}
                        <Link href="/products/bespoke-gold-embossed-passport-cover" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/6a039340d6a8e6001264e356/68fe65c7bd7f0b6bd18110b65d8b24df/Create_a_realistic_lifestyle_product_202605130443.jpeg" alt="Passport Cover" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Leather Passport Cover</h4>
                            </div>
                        </Link>

                        {/* Product 2 */}
                        <Link href="/products/bespoke-leather-cigar-case" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/6a038e67d6a8e6001264a486/31606f8525ad32ff478b0bd88f8a961e/Create_a_refined_groomsmen_gift_202605130430.jpeg" alt="Leather Cigar Case" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Leather Cigar Case & Cutter</h4>
                            </div>
                        </Link>

                        {/* Product 3 */}
                        <Link href="/products/gold-celebration-cannon" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/6a038a6ca37e31001160bfa8/97bcec8c02673cdcf9d61f2a9e99bc98/Create_a_realistic_wedding_celebration_202605130414.jpeg" alt="Gold Celebration Cannon" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Gold Celebration Cannon</h4>
                            </div>
                        </Link>

                        {/* Product 4 */}
                        <Link href="/products/bespoke-engraved-black-stainless-steel-chopsticks" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/6a0372701a06f200119d97f3/0a9416afe48e2abf60088d04cfe8f059/replace_the_logo_with_this_202605130217.jpeg" alt="Engraved Stainless Steel Chopsticks" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Engraved Stainless Chopsticks</h4>
                            </div>
                        </Link>

                        {/* Product 5 */}
                        <Link href="/products/heirloom-engraved-cutlery-set" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/6a036139a3e25200127e8a5d/ce497ef9f92bd91cc9c91ccf525397aa/change_the_frame_of_the_202605130116.jpeg" alt="Engraved Cutlery Set" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Engraved Cutlery Set</h4>
                            </div>
                        </Link>

                        {/* Product 6 */}
                        <Link href="/products/heirloom-walnut-ring-dish" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/69f438174adb1d0011b5144b/a3e816727a99c5ac4490902a31b7b62f/replace_both_logo_with_this_202605011308.jpeg" alt="Walnut Ring Dish" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Walnut Ring Dish</h4>
                            </div>
                        </Link>

                        {/* Product 7 */}
                        <Link href="/products/bespoke-leather-golf-pouch" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/69f8b1ef4878f7001280546f/93baf9def68e8d0889a1c54238e4a456/can_we_change_the_logo_202605042246.jpeg" alt="Leather Golf Pouch" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Leather Golf Pouch</h4>
                            </div>
                        </Link>

                        {/* Product 8 */}
                        <Link href="/products/bespoke-engraved-heirloom-bottle-opener" className="group flex flex-col space-y-4 cursor-pointer">
                            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/50 border border-espresso/5 shadow-sm group-hover:shadow-md transition-shadow">
                                <Image src="https://cdn.swell.store/customweddingco/69f309a2a0af65001167184f/30cc5cd5374ee7ba239741c839e6f314/lets_replace_the_design_with_202604301522.jpeg" alt="Heirloom Bottle Opener" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h4 className="font-sans font-semibold text-sm text-espresso uppercase tracking-wider line-clamp-2">Heirloom Bottle Opener</h4>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="w-full py-24 px-6 bg-cream">
                <div className="max-w-3xl mx-auto space-y-12">
                    <h2 className="font-serif text-3xl md:text-4xl text-espresso text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="border-b border-espresso/10 pb-6">
                            <h4 className="font-sans font-bold text-espresso mb-2">Can I personalize these for each guest?</h4>
                            <p className="font-sans text-espresso/70 font-light">Absolutely! Items like our pint glasses and coasters can be individually engraved with each guest&apos;s name to double as escort cards or place settings.</p>
                        </div>
                        <div className="border-b border-espresso/10 pb-6">
                            <h4 className="font-sans font-bold text-espresso mb-2">How far before the wedding should I order?</h4>
                            <p className="font-sans text-espresso/70 font-light">We recommend ordering 6-8 weeks before your wedding date to allow ample time for proofing, artisan production, and shipping. If you need something faster, our acrylic stirrers typically ship the quickest.</p>
                        </div>
                        <div className="border-b border-espresso/10 pb-6">
                            <h4 className="font-sans font-bold text-espresso mb-2">Will I see a proof before production?</h4>
                            <p className="font-sans text-espresso/70 font-light">Yes. You will receive a digital proof for every personalized item. We do not begin production until you are 100% happy with the design.</p>
                        </div>
                        <div className="border-b border-espresso/10 pb-6">
                            <h4 className="font-sans font-bold text-espresso mb-2">Do you offer bulk pricing?</h4>
                            <p className="font-sans text-espresso/70 font-light">Yes! We specialize in large wedding orders. Automatic bulk pricing tiers are applied directly on the product pages.</p>
                        </div>
                        <div className="border-b border-espresso/10 pb-6">
                            <h4 className="font-sans font-bold text-espresso mb-2">Which items are best for outdoor weddings?</h4>
                            <p className="font-sans text-espresso/70 font-light">Our bespoke handheld fans are an absolute must for outdoor summer ceremonies to keep your guests cool and comfortable.</p>
                        </div>
                        <div>
                            <h4 className="font-sans font-bold text-espresso mb-2">Which items work best as guest favors?</h4>
                            <p className="font-sans text-espresso/70 font-light">Our gold-gilded agate coasters and personalized glassware are overwhelmingly the most loved and kept favors by wedding guests.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Final CTA */}
            <section className="w-full py-32 px-6 bg-blush text-center">
                <div className="max-w-4xl mx-auto space-y-10">
                    <h2 className="font-display text-4xl md:text-6xl text-espresso leading-tight">
                        Ready to Create the Guest Details Everyone Remembers?
                    </h2>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4">
                        <Button variant="primary" size="lg" href="/shop/favors-party-extras">Shop Guest Experience Details</Button>
                        <Button variant="outline" size="lg" href="/shop/barware-drinkware">Explore Barware</Button>
                        <Button variant="ghost" size="lg" href="/shop/bridal-party-gifts">Shop Bridal Party Gifts</Button>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <Link href="#must-haves" className="flex items-center justify-center w-full bg-espresso text-cream font-sans font-bold uppercase tracking-widest text-sm py-4 rounded shadow-2xl border border-gold/30 hover:bg-espresso/90 transition-colors">
                    Shop the Must-Haves
                </Link>
            </div>
        </main>
    )
}
