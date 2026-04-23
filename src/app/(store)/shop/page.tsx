import { Suspense } from 'react'
import { ShopCatalog } from '@/components/shop/ShopCatalog'
import { getProducts, getLowestDisplayPrice } from '@/lib/swell'

import { getProductCategory } from '@/lib/categories'

export const dynamic = 'force-dynamic'

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
        price: getLowestDisplayPrice(p),
        category: { title: getProductCategory(p.slug) },
        // Calculate dummy rating data for UI completeness
        rating: 4.9,
        reviewCount: Math.floor(Math.random() * 50) + 40,
        images: p.images || []
    }));

    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading shop...</div>}>
            <div className="w-full text-center py-4 bg-red-100 text-red-800 text-xs hidden">
                DEBUG INFO: missing_keys={String(swellProductsResponse?._debug_missing_keys)} | error={String(swellProductsResponse?._debug_error)}
            </div>
            {/* Show visible debug on failure */}
            {(swellProductsResponse?._debug_missing_keys || swellProductsResponse?._debug_error) && (
                <div className="w-full text-center py-4 bg-red-100 text-red-800 font-bold mb-4">
                    Vercel Debug Info: Missing Keys? {String(swellProductsResponse?._debug_missing_keys)}, Fetch Error Status: {String(swellProductsResponse?._debug_error)}
                </div>
            )}
            <ShopCatalog products={formattedProducts} />
        </Suspense>
    )
}
