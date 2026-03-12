require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Categories ────────────────────────────────────────────────────────
const categories = [
    {
        title: 'Wedding Favors & Keepsakes',
        slug: 'wedding-favors-keepsakes',
        description: 'Thoughtfully crafted favors and keepsakes your guests will treasure.',
    },
    {
        title: 'Reception Drinkware & Bar',
        slug: 'reception-drinkware-bar',
        description: 'Elegant drinkware and bar accessories for your wedding reception.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
const SLUG = 'bespoke-laser-engraved-wedding-shot-glasses';

const productData = {
    name: 'Bespoke Laser-Engraved Wedding Shot Glasses | 2 oz Heirloom Clear Glass Favors',
    slug: SLUG,
    active: true,
    price: 0, // Placeholder — set actual price in Swell dashboard
    currency: 'USD',
    stock_tracking: false, // Made-to-order

    // ── Brand-styled HTML description ─────────────────────────────────
    description: `
<div style="font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">

  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">
    Celebrate Love with a Personal Touch.
  </p>

  <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">
    A Toast to Timeless Elegance
  </h2>

  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">
    Elevate your wedding celebration with our bespoke, laser-engraved shot glasses, meticulously crafted to offer your guests a timeless, heirloom-quality keepsake.
  </p>

  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Craftsmanship</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Features high-quality, permanent laser engraving that gracefully captures your details without ever peeling or fading.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Elegance</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Crafted from premium clear glass with a refined 2.7 oz capacity, perfect for elegant toasting.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Personalization</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Fully customizable with classic serif typography, featuring your names, dates, or delicate monograms.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Keepsake</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Designed with a romantic, minimalist aesthetic to be cherished and used long after your special day.
    </li>
    <li style="padding: 0.8em 0;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Impeccable Presentation</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>
      Each glass is individually wrapped with care, ensuring a flawless and secure arrival for your celebration.
    </li>
  </ul>

</div>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Luxury Engraved Wedding Shot Glasses | Custom Favors',
    meta_description:
        'Discover our bespoke, laser-engraved clear glass wedding shot glasses. Personalize these heirloom-quality, elegant favors with your names and wedding date for a timeless keepsake.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'wedding shot glasses',
        'engraved shot glasses',
        'wedding favors',
        'custom favors',
        'personalized shot glass',
        'wedding keepsake',
        'reception drinkware',
        'laser engraved',
        'heirloom favor',
        'luxury wedding',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
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
                { name: 'Custom Design' },
            ],
        },
        {
            name: 'Quantity Tier',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: '1 Glass' },
                { name: '2-4 Glasses' },
                { name: '5-15 Glasses' },
                { name: '16-100 Glasses' },
                { name: '101-250 Glasses' },
                { name: '250+ Glasses' },
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
        {
            name: 'Custom Message or Slogan',
            variant: false,
            active: true,
            required: false,
            input_type: 'long_text',
            description: 'Optional \u2014 a short message, slogan, or quote to include on the glass.',
        },
    ],

    // ── Design / Frontend Notes ───────────────────────────────────────
    content: {
        design_notes: {
            primary_color: '#4A2C2A',
            background_color: '#F7EFE3',
            accent_gold: '#B89A52',
            soft_blush: '#F2D9D9',
            typography: 'Playfair Display / Cormorant Garamond',
            heading_style: 'Serif, uppercase with letter-spacing',
            layout: 'Clean, minimal, generous whitespace, no harsh shadows',
        },
    },
};

// ── Category slugs to link ────────────────────────────────────────────
const CATEGORY_SLUGS = ['wedding-favors-keepsakes', 'reception-drinkware-bar'];

// ── Image path (generated by AI) ──────────────────────────────────────
// Update this path to the actual generated image location
const IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Wedding Shot Glasses \u2014 Swell Upload');
    console.log('===================================================\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    // \u2500\u2500 Step 1: Create categories \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    console.log('STEP 1 \u00b7 Creating categories...');
    for (var i = 0; i < categories.length; i++) {
        var cat = categories[i];
        var existingCat = await swell.get('/categories', { where: { slug: cat.slug } });
        if (existingCat && existingCat.results && existingCat.results.length > 0) {
            console.log('  Already exists: ' + cat.title);
            continue;
        }
        await swell.post('/categories', {
            name: cat.title,
            slug: cat.slug,
            description: cat.description,
            active: true,
        });
        console.log('  \u2705 Created: ' + cat.title);
    }

    // \u2500\u2500 Step 2: Create or update product \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    console.log('\nSTEP 2 \u00b7 Creating product...');

    // If image path provided, read and attach as base64
    if (IMAGE_PATH && fs.existsSync(IMAGE_PATH)) {
        var imgBuffer = fs.readFileSync(IMAGE_PATH);
        var base64 = imgBuffer.toString('base64');
        var ext = path.extname(IMAGE_PATH).slice(1).toLowerCase();
        var mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';

        productData.images = [{
            file: {
                data: base64,
                content_type: mimeType,
                filename: 'shot-glasses-thumbnail.' + ext,
            },
        }];
        console.log('  Image attached: ' + IMAGE_PATH);
    } else if (IMAGE_PATH) {
        console.log('  \u26a0\ufe0f  Image path not found: ' + IMAGE_PATH);
    }

    var existing = await swell.get('/products', { where: { slug: SLUG } });

    var product;
    if (existing && existing.results && existing.results.length > 0) {
        console.log('  Product exists (ID: ' + existing.results[0].id + '). Updating...');
        product = await swell.put('/products/' + existing.results[0].id, productData);
        console.log('  \u2705 Updated!');
    } else {
        product = await swell.post('/products', productData);
        console.log('  \u2705 Created!');
    }

    var pid = product && product.id;
    console.log('\n  ID      : ' + pid);
    console.log('  Name    : ' + (product && product.name));
    console.log('  Slug    : ' + (product && product.slug));
    console.log('  Price   : $' + (product && product.price));
    console.log('  Active  : ' + (product && product.active));
    console.log('  Options : ' + ((product && product.options && product.options.length) || 0));
    console.log('  Images  : ' + ((product && product.images && product.images.length) || 0));

    // Fallback slug fetch if response missing ID
    if (!pid) {
        console.log('\n  \u26a0\ufe0f  Response missing ID, fetching by slug...');
        var fetched = await swell.get('/products', { where: { slug: SLUG } });
        if (fetched && fetched.results && fetched.results.length > 0) {
            product = fetched.results[0];
            pid = product.id;
            console.log('  \u2705 Found product: ' + pid);
        }
    }

    // \u2500\u2500 Step 3: Link categories \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    if (pid) {
        console.log('\nSTEP 3 \u00b7 Linking categories...');
        for (var j = 0; j < CATEGORY_SLUGS.length; j++) {
            var slug = CATEGORY_SLUGS[j];
            var catResult = await swell.get('/categories', { where: { slug: slug } });
            if (catResult && catResult.results && catResult.results.length > 0) {
                var catId = catResult.results[0].id;
                await swell.post('/products/' + pid + '/categories', {
                    parent_id: pid,
                    category_id: catId,
                });
                console.log('  \u2705 Linked: ' + slug);
            } else {
                console.log('  \u26a0\ufe0f  Category not found: ' + slug);
            }
        }
    }

    // \u2500\u2500 Summary \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    console.log('\n===================================================');
    console.log(' \ud83c\udf89  Product is LIVE in Swell!');
    console.log('===================================================');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
