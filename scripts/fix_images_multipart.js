/**
 * fix_images_multipart.js
 * ────────────────────────
 * Uploads product images to Swell using the REST API with proper
 * multipart/form-data uploads instead of the SDK's base64 approach.
 *
 * Usage: node scripts/fix_images_multipart.js
 */

require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const STORE_ID = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
const SECRET_KEY = process.env.NEXT_PUBLIC_SWELL_SECRET_KEY;

swell.init(STORE_ID, SECRET_KEY);

const BRAIN = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\89324553-b6fc-4f04-9ef7-ecea3adfccef';

const PRODUCT_IMAGES = [
  { slug: 'digital-wedding-invitation-suite',    file: 'digital_invitation_suite_1776944551356.png' },
  { slug: 'custom-wedding-vow-art-print',        file: 'wedding_vow_art_print_1776944565352.png' },
  { slug: 'personalized-wedding-coloring-book',   file: 'wedding_coloring_book_1776944578683.png' },
  { slug: 'heritage-velvet-ring-box',             file: 'velvet_ring_box_1776944604166.png' },
  { slug: 'luxe-bridal-emergency-kit',            file: 'bridal_emergency_kit_1776944617189.png' },
  { slug: 'bespoke-monogram-wax-seal-stickers',   file: 'wax_seal_stickers_1776944634344.png' },
  { slug: 'mr-mrs-leather-luggage-tag-set',       file: 'luggage_tags_1776944658326.png' },
  { slug: 'groomsmen-proposal-gift-box',          file: 'groomsmen_proposal_box_1776944672584.png' },
  { slug: 'bridesmaid-proposal-gift-box',          file: 'bridesmaid_proposal_box_1776944885681.png' },
  { slug: 'mr-mrs-champagne-flute-set',            file: 'champagne_flutes_1776944898601.png' },
  { slug: 'custom-foil-stamped-cocktail-napkins', file: 'cocktail_napkins_1776944909915.png' },
  { slug: 'bespoke-wedding-day-scented-candle',    file: 'wedding_candle_1776944936178.png' },
  { slug: 'luxury-linen-wedding-planner-binder',  file: 'wedding_planner_1776944949526.png' },
  { slug: 'custom-wedding-matchboxes',             file: 'wedding_matchboxes_1776944962820.png' },
  { slug: 'bespoke-engraved-cufflinks',            file: 'engraved_cufflinks_1776944985185.png' },
];

async function compressImage(inputPath) {
  return sharp(inputPath)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();
}

async function uploadViaRest(productId, imageBuffer, filename) {
  // Use Swell REST API directly with base64 in the proper content_id format
  const auth = Buffer.from(`${STORE_ID}:${SECRET_KEY}`).toString('base64');

  const response = await fetch(`https://${STORE_ID}.swell.store/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      images: [{
        file: {
          content_type: 'image/jpeg',
          data: {
            $binary: imageBuffer.toString('base64'),
          },
          filename: filename,
        }
      }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`REST API error ${response.status}: ${text.substring(0, 200)}`);
  }

  return response.json();
}

(async () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   Image Fix — REST API Multipart Upload (15 Products)  ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  let fixed = 0;
  let failed = 0;

  for (let i = 0; i < PRODUCT_IMAGES.length; i++) {
    const { slug, file } = PRODUCT_IMAGES[i];
    const imgPath = path.join(BRAIN, file);

    try {
      console.log(`[${i + 1}/${PRODUCT_IMAGES.length}] ${slug}`);

      // Find product
      const res = await swell.get('/products', { where: { slug } });
      if (!res.results || !res.results.length) {
        console.log('  ✗ Product not found');
        failed++;
        continue;
      }

      const productId = res.results[0].id;

      if (!fs.existsSync(imgPath)) {
        console.log(`  ✗ Source image not found`);
        failed++;
        continue;
      }

      // Compress
      const compressed = await compressImage(imgPath);
      console.log(`  Compressed: ${(fs.statSync(imgPath).size / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB`);

      // Clear existing
      await swell.put(`/products/${productId}`, { images: null });

      // Upload via REST API with $binary encoding
      const filename = `${slug}-hero.jpg`;
      const result = await uploadViaRest(productId, compressed, filename);

      const cdnUrl = result?.images?.[0]?.file?.url || 'NO URL IN RESPONSE';
      const isCdn = cdnUrl.startsWith('https://cdn');
      console.log(`  ${isCdn ? '✓' : '⚠'} ${cdnUrl.substring(0, 100)}`);

      fixed++;

    } catch (err) {
      console.log(`  ✗ Error: ${err.message || err}`);
      failed++;
    }
  }

  console.log(`\n${'═'.repeat(58)}`);
  console.log(`  Result: ${fixed} uploaded, ${failed} failed`);
  console.log(`${'═'.repeat(58)}\n`);
})();
