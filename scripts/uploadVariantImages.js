/**
 * Upload variant images one-by-one to avoid 413 payload limit.
 * Each image is appended individually via Swell's product images endpoint.
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2e1a42790830012a1fd2d';
const IMG_DIR = '/Users/kenny/.gemini/antigravity/brain/85454209-e2b5-4e6f-b487-0ba7ce720ec6';

const variantImages = [
    { color: 'Black',           file: 'pajama_black_1773332093160.png' },
    { color: 'Navy Blue',       file: 'pajama_navy_blue_1773332109364.png' },
    { color: 'Dark Blue',       file: 'pajama_dark_blue_1773332126066.png' },
    { color: 'Grey Blue',       file: 'pajama_grey_blue_1773332141223.png' },
    { color: 'Light Blue',      file: 'pajama_light_blue_1773332155559.png' },
    { color: 'White',           file: 'pajama_white_1773332171029.png' },
    { color: 'Burgundy',        file: 'pajama_burgundy_1773332204674.png' },
    { color: 'Orange',          file: 'pajama_orange_1773332219870.png' },
    { color: 'Rose Gold',       file: 'pajama_rose_gold_1773332235455.png' },
    { color: 'Champagne Gold',  file: 'pajama_champagne_gold_1773332248959.png' },
    { color: 'Champagne',       file: 'pajama_champagne_1773332267090.png' },
    { color: 'Light Pink',      file: 'pajama_light_pink_1773332280290.png' },
    { color: 'Dark Green',      file: 'pajama_dark_green_1773332314214.png' },
    { color: 'Sage Green',      file: 'pajama_sage_green_1773332329295.png' },
    { color: 'Purple',          file: 'pajama_purple_1773332345739.png' },
    { color: 'Mauve',           file: 'pajama_mauve_1773332361693.png' },
    { color: 'Lavender',        file: 'pajama_lavender_1773332376723.png' },
    { color: 'Dusty Rose',      file: 'pajama_dusty_rose_1773332390116.png' },
];

(async () => {
    console.log('Uploading 18 variant images one-by-one...\n');

    let successCount = 0;
    for (let i = 0; i < variantImages.length; i++) {
        const v = variantImages[i];
        const fullPath = path.join(IMG_DIR, v.file);
        if (!fs.existsSync(fullPath)) {
            console.log(`  ⚠️  [${i+1}/18] Missing: ${v.color}`);
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
                        filename: `pajama-${v.color.toLowerCase().replace(/\s+/g, '-')}.png`,
                    },
                }],
            });

            successCount++;
            console.log(`  ✅ [${i+1}/18] ${v.color} — total images: ${(updated.images && updated.images.length) || '??'}`);
        } catch (err) {
            console.log(`  ❌ [${i+1}/18] ${v.color} — ${err.message || err}`);
        }
    }

    console.log(`\n🎉 Done! Successfully uploaded ${successCount}/18 variant images.`);
})();
