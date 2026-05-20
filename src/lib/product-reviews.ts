import fs from 'node:fs'
import path from 'node:path'

export type ProductReview = {
    id: string
    productName: string
    reviewerName: string
    rating: number
    date: string
    text: string
    initials: string
    image?: string
}

const REVIEW_LIMIT = 300

function parseCsvRows(csv: string) {
    const rows: string[][] = []
    let row: string[] = []
    let cell = ''
    let isQuoted = false

    for (let index = 0; index < csv.length; index += 1) {
        const char = csv[index]
        const nextChar = csv[index + 1]

        if (char === '"' && isQuoted && nextChar === '"') {
            cell += '"'
            index += 1
            continue
        }

        if (char === '"') {
            isQuoted = !isQuoted
            continue
        }

        if (char === ',' && !isQuoted) {
            row.push(cell)
            cell = ''
            continue
        }

        if ((char === '\n' || char === '\r') && !isQuoted) {
            if (char === '\r' && nextChar === '\n') {
                index += 1
            }

            row.push(cell)
            if (row.some((value) => value.trim() !== '')) {
                rows.push(row)
            }
            row = []
            cell = ''
            continue
        }

        cell += char
    }

    if (cell || row.length > 0) {
        row.push(cell)
        if (row.some((value) => value.trim() !== '')) {
            rows.push(row)
        }
    }

    return rows
}

function getInitials(name: string) {
    const parts = name.replace(/\./g, '').split(/\s+/).filter(Boolean)

    if (parts.length === 0) return 'CW'
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

function formatReviewDate(date: string) {
    const parsedDate = new Date(`${date}T12:00:00Z`)

    if (Number.isNaN(parsedDate.getTime())) return date

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(parsedDate)
}

function getReviewImages() {
    const imageDirectory = path.join(process.cwd(), 'public/images/reviews/wall')

    if (!fs.existsSync(imageDirectory)) return []

    return fs
        .readdirSync(imageDirectory)
        .filter((fileName) => /\.(avif|jpe?g|png|webp)$/i.test(fileName))
        .sort((a, b) => a.localeCompare(b))
        .map((fileName) => `/images/reviews/wall/${fileName}`)
}

export function getProductReviews(limit = REVIEW_LIMIT) {
    const csvPath = path.join(process.cwd(), 'product_reviews.csv')
    const csv = fs.readFileSync(csvPath, 'utf8')
    const [headers, ...rows] = parseCsvRows(csv)
    const reviewImages = getReviewImages()
    const imageSlots = new Map<number, string>()
    const maxReviews = Math.min(limit, rows.length)
    const selectedRows = rows.length <= maxReviews
        ? rows
        : Array.from({ length: maxReviews }, (_, index) => rows[Math.floor((index * rows.length) / maxReviews)])

    reviewImages.slice(0, maxReviews).forEach((image, index) => {
        const slot = Math.floor((index * maxReviews) / reviewImages.length)
        imageSlots.set(slot, image)
    })

    const getColumnIndex = (name: string) => headers.indexOf(name)
    const productIndex = getColumnIndex('Product Name')
    const reviewerIndex = getColumnIndex('Reviewer Name')
    const ratingIndex = getColumnIndex('Rating')
    const dateIndex = getColumnIndex('Date')
    const textIndex = getColumnIndex('Review Text')

    return selectedRows.map((row, index) => {
        const reviewerName = row[reviewerIndex]?.trim() || 'Verified Customer'
        const rating = Number(row[ratingIndex]) || 5

        return {
            id: `review-${index + 1}`,
            productName: row[productIndex]?.trim() || 'Custom Wedding Co. order',
            reviewerName,
            rating,
            date: formatReviewDate(row[dateIndex]?.trim() || ''),
            text: row[textIndex]?.trim() || '',
            initials: getInitials(reviewerName),
            image: imageSlots.get(index),
        }
    })
}

export function getReviewSummary(reviews: ProductReview[]) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0
    const products = new Set(reviews.map((review) => review.productName))
    const imageCount = reviews.filter((review) => review.image).length

    return {
        averageRating,
        productCount: products.size,
        imageCount,
        reviewCount: reviews.length,
    }
}
