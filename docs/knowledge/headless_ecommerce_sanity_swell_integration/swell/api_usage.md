# Swell Backend API Usage with NodeJS

## Package Installation
```bash
npm install swell-node dotenv
```

## Initialization (v6.x)
Initialization of the `swell-node` package requires specific syntax for the `swell` client:

```javascript
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);
```

## Bulk Operations Patterns

### Uploading Categories
When uploading categories, verify their existence first to avoid duplicates:

```javascript
const existing = await swell.get('/categories', {
    where: { slug: cat.slug }
});

if (!existing.results.length) {
    await swell.post('/categories', {
        name: cat.title,
        slug: cat.slug,
        description: cat.description,
        active: true
    });
}
```

### Uploading Products with Options
Swell supports complex options and variants. When creating products via API, you can define options directly in the product data:

```javascript
### Uploading Products with Options (CSV Ingestion Pattern)
When ingesting from CSV or other structured lists, you can map the data into a nested `options` array:

```javascript
const productData = {
    name: csvData.name,
    price: parseFloat(csvData.price),
    description: csvData.description,
    slug: csvData.slug,
    options: [
        {
            name: "Option 1 (e.g., Material & Size)",
            values: csvData.option_1_values.split(',').map(v => ({ name: v.trim() }))
        },
        {
            name: "Option 2 (e.g., Style)",
            values: csvData.option_2_values.split(',').map(v => ({ name: v.trim() }))
        }
    ]
};
```

## Frontend Integration (swell-js)

For client-side operations (like browsing products or adding to cart), use the `swell-js` library which relies on the **Public Key**.

### Initialization
```javascript
import swell from 'swell-js';

const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
const publicKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;

swell.init(storeId, publicKey);
export default swell;
```

### Usage & Mapping
When fetching products in a Next.js Server Component, map the Swell product schema into the format expected by your UI components (e.g., mapping `id` to `_id` and extracting image URLs).

```javascript
import { getProducts } from '@/lib/swell';

export default async function ShopPage() {
    const response = await getProducts();
    const swellProducts = response?.results || [];

    const formattedProducts = swellProducts.map((p) => ({
        _id: p.id,
        name: p.name,
        slug: { current: p.slug },
        price: p.price,
        rating: 5.0, // Swell doesn't handle reviews natively, often needs external mapping or hardcoding
        reviewCount: 0,
        images: p.images || []
    }));

    return <ShopCatalog products={formattedProducts} />;
}
```

### Displaying Swell Images
Swell images are stored in an array of objects. To display them, access the nested file URL:

```javascript
const imageUrl = product.images?.[0]?.file?.url || product.images?.[0]?.url || null;
```

### Next.js Image Domains (next.config.ts)

When using Swell images with the Next.js `Image` component, you must allow Swell's CDN domains in your configuration:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.schema.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.swell.store',
      }
    ],
  },
};
```

### Category-Specific Filtering

When implementing category-specific storefront pages (e.g., `shop/[category]/page.tsx`), use the `category` filter in the `getProducts` function:

```javascript
// Fetch products specifically for this category slug
const response = await getProducts({ category: categorySlug });
const swellProducts = response?.results || [];
```

The `swell.cart.get()` and `swell.cart.addItem()` methods return a cart object. In the Javascript SDK, the property for the hosted checkout URL is `checkout_url` (lowercase with underscore). 

> **DANGER:** Developers often guess `checkoutUrl` (camelCase) which will resolve to `undefined` and cause silent failures in button redirects. Always use the underscored version:

```javascript
const cart = await swell.cart.get();
// Use checkout_url, NOT checkoutUrl
window.location.href = cart.checkout_url;
```

## Creating Custom Text Options

Swell's Hosted Checkout only displays product options that are explicitly whitelisted in the product schema in the Swell backend. For custom text inputs (like names or notes), you must add a `short_text` or `long_text` option to the product.

```javascript
// Adding various customization field types
await swell.put(`/products/${productId}`, {
    options: [
        {
            name: 'Custom Couple Names',
            input_type: 'short_text',
            required: true
        },
        {
            name: 'Date',
            input_type: 'short_text',
            required: true
        },
        {
            name: 'Extra Requests',
            input_type: 'long_text', // This renders as a multi-line text area in checkout
            required: false
        }
    ]
});
```

### Conditional UI Rendering of Options
To prevent custom fields (like a "Wedding Date" input) from appearing on all products globally, the frontend React component should explicitly check if the current Swell product schema supports that option before rendering the input field.

```tsx
// Inside ProductInfo.tsx
const hasWeddingDate = product.options?.some(opt => opt.name === 'Wedding Date');
const hasDate = product.options?.some(opt => opt.name === 'Date');
const hasExtraRequests = product.options?.some(opt => opt.name === 'Extra Requests');

return (
  <>
    {/* Only render if the specific product was configured with this option in Swell */}
    {hasDate && (
       <input 
         type="text" 
         placeholder="Enter event date" 
         onChange={(e) => setDate(e.target.value)} 
       />
    )}

    {hasExtraRequests && (
       <textarea 
         placeholder="Enter additional requests" 
         onChange={(e) => setExtraRequests(e.target.value)} 
       />
    )}
  </>
)
```

### Frontend Add To Cart with Custom Options (swell-js)

When adding a product with custom text to the cart, build an `options` array where each object has a `name` matching the Swell backend and a `value` containing the current React state.

```javascript
const handleAddToCart = async () => {
    const options = [];

    // Push only if the fields exist on current product schema
    if (hasCustomCoupleNames && customCoupleNames) {
        options.push({ name: 'Custom Couple Names', value: customCoupleNames });
    }
    if (hasDate && date) {
        options.push({ name: 'Date', value: date });
    }
    if (hasExtraRequests && extraRequests) {
        options.push({ name: 'Extra Requests', value: extraRequests });
    }

    // Call swell.js addItem
    await swell.cart.addItem({
        product_id: productId,
        quantity: quantity,
        options: options
    });
};
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
            _type: 'product',
            name: swellProd.name,
            slug: { _type: 'slug', current: swellProd.slug },
            price: swellProd.price || 0
        });
        console.log(`Synced: ${swellProd.name}`);
    }
}
```
