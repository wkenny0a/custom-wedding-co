require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// Generated image path
const IMAGE_PATH = path.resolve('C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\0e82f879-b9ba-435d-ad88-106db765df51\\luxury_just_married_sunglasses_1776928859837.png');

const CATEGORIES = [
  { name: 'Wedding Day Accessories', slug: 'wedding-day-accessories' },
  { name: 'Honeymoon Essentials', slug: 'honeymoon-essentials' }
];

const PRODUCT = {
  name: 'Luxe "Just Married" Honeymoon Sunglasses',
  slug: 'luxe-just-married-honeymoon-sunglasses',
  active: true,
  price: 24.00,
  type: 'standard',
  description: '<p>Elevate your wedding day and honeymoon aesthetic with our exclusive "Just Married" eyewear. Abandoning cheap novelty plastic, these frames are crafted using durable, high-polish materials and fitted with UV400 lenses. Perfect for candid elopement photography, lively reception entrances, and stylish poolside lounging on your honeymoon.</p>',
  meta_title: 'Luxe "Just Married" Wedding & Honeymoon Sunglasses | Custom Wedding Co.',
  meta_description: 'Shop elegant, premium "Just Married" sunglasses for your wedding reception and honeymoon. Hand-finished frames with custom engraving options from Custom Wedding Co.',
  options: [
    {
      name: 'Frame Color',
      variant: true,
      active: true,
      values: [
        { name: 'Classic Bridal White', price: 0 },
        { name: 'Espresso Black', price: 0 },
        { name: 'Classic Tortoiseshell', price: 0 },
      ],
    },
    {
      name: 'Add Inside Arm Personalization?',
      variant: true,
      active: true,
      description: 'We can engrave both interior arms with your initials, new surname, or wedding date.',
      values: [
        { name: 'No Personalization', price: 0 },
        { name: 'Yes (+ $10.00)', price: 10 },
      ],
    },
    {
       name: 'Personalization Details (if applicable)',
       input_type: 'short_text',
       required: false,
       description: 'Enter your initials or date if you selected Yes above.'
    }
  ],
};

(async () => {
  try {
    console.log('──────────────────────────────────────────────');
    console.log('  Luxe Sunglasses  ·  Swell Publisher  ');
    console.log('──────────────────────────────────────────────\n');

    console.log('[1/4] Ensuring categories exist...');
    const categoryIds = [];
    for (const cat of CATEGORIES) {
      const existing = await swell.get('/categories', { where: { slug: cat.slug } });
      if (existing.results && existing.results.length > 0) {
        console.log(`  ✓ Category exists: "${cat.name}"`);
        categoryIds.push(existing.results[0].id);
      } else {
        const created = await swell.post('/categories', { name: cat.name, slug: cat.slug, active: true });
        console.log(`  + Created category: "${cat.name}"`);
        categoryIds.push(created.id);
      }
    }

    console.log('\n[2/4] Creating product listing...');
    const existingProduct = await swell.get('/products', { where: { slug: PRODUCT.slug } });
    let product;
    if (existingProduct.results && existingProduct.results.length > 0) {
      console.log('  ⚠  Product already exists – updating in place.');
      product = await swell.put(`/products/${existingProduct.results[0].id}`, {
        ...PRODUCT,
        category_index: { id: categoryIds },
      });
    } else {
      product = await swell.post('/products', {
        ...PRODUCT,
        category_index: { id: categoryIds },
      });
    }

    console.log('\n[3/4] Uploading product hero image...');
    if (!fs.existsSync(IMAGE_PATH)) {
       throw new Error(`Image not found at ${IMAGE_PATH}`);
    }
    const imageBuffer = fs.readFileSync(IMAGE_PATH);
    const base64Image = imageBuffer.toString('base64');
    const imageDataUri = `data:image/png;base64,${base64Image}`;

    const updatedProduct = await swell.put(`/products/${product.id}`, {
      images: [
        {
          file: {
            data: imageDataUri,
            filename: 'luxe-sunglasses-hero.png',
            content_type: 'image/png',
          },
        },
      ],
    });

    const uploadedImageUrl = updatedProduct.images?.[0]?.file?.url 
                          || updatedProduct.images?.[0]?.url 
                          || '(URL pending CDN propagation)';
    console.log(`  ✓ Image uploaded: ${uploadedImageUrl}`);

    console.log('\n[4/4] Process Complete!');
    console.log(`  ID:     ${product.id}`);
    console.log(`  Slug:   ${product.slug}`);
    console.log(`  Status: ${product.active ? 'ACTIVE' : 'DRAFT'}`);

  } catch (err) {
    console.error('\n✗ FATAL ERROR:', err.message || err);
    if (err.response) {
      console.error('  Response:', JSON.stringify(err.response, null, 2));
    }
  }
})();
