import Image from 'next/image'
import Link from 'next/link'
import { StarRating } from './StarRating'

interface ProductCardProps {
    product: {
        _id: string
        name: string
        slug: { current: string }
        price: number
        priceNote?: string
        badge?: string
        category?: { title: string }
        rating: number
        reviewCount: number
        images: any[]
    }
}

export function ProductCard({ product }: ProductCardProps) {
    const imageUrl = product.images?.[0] ? '/placeholder.jpg' : '/placeholder.jpg' // We will implement Sanity Image URL later

    return (
        <div className="group flex flex-col gap-4 cursor-pointer">
            <Link href={`/products/${product.slug.current}`} className="relative aspect-[4/5] overflow-hidden bg-gray-100 block">
                {product.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-cream text-espresso px-3 py-1 text-xs uppercase tracking-wider font-semibold shadow-sm">
                        {product.badge}
                    </span>
                )}
                {/* We use a placeholder div right now, replace with Sanity Image */}
                <div className="w-full h-full bg-gray-200 transition-transform duration-500 group-hover:scale-105" />
            </Link>

            <div className="flex flex-col gap-1">
                {product.category && (
                    <span className="uppercase text-[0.65rem] tracking-[0.18em] text-gray-400">
                        {product.category.title}
                    </span>
                )}
                <Link href={`/products/${product.slug.current}`} className="mt-1">
                    <h3 className="font-serif text-lg leading-tight text-espresso transition-colors group-hover:text-gold">
                        {product.name}
                    </h3>
                </Link>
                <StarRating rating={product.rating} count={product.reviewCount} className="mt-1" />
                <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-sans font-medium text-espresso">${product.price}</span>
                    {product.priceNote && (
                        <span className="text-xs text-gray-400">{product.priceNote}</span>
                    )}
                </div>
            </div>
        </div>
    )
}
