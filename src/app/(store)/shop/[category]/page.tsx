import { Suspense } from 'react'
import { TopCategoryMenu } from '@/components/layout/TopCategoryMenu'
import { ShopCatalog } from '@/components/shop/ShopCatalog'
import { getProducts, getLowestDisplayPrice } from '@/lib/swell'
import { getProductCategory, getProductCategories } from '@/lib/categories'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Category | Custom Wedding Co.',
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params

    // Fetch all products since Swell backend doesn't know our custom mapped 12 categories
    const swellProductsResponse = await getProducts();
    const swellProducts = swellProductsResponse?.results || [];

    // Filter products locally by multiple categories
    const formattedProducts = swellProducts
        .filter((p: any) => {
            const productCategorySlugs = getProductCategories(p.slug).map(c => 
                c.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
            );
            return productCategorySlugs.includes(category);
        })
        .map((p: any) => {
            const categoryInfo = getProductCategory(p.slug);
            return {
                _id: p.id,
                name: p.name,
                slug: { current: p.slug },
                price: getLowestDisplayPrice(p),
                category: { title: categoryInfo?.title || categoryInfo?.name || 'Personalized' },
                rating: [4.6, 4.7, 4.8, 4.9, 4.8, 4.7, 4.9, 4.8][p.slug.length % 8],
                reviewCount: ((p.slug.charCodeAt(0) * 7 + p.slug.length * 13) % 176) + 12,
                images: p.images || []
            }
        });

    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading shop...</div>}>
            <ShopCatalog categoryName={category} products={formattedProducts} />
        </Suspense>
    )
}
