import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './src/sanity/env'

// Must provide a token with write access to run this script
// Run with: NEXT_PUBLIC_SANITY_TOKEN="your_token" npx tsx seed.ts

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const categories = [
    { title: 'Paper Goods', slug: { current: 'paper-goods' }, productCount: 12 },
    { title: 'Décor & Signage', slug: { current: 'decor-signage' }, productCount: 8 },
    { title: 'Keepsakes', slug: { current: 'keepsakes' }, productCount: 6 },
    { title: 'Wearables', slug: { current: 'wearables' }, productCount: 4 },
    { title: 'Day-Of Essentials', slug: { current: 'day-of-essentials' }, productCount: 3 },
    { title: 'Sentimental Gifts', slug: { current: 'sentimental-gifts' }, productCount: 4 },
]

const products = [
    // Paper Goods
    { name: 'Custom Wedding Invitation Suite', price: 285, priceRange: '$285/set of 100', priceNote: '', badge: 'Bestseller', isBestseller: true, rating: 4.9, reviewCount: 124, category: 'paper-goods' },
    { name: 'Luxury Vellum Invitation with Wax Seal', price: 9, priceRange: '', priceNote: 'each', badge: 'Trending', isBestseller: false, rating: 4.8, reviewCount: 45, category: 'paper-goods' },
    { name: 'Personalized Photo Save the Date Magnet', price: 89, priceRange: '$89/set of 50', priceNote: '', isBestseller: false, rating: 4.9, reviewCount: 312, category: 'paper-goods' },
    { name: 'Custom Wedding Ceremony Program Fan', price: 2.50, priceRange: '', priceNote: 'each', isBestseller: false, rating: 4.8, reviewCount: 89, category: 'paper-goods' },
    { name: 'Personalized Wedding Thank You Cards', price: 95, priceRange: '$95/set of 50', priceNote: '', isBestseller: false, rating: 4.9, reviewCount: 201, category: 'paper-goods' },

    // Décor & Signage
    { name: 'Custom Acrylic Wedding Welcome Sign', price: 149, priceRange: '', priceNote: '', badge: 'Bestseller', isBestseller: true, rating: 4.9, reviewCount: 423, category: 'decor-signage' },
    { name: 'Custom Gold Mirror Acrylic Seating Chart', price: 200, priceRange: '', priceNote: '', isBestseller: false, rating: 4.8, reviewCount: 56, category: 'decor-signage' },
    { name: 'Custom Acrylic Table Number Signs', price: 45, priceRange: '$45/set of 10', priceNote: '', isBestseller: false, rating: 4.9, reviewCount: 178, category: 'decor-signage' },
    { name: 'Custom Wedding Bar Menu Sign', price: 35, priceRange: '', priceNote: '', isBestseller: false, rating: 4.9, reviewCount: 234, category: 'decor-signage' },
    { name: 'Personalized Wedding Venue Illustration', price: 50, priceRange: '', priceNote: '', isBestseller: false, rating: 4.9, reviewCount: 112, category: 'decor-signage' },

    // Keepsakes
    { name: 'Custom Wedding Photo Album', price: 80, priceRange: '', priceNote: '', isBestseller: false, rating: 4.8, reviewCount: 67, category: 'keepsakes' },
    { name: 'Personalized Walnut Wedding Memory Keepsake Box', price: 60, priceRange: '', priceNote: '', badge: 'Bestseller', isBestseller: true, rating: 4.9, reviewCount: 345, category: 'keepsakes' },
    { name: 'Personalized First Christmas Married Ornament', price: 15, priceRange: '', priceNote: '', isBestseller: false, rating: 4.9, reviewCount: 567, category: 'keepsakes' },
    { name: 'Personalized Engraved Wedding Picture Frame', price: 35, priceRange: '', priceNote: '', isBestseller: false, rating: 4.8, reviewCount: 89, category: 'keepsakes' },

    // Wearables
    { name: 'Personalized Satin Bridal Party Robe', price: 35, priceRange: '', priceNote: 'each', isBestseller: false, rating: 4.8, reviewCount: 421, category: 'wearables' },
    { name: 'Personalized Bridesmaid Necklace', price: 25, priceRange: '', priceNote: 'each', isBestseller: false, rating: 4.9, reviewCount: 234, category: 'wearables' },
    { name: 'Custom Wedding Dress Hanger with Wire Name', price: 20, priceRange: '', priceNote: '', isBestseller: false, rating: 4.9, reviewCount: 512, category: 'wearables' },
    { name: 'Personalized Ceramic Ring Dish', price: 18, priceRange: '', priceNote: '', isBestseller: false, rating: 4.8, reviewCount: 134, category: 'wearables' },

    // Day-Of Essentials
    { name: 'Personalized Soy Wax Candle Wedding Favors', price: 4, priceRange: '', priceNote: 'each', isBestseller: false, rating: 4.9, reviewCount: 890, category: 'day-of-essentials' },
    { name: 'Personalized Wine Bottle Label Set', price: 2, priceRange: '', priceNote: 'per label', isBestseller: false, rating: 4.8, reviewCount: 345, category: 'day-of-essentials' },
    { name: 'Personalized Wedding Place Cards', price: 0.75, priceRange: '', priceNote: 'each', isBestseller: false, rating: 4.9, reviewCount: 678, category: 'day-of-essentials' },

    // Sentimental Gifts
    { name: 'Custom Luxury Wedding Vow Books', price: 35, priceRange: '$35/pair', priceNote: '', badge: 'Bestseller', isBestseller: true, rating: 4.9, reviewCount: 456, category: 'sentimental-gifts' },
    { name: 'Custom Canvas Wedding Guest Book Alternative', price: 45, priceRange: '', priceNote: '', isBestseller: false, rating: 4.8, reviewCount: 234, category: 'sentimental-gifts' },
    { name: 'Personalized Wedding Song Lyrics Wall Art Print', price: 25, priceRange: '', priceNote: '', badge: 'Bestseller', isBestseller: true, rating: 4.9, reviewCount: 789, category: 'sentimental-gifts' },
]

async function seed() {
    if (!process.env.NEXT_PUBLIC_SANITY_TOKEN) {
        console.error('Error: NEXT_PUBLIC_SANITY_TOKEN is required. Run with NEXT_PUBLIC_SANITY_TOKEN="your_token" npx tsx seed.ts')
        process.exit(1)
    }

    console.log('Seeding Categories...')
    const categoryIds: Record<string, string> = {}
    for (const cat of categories) {
        const doc = await client.create({
            _type: 'category',
            ...cat,
        })
        categoryIds[cat.slug.current] = doc._id
        console.log(`Created category: ${cat.title}`)
    }

    console.log('Seeding Products...')
    for (const prod of products) {
        const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        await client.create({
            _type: 'product',
            name: prod.name,
            slug: { current: slug },
            price: prod.price,
            priceRange: prod.priceRange,
            priceNote: prod.priceNote,
            badge: prod.badge,
            isBestseller: prod.isBestseller,
            rating: prod.rating,
            reviewCount: prod.reviewCount,
            category: {
                _type: 'reference',
                _ref: categoryIds[prod.category]
            },
            tags: [],
            features: [
                '100% Custom designed for you',
                'Premium, heirloom-quality materials',
                'Hand-crafted in our studio',
                'Digital proof sent within 24-48 hours'
            ]
        })
        console.log(`Created product: ${prod.name}`)
    }

    console.log('Seeding complete! ✨')
}

seed().catch(err => {
    console.error(err)
    process.exit(1)
})
