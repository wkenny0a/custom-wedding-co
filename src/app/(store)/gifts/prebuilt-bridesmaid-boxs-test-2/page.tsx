import type { Metadata } from 'next'
import {
  PrebuiltBridesmaidProposalBoxBuilder,
  type BuilderOption,
  type BuilderProduct,
} from '@/components/gift-boxes/PrebuiltBridesmaidProposalBoxBuilder'
import { getLowestDisplayPrice, getProducts } from '@/lib/swell'

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

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'The Bridesmaid Proposal Box | Custom Wedding Co.',
  description:
    'Choose a preset bridesmaid proposal box, personalize the lid, and create a bridal party gift with custom keepsakes, sleep accessories, mirrors, and jewelry cases.',
  openGraph: {
    title: 'The Bridesmaid Proposal Box | Custom Wedding Co.',
    description: 'Pick the box. Personalize every detail. Make each bridesmaid feel chosen.',
    images: ['/images/gift-boxes/bridesmaid-box.png'],
  },
}

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

export default async function PrebuiltBridesmaidBoxTestTwoPage() {
  const allProductsResponse = await getProducts()

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

  return (
    <PrebuiltBridesmaidProposalBoxBuilder
      tierProducts={tierProducts}
      products={products}
      bonusProducts={bonusProducts}
    />
  )
}
