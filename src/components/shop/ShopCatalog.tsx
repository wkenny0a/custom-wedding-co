'use client'

import { useState } from 'react'
import { FilterSidebar } from './FilterSidebar'
import { SortDropdown } from './SortDropdown'
import { ProductCard } from '../ui/ProductCard'
import { Filter, X } from 'lucide-react'

// Dummy Data until Sanity passes props
const DUMMY_CATEGORIES = [
    'Paper Goods', 'Décor & Signage', 'Keepsakes', 'Wearables', 'Day-Of Essentials', 'Sentimental Gifts'
]

const generateDummyProducts = (count = 24) => {
    return Array.from({ length: count }).map((_, i) => ({
        _id: `prod-${i}`,
        name: 'Custom Luxury Wedding Vow Books',
        slug: { current: 'custom-vow-books' },
        price: 35 + (i * 2),
        priceNote: 'per pair',
        badge: i === 0 ? 'Bestseller' : i === 2 ? 'Trending' : undefined,
        category: { title: DUMMY_CATEGORIES[i % DUMMY_CATEGORIES.length] },
        rating: 4.8 + (Math.random() * 0.2), // 4.8 to 5.0
        reviewCount: 20 + i,
        images: []
    }))
}

export function ShopCatalog({ categoryName }: { categoryName?: string }) {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
    const products = generateDummyProducts(24) // Replace with props from server

    return (
        <div className="bg-cream min-h-screen py-10 lg:py-16">

            {/* Page Header */}
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 mb-10 lg:mb-16 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 font-sans text-xs uppercase tracking-widest text-gray-400 mb-4">
                    <span>Home</span>
                    <span>/</span>
                    <span>Shop</span>
                    {categoryName && (
                        <>
                            <span>/</span>
                            <span className="text-espresso font-semibold">{categoryName.replace(/-/g, ' ')}</span>
                        </>
                    )}
                </div>
                <h1 className="font-display text-4xl lg:text-5xl text-espresso capitalize">
                    {categoryName ? categoryName.replace(/-/g, ' ') : 'All Products'}
                </h1>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 items-start">

                {/* Desktop Sidebar */}
                <div className="hidden lg:block sticky top-32">
                    <FilterSidebar categories={DUMMY_CATEGORIES} />
                </div>

                {/* Mobile Filter & Sort Controls */}
                <div className="w-full flex-1 flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                        <span className="font-sans text-sm text-gray-500">
                            Showing {products.length} of {products.length} products
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest text-espresso"
                                onClick={() => setMobileFilterOpen(true)}
                            >
                                <Filter size={16} /> Filters
                            </button>
                            <div className="hidden sm:block">
                                <SortDropdown />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>

            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
                    <div className="relative w-4/5 max-w-sm bg-cream h-full overflow-y-auto p-6 shadow-2xl flex flex-col gap-8">
                        <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                            <span className="font-display text-xl text-espresso">Filters</span>
                            <button onClick={() => setMobileFilterOpen(false)} className="text-espresso hover:text-gold">
                                <X size={24} />
                            </button>
                        </div>
                        <FilterSidebar categories={DUMMY_CATEGORIES} />
                    </div>
                </div>
            )}

        </div>
    )
}
