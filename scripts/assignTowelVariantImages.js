/**
 * Assigns the correct color image to each individual variant row in Swell.
 * Maps color option_value_id → image, then updates each of the 88 variants.
 *
 * Run:  node scripts/assignTowelVariantImages.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2e9832dac010012c679cb';

// Color option value ID → filename used during upload (from Swell data)
const COLOR_VALUE_TO_FILE = {
    '69b2e9832dac010012c679ce': 'towel-mint',
    '69b2e9832dac010012c679cf': 'towel-purple',
    '69b2e9832dac010012c679d0': 'towel-light-gray',
    '69b2e9832dac010012c679d1': 'towel-khaki-green',
    '69b2e9832dac010012c679d2': 'towel-lilac',
    '69b2e9832dac010012c679d3': 'towel-turquoise',
    '69b2e9832dac010012c679d4': 'towel-brown',
    '69b2e9832dac010012c679d5': 'towel-orange',
    '69b2e9832dac010012c679d6': 'towel-burgundy',
    '69b2e9832dac010012c679d7': 'towel-benetton-green',
    '69b2e9832dac010012c679d8': 'towel-baby-blue',
    '69b2e9832dac010012c679d9': 'towel-beige',
    '69b2e9832dac010012c679da': 'towel-petrol-green',
    '69b2e9832dac010012c679db': 'towel-powder-pink',
    '69b2e9832dac010012c679dc': 'towel-mustard',
    '69b2e9832dac010012c679dd': 'towel-black',
    '69b2e9832dac010012c679de': 'towel-light-mint',
    '69b2e9832dac010012c679df': 'towel-yellow',
    '69b2e9832dac010012c679e0': 'towel-blue',
    '69b2e9832dac010012c679e1': 'towel-fuchsia',
    '69b2e9832dac010012c679e2': 'towel-sax-blue',
    '69b2e9832dac010012c679e3': 'towel-random-choice',
};

// All color option value IDs (to identify which option_value_id is the color)
const COLOR_VALUE_IDS = new Set(Object.keys(COLOR_VALUE_TO_FILE));

(async () => {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Assigning Images to Individual Variant Rows         ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    try {
        // 1. Get product with images
        const product = await swell.get('/products/' + PRODUCT_ID);
        const images = product.images || [];

        // Build lookup: filename (no extension) → image object
        const fileToImage = {};
        for (const img of images) {
            if (img.file && img.file.filename) {
                const basename = img.file.filename.replace(/\.[^.]+$/, '');
                fileToImage[basename] = img;
            }
        }

        // 2. Get all 88 variants
        const variantResult = await swell.get('/products/' + PRODUCT_ID + '/variants', { limit: 100 });
        const variants = variantResult.results || [];
        console.log(`Found ${variants.length} variants and ${images.length} images.\n`);

        // 3. For each variant, find its color option_value_id, look up the image, and assign it
        let success = 0;
        for (let i = 0; i < variants.length; i++) {
            const v = variants[i];
            // Find which option_value_id is the color
            const colorValId = (v.option_value_ids || []).find(id => COLOR_VALUE_IDS.has(id));
            if (!colorValId) {
                console.log(`  ⚠️  [${i+1}/${variants.length}] ${v.name} — no color value found`);
                continue;
            }

            const filename = COLOR_VALUE_TO_FILE[colorValId];
            const img = fileToImage[filename];
            if (!img) {
                console.log(`  ⚠️  [${i+1}/${variants.length}] ${v.name} — no image for ${filename}`);
                continue;
            }

            // Update the variant with the image
            await swell.put('/products/' + PRODUCT_ID + '/variants/' + v.id, {
                images: [{
                    id: img.id,
                    file: img.file,
                }],
            });
            success++;
            console.log(`  ✅ [${i+1}/${variants.length}] ${v.name}`);
        }

        console.log(`\n🎉 Done! Assigned images to ${success}/${variants.length} variants.`);
    } catch (err) {
        console.error('❌ Error:', err.message || err);
        if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
    }
})();
