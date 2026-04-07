# Sanity.io E-commerce patterns

## Seeding Patterns (seed.ts)
To seed product and category data from a script, use the Sanity client with a write token.

```typescript
import { createClient } from 'next-sanity'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-01-01',
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

async function seed() {
    // 1. Create Categories
    const categoryDoc = await client.create({
        _type: 'category',
        title: 'New Category',
        slug: { current: 'new-category' }
    })

    // 2. Create Products with Reference to Category
    await client.create({
        _type: 'product',
        name: 'New Product',
        slug: { current: 'new-product' },
        category: {
            _type: 'reference',
            _ref: categoryDoc._id
        }
    })
}
```

## GROQ Query Library (queries.ts)

### Fetching HomePage Content
```javascript
export const homePageQuery = groq`*[_type == "homePage"][0] {
  featuredProducts[]->,
  featuredCategories[]->,
  spotlightProducts[]->
}`
```

### Fetching Products by Category Slug
```javascript
export const productsByCategoryQuery = groq`*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(_createdAt desc)`
```

### Fetching Single Product with Deep Relations
```javascript
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  ...,
  category->,
  relatedProducts[]->,
  "reviews": *[_type == "review" && references(^._id)] | order(_createdAt desc)
}`
```

## Page Builder Pattern

For sites requiring unique layouts per product, use a `pageBuilder` array on the product schema. 

### Schema Definition (product.ts)
```typescript
defineField({
    name: 'pageBuilder',
    title: 'Custom Page Layout',
    type: 'array',
    of: [
        { type: 'productHeroBlock' }, // Standard Add-to-Cart
        { type: 'productTabsBlock' }, // Standard Descriptions
        { type: 'faqBlock' },         // Custom Sections
        { type: 'relatedProductsBlock' }
    ]
})
```

### Rendering Logic ([slug]/page.tsx)
The dynamic route fetches both Swell (ecommerce) and Sanity (layout) data. If `pageBuilder` is populated, it maps over the blocks; otherwise, it falls back to a default layout.

```tsx
const pageBuilder = sanityProduct?.pageBuilder || []

const renderBlock = (block: any, index: number) => {
    switch (block._type) {
        case 'productHeroBlock':
            return (
                <div key={index} className="max-w-[1280px] mx-auto px-6 py-16">
                    <ProductHero product={swellProduct} />
                </div>
            )
        case 'productTabsBlock':
            return (
                <div key={index} className="max-w-[1280px] mx-auto px-6 pb-16">
                    <ProductTabs product={swellProduct} sanityProduct={sanityProduct} />
                </div>
            )
        case 'faqBlock':
            return <ProductFAQ key={index} block={block} />
        case 'relatedProductsBlock':
            return (
                <div key={index} className="max-w-[1280px] mx-auto px-6 pb-16">
                    <RelatedProducts />
                </div>
            )
        default:
            return null
    }
}

return (
    <div className="bg-white min-h-screen">
        {pageBuilder.length > 0 ? (
            <div className="flex flex-col">
                {pageBuilder.map((block, idx) => renderBlock(block, idx))}
            </div>
        ) : (
            <DefaultProductLayout product={swellProduct} />
        )}
    </div>
)
```

```tsx
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ProductFAQ({ block }: { block: any }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

    const questions = block.questions || []
    if (questions.length === 0) return null

    return (
        <section className="py-20 bg-cream-dark max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-display text-espresso mb-12 text-center">
                {block.heading || 'Frequently Asked Questions'}
            </h2>
            <div className="flex flex-col gap-4">
                {questions.map((q, i) => (
                    <div key={i} className="border border-gold/30">
                        <button onClick={() => toggle(i)} className="w-full flex justify-between p-6">
                            <span>{q.question}</span>
                            {openIndex === i ? <ChevronUp /> : <ChevronDown />}
                        </button>
                        {openIndex === i && <div className="px-6 pb-6">{q.answer}</div>}
                    </div>
                ))}
            </div>
        </section>
    )
}
```

```tsx
export function ProductTabs({ product, sanityProduct }: { product: any, sanityProduct?: any }) {
    const [activeTab, setActiveTab] = useState('description')
    const specifications = sanityProduct?.specifications || []

    return (
        // ... tab navigation ...
        {activeTab === 'specifications' && (
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left font-sans text-sm text-espresso border-collapse">
                    <tbody>
                        {specifications.length > 0 ? (
                            specifications.map((spec: any, idx: number) => (
                                <tr key={idx} className="border-b border-gray-100">
                                    <th className="py-4 font-semibold w-1/3">{spec.key}</th>
                                    <td className="py-4 text-gray-600">{spec.value}</td>
                                </tr>
                            ))
                        ) : (
                            /* Fallback to hardcoded or empty state */
                            <tr className="border-b border-gray-100">
                                <th className="py-4 font-semibold w-1/3">Material</th>
                                <td className="py-4 text-gray-600">Premium Materials</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
    )
}
```

## Swell to Sanity Sync Pattern

In dual-headless setups, products should be synced to Sanity as stub documents to allow CMS users to attach page layouts to them.

```javascript
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const { createClient } = require('@sanity/client');

// Initialize Swell & Sanity Clients
swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN, // Requires Write Access
    useCdn: false,
});

async function syncProducts() {
    // 1. Fetch active products from Swell
    const swellProducts = await swell.get('/products', { active: true });
    
    // 2. Loop and create stubs in Sanity
    for (const swellProd of swellProducts.results) {
        await sanityClient.createIfNotExists({
            _id: `product-${swellProd.id}`, // Consistent ID mapping
            _type: 'product',
            name: swellProd.name,
            slug: { _type: 'slug', current: swellProd.slug },
            price: swellProd.price || 0
        });
        console.log(`Synced: ${swellProd.name}`);
    }
}
```
