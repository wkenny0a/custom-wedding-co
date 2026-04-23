require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// Image Paths (to be updated once generation succeeds)
const IMAGES = {
  'Classic Cream': 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\0e82f879-b9ba-435d-ad88-106db765df51\\roses_classic_cream_1776929447346.png',
  'Blush Silk': 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\0e82f879-b9ba-435d-ad88-106db765df51\\roses_blush_silk_1776929621205.png',
  'Velvet Espresso': 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\0e82f879-b9ba-435d-ad88-106db765df51\\roses_velvet_espresso_1776929730477.png'
};

const CATEGORIES = [
  { name: 'Heirloom & Artisan', slug: 'heirloom-artisan' },
  { name: 'Bespoke Wedding Gifts', slug: 'bespoke-wedding-gifts' }
];

const PRODUCT = {
  name: 'Everlasting Heirloom Rose Set (25 Handcrafted Blooms)',
  slug: 'everlasting-heirloom-rose-set',
  active: true,
  price: 34.00,
  type: 'standard',
  description: '<p>Immaculately crafted from soft, museum-quality PE foam, our Everlasting Heirloom Roses offer the delicate visual weight of fresh florals without the wilting. Each set of 25 comes with flexible botanical wire stems, allowing you to effortlessly design breathtaking centerpieces, structured bridal bouquets, or intricate cake decorations. Designed for the modern couple who values preserving the memories of their day forever.</p>',
  meta_title: 'Everlasting Fake Roses & Faux Wedding Florals | Custom Wedding Co.',
  meta_description: 'Shop our premium Everlasting Heirloom Rose set. High-quality foam artificial flowers with flexible stems for DIY wedding centerpieces, bouquets, and arch decor.',
  options: [
    {
      name: 'Color Variant',
      variant: true,
      active: true,
      values: [
        { name: 'Classic Cream', price: 0 },
        { name: 'Blush Silk', price: 0 },
        { name: 'Velvet Espresso', price: 0 },
      ],
    }
  ],
};

(async () => {
  try {
    console.log('──────────────────────────────────────────────');
    console.log('  Heirloom Roses  ·  Swell Publisher  ');
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

    console.log('\n[2/4] Creating master product listing...');
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

    console.log('\n[3/4] Uploading variant images...');
    const imagesToUpload = [];
    
    for (const [colorName, imagePath] of Object.entries(IMAGES)) {
      if (!fs.existsSync(imagePath)) {
        console.error(`  ✗ Image not found for ${colorName} at ${imagePath}`);
        continue;
      }
      
      console.log(`  ↑ Preparing ${colorName} for batch upload...`);
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      
      // Some generators create WEBP headers despite PNG extension. 
      // It is safer to omit the prefix entirely or use generic content type.
      // But Swell requires data URL:
      const imageDataUri = `data:image/png;base64,${base64Image}`;
      const slugifiedFileName = colorName.toLowerCase().replace(/\s+/g, '-');
      
      imagesToUpload.push({
        file: {
          data: imageDataUri,
          filename: `heirloom-rose-${slugifiedFileName}.png`,
          content_type: 'image/png',
        },
        caption: colorName 
      });
    }

    if (imagesToUpload.length > 0) {
      console.log(`  ↑ Executing single batch PUT to Swell logic...`);
      product = await swell.put(`/products/${product.id}`, {
        images: imagesToUpload
      });
      console.log(`  ✓ Batch image upload successful! Total images: ${product.images.length}`);
    }

    console.log('\n[4/4] Process Complete!');
    console.log(`  ID:     ${product.id}`);
    console.log(`  Slug:   ${product.slug}`);

  } catch (err) {
    console.error('\n✗ FATAL ERROR:', err.message || err);
    if (err.response) {
      console.error('  Response:', JSON.stringify(err.response, null, 2));
    }
  }
})();
