/**
 * fix_roses.js — Fix Everlasting Heirloom Rose Set images
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

const SRC = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\0e82f879-b9ba-435d-ad88-106db765df51';

const images = [
  { file: 'roses_classic_cream_1776929447346.png',   name: 'roses-classic-cream.jpg' },
  { file: 'roses_blush_silk_1776929621205.png',      name: 'roses-blush-silk.jpg' },
  { file: 'roses_velvet_espresso_1776929730477.png', name: 'roses-velvet-espresso.jpg' },
];

(async () => {
  const res = await swell.get('/products', { where: { slug: 'everlasting-heirloom-rose-set' } });
  if (!res.results?.length) { console.log('Product not found!'); return; }

  const pid = res.results[0].id;
  console.log('Product ID:', pid);

  // Clear all existing images
  await swell.put(`/products/${pid}`, { images: null });
  console.log('Cleared existing images\n');

  // Compress and prepare all 3 images
  const imagePayload = [];
  for (const img of images) {
    const imgPath = path.join(SRC, img.file);
    if (!fs.existsSync(imgPath)) {
      console.log(`  ✗ Not found: ${img.file}`);
      continue;
    }

    const originalSize = fs.statSync(imgPath).size;
    const compressed = await sharp(imgPath)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true })
      .toBuffer();

    console.log(`  ${img.name}: ${Math.round(originalSize / 1024)}KB → ${Math.round(compressed.length / 1024)}KB`);

    imagePayload.push({
      file: {
        data: { $binary: compressed.toString('base64') },
        filename: img.name,
        content_type: 'image/jpeg',
      },
    });
  }

  // Upload all 3 images at once
  const result = await swell.put(`/products/${pid}`, { images: imagePayload });

  console.log(`\nUploaded ${result.images?.length || 0} images:`);
  result.images?.forEach((img, i) => {
    const url = img.file?.url || 'NO URL';
    console.log(`  [${i + 1}] ${url.startsWith('https://cdn') ? '✓ CDN' : '⚠'}: ${url.substring(0, 100)}`);
  });

  console.log('\n✅ DONE');
})();
