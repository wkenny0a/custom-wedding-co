import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Heart, Sparkles, Star, Camera, Gift, ShieldCheck, Clock, Award, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProducts, getLowestDisplayPrice } from '@/lib/swell';
import {
  PrebuiltBridesmaidProposalBoxBuilder,
  type BuilderOption,
  type BuilderProduct,
} from '@/components/gift-boxes/PrebuiltBridesmaidProposalBoxBuilder';

export const metadata: Metadata = {
  title: 'Personalized Bridesmaid Proposal Box | Custom Wedding Co.',
  description:
    'Create an emotional personalized bridesmaid box with custom keepsakes like a robe, eye mask, mirror, and jewelry box, made for a beautiful unboxing moment.',
  openGraph: {
    title: 'The Bridesmaid Box That Makes Her Feel Chosen | Custom Wedding Co.',
    description: 'Create an emotional personalized bridesmaid box with custom keepsakes made for a beautiful unboxing moment.',
    images: ['/images/home/bridesmaid_box_lifestyle.png'],
  },
};

export const dynamic = 'force-dynamic';

const targetProductUrl = '#interactive-builder';

const unboxingSteps = [
  {
    num: '01',
    title: 'She Sees the Box',
    desc: 'A premium, linen-textured box in soft dusty rose or elegant cream, sealed with a luxurious bow ribbon. It looks like a statement before it is even opened.',
  },
  {
    num: '02',
    title: 'She Unties the Bow',
    desc: 'The sensory weight of the heavy satin ribbon slipping open. She lifts the lid to reveal the custom gold foil script printing: "Will You Be My Bridesmaid?"',
  },
  {
    num: '03',
    title: 'She Finds Her Name',
    desc: 'She looks inside to see the beautiful coordinating gifts, each carrying her own name. No cheap fillers—just keepsakes made specifically for her.',
  },
  {
    num: '04',
    title: 'The Emotional Realization',
    desc: 'She unfolds the satin robe, touches the velvet jewelry case, and holds the engraved compact mirror. She realizes how much thought you put into honoring her place in your life.',
  },
  {
    num: '05',
    title: 'Kept Beyond the Toast',
    desc: 'Long after the wedding morning photos are over, these keepsakes stay on her vanity, nightstand, and in her bag as a daily reminder of your friendship.',
  },
];

const faqs = [
  {
    q: 'Can I personalize each box with a different name?',
    a: 'Absolutely! Each proposal box is crafted individually. In the builder, simply write each bridesmaid’s name, select their robe size, and enter their custom details. We personalize and pack each box individually so they arrive ready to gift.',
  },
  {
    q: 'What comes inside the bridesmaid box?',
    a: 'Our signature Prebuilt Bridesmaid Box includes a premium linen-textured gift box with a custom gold foil inner lid message, a customized satin-lace getting-ready robe, an embroidered satin sleep mask, a micro-engraved rose gold compact makeup mirror, a plush velvet travel jewelry case, and matching shredded paper stuffing.',
  },
  {
    q: 'Is this good for bridesmaid proposals?',
    a: 'Yes, it is specifically designed for the proposal moment. The inner lid message acts as a beautiful, high-impact "ask" that makes them say yes on the spot, turning a simple question into a lifelong keepsake unboxing memory.',
  },
  {
    q: 'Can I order one for each bridesmaid?',
    a: 'Yes. Simply complete the builder and add to cart once per bridesmaid. Your cart automatically aggregates them, and we apply deep volume discounts directly at checkout when you buy for your whole bridal party (saving up to 45%!).',
  },
  {
    q: 'How long does personalization take?',
    a: 'Standard artisan personalization and assembly take 5–7 business days. We also offer rush processing (3 business days) which can be added at checkout. We recommend ordering at least 6–8 weeks before your wedding or proposal date.',
  },
  {
    q: 'Will it arrive gift-ready?',
    a: 'Yes, 100%. We take the stress out of gifting. Every item is beautifully arranged on a bed of shredded paper, and the box is sealed with a satin bow. It arrives at your door fully finished—zero DIY assembly or wrapping required.',
  },
  {
    q: 'Can I send this directly to my bridesmaid?',
    a: 'Yes, you can ship individual boxes directly to each bridesmaid by entering their shipping address at checkout. If you need help coordinating multiple delivery addresses, simply place your order and contact our team to manage it.',
  },
  {
    q: 'What if I need boxes for my whole bridal party?',
    a: 'We specialize in bridal party gifting. Our configurator easily scales to accommodate bridesmaids, maid of honor, matron of honor, flower girls, and mother of the bride. You can write custom roles for the inner lid message of each box.',
  },
];

const itemsInside = [
  {
    name: 'Custom Robe',
    image: '/images/ugc/bridesmaid-review-2.jpeg',
    emotional: 'Made for bridal suite photos, morning-of memories, and feeling included.',
    practical: 'Crafted from ultra-soft, premium breathable satin with gold calligraphic lettering.',
  },
  {
    name: 'Custom Makeup Mirror',
    image: '/images/meta-ads/meta_ad_1.png',
    emotional: 'The little detail she’ll use on the wedding day and keep in her bag after.',
    practical: 'Featuring double-sided reflection, polished rose gold coating, and elegant engraving.',
  },
  {
    name: 'Custom Jewelry Box',
    image: '/images/meta-ads/meta_ad_8.png',
    emotional: 'A beautiful place for wedding-day jewelry, earrings, and keepsakes.',
    practical: 'Plush velvet casing with structural grids, zipper closure, and gold calligraphy name.',
  },
  {
    name: 'Custom Eye Mask',
    image: '/images/meta-ads/meta_ad_5.png',
    emotional: 'A soft getting-ready keepsake that feels personal from the first look.',
    practical: 'Double-sided mulberry silk with elastic strap, delicate custom embroidery.',
  },
];

const emotionalBenefits = [
  {
    title: 'Makes the proposal feel special',
    text: "Turn a simple question into a milestone moment. She will feel chosen, honored, and deeply appreciated before she even reads your handwritten card.",
  },
  {
    title: 'Creates a photo-worthy unboxing',
    text: 'Every element—from the silk exterior bow to the gold-foil inner lid lettering—is styled to look absolutely flawless on camera and in social posts.',
  },
  {
    title: 'Gives her keepsakes she can use again',
    text: 'Ditch the generic, throwaway bridal clutter. These are daily luxury pieces she will keep on her vanity, dresser, and in her handbag for years.',
  },
];

const comparisonData = {
  generic: [
    'Feels last-minute and standard',
    'Not personal or uniquely branded',
    'Usually forgotten or discarded quickly',
    'Harder to photograph beautifully',
  ],
  cwc: [
    'Fully personalized with custom gold calligraphy names',
    'Premium gift-ready presentation with exterior bow ribbon',
    'Creates a high-impact emotional unboxing moment',
    'Useful keepsakes she will actually use on her vanity for years',
    'Stunning coordinates designed for editorial bridal morning photos',
  ],
};

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
    image: 'https://cdn.swell.store/customweddingco/69ede8b940d4890012892e71/5bb5f277613219b8a2d4c4fcc467c975/remove_the_customzation_202604260322.jpeg',
  },
  hairbrush: {
    id: '69f439142be87900126eae1c',
    name: 'The Heirloom Botanical Hairbrush',
    slug: 'the-heirloom-botanical-hairbrush',
    price: 29.99,
    image: 'https://cdn.swell.store/customweddingco/69f43c9a13660b00129f8bf2/8f0ccabdb0bcbbfab74909e3cf680eb0/change_the_logo_to_this._202605011338.jpeg',
  },
  jewelryCase: {
    id: '69f1d0288d3d570012202a4d',
    name: 'Bespoke Velvet Heirloom Jewelry Case',
    slug: 'bespoke-velvet-heirloom-jewelry-case',
    price: 29,
    image: 'https://cdn.swell.store/customweddingco/69f1df9788181000125023e4/370315a6aa11c140be889622c10591e5/replace_natalie_with_this_and_202604291815.jpeg',
  },
  sleepCollection: {
    id: '69f052ac87b8c50012769521',
    name: 'Bespoke Satin Sleep Collection',
    slug: 'bespoke-satin-sleep-collection',
    price: 19.99,
    image: 'https://cdn.swell.store/customweddingco/69f05f8887b8c5001277ecf6/03f3d78f94cd4e22fe58a3bfc6cc119d/can_you_put_202604281459.jpeg',
  },
  robe: {
    id: '69f061b80c40270012e3df60',
    name: 'Bespoke Satin & Lace Bridal Robe',
    slug: 'bespoke-satin-lace-bridal-robe',
    price: 89.99,
    image: 'https://cdn.swell.store/customweddingco/69f06da120adc70012d8b0c3/74a4bc4d35abf02047d25d8bfbc6b682/lets_replace_the_202604281613.jpeg',
  },
  slippers: {
    id: '69f43d8f67608e0012c62762',
    name: 'The Bespoke Bridal Slipper',
    slug: 'bespoke-bridal-slipper',
    price: 24.99,
    image: 'https://cdn.swell.store/customweddingco/69f441cff1c61d0012c25589/c89a2cee414d5b4bd8aefc3343604770/can_you_make_bridesmaid_the_202605011356.jpeg',
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
    image: 'https://cdn.swell.store/customweddingco/6a18bb670d7baf00129d4d19/fa57c54d44d4dc301dc5b35048eb4142/Screenshot%202026-05-28%20at%203.02.01%E2%80%AFPM.png',
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
    price: 69.99,
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
    image: 'https://cdn.swell.store/customweddingco/6a038394493962001256383a/cc8eda864b0b3e62bb568ac9e21e8591/Create_a_realistic_wedding_product_202605130340.jpeg',
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
    image: 'https://cdn.swell.store/customweddingco/6a03770f4dc85600112063d6/883bbb01f2de035cc261fa3eb551a848/Create_a_realistic_lifestyle_product_202605130252.jpeg',
    images: [
      'https://cdn.swell.store/customweddingco/6a03770f4dc85600112063d6/883bbb01f2de035cc261fa3eb551a848/Create_a_realistic_lifestyle_product_202605130252.jpeg',
    ],
  },
}

function getImage(product: any, fallback: string) {
  return product?.images?.[0]?.file?.url || product?.images?.[0]?.url || fallback
}

function getImages(product: any, fallbackImages: string[]) {
  const images =
    product?.images
      ?.map((image: any) => image.file?.url || image.url || '')
      .filter(Boolean) || []

  return images.length ? images : fallbackImages
}

function trimName(name: string) {
  return name.split('|')[0].trim()
}

function toBuilderProduct(product: any, fallback: BuilderProduct): BuilderProduct {
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

export default async function BrideLandingPageTwo() {
  const productResponse = await getProducts();
  const allProducts = productResponse?.results || [];

  const storeProducts = (allProducts || []) as StoreProduct[];
  const productsBySlug = new Map(storeProducts.map((product) => [product.slug, product]));

  const tierProducts = Object.fromEntries(
    Object.entries(tierSlugs).map(([key, slug]) => [
      key,
      toBuilderProduct(productsBySlug.get(slug), fallbackTierProducts[key as TierId]),
    ]),
  ) as Record<TierId, BuilderProduct>;

  const products = Object.fromEntries(
    Object.entries(productSlugs).map(([key, slug]) => [
      key,
      toBuilderProduct(productsBySlug.get(slug), fallbackProducts[key as ProductKey]),
    ]),
  ) as Record<ProductKey, BuilderProduct>;

  const bonusProducts = Object.fromEntries(
    Object.entries(bonusSlugs).map(([key, slug]) => [
      key,
      {
        ...toBuilderProduct(productsBySlug.get(slug), fallbackBonusProducts[key as BonusKey]),
        name: bonusDisplayNames[key as BonusKey],
      },
    ]),
  ) as Record<BonusKey, BuilderProduct>;

  const robeProduct = allProducts.find((p: any) => p.slug === 'bespoke-satin-lace-bridal-robe');
  const mirrorProduct = allProducts.find((p: any) => p.slug === 'personalized-compact-mirror-custom-heirloom-bridal-gift');
  const jewelryProduct = allProducts.find((p: any) => p.slug === 'bespoke-velvet-heirloom-jewelry-case');
  const sleepProduct = allProducts.find((p: any) => p.slug === 'bespoke-satin-sleep-collection');

  const getProductImg = (product: any, fallback: string) => {
    return product?.images?.[0]?.file?.url || product?.images?.[0]?.url || fallback;
  };

  const dynamicItemsInside = [
    {
      ...itemsInside[0],
      image: getProductImg(robeProduct, itemsInside[0].image),
    },
    {
      ...itemsInside[1],
      image: getProductImg(mirrorProduct, itemsInside[1].image),
    },
    {
      ...itemsInside[2],
      image: getProductImg(jewelryProduct, itemsInside[2].image),
    },
    {
      ...itemsInside[3],
      image: getProductImg(sleepProduct, itemsInside[3].image),
    },
  ];

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream text-espresso">

      {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 md:px-8 bg-espresso overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/bridesmaid_box_lifestyle.png"
            alt="Personalized Bridesmaid Proposal Box styled in bridal morning setting"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/50 to-espresso/90" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 rounded-full px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-gold-light font-semibold animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" /> Personalized Bridesmaid Proposal Box
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream tracking-normal leading-[1.05] drop-shadow-xl max-w-4xl mx-auto">
            The Bridesmaid Box That Makes Her Feel <span className="italic text-gold-pale font-serif">Chosen.</span>
          </h1>
          
          <p className="font-serif text-lg md:text-2xl text-cream-dark/90 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
            A ready-to-gift personalized box with beautiful keepsakes she’ll actually use, remember, and want to photograph.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full sm:w-auto">
            <Button size="lg" href={targetProductUrl} className="w-full sm:w-auto shadow-2xl hover:scale-105 transition-transform duration-300">
              Create Her Box
            </Button>
            <Link 
              href="#whats-inside" 
              className="text-cream/80 hover:text-cream font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors py-3"
            >
              See What’s Inside <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="pt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream/70">
            <span>Personalized details</span>
            <span>·</span>
            <span>Gift-ready packaging</span>
            <span>·</span>
            <span>Made for emotional unboxing moments</span>
          </p>
        </div>
      </section>

      {/* ─── 2. EMOTIONAL UGC HOOK SECTION ────────────────────────────────── */}
      <section id="unboxing-moment" className="scroll-mt-24 py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gold/10">
            <Image
              src="/images/ugc/bridesmaid-review-1.jpeg"
              alt="Real bridesmaid crying happy tears during proposal box unboxing"
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-espresso text-cream px-3 py-1 text-[0.6rem] uppercase tracking-widest font-bold rounded-full flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-gold-light" /> UGC Unboxing Moment
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold block">The Moment She Opens It</span>
              <h2 className="font-serif text-3xl md:text-5xl text-espresso leading-tight">
                POV: She Opens It and Sees Her Name on Everything
              </h2>
              <p className="font-sans text-base md:text-lg text-espresso/70 leading-relaxed font-light">
                That is the moment this box is built for. The robe, the eye mask, the mirror, the jewelry box — each detail feels personal before she even reads the card.
              </p>
            </div>

            <div className="border-l-4 border-gold bg-cream/35 p-6 rounded-r-2xl shadow-sm italic font-serif text-lg md:text-xl text-espresso-light leading-relaxed">
              “I didn’t expect to cry over a bridesmaid box… but seeing my name on every detail made it feel so personal.”
            </div>

            <div>
              <Button href={targetProductUrl}>
                Make Her Box Personal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. WHAT’S INSIDE SECTION ─────────────────────────────────────── */}
      <section id="whats-inside" className="scroll-mt-24 py-24 px-6 md:px-12 bg-cream-dark border-t border-b border-gold/15">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">Unboxing Details</span>
            <h2 className="font-serif text-3xl md:text-5xl text-espresso">Everything Inside Feels Thoughtful</h2>
            <p className="text-espresso/70 font-sans text-sm md:text-base max-w-lg mx-auto">
              Curated luxury items that pair beautifully together to form an unforgettable getting-ready set.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicItemsInside.map((item, idx) => (
              <article key={idx} className="bg-white border border-gold-pale/35 rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(74,44,42,0.04)] flex flex-col h-full group">
                <div className="relative aspect-square overflow-hidden bg-cream-dark w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl text-espresso font-semibold">{item.name}</h3>
                    <p className="mt-3 text-xs uppercase tracking-widest font-bold text-gold">The Emotion</p>
                    <p className="mt-1 text-sm text-espresso/75 leading-relaxed font-light">{item.emotional}</p>
                  </div>
                  <div className="border-t border-gold-pale/30 pt-3">
                    <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-400">The Quality</p>
                    <p className="mt-1 text-xs text-espresso-light/80 leading-relaxed font-light">{item.practical}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" href={targetProductUrl}>
              Shop the Full Box
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 4. WHY IT CONVERTS EMOTIONALLY SECTION ───────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">A Personal Milestone</span>
            <h2 className="font-serif text-3xl md:text-5xl text-espresso">This Is More Than a Bridesmaid Gift</h2>
            <p className="font-sans text-espresso-light/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Your bridesmaids are the people standing beside you on one of the biggest days of your life. This box makes the ask feel intentional, personal, and unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {emotionalBenefits.map((benefit, idx) => (
              <div key={idx} className="bg-cream/25 border border-gold-pale/30 rounded-2xl p-6 md:p-8 flex flex-col space-y-4 hover:bg-cream/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 font-serif text-base font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl text-espresso font-semibold">{benefit.title}</h3>
                <p className="font-sans text-sm text-espresso/70 leading-relaxed font-light">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. PRODUCT REASSURANCE SECTION ───────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-cream-dark border-t border-b border-gold/15">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">Stress-Free Gifting</span>
            <h2 className="font-serif text-3xl md:text-5xl text-espresso">Personalized Without the Stress</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Choose the Box', desc: 'Select your matching wedding palette box.' },
              { title: 'Add Her Name', desc: 'Custom gold cursive details on each item.' },
              { title: 'Review Available Options', desc: 'Pick the Classic or Deluxe stuffer set.' },
              { title: 'Gift it Beautifully', desc: 'Shipped fully assembled, ribbon-tied, and ready.' },
            ].map((pt, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-gold-pale/35 flex flex-col space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-gold">Step 0{idx + 1}</span>
                <h4 className="font-serif text-lg text-espresso font-semibold">{pt.title}</h4>
                <p className="text-xs text-espresso-light/80 leading-relaxed font-light">{pt.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-gold-pale/30 text-center">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-gold mx-auto" />, label: 'Digital proof before production' },
              { icon: <Clock className="w-5 h-5 text-gold mx-auto" />, label: 'Gift-ready presentation' },
              { icon: <Award className="w-5 h-5 text-gold mx-auto" />, label: 'Designed for morning photos' },
              { icon: <Heart className="w-5 h-5 text-gold mx-auto" />, label: 'Bridal-party friendly scales' },
            ].map((pt, idx) => (
              <div key={idx} className="space-y-2">
                {pt.icon}
                <span className="block font-sans text-xs font-semibold text-espresso">{pt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. UGC STORYBOARD SECTION ────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">The Gifting Story</span>
            <h2 className="font-serif text-3xl md:text-5xl text-espresso">Imagine Her Opening It</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Connection timeline line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gold/20 transform -translate-x-1/2 hidden lg:block" />

            <div className="space-y-12">
              {unboxingSteps.map((step, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12 relative ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Node */}
                  <div className="absolute left-4 lg:left-1/2 top-0 w-8 h-8 rounded-full bg-espresso text-cream font-serif text-sm font-bold flex items-center justify-center transform -translate-x-1/2 z-10">
                    {step.num}
                  </div>

                  <div className="lg:w-1/2 pl-10 lg:pl-0">
                    {/* Empty block for layout balancing */}
                  </div>

                  <div className="lg:w-1/2 pl-10 lg:pl-0 flex flex-col justify-center">
                    <div className="bg-cream/20 border border-gold-pale/30 rounded-2xl p-6 hover:bg-cream/40 transition-colors shadow-sm">
                      <h4 className="font-serif text-xl text-espresso font-semibold mb-2">{step.title}</h4>
                      <p className="font-sans text-sm text-espresso-light/90 leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" href={targetProductUrl}>
              Start Her Box
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 7. SOCIAL PROOF SECTION ──────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-cream-dark border-t border-b border-gold/15">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">Loved by Brides</span>
            <h2 className="font-serif text-3xl md:text-5xl text-espresso">Made for the “You Know Me So Well” Reaction</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            {[
              { count: '4.9/5 Avg. Rating', label: 'Loved by brides and bridal parties' },
              { count: '100% Custom', label: 'Personalized gift details' },
              { count: 'Ships Finished', label: 'Gift-ready presentation' },
              { count: 'Altar-Ready Ask', label: 'Great for bridesmaid proposals' },
            ].map((pt, idx) => (
              <div key={idx} className="bg-white p-5 border border-gold-pale/25 rounded-2xl shadow-sm">
                <Star className="h-5 w-5 fill-gold text-gold mx-auto mb-2" />
                <span className="block font-serif text-lg text-espresso font-bold mb-1">{pt.count}</span>
                <span className="block font-sans text-xs text-gray-400 leading-normal">{pt.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
            {[
              { text: 'My bridesmaids loved seeing their names on everything. The unboxing morning went exactly as I planned!', name: 'Taylor S. · Nashville' },
              { text: 'The box felt so much more personal than a basic gift. Seeing my Maid of Honor cry was worth every single penny.', name: 'Maria L. · Miami' },
              { text: 'It looked beautiful in photos and felt so thoughtful. Best decision I made for my bridal party suite.', name: 'Priya K. · San Francisco' },
            ].map((rv, idx) => (
              <figure key={idx} className="bg-white/55 backdrop-blur-sm border border-gold-pale/25 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="font-serif text-base leading-relaxed text-espresso/80 flex-1">
                  “{rv.text}”
                </blockquote>
                <figcaption className="font-sans text-xs font-bold text-espresso border-t border-gold-pale/25 pt-3">
                  {rv.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. COMPARISON SECTION ────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">Making the Choice</span>
            <h2 className="font-serif text-3xl md:text-5xl text-espresso">Why This Beats a Generic Bridesmaid Gift</h2>
          </div>

          <div className="overflow-hidden border border-gold-pale/35 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 bg-white">
            
            {/* Column A: Generic */}
            <div className="p-8 bg-cream/15 flex flex-col justify-between space-y-6">
              <h3 className="font-serif text-2xl text-espresso-light border-b border-gold-pale/25 pb-4">Generic Gift</h3>
              <ul className="space-y-4 flex-1">
                {comparisonData.generic.map((pt, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-espresso-light/75 leading-relaxed font-light">
                    <span className="w-5 h-5 rounded-full border border-espresso/20 flex items-center justify-center flex-shrink-0 font-sans text-xs text-espresso-light mt-0.5">✕</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column B: CWC */}
            <div className="p-8 bg-espresso text-cream flex flex-col justify-between space-y-6 border-t md:border-t-0 md:border-l border-gold-pale/20">
              <h3 className="font-serif text-2xl text-gold-light border-b border-cream/10 pb-4">Custom Wedding Co. Box</h3>
              <ul className="space-y-4 flex-1">
                {comparisonData.cwc.map((pt, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-cream/90 leading-relaxed font-light">
                    <span className="w-5 h-5 rounded-full bg-gold text-espresso flex items-center justify-center flex-shrink-0 font-sans text-xs font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="text-center pt-6">
            <Button size="lg" href={targetProductUrl}>
              Choose the Personalized Box
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 8.5 BOX BUILDER PREVIEW SECTION ──────────────────────────────── */}
      <section id="interactive-builder" className="scroll-mt-24 bg-cream border-t border-b border-gold/15 py-12">
        <PrebuiltBridesmaidProposalBoxBuilder
          tierProducts={tierProducts}
          products={products}
          bonusProducts={bonusProducts}
          hideHeaderBar={true}
        />
      </section>

      {/* ─── 9. FAQ SECTION ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-cream-dark border-t border-b border-gold/15">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold block mb-3">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-espresso leading-tight">
              Answers Before You Build
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/70 font-light">
              We compile questions direct-response bridal couples ask about order sizing, timelines, and proofing variables.
            </p>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-gold-pale/35 bg-cream p-5 rounded-xl transition-all duration-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg md:text-xl text-espresso">
                  {faq.q}
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-gold/30 text-gold transition-transform group-open:rotate-45 font-sans text-xl rounded-full">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-xs md:text-sm leading-relaxed text-espresso/70 font-light pt-3 border-t border-gold-pale/20" dangerouslySetInnerHTML={{ __html: faq.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. FINAL CTA SECTION ────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-espresso text-center text-cream relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="/images/home/bridesmaid_box_lifestyle.png"
            alt="Sensory background showing the gold embossed proposal boxes"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto border border-gold/30">
            <Gift className="w-8 h-8" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight">
            Give Her the Box She’ll <br className="hidden md:block" />
            <span className="italic text-gold-pale font-serif">Remember Opening.</span>
          </h2>
          
          <p className="font-serif text-lg md:text-xl text-cream-dark/95 leading-relaxed max-w-2xl mx-auto font-light">
            Create a personalized bridesmaid box that feels thoughtful, beautiful, and made just for her.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button size="lg" href={targetProductUrl} className="w-full bg-cream text-espresso hover:bg-gold hover:text-white transition-all shadow-xl">
              Create Her Box
            </Button>
            <Link 
              href="#whats-inside" 
              className="w-full sm:w-auto px-6 py-3.5 border border-cream/30 text-cream uppercase text-xs tracking-widest font-bold hover:bg-cream hover:text-espresso transition-colors text-center"
            >
              See What’s Inside
            </Link>
          </div>

          <div className="pt-10 flex flex-wrap gap-x-8 gap-y-3 justify-center text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-gold text-gold" /> Loved by Brides & Parties</span>
            <span>·</span>
            <span>Digital Proof Sent in 24 Hours</span>
            <span>·</span>
            <span>Bulk Party Savings Included</span>
          </div>
        </div>
      </section>
      
      {/* ─── 11. MOBILE STICKY CTA ────────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-cream/95 border-t border-gold/20 p-4 pb-6 shadow-[0_-8px_30px_rgba(74,44,42,0.12)] backdrop-blur-md flex items-center justify-between lg:hidden animate-in slide-in-from-bottom duration-500">
        <div className="flex flex-col text-left">
          <span className="text-[0.6rem] uppercase tracking-wider text-gold font-bold">Proposal Gift</span>
          <span className="text-xs font-semibold text-espresso font-sans">Prebuilt & Assembled</span>
        </div>
        <Button href={targetProductUrl} size="sm" className="px-6 py-3 text-xs uppercase tracking-widest font-bold font-sans">
          Create Her Box
        </Button>
      </div>

    </main>
  );
}
