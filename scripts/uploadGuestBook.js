/**
 * Creates the "Bespoke Heirloom Wedding Guest Book" product in Swell.
 *
 * Includes:
 *   - Image upload from generated thumbnail
 *   - 2 variant options:
 *       1. Book Color & Typography Details (20 values)
 *       2. Archival Photo Corners (7 values)
 *   - 3 required custom text inputs (Couple's Names, Wedding Date, Location / Venue)
 *   - Rich HTML description
 *   - SEO metadata
 *   - Category associations
 *   - Active (published) status
 *
 * Run:  node scripts/uploadGuestBook.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-heirloom-wedding-guest-book';

const IMAGE_PATH = '/Users/kenny/.gemini/antigravity/brain/b68246cf-27b3-4f27-99fd-adb7f6e2343b/guest_book_thumbnail_1773361300290.png';

const productData = {
    name: 'The Bespoke Heirloom Wedding Guest Book | Custom Minimalist Photo Album',
    slug: SLUG,
    active: true,
    currency: 'USD',
    price: 49.99,

    // ── Rich HTML description ─────────────────────────────────────
    description: `
<p><em>Preserve the intimate, fleeting moments of your celebration with a bespoke, handcrafted guest book designed to become a timeless family heirloom.</em></p>

<ul>
  <li><strong>Artisanal Craftsmanship</strong> — Bound in your choice of premium textiles, from elegant canvas linen to soft velvet, designed to beautifully complement your wedding aesthetic.</li>
  <li><strong>Archival Quality</strong> — Features 60 generous pages of heavy, 140gsm blank archival paper, ensuring your heartfelt messages and instant photographs stand the test of time.</li>
  <li><strong>Tailored Elegance</strong> — Customized with your names, date, and venue in classic, sophisticated typography to honor your unique love story.</li>
  <li><strong>Thoughtful Details</strong> — Finished with a matching satin ribbon bookmark, making every page turn feel intentional and refined.</li>
  <li><strong>Versatile Keepsake</strong> — The spacious 11.5" x 8.5" blank canvas effortlessly accommodates handwritten well-wishes, Instax captures, and delicate mementos from your special day.</li>
</ul>

<p><em>"Celebrate Love with a Personal Touch."</em></p>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────
    meta_title: 'Bespoke Custom Wedding Guest Book | Luxury Heirloom Scrapbook',
    meta_description:
        'Celebrate love with a personal touch. Discover our high-end, bespoke wedding guest book featuring premium covers, custom typography, and archival blank pages.',

    // ── Tags ──────────────────────────────────────────────────────
    tags: [
        'guest book',
        'wedding guest book',
        'custom guest book',
        'personalized guest book',
        'heirloom guest book',
        'photo album',
        'wedding photo album',
        'minimalist guest book',
        'luxury wedding',
        'bespoke wedding',
        'wedding keepsake',
        'archival guest book',
    ],

    // ── Options: 2 Variants + 3 Custom Text Inputs ──────────────
    options: [
        // ─── VARIANT 1: Design Style ──────────────────────────────
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
            ]
        },

        // ─── TEXT INPUT 1: Couple's Names (Required) ─────────────
        {
            name: "Couple's Names (e.g., Charlotte & James)",
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the couple\'s names as you would like them displayed on the cover of your guest book.',
        },

        // ─── TEXT INPUT 2: Location / Venue (Optional) ───────────
        {
            name: 'Location / Venue (e.g., Santa Barbara, California)',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description: 'Enter your wedding venue or location as you would like it displayed on the cover.',
        },

        // ─── TEXT INPUT 3: Wedding Date (Required) ───────────────
        {
            name: 'Wedding Date (e.g., October 12, 2026)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter your wedding date as you would like it displayed on the cover.',
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
    { name: 'Luxury Guest Books',       slug: 'luxury-guest-books' },
    { name: 'Wedding Keepsakes',        slug: 'wedding-keepsakes' },
    { name: 'Custom Photo Albums',      slug: 'custom-photo-albums' },
    { name: 'Bridal Accessories',       slug: 'bridal-accessories' },
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
        filename: 'bespoke-heirloom-wedding-guest-book-thumbnail.png',
    };

    console.log(`  ✅ Image prepared (${(imageData.length / 1024).toFixed(0)} KB)`);
    return file;
}

async function uploadProduct() {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║  Creating Bespoke Heirloom Wedding Guest Book          ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

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
            const productId = existing.results[0].id;
            console.log(`Product already exists (ID: ${productId}). Updating...`);
            
            // Cleanup existing options to avoid duplicates or orphaned options
            const oldOptions = existing.results[0].options || [];
            if (oldOptions.length > 0) {
                console.log(`  Cleaning up ${oldOptions.length} old options...`);
                for (const opt of oldOptions) {
                    await swell.delete(`/products/${productId}/options/${opt.id}`);
                }
            }

            const updated = await swell.put(`/products/${productId}`, productData);
            console.log(`\n✅ Successfully updated product!`);
            console.log(`   Name     : ${updated.name}`);
            console.log(`   Slug     : ${updated.slug}`);
            console.log(`   Price    : $${updated.price}`);
            console.log(`   Active   : ${updated.active}`);
            console.log(`   Options  : ${updated.options?.length || 0}`);
            console.log(`   Variants : Design Style (12)`);
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
            console.log(`   Variants : Design Style (12)`);
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
