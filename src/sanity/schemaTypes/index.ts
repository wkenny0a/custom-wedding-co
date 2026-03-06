import { type SchemaTypeDefinition } from 'sanity'

import { category } from './category'
import { product } from './product'
import { review } from './review'
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [category, product, review, siteSettings, homePage],
}
