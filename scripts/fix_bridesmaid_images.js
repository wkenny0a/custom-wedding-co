/**
 * fix_bridesmaid_images.js
 * ─────────────────────────
 * Re-uploads all 20 bridesmaid box stuffer images correctly using
 * the two-step approach:
 *   1. POST to /:files with raw base64 data + dimensions
 *   2. PUT product images with the returned CDN url + dimensions
 *
 * Usage:  node scripts/fix_bridesmaid_images.js
 */

require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const BRAIN = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\917f75ee-5ea8-46af-9233-c4793b0b7f2e';

// slug → source image filename
const PRODUCT_IMAGES = [
  { slug: 'heirloom-satin-scrunchie-set',          file: 'scrunchie_set_1777114894870.png' },
  { slug: 'artisan-soy-candle-bridal',              file: 'soy_candle_1777114905340.png' },
  { slug: 'luxe-satin-sleep-mask',                  file: 'sleep_mask_1777114918092.png' },
  { slug: 'luxury-botanical-lip-balm-trio',         file: 'lip_balm_set_1777114931746.png' },
  { slug: 'rose-gold-compact-mirror-bridal',        file: 'compact_mirror_1777114947073.png' },
  { slug: 'pearl-embellished-hair-claw-clip',       file: 'hair_claw_clip_1777114966408.png' },
  { slug: 'botanical-bath-bomb-trio',               file: 'bath_bomb_set_1777114981210.png' },
  { slug: 'gold-rimmed-ceramic-jewelry-dish',       file: 'jewelry_dish_1777114992548.png' },
  { slug: 'calm-collect-essential-oil-roller',      file: 'essential_oil_roller_1777115008403.png' },
  { slug: 'crystal-glass-nail-file-set',            file: 'nail_file_set_1777115024206.png' },
  { slug: 'mulberry-silk-pillowcase-bridal',        file: 'silk_pillowcase_1777115040823.png' },
  { slug: 'dainty-pearl-bracelet-bridal',           file: 'bracelet_set_1777115056026.png' },
  { slug: 'champagne-gummy-bears-bridal',           file: 'champagne_gummy_bears_1777115070873.png' },
  { slug: 'botanical-body-lotion-bridal',           file: 'body_lotion_1777115085045.png' },
  { slug: 'linen-wedding-vow-booklet',              file: 'vow_booklet_1777115096146.png' },
  { slug: 'rosewater-face-mist-bridal',             file: 'face_mist_1777115113799.png' },
  { slug: 'floral-tea-sampler-bridal',              file: 'tea_sampler_1777115125664.png' },
  { slug: 'rose-petal-hand-cream-bridal',           file: 'hand_cream_1777115138813.png' },
  { slug: 'gold-heart-wine-stopper-bridal',         file: 'wine_stopper_1777115150447.png' },
  { slug: 'rose-gold-reusable-straw-set',           file: 'straw_set_1777115161950.png' },
];

(async () => {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  Fix Bridesmaid Box Images — Two-Step Upload (20 Products)  ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  let fixed = 0;
  let failed = 0;

  for (let i = 0; i < PRODUCT_IMAGES.length; i++) {
    const { slug, file } = PRODUCT_IMAGES[i];
    const imgPath = path.join(BRAIN, file);

    try {
      console.log(`[${i + 1}/${PRODUCT_IMAGES.length}] ${slug}`);

      // ── Find product ────────────────────────────────────────────────
      const res = await swell.get('/products', { where: { slug } });
      if (!res.results?.length) {
        console.log('  ✗ Product not found');
        failed++;
        continue;
      }
      const productId = res.results[0].id;

      // ── Check source image ──────────────────────────────────────────
      if (!fs.existsSync(imgPath)) {
        console.log(`  ✗ Source image not found: ${file}`);
        failed++;
        continue;
      }

      const buf = fs.readFileSync(imgPath);
      const sizeKB = (buf.length / 1024).toFixed(0);

      // ── Step 1: Upload to /:files ───────────────────────────────────
      const filename = `${slug}-hero.png`;
      const fileRes = await swell.post('/:files', {
        data: buf.toString('base64'),
        filename,
        content_type: 'image/png',
        width: 1024,
        height: 1024,
      });

      if (!fileRes.url) {
        console.log('  ✗ File upload failed — no URL returned');
        failed++;
        continue;
      }
      console.log(`  ✓ File uploaded (${sizeKB} KB) → ${fileRes.url.substring(0, 80)}...`);

      // ── Step 2: Clear old images & attach new file ──────────────────
      await swell.put(`/products/${productId}`, { images: null });

      const result = await swell.put(`/products/${productId}`, {
        images: [{
          file: {
            url: fileRes.url,
            width: 1024,
            height: 1024,
          },
        }],
      });

      const img = result.images?.[0];
      if (img?.file?.url && img.file.width) {
        console.log(`  ✓ Product image set (${img.file.width}×${img.file.height})`);
        fixed++;
        console.log('  ✅ FIXED');
      } else {
        console.log('  ⚠ Image attached but missing dimensions');
        fixed++;
      }

    } catch (err) {
      console.log(`  ✗ Error: ${err.message || err}`);
      failed++;
    }
  }

  console.log(`\n${'═'.repeat(64)}`);
  console.log(`  RESULT: ${fixed} fixed, ${failed} failed`);
  console.log(`${'═'.repeat(64)}\n`);
})();
