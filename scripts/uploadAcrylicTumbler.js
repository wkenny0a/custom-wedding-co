/**
 * Creates the "Bespoke 16oz Acrylic Tumbler | Personalized Bridal Party & Wedding Favor"
 * product in Swell.
 *
 * Includes:
 *   - 2 variant options: Tumbler Color (34 values), Print Style (3 values)
 *   - 2 custom text inputs: Personalized Name (Required), Font Selection (Required)
 *   - Brand-styled description
 *   - SEO metadata
 *   - Category associations
 *   - Primary product image upload
 *
 * Run:  node scripts/uploadAcrylicTumbler.js [path/to/image.png]
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
        description: 'Thoughtfully curated gifts to honor your bridal party.',
    },
    {
        name: 'Bespoke Drinkware',
        slug: 'bespoke-drinkware',
        description: 'Personalized, premium drinkware for life\'s most cherished celebrations.',
    },
    {
        name: 'Bachelorette Enhancements',
        slug: 'bachelorette-enhancements',
        description: 'Elegant accessories and gifts to elevate your bachelorette celebration.',
    },
    {
        name: 'Wedding Day Essentials',
        slug: 'wedding-day-essentials',
        description: 'Must-have essentials to make your wedding day unforgettable.',
    },
];

const CATEGORY_SLUGS = CATEGORIES.map(c => c.slug);

// ── Product ───────────────────────────────────────────────────────────
const SLUG = 'bespoke-16oz-acrylic-tumbler';

const productData = {
    name: 'Bespoke 16oz Acrylic Tumbler | Personalized Bridal Party & Wedding Favor',
    slug: SLUG,
    active: true,
    price: 16.00,
    currency: 'USD',
    stock_tracking: false, // Made to Order

    // ── Description ──────────────────────────────────────────────────
    description: `Celebrate your most cherished moments with our bespoke, heirloom-quality tumblers, thoughtfully personalized to honor your bridal party.

• Artisanal Quality: Crafted from premium, BPA-free acrylic for a timeless, elegant feel in hand.

• Enduring Design: Features bespoke, permanent UV printing that flawlessly preserves your custom details without fading or peeling.

• Refined Details: Includes a matching, understated lid and straw for effortless, sophisticated sipping.

• Generous Capacity: Holds a perfect 16 ounces, ideal for toasting with your closest companions.

• Curated Aesthetics: Available in an extensive palette of soft, romantic hues to seamlessly complement your wedding styling.`,

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Luxury Personalized Wedding Tumblers | Bespoke Bridesmaid Gifts',
    meta_description:
        'Discover our elegant, personalized 16oz acrylic tumblers. Perfect for luxury bridesmaid proposals, bridal party favors, and bespoke wedding gifts.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'acrylic tumbler',
        'personalized tumbler',
        'bridesmaid tumbler',
        'bridal party gift',
        'wedding favor',
        'bespoke tumbler',
        'bridesmaid gift',
        'bachelorette tumbler',
        'UV print tumbler',
        'personalized drinkware',
        'custom wedding gift',
        'wedding tumbler',
    ],

    // ── Options: 2 Variant Dropdowns + 2 Custom Text Inputs ──────────
    options: [
        // ─── VARIANT 1: Tumbler Color ───────────────────────────────
        {
            name: 'Tumbler Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Mustard', price: 16.00 },
                { name: 'Burgundy', price: 16.00 },
                { name: 'Rose', price: 16.00 },
                { name: 'Beige', price: 16.00 },
                { name: 'Cream', price: 16.00 },
                { name: 'Dusty Green', price: 16.00 },
                { name: 'Dusty Blue', price: 16.00 },
                { name: 'Silver Lilac', price: 16.00 },
                { name: 'Lt. Yellow', price: 16.00 },
                { name: 'Yellow', price: 16.00 },
                { name: 'Lt. Orange', price: 16.00 },
                { name: 'Orange', price: 16.00 },
                { name: 'Coral', price: 16.00 },
                { name: 'Sea Green', price: 16.00 },
                { name: 'Lt. Green', price: 16.00 },
                { name: 'Teal', price: 16.00 },
                { name: 'Pink Coral', price: 16.00 },
                { name: 'Lilac', price: 16.00 },
                { name: 'Pink', price: 16.00 },
                { name: 'Aqua', price: 16.00 },
                { name: 'Lt. Blue', price: 16.00 },
                { name: 'Purple', price: 16.00 },
                { name: 'Black', price: 16.00 },
                { name: 'Grey', price: 16.00 },
                { name: 'White', price: 16.00 },
                { name: 'Bright Pink', price: 16.00 },
                { name: 'Red', price: 16.00 },
                { name: 'Brt. Orange', price: 16.00 },
                { name: 'Blue', price: 16.00 },
                { name: 'Green', price: 16.00 },
                { name: 'Lt. Purple', price: 16.00 },
                { name: 'Periwinkle', price: 16.00 },
                { name: 'Brt. Blue', price: 16.00 },
                { name: 'Dark Teal', price: 16.00 },
            ],
        },

        // ─── VARIANT 2: Print Style ─────────────────────────────────
        {
            name: 'Print Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'UV Print - Darker Tone' },
                { name: 'UV Print - Black' },
                { name: 'UV Print - White' },
            ],
        },

        // ─── TEXT INPUT 1: Personalized Name (Required) ─────────────
        {
            name: 'Personalized Name',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Please enter the name exactly as you wish it to appear.',
        },

        // ─── TEXT INPUT 2: Font Selection (Required) ─────────────────
        {
            name: 'Font Selection',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Please enter your preferred font number 1-40.',
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
            typography: 'Playfair Display / Cormorant Garamond — Serif headers',
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

    for (const cat of CATEGORIES) {
        const result = await swell.get('/categories', { where: { slug: cat.slug } });
        if (result && result.results && result.results.length > 0) {
            categoryIds.push(result.results[0].id);
            console.log(`  ✅ Exists: "${cat.name}" → ${result.results[0].id}`);
        } else {
            const created = await swell.post('/categories', {
                name: cat.name,
                slug: cat.slug,
                active: true,
                description: cat.description,
                meta_title: `${cat.name} | Custom Wedding Co.`,
            });
            categoryIds.push(created.id);
            console.log(`  🆕 Created: "${cat.name}" → ${created.id}`);
        }
    }

    return categoryIds;
}

async function run() {
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  Bespoke 16oz Acrylic Tumbler — Swell Product Upload         ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

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
                    filename: 'acrylic-tumbler-thumbnail.' + ext,
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

        // Fallback fetch
        if (!pid) {
            console.log('\n  ⚠️  Fetching by slug...');
            const fetched = await swell.get('/products', { where: { slug: SLUG } });
            if (fetched && fetched.results && fetched.results.length > 0) {
                product = fetched.results[0];
            }
        }

        console.log('');
        console.log(`  ID       : ${product && product.id}`);
        console.log(`  Name     : ${product && product.name}`);
        console.log(`  Slug     : ${product && product.slug}`);
        console.log(`  Price    : $${product && product.price}`);
        console.log(`  Active   : ${product && product.active}`);
        console.log(`  Options  : ${(product && product.options && product.options.length) || 0}`);
        console.log(`  Images   : ${(product && product.images && product.images.length) || 0}`);
        console.log(`  Variants : 34 Tumbler Colors × 3 Print Styles = ${34 * 3} combos`);

        // ── Step 4: Link categories ──────────────────────────────────
        const finalPid = product && product.id;
        if (finalPid) {
            console.log('\nSTEP 4 · Linking categories...');
            for (const slug of CATEGORY_SLUGS) {
                const catResult = await swell.get('/categories', { where: { slug } });
                if (catResult && catResult.results && catResult.results.length > 0) {
                    await swell.post(`/products/${finalPid}/categories`, {
                        parent_id: finalPid,
                        category_id: catResult.results[0].id,
                    });
                    console.log(`  ✅ Linked: ${slug}`);
                } else {
                    console.log(`  ⚠️  Not found: ${slug}`);
                }
            }
        }

        console.log('\n╔════════════════════════════════════════════════════════════════╗');
        console.log('║  🎉 Product is LIVE in Swell!                                ║');
        console.log('╚════════════════════════════════════════════════════════════════╝');
        console.log('\nSummary:');
        console.log('  Variant 1: Tumbler Color (34 values, base $16.00)');
        console.log('  Variant 2: Print Style (3 values)');
        console.log('  Custom Fields: Personalized Name (required), Font Selection (required)');
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
