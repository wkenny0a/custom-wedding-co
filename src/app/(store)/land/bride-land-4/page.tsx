import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Gift, Heart, PackageCheck, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrideLandStickyCta } from '@/components/landing/BrideLandStickyCta'
import {
  PrebuiltBridesmaidProposalBoxBuilder,
  type BuilderOption,
  type BuilderProduct,
} from '@/components/gift-boxes/PrebuiltBridesmaidProposalBoxBuilder'
import { getLowestDisplayPrice, getProducts } from '@/lib/swell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Personalized Bridesmaid Proposal Boxes | Custom Wedding Co.',
  description:
    'Shop personalized bridesmaid proposal boxes with custom keepsakes, gift-ready packaging, digital proofing, and curated Signature or Luxe bridal party tiers.',
  openGraph: {
    title: 'Personalized Bridesmaid Proposal Boxes | Custom Wedding Co.',
    description: 'Pick the box, personalize every detail, and make each bridesmaid feel chosen.',
    images: ['/images/home/bridesmaid_box_lifestyle.png'],
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
  description?: string
  images?: StoreImage[]
  options?: BuilderOption[]
}

type TierId = 'signature' | 'luxe'

type ProductKey =
  | 'compactMirror'
  | 'hairbrush'
  | 'jewelryCase'
  | 'sleepCollection'
  | 'robe'
  | 'slippers'

type BonusKey = 'hairClaw' | 'scrunchies'

const builderHref = '#interactive-builder'
const productFetchTimeoutMs = 3000

const tierSlugs: Record<TierId, string> = {
  signature: 'the-bridesmaid-proposal-box',
  luxe: 'the-bridesmaid-luxe-proposal-box',
}

const productSlugs: Record<ProductKey, string> = {
  compactMirror: 'personalized-compact-mirror-custom-heirloom-bridal-gift',
  hairbrush: 'the-heirloom-botanical-hairbrush',
  jewelryCase: 'bespoke-velvet-heirloom-jewelry-case',
  sleepCollection: 'bespoke-satin-sleep-collection',
  robe: 'bespoke-satin-lace-bridal-robe',
  slippers: 'bespoke-bridal-slipper',
}

const bonusSlugs: Record<BonusKey, string> = {
  hairClaw: 'the-to-have-and-to-hold-bridal-hair-claw',
  scrunchies: 'bespoke-mulberry-silk-bridal-scrunchies',
}

const bonusDisplayNames: Record<BonusKey, string> = {
  hairClaw: 'The Bridal Hair Claw | Matte Heirloom Clip for Bridesmaid Proposals',
  scrunchies: 'Cream Silk Bridal Scrunchies & Heirloom Proposal Sets',
}

const fallbackProducts: Record<ProductKey, BuilderProduct> = {
  compactMirror: {
    id: '69ede7ffdd38420012625764',
    name: 'Personalized Compact Mirror',
    slug: 'personalized-compact-mirror-custom-heirloom-bridal-gift',
    price: 24.99,
    image:
      'https://cdn.swell.store/customweddingco/69ede8b940d4890012892e71/5bb5f277613219b8a2d4c4fcc467c975/remove_the_customzation_202604260322.jpeg',
  },
  hairbrush: {
    id: '69f439142be87900126eae1c',
    name: 'The Heirloom Botanical Hairbrush',
    slug: 'the-heirloom-botanical-hairbrush',
    price: 29.99,
    image:
      'https://cdn.swell.store/customweddingco/69f43c9a13660b00129f8bf2/8f0ccabdb0bcbbfab74909e3cf680eb0/change_the_logo_to_this._202605011338.jpeg',
  },
  jewelryCase: {
    id: '69f1d0288d3d570012202a4d',
    name: 'Bespoke Velvet Heirloom Jewelry Case',
    slug: 'bespoke-velvet-heirloom-jewelry-case',
    price: 29,
    image:
      'https://cdn.swell.store/customweddingco/69f1df9788181000125023e4/370315a6aa11c140be889622c10591e5/replace_natalie_with_this_and_202604291815.jpeg',
  },
  sleepCollection: {
    id: '69f052ac87b8c50012769521',
    name: 'Bespoke Satin Sleep Collection',
    slug: 'bespoke-satin-sleep-collection',
    price: 19.99,
    image:
      'https://cdn.swell.store/customweddingco/69f05f8887b8c5001277ecf6/03f3d78f94cd4e22fe58a3bfc6cc119d/can_you_put_202604281459.jpeg',
  },
  robe: {
    id: '69f061b80c40270012e3df60',
    name: 'Bespoke Satin & Lace Bridal Robe',
    slug: 'bespoke-satin-lace-bridal-robe',
    price: 89.99,
    image:
      'https://cdn.swell.store/customweddingco/69f06da120adc70012d8b0c3/74a4bc4d35abf02047d25d8bfbc6b682/lets_replace_the_202604281613.jpeg',
  },
  slippers: {
    id: '69f43d8f67608e0012c62762',
    name: 'The Bespoke Bridal Slipper',
    slug: 'bespoke-bridal-slipper',
    price: 24.99,
    image:
      'https://cdn.swell.store/customweddingco/69f441cff1c61d0012c25589/c89a2cee414d5b4bd8aefc3343604770/can_you_make_bridesmaid_the_202605011356.jpeg',
    images: [
      'https://cdn.swell.store/customweddingco/69f441cff1c61d0012c25589/c89a2cee414d5b4bd8aefc3343604770/can_you_make_bridesmaid_the_202605011356.jpeg',
    ],
  },
}

const fallbackTierProducts: Record<TierId, BuilderProduct> = {
  signature: {
    id: '6a18bc0db06aa800119dd412',
    name: 'The Bridesmaid Proposal Box',
    slug: 'the-bridesmaid-proposal-box',
    price: 69.99,
    image:
      'https://cdn.swell.store/customweddingco/6a18bb670d7baf00129d4d19/fa57c54d44d4dc301dc5b35048eb4142/Screenshot%202026-05-28%20at%203.02.01%E2%80%AFPM.png',
    images: [
      'https://cdn.swell.store/customweddingco/6a18bb670d7baf00129d4d19/fa57c54d44d4dc301dc5b35048eb4142/Screenshot%202026-05-28%20at%203.02.01%E2%80%AFPM.png',
      'https://cdn.swell.store/customweddingco/6a18bbf87d9e2b0012c39c81/e8b937d050ec95aadd50abd773e3a9cd/Screenshot%202026-05-28%20at%203.19.20%E2%80%AFAM.png',
      'https://cdn.swell.store/customweddingco/6a18bbf8ec91420012995f0a/fd3bef5ac3569546ac5f2728bf928db5/Screenshot%202026-05-28%20at%203.18.52%E2%80%AFAM.png',
      'https://cdn.swell.store/customweddingco/6a18bbf8ff539500127dc334/2b71998cb3755f46012527917bf4e85d/Screenshot%202026-05-27%20at%207.20.38%E2%80%AFAM.png',
      'https://cdn.swell.store/customweddingco/6a18bbf87731b6001275db4c/8dc0b512e90d02e327100084899250b0/Screenshot%202026-05-27%20at%207.20.26%E2%80%AFAM.png',
    ],
  },
  luxe: {
    id: '6a18c4480d7baf00129d6bd9',
    name: 'The Bridesmaid Luxe Proposal Box',
    slug: 'the-bridesmaid-luxe-proposal-box',
    price: 89.99,
    image: '/images/gift-boxes/bridesmaid-box.png',
    images: ['/images/gift-boxes/bridesmaid-box.png'],
  },
}

const fallbackBonusProducts: Record<BonusKey, BuilderProduct> = {
  hairClaw: {
    id: '6a037dedb2955500128d74c5',
    name: 'The Bridal Hair Claw',
    slug: 'the-to-have-and-to-hold-bridal-hair-claw',
    price: 15,
    image:
      'https://cdn.swell.store/customweddingco/6a038394493962001256383a/cc8eda864b0b3e62bb568ac9e21e8591/Create_a_realistic_wedding_product_202605130340.jpeg',
    images: [
      'https://cdn.swell.store/customweddingco/6a038394493962001256383a/cc8eda864b0b3e62bb568ac9e21e8591/Create_a_realistic_wedding_product_202605130340.jpeg',
      'https://cdn.swell.store/customweddingco/6a0383954470040012baf207/3aae1b7afa33bf83b2ba90e30290f4c3/Create_a_realistic_bridal_detail_202605130344.jpeg',
    ],
  },
  scrunchies: {
    id: '6a0374ba60ce0a0012c1f12a',
    name: 'Cream Silk Bridal Scrunchies',
    slug: 'bespoke-mulberry-silk-bridal-scrunchies',
    price: 18,
    image:
      'https://cdn.swell.store/customweddingco/6a03770f4dc85600112063d6/883bbb01f2de035cc261fa3eb551a848/Create_a_realistic_lifestyle_product_202605130252.jpeg',
    images: [
      'https://cdn.swell.store/customweddingco/6a03770f4dc85600112063d6/883bbb01f2de035cc261fa3eb551a848/Create_a_realistic_lifestyle_product_202605130252.jpeg',
    ],
  },
}

const valueStrip = [
  'From $69.99',
  '4.9 average rating',
  'Personalized per bridesmaid',
  'Gift-ready packaging',
]

const insideCopy: Record<
  ProductKey,
  {
    label: string
    title: string
    copy: string
  }
> = {
  compactMirror: {
    label: 'Wedding morning essential',
    title: 'Personalized compact mirror',
    copy: 'A small keepsake she can use for the proposal, bridal shower, and wedding morning touch-ups.',
  },
  hairbrush: {
    label: 'Signature tier detail',
    title: 'Botanical heirloom hairbrush',
    copy: 'A practical beauty detail that keeps the box useful without feeling like filler.',
  },
  jewelryCase: {
    label: 'Keepsake storage',
    title: 'Velvet jewelry case',
    copy: 'A soft travel case for earrings, rings, and the little pieces she will want close on the wedding day.',
  },
  sleepCollection: {
    label: 'Personalized comfort',
    title: 'Satin sleep collection',
    copy: 'A polished getting-ready detail with a custom name moment built for photos.',
  },
  robe: {
    label: 'Luxe upgrade',
    title: 'Satin lace robe',
    copy: 'A photo-ready getting-ready piece for bridesmaids who will be with you all morning.',
  },
  slippers: {
    label: 'Luxe upgrade',
    title: 'Custom slippers',
    copy: 'A cozy extra that makes the Luxe tier feel more complete and giftable.',
  },
}

const steps = [
  'Choose Signature or Luxe',
  'Pick quantity and box color',
  'Add each bridesmaid name and lid message',
  'Add to cart and go straight to checkout',
]

const comparisonRows = [
  {
    basic: 'Generic gifts make every box feel the same.',
    cwc: 'Each box gets her name and message, so it feels chosen for her.',
  },
  {
    basic: 'DIY boxes create hours of assembly and supply hunting.',
    cwc: 'The box arrives packed, styled, and gift-ready.',
  },
  {
    basic: 'Random fillers are easy to forget.',
    cwc: 'The keepsakes are useful for wedding morning and after.',
  },
]

const faqs = [
  {
    q: 'Can I personalize each bridesmaid box with a different name?',
    a: 'Yes. Choose your quantity in the builder, then add a name and inner-lid message for every box in the order.',
  },
  {
    q: 'What comes inside the Signature box?',
    a: 'The Signature box includes the personalized gift box, compact mirror, botanical hairbrush, velvet jewelry case, and satin sleep collection.',
  },
  {
    q: 'What is different about the Luxe box?',
    a: 'The Luxe tier adds the upgraded getting-ready pieces, including the satin lace robe and custom slippers, while keeping the same gift-ready personalization flow.',
  },
  {
    q: 'Will the names on the keepsakes match the outside lid?',
    a: 'Yes. The outside lid name is used for the customized items inside that box, so each bridesmaid receives her own coordinated set.',
  },
  {
    q: 'Does it add every single item to the cart?',
    a: 'No. Checkout uses the selected box SKU only, while the included products, names, messages, free gifts, and savings are saved as box details.',
  },
  {
    q: 'How soon should I order?',
    a: 'Order as early as possible for personalized bridal party gifts. If your proposal date is close, contact us before ordering so we can confirm timing.',
  },
]

function getImage(product: StoreProduct | undefined, fallback: string) {
  return product?.images?.[0]?.file?.url || product?.images?.[0]?.url || fallback
}

function getImages(product: StoreProduct | undefined, fallbackImages: string[]) {
  const images =
    product?.images
      ?.map((image) => image.file?.url || image.url || '')
      .filter(Boolean) || []

  return images.length ? images : fallbackImages
}

function trimName(name: string) {
  return name.split('|')[0].trim()
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function toBuilderProduct(product: StoreProduct | undefined, fallback: BuilderProduct): BuilderProduct {
  if (!product?.id) return fallback

  const images = getImages(product, fallback.images || [fallback.image])

  return {
    id: product.id,
    name: trimName(product.name || fallback.name),
    slug: product.slug || fallback.slug,
    price: getLowestDisplayPrice(product) || fallback.price,
    image: getImage(product, fallback.image),
    images,
    description: product.description,
    options: product.options || [],
  }
}

async function getLandingProducts() {
  return Promise.race([
    getProducts(),
    new Promise<{ results: StoreProduct[] }>((resolve) =>
      setTimeout(() => resolve({ results: [] }), productFetchTimeoutMs),
    ),
  ])
}

export default async function BrideLandingPageFour() {
  const allProductsResponse = await getLandingProducts()
  const storeProducts = (allProductsResponse?.results || []) as StoreProduct[]
  const productsBySlug = new Map(storeProducts.map((product) => [product.slug, product]))

  const tierProducts = Object.fromEntries(
    Object.entries(tierSlugs).map(([key, slug]) => [
      key,
      toBuilderProduct(productsBySlug.get(slug), fallbackTierProducts[key as TierId]),
    ]),
  ) as Record<TierId, BuilderProduct>

  const products = Object.fromEntries(
    Object.entries(productSlugs).map(([key, slug]) => [
      key,
      toBuilderProduct(productsBySlug.get(slug), fallbackProducts[key as ProductKey]),
    ]),
  ) as Record<ProductKey, BuilderProduct>

  const bonusProducts = Object.fromEntries(
    Object.entries(bonusSlugs).map(([key, slug]) => [
      key,
      {
        ...toBuilderProduct(productsBySlug.get(slug), fallbackBonusProducts[key as BonusKey]),
        name: bonusDisplayNames[key as BonusKey],
      },
    ]),
  ) as Record<BonusKey, BuilderProduct>

  const startingPrice = Math.min(tierProducts.signature.price, tierProducts.luxe.price)
  const featuredProductKeys: ProductKey[] = ['compactMirror', 'hairbrush', 'jewelryCase', 'sleepCollection', 'robe', 'slippers']

  return (
    <main data-bride-land-4 className="w-full overflow-x-hidden bg-cream pb-28 text-espresso">
      <style>{`
        body:has([data-bride-land-4]) header nav {
          display: none !important;
        }
      `}</style>

      <section className="relative overflow-hidden bg-espresso text-cream">
        <div className="absolute inset-0">
          <Image
            src="/images/home/bridesmaid_box_lifestyle.png"
            alt="Personalized bridesmaid proposal box with bridal party keepsakes"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/82 to-espresso/38" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-espresso to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.7fr)] lg:px-8 lg:py-24">
          <div className="max-w-3xl pt-10">
            <div className="mb-5 inline-flex items-center gap-2 border border-gold/35 bg-cream/10 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Personalized Bridesmaid Boxes
            </div>
            <h1 className="font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
              Personalized Bridesmaid Proposal Boxes She&apos;ll Actually Keep
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-cream-dark/90 sm:text-lg">
              Pick the box, personalize every detail, and create a gift-ready proposal moment with keepsakes made for her name, your wedding, and the morning you get ready together.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={builderHref} size="lg" className="w-full shadow-2xl shadow-espresso/20 sm:w-auto">
                Personalize Her Box
              </Button>
              <Link
                href="#whats-inside"
                className="inline-flex w-full items-center justify-center bg-cream px-10 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-espresso shadow-lg shadow-espresso/15 transition-colors hover:bg-cream-dark sm:w-auto"
              >
                See What&apos;s Included
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream/78">
              <span>From {formatCurrency(startingPrice)}</span>
              <span className="text-gold-light">/</span>
              <span>Digital proof included</span>
              <span className="text-gold-light">/</span>
              <span>Ships beautifully packaged</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="border border-cream/18 bg-cream/10 p-4 shadow-2xl shadow-espresso/30 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                <Image
                  src="/images/gift-boxes/bridesmaid-box.png"
                  alt="Gift-ready personalized bridesmaid proposal box"
                  fill
                  priority
                  sizes="420px"
                  className="object-cover"
                />
              </div>
              <div className="bg-cream p-5 text-espresso">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <p className="mt-3 font-serif text-xl leading-7">
                  &ldquo;The names on every piece made each bridesmaid feel like the box was really hers.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-espresso-light text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-cream/12 px-4 py-px sm:px-6 lg:grid-cols-4 lg:px-8">
          {valueStrip.map((item) => (
            <div key={item} className="bg-espresso-light px-3 py-4 text-center font-sans text-[11px] font-bold uppercase tracking-[0.14em]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="whats-inside" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.76fr_1fr] lg:items-center lg:px-8">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">Designed for the yes moment</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-espresso sm:text-5xl">
              Start with a finished box, then make every one personal.
            </h2>
            <p className="mt-4 text-base leading-7 text-espresso-light/78">
              Start with a curated Signature or Luxe box, then add the names, messages, quantity, and color that make every bridesmaid gift feel personal.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Names matched to each box',
                'Inner lid message per bridesmaid',
                'Signature or Luxe tier',
                'Single box SKU in checkout',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 border border-gold-pale/45 bg-cream/55 px-4 py-3 text-sm font-semibold">
                  <Check className="h-4 w-4 flex-shrink-0 text-gold" />
                  {item}
                </div>
              ))}
            </div>
            <Button href={builderHref} size="lg" className="mt-7">
              Start Personalizing
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="border border-gold-pale/40 bg-cream p-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                <Image
                  src="/images/ugc/bridesmaid-review-1.jpeg"
                  alt="Real bridesmaid box unboxing"
                  fill
                  sizes="(min-width: 1024px) 300px, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="pt-4">
                <p className="font-serif text-lg leading-7 text-espresso">
                  &ldquo;I did not expect to cry over a bridesmaid box, but seeing my name on every detail made it feel so personal.&rdquo;
                </p>
              </div>
            </article>
            <div className="grid content-center gap-3">
              {[
                'Her name on the outside lid',
                'A message inside the lid',
                'Keepsakes she can use after the ask',
                'A gift-ready presentation, not a DIY project',
              ].map((item) => (
                <div key={item} className="border border-gold-pale/45 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <Heart className="mt-1 h-4 w-4 flex-shrink-0 text-gold" />
                    <p className="font-serif text-xl leading-6 text-espresso">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="interactive-builder" className="scroll-mt-24 bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">Personalize now</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-espresso sm:text-5xl">
                Choose her box, then add every name and message.
              </h2>
            </div>
            <p className="text-sm leading-7 text-espresso-light/78 lg:text-base">
              Choose Signature or Luxe, select how many boxes you need, enter each bridesmaid&apos;s details, and add the selected preset box directly to checkout.
            </p>
          </div>
        </div>
        <PrebuiltBridesmaidProposalBoxBuilder
          tierProducts={tierProducts}
          products={products}
          bonusProducts={bonusProducts}
          hideHeaderBar={true}
          showStickyCart={false}
        />
      </section>

      <section className="border-y border-gold-pale/35 bg-cream-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">What comes inside</p>
            <h2 className="mt-3 font-display text-3xl text-espresso sm:text-5xl">Real products, bundled into a faster gift.</h2>
            <p className="mt-4 text-base leading-7 text-espresso-light/78">
              The builder pulls from the actual Swell listings, so product images and prices stay connected to the store catalog.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProductKeys.map((key) => {
              const product = products[key]
              const copy = insideCopy[key]

              return (
                <article key={key} className="border border-gold-pale/40 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold">{copy.label}</p>
                    <h3 className="mt-2 font-serif text-2xl leading-7 text-espresso">{copy.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-espresso-light/75">{copy.copy}</p>
                    <p className="mt-4 font-sans text-xs font-bold uppercase tracking-[0.14em] text-espresso/55">
                      MSRP {formatCurrency(product.price)}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">Why brides choose this</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-espresso sm:text-5xl">
              Less guesswork, more meaning in the gift.
            </h2>
            <p className="mt-4 text-base leading-7 text-espresso-light/78">
              You get the ease of a curated box with the feeling of a custom gift made for each person standing beside you.
            </p>
          </div>
          <div className="grid gap-4">
            {comparisonRows.map((row) => (
              <article key={row.cwc} className="grid gap-3 border border-gold-pale/40 bg-cream/45 p-5 sm:grid-cols-2">
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-espresso/45">Generic gift</p>
                  <p className="mt-2 text-sm leading-6 text-espresso-light/72">{row.basic}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Custom Wedding Co.</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-espresso">{row.cwc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gold-pale/35 bg-espresso py-16 text-cream sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.1fr] lg:items-center">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-light">How it works</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">A premium box without the back-and-forth.</h2>
              <p className="mt-4 text-base leading-7 text-cream-dark/82">
                One page handles the tier, quantity, color, names, message, bonus value, and checkout handoff.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((step, index) => (
                <article key={step} className="border border-cream/14 bg-cream/8 p-5">
                  <p className="font-serif text-3xl text-gold-light">0{index + 1}</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-cream">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: Star, label: '4.9 average rating', copy: 'Loved for thoughtful personalization and polished presentation.' },
              { icon: ShieldCheck, label: 'Digital proof included', copy: 'Personalized details can be reviewed before production.' },
              { icon: Truck, label: 'Gift-ready shipping', copy: 'Packed for the proposal moment, not a DIY assembly night.' },
              { icon: PackageCheck, label: 'Bridal-party friendly', copy: 'Order one box or build for the whole group.' },
            ].map(({ icon: Icon, label, copy }) => (
              <article key={label} className="border border-gold-pale/40 bg-white p-5">
                <Icon className="h-5 w-5 text-gold" />
                <h3 className="mt-4 font-serif text-xl text-espresso">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-espresso-light/74">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">FAQ</p>
            <h2 className="mt-3 font-display text-3xl text-espresso sm:text-5xl">Before you personalize</h2>
          </div>
          <div className="divide-y divide-gold-pale/45 border-y border-gold-pale/45">
            {faqs.map((faq) => (
              <article key={faq.q} className="py-5">
                <h3 className="font-serif text-xl text-espresso">{faq.q}</h3>
                <p className="mt-2 text-sm leading-7 text-espresso-light/76">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dark py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Gift className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-5 font-display text-3xl leading-tight text-espresso sm:text-5xl">
            Ready to make each bridesmaid feel chosen?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-espresso-light/78">
            Choose the tier, add each name, and send a gift-ready box with the personal details already handled.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={builderHref} size="lg" className="w-full sm:w-auto">
              Personalize Her Box
            </Button>
            <Button href="#whats-inside" variant="outline" size="lg" className="w-full bg-white sm:w-auto">
              Review What&apos;s Inside
            </Button>
          </div>
        </div>
      </section>

      <BrideLandStickyCta href={builderHref} label="Personalize Her Box" />
    </main>
  )
}
