/**
 * Creates the "Bespoke Matte Acrylic Tumbler | Personalized Bridal Party Heirloom"
 * product in Swell.
 *
 * Includes:
 *   - 2 variant options: Tumbler Color (23), Lettering Color (38)
 *   - 2 custom text inputs: Primary Name or Title (Required), Secondary Text / Date (Optional)
 *   - Brand-styled description
 *   - SEO metadata
 *   - Category associations
 *   - Primary product image upload
 *
 * Run:  node scripts/uploadMatteTumbler.js [path/to/image.png]
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
        name: 'Bespoke Bridesmaid Gifts',
        slug: 'bespoke-bridesmaid-gifts',
        description: 'Exquisitely crafted, personalized gifts for your cherished bridesmaids.',
    },
    {
        name: 'Bridal Party Accessories',
        slug: 'bridal-party-accessories',
        description: 'Elegant accessories to complete your bridal party\'s look.',
    },
    {
        name: 'Luxury Wedding Keepsakes',
        slug: 'luxury-wedding-keepsakes',
        description: 'Timeless heirloom-quality keepsakes to treasure beyond the wedding day.',
    },
    {
        name: 'Personalized Drinkware',
        slug: 'personalized-drinkware',
        description: 'Custom drinkware crafted with care and bespoke personalization.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
const SLUG = 'bespoke-matte-acrylic-tumbler';

const productData = {
    name: 'Bespoke Matte Acrylic Tumbler | Personalized Bridal Party Heirloom',
    slug: SLUG,
    active: true,
    price: 14.95,
    currency: 'USD',
    stock_tracking: false, // Made to Order

    // ── Description ──────────────────────────────────────────────────
    description: `Elevate your wedding morning with our bespoke, soft-touch matte tumblers, intimately personalized to celebrate your most cherished loved ones.

• Artisanal Personalization: Elegantly crafted with custom vinyl lettering, offering up to two lines of bespoke text to beautifully honor your bridal party.

• Sensory Soft-Matte Finish: A luxurious, sweat-proof rubber matte texture that feels exquisite in hand while keeping beverages beautifully contained.

• Timeless & Practical Design: Features a secure twist-on lid, matching straw, and double-wall insulation to maintain your drink's ideal temperature gracefully.

• Premium Mindful Materials: Carefully crafted from high-grade, BPA-free, and non-toxic acrylic for a pristine and safe sipping experience.

• An Unforgettable Heirloom: A thoughtful, romantic keepsake that extends the magic of your wedding day or intimate celebration well beyond the final toast.`,

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Personalized Luxury Bridesmaid Tumblers | Custom Matte Acrylic Cups',
    meta_description:
        'Gift your bridal party a touch of everyday luxury with our personalized, soft-matte acrylic tumblers. Featuring bespoke lettering and a timeless design, these sweat-proof cups are the perfect heirloom for your wedding morning.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'bridesmaid tumbler',
        'custom tumbler',
        'matte acrylic cup',
        'personalized drinkware',
        'bridal party gift',
        'wedding keepsake',
        'bespoke tumbler',
        'bridesmaid gift',
        'wedding morning',
        'luxury drinkware',
        'custom wedding gift',
        'heirloom tumbler',
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
                { name: 'Black' },
                { name: 'White' },
                { name: 'Bleached Sand' },
                { name: 'Mocha' },
                { name: 'Peach Blush' },
                { name: 'Mustard' },
                { name: 'Navy' },
                { name: 'Dusty Blue' },
                { name: 'Sapphire' },
                { name: 'Cornflower' },
                { name: 'Teal Lagoon' },
                { name: 'Sage Green' },
                { name: 'Maroon' },
                { name: 'Dusty Rose' },
                { name: 'D. Purple' },
                { name: 'D. Pink' },
                { name: 'Pale Purple' },
                { name: 'Pale Pink' },
                { name: 'Pale Blue' },
                { name: 'Coral' },
                { name: 'Watermelon' },
                { name: 'Plumberry' },
                { name: 'Tangerine' },
            ],
        },

        // ─── VARIANT 2: Lettering Color ─────────────────────────────
        {
            name: 'Lettering Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'White' },
                { name: 'Black' },
                { name: 'Light Grey' },
                { name: 'Grey' },
                { name: 'Dark Grey' },
                { name: 'Cream' },
                { name: 'Burgundy' },
                { name: 'Wine' },
                { name: 'Red' },
                { name: 'Orange' },
                { name: 'Soft Pink' },
                { name: 'Hot Pink' },
                { name: 'Coral' },
                { name: 'Peach' },
                { name: 'Lilac' },
                { name: 'Lavender' },
                { name: 'Purple' },
                { name: 'Violet' },
                { name: 'Pale Pink' },
                { name: 'Pale Blue' },
                { name: 'Light Blue' },
                { name: 'Blue' },
                { name: 'Dark Blue' },
                { name: 'Mint' },
                { name: 'Seaglass' },
                { name: 'Green' },
                { name: 'Lime Green' },
                { name: 'Beige' },
                { name: 'Brown' },
                { name: 'Metallic Rose Gold' },
                { name: 'Metallic Copper' },
                { name: 'Metallic Silver' },
                { name: 'Metallic Gold' },
                { name: 'Turquoise' },
                { name: 'Teal' },
                { name: 'Sage' },
                { name: 'Dark Green' },
                { name: 'Yellow' },
                { name: 'Light Brown' },
            ],
        },

        // ─── TEXT INPUT 1: Primary Name or Title (Required) ─────────
        {
            name: 'Primary Name or Title',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the primary name or title for the tumbler (e.g. "BRIDE", "Maid of Honor", "Sarah").',
        },

        // ─── TEXT INPUT 2: Secondary Text / Date (Optional) ─────────
        {
            name: 'Secondary Text / Date',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description: 'Optional — Add a second line of text such as a wedding date, subtitle, or endearment (e.g. "June 15, 2026").',
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
    console.log('║  Bespoke Matte Acrylic Tumbler — Swell Product Upload        ║');
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
                    filename: 'matte-acrylic-tumbler-thumbnail.' + ext,
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
        console.log(`  Variants : 23 Tumbler Colors × 38 Lettering Colors = ${23 * 38} combos`);

        console.log('\n╔════════════════════════════════════════════════════════════════╗');
        console.log('║  🎉 Product is LIVE in Swell!                                ║');
        console.log('╚════════════════════════════════════════════════════════════════╝');
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
