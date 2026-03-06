import { defineType, defineField } from 'sanity'

export const review = defineType({
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
        defineField({
            name: 'product',
            title: 'Product',
            type: 'reference',
            to: [{ type: 'product' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'customerName',
            title: 'Customer Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'weddingDate',
            title: 'Wedding Date',
            type: 'date',
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: 'reviewText',
            title: 'Review Text',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isVerified',
            title: 'Verified Buyer',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured on Homepage',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
