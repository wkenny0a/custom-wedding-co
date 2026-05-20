import { defineType, defineField } from 'sanity'
import { FolderKanban } from 'lucide-react'

export const productTabsBlock = defineType({
    name: 'productTabsBlock',
    title: 'Product Tabs (Details/Shipping)',
    type: 'object',
    icon: FolderKanban as any,
    fields: [
        defineField({
            name: 'internalTitle',
            title: 'Internal Title',
            type: 'string',
            description: 'Used to identify this block in the CMS',
            initialValue: 'Default Product Tabs',
        }),
    ],
    preview: {
        select: {
            title: 'internalTitle',
        },
        prepare({ title }) {
            return {
                title: title || 'Product Tabs',
                subtitle: 'Standard Details, Shipping, and Promise tabs',
            }
        },
    },
})
