/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getLowestDisplayPrice } from '@/lib/swell';
import { ProductPreviewModalButton, type PreviewProduct } from '@/components/guides/ProductPreviewModalButton';

export const metadata = {
    title: '2026/2027 Wedding Must-Haves for Guest Experience | Custom Wedding Co.',
    description: 'Discover personalized wedding guest experience ideas for 2026 and 2027, from custom glassware and ceremony fans to premium favors, golf weekend gifts, cocktail napkins, and bar details.',
    openGraph: {
        images: ['/images/campaigns/wedding-must-haves-2026-2027/hero.png'],
    }
};

export const dynamic = 'force-dynamic';

const FEATURED_SLUGS = [
    'bespoke-engraved-heirloom-bottle-opener',
    'bespoke-monogram-cocktail-napkins',
    'bespoke-frosted-acrylic-wedding-cups',
    'bespoke-keepsake-handheld-fan',
    'personlaized-champagne-glass-custom-champagne-glass-wedding-favor',
    'personlaized-wine-glass-custom-wine-glass-wedding-favor',
    'bespoke-personalized-golf-balls',
    'bespoke-beers-birdies-neoprene-can-cooler',
    'custom-ceramic-ring-dish-personalized-heirloom-trinket-tray'
];

const PRICE_FALLBACKS: Record<string, number> = {
    'bespoke-engraved-heirloom-bottle-opener': 19.99,
    'bespoke-monogram-cocktail-napkins': 19.99,
    'bespoke-frosted-acrylic-wedding-cups': 99.99,
    'bespoke-keepsake-handheld-fan': 19.99,
    'personlaized-champagne-glass-custom-champagne-glass-wedding-favor': 29.99,
    'personlaized-wine-glass-custom-wine-glass-wedding-favor': 29.99,
    'bespoke-personalized-golf-balls': 24.99,
    'bespoke-beers-birdies-neoprene-can-cooler': 12.99,
    'custom-ceramic-ring-dish-personalized-heirloom-trinket-tray': 29.99,
};

const SECTIONS_DATA = [
    {
        slug: 'bespoke-engraved-heirloom-bottle-opener',
        id: 'engraved-bottle-openers',
        headline: 'Engraved Bottle Openers for the Home Bar',
        purpose: 'A useful wedding favor or groomsmen-adjacent gift that guests can keep long after the reception. It works especially well for bar-focused weddings, welcome parties, golf weekends, and cocktail-hour gifting.',
        chips: ['Bar Details', 'Groomsmen Gifts', 'Wedding Favors', 'Keepsake Favor'],
        cue: 'Personalized engraving · Great for bulk orders · Useful after the wedding',
        cta: 'Shop Engraved Bottle Openers',
    },
    {
        slug: 'bespoke-monogram-cocktail-napkins',
        id: 'monogram-cocktail-napkins',
        headline: 'Monogram Cocktail Napkins for a Polished Bar Moment',
        purpose: 'Custom cocktail napkins make the bar feel designed instead of generic. They are affordable, photo-friendly, and perfect for tying the couple’s monogram, date, or wedding style into the reception.',
        chips: ['Cocktail Hour', 'Reception Bar', 'Monogram Detail', 'Bulk Eligible'],
        cue: 'Pack-friendly reception detail · Custom monogram or artwork · Easy bar upgrade',
        cta: 'Shop Monogram Napkins',
    },
    {
        slug: 'bespoke-frosted-acrylic-wedding-cups',
        id: 'frosted-acrylic-cups',
        headline: 'Frosted Acrylic Wedding Cups Guests Actually Use',
        purpose: 'Personalized cups are one of the easiest ways to make a bar, welcome party, pool party, or after-party feel custom. They are practical, visible in photos, and easy for guests to take home.',
        chips: ['Welcome Party', 'Outdoor Wedding', 'Barware', 'Guest Favor'],
        cue: 'Personalized drinkware · Great for outdoor events · Bulk-friendly',
        cta: 'Shop Frosted Acrylic Cups',
    },
    {
        slug: 'bespoke-keepsake-handheld-fan',
        id: 'handheld-fans',
        headline: 'Handheld Fans for Ceremony Comfort',
        purpose: 'For warm-weather weddings, ceremony fans are both practical and beautiful. They help guests stay comfortable while doubling as a personalized ceremony detail.',
        chips: ['Outdoor Ceremony', 'Summer Weddings', 'Guest Comfort', 'Personalized Detail'],
        cue: 'Great for warm weather · Ceremony-ready · Personalized design',
        cta: 'Shop Handheld Fans',
    },
    {
        slug: 'personlaized-champagne-glass-custom-champagne-glass-wedding-favor',
        id: 'champagne-glasses',
        headline: 'Personalized Champagne Glasses for Toasts and Tables',
        purpose: 'Custom champagne glasses create a more elevated toast and can double as a guest favor, table detail, or bridal party keepsake. They are ideal for receptions, welcome drinks, and celebratory moments.',
        chips: ['Champagne Toast', 'Reception Tables', 'Wedding Favors', 'Keepsake Glassware'],
        cue: 'Custom wedding glassware · Toast-ready · Guests can take home',
        cta: 'Shop Champagne Glasses',
    },
    {
        slug: 'personlaized-wine-glass-custom-wine-glass-wedding-favor',
        id: 'wine-glasses',
        headline: 'Personalized Wine Glasses for Reception Keepsakes',
        purpose: 'Custom wine glasses bring personalization into the dinner table, wine bar, or guest favor display. They feel more elevated than disposable favors and are useful after the wedding.',
        chips: ['Dinner Reception', 'Wine Bar', 'Guest Favor', 'Personalized Glassware'],
        cue: 'Personalized wedding favor · Reception-ready · Keepsake drinkware',
        cta: 'Shop Wine Glasses',
    },
    {
        slug: 'bespoke-personalized-golf-balls',
        id: 'golf-balls',
        headline: 'Personalized Golf Balls for Golf Weekends and Groomsmen Gifts',
        purpose: 'A strong guest-experience detail for couples planning golf weekends, bachelor events, country club weddings, or groomsmen gifting. It makes the wedding feel personal beyond the reception.',
        chips: ['Golf Weekend', 'Groomsmen Gifts', 'Country Club Wedding', 'Personalized Favor'],
        cue: 'Custom golf detail · Great for wedding weekends · Giftable and practical',
        cta: 'Shop Personalized Golf Balls',
    },
    {
        slug: 'bespoke-beers-birdies-neoprene-can-cooler',
        id: 'can-coolers',
        headline: 'Beers & Birdies Can Coolers for the Golf Weekend',
        purpose: 'A custom can cooler is a fun, useful detail for golf weekends, bachelor parties, welcome parties, outdoor receptions, and casual bar moments. It adds personality without feeling overdone.',
        chips: ['Golf Weekend', 'Welcome Party', 'Outdoor Bar', 'Casual Favor'],
        cue: 'Custom golf weekend favor · Great for drinks and events · Easy bulk gift',
        cta: 'Shop Can Coolers',
    },
    {
        slug: 'custom-ceramic-ring-dish-personalized-heirloom-trinket-tray',
        id: 'ceramic-ring-dishes',
        headline: 'Custom Ceramic Ring Dishes for Keepsake Gifting',
        purpose: 'A ceramic ring dish is a thoughtful keepsake for bridal party gifting, wedding detail boxes, flat-lay photos, and meaningful thank-you gifts. It feels personal and useful after the wedding.',
        chips: ['Bridal Party Gift', 'Keepsake Detail', 'Flat-Lay Photos', 'Personalized Gift'],
        cue: 'Custom keepsake · Great for bridesmaids and VIP guests · Gift-ready detail',
        cta: 'Shop Ceramic Ring Dishes',
    }
];

function formatGuidePrice(price: number | null | undefined) {
    return price && price > 0 ? `From $${price.toFixed(2)}` : 'Price available in preview';
}

function createPreviewProduct(product: any, price: number | null | undefined): PreviewProduct | null {
    if (!product) return null;

    return {
        ...product,
        _id: product._id || product.id,
        slug: { current: product.slug },
        price: Number(product.price) || 0,
        priceRange: price && price > 0 ? `$${price.toFixed(2)}` : product.priceRange,
        priceNote: product.priceNote || '',
        badge: product.badge || 'Personalized',
        category: product.category || { title: 'Wedding Guest Details' },
        rating: product.rating || 4.9,
        reviewCount: product.reviewCount || 128,
        styleVariantImages: product.styleVariantImages || [],
        bundleProducts: product.bundleProducts || [],
        isMultiBuy: product.isMultiBuy || false,
        perItemOptionNames: product.perItemOptionNames || [],
    };
}

export default async function WeddingMustHavesGuide() {
    const swellResponse = await getProducts();
    const allProducts = swellResponse?.results || [];

    const productsBySlug = FEATURED_SLUGS.reduce((acc: Record<string, any>, slug: string) => {
        acc[slug] = allProducts.find((p: any) => p.slug === slug);
        return acc;
    }, {});

    const guideSections = SECTIONS_DATA.map((section) => {
        const product = productsBySlug[section.slug];
        const resolvedPrice = product ? getLowestDisplayPrice(product) : PRICE_FALLBACKS[section.slug];

        return {
            ...section,
            priceLabel: formatGuidePrice(resolvedPrice || PRICE_FALLBACKS[section.slug]),
            previewProduct: createPreviewProduct(product, resolvedPrice || PRICE_FALLBACKS[section.slug]),
        };
    });

    return (
        <main className="w-full bg-cream min-h-screen pb-24 md:pb-0 scroll-smooth">
            {/* HERO SECTION */}
            <section className="relative w-full h-[70vh] min-h-[500px] flex items-end lg:items-center justify-center lg:justify-start px-6 lg:px-20 pb-16 lg:pb-0 overflow-hidden">
                <Image
                    src="/images/campaigns/wedding-must-haves-2026-2027/hero.png"
                    alt="Premium editorial wedding reception scene"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 lg:bg-gradient-to-r lg:from-black/70 lg:to-transparent"></div>
                
                <div className="relative z-10 w-full max-w-3xl text-center lg:text-left space-y-6">
                    <span className="font-sans text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold drop-shadow-sm">
                        2026/2027 Wedding Guest Experience Guide
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight drop-shadow-md">
                        Wedding Must-Haves for an Unforgettable Guest Experience
                    </h1>
                    <p className="font-sans text-base md:text-lg text-cream/90 font-light max-w-2xl mx-auto lg:mx-0 drop-shadow-sm">
                        Personalized wedding details guests notice, use, and remember, from ceremony comfort to cocktail hour keepsakes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                        <Link 
                            href="#must-haves" 
                            className="w-full sm:w-auto px-8 py-3.5 bg-gold text-espresso font-sans text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-colors text-center shadow-lg"
                        >
                            Shop Guest Experience Details
                        </Link>
                        <Link 
                            href="/shop/favors-party-extras" 
                            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-cream font-sans text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors text-center"
                        >
                            Explore Barware & Favors
                        </Link>
                    </div>
                    <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <span className="font-sans text-[10px] text-cream/80 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gold"></span> Free personalization
                        </span>
                        <span className="hidden sm:inline text-cream/30">|</span>
                        <span className="font-sans text-[10px] text-cream/80 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gold"></span> Digital proof before production
                        </span>
                        <span className="hidden sm:inline text-cream/30">|</span>
                        <span className="font-sans text-[10px] text-cream/80 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gold"></span> Bulk-friendly wedding details
                        </span>
                    </div>
                </div>
            </section>

            {/* JUMP LINKS / SHOP THE IDEAS */}
            <section className="bg-white border-y border-gold/10 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="font-serif text-3xl text-espresso">Shop the Ideas</h2>
                        <p className="font-sans text-sm text-espresso/70 mt-2">Choose the guest-experience detail your ad brought you here for.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                        {guideSections.map((section) => (
                            <Link 
                                key={section.id} 
                                href={`#${section.id}`}
                                className="group flex flex-col items-center justify-center text-center bg-cream-dark/30 hover:bg-gold/5 border border-gold/10 rounded-xl p-4 transition-all duration-300"
                            >
                                <span className="font-sans text-xs font-medium text-espresso group-hover:text-gold transition-colors">
                                    {section.headline.split(' for')[0]}
                                </span>
                                <span className="mt-2 font-serif text-lg leading-none text-gold">
                                    {section.priceLabel}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="py-20 px-6 max-w-3xl mx-auto text-center" id="must-haves">
                <p className="font-serif text-xl md:text-2xl text-espresso leading-relaxed">
                    Couples are moving beyond generic wedding favors. The best 2026/2027 guest-experience details are beautiful, useful, personal, and easy to remember. These pieces help guests stay comfortable, enjoy the bar, navigate the celebration, and leave with something worth keeping.
                </p>
                <div className="w-12 h-[1px] bg-gold mx-auto mt-10"></div>
            </section>

            {/* SHOPPABLE GUIDE SECTIONS */}
            <div className="max-w-6xl mx-auto px-6 pb-20 space-y-32">
                {guideSections.map((section, index) => {
                    const product = productsBySlug[section.slug];
                    const imageUrl = product?.images?.[0]?.file?.url || '/assets/logo.png';
                    
                    const isMidPage = index === 3; // After the 4th item

                    return (
                        <div key={section.id} className="scroll-mt-32 relative">
                            {isMidPage && (
                                <div className="w-full bg-espresso text-cream rounded-2xl p-10 md:p-16 mb-32 text-center shadow-xl">
                                    <h3 className="font-display text-3xl md:text-4xl mb-4">Make Every Guest Detail Feel Intentional</h3>
                                    <p className="font-sans text-cream/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                                        From ceremony comfort to cocktail hour keepsakes, every piece can be personalized to your names, date, monogram, artwork, or wedding style.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Link href="/shop/favors-party-extras" className="w-full sm:w-auto px-8 py-3.5 bg-gold text-espresso font-sans text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-colors">
                                            Shop Wedding Favors
                                        </Link>
                                        <Link href="/shop/barware-drinkware" className="w-full sm:w-auto px-8 py-3.5 border border-cream/30 text-cream hover:bg-white/10 font-sans text-xs font-bold uppercase tracking-wider transition-colors">
                                            Explore Barware
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <div id={section.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                                {/* Image Side */}
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="absolute -inset-4 bg-gold/5 rounded-3xl -z-10 group-hover:bg-gold/10 transition-colors duration-500"></div>
                                    <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-gold/10 bg-white">
                                        <Image
                                            src={imageUrl}
                                            alt={section.headline}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-cream border border-gold/20 rounded-full flex items-center justify-center shadow-sm z-10">
                                        <span className="font-serif text-2xl text-gold">{(index + 1).toString().padStart(2, '0')}</span>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <h3 className="font-display text-3xl md:text-4xl text-espresso leading-tight">
                                        {section.headline}
                                    </h3>
                                    
                                    <p className="font-sans text-lg text-espresso/80 font-light leading-relaxed">
                                        {section.purpose}
                                    </p>

                                    {/* Chips */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {section.chips.map(chip => (
                                            <span key={chip} className="px-3 py-1 bg-white border border-gold/20 rounded-full font-sans text-[10px] uppercase tracking-widest text-espresso/70 shadow-sm">
                                                {chip}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Buying Cue */}
                                    <div className="bg-cream-dark/50 p-4 rounded-xl border border-gold/10">
                                        <div className="flex gap-3 items-start">
                                            <span className="text-gold mt-0.5">✨</span>
                                            <div className="space-y-2">
                                                <p className="font-serif text-2xl leading-none text-gold">
                                                    {section.priceLabel}
                                                </p>
                                                <p className="font-sans text-sm text-espresso/80 font-medium leading-relaxed">
                                                    {section.cue.split('·').map((part, i) => (
                                                        <span key={i}>
                                                            {i > 0 && <span className="mx-2 text-gold/40">•</span>}
                                                            {part.trim()}
                                                        </span>
                                                    ))}
                                                </p>
                                                <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-espresso/45">
                                                    Starting price before upgrades
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="pt-4 space-y-4">
                                        <ProductPreviewModalButton
                                            label={section.cta}
                                            product={section.previewProduct}
                                            fallbackHref={`/products/${section.slug}`}
                                            className="inline-flex w-full items-center justify-center gap-2 text-center px-8 py-4 bg-espresso text-cream font-sans text-sm font-bold uppercase tracking-wider hover:bg-espresso-light transition-colors rounded-sm shadow-md"
                                        />
                                        <p className="text-center font-sans text-[11px] text-espresso/50 uppercase tracking-widest">
                                            ✓ Personalized proof included before production
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* SOCIAL PROOF */}
            <section className="bg-white border-y border-gold/10 py-20 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
                    <div className="w-full md:w-1/3 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-gold/10 pb-12 md:pb-0 md:pr-12">
                        <div className="flex gap-1 justify-center md:justify-start text-gold mb-4">
                            {[1,2,3,4,5].map(i => <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                        </div>
                        <h3 className="font-display text-3xl text-espresso">Loved by 10,000+ Couples</h3>
                        <p className="font-sans text-sm text-espresso/70">4.9 average rating • Digital proofs included • Bulk orders welcome</p>
                    </div>
                    <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-cream p-6 rounded-2xl shadow-sm border border-gold/5">
                            <p className="font-serif italic text-espresso/90 text-sm leading-relaxed mb-4">"The glassware display became one of our guests’ favorite details."</p>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-espresso/50">— Emily R.</span>
                        </div>
                        <div className="bg-cream p-6 rounded-2xl shadow-sm border border-gold/5">
                            <p className="font-serif italic text-espresso/90 text-sm leading-relaxed mb-4">"Our proof was perfect and everything arrived beautifully packaged."</p>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-espresso/50">— Sarah J.</span>
                        </div>
                        <div className="bg-cream p-6 rounded-2xl shadow-sm border border-gold/5">
                            <p className="font-serif italic text-espresso/90 text-sm leading-relaxed mb-4">"The personalized favors felt so much more elevated than anything generic."</p>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-espresso/50">— Michael T.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST / PROCESS */}
            <section className="py-24 px-6 bg-cream-dark/20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl text-espresso mb-4">How It Works</h2>
                        <p className="font-sans text-espresso/70 max-w-xl mx-auto">From idea to delivery, our process ensures your wedding details are perfect.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-6 left-12 right-12 h-[1px] bg-gold/30"></div>
                        
                        {[
                            { step: 1, title: 'Choose your detail', desc: 'Select from our curated guest experience collections.' },
                            { step: 2, title: 'Personalize it', desc: 'Add names, dates, monograms, or custom artwork.' },
                            { step: 3, title: 'Review your proof', desc: 'Approve your digital proof before production begins.' },
                            { step: 4, title: 'We craft & ship', desc: 'Handcrafted with care and shipped to your door.' }
                        ].map(item => (
                            <div key={item.step} className="relative flex flex-col items-center text-center space-y-4">
                                <div className="w-12 h-12 bg-white border border-gold shadow-sm rounded-full flex items-center justify-center font-serif text-xl text-gold relative z-10">
                                    {item.step}
                                </div>
                                <h4 className="font-sans font-bold text-sm text-espresso uppercase tracking-wider pt-2">{item.title}</h4>
                                <p className="font-sans text-xs text-espresso/70 leading-relaxed max-w-[200px]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-16 pt-10 border-t border-gold/10 flex flex-wrap justify-center gap-x-12 gap-y-4">
                        <span className="font-sans text-xs text-espresso/80 font-medium flex items-center gap-2"><span className="text-gold">✓</span> Free personalization</span>
                        <span className="font-sans text-xs text-espresso/80 font-medium flex items-center gap-2"><span className="text-gold">✓</span> Proof before production</span>
                        <span className="font-sans text-xs text-espresso/80 font-medium flex items-center gap-2"><span className="text-gold">✓</span> Bulk-friendly options</span>
                        <span className="font-sans text-xs text-espresso/80 font-medium flex items-center gap-2"><span className="text-gold">✓</span> Free shipping over $99</span>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl text-espresso text-center mb-16">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        {[
                            {
                                q: "Can I personalize these wedding guest details?",
                                a: "Yes. Most featured items can be personalized with names, dates, monograms, artwork, or wedding wording. Use the product page to see available options."
                            },
                            {
                                q: "How far before the event should I order?",
                                a: "Order as early as possible, especially for bulk wedding details. If your date is close, contact us before ordering so we can confirm timing."
                            },
                            {
                                q: "Will I see a proof?",
                                a: "Yes. Personalized items include a digital proof before production so you can review the design details."
                            },
                            {
                                q: "Do you offer bulk pricing?",
                                a: "Many wedding favor and guest-experience products are bulk-friendly. Check the product page or contact us for larger event orders."
                            },
                            {
                                q: "Which item is best for guest experience?",
                                a: "For comfort, choose handheld fans. For cocktail hour, choose napkins, cups, or glassware. For keepsake favors, choose bottle openers, ring dishes, or personalized drinkware."
                            },
                            {
                                q: "Which item works best as a wedding favor?",
                                a: "Glassware, frosted cups, bottle openers, can coolers, and ceramic ring dishes are especially strong because guests can use them during and after the wedding."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-gold/10 pb-6">
                                <h4 className="font-sans font-bold text-sm text-espresso mb-3 leading-snug">{faq.q}</h4>
                                <p className="font-sans text-sm text-espresso/70 font-light leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-espresso text-cream py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="text-gold text-4xl block mb-6">✧</span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-12 leading-tight">
                        Ready to Create the Guest Details Everyone Remembers?
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/shop/favors-party-extras" className="w-full sm:w-auto px-8 py-4 bg-gold text-espresso font-sans text-sm font-bold uppercase tracking-wider hover:bg-gold-light transition-colors shadow-lg">
                            Shop Guest Experience Details
                        </Link>
                        <Link href="/shop/barware-drinkware" className="w-full sm:w-auto px-8 py-4 border border-cream/30 hover:bg-white/10 text-cream font-sans text-sm font-bold uppercase tracking-wider transition-colors">
                            Explore Barware
                        </Link>
                        <Link href="/gifts/welcome-gift-box" className="w-full sm:w-auto px-8 py-4 border border-cream/30 hover:bg-white/10 text-cream font-sans text-sm font-bold uppercase tracking-wider transition-colors">
                            Build Welcome Boxes
                        </Link>
                    </div>
                </div>
            </section>

            {/* MOBILE STICKY CTA */}
            <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-gold/20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
                <Link 
                    href="#must-haves"
                    className="block w-full px-6 py-3.5 bg-espresso text-cream font-sans text-[13px] font-bold uppercase tracking-widest text-center shadow-lg active:scale-[0.98] transition-transform rounded-sm"
                >
                    Shop the Must-Haves
                </Link>
            </div>
        </main>
    );
}
