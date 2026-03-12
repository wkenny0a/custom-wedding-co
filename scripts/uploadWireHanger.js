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
        title: 'Bridal Accessories',
        slug: 'bridal-accessories',
        description: 'Elegant accessories to complete your bridal look.',
    },
    {
        title: 'Wedding Day Keepsakes',
        slug: 'wedding-day-keepsakes',
        description: 'Timeless keepsakes to commemorate your special day.',
    },
    {
        title: 'Fine Bridesmaid Gifts',
        slug: 'fine-bridesmaid-gifts',
        description: 'Beautifully crafted gifts to honor your bridal party.',
    },
    {
        title: 'Bespoke Wedding Decor',
        slug: 'bespoke-wedding-decor',
        description: 'Custom wedding decor with an artisanal, premium aesthetic.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-wire-script-bridal-hanger';

var productData = {
    name: 'Bespoke Wire Script Bridal Hanger | Personalized Heirloom Wedding Dress Hanger',
    slug: SLUG,
    active: true,
    price: 21.99,
    currency: 'USD',
    stock_tracking: false, // Made to Order

    // ── Brand-styled HTML description ─────────────────────────────────
    description: [
        '<div style="font-family: \'Cormorant Garamond\', \'Playfair Display\', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">',
        '',
        '  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">',
        '    Celebrate Love with a Personal Touch.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    An Heirloom for Your Most Unforgettable Day',
        '  </h2>',
        '',
        '  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">',
        '    Elevate the presentation of your wedding gown with a bespoke, artisan-crafted bridal hanger, designed to become a cherished heirloom of your most unforgettable day.',
        '  </p>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Hand-Sculpted Artistry</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Delicate wire script, meticulously formed by hand to showcase your new name or a meaningful phrase.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Premium Craftsmanship</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Carved from solid, high-quality wood with an elegant silhouette to flawlessly support and display your gown.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Intimate Detailing</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Optional custom laser-engraved wedding date on the hanger arm for a truly bespoke touch.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Romantic Finishes</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Gracefully adorned with a soft tulle bow or your choice of luxurious, richly toned satin ribbon.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Elegance</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      An exquisite, photo-ready detail that effortlessly captures the warmth and romance of your wedding morning.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Custom Bridal Hanger | Personalized Wedding Dress Heirloom',
    meta_description:
        'Discover our bespoke personalized bridal hangers. Handcrafted from premium wood with elegant wire script and optional date engraving. The perfect luxury wedding keepsake.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'bridal hanger',
        'wedding dress hanger',
        'wire script hanger',
        'personalized hanger',
        'custom wedding hanger',
        'wedding keepsake',
        'bridal accessories',
        'heirloom gift',
        'bridesmaid gift',
        'wedding prep',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
        {
            name: 'Wire Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Silver' },
                { name: 'Gold' },
                { name: 'Rose Gold' },
            ],
        },
        {
            name: 'Hanger Finish',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'White' },
                { name: 'Black' },
                { name: 'Natural' },
                { name: 'Walnut' },
            ],
        },
        {
            name: 'Engraving',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Without Engraving', price: 0 },         // Base $21.99
                { name: 'With Engraving', price: 6.00 },         // Base $27.99
            ],
        },
        {
            name: 'Ribbon Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'White Tulle' },
                { name: 'White Satin' },
                { name: 'Off-White Satin' },
                { name: 'Gold Satin' },
                { name: 'Orange Satin' },
                { name: 'Silver Satin' },
                { name: 'Black Satin' },
                { name: 'Navy Satin' },
                { name: 'Royal Blue Satin' },
                { name: 'Dusty Blue Satin' },
                { name: 'Light Blue Satin' },
                { name: 'Red Satin' },
                { name: 'Maroon Satin' },
                { name: 'Dark Green Satin' },
                { name: 'Bright Green Satin' },
                { name: 'Light Pink Satin' },
                { name: 'Hot Pink Satin' },
                { name: 'Rose Satin' },
                { name: 'Purple Satin' },
                { name: 'Sage Satin' },
                { name: 'Lavender Satin' },
            ],
        },
        {
            name: 'Wire Personalization',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter name or phrase. No hyphens. Uppercase letters count as 2 characters. Max 18 characters.',
            // Currently Swell backend doesn't strictly enforce maxlength via API in the same way modern front-ends do,
            // but we can pass constraints depending on storefront implementation or just leave it in the description.
        },
        {
            name: 'Engraved Date',
            variant: false,
            active: true, // we set active true; the front-end typically implements "show if With Engraving" based on option name/structure or custom code
            required: false,
            input_type: 'short_text',
            description: '(Only applicable if "With Engraving" is selected) Enter date exactly as you want it engraved.',
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
            frontend_logic: 'Show "Engraved Date" input only if "Engraving" variant is set to "With Engraving". "Wire Personalization" max length is 18 chars.'
        },
    },
};

// ── Category slugs to link ────────────────────────────────────────────
var CATEGORY_SLUGS = [
    'bridal-accessories',
    'wedding-day-keepsakes',
    'fine-bridesmaid-gifts',
    'bespoke-wedding-decor',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Wire Script Bridal Hanger \u2014 Swell Upload');
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
                filename: 'wire-hanger-thumbnail.' + ext,
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
    console.log('\nVariant combinations: 3 Wire Colors \u00d7 4 Finishes \u00d7 2 Engraving Options \u00d7 21 Ribbons = 504 variants');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
