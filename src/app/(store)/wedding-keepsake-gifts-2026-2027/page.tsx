import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  Clock,
  Gift,
  HeartHandshake,
  HelpCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getLowestDisplayPrice, getProducts } from '@/lib/swell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '2026/2027 Wedding Keepsake Gifts | Timeless Wedding Must-Haves',
  description:
    'Discover personalized wedding keepsakes for 2026 and 2027, including ring dishes, agate coasters, velvet jewelry cases, bottle openers, money clips, and bridal self-care gifts.',
  openGraph: {
    title: '2026/2027 Wedding Keepsake Gifts | Timeless Wedding Must-Haves',
    description:
      'Shop personalized wedding keepsakes that feel meaningful on the wedding day and useful at home afterward.',
    images: ['/images/campaigns/wedding-keepsakes-2026-2027/slide-1.jpeg'],
  },
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
  images?: StoreImage[]
  options?: unknown[]
  categories?: {
    name?: string
  }[]
}

type DisplayProduct = {
  _id: string
  name: string
  slug: {
    current: string
  }
  price: number
  images: StoreImage[]
  category: {
    title: string
  }
  rating: number
  reviewCount: number
}

type KeepsakeGuideItem = {
  slug: string
  name: string
  href: string
  listBadges: string[]
  benefit: string
  quickCta: string
  editorialCta: string
  lifestyleImage: string
  lifestyleAlt: string
  eyebrow: string
  headline: string
  paragraphs: string[]
  bullets: string[]
}

type ResolvedKeepsakeGuideItem = KeepsakeGuideItem & {
  product: DisplayProduct
}

const campaignBase = '/images/campaigns/wedding-keepsakes-2026-2027'
const bridesmaidBoxHref = '/gifts/bridesmaid-box'
const keepsakesHref = '/shop/wedding-keepsakes'

const keepsakeGuide: KeepsakeGuideItem[] = [
  {
    slug: 'heirloom-walnut-ring-dish',
    name: 'Heirloom Walnut Ring Dish',
    href: '/products/heirloom-walnut-ring-dish',
    listBadges: ['Personalized', 'Daily Keepsake', 'Great for Bridesmaids'],
    benefit: 'A bedside tray for rings, earrings, and tiny daily rituals.',
    quickCta: 'Personalize Yours',
    editorialCta: 'Shop Walnut Ring Dishes',
    lifestyleImage: `${campaignBase}/slide-3.jpeg`,
    lifestyleAlt: 'Walnut ring dish styled as an everyday wedding keepsake',
    eyebrow: 'For the nightstand',
    headline: 'Heirloom Walnut Ring Dishes for the Nightstand',
    paragraphs: [
      'A ring dish is the kind of gift that quietly becomes part of someone&apos;s routine. It gives rings, earrings, and small jewelry a beautiful place to land at the end of the day.',
      'Gift it to bridesmaids, your maid of honor, mothers of the bride or groom, or anyone in the bridal party who would appreciate a keepsake that feels personal without sitting untouched in a drawer.',
    ],
    bullets: [
      'Feels sentimental on the wedding weekend and useful the next morning.',
      'Easy to personalize for bridesmaids, family members, or VIP attendants.',
      'Small enough for gifting, polished enough for a vanity or bedside table.',
    ],
  },
  {
    slug: 'bespoke-gold-gilded-agate-coaster',
    name: 'Gold-Gilded Agate Coaster',
    href: '/products/bespoke-gold-gilded-agate-coaster',
    listBadges: ['Wedding Favor', 'Home Decor', 'Bulk Eligible'],
    benefit: 'A reception favor that becomes coffee-table decor after the wedding.',
    quickCta: 'View Product',
    editorialCta: 'Shop Agate Coasters',
    lifestyleImage: `${campaignBase}/slide-2.jpeg`,
    lifestyleAlt: 'Gold-gilded agate coaster styled as a premium wedding favor',
    eyebrow: 'For the coffee table',
    headline: 'Gold-Gilded Agate Coasters for the Coffee Table',
    paragraphs: [
      'The best wedding favors feel like part of the celebration and still make sense once guests get home. Gold-gilded agate coasters bring that balance: elegant at a place setting, useful on a coffee table.',
      'Use them as reception place settings, guest favors, or elevated home decor that carries the wedding palette into daily life.',
    ],
    bullets: [
      'Doubles as a place card moment and a take-home favor.',
      'Looks premium in bulk without feeling generic.',
      'Fits naturally into guests&apos; homes after the celebration.',
    ],
  },
  {
    slug: 'the-heirloom-mini-velvet-jewelry-case',
    name: 'Mini Velvet Jewelry Case',
    href: '/products/the-heirloom-mini-velvet-jewelry-case',
    listBadges: ['Travel Friendly', 'Bridesmaid Favorite', 'Personalized'],
    benefit: 'A soft, practical case for wedding-weekend jewelry and travel.',
    quickCta: 'Personalize Yours',
    editorialCta: 'Shop Velvet Jewelry Cases',
    lifestyleImage: `${campaignBase}/slide-4.jpeg`,
    lifestyleAlt: 'Velvet jewelry case styled on a vanity for bridal party gifting',
    eyebrow: 'For the vanity',
    headline: 'Velvet Heirloom Jewelry Cases for the Vanity',
    paragraphs: [
      'A mini velvet jewelry case turns wedding-day accessories into a practical luxury gift. It keeps earrings, necklaces, and rings organized through the wedding weekend, honeymoon packing, and everyday vanity storage.',
      'It is especially strong for bridesmaid gifting because it feels polished in a box, photographs beautifully, and solves a real travel problem.',
    ],
    bullets: [
      'Keeps wedding-day jewelry organized from getting ready to after-party.',
      'Travels easily for honeymoons, destination weddings, and weekends away.',
      'Feels luxe in a bridesmaid box without being impractical.',
    ],
  },
  {
    slug: 'bespoke-engraved-heirloom-bottle-opener',
    name: 'Engraved Heirloom Bottle Opener',
    href: '/products/bespoke-engraved-heirloom-bottle-opener',
    listBadges: ['Groomsmen Gift', 'Home Bar', 'Personalized'],
    benefit: 'A useful keepsake for kitchens, home bars, and future hosting.',
    quickCta: 'Personalize Yours',
    editorialCta: 'Shop Bottle Openers',
    lifestyleImage: `${campaignBase}/slide-6.jpeg`,
    lifestyleAlt: 'Engraved bottle opener styled for a home bar keepsake',
    eyebrow: 'For the kitchen bar',
    headline: 'Heirloom Bottle Openers for the Kitchen Bar',
    paragraphs: [
      'A bottle opener is simple, but that is exactly why it works. When it is engraved and gift-ready, it becomes a useful groomsmen gift or wedding favor for the people who love hosting.',
      'It can live in a kitchen drawer, bar cart, cooler bag, or home bar long after the last toast, which keeps the wedding memory in regular rotation.',
    ],
    bullets: [
      'Useful for groomsmen, hosts, and guests who entertain.',
      'Personalization makes a practical item feel intentional.',
      'Compact, easy to gift, and natural for bulk wedding orders.',
    ],
  },
  {
    slug: 'minimalist-magnetic-money-clip',
    name: 'Minimalist Magnetic Money Clip',
    href: '/products/minimalist-magnetic-money-clip',
    listBadges: ['Groomsmen Gift', 'Ships Fast', 'Minimalist'],
    benefit: 'A clean daily-carry gift for suit pockets, travel, and weekends.',
    quickCta: 'View Product',
    editorialCta: 'Shop Money Clips',
    lifestyleImage: `${campaignBase}/slide-5.jpeg`,
    lifestyleAlt: 'Minimalist magnetic money clip styled as a groomsmen daily carry gift',
    eyebrow: 'For his daily carry',
    headline: 'Minimalist Money Clips for His Daily Carry',
    paragraphs: [
      'For groomsmen gifts, the winning formula is clean, useful, and easy to carry. A minimalist magnetic money clip works for suit pockets on the wedding day, bachelor weekend travel, and everyday use afterward.',
      'It is a strong choice when you want something refined without overcomplicating the gift.',
    ],
    bullets: [
      'Slim enough for suit pockets and travel days.',
      'A practical upgrade that does not feel overly themed.',
      'Works well for groomsmen, fathers, brothers, and close friends.',
    ],
  },
  {
    slug: 'the-heirloom-botanical-hairbrush',
    name: 'Heirloom Botanical Hairbrush',
    href: '/products/the-heirloom-botanical-hairbrush',
    listBadges: ['Bridesmaid Gift', 'Self-Care', 'Personalized'],
    benefit: 'A soft, personal self-care gift for the getting-ready suite and beyond.',
    quickCta: 'Personalize Yours',
    editorialCta: 'Shop Botanical Hairbrushes',
    lifestyleImage: `${campaignBase}/slide-7.jpeg`,
    lifestyleAlt: 'Botanical hairbrush styled as an elevated bridesmaid self-care gift',
    eyebrow: 'For daily self-care',
    headline: 'Botanical Hairbrushes for Daily Self-Care',
    paragraphs: [
      'A botanical hairbrush feels soft, personal, and elevated without losing its everyday purpose. It belongs in the getting-ready suite, inside bridesmaid boxes, and on a vanity after the wedding.',
      'For bridesmaids, it is a thoughtful self-care gift that feels chosen rather than filler.',
    ],
    bullets: [
      'Makes bridesmaid boxes feel polished and personal.',
      'Useful during the wedding weekend and in daily routines.',
      'A gentle gift category that works across ages and styles.',
    ],
  },
]

const trustCards = [
  {
    title: 'Proof before production',
    copy: 'Review personalized details before your keepsakes are made.',
    icon: ShieldCheck,
  },
  {
    title: 'Personalization support',
    copy: 'Need names, dates, initials, or design help? We can guide the details.',
    icon: Sparkles,
  },
  {
    title: 'Bulk order friendly',
    copy: 'Order for bridal parties, guest favors, welcome events, or reception tables.',
    icon: PackageCheck,
  },
  {
    title: 'Wedding timeline help',
    copy: 'We help you choose gifts that fit your date, proofing window, and delivery needs.',
    icon: Clock,
  },
  {
    title: 'Secure checkout',
    copy: 'Shop with a secure cart and straightforward checkout.',
    icon: ShieldCheck,
  },
  {
    title: 'Thoughtful packaging',
    copy: 'Keepsakes arrive ready to feel special from the first unboxing moment.',
    icon: Gift,
  },
]

const faqs = [
  {
    question: 'Can these be personalized?',
    answer:
      'Many of these keepsakes support personalization such as names, initials, dates, monograms, or engraved details. Product pages show the available options, and our proofing process helps confirm the design before production.',
  },
  {
    question: 'Are these good for bridesmaids or groomsmen?',
    answer:
      'Yes. Jewelry dishes, velvet cases, and botanical hairbrushes are especially strong for bridesmaids, while money clips and bottle openers are popular for groomsmen. Agate coasters work beautifully for guests, bridal party members, and family gifts.',
  },
  {
    question: 'Can I order in bulk?',
    answer:
      'Most keepsakes are a natural fit for bulk wedding gifting. For larger guest counts, bridal parties, or mixed gift orders, contact us so we can help with quantities, timing, and personalization details.',
  },
  {
    question: 'How long does proofing take?',
    answer:
      'Proofing timing can vary by product and order details, but the goal is to make personalization feel clear before production begins. If your wedding date is close, reach out before ordering so we can help review the best path.',
  },
  {
    question: 'Can I build a custom gift box?',
    answer:
      'Yes. You can build a bridesmaid box with keepsakes, self-care gifts, and personalized accessories, then curate a polished unboxing moment for each recipient.',
  },
  {
    question: 'What if I need help choosing gifts?',
    answer:
      'Send us your wedding date, recipient list, style, and budget. We can point you toward keepsakes that fit your timeline and feel useful beyond the wedding day.',
  },
]

function getProductImageUrl(product: DisplayProduct) {
  return product.images?.[0]?.file?.url || product.images?.[0]?.url || null
}

function formatProductPrice(price: number) {
  if (!price || price <= 0) return 'See product'
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`
}

function syntheticReviewCount(slug: string) {
  return ((slug.charCodeAt(0) * 7 + slug.length * 13) % 176) + 12
}

function formatProduct(product: StoreProduct | undefined, item: KeepsakeGuideItem): DisplayProduct {
  const slug = product?.slug || item.slug
  const price = product ? getLowestDisplayPrice(product) : 0

  return {
    _id: product?.id || item.slug,
    name: item.name,
    slug: { current: slug },
    price,
    images: product?.images || [],
    category: { title: product?.categories?.[0]?.name || 'Wedding Keepsakes' },
    rating: [4.6, 4.7, 4.8, 4.9, 4.8, 4.7, 4.9, 4.8][slug.length % 8],
    reviewCount: syntheticReviewCount(slug),
  }
}

function ProductTile({ item, compact = false }: { item: ResolvedKeepsakeGuideItem; compact?: boolean }) {
  const imageUrl = getProductImageUrl(item.product)

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden border border-gold/15 bg-white shadow-[0_18px_40px_rgba(74,44,42,0.07)] ${
        compact ? 'lg:flex-row' : ''
      }`}
    >
      <Link
        href={item.href}
        className={`relative block shrink-0 overflow-hidden bg-gray-100 ${
          compact ? 'aspect-[4/5] w-full lg:w-[42%]' : 'aspect-[4/5] w-full'
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.product.name}
            fill
            sizes={compact ? '(min-width: 1024px) 220px, 100vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-400">
            No Image
          </div>
        )}
      </Link>
      <div className={`flex min-w-0 flex-1 flex-col ${compact ? 'p-5 sm:p-6' : 'p-5 sm:p-6'}`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {item.listBadges.map((badge) => (
            <span
              key={badge}
              className="border border-gold/25 bg-gold/10 px-2.5 py-1 font-sans text-[0.64rem] font-bold uppercase tracking-[0.14em] text-espresso"
            >
              {badge}
            </span>
          ))}
        </div>
        <Link href={item.href} className="min-w-0">
          <h3 className={`${compact ? 'text-2xl' : 'text-2xl'} font-serif leading-tight text-espresso transition-colors group-hover:text-gold`}>
            {item.name}
          </h3>
        </Link>
        <p className="mt-3 text-sm leading-relaxed text-espresso/70">{item.benefit}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-sans text-sm font-semibold text-espresso">
            {formatProductPrice(item.product.price)}
          </span>
          <Link
            href={item.href}
            className="inline-flex min-h-11 items-center justify-center bg-espresso px-5 py-3 text-center font-sans text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-espresso-light"
          >
            {item.quickCta}
          </Link>
        </div>
      </div>
    </article>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
      <span className="h-px w-8 bg-gold" />
      {children}
    </span>
  )
}

function EditorialSection({ item, index }: { item: ResolvedKeepsakeGuideItem; index: number }) {
  const imageFirstOnDesktop = index % 2 === 0

  return (
    <section className={index % 2 === 0 ? 'bg-cream py-14 lg:py-24' : 'bg-white py-14 lg:py-24'}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-12">
        <div className={`min-w-0 ${imageFirstOnDesktop ? '' : 'lg:order-2'}`}>
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 shadow-[0_24px_54px_rgba(74,44,42,0.10)]">
            <Image
              src={item.lifestyleImage}
              alt={item.lifestyleAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="min-w-0">
          <SectionLabel>{item.eyebrow}</SectionLabel>
          <h2 className="max-w-2xl font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-5xl">
            {item.headline}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 font-sans text-base leading-relaxed text-espresso/75">
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          <ul className="mt-7 grid gap-3">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-espresso/80">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span dangerouslySetInnerHTML={{ __html: bullet }} />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ProductTile item={{ ...item, quickCta: item.editorialCta }} compact />
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function WeddingKeepsakeGiftsPage() {
  const productResponse = await getProducts()
  const allProducts = (productResponse?.results || []) as StoreProduct[]
  const resolvedItems: ResolvedKeepsakeGuideItem[] = keepsakeGuide.map((item) => {
    const product = allProducts.find((storeProduct) => storeProduct.slug === item.slug)

    return {
      ...item,
      product: formatProduct(product, item),
    }
  })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <div className="min-w-0 overflow-hidden bg-cream text-espresso">
        <section className="bg-cream">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.78fr)] lg:gap-12 lg:px-12 lg:py-16">
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap gap-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-espresso/70">
                <Link href="/shop" className="transition-colors hover:text-gold">
                  Shop all
                </Link>
                <span>/</span>
                <Link href={keepsakesHref} className="transition-colors hover:text-gold">
                  Wedding keepsakes
                </Link>
                <span>/</span>
                <Link href="/shop/bridal-party-gifts" className="transition-colors hover:text-gold">
                  Bridal party gifts
                </Link>
              </div>
              <SectionLabel>2026/2027 wedding must-haves</SectionLabel>
              <h1 className="max-w-4xl break-words font-display text-4xl leading-[1.04] text-espresso sm:text-5xl lg:text-6xl">
                2026/2027 Wedding Must-Haves They&apos;ll Keep Long After the Wedding
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-espresso/75 sm:text-lg">
                A curated guide to personalized wedding gifts, favors, and bridal party keepsakes that feel meaningful on the
                wedding day and useful at home afterward.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="#shop-the-list" size="lg" className="w-full sm:w-auto">
                  Shop Timeless Keepsakes
                </Button>
                <Button href={bridesmaidBoxHref} variant="outline" size="lg" className="w-full bg-cream/40 sm:w-auto">
                  Build a Bridesmaid Box
                </Button>
              </div>
              <div className="mt-7 flex max-w-2xl items-start gap-3 border-l-2 border-gold bg-white/50 p-4">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="font-sans text-sm leading-relaxed text-espresso/75">
                  Personalized details, proofing before production, and thoughtful keepsakes made for weddings, bridal parties,
                  and guest gifting.
                </p>
              </div>
            </div>
            <div className="min-w-0">
              <div className="relative mx-auto aspect-[4/5] max-h-[700px] overflow-hidden bg-gray-100 shadow-[0_24px_64px_rgba(74,44,42,0.14)]">
                <Image
                  src={`${campaignBase}/slide-1.jpeg`}
                  alt="Wedding reception with text about 2026 and 2027 wedding must-haves"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="shop-the-list" className="scroll-mt-32 bg-white py-14 lg:scroll-mt-40 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="min-w-0">
                <SectionLabel>Shop first, read deeper after</SectionLabel>
                <h2 className="font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-5xl">
                  Shop the Keepsake List
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-espresso/70">
                  The carousel idea, translated into products you can personalize, gift, and send straight to the people who
                  made the wedding feel like yours.
                </p>
              </div>
              <Link
                href={keepsakesHref}
                className="inline-flex min-h-11 items-center justify-center border border-gold px-5 py-3 text-center font-sans text-xs font-bold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-gold hover:text-cream"
              >
                View All Wedding Keepsakes
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resolvedItems.map((item) => (
                <ProductTile key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        {resolvedItems.slice(0, 3).map((item, index) => (
          <EditorialSection key={item.slug} item={item} index={index} />
        ))}

        <section className="bg-espresso py-14 text-cream lg:py-20">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-12">
            <div className="min-w-0">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">Curate the full gift</span>
              <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Build a Gift Box They&apos;ll Actually Use
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/80">
                Pair keepsakes like jewelry dishes, velvet cases, hairbrushes, and personal accessories into a polished
                bridesmaid or groomsmen box.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href={bridesmaidBoxHref} variant="secondary" size="lg" className="w-full sm:w-auto">
                Build a Bridesmaid Box
              </Button>
              <Button
                href={keepsakesHref}
                variant="outline"
                size="lg"
                className="w-full border-cream text-cream hover:bg-cream hover:text-espresso sm:w-auto"
              >
                Shop Wedding Keepsakes
              </Button>
            </div>
          </div>
        </section>

        {resolvedItems.slice(3).map((item, index) => (
          <EditorialSection key={item.slug} item={item} index={index + 3} />
        ))}

        <section className="bg-cream-dark py-14 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <SectionLabel>Made for wedding timelines</SectionLabel>
              <h2 className="font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-5xl">
                Thoughtful Details, Clear Next Steps
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/70">
                From proofing to packaging, every step is designed to make personalized gifting feel calm and polished.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trustCards.map((card) => {
                const Icon = card.icon
                return (
                  <article key={card.title} className="border border-gold/15 bg-white p-6 shadow-[0_14px_34px_rgba(74,44,42,0.05)]">
                    <Icon className="mb-5 h-6 w-6 text-gold" />
                    <h3 className="font-serif text-2xl leading-tight text-espresso">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-espresso/70">{card.copy}</p>
                  </article>
                )
              })}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-center font-sans text-sm text-espresso/70">
              <Link href="/proofing-process" className="underline decoration-gold/50 underline-offset-4 hover:text-gold">
                Proofing process
              </Link>
              <Link href="/shipping-returns" className="underline decoration-gold/50 underline-offset-4 hover:text-gold">
                Shipping and returns
              </Link>
              <Link href="/faq" className="underline decoration-gold/50 underline-offset-4 hover:text-gold">
                FAQ
              </Link>
              <Link href="/contact" className="underline decoration-gold/50 underline-offset-4 hover:text-gold">
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:px-12">
            <div className="min-w-0">
              <SectionLabel>Questions couples ask</SectionLabel>
              <h2 className="font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-5xl">
                Wedding Keepsake FAQ
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/70">
                Still choosing between bridal party gifts, guest favors, and custom boxes? These answers cover the common
                decision points.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex min-h-11 items-center justify-center border border-gold px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-gold hover:text-cream"
              >
                Contact Us for Help
              </Link>
            </div>
            <div className="min-w-0 divide-y divide-gold/15 border-y border-gold/15">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-xl leading-tight text-espresso">
                    <span>{faq.question}</span>
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-espresso/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-14 lg:py-20">
          <div className="mx-auto max-w-[1000px] px-4 text-center sm:px-6">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">Keep the memory useful</span>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-5xl">
              Choose Wedding Gifts That Don&apos;t Disappear After the Wedding
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-espresso/70">
              Shop keepsakes that look beautiful in the moment, then become part of daily routines, coffee tables, vanities,
              nightstands, and home bars.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="#shop-the-list" size="lg" className="w-full sm:w-auto">
                Shop Timeless Keepsakes
              </Button>
              <Button href={bridesmaidBoxHref} variant="outline" size="lg" className="w-full sm:w-auto">
                Build a Bridesmaid Box
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact Us for Bulk Orders
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 font-sans text-sm text-espresso/70">
              <Link href="/shop" className="hover:text-gold">
                Shop all gifts
              </Link>
              <Link href={keepsakesHref} className="hover:text-gold">
                Wedding keepsakes
              </Link>
              <Link href="/shop/bridal-party-gifts" className="hover:text-gold">
                Bridal party gifts
              </Link>
              <Link href="/shipping-returns" className="hover:text-gold">
                Shipping details
              </Link>
            </div>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-3 border border-gold/15 bg-white p-5 text-sm leading-relaxed text-espresso/70 sm:flex-row">
              <Truck className="h-5 w-5 shrink-0 text-gold" />
              <span>Ordering for a full bridal party or guest list? Contact us early so we can help plan timing.</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
