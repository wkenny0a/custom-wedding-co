/**
 * Creates the "Bespoke Illuminated Script Sign | Heirloom Reception Decor" product in Swell.
 *
 * Includes:
 *   - 3 variant options: Size (8 values), Style Layout (7), Add-on (2)
 *   - 3 custom inputs: Custom Text (required text), Font Selection (required dropdown), Illumination Color (required dropdown)
 *   - Brand-styled HTML description
 *   - SEO metadata
 *   - Category associations
 *
 * Run:  node scripts/uploadIlluminatedScriptSign.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-illuminated-script-sign';

const productData = {
    name: 'Bespoke Illuminated Script Sign | Heirloom Reception Decor',
    slug: SLUG,
    active: true,
    currency: 'USD',

    // ── Rich HTML description — luxury minimalist brand voice ─────────
    description: `<p><em>Elevate your reception with our softly illuminated, handcrafted script—designed to cast a warm, romantic glow over your most cherished moments.</em></p>

<ul>
  <li><strong>Bespoke Artistry:</strong> Individually crafted to beautifully display your new family name, monogram, or a meaningful quote.</li>
  <li><strong>Timeless Glow:</strong> Emits a soft, ambient light that perfectly complements candlelight, natural linen, and delicate floral arrangements.</li>
  <li><strong>Heirloom Quality:</strong> Meticulously mounted on a crystal-clear, barely-there acrylic backing, ensuring the focus remains on your love.</li>
  <li><strong>Seamless Integration:</strong> Includes a discreet dimmer switch, allowing you to easily adjust the warmth and mood of the room as the evening unfolds.</li>
  <li><strong>Effortless Display:</strong> Arrives complete with elegant mounting hardware and a clear, discreet power cord for a flawless, minimalist presentation.</li>
</ul>`,

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Custom Illuminated Wedding Sign | Luxury Reception Decor',
    meta_description:
        'Cast a warm, romantic glow on your special day with a bespoke illuminated wedding sign. Handcrafted, elegant script for timeless, minimalist reception decor.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'illuminated sign',
        'wedding script sign',
        'reception decor',
        'custom wedding sign',
        'bespoke wedding',
        'luxury wedding',
        'heirloom decor',
        'personalized sign',
        'wedding ambiance',
        'intimate',
        'artisanal',
        'bespoke',
    ],

    // ── Options: 3 Variants + 3 Custom Inputs ────────────────────────
    options: [
        // ─── VARIANT 1: Size ──────────────────────────────────────────
        {
            name: 'Size',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: '26 in (65cm)' },
                { name: '30 in (75cm)' },
                { name: '33 in (85cm)' },
                { name: '36 in (90cm)' },
                { name: '40 in (100cm)' },
                { name: '45 in (115cm)' },
                { name: '49 in (125cm)' },
                { name: '59 in (150cm)' },
            ],
        },

        // ─── VARIANT 2: Style Layout ─────────────────────────────────
        {
            name: 'Style Layout',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'One Line - Shape' },
                { name: 'Staggered - Shape' },
                { name: 'Two Lines - Shape' },
                { name: 'One Line - Letters' },
                { name: 'Staggered - Letters' },
                { name: 'Two Lines - Letters' },
                { name: 'Convenient Format' },
            ],
        },

        // ─── VARIANT 3: Add-on ───────────────────────────────────────
        {
            name: 'Add-on',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Standard Dimmer' },
                { name: 'RF Remote Control Included' },
            ],
        },

        // ─── CUSTOM INPUT 1: Custom Text (Required) ──────────────────
        {
            name: 'Custom Text (Name, Monogram, or Quote)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the exact text you would like illuminated — e.g. "The Smiths", "S & J", or a meaningful quote.',
        },

        // ─── CUSTOM INPUT 2: Font Selection (Required Dropdown) ──────
        {
            name: 'Font Selection',
            variant: false,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Playfair Display' },
                { name: 'Cormorant Garamond' },
                { name: 'Elegant Script' },
            ],
        },

        // ─── CUSTOM INPUT 3: Illumination Color (Required Dropdown) ──
        {
            name: 'Illumination Color',
            variant: false,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Warm Ambient White' },
                { name: 'Soft Antique Gold' },
            ],
        },
    ],

    // ── Design / Frontend Notes ──────────────────────────────────────
    content: {
        design_notes: {
            vibe: 'Luxury minimalist wedding. High-end, heirloom quality, timeless elegance. Warm, romantic, premium.',
            brand_voice_tags: ['intimate', 'artisanal', 'bespoke'],
            typography: 'Playfair Display / Cormorant Garamond / Elegant Script',
            visual_style: 'Clean, minimal, generous whitespace. Delicate botanical line-art flourishes.',
            framing: 'Frame as bespoke illumination, not cheap neon. Artisanal, intimate, warm.',
        },
    },
};

// ── Category slugs to create / link ──────────────────────────────────
const CATEGORIES = [
    { name: 'Bespoke Reception Decor',             slug: 'bespoke-reception-decor' },
    { name: 'Personalized Wedding Details',         slug: 'personalized-wedding-details' },
    { name: 'Ambient & Illuminated Accents',        slug: 'ambient-illuminated-accents' },
    { name: 'Heirloom Keepsakes',                   slug: 'heirloom-keepsakes' },
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
    console.log('║  Creating Bespoke Illuminated Script Sign            ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
        process.exit(1);
    }

    try {
        // ── Load main image ─────────────────────────────────────────
        const imagePath = path.resolve(__dirname, '../generated_images/illuminated_script_sign.png');
        if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const base64 = imageData.toString('base64');
            productData.images = [
                {
                    file: {
                        data: base64,
                        filename: 'illuminated-script-sign-main.png',
                        content_type: 'image/png',
                    },
                },
            ];
            console.log('✅ Main image loaded successfully\n');
        } else {
            console.warn('⚠️  Image file not found at:', imagePath);
            console.warn('   Product will be created without an image.\n');
        }

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
            console.log(`   Active   : ${updated.active}`);
            console.log(`   Options  : ${updated.options?.length || 0}`);
        } else {
            console.log('Creating new product...');
            const created = await swell.post('/products', productData);
            console.log(`\n✅ Successfully created product!`);
            console.log(`   ID       : ${created.id}`);
            console.log(`   Name     : ${created.name}`);
            console.log(`   Slug     : ${created.slug}`);
            console.log(`   Active   : ${created.active}`);
            console.log(`   Options  : ${created.options?.length || 0}`);
        }

        console.log('\n🎉 Done! Product is live in Swell.\n');
        console.log('Next steps:');
        console.log('  1. Run syncProductsToSanity.js to sync to Sanity CMS');
        console.log(`  2. Visit: https://custom-wedding-co.vercel.app/products/${SLUG}`);
    } catch (error) {
        console.error('❌ Error uploading product:', error.message || error);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

uploadProduct();
