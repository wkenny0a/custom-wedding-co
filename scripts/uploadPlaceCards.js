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
        title: 'Fine Wedding Stationery',
        slug: 'fine-wedding-stationery',
        description: 'Exquisite, artisanal wedding stationery crafted with care and elegance.',
    },
    {
        title: 'Luxury Table Decor',
        slug: 'luxury-table-decor',
        description: 'Premium table decor to elevate your wedding reception aesthetic.',
    },
    {
        title: 'Custom Seating & Place Cards',
        slug: 'custom-seating-place-cards',
        description: 'Bespoke place cards and seating arrangements for your special day.',
    },
    {
        title: 'Bespoke Day-Of Essentials',
        slug: 'bespoke-day-of-essentials',
        description: 'Thoughtfully curated essentials for a flawless, memorable wedding day.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-folded-wedding-place-cards';

var productData = {
    name: 'Bespoke Folded Wedding Place Cards | Heirloom Quality Minimalist Seating Plan',
    slug: SLUG,
    active: true,
    price: 0,
    currency: 'USD',
    stock_tracking: false,

    // ── Brand-styled HTML description ─────────────────────────────────
    description: [
        '<div style="font-family: \'Cormorant Garamond\', \'Playfair Display\', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">',
        '',
        '  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">',
        '    Celebrate Love with a Personal Touch.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    Every Seat Tells a Story',
        '  </h2>',
        '',
        '  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">',
        '    Elevate your wedding reception with our heirloom-quality, custom-printed place cards, designed to bring timeless elegance and a deeply personal touch to every table setting.',
        '  </p>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Handcrafted Elegance</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Printed on premium, heavy-weight cardstock for a luxurious, tactile feel that honors the gravity of your special day.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Typography</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Choose from beautifully curated, classic serif scripts to seamlessly match your romantic, high-end aesthetic.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Perfectly Proportioned</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Thoughtfully sized at 9 \u00d7 5 cm (folded) to beautifully complement your carefully curated tablescapes without overcrowding.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">A Keepsake for Guests</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Transform a simple seating arrangement into an intimate, personalized memento your loved ones will cherish.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">A Personal Touch</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Every single piece feels artisanally crafted, ensuring your wedding day is as unique as your love story.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Luxury Custom Wedding Place Cards | Bespoke Minimalist Table Decor',
    meta_description:
        'Discover heirloom-quality, personalized folded wedding place cards. Crafted with classic typography and minimal elegance to perfectly complement your luxury wedding decor.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'wedding place cards',
        'folded place cards',
        'wedding stationery',
        'table decor',
        'seating plan',
        'custom place cards',
        'minimalist wedding',
        'bespoke stationery',
        'luxury wedding',
        'reception decor',
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
                { name: 'Design A - Font 1' },
                { name: 'Design A - Font 2' },
                { name: 'Design A - Font 3' },
                { name: 'Design A - Font 4' },
                { name: 'Design A - Font 5' },
                { name: 'Design A - Font 6' },
                { name: 'Design B - Font 1' },
                { name: 'Design B - Font 2' },
                { name: 'Design B - Font 3' },
                { name: 'Design B - Font 4' },
                { name: 'Design B - Font 5' },
                { name: 'Design B - Font 6' },
            ],
        },
        {
            name: 'Quantity',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Blank Sample' },
                { name: 'Personalised Sample' },
                { name: '10 Cards' },
                { name: '20 Cards' },
                { name: '30 Cards' },
                { name: '40 Cards' },
                { name: '50 Cards' },
                { name: '60 Cards' },
                { name: '70 Cards' },
                { name: '80 Cards' },
                { name: '90 Cards' },
                { name: '100 Cards' },
                { name: '125 Cards' },
                { name: '150 Cards' },
                { name: '175 Cards' },
                { name: '200 Cards' },
            ],
        },
        {
            name: 'Guest Names (Please provide a finalized, comma-separated list)',
            variant: false,
            active: true,
            required: true,
            input_type: 'long_text',
            description: 'Please provide your complete, finalized guest name list separated by commas. These will be printed exactly as entered.',
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
    'fine-wedding-stationery',
    'luxury-table-decor',
    'custom-seating-place-cards',
    'bespoke-day-of-essentials',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Wedding Place Cards \u2014 Swell Upload');
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
                filename: 'place-cards-thumbnail.' + ext,
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
    console.log('\nVariant combinations: 12 Design Styles \u00d7 16 Quantities = 192 variants');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
