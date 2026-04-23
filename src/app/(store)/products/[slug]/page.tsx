import { ProductHero } from '@/components/products/ProductHero'
import { ProductTabs } from '@/components/products/ProductTabs'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { ProductFAQ } from '@/components/products/ProductFAQ'
import { notFound } from 'next/navigation'
import { getProducts, getLowestDisplayPrice } from '@/lib/swell'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery } from '@/sanity/lib/queries'
import { ShieldCheck, Clock, Truck } from 'lucide-react'
import { getProductCategory, getRelatedProductSlugs } from '@/lib/categories'

export const metadata = {
    title: 'Product Details | Custom Wedding Co.',
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Fetch all products to find the current one AND to map related products
    const swellProductsResponse = await getProducts()
    const allSwellProducts = swellProductsResponse?.results || []

    const swellProduct = allSwellProducts.find((p: any) => p.slug === slug)

    // Fetch product content (reviews etc.) via secret key — the public API strips the `content` field
    let swellProductContent: any = {}
    try {
        const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID
        const secretKey = process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
        if (storeId && secretKey && swellProduct?.id) {
            const auth = Buffer.from(`${storeId}:${secretKey}`).toString('base64')
            const res = await fetch(`https://${storeId}.swell.store/api/products/${swellProduct.id}?fields=content`, {
                headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' },
                cache: 'no-cache',
                next: { revalidate: 0 }
            })
            if (res.ok) {
                const data = await res.json()
                swellProductContent = data.content || {}
            }
        }
    } catch (e) {
        console.warn('Could not fetch product content:', e)
    }

    // Fetch the CMS structure from Sanity (for layout UI)
    const sanityProduct = await client.fetch(productBySlugQuery, { slug }, { next: { revalidate: 0 } })

    console.log("DEBUG SSR: Requested Slug:", slug, "Fetched Product ID:", swellProduct?.id, "Has reviews:", !!swellProductContent?.reviews)

    // Build related products array. Fall back to products in same Swell category if none specified in CMS.
    const sanityRelatedSlugs = sanityProduct?.relatedProducts?.map((p: any) => p.slug?.current) || []
    let resolvedRelatedProducts = []

    if (sanityRelatedSlugs.length > 0) {
        resolvedRelatedProducts = allSwellProducts.filter((p: any) => sanityRelatedSlugs.includes(p.slug))
    } else {
        const relatedSlugs = getRelatedProductSlugs(slug);
        resolvedRelatedProducts = allSwellProducts.filter((p: any) => relatedSlugs.includes(p.slug)).slice(0, 4);
    }

    // Format them for the ProductCard component
    const formattedRelatedProducts = resolvedRelatedProducts.map((p: any) => ({
        _id: p.id,
        name: p.name,
        slug: { current: p.slug },
        price: getLowestDisplayPrice(p),
        rating: 5.0,
        reviewCount: Math.floor(Math.random() * 50) + 10,
        images: p.images || [],
        category: sanityProduct?.category ? { title: sanityProduct.category.title } : { title: 'Personalized' }
    }))

    if (!swellProduct) {
        notFound()
    }

    const lowestComputedPrice = getLowestDisplayPrice(swellProduct);
    const product = {
        _id: swellProduct.id,
        name: swellProduct.name,
        slug: { current: swellProduct.slug },
        price: Number(swellProduct.price) || 0,
        priceRange: `$${lowestComputedPrice.toFixed(2)}`,
        priceNote: 'per piece',
        badge: sanityProduct?.badge || 'Popular',
        category: { title: getProductCategory(slug) },
        rating: 5.0,
        reviewCount: 55,
        images: swellProduct.images || [],
        options: swellProduct.options || [],
        specifications: sanityProduct?.specifications || [],
        description: swellProduct.description || '',
        content: swellProductContent,
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

    // Default Hero Component definition
    const DefaultHero = () => <ProductHero product={product} />

    // Horizontal Trust Badges Strip
    const TrustBadges = () => (
        <div className="border-y border-gold/20 bg-cream/40">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="flex items-center gap-2.5">
                    <ShieldCheck className="text-gold w-5 h-5 flex-shrink-0" />
                    <span className="font-sans text-sm text-espresso font-medium">Personalization Included</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <Clock className="text-gold w-5 h-5 flex-shrink-0" />
                    <span className="font-sans text-sm text-espresso font-medium">Digital Proof Sent Within 24hrs</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <Truck className="text-gold w-5 h-5 flex-shrink-0" />
                    <span className="font-sans text-sm text-espresso font-medium">Free Shipping on Orders $75+</span>
                </div>
            </div>
        </div>
    )

    // Render Function for Sanity Blocks
    const renderBlock = (block: any, index: number) => {
        switch (block._type) {
            case 'productHeroBlock':
                return (
                    <div key={index}>
                        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
                            <DefaultHero />
                        </div>
                        <TrustBadges />
                    </div>
                )
            case 'productTabsBlock':
                return (
                    <div key={index} className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-16">
                        <ProductTabs product={product} />
                    </div>
                )
            case 'relatedProductsBlock':
                return <RelatedProducts key={index} related={formattedRelatedProducts} />
            case 'faqBlock':
                return <ProductFAQ key={index} block={block} />
            default:
                console.warn(`Unknown Sanity block type: ${block._type}`)
                return null
        }
    }

    const pageBuilder = sanityProduct?.pageBuilder || []

    return (
        <div className="bg-white min-h-screen">
            {pageBuilder.length > 0 ? (
                // Sanity Custom Layout
                <div className="flex flex-col">
                    {pageBuilder.map((block: any, idx: number) => renderBlock(block, idx))}
                </div>
            ) : (
                // Fallback Default Layout
                <>
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
                        <DefaultHero />
                    </div>
                    <TrustBadges />
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-16">
                        <ProductTabs product={product} />
                    </div>
                    <RelatedProducts related={formattedRelatedProducts} />
                </>
            )}
        </div>
    )
}
