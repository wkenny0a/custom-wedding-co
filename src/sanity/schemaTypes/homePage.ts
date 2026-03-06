import { defineType, defineField } from 'sanity'

export const homePage = defineType({
    name: 'homePage',
    title: 'Home Page Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'featuredProducts',
            title: 'Bestseller Products',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            validation: (Rule) => Rule.max(8),
        }),
        defineField({
            name: 'featuredCategories',
            title: 'Featured Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: (Rule) => Rule.max(4),
        }),
        defineField({
            name: 'spotlightProducts',
            title: 'Spotlight Products (Side by Side)',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            validation: (Rule) => Rule.max(2),
        }),
        defineField({
            name: 'featuredTestimonials',
            title: 'Featured Testimonials',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'review' }] }],
            validation: (Rule) => Rule.max(3),
        }),
    ],
})
