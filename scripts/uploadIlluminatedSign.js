/**
 * Creates the "Bespoke Illuminated Wedding Name Sign" product in Swell.
 *
 * Includes:
 *   - 3 variant options: Size (13 values), Layout Style (3), Illumination Color (12)
 *   - 4 custom text inputs: Custom Text, Typography Preference, Symbol, Bespoke Requests
 *   - Brand-styled HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Design notes stored in content
 *
 * Run:  node scripts/uploadIlluminatedSign.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-illuminated-wedding-name-sign';

const productData = {
    name: 'Bespoke Illuminated Wedding Name Sign | Luxury Custom Heirloom Decor',
    slug: SLUG,
    active: true,
    price: 89.00,
    currency: 'USD',

    // ── Rich HTML description — luxury minimalist brand voice ─────────
    description: `
<p><em>Illuminate your celebration of love with a bespoke, handcrafted name sign that brings timeless elegance and warm romance to your wedding aesthetic.</em></p>

<p>Each sign is meticulously designed and artisan-crafted to become a treasured heirloom — a luminous centerpiece that captures the warmth and intimacy of your most cherished day.</p>

<ul>
  <li><strong>Artisanal Craftsmanship</strong> — Meticulously handcrafted to be a high-end, heirloom-quality keepsake, built to last a lifetime and beyond.</li>
  <li><strong>Timeless Typography</strong> — Personalized with your choice of elegant, widely-spaced serif fonts or flowing scripts, reflecting your unique love story.</li>
  <li><strong>Curated Illumination</strong> — Provides a soft, romantic glow designed to enhance photography and create intimate, unforgettable settings.</li>
  <li><strong>Bespoke Detailing</strong> — Customize your piece with delicate additions like subtle heart symbols, ampersands, or custom layouts for a truly one-of-a-kind design.</li>
  <li><strong>Premium Presentation</strong> — Mounted on flawless clear acrylic with a pristine clear power cord and premium mounting hardware included.</li>
</ul>

<p><em>"Celebrate Love with a Personal Touch."</em></p>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Bespoke Custom Wedding Name Sign | Luxury Heirloom Reception Decor',
    meta_description:
        'Elevate your wedding aesthetic with a luxury custom illuminated name sign. Handcrafted with timeless elegance, this bespoke piece adds a warm, romantic glow to your celebration. Customize your heirloom today.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'wedding sign',
        'neon sign',
        'illuminated sign',
        'custom name sign',
        'wedding decor',
        'reception lighting',
        'bespoke wedding',
        'luxury wedding',
        'heirloom decor',
        'personalized sign',
        'wedding ambiance',
        'custom wedding gift',
    ],

    // ── Options: 3 Variants + 4 Custom Text Inputs ───────────────────
    options: [
        // ─── VARIANT 1: Size ──────────────────────────────────────────
        {
            name: 'Sign Size',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: '10"',  price: 0 },
                { name: '12"',  price: 15 },
                { name: '16"',  price: 35 },
                { name: '20"',  price: 55 },
                { name: '25"',  price: 85 },
                { name: '27"',  price: 100 },
                { name: '30"',  price: 130 },
                { name: '35"',  price: 170 },
                { name: '40"',  price: 220 },
                { name: '45"',  price: 270 },
                { name: '47"',  price: 300 },
                { name: '55"',  price: 400 },
                { name: '60"',  price: 480 },
            ],
        },

        // ─── VARIANT 2: Layout Style ─────────────────────────────────
        {
            name: 'Layout Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'One Row' },
                { name: 'Staggered (Popular)', price: 10 },
                { name: 'Two Rows', price: 10 },
            ],
        },

        // ─── VARIANT 3: Illumination Color ───────────────────────────
        {
            name: 'Illumination Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Warm Cream' },
                { name: 'Antique Gold' },
                { name: 'Pale Rose' },
                { name: 'Espresso Glow' },
                { name: 'Champagne Shimmer' },
                { name: 'Ivory Linen' },
                { name: 'Dusty Mauve' },
                { name: 'Soft Peach' },
                { name: 'Crystal White' },
                { name: 'Vintage Amber' },
                { name: 'Blush Petal' },
                { name: 'Candlelight' },
            ],
        },

        // ─── TEXT INPUT 1: Custom Text (Required) ────────────────────
        {
            name: 'Custom Text / Name',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the exact name(s) or phrase you would like illuminated — e.g. "Sarah & James"',
        },

        // ─── TEXT INPUT 2: Typography Preference (Required) ──────────
        {
            name: 'Typography Preference',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Specify your preferred font style — e.g. Classic Serif, Flowing Script, Modern Minimal',
        },

        // ─── TEXT INPUT 3: Symbol (Optional) ─────────────────────────
        {
            name: 'Add a Symbol',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description: 'Optional — Request a subtle symbol such as a heart, ampersand, or star',
        },

        // ─── TEXT INPUT 4: Bespoke Requests (Optional) ───────────────
        {
            name: 'Bespoke Requests',
            variant: false,
            active: true,
            required: false,
            input_type: 'long_text',
            description: 'Optional — Any special notes for our artisans (layout preferences, inspiration images, etc.)',
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
            framing: 'Frame as bespoke illumination, not cheap neon. Artisanal, intimate, warm.',
            brand_voice: 'Celebrate Love with a Personal Touch.',
        },
    },
};

// ── Category slugs to create / link ──────────────────────────────────
const CATEGORIES = [
    { name: 'Wedding Decor & Accents',           slug: 'wedding-decor-accents' },
    { name: 'Luxury Wedding Signage',             slug: 'luxury-wedding-signage' },
    { name: 'Reception Lighting & Ambiance',      slug: 'reception-lighting-ambiance' },
    { name: 'Bespoke Wedding Gifts',              slug: 'bespoke-wedding-gifts' },
];

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
    console.log('║  Creating Bespoke Illuminated Wedding Name Sign      ║');
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
            console.log(`   Variants : Size (13) × Layout (3) × Color (12) = ${13 * 3 * 12} combos`);
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
            console.log(`   Variants : Size (13) × Layout (3) × Color (12) = ${13 * 3 * 12} combos`);
        }

        console.log('\n🎉 Done! Product is live in Swell.\n');
        console.log('Next steps:');
        console.log('  1. Add product images in the Swell dashboard');
        console.log('  2. Run syncProductsToSanity.js to sync to your Sanity CMS');
        console.log(`  3. Visit: https://custom-wedding-co.vercel.app/products/${SLUG}`);
    } catch (error) {
        console.error('❌ Error uploading product:', error.message || error);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

uploadProduct();
