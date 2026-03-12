require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-engraved-wooden-bridal-hangers';

const productData = {
    name: 'Bespoke Engraved Wooden Bridal Hangers | Heirloom Wedding Party Gifts',
    slug: SLUG,
    active: true,
    price: 0, // Placeholder — update in Swell dashboard
    currency: 'USD',

    // ── Rich HTML description in brand voice ──────────────────────────
    description: `
<p><em>Celebrate Love with a Personal Touch.</em></p>

<p>Elevate your wedding morning photography with these artisanal, bespoke wooden hangers, meticulously engraved to honor your bridal party with timeless elegance.</p>

<ul>
  <li><strong>Bespoke Artistry</strong> — Handcrafted from premium natural hardwood and expertly laser-engraved for a flawless, custom finish.</li>
  <li><strong>Gentle on Gowns</strong> — Features a 17″ slanted design with precision-notched shoulders to safely secure delicate dress straps.</li>
  <li><strong>Elegant Hardware</strong> — Finished with a classic, high-quality chrome swivel hook for easy hanging and perfect photo staging.</li>
  <li><strong>Timeless Keepsake</strong> — Designed as an intimate, artisanal gift that your bridal party will cherish long after the wedding day.</li>
  <li><strong>Picture-Perfect</strong> — Creates a warm, cohesive, and premium aesthetic for your getting-ready portraits.</li>
</ul>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Custom Engraved Bridal Hangers | Luxury Minimalist Wedding Gifts',
    meta_description:
        'Discover our heirloom-quality personalized bridesmaid hangers. Crafted from premium wood with elegant engraving, these custom hangers are the perfect bespoke gift for your bridal party.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'bridal hanger',
        'engraved hanger',
        'bridesmaid gift',
        'wedding party gift',
        'personalized hanger',
        'wedding keepsake',
        'getting ready',
        'bridal party',
        'wooden hanger',
        'heirloom gift',
    ],

    // ── Variant Options (generate variant combos) ─────────────────────
    // ── Custom Input Fields (non-variant, text entry) ─────────────────
    options: [
        {
            name: 'Hanger Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Natural' },
                { name: 'White' },
                { name: 'Black' },
                { name: 'Walnut' },
            ],
        },
        {
            name: 'Typography Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Style 1 (Classic)' },
                { name: 'Style 2 (Script)' },
                { name: 'No Personalization' },
            ],
        },
        {
            name: 'Name for Hanger',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the name exactly as you would like it engraved.',
        },
        {
            name: 'Wedding Role',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'e.g. Bridesmaid, Maid of Honor, Bride',
        },
        {
            name: 'Wedding Date',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description: 'Optional — e.g. October 12, 2026',
        },
    ],

    // ── Design / Frontend Notes (stored as custom content attribute) ──
    content: {
        design_notes: {
            primary_color: '#4A2C2A',
            background_color: '#F7EFE3',
            accent_gold: '#B89A52',
            soft_blush: '#F2D9D9',
            typography: 'Playfair Display / Cormorant Garamond',
            label_style: 'Uppercase tracking for labels, elegant italics for quotes',
            flourishes: 'Delicate botanical line-art flourishes where standard theme blocks allow',
            avoid: 'No harsh shadows or modern geometric patterns',
        },
    },
};

// ── Category slugs to link ────────────────────────────────────────────
const CATEGORY_SLUGS = [
    'bridesmaid-gifts',
    'wedding-day-accessories',
    'bridal-party-keepsakes',
    'getting-ready-details',
];

async function uploadProduct() {
    console.log('Creating Bespoke Engraved Wooden Bridal Hangers in Swell...\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
        process.exit(1);
    }

    try {
        // ── Resolve category IDs ──────────────────────────────────────
        console.log('Resolving category IDs...');
        const categoryIds = [];

        for (const slug of CATEGORY_SLUGS) {
            const result = await swell.get('/categories', { where: { slug } });
            if (result && result.results && result.results.length > 0) {
                categoryIds.push(result.results[0].id);
                console.log(`  ✅ Found: ${slug} → ${result.results[0].id}`);
            } else {
                console.warn(`  ⚠️  Category '${slug}' not found. Run uploadBridalHangerCategories.js first.`);
            }
        }

        // Swell stores category associations via category_index
        if (categoryIds.length > 0) {
            productData.category_index = {
                id: categoryIds,
            };
        }

        // ── Check for existing product ────────────────────────────────
        const existing = await swell.get('/products', {
            where: { slug: SLUG },
        });

        if (existing && existing.results && existing.results.length > 0) {
            console.log(`\nProduct already exists (ID: ${existing.results[0].id}). Updating...`);
            const updated = await swell.put(`/products/${existing.results[0].id}`, productData);
            console.log(`\n✅ Successfully updated product!`);
            console.log(`   Name   : ${updated.name}`);
            console.log(`   Slug   : ${updated.slug}`);
            console.log(`   Active : ${updated.active}`);
            console.log(`   Options: ${updated.options?.length || 0}`);
        } else {
            console.log('\nCreating new product...');
            const created = await swell.post('/products', productData);
            console.log(`\n✅ Successfully created product!`);
            console.log(`   ID     : ${created.id}`);
            console.log(`   Name   : ${created.name}`);
            console.log(`   Slug   : ${created.slug}`);
            console.log(`   Active : ${created.active}`);
            console.log(`   Options: ${created.options?.length || 0}`);
        }

        console.log('\n🎉 Done! Product is live in Swell.');
    } catch (error) {
        console.error('❌ Error uploading product:', error.message || error);
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response, null, 2));
        }
    }
}

uploadProduct();
