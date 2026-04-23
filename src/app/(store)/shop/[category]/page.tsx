import { Suspense } from 'react'
import { ShopCatalog } from '@/components/shop/ShopCatalog'
import { getProducts } from '@/lib/swell'

import { getProductCategory } from '@/lib/categories'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Category | Custom Wedding Co.',
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params

    // Fetch products filtered by this category slug
    const swellProductsResponse = await getProducts({ category: category });
    const swellProducts = swellProductsResponse?.results || [];

    // Map Swell product schema to our ProductCard component schema
    const formattedProducts = swellProducts.map((p: any) => ({
        _id: p.id,
        name: p.name,
        slug: { current: p.slug },
        price: p.price,
        category: { title: getProductCategory(p.slug) },
        rating: 4.9,
        reviewCount: Math.floor(Math.random() * 50) + 40,
        images: p.images || []
    }));

    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading shop...</div>}>
            <ShopCatalog categoryName={category} products={formattedProducts} />
        </Suspense>
    )
}
