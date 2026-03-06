'use client'

import { useState } from 'react'

export function ProductGallery({ images }: { images?: any[] }) {
    const [activeIndex, setActiveIndex] = useState(0)

    // Dummy images array to map over if none provided
    const displayImages = images?.length ? images : Array.from({ length: 5 })

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Image */}
            <div className="aspect-[4/5] bg-gray-100 w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-espresso/5 transition-opacity duration-300 group-hover:opacity-0 z-10" />
                <div className="w-full h-full bg-gray-200 transition-transform duration-700 ease-out group-hover:scale-105 origin-center cursor-zoom-in" />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {displayImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`aspect-square bg-gray-100 relative overflow-hidden transition-all duration-300 ${activeIndex === i
                                ? 'ring-2 ring-gold ring-offset-2'
                                : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-gold/50 hover:ring-offset-1'
                            }`}
                    >
                        <div className="w-full h-full bg-gray-200" />
                    </button>
                ))}
            </div>
        </div>
    )
}
