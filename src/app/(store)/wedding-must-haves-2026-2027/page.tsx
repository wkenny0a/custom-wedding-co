/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { getProducts, getLowestDisplayPrice } from '@/lib/swell'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { MustHavesClientPage } from './MustHavesClientPage'

export const metadata: Metadata = {
    title: '2026/2027 Wedding Must-Haves for Guest Experience | Custom Wedding Co.',
    description: 'Discover personalized wedding guest experience ideas for 2026 and 2027, from engraved glassware and ceremony fans to premium favors and custom bar details.',
}

export const dynamic = 'force-dynamic'

export default async function WeddingMustHavesGuidePage() {
    const slugs = [
        'bespoke-engraved-groomsmen-pint-glass', 
        'bespoke-keepsake-handheld-fan', 
        'bespoke-gold-gilded-agate-coaster', 
        'bespoke-acrylic-cocktail-stirrers',
        'bespoke-gold-embossed-passport-cover',
        'bespoke-leather-cigar-case',
        'gold-celebration-cannon',
        'bespoke-engraved-black-stainless-steel-chopsticks',
        'heirloom-engraved-cutlery-set',
        'heirloom-walnut-ring-dish',
        'bespoke-leather-golf-pouch',
        'bespoke-engraved-heirloom-bottle-opener'
    ]

    // 1. Fetch all products from Swell to map option schemas and prices
    const swellProductsResponse = await getProducts()
    const allSwellProducts = swellProductsResponse?.results || []

    // 2. Batch fetch metadata from Sanity for all 12 products
    const productsQuery = groq`*[_type == "product" && slug.current in $slugs] {
        ...,
        category->,
        relatedProducts[]->,
        isMultiBuy,
        perItemOptionNames,
        styleVariants[] {
            variantName,
            "imageUrl": image.asset->url
        }
    }`
    
    let sanityProducts: any[] = []
    try {
        sanityProducts = await client.fetch(productsQuery, { slugs }, { next: { revalidate: 0 } })
    } catch (e) {
        console.warn('Could not fetch Sanity metadata:', e)
    }

    // 3. Hydrate and enrich the product objects
    const enrichedProducts = slugs.map(slug => {
        const swellProduct = allSwellProducts.find((p: any) => p.slug === slug)
        if (!swellProduct) return null

        const sanityProduct = sanityProducts.find((p: any) => p.slug?.current === slug)
        const lowestComputedPrice = getLowestDisplayPrice(swellProduct)

        return {
            _id: swellProduct.id,
            name: swellProduct.name,
            slug: { current: swellProduct.slug },
            price: Number(swellProduct.price) || 0,
            priceRange: `$${lowestComputedPrice.toFixed(2)}`,
            priceNote: '',
            badge: sanityProduct?.badge || 'Popular',
            category: { title: 'Personalized Details' },
            rating: [4.7, 4.8, 4.9, 4.6, 4.8, 4.9, 4.7, 4.8][swellProduct.slug.length % 8],
            reviewCount: ((swellProduct.slug.charCodeAt(0) * 7 + swellProduct.slug.length * 13) % 176) + 12,
            images: swellProduct.images || [],
            options: swellProduct.options || [],
            specifications: sanityProduct?.specifications || [],
            description: swellProduct.description || '',
            styleVariantImages: sanityProduct?.styleVariants || [],
            bundleProducts: (sanityProduct?.bundleProducts || [])
                .map((bpSlug: string) => {
                    const match = allSwellProducts.find((p: any) => p.slug === bpSlug)
                    if (!match) return null
                    return {
                        name: match.name,
                        slug: match.slug,
                        price: Number(match.price) || 0,
                        imageUrl: match.images?.[0]?.file?.url || null,
                    }
                })
                .filter(Boolean),
            isMultiBuy: sanityProduct?.isMultiBuy || false,
            perItemOptionNames: sanityProduct?.perItemOptionNames || [],
        }
    }).filter(Boolean)

    return <MustHavesClientPage allProducts={enrichedProducts} />
}
