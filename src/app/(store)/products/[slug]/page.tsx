import { ProductGallery } from '@/components/products/ProductGallery'
import { ProductInfo } from '@/components/products/ProductInfo'
import { ProductTabs } from '@/components/products/ProductTabs'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { ProductFAQ } from '@/components/products/ProductFAQ'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/swell'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery } from '@/sanity/lib/queries'

export const metadata = {
    title: 'Product Details | Custom Wedding Co.',
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Fetch the raw product from Swell (for cart data)
    const swellProduct = await getProductBySlug(slug)
    // Fetch the CMS structure from Sanity (for layout UI)
    const sanityProduct = await client.fetch(productBySlugQuery, { slug })

    console.log("DEBUG SSR: Requested Slug:", slug, "Fetched Product ID:", swellProduct?.id)

    if (!swellProduct) {
        notFound()
    }

    // Map Swell product to expected structure
    const product = {
        _id: swellProduct.id,
        name: swellProduct.name,
        slug: { current: swellProduct.slug },
        price: Number(swellProduct.price) || 0,
        priceRange: `$${Number(swellProduct.price || 0).toFixed(2)}`,
        priceNote: 'per piece',
        badge: 'Custom',
        category: { title: 'Personalized' },
        rating: 5.0,
        reviewCount: 55,
        images: swellProduct.images || [],
        options: swellProduct.options || [],
        description: swellProduct.description || ''
    }

    // Default Hero Component definition
    const DefaultHero = () => (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="w-full lg:w-[55%]">
                <div className="sticky top-32">
                    <ProductGallery images={product.images} />
                </div>
            </div>
            <div className="w-full lg:w-[45%]">
                <ProductInfo product={product} />
            </div>
        </div>
    )

    // Render Function for Sanity Blocks
    const renderBlock = (block: any, index: number) => {
        switch (block._type) {
            case 'productHeroBlock':
                return (
                    <div key={index} className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
                        <DefaultHero />
                    </div>
                )
            case 'productTabsBlock':
                return (
                    <div key={index} className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-16">
                        <ProductTabs product={product} />
                    </div>
                )
            case 'relatedProductsBlock':
                return <RelatedProducts key={index} />
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
                        <ProductTabs product={product} />
                    </div>
                    <RelatedProducts />
                </>
            )}
        </div>
    )
}
