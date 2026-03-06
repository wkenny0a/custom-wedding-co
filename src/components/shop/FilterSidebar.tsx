'use client'

import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'

export function FilterSidebar({ categories }: { categories: string[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentCategory = pathname.startsWith('/shop/') ? pathname.split('/')[2] : 'all'
    const currentPrice = searchParams.get('price') || 'all'
    const currentRating = searchParams.get('rating') || 'all'

    const handlePriceChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all') params.delete('price')
        else params.set('price', value)
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleRatingChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all') params.delete('rating')
        else params.set('rating', value)
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-10">

            {/* Category Filter */}
            <div className="flex flex-col gap-4">
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm text-espresso border-b border-gold/20 pb-2">
                    Category
                </h3>
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="radio"
                            name="category"
                            checked={currentCategory === 'all'}
                            onChange={() => router.push('/shop')}
                            className="accent-gold w-4 h-4 cursor-pointer"
                        />
                        <span className={`font-sans text-sm ${currentCategory === 'all' ? 'text-espresso font-semibold' : 'text-gray-500 group-hover:text-espresso'}`}>
                            All Products
                        </span>
                    </label>

                    {categories.map((cat) => {
                        const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
                        const isChecked = currentCategory === slug
                        return (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={isChecked}
                                    onChange={() => router.push(`/shop/${slug}`)}
                                    className="accent-gold w-4 h-4 cursor-pointer"
                                />
                                <span className={`font-sans text-sm ${isChecked ? 'text-espresso font-semibold' : 'text-gray-500 group-hover:text-espresso'}`}>
                                    {cat}
                                </span>
                            </label>
                        )
                    })}
                </div>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-4">
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm text-espresso border-b border-gold/20 pb-2">
                    Price Range
                </h3>
                <div className="flex flex-col gap-3">
                    {[
                        { label: 'All Prices', value: 'all' },
                        { label: 'Under $25', value: 'under-25' },
                        { label: '$25 – $75', value: '25-75' },
                        { label: '$75 – $150', value: '75-150' },
                        { label: 'Over $150', value: 'over-150' },
                    ].map((price) => (
                        <label key={price.value} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="price"
                                checked={currentPrice === price.value}
                                onChange={() => handlePriceChange(price.value)}
                                className="accent-gold w-4 h-4 cursor-pointer"
                            />
                            <span className={`font-sans text-sm ${currentPrice === price.value ? 'text-espresso font-semibold' : 'text-gray-500 group-hover:text-espresso'}`}>
                                {price.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div className="flex flex-col gap-4">
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm text-espresso border-b border-gold/20 pb-2">
                    Rating
                </h3>
                <div className="flex flex-col gap-3">
                    {[
                        { label: 'Any Rating', value: 'all' },
                        { label: '4.5+ Stars', value: '4.5' },
                        { label: '4.8+ Stars', value: '4.8' },
                    ].map((rating) => (
                        <label key={rating.value} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="rating"
                                checked={currentRating === rating.value}
                                onChange={() => handleRatingChange(rating.value)}
                                className="accent-gold w-4 h-4 cursor-pointer"
                            />
                            <span className={`font-sans text-sm ${currentRating === rating.value ? 'text-espresso font-semibold' : 'text-gray-500 group-hover:text-espresso'}`}>
                                {rating.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

        </div>
    )
}
