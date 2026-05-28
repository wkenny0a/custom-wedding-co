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
const fs = require('fs');
const path = require('path');

const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID || 'customweddingco';
const secretKey = process.env.NEXT_PUBLIC_SWELL_SECRET_KEY || 'sk_bOFKfMVRD6jXYe4y6wy7xdZeqKJdYtjn';
const authHeader = 'Basic ' + Buffer.from(storeId + ':' + secretKey).toString('base64');

const swell = {
    async get(endpoint, params) {
        let url = `https://api.swell.store${endpoint}`;
        if (params && params.where) {
            const query = new URLSearchParams();
            for (const key in params.where) {
                query.append(`where[${key}]`, params.where[key]);
            }
            url += '?' + query.toString();
        }
        const res = await fetch(url, { headers: { Authorization: authHeader, 'Accept': 'application/json' }});
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    async post(endpoint, body) {
        const url = `https://api.swell.store${endpoint}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { Authorization: authHeader, 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    async put(endpoint, body) {
        const url = `https://api.swell.store${endpoint}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: { Authorization: authHeader, 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    async delete(endpoint) {
        const url = `https://api.swell.store${endpoint}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { Authorization: authHeader, 'Accept': 'application/json' },
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};

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

    // ── Options ───────────────────────────────────────────────────────
    options: [
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
        {
            name: 'Design Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Design #1' },
                { name: 'Design #2' },
                { name: 'Design #3' },
                { name: 'Design #4' },
                { name: 'Design #5' },
                { name: 'Design #6' },
                { name: 'Design #7' },
                { name: 'Design #8' },
                { name: 'Design #9' },
                { name: 'Design #10' },
                { name: 'Design #11' },
                { name: 'Design #12 (Custom Design)' },
            ],
        },
        {
            name: 'Font color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Black' },
                { name: 'Gold' },
            ],
        },
        {
            name: 'Names or Initials',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the names or initials exactly as you would like them engraved.',
        },
        {
            name: 'Event Date',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'e.g. October 12, 2026',
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
            console.log(`Product already exists (ID: ${existing.results[0].id}). Clearing old options explicitly...`);
            const prod = existing.results[0];
            if (prod.options && prod.options.length > 0) {
                for (let i = 0; i < prod.options.length; i++) {
                    await swell.delete(`/products/${prod.id}/options/${prod.options[i].id}`);
                }
            }
            console.log(`Updating product with newly formatted options...`);
            const updated = await swell.put(`/products/${prod.id}`, productData);
            console.log(`\n✅ Successfully updated product!`);
            console.log(`   Name     : ${updated.name}`);
            console.log(`   Slug     : ${updated.slug}`);
            console.log(`   Active   : ${updated.active}`);
            console.log(`   Options  : ${updated.options?.length || 0}`);
            console.log(`   Variants : Quantity (12) × Design Style (12) = ${12 * 12} combos`);
        } else {
            console.log('Creating new product...');
            const created = await swell.post('/products', productData);
            console.log(`\n✅ Successfully created product!`);
            console.log(`   ID       : ${created.id}`);
            console.log(`   Name     : ${created.name}`);
            console.log(`   Slug     : ${created.slug}`);
            console.log(`   Active   : ${created.active}`);
            console.log(`   Options  : ${created.options?.length || 0}`);
            console.log(`   Variants : Quantity (12) × Design Style (12) = ${12 * 12} combos`);
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
