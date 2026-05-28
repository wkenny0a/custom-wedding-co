/**
 * Creates the "Bespoke Embroidered Heirloom Canvas Tote" product in Swell.
 *
 * Includes:
 *   - 2 variant options: Embroidery Color (20 values), Embroidery Font Style (15 values)
 *   - 1 custom text input: Personalization Details (required)
 *   - Brand-styled HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Product image upload (pass path as CLI arg)
 *
 * Run:  node scripts/uploadHeirloomTote.js [path/to/image.png]
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-embroidered-heirloom-canvas-tote';

const productData = {
    name: 'Bespoke Embroidered Heirloom Canvas Tote | Custom Bridal Party Gift',
    slug: SLUG,
    active: true,
    price: 25.00,
    currency: 'USD',
    stock_tracking: false,

    // ── Rich HTML description — luxury minimalist brand voice ─────────
    description: `
<div style="font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">

  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">
    Celebrate Love with a Personal Touch.
  </p>

  <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">
    A Timeless Keepsake for Your Bridal Party
  </h2>

  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">
    Handcrafted to hold your most cherished wedding weekend essentials, this bespoke heavy-weight canvas tote features elegant, custom embroidery to serve as a timeless keepsake for your bridal party.
  </p>

  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Craftsmanship</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Woven from premium 450g raw cotton gabardine for exceptional durability and structure.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Detailing</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Intimately customized with your choice of classic typography and rich thread colors to complement your wedding aesthetic.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Generous Proportions</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Thoughtfully sized at 45×35×10 cm to effortlessly carry everything from wedding day robes to honeymoon necessities.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Effortless Elegance</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Designed with a minimalist, unbleached soft cream canvas and comfortable 70cm tie-on handles.
    </li>
    <li style="padding: 0.8em 0;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">A Lasting Keepsake</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      More than a gift; a one-of-a-kind, handcrafted memory designed to be cherished long after the vows are spoken.
    </li>
  </ul>

</div>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Luxury Custom Embroidered Bridesmaid Tote Bag | Bespoke Bridal Gifts',
    meta_description:
        'Gift your bridal party a timeless keepsake. Discover our bespoke embroidered canvas tote bags, handcrafted from premium natural cotton gabardine for a luxurious, intimate wedding weekend gift.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'embroidered tote',
        'canvas tote bag',
        'bridesmaid gift',
        'bridal party gift',
        'custom tote',
        'personalized tote bag',
        'wedding weekend bag',
        'bespoke wedding',
        'heirloom keepsake',
        'bridesmaid proposal',
        'wedding favor',
    ],

    // ── Options: 2 Variants + 1 Custom Text Input ────────────────────
    options: [
        // ─── VARIANT 1: Embroidery Color ─────────────────────────────
        {
            name: 'Embroidery Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Black' },
                { name: 'Brown' },
                { name: 'Red' },
                { name: 'Lilac' },
                { name: 'Silver' },
                { name: 'Khaki' },
                { name: 'Purple' },
                { name: 'Pink' },
                { name: 'Navy' },
                { name: 'Yellow' },
                { name: 'Mint' },
                { name: 'Green' },
                { name: 'Turquoise' },
                { name: 'White' },
                { name: 'Orange' },
                { name: 'Blue' },
                { name: 'Dark Grey' },
                { name: 'Baby Blue' },
                { name: 'Gold' },
                { name: 'Beige' },
            ],
        },

        // ─── VARIANT 2: Embroidery Font Style ────────────────────────
        {
            name: 'Embroidery Font Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'No Embroidery' },
                { name: 'Font 1' },
                { name: 'Font 2' },
                { name: 'Font 3' },
                { name: 'Font 4' },
                { name: 'Font 5' },
                { name: 'Font 6' },
                { name: 'Font 7' },
                { name: 'Font 8' },
                { name: 'Font 9' },
                { name: 'Font 10' },
                { name: 'Font 11' },
                { name: 'Font 12' },
                { name: 'Font 13' },
                { name: 'Font 14' },
            ],
        },

        // ─── TEXT INPUT: Personalization Details ─────────────────────
        {
            name: 'Personalization Details',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description:
                'Please enter the name, role, or wording you would like elegantly embroidered on your heirloom tote.',
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
    { name: 'Bespoke Bridal Gifts',           slug: 'bespoke-bridal-gifts' },
    { name: 'Bridesmaid Proposals',            slug: 'bridesmaid-proposals' },
    { name: 'Wedding Weekend Essentials',      slug: 'wedding-weekend-essentials' },
    { name: 'Personalized Keepsakes',          slug: 'personalized-keepsakes' },
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
    console.log('║  Bespoke Embroidered Heirloom Canvas Tote — Upload     ║');
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
                    filename: 'bespoke-embroidered-heirloom-tote-main.' + ext,
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
            console.log(`   Variants : Embroidery Color (20) × Font Style (15) = ${20 * 15} combos`);
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
            console.log(`   Variants : Embroidery Color (20) × Font Style (15) = ${20 * 15} combos`);
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
