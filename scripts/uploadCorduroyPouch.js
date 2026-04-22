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
        description: 'Thoughtfully curated gifts to honor your bridesmaids.',
    },
    {
        title: 'Bridal Party Accessories',
        slug: 'bridal-party-accessories',
        description: 'Elegant accessories for your bridal party, designed to complement your special day.',
    },
    {
        title: 'Bespoke Keepsakes',
        slug: 'bespoke-keepsakes',
        description: 'Intimately personalized keepsakes designed to be treasured forever.',
    },
    {
        title: 'Wedding Day Essentials',
        slug: 'wedding-day-essentials',
        description: 'Essential items to make your wedding day effortless and unforgettable.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
var SLUG = 'heirloom-corduroy-cosmetic-pouch';

var productData = {
    name: 'The Heirloom Corduroy Cosmetic Pouch | Personalized Bridal Party Gift',
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
        '    A Timeless Gift for Your Most Cherished Circle',
        '  </h2>',
        '',
        '  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">',
        '    Celebrate love with a personal touch by gifting your bridal party an artisanal, customized corduroy cosmetic pouch designed to hold their wedding day essentials in timeless elegance.',
        '  </p>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Artistry</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Delicately embroidered with your loved one\'s name or monogram for an intimately personal, one-of-a-kind touch.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Quality</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Crafted from sumptuously soft, premium corduroy that feels handcrafted and ages beautifully alongside your most cherished memories.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Romantic Palette</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Available in a curated selection of sophisticated hues &mdash; Soft Cream, Baby Blue, Purple, and Light Pink &mdash; to seamlessly complement your wedding aesthetic.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Spacious & Secure</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Thoughtfully proportioned (7.9" x 4.3" x 2.4") to gracefully hold bridal touch-up essentials, secured with a smooth, reliable zipper closure.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">The Perfect Keepsake</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      A warm, romantic gift that your bridesmaids will treasure long after the final toast.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n'),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Personalized Luxury Corduroy Cosmetic Bag | Bridesmaid Keepsakes',
    meta_description:
        'Gift your bridal party the Heirloom Corduroy Cosmetic Pouch. A bespoke, personalized makeup bag crafted for timeless elegance and wedding day romance.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'corduroy cosmetic bag',
        'bridesmaid gift',
        'personalized makeup bag',
        'bridal party gift',
        'cosmetic pouch',
        'wedding day essentials',
        'bespoke keepsake',
        'embroidered bag',
        'bridal party accessories',
        'personalized pouch',
    ],

    // ── Options ───────────────────────────────────────────────────────
    options: [
        {
            name: 'Pouch Color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Soft Cream' },
                { name: 'Baby Blue' },
                { name: 'Purple' },
                { name: 'Light Pink' },
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
        {
            name: 'Font color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Black' },
                { name: 'White' },
                { name: 'Gold' },
            ],
        },
    ],

    // ── Design / Frontend Notes ───────────────────────────────────────
    content: {
        design_notes: {
            vibe: 'Luxury minimalist wedding. Soft corduroy heirloom quality, timeless elegance. Warm, romantic, premium.',
            primary_color: '#4A2C2A',
            background_color: '#F7EFE3',
            accent_gold: '#B89A52',
            soft_blush: '#F2D9D9',
            typography: 'Playfair Display / Cormorant Garamond',
            label_style: 'Uppercase tracking for labels, elegant italics for quotes',
            visual_style: 'Clean, minimal, generous whitespace. Delicate botanical line-art flourishes.',
            brand_voice: 'Celebrate Your Most Cherished Moments.',
        },
    },
};

// ── Category slugs to link ────────────────────────────────────────────
var CATEGORY_SLUGS = [
    'bridesmaid-gifts',
    'bridal-party-accessories',
    'bespoke-keepsakes',
    'wedding-day-essentials',
];

// ── Image path (passed as CLI arg) ────────────────────────────────────
var IMAGE_PATH = process.argv[2] || '';

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Heirloom Corduroy Cosmetic Pouch — Swell Upload');
    console.log('===================================================\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    // ── Step 1: Create categories ─────────────────────────────────────
    console.log('STEP 1 · Creating categories...');
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
        console.log('  ✅ Created: ' + cat.title);
    }

    // ── Step 2: Create product ────────────────────────────────────────
    console.log('\nSTEP 2 · Creating product...');

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
                filename: 'heirloom-corduroy-cosmetic-pouch-main.' + ext,
            },
        }];
        console.log('  Image attached: ' + path.basename(IMAGE_PATH));
    } else if (IMAGE_PATH) {
        console.log('  ⚠️  Image not found: ' + IMAGE_PATH);
    }

    var existing = await swell.get('/products', { where: { slug: SLUG } });
    var product;

    if (existing && existing.results && existing.results.length > 0) {
        var prodId = existing.results[0].id;
        console.log('  Product exists (ID: ' + prodId + '). Updating...');
        product = await swell.put('/products/' + prodId, productData);
        console.log('  ✅ Updated!');
    } else {
        product = await swell.post('/products', productData);
        console.log('  ✅ Created!');
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
        console.log('\n  ⚠️  Fetching by slug...');
        var fetched = await swell.get('/products', { where: { slug: SLUG } });
        if (fetched && fetched.results && fetched.results.length > 0) {
            product = fetched.results[0];
            pid = product.id;
            console.log('  ✅ Found: ' + pid);
        }
    }

    // ── Step 3: Link categories ───────────────────────────────────────
    if (pid) {
        console.log('\nSTEP 3 · Linking categories...');
        for (var j = 0; j < CATEGORY_SLUGS.length; j++) {
            var slug = CATEGORY_SLUGS[j];
            var catResult = await swell.get('/categories', { where: { slug: slug } });
            if (catResult && catResult.results && catResult.results.length > 0) {
                await swell.post('/products/' + pid + '/categories', {
                    parent_id: pid,
                    category_id: catResult.results[0].id,
                });
                console.log('  ✅ Linked: ' + slug);
            } else {
                console.log('  ⚠️  Not found: ' + slug);
            }
        }
    }

    console.log('\n===================================================');
    console.log(' 🎉  Product is LIVE in Swell!');
    console.log('===================================================');
    console.log('\nPouch Color variants: 4 (Soft Cream, Baby Blue, Purple, Light Pink)');
    console.log('Design Style variants: 12');
    console.log('Font color variants: 3');
    console.log('Total variant combos: ' + (4 * 12 * 3));
    console.log('Custom fields: Names or Initials, Event Date');
}

run().catch(function(err) {
    console.error('❌ Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
