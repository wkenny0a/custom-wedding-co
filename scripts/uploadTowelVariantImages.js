/**
 * Upload variant color images for the Turkish Cotton Towel product.
 * Uploads one-by-one to avoid 413 payload limits.
 *
 * Run:  node scripts/uploadTowelVariantImages.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2e9832dac010012c679cb';
const IMG_DIR = '/Users/kenny/.gemini/antigravity/brain/f30797ea-5cbe-4845-b244-3c4465ff8653';

const variantImages = [
    { color: 'Mint',            file: 'towel_mint_1773333108972.png' },
    { color: 'Purple',          file: 'towel_purple_1773333124141.png' },
    { color: 'Light Gray',      file: 'towel_light_gray_1773333138651.png' },
    { color: 'Khaki Green',     file: 'towel_khaki_green_1773333152789.png' },
    { color: 'Lilac',           file: 'towel_lilac_1773333168784.png' },
    { color: 'Turquoise',       file: 'towel_turquoise_1773333183237.png' },
    { color: 'Brown',           file: 'towel_brown_1773333213486.png' },
    { color: 'Orange',          file: 'towel_orange_1773333228310.png' },
    { color: 'Burgundy',        file: 'towel_burgundy_1773333243846.png' },
    { color: 'Benetton Green',  file: 'towel_benetton_green_1773333259796.png' },
    { color: 'Baby Blue',       file: 'towel_baby_blue_1773333273044.png' },
    { color: 'Beige',           file: 'towel_beige_1773333289591.png' },
    { color: 'Petrol Green',    file: 'towel_petrol_green_1773333320653.png' },
    { color: 'Powder Pink',     file: 'towel_powder_pink_1773333339896.png' },
    { color: 'Mustard',         file: 'towel_mustard_1773333354874.png' },
    { color: 'Black',           file: 'towel_black_1773333373801.png' },
    { color: 'Light Mint',      file: 'towel_light_mint_1773333388565.png' },
    { color: 'Yellow',          file: 'towel_yellow_1773333406608.png' },
    { color: 'Blue',            file: 'towel_blue_1773333442474.png' },
    { color: 'Fuchsia',         file: 'towel_fuchsia_1773333458621.png' },
    { color: 'Sax Blue',        file: 'towel_sax_blue_1773333474520.png' },
    { color: 'Random Choice',   file: 'towel_random_choice_1773333489661.png' },
];

(async () => {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Turkish Towel — Uploading 22 Variant Images         ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    let successCount = 0;
    const total = variantImages.length;

    for (let i = 0; i < variantImages.length; i++) {
        const v = variantImages[i];
        const fullPath = path.join(IMG_DIR, v.file);

        if (!fs.existsSync(fullPath)) {
            console.log(`  ⚠️  [${i+1}/${total}] Missing: ${v.color}`);
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
                        filename: `towel-${v.color.toLowerCase().replace(/\s+/g, '-')}.png`,
                    },
                }],
            });

            successCount++;
            console.log(`  ✅ [${i+1}/${total}] ${v.color} — total images: ${(updated.images && updated.images.length) || '??'}`);
        } catch (err) {
            console.log(`  ❌ [${i+1}/${total}] ${v.color} — ${err.message || err}`);
        }
    }

    console.log(`\n🎉 Done! Successfully uploaded ${successCount}/${total} variant images.`);
})();
