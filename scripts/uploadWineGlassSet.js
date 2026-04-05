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
        title: 'Bespoke Drinkware',
        slug: 'bespoke-drinkware',
        description: 'Personalized, heirloom-quality drinkware for life\'s most cherished celebrations.',
    },
    {
        title: 'Heirloom Wedding Gifts',
        slug: 'heirloom-wedding-gifts',
        description: 'Timeless, bespoke gifts crafted to honor your wedding day.',
    },
    {
        title: 'Anniversary Keepsakes',
        slug: 'anniversary-keepsakes',
        description: 'Intimately personalized keepsakes designed to celebrate lasting love.',
    },
    {
        title: 'Bridal Shower Offerings',
        slug: 'bridal-shower-offerings',
        description: 'Elegant, thoughtful offerings for unforgettable bridal showers.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-engraved-stemless-wine-glass-set';

var productData = {
    name: 'Bespoke Engraved Stemless Wine Glass Set | Heirloom Couples Glassware',
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
        '    Elevate Your Most Cherished Milestones.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    Elevate your most cherished milestones with our bespoke etched glassware, thoughtfully crafted to capture the timeless elegance of your unique love story.',
        '  </h2>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Craftsmanship</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Each 16 oz glass is expertly and delicately etched by hand to ensure a flawless, enduring finish that lasts a lifetime.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Intimate Personalization</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Imprint your names, significant dates, or a quiet message of love to create a truly one-of-a-kind keepsake.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Elevated Presentation</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Opt for our premium, deep-toned presentation box, finished with elegant stitching and your choice of antique gold or silver lettering.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Quality</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Designed with a comfortable, stemless silhouette that feels simultaneously modern and deeply romantic in your hands.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">The Perfect Tribute</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      An unforgettable, bespoke offering for weddings, intimate anniversaries, or celebrating a quiet toast between just the two of you.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Bespoke Engraved Couples Wine Glasses | Luxury Wedding & Anniversary Gifts',
    meta_description:
        'Celebrate love with a personal touch. Discover our handcrafted, personalized stemless wine glass sets. The perfect heirloom gift for weddings and anniversaries.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'stemless wine glass',
        'engraved glassware',
        'couples gift',
        'wedding gift',
        'personalized wine glass',
        'anniversary gift',
        'bespoke glassware',
        'wedding keepsake',
        'heirloom gift',
        'bridal shower gift',
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
            name: 'Quantity Tiers',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: Array.from({ length: 100 }, (_, i) => {
                const count = i + 1;
                const price = count === 1 ? 29.99 : +(29.99 + (count - 1) * 27.99).toFixed(2);
                return {
                    name: `${count} Set (${count * 2} Glasses)`,
                    price: price
                };
            }),
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
            name: 'Custom Extra Messages',
            variant: false,
            active: true,
            required: false,
            input_type: 'long_text',
            description: 'Add any special instructions, bespoke requests, or additional notes for your order.',
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
    'bespoke-drinkware',
    'heirloom-wedding-gifts',
    'anniversary-keepsakes',
    'bridal-shower-offerings',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Bespoke Engraved Stemless Wine Glass Set \u2014 Swell Upload');
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
                filename: 'stemless-wine-glass-set-thumbnail.' + ext,
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
    console.log('\nDesign Style variants: 12 (Design #1 through Design #11, Custom Design)');
    console.log('Quantity Tiers: 100 sets');
    console.log('Custom fields: Names or Initials, Event Date, Custom Extra Messages');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
