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
        title: 'Bachelor Party Favors',
        slug: 'bachelor-party-favors',
        description: 'Curated keepsakes and favors for an unforgettable bachelor celebration.',
    },
    {
        title: 'Wedding Keepsakes',
        slug: 'wedding-keepsakes',
        description: 'Timeless mementos designed to be cherished long after your celebration.',
    },
    {
        title: 'Bespoke Drinkware',
        slug: 'bespoke-drinkware',
        description: 'Personalized, heirloom-quality drinkware for life\'s most cherished celebrations.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-beers-birdies-neoprene-can-cooler';

var productData = {
    name: 'Bespoke "Beers & Birdies" Neoprene Can Cooler | Custom Golf Weekend Favor',
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
        '    Elevate Your Celebratory Golf Weekend.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    Heirloom-quality, custom neoprene can coolers, thoughtfully crafted to keep your beverages chilled in timeless style.',
        '  </h2>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Handcrafted Personalization</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Bespoke detailing featuring your choice of elegant names, dates, or curated locations.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Premium Neoprene</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      High-end, durable material ensures your drinks stay perfectly chilled from the first tee to the final hole.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Tailored Fit</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Available in both Standard (12oz traditional) and Slim (12oz seltzer) silhouettes.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Curated Palette</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Select from an array of refined cooler and print colors to seamlessly complement your sophisticated party aesthetic.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Keepsake</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      A functional, beautifully designed memento your groomsmen will cherish long after the weekend concludes.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Custom Golf Bachelor Party Can Coolers | Luxury Groomsmen Favors',
    meta_description:
        'Discover our bespoke "Beers & Birdies" custom can coolers. Perfect for high-end golf bachelor parties, featuring premium neoprene and artisanal personalization.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'can cooler',
        'neoprene cooler',
        'golf bachelor party',
        'groomsmen gift',
        'bachelor party favor',
        'beers and birdies',
        'custom koozie',
        'personalized cooler',
        'golf weekend',
        'wedding keepsake',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
        {
            name: 'Size',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Regular' },
                { name: 'Slim' },
            ],
        },
        {
            name: 'Cooler Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Off-White' },
                { name: 'Pearly' },
                { name: 'Black' },
                { name: 'Sky' },
                { name: 'Riviera' },
                { name: 'Navy' },
                { name: 'Royal' },
                { name: 'Teal' },
                { name: 'Limoncello' },
                { name: 'Violet' },
                { name: 'Hot Pink' },
                { name: 'Orange' },
                { name: 'Espresso' },
                { name: 'Blush' },
                { name: 'Dusty Rose' },
                { name: 'Red' },
                { name: 'Forest' },
                { name: 'Green' },
                { name: 'Sage' },
                { name: 'Mint' },
            ],
        },
        {
            name: 'Print Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'White' },
                { name: 'Ivory' },
                { name: 'Black' },
                { name: 'Navy' },
                { name: 'Royal' },
                { name: 'Blue' },
                { name: 'Riviera' },
                { name: 'Ocean' },
                { name: 'Teal' },
                { name: 'Hot Pink' },
                { name: 'Pink' },
                { name: 'Burgundy' },
                { name: 'Roulette' },
                { name: 'Red' },
                { name: 'Limoncello' },
                { name: 'Olive' },
                { name: 'Forest' },
                { name: 'Green' },
                { name: 'Sage' },
                { name: 'Mint' },
                { name: 'Espresso' },
                { name: 'Pepper' },
                { name: 'Berry' },
                { name: 'Violet' },
                { name: 'Orange' },
                { name: 'Coral' },
            ],
        },
        {
            name: 'Personalization Details',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Please enter names, locations, dates, or custom sayings here.',
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
    'bachelor-party-favors',
    'wedding-keepsakes',
    'bespoke-drinkware',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Beers & Birdies Can Cooler \u2014 Swell Upload');
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
                filename: 'can-cooler-thumbnail.' + ext,
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
    console.log('\nVariant options: 2 Sizes \u00d7 20 Cooler Colors \u00d7 26 Print Colors = 1,040 combinations');
    console.log('Custom fields: Personalization Details (required)');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
