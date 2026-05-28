import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Check, Gift, Heart, PackageCheck, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { getLowestDisplayPrice, getProducts } from '@/lib/swell'

type StoreImage = {
    file?: {
        url?: string
    }
    url?: string
}

type StoreCategory = {
    name?: string
}

type StoreProduct = {
    id?: string
    name?: string
    slug?: string
    price?: number
    description?: string
    images?: StoreImage[]
    options?: unknown[]
    categories?: StoreCategory[]
}

type ResolvedProduct = {
    name: string
    slug: string
    href: string
    price: number
    priceLabel: string
    image: string
    category: string
}

const heroImage = '/images/gift-boxes/bridesmaid-box.png'
const builderHref = '/gifts/bridesmaid-box'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Custom Bridesmaid Boxes & Bridal Gift Boxes | Custom Wedding Co.',
    description: 'Build personalized bridesmaid boxes with custom robes, sleep masks, compact mirrors, jewelry boxes, keepsakes, and premium bridal party gifts.',
    openGraph: {
        title: 'Custom Bridesmaid Boxes & Bridal Gift Boxes | Custom Wedding Co.',
        description: 'Pick a curated bridesmaid box, personalize every detail, and create a bridal party gift that feels made just for her.',
        images: [heroImage],
    },
}

const productSlugs = {
    baseBox: 'bridesmaid-box',
    robe: 'bespoke-satin-lace-bridal-robe',
    sleepMask: 'bespoke-satin-sleep-collection',
    compactMirror: 'personalized-compact-mirror-custom-heirloom-bridal-gift',
    engravedMirror: 'bespoke-engraved-compact-mirror',
    miniJewelryCase: 'the-heirloom-mini-velvet-jewelry-case',
    velvetJewelryCase: 'bespoke-velvet-heirloom-jewelry-case',
    champagneGlass: 'personlaized-champagne-glass-custom-champagne-glass-wedding-favor',
    champagneFlute: 'bespoke-engraved-champagne-flute',
    cosmeticPouch: 'custom-cosmetic-pouch-personalized-bridal-party-gift',
    corduroyPouch: 'heirloom-corduroy-cosmetic-pouch',
    canvasTote: 'personalized-embroidered-canvas-tote-custom-bridal-party-gift',
    burlapTote: 'bespoke-canvas-and-burlap-tote',
    hairClaw: 'the-to-have-and-to-hold-bridal-hair-claw',
    scrunchies: 'bespoke-mulberry-silk-bridal-scrunchies',
    slippers: 'bespoke-bridal-slipper',
    hairbrush: 'the-heirloom-botanical-hairbrush',
} as const

type ProductKey = keyof typeof productSlugs

const fallbackProducts: Record<ProductKey, Omit<ResolvedProduct, 'href' | 'priceLabel'>> = {
    baseBox: {
        name: 'Custom Bridesmaid Box',
        slug: 'bridesmaid-box',
        price: 2.99,
        image: 'https://cdn.swell.store/customweddingco/69ecc27fef6ed90012760a26/3971a5504e31bafda2f79407f8183cd9/bridesmaid_box_lifestyle.png',
        category: 'Bridesmaid Boxes',
    },
    robe: {
        name: 'Bespoke Satin & Lace Bridal Robe',
        slug: 'bespoke-satin-lace-bridal-robe',
        price: 89.99,
        image: 'https://cdn.swell.store/customweddingco/69f06da120adc70012d8b0c3/74a4bc4d35abf02047d25d8bfbc6b682/lets_replace_the_202604281613.jpeg',
        category: 'Apparel & Loungewear',
    },
    sleepMask: {
        name: 'Bespoke Satin Sleep Collection',
        slug: 'bespoke-satin-sleep-collection',
        price: 19.99,
        image: 'https://cdn.swell.store/customweddingco/69f05f8887b8c5001277ecf6/03f3d78f94cd4e22fe58a3bfc6cc119d/can_you_put_202604281459.jpeg',
        category: 'Apparel & Loungewear',
    },
    compactMirror: {
        name: 'Personalized Compact Mirror',
        slug: 'personalized-compact-mirror-custom-heirloom-bridal-gift',
        price: 24.99,
        image: 'https://cdn.swell.store/customweddingco/69ede8b940d4890012892e71/5bb5f277613219b8a2d4c4fcc467c975/remove_the_customzation_202604260322.jpeg',
        category: 'Wedding Keepsakes',
    },
    engravedMirror: {
        name: 'Bespoke Engraved Compact Mirror',
        slug: 'bespoke-engraved-compact-mirror',
        price: 19.99,
        image: 'https://cdn.swell.store/customweddingco/69db1c7908b05800126051bf/ff4f91fc15e23df3e1743d4091eed070/lets_replace_the_202604112100.png',
        category: 'Wedding Keepsakes',
    },
    miniJewelryCase: {
        name: 'The Heirloom Mini Velvet Jewelry Case',
        slug: 'the-heirloom-mini-velvet-jewelry-case',
        price: 24,
        image: 'https://cdn.swell.store/customweddingco/69f24fb74c280a0012a73bf1/49c62c8cacac9fedaaa3ebb1253f7b92/replace_the_design_with_this._202604300227.jpeg',
        category: 'Jewelry & Accessories',
    },
    velvetJewelryCase: {
        name: 'Bespoke Velvet Heirloom Jewelry Case',
        slug: 'bespoke-velvet-heirloom-jewelry-case',
        price: 29,
        image: 'https://cdn.swell.store/customweddingco/69f1df9788181000125023e4/370315a6aa11c140be889622c10591e5/replace_natalie_with_this_and_202604291815.jpeg',
        category: 'Jewelry & Accessories',
    },
    champagneGlass: {
        name: 'Personalized Champagne Glass',
        slug: 'personlaized-champagne-glass-custom-champagne-glass-wedding-favor',
        price: 29.99,
        image: 'https://cdn.swell.store/customweddingco/69edf9cbdefa2f0012f349c9/8cb4e78873a9823c26ab943ea782195c/remove_the_customzation_202604260439.jpeg',
        category: 'Barware & Drinkware',
    },
    champagneFlute: {
        name: 'Bespoke Engraved Champagne Flute',
        slug: 'bespoke-engraved-champagne-flute',
        price: 29.99,
        image: 'https://cdn.swell.store/customweddingco/69d543fca56e480012f6575a/bc260738d3ed8af5615d2e15e79d7ce2/put_this_design_202604052224.png',
        category: 'Barware & Drinkware',
    },
    cosmeticPouch: {
        name: 'Custom Cream Cosmetic Pouch',
        slug: 'custom-cosmetic-pouch-personalized-bridal-party-gift',
        price: 29.99,
        image: 'https://cdn.swell.store/customweddingco/69edfa9ca8d4690012ef0cee/9ec0e615d569ad448877eee630fe5e24/remove_the_customzation_202604260444.jpeg',
        category: 'Bags & Totes',
    },
    corduroyPouch: {
        name: 'The Heirloom Corduroy Cosmetic Pouch',
        slug: 'heirloom-corduroy-cosmetic-pouch',
        price: 23.99,
        image: 'https://cdn.swell.store/customweddingco/69db1235546a5a00124a6676/708f8713be2ad4e58be36534c50b9669/can_you_replace_202604112002.png',
        category: 'Bags & Totes',
    },
    canvasTote: {
        name: 'Personalized Embroidered Canvas Tote',
        slug: 'personalized-embroidered-canvas-tote-custom-bridal-party-gift',
        price: 29.99,
        image: 'https://cdn.swell.store/customweddingco/69ede1fb517c510012054a01/ba3a6b209edab4c024440e833eef977c/change_the_personalization_202604260252.jpeg',
        category: 'Bags & Totes',
    },
    burlapTote: {
        name: 'Bespoke Canvas & Burlap Tote',
        slug: 'bespoke-canvas-and-burlap-tote',
        price: 35,
        image: 'https://cdn.swell.store/customweddingco/69ef25e08db6e900128c30cd/0580f3593ec7063fddf1a19f18e13d1f/Using_the_provided_202604271640.jpeg',
        category: 'Bags & Totes',
    },
    hairClaw: {
        name: 'The Bridal Hair Claw',
        slug: 'the-to-have-and-to-hold-bridal-hair-claw',
        price: 15,
        image: 'https://cdn.swell.store/customweddingco/6a038394493962001256383a/cc8eda864b0b3e62bb568ac9e21e8591/Create_a_realistic_wedding_product_202605130340.jpeg',
        category: 'Bridal Accessories',
    },
    scrunchies: {
        name: 'Cream Silk Bridal Scrunchies',
        slug: 'bespoke-mulberry-silk-bridal-scrunchies',
        price: 18,
        image: 'https://cdn.swell.store/customweddingco/6a03770f4dc85600112063d6/883bbb01f2de035cc261fa3eb551a848/Create_a_realistic_lifestyle_product_202605130252.jpeg',
        category: 'Wedding Hair Accessories',
    },
    slippers: {
        name: 'The Bespoke Bridal Slipper',
        slug: 'bespoke-bridal-slipper',
        price: 24.99,
        image: 'https://cdn.swell.store/customweddingco/69f441cff1c61d0012c25589/c89a2cee414d5b4bd8aefc3343604770/can_you_make_bridesmaid_the_202605011356.jpeg',
        category: 'Apparel & Loungewear',
    },
    hairbrush: {
        name: 'The Heirloom Botanical Hairbrush',
        slug: 'the-heirloom-botanical-hairbrush',
        price: 29.99,
        image: 'https://cdn.swell.store/customweddingco/69f43c9a13660b00129f8bf2/8f0ccabdb0bcbbfab74909e3cf680eb0/change_the_logo_to_this._202605011338.jpeg',
        category: 'Bridal Accessories',
    },
}

const curatedBoxes = [
    {
        id: 'proposal',
        name: 'The Bridesmaid Proposal Box',
        description: 'A polished proposal moment with the pieces she will see, use, and keep.',
        includes: ['Custom robe', 'Custom sleep mask', 'Custom compact mirror', 'Custom jewelry box', 'Personalized card'],
        bestFor: 'Asking "Will you be my bridesmaid?"',
        cta: 'Personalize This Box',
        imageKey: 'baseBox' as ProductKey,
        itemKeys: ['robe', 'sleepMask', 'compactMirror', 'miniJewelryCase'] as ProductKey[],
        href: `${builderHref}?preset=bridesmaid-proposal`,
    },
    {
        id: 'getting-ready',
        name: 'The Getting Ready Box',
        description: 'Made for bridal suite photos, wedding morning details, and matching keepsakes.',
        includes: ['Custom robe', 'Custom sleep mask', 'Compact mirror', 'Jewelry keepsake', 'Optional champagne glass add-on'],
        bestFor: 'Wedding morning photos and bridal suite gifts',
        cta: 'Customize This Box',
        imageKey: 'robe' as ProductKey,
        itemKeys: ['robe', 'sleepMask', 'compactMirror', 'champagneFlute'] as ProductKey[],
        href: `${builderHref}?preset=getting-ready`,
    },
    {
        id: 'luxe-keepsake',
        name: 'The Luxe Keepsake Box',
        description: 'An elevated mix for the maid of honor, sister, or bridal party VIP.',
        includes: ['Custom jewelry box', 'Compact mirror', 'Robe or sleep mask', 'Personalized keepsake card', 'Premium packaging'],
        bestFor: 'Maid of honor, sister, or VIP bridesmaid',
        cta: 'Shop This Box',
        imageKey: 'velvetJewelryCase' as ProductKey,
        itemKeys: ['velvetJewelryCase', 'compactMirror', 'robe', 'cosmeticPouch'] as ProductKey[],
        href: `${builderHref}?preset=luxe-keepsake`,
    },
    {
        id: 'self-care',
        name: 'The Self-Care Bridesmaid Box',
        description: 'Soft, pampering details that feel thoughtful before the wedding weekend begins.',
        includes: ['Sleep mask', 'Robe', 'Beauty-inspired add-ons', 'Compact mirror', 'Personalized card'],
        bestFor: 'Soft, emotional, pampering gift moments',
        cta: 'Personalize This Box',
        imageKey: 'sleepMask' as ProductKey,
        itemKeys: ['sleepMask', 'robe', 'hairClaw', 'scrunchies'] as ProductKey[],
        href: `${builderHref}?preset=self-care`,
    },
    {
        id: 'minimal',
        name: 'The Minimal Bridesmaid Box',
        description: 'A simple, polished gift when you want the presentation to feel complete without overbuilding.',
        includes: ['Compact mirror', 'Jewelry box', 'Personalized card', 'Small keepsake item'],
        bestFor: 'Simple, polished bridal party gifting',
        cta: 'Customize This Box',
        imageKey: 'compactMirror' as ProductKey,
        itemKeys: ['compactMirror', 'miniJewelryCase', 'hairClaw', 'scrunchies'] as ProductKey[],
        href: `${builderHref}?preset=minimal`,
    },
]

const valuePoints = [
    'Personalized with names or initials',
    'Curated boxes ready to customize',
    'Digital proof before production',
    'Bulk-friendly for bridal parties',
]

const processSteps = [
    'Choose a curated box',
    'Add names, initials, colors, or wedding details',
    'Review your digital proof',
    'We craft, pack, and ship your gifts',
]

const socialProof = [
    'Loved by 10,000+ couples',
    '4.9 average rating',
    'Digital proofs included',
    'Bulk orders welcome',
]

const reviews = [
    'The boxes felt so personal. My bridesmaids were obsessed.',
    'Seeing everyone&apos;s name on the gifts made it feel so much more special.',
    'The proofing process made ordering for my bridal party easy.',
]

const comparisonRows = [
    ['Fastest path', 'Most flexible'],
    ['Preselected combinations', 'Choose every item'],
    ['Still personalized', 'Best for a specific vision'],
    ['Best for bridesmaid proposals', 'Takes more decisions'],
    ['Great for guided gifting', 'Great for custom themes'],
]

const faqItems = [
    {
        q: 'Can I personalize each bridesmaid box with a different name?',
        a: 'Yes. Add each bridesmaid&apos;s name, initials, color preferences, or wedding details in the builder so every gift feels personal.',
    },
    {
        q: 'Can I choose different items for each bridesmaid?',
        a: 'Yes. Start with a curated box for guidance, then use the builder if you want to adjust items for each person.',
    },
    {
        q: 'Will I see a proof before production?',
        a: 'Yes. Personalized items include a digital proof before production so you can approve the details first.',
    },
    {
        q: 'How far before my wedding should I order?',
        a: 'Order as early as possible for bridal parties. If your date is close, contact us before ordering so we can confirm timing.',
    },
    {
        q: 'Do you offer bulk pricing for bridal parties?',
        a: 'Many bridal party gifts and box items are bulk-friendly. Larger orders can be planned through the builder or with our team.',
    },
    {
        q: 'Can I send these directly to each bridesmaid?',
        a: 'Yes. Use the shipping details at checkout, or contact us if you need help coordinating multiple delivery addresses.',
    },
    {
        q: 'What is the difference between curated boxes and build-your-own boxes?',
        a: 'Curated boxes give you a ready-made starting point. Build-your-own lets you choose every item from scratch.',
    },
    {
        q: 'Which box is best for a bridesmaid proposal?',
        a: 'The Bridesmaid Proposal Box is the strongest starting point because it includes the robe, sleep mask, mirror, jewelry box, and card moment.',
    },
]

const addOnKeys: ProductKey[] = [
    'robe',
    'sleepMask',
    'compactMirror',
    'miniJewelryCase',
    'champagneFlute',
    'cosmeticPouch',
    'canvasTote',
    'hairClaw',
]

function formatPrice(price: number) {
    if (!price || price <= 0) return 'Personalized options'
    return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`
}

function trimProductName(name: string) {
    return name.split('|')[0].trim()
}

function getProductImage(product: StoreProduct, fallback: string) {
    return product.images?.[0]?.file?.url || product.images?.[0]?.url || fallback
}

function resolveProduct(product: StoreProduct | undefined, fallback: Omit<ResolvedProduct, 'href' | 'priceLabel'>): ResolvedProduct {
    const price = product ? getLowestDisplayPrice(product) : fallback.price
    const slug = product?.slug || fallback.slug
    const name = trimProductName(product?.name || fallback.name)
    const image = product ? getProductImage(product, fallback.image) : fallback.image
    const category = product?.categories?.[0]?.name || fallback.category

    return {
        name,
        slug,
        href: `/products/${slug}`,
        price,
        priceLabel: price > 0 ? `From ${formatPrice(price)}` : 'Personalized options',
        image,
        category,
    }
}

async function getResolvedProducts() {
    const response = await getProducts()
    const storeProducts = (response?.results || []) as StoreProduct[]
    const productsBySlug = new Map(storeProducts.map((product) => [product.slug, product]))

    return Object.fromEntries(
        Object.entries(productSlugs).map(([key, slug]) => [
            key,
            resolveProduct(productsBySlug.get(slug), fallbackProducts[key as ProductKey]),
        ])
    ) as Record<ProductKey, ResolvedProduct>
}

function SectionHeader({
    eyebrow,
    title,
    copy,
    align = 'center',
}: {
    eyebrow?: string
    title: string
    copy?: string
    align?: 'center' | 'left'
}) {
    return (
        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
            {eyebrow && (
                <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">
                    {eyebrow}
                </p>
            )}
            <h2 className="font-display text-3xl leading-tight text-espresso sm:text-4xl md:text-5xl">
                {title}
            </h2>
            {copy && (
                <p className="mt-4 text-base leading-7 text-espresso/70 md:text-lg">
                    {copy}
                </p>
            )}
        </div>
    )
}

function CtaLink({
    href,
    children,
    variant = 'primary',
    className = '',
}: {
    href: string
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'light'
    className?: string
}) {
    const styles = {
        primary: 'bg-espresso text-cream hover:bg-espresso-light',
        secondary: 'border border-espresso/25 bg-cream text-espresso hover:border-espresso hover:bg-espresso hover:text-cream',
        light: 'border border-cream/55 bg-cream text-espresso hover:bg-gold hover:text-white hover:border-gold',
    }

    return (
        <Link
            href={href}
            className={`inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-center font-sans text-xs font-bold uppercase tracking-[0.15em] transition-colors ${styles[variant]} ${className}`}
        >
            {children}
            <ArrowRight className="h-4 w-4" />
        </Link>
    )
}

export default async function PrebuiltBridesmaidBoxesPage() {
    const products = await getResolvedProducts()

    return (
        <main className="bg-cream pb-24 text-espresso md:pb-0">
            <section className="relative flex min-h-[610px] items-end overflow-hidden bg-espresso md:min-h-[720px]">
                <Image
                    src={heroImage}
                    alt="Personalized bridesmaid gift box with robe, mirror, pouch, and keepsakes"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-espresso/35 via-espresso/35 to-espresso/88" />
                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-28 sm:px-6 md:pb-20 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.24em] text-gold-light">
                            Personalized Bridesmaid Boxes
                        </p>
                        <h1 className="font-display text-[2.65rem] leading-[1.02] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
                            Build a Bridesmaid Box She&apos;ll Actually Remember
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-cream/88 sm:text-lg md:text-xl">
                            Choose a curated box, personalize every detail, and create a bridesmaid gift that feels made just for her.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <CtaLink href="#curated-boxes" variant="light" className="w-full sm:w-auto">
                                Shop Curated Boxes
                            </CtaLink>
                            <CtaLink href="#build-your-own" variant="secondary" className="w-full border-cream/45 bg-transparent text-cream hover:bg-cream hover:text-espresso sm:w-auto">
                                Build Your Own Box
                            </CtaLink>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream/82">
                            <span>Free personalization</span>
                            <span className="text-gold-light">/</span>
                            <span>Digital proof before production</span>
                            <span className="text-gold-light">/</span>
                            <span>Ships beautifully packaged</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-gold/20 bg-cream-dark">
                <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                    {valuePoints.map((point) => (
                        <div key={point} className="flex items-center gap-3 text-sm font-semibold text-espresso">
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-gold/30 bg-cream text-gold">
                                <Check className="h-4 w-4" />
                            </span>
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section id="curated-boxes" className="scroll-mt-40 px-5 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Curated first"
                        title="Start With a Curated Box"
                        copy="The easiest way to gift something personal without building from a blank page."
                    />

                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {curatedBoxes.slice(0, 3).map((box) => (
                            <article key={box.id} className="border border-gold/25 bg-white shadow-[0_18px_45px_rgba(74,44,42,0.08)]">
                                <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                                    <Image
                                        src={products[box.imageKey].image}
                                        alt={box.name}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, 100vw"
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute left-4 top-4 bg-cream px-3 py-1.5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.18em] text-espresso">
                                        Curated
                                    </div>
                                </div>
                                <div className="p-5 sm:p-6">
                                    <h3 className="font-serif text-2xl leading-tight text-espresso">{box.name}</h3>
                                    <p className="mt-3 text-sm leading-6 text-espresso/70">{box.description}</p>

                                    <div className="mt-5 grid grid-cols-4 gap-2" aria-label={`${box.name} product thumbnails`}>
                                        {box.itemKeys.map((key) => (
                                            <div key={key} className="relative aspect-square overflow-hidden border border-gold/20 bg-cream-dark">
                                                <Image
                                                    src={products[key].image}
                                                    alt={products[key].name}
                                                    fill
                                                    sizes="80px"
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5">
                                        <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">Includes</p>
                                        <ul className="mt-3 space-y-2 text-sm text-espresso/75">
                                            {box.includes.map((item) => (
                                                <li key={item} className="flex gap-2">
                                                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-5 border-y border-gold/20 py-4">
                                        <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">Best for</p>
                                        <p className="mt-2 text-sm font-semibold text-espresso">{box.bestFor}</p>
                                    </div>

                                    <div className="mt-5 flex flex-col gap-3">
                                        <CtaLink href={box.href} className="w-full">
                                            {box.cta}
                                        </CtaLink>
                                        <p className="text-center text-xs font-semibold uppercase tracking-[0.13em] text-espresso/55">
                                            Personalization proof included
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        {curatedBoxes.slice(3).map((box) => (
                            <article key={box.id} className="grid gap-5 border border-gold/25 bg-white p-4 shadow-[0_18px_45px_rgba(74,44,42,0.07)] sm:grid-cols-[180px_1fr] sm:p-5">
                                <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark sm:aspect-auto">
                                    <Image
                                        src={products[box.imageKey].image}
                                        alt={box.name}
                                        fill
                                        sizes="(min-width: 768px) 180px, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl leading-tight text-espresso">{box.name}</h3>
                                    <p className="mt-2 text-sm leading-6 text-espresso/70">{box.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {box.itemKeys.map((key) => (
                                            <span key={key} className="border border-gold/25 bg-cream px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-espresso/70">
                                                {products[key].name}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-sm font-semibold text-espresso">{box.bestFor}</p>
                                    <CtaLink href={box.href} className="mt-5 w-full sm:w-auto">
                                        {box.cta}
                                    </CtaLink>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-5 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <SectionHeader
                        eyebrow="How personalization works"
                        title="Personal, Without the Guesswork"
                        copy="You get the ease of a prebuilt box with the emotion of a custom gift."
                        align="left"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {processSteps.map((step, index) => (
                            <div key={step} className="border border-gold/25 bg-cream p-5">
                                <span className="font-serif text-3xl text-gold">{String(index + 1).padStart(2, '0')}</span>
                                <h3 className="mt-3 font-serif text-xl text-espresso">{step}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="overflow-hidden bg-cream-dark px-5 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                    <div className="relative min-h-[420px] overflow-hidden bg-espresso">
                        <Image
                            src="/images/home/bridesmaid_box_lifestyle.png"
                            alt="Premium bridesmaid box unboxing with personalized gifts"
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <SectionHeader
                            eyebrow="The unboxing moment"
                            title="The Moment She Opens It Is the Whole Point"
                            copy="A bridesmaid box should feel like more than a gift. When she sees her name on the robe, sleep mask, mirror, and jewelry box, it turns the proposal into a keepsake moment."
                            align="left"
                        />
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {['Her name on the robe', 'Her initials on the sleep mask', 'A compact mirror she can use on the wedding day', 'A jewelry box she will keep after the wedding'].map((callout) => (
                                <div key={callout} className="flex gap-3 border border-gold/25 bg-cream p-4">
                                    <Heart className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                                    <span className="text-sm font-semibold leading-5 text-espresso">{callout}</span>
                                </div>
                            ))}
                        </div>
                        <CtaLink href="#curated-boxes" className="mt-8 w-full sm:w-auto">
                            Create Her Box
                        </CtaLink>
                    </div>
                </div>
            </section>

            <section id="build-your-own" className="scroll-mt-40 bg-espresso px-5 py-16 text-cream sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                    <div>
                        <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Full control</p>
                        <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
                            Want Full Control? Build Your Own Box
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-cream/75 md:text-lg">
                            Start from scratch, choose each item yourself, and personalize the box color, lid message, names, and gift details. Curated boxes are faster if you want the easiest path.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                        <CtaLink href={builderHref} variant="light" className="w-full">
                            Build Your Own Box
                        </CtaLink>
                        <CtaLink href="#curated-boxes" variant="secondary" className="w-full border-cream/45 bg-transparent text-cream hover:bg-cream hover:text-espresso">
                            Compare Curated Boxes
                        </CtaLink>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Popular add-ons"
                        title="Personalized Details Bridesmaids Actually Use"
                        copy="These are real catalog items that fit beautifully inside a proposal box, getting-ready gift, or bridal party keepsake set."
                    />
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {addOnKeys.map((key) => (
                            <Link key={key} href={products[key].href} className="group border border-gold/25 bg-white p-3 transition-colors hover:border-gold">
                                <div className="relative aspect-square overflow-hidden bg-cream-dark">
                                    <Image
                                        src={products[key].image}
                                        alt={products[key].name}
                                        fill
                                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="pt-4">
                                    <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.15em] text-gold">{products[key].category}</p>
                                    <h3 className="mt-2 min-h-12 font-serif text-lg leading-tight text-espresso">{products[key].name}</h3>
                                    <div className="mt-3 flex items-center justify-between gap-3">
                                        <span className="font-sans text-sm font-bold text-espresso">{products[key].priceLabel}</span>
                                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-5 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Social proof"
                        title="Bridesmaid Gifts That Feel Thoughtful"
                    />
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {socialProof.map((proof) => (
                            <div key={proof} className="flex items-center gap-3 border border-gold/25 bg-cream p-4">
                                <Star className="h-4 w-4 flex-shrink-0 fill-gold text-gold" />
                                <span className="text-sm font-bold text-espresso">{proof}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {reviews.map((review) => (
                            <figure key={review} className="border border-gold/25 bg-cream-dark p-5">
                                <div className="mb-4 flex gap-1 text-gold" aria-label="Five star review">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star key={index} className="h-4 w-4 fill-gold" />
                                    ))}
                                </div>
                                <blockquote className="text-base leading-7 text-espresso/75" dangerouslySetInnerHTML={{ __html: `&ldquo;${review}&rdquo;` }} />
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="Choose your path"
                        title="Curated Box or Build Your Own?"
                    />
                    <div className="mt-10 overflow-hidden border border-gold/25 bg-white">
                        <div className="grid grid-cols-2 bg-espresso text-cream">
                            <div className="p-4 font-serif text-xl">Curated Boxes</div>
                            <div className="border-l border-cream/20 p-4 font-serif text-xl">Build Your Own</div>
                        </div>
                        {comparisonRows.map(([curated, custom]) => (
                            <div key={curated} className="grid grid-cols-2 border-t border-gold/20 text-sm text-espresso/75">
                                <div className="flex items-start gap-2 p-4">
                                    <PackageCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                                    <span>{curated}</span>
                                </div>
                                <div className="flex items-start gap-2 border-l border-gold/20 p-4">
                                    <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                                    <span>{custom}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <CtaLink href="#curated-boxes">
                            Start With a Curated Box
                        </CtaLink>
                    </div>
                </div>
            </section>

            <section className="bg-cream-dark px-5 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <SectionHeader
                        eyebrow="FAQ"
                        title="Answers Before You Build"
                        copy="Short answers for brides, planners, and gift buyers ordering for a bridal party."
                        align="left"
                    />
                    <div className="space-y-3">
                        {faqItems.map((item) => (
                            <details key={item.q} className="group border border-gold/25 bg-cream p-5">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-espresso">
                                    {item.q}
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-gold/30 text-gold transition-transform group-open:rotate-45">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-4 text-sm leading-6 text-espresso/70" dangerouslySetInnerHTML={{ __html: item.a }} />
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-espresso px-5 py-16 text-center text-cream sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <Gift className="mx-auto mb-5 h-8 w-8 text-gold-light" />
                    <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
                        Ready to Make Your Bridesmaids Feel Chosen?
                    </h2>
                    <p className="mt-4 text-base leading-7 text-cream/75 md:text-lg">
                        Start with a curated box, personalize the details, and create a gift they will remember long after the wedding.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <CtaLink href="#curated-boxes" variant="light" className="w-full sm:w-auto">
                            Shop Curated Boxes
                        </CtaLink>
                        <CtaLink href="#build-your-own" variant="secondary" className="w-full border-cream/45 bg-transparent text-cream hover:bg-cream hover:text-espresso sm:w-auto">
                            Build Your Own Box
                        </CtaLink>
                    </div>
                    <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
                        {['Free personalization', 'Proof before production', 'Bulk-friendly options', 'Free shipping over $99'].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-sm font-semibold text-cream/82">
                                {item.includes('shipping') ? <Truck className="h-4 w-4 text-gold-light" /> : <ShieldCheck className="h-4 w-4 text-gold-light" />}
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-cream/96 px-4 py-3 shadow-[0_-10px_30px_rgba(74,44,42,0.16)] backdrop-blur md:hidden">
                <Link
                    href="#curated-boxes"
                    className="flex min-h-12 items-center justify-center gap-2 bg-espresso px-5 py-3 text-center font-sans text-xs font-bold uppercase tracking-[0.16em] text-cream"
                >
                    Shop Bridesmaid Boxes
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </main>
    )
}
