require('dotenv').config({ path: '.env.local' });
var swell = require('swell-node').swell;
var fs = require('fs');
var path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Categories ────────────────────────────────────────────────────────
var categories = [
    {
        title: 'Bespoke Wedding Party',
        slug: 'bespoke-wedding-party',
        description: 'Curated, artisan-crafted gifts and keepsakes for every member of your wedding party.',
    },
    {
        title: 'Groomsmen & Best Man Gifts',
        slug: 'groomsmen-best-man-gifts',
        description: 'Timeless, personalized gifts to honor your groomsmen and best man.',
    },
    {
        title: 'Heirloom Barware',
        slug: 'heirloom-barware',
        description: 'Luxury engraved glassware and decanters crafted to be cherished for a lifetime.',
    },
    {
        title: 'The Proposal Collection',
        slug: 'the-proposal-collection',
        description: 'Bespoke gifts designed for that unforgettable moment you ask them to stand by your side.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-heirloom-whiskey-glass-decanter-collection';

var productData = {
    name: 'Bespoke Heirloom Whiskey Glass & Decanter Collection',
    slug: SLUG,
    active: true,
    price: 24.99,
    currency: 'USD',
    stock_tracking: false, // Made to Order

    // ── Brand-styled HTML description ─────────────────────────────────
    description: [
        '<div style="font-family: \'Cormorant Garamond\', \'Playfair Display\', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">',
        '',
        '  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">',
        '    Celebrate love with a personal touch by gifting your closest confidants these artisan-engraved, heirloom-quality whiskey glasses.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    A Toast to the Men Who Stand By You',
        '  </h2>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Crafted for Eternity</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Heavy-based, lead-free glass and premium crystal designed to become a cherished keepsake.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Artistry</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Intimately personalized with your groomsmen\u2019s names, roles, and the date of your union.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Elegance</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Clean, laser-etched typography that beautifully catches the light with every pour.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">The Perfect Pour</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      A generous 11 oz capacity, ideal for toasting to unforgettable moments shared together.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Uniquely Yours</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Curate your gift with singular glasses, crystal upgrades, or complete decanter sets presented in bespoke wooden boxes.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Personalized Luxury Groomsmen Whiskey Glasses & Decanters | Bespoke Wedding Gifts',
    meta_description:
        'Discover our heirloom-quality, personalized whiskey glasses and decanters. The perfect bespoke groomsmen proposal gift, featuring artisan engraving and timeless elegance.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'groomsmen gift',
        'whiskey glass',
        'personalized glass',
        'engraved whiskey glass',
        'decanter set',
        'best man gift',
        'wedding party gift',
        'groomsmen proposal',
        'heirloom barware',
        'luxury wedding gift',
        'bespoke engraving',
        'crystal whiskey glass',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
        {
            name: 'Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Standard Whiskey Glass', price: 0 },              // Base: $24.99
                { name: 'Crystal Whiskey Glass', price: 15.00 },           // Total: $39.99
                { name: 'Glass Decanter', price: 25.01 },                  // Total: $50.00
                { name: 'Decanter + 2 Glasses Set', price: 75.01 },        // Total: $100.00
            ],
        },
        {
            name: 'Engraving & Packaging',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Side Engraving Only', price: 0 },
                { name: 'Bottom Engraving Only', price: 0 },
                { name: 'Side & Bottom Engraving', price: 5.00 },
                { name: 'Add Handmade Wooden Gift Box', price: 15.00 },
            ],
        },
        {
            name: 'Initial (e.g., B)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter a single initial letter for the engraving. Max 1 character.',
        },
        {
            name: 'Name (e.g., BRADLEY)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the name exactly as you want it engraved.',
        },
        {
            name: 'Role/Title (e.g., GROOMSMAN)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the role or title (e.g., GROOMSMAN, BEST MAN, FATHER OF THE BRIDE).',
        },
        {
            name: 'Date (e.g., 09.22.2024)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the wedding date as you want it engraved.',
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
            frontend_logic: 'Initial field max 1 character. All personalization fields are required.',
        },
    },
};

// ── Category slugs to link ────────────────────────────────────────────
var CATEGORY_SLUGS = [
    'bespoke-wedding-party',
    'groomsmen-best-man-gifts',
    'heirloom-barware',
    'the-proposal-collection',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Whiskey Glass & Decanter Collection \u2014 Swell Upload');
    console.log('===================================================\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    // ── Step 1: Create categories ─────────────────────────────────────
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

    // ── Step 2: Create product ────────────────────────────────────────
    console.log('\nSTEP 2 \u00b7 Creating product...');

    // Attach image if path provided
    if (IMAGE_PATH && fs.existsSync(IMAGE_PATH)) {
        var imgBuffer = fs.readFileSync(IMAGE_PATH);
        var base64 = imgBuffer.toString('base64');
        var ext = path.extname(IMAGE_PATH).slice(1).toLowerCase();
        var mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
        productData.images = [{
            file: {
                data: base64,
                content_type: mimeType,
                filename: 'whiskey-glass-decanter-thumbnail.' + ext,
            },
        }];
        console.log('  Image attached: ' + path.basename(IMAGE_PATH));
    } else if (IMAGE_PATH) {
        console.log('  \u26a0\ufe0f  Image not found: ' + IMAGE_PATH);
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

    // Fallback fetch
    if (!pid) {
        console.log('\n  \u26a0\ufe0f  Fetching by slug...');
        var fetched = await swell.get('/products', { where: { slug: SLUG } });
        if (fetched && fetched.results && fetched.results.length > 0) {
            product = fetched.results[0];
            pid = product.id;
            console.log('  \u2705 Found: ' + pid);
        }
    }

    // ── Step 3: Link categories ───────────────────────────────────────
    if (pid) {
        console.log('\nSTEP 3 \u00b7 Linking categories...');
        for (var j = 0; j < CATEGORY_SLUGS.length; j++) {
            var slug = CATEGORY_SLUGS[j];
            var catResult = await swell.get('/categories', { where: { slug: slug } });
            if (catResult && catResult.results && catResult.results.length > 0) {
                await swell.post('/products/' + pid + '/categories', {
                    parent_id: pid,
                    category_id: catResult.results[0].id,
                });
                console.log('  \u2705 Linked: ' + slug);
            } else {
                console.log('  \u26a0\ufe0f  Not found: ' + slug);
            }
        }
    }

    // ── Summary ───────────────────────────────────────────────────────
    console.log('\n===================================================');
    console.log(' \ud83c\udf89  Product is LIVE in Swell!');
    console.log('===================================================');
    console.log('\nVariant pricing:');
    console.log('  \u2022 Standard Whiskey Glass          \u2192  $24.99  (base)');
    console.log('  \u2022 Crystal Whiskey Glass            \u2192  $39.99  (+$15.00)');
    console.log('  \u2022 Glass Decanter                   \u2192  $50.00  (+$25.01)');
    console.log('  \u2022 Decanter + 2 Glasses Set         \u2192  $100.00 (+$75.01)');
    console.log('\nEngraving & Packaging add-ons:');
    console.log('  \u2022 Side Engraving Only              \u2192  +$0.00');
    console.log('  \u2022 Bottom Engraving Only            \u2192  +$0.00');
    console.log('  \u2022 Side & Bottom Engraving          \u2192  +$5.00');
    console.log('  \u2022 Add Handmade Wooden Gift Box     \u2192  +$15.00');
    console.log('\nCustom fields: Initial, Name, Role/Title, Date (all required)');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
