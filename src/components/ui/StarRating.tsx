import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number
    count?: number
    className?: string
    starClassName?: string
}

export function StarRating({ rating, count, className = '', starClassName = '' }: StarRatingProps) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < fullStars || (i === fullStars && hasHalfStar)
                                ? 'fill-gold text-gold'
                                : 'fill-gray-200 text-gray-200'
                            } ${starClassName}`}
                    />
                ))}
            </div>
            {count !== undefined && (
                <span className="text-sm text-gray-400 ml-1">({count})</span>
            )}
        </div>
    )
}
