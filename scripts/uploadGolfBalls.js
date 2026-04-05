require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Categories ────────────────────────────────────────────────────────
var categories = [
    {
        title: 'Groomsmen Gifts',
        slug: 'groomsmen-gifts',
        description: 'Premium, personalized gifts to honor the gentlemen in your wedding party.',
    },
    {
        title: 'Bespoke Wedding Favors',
        slug: 'bespoke-wedding-favors',
        description: 'Artisan-crafted, personalized favors designed to leave a lasting impression on your guests.',
    },
    {
        title: 'Bachelor Party Keepsakes',
        slug: 'bachelor-party-keepsakes',
        description: 'Curated keepsakes and mementos for an unforgettable bachelor celebration.',
    },
    {
        title: 'Personalized Accessories',
        slug: 'personalized-accessories',
        description: 'Bespoke accessories tailored with your unique monogram, name, or meaningful date.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-personalized-golf-balls';

var productData = {
    name: 'Bespoke Personalized Golf Balls | Luxury Groomsmen Gifts & Heirloom Wedding Favors',
    slug: SLUG,
    active: true,
    price: 0,
    currency: 'USD',
    stock_tracking: false, // Made to Order

    // ── Brand-styled HTML description ─────────────────────────────────
    description: [
        '<div style="font-family: \'Cormorant Garamond\', \'Playfair Display\', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">',
        '',
        '  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">',
        '    Elevate your wedding weekend with these bespoke, custom-printed golf balls, thoughtfully designed to celebrate the gentlemen standing by your side with a touch of artisanal elegance.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    Heirloom-Quality Details',
        '  </h2>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Handcrafted Exclusivity</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Custom-printed with your unique monogram, tailored message, or a meaningful date in elegant typography.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Presentation</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Arrives beautifully packaged in a clear keepsake sleeve, ready to be gifted to your groomsmen or the father of the bride.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Premium Keepsake Quality</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Crafted with high-fidelity UV printing, ensuring your intimate design remains a lasting memento long after the final hole.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Options</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Available in curated sets of 1, 3, or 6, with single or double-sided personalization to perfectly match your vision.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">A Memorable Detail</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      The sophisticated companion for a celebratory bachelor weekend or a peaceful morning on the greens before the ring.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Personalized Groomsmen Golf Balls | Luxury Custom Wedding Favors',
    meta_description:
        'Discover our bespoke custom golf balls, the perfect luxurious gift for your groomsmen or wedding party. Personalize with monograms or dates for a timeless keepsake.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'golf balls',
        'personalized golf balls',
        'groomsmen gift',
        'wedding favor',
        'bachelor party',
        'custom monogram',
        'luxury keepsake',
        'golf wedding',
        'bespoke gift',
        'heirloom quality',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
        {
            name: 'Set Size & Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: '1 Ball - 1 Sided' },
                { name: '1 Ball - 2 Sided' },
                { name: '3 Balls - 1 Sided' },
                { name: '3 Balls - 2 Sided' },
                { name: '6 Balls - 1 Sided' },
                { name: '6 Balls - 2 Sided' },
            ],
        },
        {
            name: 'Customization Details (Text, Names, or Roles)',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Please provide the text, names, monogram, or roles you would like printed on the golf balls.',
        },
        {
            name: 'Event Date',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description: 'Optional. Enter the date of the event (e.g., June 14, 2026).',
        },
        {
            name: 'Upload Custom Monogram or Logo',
            variant: false,
            active: true,
            required: false,
            input_type: 'long_text',
            description: 'Optional. Please email your custom monogram or logo file to info@marblefy.com with your order number, or paste a link to your file here.',
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
var CATEGORY_SLUGS = [
    'groomsmen-gifts',
    'bespoke-wedding-favors',
    'bachelor-party-keepsakes',
    'personalized-accessories',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Bespoke Personalized Golf Balls \u2014 Swell Upload');
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
                filename: 'golf-balls-thumbnail.' + ext,
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

    console.log('\n===================================================');
    console.log(' \ud83c\udf89  Product is LIVE in Swell!');
    console.log('===================================================');
    console.log('\nVariant options: 6 Set Size & Style combinations');
    console.log('Custom fields: Customization Details (required), Event Date (optional), Upload Monogram/Logo (optional)');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
