/**
 * Upload embroidery-color variant images one-by-one to the
 * Bespoke Embroidered Heirloom Canvas Tote in Swell.
 *
 * Run:  node scripts/uploadHeirloomToteImages.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2ea212138f80012800b37';
const IMG_DIR = '/Users/kenny/.gemini/antigravity/brain/d0107ea4-2fa6-4e8e-b533-f919d7d72d8c';

const variantImages = [
    { color: 'Black',       file: 'tote_black_1773334001553.png' },
    { color: 'Brown',       file: 'tote_brown_1773334016977.png' },
    { color: 'Red',         file: 'tote_red_1773334048763.png' },
    { color: 'Lilac',       file: 'tote_lilac_1773334064152.png' },
    { color: 'Silver',      file: 'tote_silver_1773334079524.png' },
    { color: 'Khaki',       file: 'tote_khaki_1773334106340.png' },
    { color: 'Purple',      file: 'tote_purple_1773334121908.png' },
    { color: 'Pink',        file: 'tote_pink_1773334137484.png' },
    { color: 'Navy',        file: 'tote_navy_1773334168162.png' },
    { color: 'Yellow',      file: 'tote_yellow_1773334184575.png' },
    { color: 'Mint',        file: 'tote_mint_1773334200095.png' },
    { color: 'Green',       file: 'tote_green_1773334229883.png' },
    { color: 'Turquoise',   file: 'tote_turquoise_1773334244957.png' },
    { color: 'White',       file: 'tote_white_1773334260416.png' },
    { color: 'Orange',      file: 'tote_orange_1773334293277.png' },
    { color: 'Blue',        file: 'tote_blue_1773334315064.png' },
    { color: 'Dark Grey',   file: 'tote_dark_grey_1773334330269.png' },
    { color: 'Baby Blue',   file: 'tote_baby_blue_1773334369764.png' },
    { color: 'Gold',        file: 'tote_gold_1773334386680.png' },
    { color: 'Beige',       file: 'tote_beige_1773334404424.png' },
];

(async () => {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║  Uploading 20 Embroidery Color Variant Images           ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    let successCount = 0;
    const total = variantImages.length;

    for (let i = 0; i < variantImages.length; i++) {
        const v = variantImages[i];
        const fullPath = path.join(IMG_DIR, v.file);

        if (!fs.existsSync(fullPath)) {
            console.log(`  ⚠️  [${i + 1}/${total}] Missing: ${v.color} — ${v.file}`);
            continue;
        }

        try {
            const buf = fs.readFileSync(fullPath);
            const base64 = buf.toString('base64');

            // Fetch current product to get existing images
            const product = await swell.get('/products/' + PRODUCT_ID);
            const existing = product.images || [];

            // Append new image
            const updated = await swell.put('/products/' + PRODUCT_ID, {
                images: [...existing, {
                    file: {
                        data: base64,
                        content_type: 'image/png',
                        filename: `heirloom-tote-${v.color.toLowerCase().replace(/\s+/g, '-')}.png`,
                    },
                }],
            });

            successCount++;
            console.log(`  ✅ [${i + 1}/${total}] ${v.color} — total images: ${(updated.images && updated.images.length) || '??'}`);
        } catch (err) {
            console.log(`  ❌ [${i + 1}/${total}] ${v.color} — ${err.message || err}`);
        }
    }

    console.log(`\n🎉 Done! Successfully uploaded ${successCount}/${total} variant images.`);
})();
