'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
    images?: any[]
    selectedVariantImageUrl?: string | null
    onClearVariantImage?: () => void
}

export function ProductGallery({ images, selectedVariantImageUrl, onClearVariantImage }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    // Dummy images array to map over if none provided
    const displayImages = images?.length ? images : [{ file: { url: '/placeholder.jpg' } }]

    // If a variant image is selected, show that; otherwise use the gallery's active image
    const galleryImageUrl = displayImages[activeIndex]?.file?.url || displayImages[activeIndex]?.url || '/placeholder.jpg'
    const activeImageUrl = selectedVariantImageUrl || galleryImageUrl

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index)
        // Clear the variant override so the user can browse the gallery again
        if (onClearVariantImage) onClearVariantImage()
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
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
                        const isActive = !selectedVariantImageUrl && activeIndex === i
                        return (
                            <button
                                key={i}
                                onClick={() => handleThumbnailClick(i)}
                                className={`aspect-square bg-gray-100 relative overflow-hidden transition-all duration-300 ${isActive
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
