/**
 * Creates the "Bespoke Monogram Cocktail Napkins" product in Swell.
 *
 * Includes:
 *   - Image upload from generated thumbnail
 *   - 2 variant options: Quantity (12 values), Napkin Color (20 values)
 *   - 4 required custom text inputs
 *   - Rich HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Active (published) status
 *
 * Run:  node scripts/uploadCocktailNapkins.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-monogram-cocktail-napkins';

const IMAGE_PATH = '/Users/kenny/.gemini/antigravity/brain/c5f568a6-05a5-4b80-bbc8-405e8eed0778/cocktail_napkins_thumbnail_1773357184107.png';

const productData = {
    name: 'Bespoke Monogram Cocktail Napkins | Personalized Heirloom Wedding Details',
    slug: SLUG,
    active: true,
    currency: 'USD',

    // ── Rich HTML description ─────────────────────────────────────
    description: `
<p><em>Elevate your celebration with our bespoke, artisanal cocktail napkins, custom-pressed to add an intimate, personalized touch to your most cherished moments.</em></p>

<ul>
  <li><strong>Premium Quality</strong> — Crafted from luxurious, 3-ply soft-touch paper that feels substantial and premium in hand.</li>
  <li><strong>Bespoke Artistry</strong> — Fully personalized designs featuring classic, widely-spaced serif typography and delicate botanical or beverage motifs.</li>
  <li><strong>Curated Elegance</strong> — Available in a range of romantic hues to seamlessly complement your timeless wedding aesthetic.</li>
  <li><strong>Perfectly Proportioned</strong> — Sized beautifully at 4.75" x 4.75", making them the ideal accompaniment for signature cocktails, hors d'oeuvres, and cake service.</li>
  <li><strong>Intimate Details</strong> — A memorable, heirloom-quality accent that celebrates your unique love story with every sip.</li>
</ul>

<p><em>"Celebrate Love with a Personal Touch."</em></p>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────
    meta_title: 'Bespoke Custom Wedding Cocktail Napkins | Luxury Personalized Barware',
    meta_description:
        'Celebrate love with a personal touch. Shop our luxury custom cocktail napkins for weddings, anniversaries, and engagements. Premium 3-ply, bespoke designs, heirloom quality.',

    // ── Tags ──────────────────────────────────────────────────────
    tags: [
        'cocktail napkins',
        'wedding napkins',
        'custom napkins',
        'monogram napkins',
        'personalized napkins',
        'wedding barware',
        'bespoke wedding',
        'luxury wedding',
        'heirloom wedding',
        'wedding reception',
        'party favors',
        'custom barware',
    ],

    // ── Options: 2 Variants + 4 Custom Text Inputs ───────────────
    options: [
        // ─── VARIANT 1: Quantity ─────────────────────────────────
        {
            name: 'Quantity',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: '50' },
                { name: '100' },
                { name: '150' },
                { name: '200' },
                { name: '250' },
                { name: '300' },
                { name: '350' },
                { name: '400' },
                { name: '500' },
                { name: '1000' },
                { name: '2000' },
                { name: '3000' },
            ],
        },

        // ─── VARIANT 2: Napkin Color ─────────────────────────────
        {
            name: 'Napkin Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Ivory' },
                { name: 'White' },
                { name: 'Mimosa' },
                { name: 'Yellow' },
                { name: 'Black' },
                { name: 'Classic Pink' },
                { name: 'Candy Pink' },
                { name: 'Lavender' },
                { name: 'Orange' },
                { name: 'Red' },
                { name: 'Pastel Blue' },
                { name: 'Fresh Mint' },
                { name: 'Fresh Lime' },
                { name: 'Bermuda Blue' },
                { name: 'Purple' },
                { name: 'Navy' },
                { name: 'Hunter Green' },
                { name: 'Emerald Green' },
                { name: 'Burgundy' },
                { name: 'Cobalt Blue' },
            ],
        },

        // ─── TEXT INPUT 1: Beverage Motif (Required) ─────────────
        {
            name: 'Beverage Motif / Clipart Selection',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Select or describe the beverage motif or clipart you would like on your napkins.',
        },

        // ─── TEXT INPUT 2: Design Layout (Required) ──────────────
        {
            name: 'Design Layout Preference',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Describe your preferred design layout — e.g. centered monogram, border design, corner motif.',
        },

        // ─── TEXT INPUT 3: Custom Text (Required) ────────────────
        {
            name: 'Custom Text (Names, Monogram, Date)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the exact text you would like printed — e.g. "S & J  •  June 2026"',
        },

        // ─── TEXT INPUT 4: Event Date (Required) ─────────────────
        {
            name: 'Event Date / Required Delivery Date',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter your event date and required delivery date so we can ensure timely delivery.',
        },
    ],

    // ── Design / Frontend Notes ──────────────────────────────────
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
    { name: 'Bespoke Barware & Accessories', slug: 'bespoke-barware-accessories' },
    { name: 'Wedding Reception Details',     slug: 'wedding-reception-details' },
    { name: 'Custom Party Favors',           slug: 'custom-party-favors' },
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

async function uploadImage() {
    console.log('Uploading product thumbnail...');

    if (!fs.existsSync(IMAGE_PATH)) {
        console.error(`  ❌ Image not found at: ${IMAGE_PATH}`);
        return null;
    }

    const imageData = fs.readFileSync(IMAGE_PATH).toString('base64');

    const file = {
        data: imageData,
        content_type: 'image/png',
        filename: 'bespoke-monogram-cocktail-napkins-thumbnail.png',
    };

    console.log(`  ✅ Image prepared (${(imageData.length / 1024).toFixed(0)} KB)`);
    return file;
}

async function uploadProduct() {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Creating Bespoke Monogram Cocktail Napkins          ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
        process.exit(1);
    }

    try {
        // ── Upload image ─────────────────────────────────────────────
        const imageFile = await uploadImage();
        if (imageFile) {
            productData.images = [{ file: imageFile }];
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
            console.log(`   Variants : Quantity (12) × Color (20) = ${12 * 20} combos`);
        } else {
            console.log('Creating new product...');
            const created = await swell.post('/products', productData);
            console.log(`\n✅ Successfully created product!`);
            console.log(`   ID       : ${created.id}`);
            console.log(`   Name     : ${created.name}`);
            console.log(`   Slug     : ${created.slug}`);
            console.log(`   Active   : ${created.active}`);
            console.log(`   Options  : ${created.options?.length || 0}`);
            console.log(`   Variants : Quantity (12) × Color (20) = ${12 * 20} combos`);
        }

        console.log('\n🎉 Done! Product is live in Swell.\n');
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
