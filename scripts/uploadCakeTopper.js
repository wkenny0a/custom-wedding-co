/**
 * Creates the "Personalized Heirloom Wedding Cake Topper" product in Swell.
 *
 * Includes:
 *   - Image upload from generated thumbnail
 *   - 1 variant option: Finish Color (18 values)
 *   - 1 required custom text input: Last Name for Custom Calligraphy
 *   - Rich HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Active (published) status
 *
 * Run:  node scripts/uploadCakeTopper.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'personalized-heirloom-wedding-cake-topper';

const IMAGE_PATH = '/Users/kenny/.gemini/antigravity/brain/f538587b-5247-4c32-87ef-fd6f889a7236/cake_topper_thumbnail_1773360129375.png';

const productData = {
    name: 'Personalized Heirloom Wedding Cake Topper | Custom Calligraphy Mr. & Mrs. Centerpiece',
    slug: SLUG,
    active: true,
    currency: 'USD',

    // ── Rich HTML description ─────────────────────────────────────
    description: `
<p><em>Crown your celebration of love with a meticulously handcrafted, custom cake topper that transforms your wedding dessert into a timeless, bespoke heirloom.</em></p>

<ul>
  <li><strong>Artisanal Craftsmanship</strong> — Delicately laser-cut from premium wood and hand-finished with loving precision to ensure a flawless, museum-quality presentation.</li>
  <li><strong>Bespoke Elegance</strong> — Custom-tailored with your shared name in sweeping, romantic calligraphy that intimately captures your unique love story.</li>
  <li><strong>Perfectly Proportioned</strong> — Thoughtfully scaled to approximately 6" wide by 8" tall, designed to gracefully complement 5" to 7" artisanal cakes without overwhelming them.</li>
  <li><strong>A Palette of Romance</strong> — Available in 18 exquisite finishes—from lustrous Antique Gold to soft Boho Cream—to perfectly harmonize with your minimalist wedding palette.</li>
  <li><strong>An Enduring Keepsake</strong> — Crafted not just as a fleeting detail for your reception, but as a cherished, tangible memory of the day two became one.</li>
</ul>

<p><em>"Celebrate Love with a Personal Touch."</em></p>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────
    meta_title: 'Custom Heirloom Wedding Cake Topper | Luxury Personalized Mr. & Mrs. Calligraphy',
    meta_description:
        'Celebrate love with a personal touch. Discover our handcrafted, luxury wooden wedding cake toppers. Featuring custom calligraphy, bespoke finishes, and timeless elegance.',

    // ── Tags ──────────────────────────────────────────────────────
    tags: [
        'cake topper',
        'wedding cake topper',
        'custom cake topper',
        'personalized cake topper',
        'mr and mrs',
        'calligraphy cake topper',
        'wooden cake topper',
        'heirloom wedding',
        'luxury wedding',
        'bespoke wedding',
        'wedding decor',
        'wedding keepsake',
    ],

    // ── Options: 1 Variant + 1 Custom Text Input ─────────────────
    options: [
        // ─── VARIANT 1: Finish Color ────────────────────────────
        {
            name: 'Finish Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Gold' },
                { name: 'Silver' },
                { name: 'Rose Gold' },
                { name: 'Natural Wood' },
                { name: 'Black' },
                { name: 'White' },
                { name: 'Gold Mirror' },
                { name: 'Rose Gold Mirror' },
                { name: 'Silver Mirror' },
                { name: 'Copper Mirror' },
                { name: 'Dusty Rose' },
                { name: 'Pastel Green' },
                { name: 'Pastel Lilac' },
                { name: 'Pastel Mint' },
                { name: 'Navy Blue' },
                { name: 'Burgundy' },
                { name: 'Boho Cream' },
                { name: 'Emerald Green' },
            ],
        },

        // ─── TEXT INPUT: Last Name for Custom Calligraphy (Required) ──
        {
            name: 'Last Name for Custom Calligraphy (e.g., Stevenson)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the last name you would like rendered in romantic calligraphy on your custom cake topper.',
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
    { name: 'Wedding Decor',                  slug: 'wedding-decor' },
    { name: 'Cake & Dessert Accessories',      slug: 'cake-dessert-accessories' },
    { name: 'Personalized Keepsakes',          slug: 'personalized-keepsakes' },
    { name: 'Bespoke Wedding Details',         slug: 'bespoke-wedding-details' },
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
        filename: 'personalized-heirloom-wedding-cake-topper-thumbnail.png',
    };

    console.log(`  ✅ Image prepared (${(imageData.length / 1024).toFixed(0)} KB)`);
    return file;
}

async function uploadProduct() {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Creating Personalized Heirloom Wedding Cake Topper  ║');
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
            console.log(`   Variants : Finish Color (18)`);
        } else {
            console.log('Creating new product...');
            const created = await swell.post('/products', productData);
            console.log(`\n✅ Successfully created product!`);
            console.log(`   ID       : ${created.id}`);
            console.log(`   Name     : ${created.name}`);
            console.log(`   Slug     : ${created.slug}`);
            console.log(`   Active   : ${created.active}`);
            console.log(`   Options  : ${created.options?.length || 0}`);
            console.log(`   Variants : Finish Color (18)`);
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
