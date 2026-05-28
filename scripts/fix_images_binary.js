/**
 * fix_images_binary.js
 * ─────────────────────
 * Uploads images using the swell-node SDK with proper $binary encoding
 * and compressed JPEG files under the size limit.
 *
 * Usage: node scripts/fix_images_binary.js
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
    .jpeg({ quality: 78, progressive: true })
    .toBuffer();
}

(async () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   Image Fix — $binary Upload via SDK (15 Products)     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // First test: check what CDN URL format the existing working products use
  const testProduct = await swell.get('/products', { where: { slug: 'everlasting-heirloom-rose-set' } });
  if (testProduct.results?.length) {
    const p = testProduct.results[0];
    console.log('REFERENCE — Working product image structure:');
    if (p.images?.[0]) {
      console.log('  Top-level keys:', Object.keys(p.images[0]).join(', '));
      if (p.images[0].file) {
        console.log('  file keys:', Object.keys(p.images[0].file).join(', '));
        console.log('  file.url:', p.images[0].file.url?.substring(0, 100));
        console.log('  file.width:', p.images[0].file.width);
        console.log('  file.height:', p.images[0].file.height);
      }
    }
  }
  console.log('');

  let fixed = 0;
  let failed = 0;

  for (let i = 0; i < PRODUCT_IMAGES.length; i++) {
    const { slug, file } = PRODUCT_IMAGES[i];
    const imgPath = path.join(BRAIN, file);

    try {
      console.log(`[${i + 1}/${PRODUCT_IMAGES.length}] ${slug}`);

      const res = await swell.get('/products', { where: { slug } });
      if (!res.results?.length) {
        console.log('  ✗ Not found');
        failed++;
        continue;
      }

      const productId = res.results[0].id;

      if (!fs.existsSync(imgPath)) {
        console.log('  ✗ Source missing');
        failed++;
        continue;
      }

      const compressed = await compressImage(imgPath);
      console.log(`  Compressed: ${(fs.statSync(imgPath).size / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB`);

      // CLEAR existing images
      await swell.put(`/products/${productId}`, { images: null });

      // Upload using $binary (Swell's native binary encoding)
      const filename = `${slug}-hero.jpg`;
      const result = await swell.put(`/products/${productId}`, {
        images: [{
          file: {
            data: {
              $binary: compressed.toString('base64'),
            },
            filename: filename,
            content_type: 'image/jpeg',
          },
        }],
      });

      // Check result
      const img = result?.images?.[0];
      if (img) {
        const url = img.file?.url || img.url || 'NO URL';
        const isCdn = url.startsWith('https://cdn');
        console.log(`  ${isCdn ? '✓ CDN' : '⚠ NOT CDN'}: ${url.substring(0, 100)}`);
      } else {
        console.log('  ⚠ No image in response, checking...');
        const verify = await swell.get(`/products/${productId}`);
        const vImg = verify.images?.[0];
        if (vImg) {
          const vUrl = vImg.file?.url || vImg.url || 'NO URL';
          console.log(`  → Verify: ${vUrl.substring(0, 100)}`);
        } else {
          console.log('  → No images on product!');
        }
      }

      fixed++;

    } catch (err) {
      console.log(`  ✗ Error: ${err.message || err}`);
      failed++;
    }
  }

  console.log(`\n${'═'.repeat(58)}`);
  console.log(`  Result: ${fixed} processed, ${failed} failed`);
  console.log(`${'═'.repeat(58)}\n`);
})();
