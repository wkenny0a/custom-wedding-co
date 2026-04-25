/**
 * fix_images_compressed.js
 * ─────────────────────────
 * Compresses all product images to JPEG under 500KB using sharp,
 * then re-uploads to Swell via the file.data base64 API.
 *
 * Usage: node scripts/fix_images_compressed.js
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
const MAX_SIZE_BYTES = 480000; // ~470KB to stay well under limit

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
  // Resize to max 1200px wide and convert to JPEG with progressive quality reduction
  let quality = 82;
  let buffer;

  while (quality >= 30) {
    buffer = await sharp(inputPath)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, progressive: true })
      .toBuffer();

    if (buffer.length <= MAX_SIZE_BYTES) break;
    quality -= 8;
  }

  return buffer;
}

(async () => {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║   Image Fix — Compress & Re-Upload (15 Products)   ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

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
        console.log(`  ✗ Source image not found: ${file}`);
        failed++;
        continue;
      }

      // Compress image
      const originalSize = fs.statSync(imgPath).size;
      const compressedBuffer = await compressImage(imgPath);
      console.log(`  Compressed: ${(originalSize / 1024).toFixed(0)}KB → ${(compressedBuffer.length / 1024).toFixed(0)}KB`);

      const base64 = compressedBuffer.toString('base64');
      const filename = `${slug}-hero.jpg`;

      // Clear existing images
      await swell.put(`/products/${productId}`, { images: null });

      // Upload compressed image
      const result = await swell.put(`/products/${productId}`, {
        images: [
          {
            file: {
              data: `data:image/jpeg;base64,${base64}`,
              filename,
              content_type: 'image/jpeg',
            },
          },
        ],
      });

      const cdnUrl = result.images?.[0]?.file?.url || result.images?.[0]?.url || 'PENDING';
      const isDataUri = cdnUrl.startsWith('data:');

      if (isDataUri) {
        console.log(`  ⚠ Swell stored as data URI (not CDN). Trying file.url approach...`);

        // Try alternate approach: set via url field
        await swell.put(`/products/${productId}`, { images: null });
        const alt = await swell.put(`/products/${productId}`, {
          images: [{
            file: {
              url: `data:image/jpeg;base64,${base64}`,
            },
          }],
        });
        const altUrl = alt.images?.[0]?.file?.url || 'STILL DATA URI';
        console.log(`  → Result: ${altUrl.substring(0, 90)}...`);
      } else {
        console.log(`  ✓ CDN URL: ${cdnUrl}`);
      }

      fixed++;

    } catch (err) {
      console.log(`  ✗ Error: ${err.message || err}`);
      failed++;
    }
  }

  console.log(`\n${'═'.repeat(54)}`);
  console.log(`  Result: ${fixed} fixed, ${failed} failed`);
  console.log(`${'═'.repeat(54)}\n`);
})();
