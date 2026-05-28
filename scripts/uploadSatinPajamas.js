/**
 * Creates the "Bespoke Satin Bridesmaid Pajama Set" product in Swell.
 *
 * Includes:
 *   - 3 variant options: Color (18), Size (5), Personalization Placement (4)
 *   - 2 custom text inputs: Name/Title, Font Style & Text Color Preferences
 *   - Brand-styled HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Primary product image upload
 *
 * Run:  node scripts/uploadSatinPajamas.js [path/to/image.png]
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Categories ────────────────────────────────────────────────────────
const CATEGORIES = [
    {
        name: 'Bridal Party Gifts',
        slug: 'bridal-party-gifts',
        parent_slug: 'weddings',
        description: 'Thoughtfully crafted gifts to honor your bridal party.',
    },
    {
        name: 'Bridesmaid Gifts',
        slug: 'bridesmaid-gifts',
        parent_slug: 'bridal-party-gifts',
        description: 'Beautifully curated luxury gifts for your bridesmaids.',
    },
    {
        name: 'Sleepwear & Loungewear',
        slug: 'sleepwear-loungewear',
        parent_slug: 'clothing',
        description: 'Premium sleepwear and loungewear for every occasion.',
    },
    {
        name: 'Pajama Sets',
        slug: 'pajama-sets',
        parent_slug: 'sleepwear-loungewear',
        description: 'Luxury matching pajama sets crafted with care.',
    },
    {
        name: 'Getting Ready Apparel',
        slug: 'getting-ready-apparel',
        parent_slug: 'weddings',
        description: 'Elegant apparel for your wedding morning preparations.',
    },
    {
        name: 'Weddings',
        slug: 'weddings',
        description: 'Everything for your perfect wedding day.',
    },
    {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Premium clothing and apparel.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
const SLUG = 'bespoke-satin-bridesmaid-pajama-set';

const productData = {
    name: 'Bespoke Satin Bridesmaid Pajama Set | Personalized Luxury Bridal Sleepwear',
    slug: SLUG,
    active: true,
    price: 21.21,
    currency: 'USD',
    stock_tracking: false, // Made to Order

    // ── Plain-text description ─────────────────────────────────────────
    description: `Envelope your bridal party in timeless elegance with our bespoke satin pajama sets, thoughtfully tailored for unforgettable moments of pre-wedding preparation.

Silken Comfort: Crafted from a premium, lightweight satin blend with a touch of spandex for effortless, breathable movement.

Bespoke Personalization: Exquisitely customized with your choice of placement—front pocket, back, or both—for a truly intimate, one-of-a-kind gift.

Heirloom Palette: Available in a curated selection of romantic, rich hues to perfectly complement your exquisite wedding aesthetic.

Timeless Silhouette: Features a classic short-sleeved button-down top with delicate contrast piping and relaxed-fit matching shorts.

A Personal Touch: "Celebrate Love with a Personal Touch."—Every set is intimately crafted to make your loved ones feel cherished on your special morning.`,

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Custom Luxury Bridesmaid Pajamas | Bespoke Satin Bridal Party Sleepwear',
    meta_description:
        'Treat your bridal party to heirloom-quality, bespoke satin pajamas. Discover luxury, breathable sleepwear personalized with timeless elegance for your wedding morning.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'bridesmaid pajamas',
        'satin pajama set',
        'bridal party sleepwear',
        'personalized pajamas',
        'wedding morning',
        'getting ready outfit',
        'luxury sleepwear',
        'bridesmaid gift',
        'bespoke pajamas',
        'bridal loungewear',
        'custom wedding gift',
        'matching pajama sets',
    ],

    // ── Options: 3 Variants + 2 Custom Text Inputs ───────────────────
    options: [
        // ─── VARIANT 1: Color ────────────────────────────────────────
        {
            name: 'Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Black' },
                { name: 'Navy Blue' },
                { name: 'Dark Blue' },
                { name: 'Grey Blue' },
                { name: 'Light Blue' },
                { name: 'White' },
                { name: 'Burgundy' },
                { name: 'Orange' },
                { name: 'Rose Gold' },
                { name: 'Champagne Gold' },
                { name: 'Champagne' },
                { name: 'Light Pink' },
                { name: 'Dark Green' },
                { name: 'Sage Green' },
                { name: 'Purple' },
                { name: 'Mauve' },
                { name: 'Lavender' },
                { name: 'Dusty Rose' },
            ],
        },

        // ─── VARIANT 2: Size ─────────────────────────────────────────
        {
            name: 'Size',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'S' },
                { name: 'M' },
                { name: 'L' },
                { name: 'XL' },
                { name: 'XXL' },
            ],
        },

        // ─── VARIANT 3: Personalization Placement ────────────────────
        {
            name: 'Personalization Placement',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: '* No Personalization', price: 0 },         // Base $21.21
                { name: 'Pocket Only', price: 5.55 },               // $26.76
                { name: 'Back Only', price: 5.55 },                  // $26.76
                { name: 'Pocket & Back', price: 6.59 },              // $27.80
            ],
        },

        // ─── TEXT INPUT 1: Name / Title (Required) ───────────────────
        {
            name: 'Name / Title for Personalization',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the name or title you would like personalized on the pajama set.',
        },

        // ─── TEXT INPUT 2: Font & Color Preferences (Optional) ───────
        {
            name: 'Font Style & Text Color Preferences',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description: 'Optional — Specify your preferred font style and text color (e.g. "Script in Rose Gold", "Block Letters in White").',
        },
    ],

    // ── Design / Frontend Notes ──────────────────────────────────────
    content: {
        design_notes: {
            vibe: 'Luxury minimalist wedding. High-end, heirloom quality, timeless elegance. Warm, romantic, premium.',
            primary_color: '#4A2C2A',
            background_color: '#F7EFE3',
            accent_gold: '#B89A52',
            soft_blush: '#F2D9D9',
            typography: 'Playfair Display / Cormorant Garamond',
            label_style: 'Uppercase tracking for labels, elegant italics for quotes',
            visual_style: 'Clean, minimal, generous whitespace. Delicate botanical elements.',
            brand_voice: 'Celebrate Love with a Personal Touch.',
        },
    },
};

// ── Image path (passed as CLI arg) ────────────────────────────────────
const IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function ensureCategories() {
    console.log('STEP 1 · Ensuring categories exist...');
    const categoryIds = [];

    // First create parent categories (Weddings, Clothing)
    const parentSlugs = ['weddings', 'clothing'];
    for (const cat of CATEGORIES.filter(c => parentSlugs.includes(c.slug))) {
        const result = await swell.get('/categories', { where: { slug: cat.slug } });
        if (result && result.results && result.results.length > 0) {
            console.log(`  ✅ Exists: "${cat.name}" → ${result.results[0].id}`);
        } else {
            const created = await swell.post('/categories', {
                name: cat.name,
                slug: cat.slug,
                active: true,
                description: cat.description,
                meta_title: `${cat.name} | Custom Wedding Co.`,
            });
            console.log(`  🆕 Created: "${cat.name}" → ${created.id}`);
        }
    }

    // Then create child categories
    for (const cat of CATEGORIES.filter(c => !parentSlugs.includes(c.slug))) {
        const result = await swell.get('/categories', { where: { slug: cat.slug } });
        if (result && result.results && result.results.length > 0) {
            categoryIds.push(result.results[0].id);
            console.log(`  ✅ Exists: "${cat.name}" → ${result.results[0].id}`);
        } else {
            // Find parent category ID
            let parentId = null;
            if (cat.parent_slug) {
                const parentResult = await swell.get('/categories', { where: { slug: cat.parent_slug } });
                if (parentResult && parentResult.results && parentResult.results.length > 0) {
                    parentId = parentResult.results[0].id;
                }
            }

            const catData = {
                name: cat.name,
                slug: cat.slug,
                active: true,
                description: cat.description,
                meta_title: `${cat.name} | Custom Wedding Co.`,
            };
            if (parentId) catData.parent_id = parentId;

            const created = await swell.post('/categories', catData);
            categoryIds.push(created.id);
            console.log(`  🆕 Created: "${cat.name}" → ${created.id}`);
        }
    }

    return categoryIds;
}

async function run() {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Bespoke Satin Bridesmaid Pajama Set — Swell Upload  ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
        process.exit(1);
    }

    try {
        // ── Step 1: Create / resolve categories ─────────────────────
        const categoryIds = await ensureCategories();
        if (categoryIds.length > 0) {
            productData.category_index = { id: categoryIds };
        }
        console.log('');

        // ── Step 2: Attach image if provided ─────────────────────────
        console.log('STEP 2 · Preparing product image...');
        if (IMAGE_PATH && fs.existsSync(IMAGE_PATH)) {
            const imgBuffer = fs.readFileSync(IMAGE_PATH);
            const base64 = imgBuffer.toString('base64');
            const ext = path.extname(IMAGE_PATH).slice(1).toLowerCase();
            const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
            productData.images = [{
                file: {
                    data: base64,
                    content_type: mimeType,
                    filename: 'satin-pajama-set-thumbnail.' + ext,
                },
            }];
            console.log('  ✅ Image attached: ' + path.basename(IMAGE_PATH));
        } else if (IMAGE_PATH) {
            console.log('  ⚠️  Image not found at: ' + IMAGE_PATH);
        } else {
            console.log('  ℹ️  No image path provided. Add images in the Swell dashboard.');
        }
        console.log('');

        // ── Step 3: Create or update product ─────────────────────────
        console.log('STEP 3 · Creating product...');
        const existing = await swell.get('/products', { where: { slug: SLUG } });
        let product;

        if (existing && existing.results && existing.results.length > 0) {
            console.log(`  Product exists (ID: ${existing.results[0].id}). Updating...`);
            product = await swell.put(`/products/${existing.results[0].id}`, productData);
            console.log('  ✅ Updated!');
        } else {
            product = await swell.post('/products', productData);
            console.log('  ✅ Created!');
        }

        const pid = product && product.id;
        console.log('');
        console.log(`  ID       : ${pid}`);
        console.log(`  Name     : ${product && product.name}`);
        console.log(`  Slug     : ${product && product.slug}`);
        console.log(`  Price    : $${product && product.price}`);
        console.log(`  Active   : ${product && product.active}`);
        console.log(`  Options  : ${(product && product.options && product.options.length) || 0}`);
        console.log(`  Images   : ${(product && product.images && product.images.length) || 0}`);
        console.log(`  Variants : 18 Colors × 5 Sizes × 4 Placements = ${18 * 5 * 4} combos`);

        console.log('\n╔═══════════════════════════════════════════════════════╗');
        console.log('║  🎉 Product is LIVE in Swell!                        ║');
        console.log('╚═══════════════════════════════════════════════════════╝');
        console.log('\nNext steps:');
        console.log('  1. Run syncProductsToSanity.js to sync to your Sanity CMS');
        console.log(`  2. Visit: https://custom-wedding-co.vercel.app/products/${SLUG}`);

    } catch (error) {
        console.error('❌ Error uploading product:', error.message || error);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

run();
