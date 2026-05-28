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
        title: 'Luxury Wedding Invitations',
        slug: 'luxury-wedding-invitations',
        description: 'Exquisite, high-end wedding invitations.',
    },
    {
        title: 'Acrylic Stationery',
        slug: 'acrylic-stationery',
        description: 'Modern and elegant clear acrylic stationery.',
    },
    {
        title: 'Fine Art Wedding Paper',
        slug: 'fine-art-wedding-paper',
        description: 'Artisanal, fine-art inspired wedding paper goods.',
    },
    {
        title: 'Bespoke Wedding Details',
        slug: 'bespoke-wedding-details',
        description: 'Custom, luxurious details for your special day.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'the-heirloom-acrylic-wedding-invitation-suite';

var productData = {
    name: 'The Heirloom Acrylic Wedding Invitation Suite | Gold Foil & Fine Art Details',
    slug: SLUG,
    active: true,
    price: 0, // Placeholder
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
        '    A Breathtaking First Impression',
        '  </h2>',
        '',
        '  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">',
        '    Celebrate love with a personal touch through this breathtakingly clear acrylic invitation suite, bespoke-crafted to become the first heirloom of your new life together.',
        '  </p>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Craftsmanship</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Expertly pressed with luminous Antique Gold foil on premium, glass-like clear acrylic for a flawless, romantic finish.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Touches</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Personalize every intimate detail, from delicate botanical wax seals to hand-placed dried natural florals.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Curated Textures</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Housed in luxurious, soft-textured envelopes available in bespoke shades like Soft Cream and Pale Rose.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Quality</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Designed with timeless elegance to be cherished long after your vows, serving as a permanent keepsake of your celebration.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Intimate & One-of-a-Kind</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\u2014</span>',
        '      Work one-on-one with our design artisans to ensure your typography, spacing, and wording perfectly reflect your unique love story.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Luxury Clear Acrylic Wedding Invitations | Gold Foil & Wax Seals',
    meta_description:
        'Discover our heirloom-quality acrylic wedding invitation suites. Featuring delicate gold foil, bespoke wax seals, and natural textures for a truly timeless, romantic first impression.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'acrylic invitations',
        'clear invitations',
        'gold foil invitations',
        'luxury wedding invitations',
        'bespoke stationery',
        'fine art invitations',
        'heirloom wedding',
        'romantic wedding',
        'wedding stationery',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
        {
            name: 'Quantity',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Digital Sample' },
                { name: 'Physical Sample' },
                { name: '25 PCS' },
                { name: '50 PCS' },
                { name: '75 PCS' },
                { name: '100 PCS' },
                { name: '125 PCS' },
                { name: '150 PCS' },
                { name: '175 PCS' },
                { name: '200 PCS' },
                { name: '250 PCS' },
                { name: '300 PCS' },
                { name: '350 PCS' },
                { name: '400 PCS' },
            ],
        },
        {
            name: 'Suite Options',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Invitation + Envelope' },
                { name: 'Inv + Env + Wax Seal' },
                { name: 'Inv + Env + Wax + Dried Flowers' },
                { name: 'Inv + Env + Wax + Flowers + RSVP' },
                { name: 'RSVP Only' },
                { name: 'RSVP + Envelope' },
            ],
        },
        {
            name: 'Envelope Color',
            variant: false,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Soft Cream' },
                { name: 'Pale Rose' },
                { name: 'Champagne' },
                { name: 'Sage Green' },
                { name: 'Olive' },
                { name: 'Kraft Brown' },
                { name: 'Terracotta' },
            ],
        },
        {
            name: 'Foil Color',
            variant: false,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Antique Gold' },
                { name: 'Rose Gold' },
                { name: 'Silver' },
                { name: 'Black' },
            ],
        },
        {
            name: 'Acrylic Thickness',
            variant: false,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Standard 70 Micron' },
                { name: 'Premium 1mm' },
                { name: 'Ultra-Luxe 2mm' },
            ],
        },

        // CUSTOMIZATION FIELDS
        {
            name: 'Couple\'s Names',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the names exactly as you want them to appear on the invitation.',
        },
        {
            name: 'Event Date & Time',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'e.g., Saturday, October 12, 2026 at 4:30 PM',
        },
        {
            name: 'Venue Name & Address',
            variant: false,
            active: true,
            required: true,
            input_type: 'long_text',
            description: 'Please provide the complete venue name and address to be printed.',
        },
        {
            name: 'RSVP Details & Deadline',
            variant: false,
            active: true,
            required: false,
            input_type: 'short_text',
            description: 'e.g., Kindly reply by September 1st (leave blank if not applicable)',
        },
        {
            name: 'Additional Details (Dress Code, Website, etc.)',
            variant: false,
            active: true,
            required: false,
            input_type: 'long_text',
            description: 'Optional details for reception cards or bottom of invitation.',
        },
        {
            name: 'Wax Seal & Botanical Preference',
            variant: false,
            active: true,
            required: false,
            input_type: 'select',
            values: [
                { name: 'No Preference / Designer\'s Choice' },
                { name: 'Olive Branch' },
                { name: 'Eucalyptus' },
                { name: 'Dried Florals' },
                { name: 'Custom Monogram (if uploaded)' },
            ],
            description: 'Select your preferred wax seal and botanical accents, if applicable to your suite choice.',
        },
        {
            name: 'Upload Custom Monogram/Logo',
            variant: false,
            active: true,
            required: false,
            // Swell backend does not perfectly support "file" input type out of the box for options
            // but we can pass 'short_text' and the frontend can render an upload widget if needed,
            // or we'll just use 'short_text' to store a URL if the user provides one.
            input_type: 'short_text', // keeping as text just for the API structure requirement and simplicity
            description: 'If you have a custom monogram, please provide a link to the file (e.g. Google Drive, Dropbox)',
        }
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
    'luxury-wedding-invitations',
    'acrylic-stationery',
    'fine-art-wedding-paper',
    'bespoke-wedding-details',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Acrylic Invitations \u2014 Swell Upload');
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
                filename: 'acrylic-invitation-thumbnail.' + ext,
            },
        }];
        console.log('  Image attached: ' + path.basename(IMAGE_PATH));
    } else if (IMAGE_PATH) {
        console.log('  \u26a0\ufe0f  Image not found: ' + IMAGE_PATH);
    }

    var existing = await swell.get('/products', { where: { slug: SLUG } });
    var product;

    // Swell has a limit of 100 variants, we are adding 5 variant options but 14*6*7*4*3 = 7056 combinations.
    // We should disable generating variants on the Swell side if we exceed 100, but Swell automatically does this for large numbers.
    // If it fails, we will see it here.

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
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
