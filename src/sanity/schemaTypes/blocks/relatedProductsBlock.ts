import { defineType, defineField } from 'sanity'
import { Rows } from 'lucide-react'

export const relatedProductsBlock = defineType({
    name: 'relatedProductsBlock',
    title: 'Related Products Grid',
    type: 'object',
    icon: Rows as any,
    fields: [
        defineField({
            name: 'internalTitle',
            title: 'Internal Title',
            type: 'string',
            description: 'Used to identify this block in the CMS',
            initialValue: 'Default Related Products',
        }),
    ],
    preview: {
        select: {
            title: 'internalTitle',
        },
        prepare({ title }) {
            return {
                title: title || 'Related Products',
                subtitle: 'Standard 4-item product grid',
            }
        },
    },
})
