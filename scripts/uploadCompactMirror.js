const fs = require('fs');
const path = require('path');

// Manually parse .env.local
try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let val = match[2] || '';
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1);
            } else if (val.startsWith("'") && val.endsWith("'")) {
                val = val.slice(1, -1);
            }
            process.env[match[1]] = val;
        }
    });
} catch(e) {}

const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
const secretKey = process.env.NEXT_PUBLIC_SWELL_SECRET_KEY;
const authHeader = 'Basic ' + Buffer.from(storeId + ':' + secretKey).toString('base64');

const swell = {
    async get(endpoint, params) {
        let url = `https://api.swell.store${endpoint}`;
        if (params && params.where) {
            const query = new URLSearchParams();
            for (const key in params.where) {
                query.append(`where[${key}]`, params.where[key]);
            }
            url += '?' + query.toString();
        }
        const res = await fetch(url, { headers: { Authorization: authHeader, 'Accept': 'application/json' }});
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    async post(endpoint, body) {
        const url = `https://api.swell.store${endpoint}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { Authorization: authHeader, 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    async put(endpoint, body) {
        const url = `https://api.swell.store${endpoint}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: { Authorization: authHeader, 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    async delete(endpoint) {
        const url = `https://api.swell.store${endpoint}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { Authorization: authHeader, 'Accept': 'application/json' },
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};

// ── Categories ────────────────────────────────────────────────────────
var categories = [
    {
        title: 'Bridesmaid Gifts',
        slug: 'bridesmaid-gifts',
        description: 'Beautifully curated gifts to honor and celebrate your bridesmaids.',
    },
    {
        title: 'Bespoke Wedding Favors',
        slug: 'bespoke-wedding-favors',
        description: 'Artisanal, one-of-a-kind wedding favors crafted with love.',
    },
    {
        title: 'Bridal Party Keepsakes',
        slug: 'bridal-party-keepsakes',
        description: 'Timeless keepsakes for your bridal party to treasure forever.',
    },
    {
        title: 'Luxury Bridal Accessories',
        slug: 'luxury-bridal-accessories',
        description: 'Premium accessories to elevate every detail of your wedding day.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'bespoke-engraved-compact-mirror';

var productData = {
    name: 'Bespoke Engraved Compact Mirror | Custom Heirloom Bridal Gift',
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
        '    Celebrate Your Closest Confidantes.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    A bespoke, flawlessly engraved compact mirror that serves as an intimate keepsake of your special day.',
        '  </h2>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Craftsmanship</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Crafted from premium stainless steel with a polished, enduring finish designed to last a lifetime.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Engraving</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Elegantly personalized with classic typography, making each piece entirely one-of-a-kind.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Flawless Reflection</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Features dual glass mirrors&mdash;one standard and one magnifying&mdash;for graceful, on-the-go touch-ups.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Palette</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Available in a curated selection of refined tones, including Antique Gold, Pale Rose, and Silver.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Presentation</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Delicately nestled in soft textures and premium packaging, ready to be gifted with love and deep appreciation.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Bespoke Engraved Compact Mirror | Luxury Bridesmaid Gifts',
    meta_description:
        'Discover our heirloom-quality custom engraved compact mirrors. The perfect intimate, artisanal bridesmaid gift or bespoke wedding favor to celebrate love with a personal touch.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'compact mirror',
        'engraved mirror',
        'bridesmaid gift',
        'bridal party gift',
        'personalized mirror',
        'wedding favor',
        'bespoke keepsake',
        'heirloom gift',
        'bridal accessory',
        'custom wedding',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
        {
            name: 'Mirror Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Gold' },
                { name: 'Rose Gold' },
                { name: 'Silver' },
            ],
        },
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
    'bridesmaid-gifts',
    'bespoke-wedding-favors',
    'bridal-party-keepsakes',
    'luxury-bridal-accessories',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Bespoke Engraved Compact Mirror — Swell Upload');
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
                filename: 'compact-mirror-thumbnail.' + ext,
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
    console.log(' \ud83c\udf89  Compact Mirror is LIVE in Swell!');
    console.log('===================================================');
    console.log('\nMirror Color variants: 3 (Gold, Rose Gold, Silver)');
    console.log('Design Style variants: 12');
    console.log('Custom fields: Names or Initials [req], Event Date [req]');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
