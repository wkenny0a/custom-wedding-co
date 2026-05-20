'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function SortDropdown() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentSort = searchParams.get('sort') || 'bestselling'

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', e.target.value)
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex items-center gap-3">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-gray-500">
                Sort By
            </span>
            <select
                value={currentSort}
                onChange={handleSortChange}
                className="bg-transparent border border-gold/30 px-4 py-2 text-sm font-sans text-espresso focus:outline-none focus:border-gold cursor-pointer"
            >
                <option value="bestselling">Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    )
}
