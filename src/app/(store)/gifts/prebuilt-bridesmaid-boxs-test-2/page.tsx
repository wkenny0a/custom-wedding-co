import type { Metadata } from 'next'
import {
  PrebuiltBridesmaidProposalBoxBuilder,
  type BuilderBaseProduct,
  type BuilderOption,
  type BuilderProduct,
} from '@/components/gift-boxes/PrebuiltBridesmaidProposalBoxBuilder'
import { getLowestDisplayPrice, getProductBySlug, getProducts } from '@/lib/swell'

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

type ProductKey =
  | 'compactMirror'
  | 'hairbrush'
  | 'jewelryCase'
  | 'sleepCollection'
  | 'robe'
  | 'cosmeticPouch'

const productSlugs: Record<ProductKey, string> = {
  compactMirror: 'personalized-compact-mirror-custom-heirloom-bridal-gift',
  hairbrush: 'the-heirloom-botanical-hairbrush',
  jewelryCase: 'bespoke-velvet-heirloom-jewelry-case',
  sleepCollection: 'bespoke-satin-sleep-collection',
  robe: 'bespoke-satin-lace-bridal-robe',
  cosmeticPouch: 'custom-cosmetic-pouch-personalized-bridal-party-gift',
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
  cosmeticPouch: {
    id: '69edf9bf102ae80012e6c0b6',
    name: 'Custom Cream Cosmetic Pouch',
    slug: 'custom-cosmetic-pouch-personalized-bridal-party-gift',
    price: 29.99,
    image: 'https://cdn.swell.store/customweddingco/69edfa9ca8d4690012ef0cee/9ec0e615d569ad448877eee630fe5e24/remove_the_customzation_202604260444.jpeg',
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

function trimName(name: string) {
  return name.split('|')[0].trim()
}

function toBuilderProduct(product: StoreProduct | undefined, fallback: BuilderProduct): BuilderProduct {
  if (!product?.id) return fallback

  return {
    id: product.id,
    name: trimName(product.name || fallback.name),
    slug: product.slug || fallback.slug,
    price: getLowestDisplayPrice(product) || fallback.price,
    image: getImage(product, fallback.image),
    description: product.description,
    options: product.options || [],
  }
}

function toBaseProduct(product: StoreProduct | null): BuilderBaseProduct {
  return {
    id: product?.id || '69ec95abc394200012694a0c',
    name: product?.name || 'Custom Bridesmaid Box',
    slug: product?.slug || 'bridesmaid-box',
    price: getLowestDisplayPrice(product) || 15,
    options: product?.options || [],
  }
}

export default async function PrebuiltBridesmaidBoxTestTwoPage() {
  const [allProductsResponse, baseBox] = await Promise.all([
    getProducts(),
    getProductBySlug('bridesmaid-box'),
  ])

  const storeProducts = (allProductsResponse?.results || []) as StoreProduct[]
  const productsBySlug = new Map(storeProducts.map((product) => [product.slug, product]))

  const products = Object.fromEntries(
    Object.entries(productSlugs).map(([key, slug]) => [
      key,
      toBuilderProduct(productsBySlug.get(slug), fallbackProducts[key as ProductKey]),
    ]),
  ) as Record<ProductKey, BuilderProduct>

  return (
    <PrebuiltBridesmaidProposalBoxBuilder
      baseBox={toBaseProduct(baseBox)}
      products={products}
    />
  )
}
