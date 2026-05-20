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
    const imageUrl = product.images?.[0]?.file?.url || product.images?.[0]?.url || null

    // Determine badge logic if one isn't explicitly provided
    let displayBadge = product.badge;
    if (!displayBadge) {
        if (product.name.toLowerCase().includes('bridesmaid') || product.name.toLowerCase().includes('maid')) {
            displayBadge = 'Great for Bridesmaids';
        } else if (product.price > 100) {
            displayBadge = 'Ships Fast';
        } else if (product.price < 30) {
            displayBadge = 'Bulk Eligible';
        } else if (product.rating >= 4.9 && product.reviewCount > 30) {
            displayBadge = 'Bestseller';
        }
    }

    return (
        <div className="group flex flex-col gap-4 cursor-pointer">
            <Link href={`/products/${product.slug.current}`} className="relative aspect-[4/5] overflow-hidden bg-gray-100 block">
                {displayBadge && (
                    <span className="absolute top-3 left-3 z-10 bg-cream/95 backdrop-blur-sm border border-gold/30 text-espresso px-2.5 py-1 text-[0.65rem] uppercase tracking-widest font-semibold shadow-sm">
                        {displayBadge}
                    </span>
                )}

                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center text-gray-400 text-sm">
                        No Image
                    </div>
                )}
            </Link>

            <div className="flex flex-col gap-1 px-1">
                {product.category && (
                    <span className="uppercase text-[0.65rem] tracking-[0.18em] text-gray-400">
                        {product.category.title}
                    </span>
                )}
                <Link href={`/products/${product.slug.current}`} className="mt-1">
                    <h3 className="font-serif text-lg leading-tight text-espresso transition-colors group-hover:text-gold line-clamp-2 break-words">
                        {product.name}
                    </h3>
                </Link>
                <StarRating rating={product.rating} count={product.reviewCount} className="mt-1" />
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-sans font-medium text-espresso">${product.price}</span>
                    {product.priceNote && (
                        <span className="text-[0.65rem] text-gray-400 uppercase tracking-widest">{product.priceNote}</span>
                    )}
                </div>
            </div>
        </div>
    )
}
