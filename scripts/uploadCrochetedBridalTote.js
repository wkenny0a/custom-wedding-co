/**
 * Creates the "Bespoke Hand-Crocheted Bridal Tote" product in Swell.
 *
 * Includes:
 *   - 2 variant options: Bag Color (8 values), Embroidery Yarn Color (20 values)
 *   - 1 custom text input: Personalization (required, max 9 chars)
 *   - Brand-styled HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Product image upload (pass path as CLI arg)
 *
 * Run:  node scripts/uploadCrochetedBridalTote.js [path/to/image.png]
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-hand-crocheted-bridal-tote';

const productData = {
    name: 'Bespoke Hand-Crocheted Bridal Tote | Personalized Heirloom Beach Bag',
    slug: SLUG,
    active: true,
    price: 25.00,
    currency: 'USD',
    stock_tracking: false,

    // ── Rich HTML description — luxury minimalist brand voice ─────────
    description: `
<div style="font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">

  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">
    Celebrate Your Most Cherished Moments.
  </p>

  <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">
    A Timeless Companion for Your Romantic Getaways
  </h2>

  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">
    Celebrate your most cherished moments with our bespoke, hand-crocheted tote, thoughtfully personalized to serve as a timeless companion for your romantic getaways and bridal party celebrations.
  </p>

  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Craftsmanship</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Meticulously hand-crocheted using breathable, premium cotton for a delicate, hollow-weave texture that feels effortlessly romantic.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Personalization</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Custom-embroidered with your chosen name to create a truly one-of-a-kind heirloom piece.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Elegance</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Designed with soft, sturdy handles for a comfortable carry from the bridal suite to the shoreline.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Curated Palette</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Available in a selection of warm, nature-inspired hues to perfectly complement your luxury wedding aesthetic.
    </li>
    <li style="padding: 0.8em 0;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">The Perfect Keepsake</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      An intimate, handcrafted gift ideal for bridesmaid proposals, destination bachelorettes, or your honeymoon escape.
    </li>
  </ul>

</div>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Custom Hand-Crocheted Bridal Beach Tote | Luxury Bridesmaid Gift',
    meta_description:
        'Discover our bespoke hand-crocheted beach totes. Intimately personalized and exquisitely crafted, these elegant bags are the perfect heirloom gift for bridesmaids, bachelorette weekends, and romantic getaways.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'crocheted tote',
        'bridal beach bag',
        'bridesmaid gift',
        'personalized tote',
        'hand-crocheted bag',
        'honeymoon bag',
        'destination wedding',
        'bachelorette gift',
        'heirloom tote',
        'custom bridal bag',
    ],

    // ── Options: 2 Variants + 1 Custom Text Input ────────────────────
    options: [
        // ─── VARIANT 1: Bag Color ────────────────────────────────────
        {
            name: 'Bag Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Beige' },
                { name: 'Olive Green' },
                { name: 'Brown' },
                { name: 'Yellow' },
                { name: 'Rose Pink' },
                { name: 'Cyan' },
                { name: 'Nude Pink' },
                { name: 'Red' },
            ],
        },

        // ─── VARIANT 2: Embroidery Yarn Color ────────────────────────
        {
            name: 'Embroidery Yarn Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'White' },
                { name: 'Cream' },
                { name: 'Light Yellow' },
                { name: 'Orange' },
                { name: 'Khaki' },
                { name: 'Light Pink' },
                { name: 'Apple Green' },
                { name: 'Grass Green' },
                { name: 'Light Green' },
                { name: 'Mint Green' },
                { name: 'Blue' },
                { name: 'Light Blue' },
                { name: 'Light Purple' },
                { name: 'Olive Green' },
                { name: 'Brown' },
                { name: 'Black' },
                { name: 'Red' },
                { name: 'Rose pink' },
                { name: 'Font + Icon' },
                { name: 'No bag, only icon' },
            ],
        },

        // ─── TEXT INPUT: Personalization (Max 9 Characters) ──────────
        {
            name: 'Personalization (Max 9 Characters)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description:
                'Please enter the name or wording you would like embroidered on your tote (maximum 9 characters).',
        },
    ],

    // ── Design / Frontend Notes ──────────────────────────────────────
    content: {
        design_notes: {
            vibe: 'Luxury minimalist wedding. Hand-crocheted heirloom quality, timeless bohemian elegance. Warm, romantic, premium.',
            primary_color: '#4A2C2A',
            background_color: '#F7EFE3',
            accent_gold: '#B89A52',
            soft_blush: '#F2D9D9',
            typography: 'Playfair Display / Cormorant Garamond',
            label_style: 'Uppercase tracking for labels, elegant italics for quotes',
            visual_style: 'Clean, minimal, generous whitespace. Delicate botanical line-art flourishes.',
            brand_voice: 'Celebrate Your Most Cherished Moments.',
        },
    },
};

// ── Category slugs to create / link ──────────────────────────────────
const CATEGORIES = [
    { name: 'Luxury Bridesmaid Gifts',            slug: 'luxury-bridesmaid-gifts' },
    { name: 'Destination Wedding Essentials',     slug: 'destination-wedding-essentials' },
    { name: 'Personalized Bridal Accessories',    slug: 'personalized-bridal-accessories' },
    { name: 'Honeymoon & Travel',                 slug: 'honeymoon-and-travel' },
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
const IMAGE_PATH = process.argv[2] || '';

async function ensureCategories() {
    console.log('Ensuring categories exist...');
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
                description: `Luxury ${cat.name.toLowerCase()} for your bespoke wedding.`,
                meta_title: `${cat.name} | Custom Wedding Co.`,
            });
            categoryIds.push(created.id);
            console.log(`  🆕 Created: "${cat.name}" → ${created.id}`);
        }
    }
    return categoryIds;
}

async function uploadProduct() {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║  Bespoke Hand-Crocheted Bridal Tote — Upload           ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
        process.exit(1);
    }

    try {
        // ── Create / resolve categories ──────────────────────────────
        const categoryIds = await ensureCategories();
        if (categoryIds.length > 0) {
            productData.category_index = { id: categoryIds };
        }
        console.log('');

        // ── Attach image if path provided ────────────────────────────
        if (IMAGE_PATH && fs.existsSync(IMAGE_PATH)) {
            const imgBuffer = fs.readFileSync(IMAGE_PATH);
            const base64 = imgBuffer.toString('base64');
            const ext = path.extname(IMAGE_PATH).slice(1).toLowerCase();
            const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
            productData.images = [{
                file: {
                    data: base64,
                    content_type: mimeType,
                    filename: 'bespoke-hand-crocheted-bridal-tote-main.' + ext,
                },
            }];
            console.log('Image attached: ' + path.basename(IMAGE_PATH));
        } else if (IMAGE_PATH) {
            console.log('⚠️  Image not found: ' + IMAGE_PATH);
        }

        // ── Check for existing product ───────────────────────────────
        const existing = await swell.get('/products', { where: { slug: SLUG } });

        if (existing && existing.results && existing.results.length > 0) {
            console.log(`Product already exists (ID: ${existing.results[0].id}). Updating...`);
            const updated = await swell.put(`/products/${existing.results[0].id}`, productData);
            console.log(`\n✅ Successfully updated product!`);
            console.log(`   Name     : ${updated.name}`);
            console.log(`   Slug     : ${updated.slug}`);
            console.log(`   Price    : $${updated.price}`);
            console.log(`   Active   : ${updated.active}`);
            console.log(`   Options  : ${updated.options?.length || 0}`);
            console.log(`   Images   : ${updated.images?.length || 0}`);
            console.log(`   Variants : Bag Color (8) × Embroidery Yarn Color (20) = ${8 * 20} combos`);
        } else {
            console.log('Creating new product...');
            const created = await swell.post('/products', productData);
            console.log(`\n✅ Successfully created product!`);
            console.log(`   ID       : ${created.id}`);
            console.log(`   Name     : ${created.name}`);
            console.log(`   Slug     : ${created.slug}`);
            console.log(`   Price    : $${created.price}`);
            console.log(`   Active   : ${created.active}`);
            console.log(`   Options  : ${created.options?.length || 0}`);
            console.log(`   Images   : ${created.images?.length || 0}`);
            console.log(`   Variants : Bag Color (8) × Embroidery Yarn Color (20) = ${8 * 20} combos`);
        }

        console.log('\n🎉 Done! Product is LIVE in Swell.\n');
        console.log('Next steps:');
        console.log('  1. Run syncProductsToSanity.js to sync to your Sanity CMS');
        console.log(`  2. Visit: https://custom-wedding-co.vercel.app/products/${SLUG}`);
    } catch (error) {
        console.error('❌ Error uploading product:', error.message || error);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

uploadProduct();
