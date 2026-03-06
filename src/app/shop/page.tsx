import { Suspense } from 'react'
import { ShopCatalog } from '@/components/shop/ShopCatalog'

export const metadata = {
    title: 'Shop All | Custom Wedding Co.',
    description: 'Browse our full collection of perfectly personalized wedding products.',
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading shop...</div>}>
            <ShopCatalog />
        </Suspense>
    )
}
