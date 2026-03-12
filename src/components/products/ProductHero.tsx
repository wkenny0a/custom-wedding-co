'use client'

import { useState } from 'react'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'

export function ProductHero({ product }: { product: any }) {
    const [selectedVariantImageUrl, setSelectedVariantImageUrl] = useState<string | null>(null)

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="w-full lg:w-[55%]">
                <div className="sticky top-32">
                    <ProductGallery
                        images={product.images}
                        selectedVariantImageUrl={selectedVariantImageUrl}
                        onClearVariantImage={() => setSelectedVariantImageUrl(null)}
                    />
                </div>
            </div>
            <div className="w-full lg:w-[45%]">
                <ProductInfo
                    product={product}
                    onStyleImageSelect={(url) => setSelectedVariantImageUrl(url)}
                />
            </div>
        </div>
    )
}
