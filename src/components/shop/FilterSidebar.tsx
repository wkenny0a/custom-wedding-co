'use client'

import { useRouter, usePathname } from 'next/navigation'

export function FilterSidebar({ categories }: { categories: string[] }) {
    const router = useRouter()
    const pathname = usePathname()

    const currentCategory = pathname.startsWith('/shop/') ? pathname.split('/')[2] : 'all'

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

        </div>
    )
}
