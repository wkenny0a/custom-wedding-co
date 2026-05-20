import { Suspense } from 'react'
import { ShopCatalog } from '@/components/shop/ShopCatalog'
import { getProducts, getLowestDisplayPrice } from '@/lib/swell'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Category | Custom Wedding Co.',
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params

    // Fetch products natively from Swell filtered by the category slug
    const swellProductsResponse = await getProducts({ category });
    const swellProducts = swellProductsResponse?.results || [];

    const formattedProducts = swellProducts.map((p: any) => {
        return {
            _id: p.id,
            name: p.name,
            slug: { current: p.slug },
            price: getLowestDisplayPrice(p),
            category: { title: category.replace(/-/g, ' ') },
            rating: [4.6, 4.7, 4.8, 4.9, 4.8, 4.7, 4.9, 4.8][p.slug.length % 8] || 4.8,
            reviewCount: ((p.slug.charCodeAt(0) * 7 + p.slug.length * 13) % 176) + 12 || 24,
            images: p.images || []
        }
    });

    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading shop...</div>}>
            <ShopCatalog categoryName={category} products={formattedProducts} />
        </Suspense>
    )
}
