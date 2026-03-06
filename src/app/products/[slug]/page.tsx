import { ProductGallery } from '@/components/products/ProductGallery'
import { ProductInfo } from '@/components/products/ProductInfo'
import { ProductTabs } from '@/components/products/ProductTabs'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/swell'

export const metadata = {
    title: 'Product Details | Custom Wedding Co.',
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const swellProduct = await getProductBySlug(slug)

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
        // Since Swell doesn't natively do "priceRange" out of the box without complex variant parsing, we'll format a string
        priceRange: `$${Number(swellProduct.price || 0).toFixed(2)}`,
        priceNote: 'per piece',
        badge: 'Custom',
        category: { title: 'Personalized' },
        rating: 5.0,
        reviewCount: 55,
        images: swellProduct.images || [],
        // Pass the raw options (style, material, etc) for the variant selectors if your ProductInfo component needs them
        options: swellProduct.options || [],
        description: swellProduct.description || ''
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Column - Gallery */}
                    <div className="w-full lg:w-[55%]">
                        <div className="sticky top-32">
                            <ProductGallery images={product.images} />
                        </div>
                    </div>

                    {/* Right Column - Info */}
                    <div className="w-full lg:w-[45%]">
                        <ProductInfo product={product} />
                    </div>

                </div>

                {/* Tabs Below First Fold */}
                <ProductTabs product={product} />
            </div>

            {/* Related Products */}
            <RelatedProducts />
        </div>
    )
}
