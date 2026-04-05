/**
 * Generate monogram-customized product images using Gemini API and upload to Swell.
 * 
 * For each product in the Swell store, this script:
 *   1. Sends the RW monogram + product name to Gemini image generation
 *   2. Generates a luxury product photo with the monogram applied as customization
 *   3. Saves the image locally to generated_images/monogram/
 *   4. Uploads the image to Swell as an additional product image
 *
 * Run:  node scripts/generateMonogramProducts.js
 */
require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

// ── Init clients ─────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Config ───────────────────────────────────────────────────────────
const MONOGRAM_PATH = path.join(__dirname, '..', 'assets', 'rw_monogram.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'generated_images', 'monogram');
const MODEL_NAME = 'gemini-3-pro-image-preview';

// Product-specific prompt hints for better image generation
const PRODUCT_PROMPTS = {
    'bespoke-mirrored-acrylic-wedding-welcome-sign': 'a large mirrored acrylic welcome sign on an easel stand with the monogram etched/printed prominently in the center',
    'the-calia-botanical-welcome-sign': 'a botanical floral welcome sign on an easel with the monogram centered in the design',
    'bespoke-heirloom-wedding-guest-book': 'a premium linen-bound guest book with the monogram embossed on the front cover',
    'bespoke-illuminated-script-sign': 'an illuminated LED neon-style script sign with the monogram glowing',
    'personalized-heirloom-wedding-cake-topper': 'a laser-cut wooden cake topper on a white wedding cake with the monogram design',
    'bespoke-handmade-wax-seal-stickers': 'handmade wax seal stickers with the monogram pressed into burgundy/gold wax on an envelope',
    'bespoke-botanical-ceramic-ring-dish': 'a small ceramic ring dish with the monogram delicately painted/printed on the inside',
    'bespoke-monogram-cocktail-napkins': 'white linen cocktail napkins with the monogram embroidered in gold thread',
    'bespoke-personalized-golf-balls': 'premium white golf balls with the monogram printed on them, arranged on green felt',
    'bespoke-beers-birdies-neoprene-can-cooler': 'a neoprene can cooler/koozie with the monogram printed on the front',
    'heirloom-corduroy-cosmetic-pouch': 'a corduroy cosmetic pouch with the monogram embroidered on the front',
    'bespoke-leather-wrapped-hip-flask': 'a leather-wrapped hip flask with the monogram engraved on the leather',
    'personalized-heirloom-canvas-leather-garment-bag': 'a canvas and leather garment bag with the monogram embroidered on the front pocket',
    'bespoke-engraved-compact-mirror': 'a compact mirror with the monogram engraved on the polished metal cover',
    'bespoke-16oz-acrylic-tumbler': 'a clear 16oz acrylic tumbler with the monogram printed on the side',
    'bespoke-matte-acrylic-tumbler': 'a matte finish acrylic tumbler with the monogram printed on the side',
    'bespoke-hand-crocheted-bridal-tote': 'a hand-crocheted beach tote bag with the monogram embroidered',
    'bespoke-engraved-champagne-flute': 'a crystal champagne flute with the monogram engraved on the glass',
    'bespoke-embroidered-heirloom-canvas-tote': 'a canvas tote bag with the monogram embroidered prominently on the front',
    'personalized-organic-turkish-cotton-towel': 'a plush Turkish cotton towel with the monogram embroidered in the corner',
    'bespoke-satin-bridesmaid-pajama-set': 'a satin pajama set laid flat with the monogram embroidered on the shirt pocket',
    'bespoke-heirloom-whiskey-glass-decanter-collection': 'a whiskey glass and decanter with the monogram engraved on the glass',
    'the-heirloom-acrylic-wedding-invitation-suite': 'a clear acrylic wedding invitation with the monogram printed in gold at the top',
    'bespoke-wire-script-bridal-hanger': 'a wire script bridal hanger with the monogram integrated into the wire design',
    'bespoke-folded-wedding-place-cards': 'elegant folded place cards with the monogram printed at the top of each card',
    'bespoke-laser-engraved-wedding-shot-glasses': 'shot glasses with the monogram laser-engraved on the front',
    'bespoke-engraved-wooden-bridal-hangers': 'wooden bridal hangers with the monogram engraved on the wood',
    'bespoke-pav-name-necklace': 'a delicate pavé name necklace displayed on velvet with the monogram shown on the packaging',
    'bespoke-heirloom-guest-book': 'a premium guest book with the monogram embossed on the cover in gold',
    'custom-classic-wedding-welcome-sign': 'a classic minimalist wedding welcome sign with the monogram centered at the top',
    'custom-minimalist-wedding-welcome-sign': 'a minimalist wedding welcome sign with the monogram printed elegantly at the top',
};

// ── Helper: delay ────────────────────────────────────────────────────
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Fetch all products from Swell ────────────────────────────────────
async function fetchAllProducts() {
    let allProducts = [];
    let page = 1;
    while (true) {
        const result = await swell.get('/products', {
            limit: 100,
            page,
            fields: ['id', 'name', 'slug', 'images'],
        });
        if (!result?.results?.length) break;
        allProducts = allProducts.concat(result.results);
        if (allProducts.length >= (result.count || 0)) break;
        page++;
    }
    return allProducts;
}

// ── Generate monogram image for a product ────────────────────────────
async function generateMonogramImage(productName, productSlug, monogramBase64) {
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        generationConfig: {
            responseModalities: ['image', 'text'],
        },
    });

    const specificHint = PRODUCT_PROMPTS[productSlug] || `the product "${productName}" with the monogram applied as customization`;

    const prompt = `You are a luxury wedding product photographer. Generate a single, stunning, high-end product photography image of ${specificHint}. 

KEY REQUIREMENTS:
- The attached monogram (RW crest with "ROBIN & WILLIAM") must be clearly visible and elegantly applied on the product as personalized customization
- The monogram should look like it was actually engraved, embossed, embroidered, or printed on the product (appropriate to the product type)
- Studio lighting with soft shadows on a clean, warm cream/off-white background
- Premium, luxury minimalist wedding aesthetic
- The product should be the hero — shot from a flattering angle
- Photorealistic quality, editorial product photography style
- Warm, romantic tones with gold accent highlights where appropriate

Do NOT include any text overlay, watermarks, or borders. Just the product with the monogram customization applied.`;

    const result = await model.generateContent([
        {
            inlineData: {
                mimeType: 'image/png',
                data: monogramBase64,
            },
        },
        { text: prompt },
    ]);

    const response = result.response;
    const candidates = response.candidates;

    if (!candidates || candidates.length === 0) {
        throw new Error('No candidates in response');
    }

    // Find the image part in the response
    for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
            return Buffer.from(part.inlineData.data, 'base64');
        }
    }

    throw new Error('No image found in response');
}

// ── Upload image to Swell ────────────────────────────────────────────
async function uploadImageToSwell(productId, imageBuffer, slug, existingImages) {
    const imageData = imageBuffer.toString('base64');

    const newImage = {
        file: {
            data: imageData,
            content_type: 'image/png',
            filename: `${slug}-monogram-customization.png`,
        },
    };

    // Append to existing images
    const allImages = [...(existingImages || []), newImage];

    await swell.put(`/products/${productId}`, {
        images: allImages,
    });
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║  Monogram Product Image Generator — Custom Wedding Co.     ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    // Validate
    if (!process.env.GEMINI_API_KEY) {
        console.error('❌ GEMINI_API_KEY is missing from .env.local');
        process.exit(1);
    }

    // Load monogram
    if (!fs.existsSync(MONOGRAM_PATH)) {
        console.error(`❌ Monogram image not found at: ${MONOGRAM_PATH}`);
        console.error('  Please place the RW monogram PNG at assets/rw_monogram.png');
        process.exit(1);
    }

    const monogramBase64 = fs.readFileSync(MONOGRAM_PATH).toString('base64');
    console.log(`✅ Monogram loaded (${(Buffer.byteLength(monogramBase64, 'base64') / 1024).toFixed(0)} KB)\n`);

    // Create output directory
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // Fetch products
    console.log('Fetching products from Swell...');
    const products = await fetchAllProducts();
    console.log(`✅ Found ${products.length} products\n`);

    // Process each product
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const progress = `[${i + 1}/${products.length}]`;

        console.log(`${progress} 🎨 ${product.name}`);
        console.log(`       Slug: ${product.slug}`);

        const outputPath = path.join(OUTPUT_DIR, `${product.slug}.png`);

        try {
            // Check if already generated
            if (fs.existsSync(outputPath)) {
                console.log(`       ⏭️  Image already exists locally, skipping generation`);
            } else {
                // Generate image with Gemini
                console.log(`       🤖 Generating with Gemini...`);
                const imageBuffer = await generateMonogramImage(product.name, product.slug, monogramBase64);
                
                // Save locally
                fs.writeFileSync(outputPath, imageBuffer);
                console.log(`       💾 Saved to generated_images/monogram/${product.slug}.png`);
            }

            // Upload to Swell
            const imageBuffer = fs.readFileSync(outputPath);
            console.log(`       ☁️  Uploading to Swell...`);
            await uploadImageToSwell(product.id, imageBuffer, product.slug, product.images);
            console.log(`       ✅ Uploaded successfully!\n`);

            successCount++;

            // Rate limit: wait between requests
            if (i < products.length - 1) {
                console.log(`       ⏳ Waiting 5s for rate limit...\n`);
                await delay(5000);
            }
        } catch (error) {
            console.error(`       ❌ Error: ${error.message}`);
            if (error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('429')) {
                console.error(`       ⏳ Rate limited! Waiting 60s...`);
                await delay(60000);
                i--; // Retry this product
            } else {
                failCount++;
                console.log('');
            }
        }
    }

    console.log('\n══════════════════════════════════════════════════════════════');
    console.log(`🎉 Complete! ${successCount} succeeded, ${failCount} failed out of ${products.length} products`);
    console.log('══════════════════════════════════════════════════════════════\n');
}

main().catch(err => {
    console.error('❌ Fatal error:', err);
    process.exit(1);
});
