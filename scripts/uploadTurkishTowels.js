/**
 * Creates the "Personalized Organic Turkish Cotton Towel" product in Swell.
 *
 * Includes:
 *   - 2 variant options: Color (22 values), Size & Personalization (4 values)
 *   - 1 custom text input: Personalization Details
 *   - Brand-styled HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Product image upload (pass path as CLI arg)
 *
 * Run:  node scripts/uploadTurkishTowels.js [path/to/image.png]
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'personalized-organic-turkish-cotton-towel';

const productData = {
    name: 'Personalized Organic Turkish Cotton Towel | Bespoke Bridal Party Gift & Wedding Favor',
    slug: SLUG,
    active: true,
    price: 24.99,
    currency: 'USD',
    stock_tracking: false,

    // ── Rich HTML description — luxury minimalist brand voice ─────────
    description: `
<div style="font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">

  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">
    Celebrate Love with a Personal Touch.
  </p>

  <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">
    Wrap Your Bridal Party in Luxury
  </h2>

  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">
    Wrap your bridal party in luxury with our heirloom-quality, custom-embroidered Turkish cotton towels, designed to celebrate your love with a personal touch.
  </p>

  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Craftsmanship</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Handwoven from 100% OEKO-TEX certified organic Turkish cotton for an ultra-soft, premium feel.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Embroidery</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Elegantly personalized with names, initials, or meaningful dates to create a truly one-of-a-kind keepsake.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Elegance</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      A minimalist, sand-free design that effortlessly transitions from destination wedding beaches to your everyday sanctuary.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Featherlight & Absorbent</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Quick-drying and highly absorbent without the bulk, making it the perfect travel companion for honeymooners and bridesmaids alike.
    </li>
    <li style="padding: 0.8em 0;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Quality</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Crafted with love and intentionality to serve as a lasting memento of your most special day.
    </li>
  </ul>

</div>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Personalized Organic Turkish Towels | Luxury Bridesmaid Gifts',
    meta_description:
        'Elevate your bridal party gifts with our bespoke, organic Turkish cotton towels. Custom embroidered and heirloom-quality to celebrate love with a personal touch.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'turkish towel',
        'organic cotton towel',
        'personalized towel',
        'custom embroidered towel',
        'bridesmaid gift',
        'bridal party gift',
        'wedding favor',
        'destination wedding',
        'honeymoon gift',
        'luxury towel',
        'bespoke wedding',
        'heirloom keepsake',
    ],

    // ── Options: 2 Variants + 1 Custom Text Input ────────────────────
    options: [
        // ─── VARIANT 1: Color ────────────────────────────────────────
        {
            name: 'Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Mint' },
                { name: 'Purple' },
                { name: 'Light Gray' },
                { name: 'Khaki Green' },
                { name: 'Lilac' },
                { name: 'Turquoise' },
                { name: 'Brown' },
                { name: 'Orange' },
                { name: 'Burgundy' },
                { name: 'Benetton Green' },
                { name: 'Baby Blue' },
                { name: 'Beige' },
                { name: 'Petrol Green' },
                { name: 'Powder Pink' },
                { name: 'Mustard' },
                { name: 'Black' },
                { name: 'Light Mint' },
                { name: 'Yellow' },
                { name: 'Blue' },
                { name: 'Fuchsia' },
                { name: 'Sax Blue' },
                { name: 'Random Choice' },
            ],
        },

        // ─── VARIANT 2: Size & Personalization ───────────────────────
        {
            name: 'Size & Personalization',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Hand Towel (20x36) - Blank',             price: 0 },
                { name: 'Hand Towel (20x36) - Custom Embroidery', price: 8 },
                { name: 'Beach Towel (40x71) - Blank',            price: 12 },
                { name: 'Beach Towel (40x71) - Custom Embroidery', price: 20 },
            ],
        },

        // ─── TEXT INPUT: Personalization Details ─────────────────────
        {
            name: 'Personalization Details',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description:
                'Enter name, initials, or date here. Please enter exactly as you want it to appear. Leave blank if you selected a non-personalized option.',
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
            visual_style: 'Clean, minimal, generous whitespace. Delicate botanical line-art flourishes.',
            brand_voice: 'Celebrate Love with a Personal Touch.',
        },
    },
};

// ── Category slugs to create / link ──────────────────────────────────
const CATEGORIES = [
    { name: 'Bespoke Bridal Party Gifts',         slug: 'bespoke-bridal-party-gifts' },
    { name: 'Luxury Wedding Favors',              slug: 'luxury-wedding-favors' },
    { name: 'Destination Wedding Essentials',     slug: 'destination-wedding-essentials' },
    { name: 'Honeymoon & Travel',                 slug: 'honeymoon-travel' },
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
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Personalized Organic Turkish Cotton Towel — Upload  ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

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
                    filename: 'turkish-towel-thumbnail.' + ext,
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
            console.log(`   Variants : Color (22) × Size/Personalization (4) = ${22 * 4} combos`);
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
            console.log(`   Variants : Color (22) × Size/Personalization (4) = ${22 * 4} combos`);
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
