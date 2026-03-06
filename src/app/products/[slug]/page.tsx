import { ProductGallery } from '@/components/products/ProductGallery'
import { ProductInfo } from '@/components/products/ProductInfo'
import { ProductTabs } from '@/components/products/ProductTabs'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Product Details | Custom Wedding Co.',
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Dummy product fetch simulation
    const product = {
        _id: `prod-${slug}`,
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug: { current: slug },
        price: 285,
        priceRange: '$285 for set of 100',
        priceNote: 'per suite',
        badge: 'Bestseller',
        category: { title: 'Paper Goods' },
        rating: 4.9,
        reviewCount: 124,
        images: [] // Sanity image array later
    }

    if (!product) {
        notFound()
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
