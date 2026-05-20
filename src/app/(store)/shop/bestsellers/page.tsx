import { Suspense } from 'react'
import { ShopCatalog } from '@/components/shop/ShopCatalog'
import { getProducts } from '@/lib/swell'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Bestsellers | Custom Wedding Co.',
    description: 'Shop our most loved and popular customized wedding products.',
}

export default async function BestsellersPage() {
    const swellProductsResponse = await getProducts();
    const swellProducts = swellProductsResponse?.results || [];

    // Mock bestsellers logic: take the first 8 products or products with specific criteria
    const bestsellerProducts = swellProducts.slice(0, 8);

    const formattedProducts = bestsellerProducts.map((p: any) => ({
        _id: p.id,
        name: p.name,
        slug: { current: p.slug },
        price: p.price,
        badge: 'Bestseller',
        rating: 5.0,
        reviewCount: Math.floor(Math.random() * 50) + 20,
        images: p.images || []
    }));

    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading bestsellers...</div>}>
            {/* Hero for Bestsellers */}
            <div className="bg-espresso text-cream py-16 px-4 text-center">
                <h1 className="font-display text-4xl md:text-5xl mb-4">Our Bestsellers</h1>
                <p className="font-sans text-cream/80 max-w-2xl mx-auto">The most loved pieces, trusted by couples everywhere to make their special day unforgettable.</p>
            </div>
            
            <ShopCatalog products={formattedProducts} />
        </Suspense>
    )
}
