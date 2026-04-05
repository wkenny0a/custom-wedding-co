/**
 * Fix the thumbnail for the Bespoke Monogram Cocktail Napkins product.
 * Re-uploads the image using the correct Swell file format (data + content_type).
 *
 * Run:  node scripts/fixCocktailNapkinsImage.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);

const SLUG = 'bespoke-monogram-cocktail-napkins';
const IMAGE_PATH = '/Users/kenny/.gemini/antigravity/brain/c5f568a6-05a5-4b80-bbc8-405e8eed0778/cocktail_napkins_thumbnail_1773357184107.png';

async function run() {
    console.log('Fixing cocktail napkins thumbnail...\n');

    // Read image as base64
    if (!fs.existsSync(IMAGE_PATH)) {
        console.error('❌ Image file not found at:', IMAGE_PATH);
        process.exit(1);
    }

    const imageData = fs.readFileSync(IMAGE_PATH).toString('base64');
    console.log(`  ✅ Image loaded (${(Buffer.byteLength(imageData, 'base64') / 1024).toFixed(0)} KB)`);

    // Find the product
    const result = await swell.get('/products', { where: { slug: SLUG } });
    if (!result || !result.results || result.results.length === 0) {
        console.error('❌ Product not found with slug:', SLUG);
        process.exit(1);
    }

    const productId = result.results[0].id;
    console.log(`  ✅ Found product: ${productId}`);

    // Upload with correct format: data + content_type
    console.log('  Uploading image with correct format...');
    const updated = await swell.put('/products/' + productId, {
        images: [{
            file: {
                data: imageData,
                content_type: 'image/png',
                filename: 'bespoke-monogram-cocktail-napkins-thumbnail.png',
            }
        }]
    });

    console.log(`\n✅ Thumbnail fixed!`);
    console.log(`   Images on product: ${updated.images?.length || 0}`);
    if (updated.images && updated.images[0]) {
        console.log(`   Image URL: ${updated.images[0].file?.url || 'pending'}`);
    }
}

run().catch(err => {
    console.error('❌ Error:', err.message || err);
    process.exit(1);
});
