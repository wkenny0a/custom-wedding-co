import { type SchemaTypeDefinition } from 'sanity'

import { category } from './category'
import { product } from './product'
import { review } from './review'
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'

import { productHeroBlock } from './blocks/productHeroBlock'
import { productTabsBlock } from './blocks/productTabsBlock'
import { relatedProductsBlock } from './blocks/relatedProductsBlock'
import { faqBlock } from './blocks/faqBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        category, product, review, siteSettings, homePage,
        productHeroBlock, productTabsBlock, relatedProductsBlock, faqBlock
    ],
}
