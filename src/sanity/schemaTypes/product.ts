import { defineType, defineField } from 'sanity'

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'subcategory',
            title: 'Subcategory',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'priceRange',
            title: 'Price Range / Note',
            type: 'string',
            description: 'e.g. "$285 for set of 100"',
        }),
        defineField({
            name: 'priceNote',
            title: 'Price Note',
            type: 'string',
            description: 'e.g. "per invitation"',
        }),
        defineField({
            name: 'badge',
            title: 'Badge',
            type: 'string',
            description: 'e.g. "Bestseller" | "Trending" | "New"',
        }),
        defineField({
            name: 'isBestseller',
            title: 'Is Bestseller',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Is Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(5),
        }),
        defineField({
            name: 'reviewCount',
            title: 'Review Count',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'customOptions',
            title: 'Custom Options',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'type', type: 'string', title: 'Type', options: { list: ['text', 'textarea', 'date', 'select'] } },
                        { name: 'placeholder', type: 'string', title: 'Placeholder' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'specifications',
            title: 'Specifications',
            description: 'Add key-value pairs for the Specifications tab (e.g., Material: Cotton Paper).',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'key', type: 'string', title: 'Specification Name (e.g. Dimensions)' },
                        { name: 'value', type: 'string', title: 'Specification Value (e.g. 8" x 10")' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        }
                    ]
                }
            ],
        }),
        defineField({
            name: 'relatedProducts',
            title: 'Related Products',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
        }),
        defineField({
            name: 'pageBuilder',
            title: 'Custom Page Layout',
            description: 'Optional: Drag and drop layout blocks to build a completely unique page for this product. If left empty, the default template is used.',
            type: 'array',
            of: [
                { type: 'productHeroBlock' },
                { type: 'productTabsBlock' },
                { type: 'relatedProductsBlock' },
                { type: 'faqBlock' }
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO Title & Description',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description' }
            ]
        }),
    ],
})
