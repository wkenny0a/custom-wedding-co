'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProductGallery({ images }: { images?: any[] }) {
    const [activeIndex, setActiveIndex] = useState(0)

    // Dummy images array to map over if none provided
    const displayImages = images?.length ? images : [{ file: { url: '/placeholder.jpg' } }]

    // Safely get the active image url from the Swell structure
    const activeImageUrl = displayImages[activeIndex]?.file?.url || displayImages[activeIndex]?.url || '/placeholder.jpg'

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-espresso/5 transition-opacity duration-300 group-hover:opacity-0 z-10" />
                <Image
                    src={activeImageUrl}
                    alt="Product Image"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 origin-center cursor-zoom-in"
                />
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="grid grid-cols-5 gap-3 sm:gap-4">
                    {displayImages.map((img, i) => {
                        const thumbUrl = img?.file?.url || img?.url || '/placeholder.jpg'
                        return (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`aspect-square bg-gray-100 relative overflow-hidden transition-all duration-300 ${activeIndex === i
                                    ? 'ring-2 ring-gold ring-offset-2'
                                    : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-gold/50 hover:ring-offset-1'
                                    }`}
                            >
                                <Image
                                    src={thumbUrl}
                                    alt={`Thumbnail ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
