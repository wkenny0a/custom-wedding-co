/**
 * fix_two_images.js
 * Fix images for Personal Product Specialist and Photo Keepsake
 */

require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const BRAIN = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\89324553-b6fc-4f04-9ef7-ecea3adfccef';

const items = [
  {
    slug: 'personal-product-specialist',
    file: 'concierge_service_1776957689994.png',
  },
  {
    slug: 'bespoke-interlocking-photo-keepsake',
    file: 'photo_keepsake_product_1776592566470.png',
  },
];

(async () => {
  for (const item of items) {
    console.log(`\nProcessing: ${item.slug}`);

    const res = await swell.get('/products', { where: { slug: item.slug } });
    if (!res.results?.length) {
      console.log('  ✗ Product not found');
      continue;
    }

    const pid = res.results[0].id;
    const imgPath = path.join(BRAIN, item.file);

    if (!fs.existsSync(imgPath)) {
      console.log(`  ✗ Image file not found: ${item.file}`);
      continue;
    }

    // Compress
    const originalSize = fs.statSync(imgPath).size;
    const compressed = await sharp(imgPath)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true })
      .toBuffer();

    console.log(`  Compressed: ${Math.round(originalSize / 1024)}KB → ${Math.round(compressed.length / 1024)}KB`);

    // Clear existing images
    await swell.put(`/products/${pid}`, { images: null });

    // Upload with $binary encoding
    const filename = `${item.slug}-hero.jpg`;
    const result = await swell.put(`/products/${pid}`, {
      images: [{
        file: {
          data: { $binary: compressed.toString('base64') },
          filename,
          content_type: 'image/jpeg',
        },
      }],
    });

    const url = result?.images?.[0]?.file?.url || 'NO URL';
    const isCdn = url.startsWith('https://cdn');
    console.log(`  ${isCdn ? '✓ CDN' : '⚠'}: ${url.substring(0, 110)}`);
  }

  console.log('\n✅ DONE');
})();
