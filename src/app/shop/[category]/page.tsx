import { Suspense } from 'react'
import { ShopCatalog } from '@/components/shop/ShopCatalog'

export const metadata = {
    title: 'Category | Custom Wedding Co.',
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params
    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading shop...</div>}>
            <ShopCatalog categoryName={category} />
        </Suspense>
    )
}
