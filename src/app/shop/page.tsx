import { Suspense } from 'react'
import { ShopCatalog } from '@/components/shop/ShopCatalog'
import { getProducts } from '@/lib/swell'

export const metadata = {
    title: 'Shop All | Custom Wedding Co.',
    description: 'Browse our full collection of perfectly personalized wedding products.',
}

export default async function ShopPage() {
    const swellProductsResponse = await getProducts();
    const swellProducts = swellProductsResponse?.results || [];

    // Map Swell product schema to our ProductCard component schema
    // In a real app we would use explicit types, but this maps the basic requirements
    const formattedProducts = swellProducts.map((p: any) => ({
        _id: p.id,
        name: p.name,
        slug: { current: p.slug },
        price: p.price,
        // Calculate dummy rating data for UI completeness since Swell doesn't handle reviews natively out of the box
        rating: 5.0,
        reviewCount: Math.floor(Math.random() * 50) + 10,
        images: p.images || []
    }));

    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading shop...</div>}>
            <ShopCatalog products={formattedProducts} />
        </Suspense>
    )
}
