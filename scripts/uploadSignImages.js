/**
 * Upload lifestyle images to the Illuminated Wedding Sign product in Swell.
 *
 * Run:  node scripts/uploadSignImages.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_SLUG = 'bespoke-illuminated-wedding-name-sign';

// Images to upload (absolute paths)
const IMAGES = [
    {
        path: path.resolve(__dirname, '../.gemini-images/sign_lifestyle_1.png'),
        fallback: '/Users/kenny/.gemini/antigravity/brain/aa0e29fe-9da8-41ed-9ccd-be37f9c410ff/sign_lifestyle_1_1773329405264.png',
    },
    {
        path: path.resolve(__dirname, '../.gemini-images/sign_lifestyle_2.png'),
        fallback: '/Users/kenny/.gemini/antigravity/brain/aa0e29fe-9da8-41ed-9ccd-be37f9c410ff/sign_lifestyle_2_1773329419781.png',
    },
];

async function uploadImages() {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Uploading Images to Illuminated Sign Product        ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    try {
        // Find the product
        const result = await swell.get('/products', { where: { slug: PRODUCT_SLUG } });
        if (!result || !result.results || result.results.length === 0) {
            console.error(`❌ Product not found: ${PRODUCT_SLUG}`);
            process.exit(1);
        }

        const product = result.results[0];
        console.log(`Found product: ${product.name} (${product.id})\n`);

        // Read images and upload as base64 via Swell file API
        const imageEntries = [];

        for (let i = 0; i < IMAGES.length; i++) {
            const img = IMAGES[i];
            const imagePath = fs.existsSync(img.path) ? img.path : img.fallback;

            if (!fs.existsSync(imagePath)) {
                console.warn(`  ⚠️  Image not found: ${imagePath}`);
                continue;
            }

            console.log(`  📸 Reading image ${i + 1}: ${path.basename(imagePath)}`);
            const fileBuffer = fs.readFileSync(imagePath);
            const base64Data = fileBuffer.toString('base64');
            const dataUri = `data:image/png;base64,${base64Data}`;

            imageEntries.push({
                file: {
                    data: dataUri,
                    filename: `illuminated-sign-lifestyle-${i + 1}.png`,
                    content_type: 'image/png',
                },
            });
            console.log(`  ✅ Prepared image ${i + 1} (${(fileBuffer.length / 1024).toFixed(0)} KB)`);
        }

        if (imageEntries.length === 0) {
            console.error('❌ No images to upload');
            process.exit(1);
        }

        // Also keep the first hero image we generated earlier
        const existingImages = product.images || [];

        console.log(`\n  Uploading ${imageEntries.length} images to Swell...`);
        const updated = await swell.put(`/products/${product.id}`, {
            images: [...existingImages, ...imageEntries],
        });

        console.log(`\n✅ Successfully uploaded ${imageEntries.length} images!`);
        console.log(`   Total images on product: ${updated.images?.length || 0}`);
        console.log('\n🎉 Done! Images are live on the product.');
    } catch (error) {
        console.error('❌ Error uploading images:', error.message || error);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

uploadImages();
