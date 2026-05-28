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
        title: 'Bridal Party Gifts',
        slug: 'bridal-party-gifts',
        description: 'Thoughtfully curated gifts to honor your bridal party.',
    },
    {
        title: 'Bespoke Glassware',
        slug: 'bespoke-glassware',
        description: 'Personalized, heirloom-quality glassware for life\'s most cherished celebrations.',
    },
    {
        title: 'Wedding Morning Essentials',
        slug: 'wedding-morning-essentials',
        description: 'Elegant essentials to make your wedding morning unforgettable.',
    },
    {
        title: 'Personalized Keepsakes',
        slug: 'personalized-keepsakes',
        description: 'Intimately personalized keepsakes designed to be treasured forever.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-engraved-champagne-flute';

var productData = {
    name: 'Bespoke Engraved Champagne Flute | Personalized Bridal Party Glassware',
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
        '    Celebrate Your Most Cherished Moments.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    Celebrate your most cherished moments with our bespoke, crystal-clear champagne flutes, delicately crafted to honor the ones standing by your side.',
        '  </h2>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Elegance</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Crafted from premium, flawlessly clear glass designed to catch the warm, romantic light of your celebration.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Artistry</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Each flute is intimately personalized with your bridal party\'s names, roles, and your unforgettable wedding date.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Silhouette</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      A graceful 9-inch, 7-ounce profile that elevates every wedding morning toast with sophisticated minimalism.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Typography</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Choose from five classic design styles, featuring widely-spaced serif fonts and elegant, romantic scripts.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">A Cherished Keepsake</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      The perfect, intimate gift designed to make your bridesmaids and maid of honor feel truly one-of-a-kind.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Personalized Luxury Bridesmaid Champagne Flutes | Bespoke Wedding Glassware',
    meta_description:
        'Elevate your wedding morning with our bespoke engraved champagne flutes. Intimately personalized, heirloom-quality glassware for your bridal party.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'champagne flute',
        'engraved glassware',
        'bridesmaid gift',
        'bridal party gift',
        'personalized champagne glass',
        'wedding morning',
        'bespoke glassware',
        'wedding keepsake',
        'bridal toast',
        'heirloom gift',
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
                { name: 'Design 1' },
                { name: 'Design 2' },
                { name: 'Design 3' },
                { name: 'Design 4' },
                { name: 'Design 5' },
            ],
        },
        {
            name: 'Name',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the name to be engraved on the champagne flute.',
        },
        {
            name: 'Title/Role',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the title or role (e.g. Maid of Honor, Bridesmaid, Mother of the Bride).',
        },
        {
            name: 'Date',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the wedding date exactly as you want it engraved.',
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
    'bridal-party-gifts',
    'bespoke-glassware',
    'wedding-morning-essentials',
    'personalized-keepsakes',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Bespoke Engraved Champagne Flute \u2014 Swell Upload');
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
                filename: 'champagne-flute-thumbnail.' + ext,
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
    console.log('\nDesign Style variants: 5');
    console.log('Custom fields: Name, Title/Role, Date (all required)');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
