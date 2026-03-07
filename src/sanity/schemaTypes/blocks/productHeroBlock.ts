import { defineType, defineField } from 'sanity'
import { LayoutTemplate } from 'lucide-react'

export const productHeroBlock = defineType({
    name: 'productHeroBlock',
    title: 'Product Hero (Gallery & Info)',
    type: 'object',
    icon: LayoutTemplate as any,
    fields: [
        defineField({
            name: 'internalTitle',
            title: 'Internal Title',
            type: 'string',
            description: 'Used to identify this block in the CMS',
            initialValue: 'Default Hero / Add to Cart',
        }),
    ],
    preview: {
        select: {
            title: 'internalTitle',
        },
        prepare({ title }) {
            return {
                title: title || 'Product Hero',
                subtitle: 'Standard Gallery & Add to Cart form',
            }
        },
    },
})
