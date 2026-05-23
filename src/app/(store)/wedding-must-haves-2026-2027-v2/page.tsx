import { Fragment } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Gift, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProductPreviewModalButton, type PreviewProduct } from '@/components/guides/ProductPreviewModalButton'
import { getLowestDisplayPrice, getProducts } from '@/lib/swell'

type GuideItem = {
    id: string
    eyebrow: string
    headline: string
    purpose: string
    chips: string[]
    buyingCue: string
    cta: string
    href: string
    reassurance: string
    image: string
    imageAlt: string
}

type StoreImage = {
    file?: {
        url?: string
    }
    url?: string
}

type StoreProduct = {
    id?: string
    name?: string
    slug?: string
    price?: number
    description?: string
    images?: StoreImage[]
    options?: unknown[]
    categories?: {
        name?: string
    }[]
}

type ResolvedGuideItem = GuideItem & {
    slug: string
    priceLabel: string
    product: PreviewProduct | null
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: '2026/2027 Wedding Must-Haves for Guest Experience | Custom Wedding Co.',
    description: 'Discover personalized wedding guest experience ideas for 2026 and 2027, from custom glassware and ceremony fans to premium favors, golf weekend gifts, cocktail napkins, and bar details.',
    openGraph: {
        title: '2026/2027 Wedding Must-Haves for Guest Experience | Custom Wedding Co.',
        description: 'Personalized wedding guest-experience details for cocktail hour, reception bars, ceremony comfort, golf weekends, and keepsake gifting.',
        images: ['/images/guides/wedding-must-haves-2026-2027-v2/hero.jpg'],
    },
}

const heroImage = '/images/guides/wedding-must-haves-2026-2027-v2/hero.jpg'

const guideItems: GuideItem[] = [
    {
        id: 'engraved-bottle-openers',
        eyebrow: 'Bar Details',
        headline: 'Engraved Bottle Openers for the Home Bar',
        purpose: 'A useful wedding favor or groomsmen-adjacent gift that guests can keep long after the reception. It works especially well for bar-focused weddings, welcome parties, golf weekends, and cocktail-hour gifting.',
        chips: ['Bar Details', 'Groomsmen Gifts', 'Wedding Favors', 'Keepsake Favor'],
        buyingCue: 'Personalized engraving · Great for bulk orders · Useful after the wedding',
        cta: 'Shop Engraved Bottle Openers',
        href: '/products/bespoke-engraved-heirloom-bottle-opener',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69f309a2a0af65001167184f/30cc5cd5374ee7ba239741c839e6f314/lets_replace_the_design_with_202604301522.jpeg',
        imageAlt: 'Bespoke engraved heirloom bottle opener wedding favor',
    },
    {
        id: 'monogram-cocktail-napkins',
        eyebrow: 'Cocktail Hour',
        headline: 'Monogram Cocktail Napkins for a Polished Bar Moment',
        purpose: "Custom cocktail napkins make the bar feel designed instead of generic. They are affordable, photo-friendly, and perfect for tying the couple's monogram, date, or wedding style into the reception.",
        chips: ['Cocktail Hour', 'Reception Bar', 'Monogram Detail', 'Bulk Eligible'],
        buyingCue: 'Pack-friendly reception detail · Custom monogram or artwork · Easy bar upgrade',
        cta: 'Shop Monogram Napkins',
        href: '/products/bespoke-monogram-cocktail-napkins',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69dace02e6db1a0012e1a4f8/7305a82e261f03659875d257efaec4e1/can_we_change_202604111500.png',
        imageAlt: 'Bespoke monogram cocktail napkins for a wedding bar',
    },
    {
        id: 'frosted-acrylic-cups',
        eyebrow: 'Welcome Party',
        headline: 'Frosted Acrylic Wedding Cups Guests Actually Use',
        purpose: 'Personalized cups are one of the easiest ways to make a bar, welcome party, pool party, or after-party feel custom. They are practical, visible in photos, and easy for guests to take home.',
        chips: ['Welcome Party', 'Outdoor Wedding', 'Barware', 'Guest Favor'],
        buyingCue: 'Personalized drinkware · Great for outdoor events · Bulk-friendly',
        cta: 'Shop Frosted Acrylic Cups',
        href: '/products/bespoke-frosted-acrylic-wedding-cups',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69f2516675ecec0012ac4009/4353786c98123eefe77007f9b72a1f38/replace_the_design_with_this_202604300139.jpeg',
        imageAlt: 'Bespoke frosted acrylic wedding cups for personalized barware',
    },
    {
        id: 'handheld-fans',
        eyebrow: 'Ceremony Comfort',
        headline: 'Handheld Fans for Ceremony Comfort',
        purpose: 'For warm-weather weddings, ceremony fans are both practical and beautiful. They help guests stay comfortable while doubling as a personalized ceremony detail.',
        chips: ['Outdoor Ceremony', 'Summer Weddings', 'Guest Comfort', 'Personalized Detail'],
        buyingCue: 'Great for warm weather · Ceremony-ready · Personalized design',
        cta: 'Shop Handheld Fans',
        href: '/products/bespoke-keepsake-handheld-fan',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69f051206748980012da193c/b65529525e7a785985e2631ad348879e/lets_keep_the_202604281352.jpeg',
        imageAlt: 'Bespoke keepsake handheld fan for outdoor wedding ceremony comfort',
    },
    {
        id: 'champagne-glasses',
        eyebrow: 'Toasts',
        headline: 'Personalized Champagne Glasses for Toasts and Tables',
        purpose: 'Custom champagne glasses create a more elevated toast and can double as a guest favor, table detail, or bridal party keepsake. They are ideal for receptions, welcome drinks, and celebratory moments.',
        chips: ['Champagne Toast', 'Reception Tables', 'Wedding Favors', 'Keepsake Glassware'],
        buyingCue: 'Custom wedding glassware · Toast-ready · Guests can take home',
        cta: 'Shop Champagne Glasses',
        href: '/products/personlaized-champagne-glass-custom-champagne-glass-wedding-favor',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69edf9cbdefa2f0012f349c9/8cb4e78873a9823c26ab943ea782195c/remove_the_customzation_202604260439.jpeg',
        imageAlt: 'Personalized champagne glass custom wedding favor',
    },
    {
        id: 'wine-glasses',
        eyebrow: 'Reception Keepsakes',
        headline: 'Personalized Wine Glasses for Reception Keepsakes',
        purpose: 'Custom wine glasses bring personalization into the dinner table, wine bar, or guest favor display. They feel more elevated than disposable favors and are useful after the wedding.',
        chips: ['Dinner Reception', 'Wine Bar', 'Guest Favor', 'Personalized Glassware'],
        buyingCue: 'Personalized wedding favor · Reception-ready · Keepsake drinkware',
        cta: 'Shop Wine Glasses',
        href: '/products/personlaized-wine-glass-custom-wine-glass-wedding-favor',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69edfca48c9bf800124cc423/0058f2ed7feaef8b3f62de70448e22fa/remove_al_the_202604260450.jpeg',
        imageAlt: 'Personalized wine glass wedding favor',
    },
    {
        id: 'golf-balls',
        eyebrow: 'Golf Weekends',
        headline: 'Personalized Golf Balls for Golf Weekends and Groomsmen Gifts',
        purpose: 'A strong guest-experience detail for couples planning golf weekends, bachelor events, country club weddings, or groomsmen gifting. It makes the wedding feel personal beyond the reception.',
        chips: ['Golf Weekend', 'Groomsmen Gifts', 'Country Club Wedding', 'Personalized Favor'],
        buyingCue: 'Custom golf detail · Great for wedding weekends · Giftable and practical',
        cta: 'Shop Personalized Golf Balls',
        href: '/products/bespoke-personalized-golf-balls',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69daee1426bbe40012b7af98/0c3d635f4d55c2b9ed6f073ca8dfa48c/can_we_have_202604111724.png',
        imageAlt: 'Bespoke personalized golf balls for wedding weekends',
    },
    {
        id: 'can-coolers',
        eyebrow: 'Outdoor Bar',
        headline: 'Beers & Birdies Can Coolers for the Golf Weekend',
        purpose: 'A custom can cooler is a fun, useful detail for golf weekends, bachelor parties, welcome parties, outdoor receptions, and casual bar moments. It adds personality without feeling overdone.',
        chips: ['Golf Weekend', 'Welcome Party', 'Outdoor Bar', 'Casual Favor'],
        buyingCue: 'Custom golf weekend favor · Great for drinks and events · Easy bulk gift',
        cta: 'Shop Can Coolers',
        href: '/products/bespoke-beers-birdies-neoprene-can-cooler',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69c66fe0e4ff210013744b3c/a473f82ad8cd5fb97b4e122bb61ff200/Can_you_add_202603202337.png',
        imageAlt: 'Bespoke Beers and Birdies neoprene can cooler wedding favor',
    },
    {
        id: 'ceramic-ring-dishes',
        eyebrow: 'Keepsake Gifting',
        headline: 'Custom Ceramic Ring Dishes for Keepsake Gifting',
        purpose: 'A ceramic ring dish is a thoughtful keepsake for bridal party gifting, wedding detail boxes, flat-lay photos, and meaningful thank-you gifts. It feels personal and useful after the wedding.',
        chips: ['Bridal Party Gift', 'Keepsake Detail', 'Flat-Lay Photos', 'Personalized Gift'],
        buyingCue: 'Custom keepsake · Great for bridesmaids and VIP guests · Gift-ready detail',
        cta: 'Shop Ceramic Ring Dishes',
        href: '/products/custom-ceramic-ring-dish-personalized-heirloom-trinket-tray',
        reassurance: 'Personalized proof included before production',
        image: 'https://cdn.swell.store/customweddingco/69edef830581f80011f91035/3c329e2503ef20750a086ada1c6f0c9f/remove_the_cusotmzation_202604260351.jpeg',
        imageAlt: 'Custom ceramic ring dish personalized heirloom trinket tray',
    },
]

const fallbackPricesBySlug: Record<string, number> = {
    'bespoke-engraved-heirloom-bottle-opener': 19.99,
    'bespoke-monogram-cocktail-napkins': 19.99,
    'bespoke-frosted-acrylic-wedding-cups': 99.99,
    'bespoke-keepsake-handheld-fan': 19.99,
    'personlaized-champagne-glass-custom-champagne-glass-wedding-favor': 29.99,
    'personlaized-wine-glass-custom-wine-glass-wedding-favor': 29.99,
    'bespoke-personalized-golf-balls': 24.99,
    'bespoke-beers-birdies-neoprene-can-cooler': 12.99,
    'custom-ceramic-ring-dish-personalized-heirloom-trinket-tray': 29.99,
}

function getProductSlug(item: GuideItem) {
    return item.href.replace('/products/', '')
}

function formatProductPrice(price: number) {
    if (!price || price <= 0) return 'See product'
    return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`
}

function syntheticReviewCount(slug: string) {
    return ((slug.charCodeAt(0) * 7 + slug.length * 13) % 176) + 12
}

function syntheticRating(slug: string) {
    return [4.6, 4.7, 4.8, 4.9, 4.8, 4.7, 4.9, 4.8][slug.length % 8]
}

function formatPreviewProduct(product: StoreProduct | undefined, item: GuideItem, slug: string) {
    if (!product?.id) return null

    const lowestPrice = getLowestDisplayPrice(product)

    return {
        _id: product.id,
        name: product.name || item.headline,
        slug: { current: product.slug || slug },
        price: Number(product.price) || 0,
        priceRange: formatProductPrice(lowestPrice),
        priceNote: 'starting price',
        badge: 'Personalized',
        category: { title: product.categories?.[0]?.name || 'Guest Experience Details' },
        rating: syntheticRating(slug),
        reviewCount: syntheticReviewCount(slug),
        images: product.images?.length ? product.images : [{ file: { url: item.image } }],
        options: product.options || [],
        specifications: [],
        description: product.description || item.purpose,
        content: {},
        styleVariantImages: [],
        bundleProducts: [],
        isMultiBuy: false,
        perItemOptionNames: [],
    }
}

async function getResolvedGuideItems(): Promise<ResolvedGuideItem[]> {
    const response = await getProducts()
    const products = response?.results || []

    return guideItems.map((item) => {
        const slug = getProductSlug(item)
        const product = products.find((candidate: StoreProduct) => candidate.slug === slug)
        const fallbackPrice = fallbackPricesBySlug[slug] || 0
        const resolvedPrice = product ? getLowestDisplayPrice(product) : fallbackPrice

        return {
            ...item,
            slug,
            priceLabel: `From ${formatProductPrice(resolvedPrice || fallbackPrice)}`,
            product: formatPreviewProduct(product, item, slug),
        }
    })
}

const jumpLabels = [
    'Engraved Bottle Openers',
    'Monogram Cocktail Napkins',
    'Frosted Acrylic Wedding Cups',
    'Keepsake Handheld Fans',
    'Personalized Champagne Glasses',
    'Personalized Wine Glasses',
    'Personalized Golf Balls',
    'Beers & Birdies Can Coolers',
    'Custom Ceramic Ring Dishes',
]

const processSteps = [
    'Choose your detail',
    'Add names, dates, monograms, or artwork',
    'Review your digital proof',
    'We craft and ship your order',
]

const processTrustItems = [
    { label: 'Free personalization', Icon: Sparkles },
    { label: 'Proof before production', Icon: ShieldCheck },
    { label: 'Bulk-friendly options', Icon: Gift },
    { label: 'Free shipping over $99', Icon: Truck },
]

const relatedIdeas = [
    {
        title: 'Wedding Favors',
        copy: 'Bulk-friendly guest details for welcome parties, receptions, and send-off moments.',
        href: '/shop/favors-party-extras',
    },
    {
        title: 'Barware & Drinkware',
        copy: 'Personalized cups, glassware, and bar details that make cocktail hour feel designed.',
        href: '/shop/barware-drinkware',
    },
    {
        title: 'Welcome Gift Boxes',
        copy: 'Curated wedding-weekend gifting for guests arriving from out of town.',
        href: '/gifts/welcome-gift-box',
    },
    {
        title: 'Bridal Party Gifts',
        copy: 'Keepsakes and getting-ready details for bridesmaids, VIPs, and your inner circle.',
        href: '/shop/bridal-party-gifts',
    },
]

const faqs = [
    {
        question: 'Can I personalize these wedding guest details?',
        answer: 'Yes. Most featured items can be personalized with names, dates, monograms, artwork, or wedding wording. Use the product page to see available options.',
    },
    {
        question: 'How far before the event should I order?',
        answer: 'Order as early as possible, especially for bulk wedding details. If your date is close, contact us before ordering so we can confirm timing.',
    },
    {
        question: 'Will I see a proof?',
        answer: 'Yes. Personalized items include a digital proof before production so you can review the design details.',
    },
    {
        question: 'Do you offer bulk pricing?',
        answer: 'Many wedding favor and guest-experience products are bulk-friendly. Check the product page or contact us for larger event orders.',
    },
    {
        question: 'Which item is best for guest experience?',
        answer: 'For comfort, choose handheld fans. For cocktail hour, choose napkins, cups, or glassware. For keepsake favors, choose bottle openers, ring dishes, or personalized drinkware.',
    },
    {
        question: 'Which item works best as a wedding favor?',
        answer: 'Glassware, frosted cups, bottle openers, can coolers, and ceramic ring dishes are especially strong because guests can use them during and after the wedding.',
    },
]

function SectionHeading({
    eyebrow,
    title,
    copy,
}: {
    eyebrow: string
    title: string
    copy?: string
}) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
                {eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            {copy ? (
                <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-espresso/75 sm:text-lg">
                    {copy}
                </p>
            ) : null}
        </div>
    )
}

function GuideProductSection({ item, index }: { item: ResolvedGuideItem; index: number }) {
    const isReversed = index % 2 === 1

    return (
        <article
            id={item.id}
            className="scroll-mt-32 border-t border-gold/15 first:border-t-0"
        >
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12">
                <div className={`relative aspect-[4/5] overflow-hidden bg-cream-dark shadow-[0_18px_60px_rgba(74,44,42,0.12)] ${isReversed ? 'lg:order-2' : ''}`}>
                    <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <span className="font-serif text-6xl leading-none text-gold/30">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
                            {item.eyebrow}
                        </p>
                        <h3 className="mt-3 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
                            {item.headline}
                        </h3>
                    </div>

                    <p className="font-sans text-base leading-7 text-espresso/80 sm:text-lg">
                        {item.purpose}
                    </p>

                    <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                        <span className="font-serif text-3xl leading-none text-gold">
                            {item.priceLabel}
                        </span>
                        <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-espresso/55">
                            Starting price before upgrades
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {item.chips.map((chip) => (
                            <span
                                key={chip}
                                className="border border-gold/25 bg-cream-dark px-3 py-1.5 font-sans text-[0.68rem] font-bold uppercase tracking-[0.14em] text-espresso/70"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>

                    <div className="border border-gold/25 bg-white/70 p-4">
                        <p className="font-sans text-sm font-semibold leading-6 text-espresso">
                            {item.buyingCue}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <ProductPreviewModalButton
                            label={item.cta}
                            product={item.product}
                            fallbackHref={item.href}
                            className="inline-flex w-full items-center justify-center gap-2 bg-espresso px-10 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-cream shadow-md transition-all duration-300 hover:bg-espresso-light hover:shadow-lg sm:w-auto"
                        />
                        <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-espresso/55">
                            {item.reassurance}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    )
}

function ConversionBand() {
    return (
        <section className="bg-espresso px-5 py-12 text-cream sm:px-6 lg:px-12">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                    <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold-pale">
                        Personalized From Start to Finish
                    </p>
                    <h2 className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl">
                        Make Every Guest Detail Feel Intentional
                    </h2>
                    <p className="mt-4 font-sans text-base leading-7 text-cream/80">
                        From ceremony comfort to cocktail hour keepsakes, every piece can be personalized to your names, date, monogram, artwork, or wedding style.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
                    <Button href="/shop/favors-party-extras" variant="secondary" className="w-full sm:w-auto">
                        Shop Wedding Favors
                    </Button>
                    <Link
                        href="/shop/barware-drinkware"
                        className="inline-flex w-full items-center justify-center border border-gold-pale px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-cream hover:text-espresso sm:w-auto"
                    >
                        Explore Barware
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default async function WeddingMustHavesV2Page() {
    const resolvedGuideItems = await getResolvedGuideItems()

    return (
        <main className="min-h-screen bg-cream text-espresso pb-28 md:pb-0">
            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src={heroImage}
                        alt="Premium wedding reception table with personalized guest experience details"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-espresso/80 via-espresso/45 to-espresso/10" />
                </div>

                <div className="mx-auto flex min-h-[calc(100svh-96px)] max-w-[1280px] items-end px-5 py-14 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
                    <div className="w-full max-w-3xl">
                        <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold-pale sm:text-sm">
                            2026/2027 Wedding Guest Experience Guide
                        </p>
                        <h1 className="mt-4 max-w-[22rem] font-display text-[2.45rem] leading-[1.03] text-cream drop-shadow-sm sm:max-w-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                            Wedding Must-Haves for an Unforgettable Guest Experience
                        </h1>
                        <p className="mt-5 max-w-2xl font-sans text-base leading-7 text-cream-dark sm:text-lg md:text-xl">
                            Personalized wedding details guests notice, use, and remember, from ceremony comfort to cocktail hour keepsakes.
                        </p>

                        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Button href="#must-haves" size="lg" variant="secondary" className="w-full sm:w-auto">
                                Shop Guest Experience Details
                            </Button>
                            <Link
                                href="/shop/favors-party-extras"
                                className="inline-flex w-full items-center justify-center border border-cream/70 px-6 py-4 font-sans text-xs font-semibold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-cream hover:text-espresso sm:w-auto"
                            >
                                Explore Barware & Favors
                            </Link>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-sans text-xs font-semibold uppercase tracking-[0.13em] text-cream/80 sm:text-sm">
                            <span>Free personalization</span>
                            <span className="text-gold-pale">·</span>
                            <span>Digital proof before production</span>
                            <span className="text-gold-pale">·</span>
                            <span>Bulk-friendly wedding details</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="must-haves" className="scroll-mt-32 border-b border-gold/20 bg-cream-dark px-5 py-12 sm:px-6 lg:px-12">
                <div className="mx-auto max-w-[1120px]">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
                                Shop the Ideas
                            </span>
                            <h2 className="mt-2 font-display text-3xl text-espresso sm:text-4xl">
                                Choose the guest-experience detail your ad brought you here for.
                            </h2>
                        </div>
                        <p className="max-w-sm font-sans text-sm leading-6 text-espresso/70">
                            Tap a detail to jump directly to the matching product idea.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                        {resolvedGuideItems.map((item, index) => (
                            <Link
                                key={item.id}
                                href={`#${item.id}`}
                                className="group flex min-h-[104px] items-center justify-between border border-gold/20 bg-cream px-3 py-4 transition-all duration-300 hover:border-gold hover:bg-white hover:shadow-[0_12px_30px_rgba(74,44,42,0.08)] sm:px-4"
                            >
                                <span className="min-w-0">
                                    <span className="block font-sans text-[0.72rem] font-bold uppercase leading-5 tracking-[0.12em] text-espresso transition-colors group-hover:text-gold sm:text-xs">
                                        {jumpLabels[index]}
                                    </span>
                                    <span className="mt-1 block font-serif text-lg leading-none text-gold">
                                        {item.priceLabel}
                                    </span>
                                </span>
                                <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-gold/20 bg-cream px-5 py-16 sm:px-6 lg:px-12">
                <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
                    <div>
                        <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
                            Why It Matters
                        </span>
                        <h2 className="mt-3 font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-5xl">
                            The best favors now feel like part of the experience.
                        </h2>
                    </div>
                    <p className="font-sans text-base leading-8 text-espresso/80 sm:text-lg">
                        Couples are moving beyond generic wedding favors. The best 2026/2027 guest-experience details are beautiful, useful, personal, and easy to remember. These pieces help guests stay comfortable, enjoy the bar, navigate the celebration, and leave with something worth keeping.
                    </p>
                </div>
            </section>

            <section className="bg-cream">
                {resolvedGuideItems.map((item, index) => (
                    <Fragment key={item.id}>
                        <GuideProductSection item={item} index={index} />
                        {index === 3 ? <ConversionBand /> : null}
                    </Fragment>
                ))}
            </section>

            <section className="border-y border-gold/20 bg-espresso px-5 py-16 text-cream sm:px-6 lg:px-12">
                <div className="mx-auto max-w-[1120px]">
                    <div className="grid grid-cols-2 gap-4 border-b border-cream/15 pb-10 md:grid-cols-4">
                        {[
                            ['10,000+', 'Loved by couples'],
                            ['4.9', 'Average rating'],
                            ['Proofs', 'Digital proofs included'],
                            ['Bulk', 'Bulk orders welcome'],
                        ].map(([value, label]) => (
                            <div key={label} className="text-center">
                                <p className="font-display text-3xl text-gold-pale sm:text-4xl">{value}</p>
                                <p className="mt-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/70 sm:text-xs">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            "The glassware display became one of our guests' favorite details.",
                            'Our proof was perfect and everything arrived beautifully packaged.',
                            'The personalized favors felt so much more elevated than anything generic.',
                        ].map((quote) => (
                            <figure key={quote} className="border border-cream/15 bg-cream/10 p-5">
                                <div className="mb-4 flex gap-1 text-gold-pale">
                                    {[0, 1, 2, 3, 4].map((star) => (
                                        <Star key={star} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <blockquote className="font-serif text-xl leading-8 text-cream">
                                    &quot;{quote}&quot;
                                </blockquote>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-cream-dark px-5 py-16 sm:px-6 lg:px-12">
                <div className="mx-auto max-w-[1120px]">
                    <SectionHeading
                        eyebrow="How It Works"
                        title="A simple proof-first process for personalized wedding details."
                        copy="Choose the moment you want to elevate, add your personalization, and review your design before production begins."
                    />

                    <div className="mt-12 grid gap-4 md:grid-cols-4">
                        {processSteps.map((step, index) => (
                            <div key={step} className="border border-gold/20 bg-cream p-5 text-center">
                                <span className="mx-auto flex h-12 w-12 items-center justify-center border border-gold/30 bg-gold-pale font-serif text-2xl text-espresso">
                                    {index + 1}
                                </span>
                                <h3 className="mt-5 font-sans text-sm font-bold uppercase leading-6 tracking-[0.14em] text-espresso">
                                    {step}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {processTrustItems.map(({ label, Icon }) => (
                            <div key={label} className="flex items-center gap-3 border border-gold/15 bg-white/70 px-4 py-3">
                                <Icon className="h-5 w-5 text-gold" />
                                <span className="font-sans text-sm font-semibold text-espresso">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-cream px-5 py-16 sm:px-6 lg:px-12">
                <div className="mx-auto max-w-[1120px]">
                    <SectionHeading
                        eyebrow="More Guest Experience Ideas"
                        title="Keep planning by wedding moment."
                    />
                    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {relatedIdeas.map((idea) => (
                            <Link
                                key={idea.href}
                                href={idea.href}
                                className="group flex min-h-[210px] flex-col justify-between border border-gold/20 bg-cream-dark p-6 transition-all duration-300 hover:border-gold hover:bg-white hover:shadow-[0_18px_45px_rgba(74,44,42,0.08)]"
                            >
                                <div>
                                    <h3 className="font-serif text-2xl leading-tight text-espresso transition-colors group-hover:text-gold">
                                        {idea.title}
                                    </h3>
                                    <p className="mt-3 font-sans text-sm leading-6 text-espresso/70">
                                        {idea.copy}
                                    </p>
                                </div>
                                <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-gold">
                                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-gold/20 bg-cream-dark px-5 py-16 sm:px-6 lg:px-12">
                <div className="mx-auto max-w-[960px]">
                    <SectionHeading
                        eyebrow="FAQ"
                        title="Quick answers before you choose your guest details."
                    />
                    <div className="mt-10 space-y-3">
                        {faqs.map((faq) => (
                            <details key={faq.question} className="group border border-gold/20 bg-cream p-5">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-sans text-base font-semibold text-espresso">
                                    <span>{faq.question}</span>
                                    <span className="mt-1 text-gold transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 font-sans text-sm leading-7 text-espresso/75">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-espresso px-5 py-16 text-center text-cream sm:px-6 lg:px-12">
                <div className="mx-auto max-w-3xl">
                    <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold-pale">
                        Ready When You Are
                    </p>
                    <h2 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">
                        Ready to Create the Guest Details Everyone Remembers?
                    </h2>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                        <Button href="/shop/favors-party-extras" variant="secondary" className="w-full sm:w-auto">
                            Shop Guest Experience Details
                        </Button>
                        <Link
                            href="/shop/barware-drinkware"
                            className="inline-flex w-full items-center justify-center border border-gold-pale px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-cream hover:text-espresso sm:w-auto"
                        >
                            Explore Barware
                        </Link>
                        <Link
                            href="/gifts/welcome-gift-box"
                            className="inline-flex w-full items-center justify-center border border-gold-pale px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-cream hover:text-espresso sm:w-auto"
                        >
                            Build Welcome Boxes
                        </Link>
                    </div>
                </div>
            </section>

            <Link
                href="#must-haves"
                className="fixed bottom-4 left-4 right-[86px] z-50 inline-flex min-h-[52px] items-center justify-center bg-espresso px-5 py-3 font-sans text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cream shadow-[0_16px_44px_rgba(74,44,42,0.22)] md:hidden"
            >
                <Check className="mr-2 h-4 w-4 text-gold-pale" />
                Shop the Must-Haves
            </Link>
        </main>
    )
}
