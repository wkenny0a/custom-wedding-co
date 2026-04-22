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
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Bespoke detailing featuring your choice of elegant names, dates, or curated locations.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Premium Neoprene</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      High-end, durable material ensures your drinks stay perfectly chilled from the first tee to the final hole.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Tailored Fit</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Available in both Standard (12oz traditional) and Slim (12oz seltzer) silhouettes.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Curated Palette</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
        '      Select from an array of refined cooler and print colors to seamlessly complement your sophisticated party aesthetic.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Keepsake</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
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
        {
            name: 'Cooler color',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Black' },
                { name: 'White' },
            ],
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
    console.log(' Beers & Birdies Can Cooler — Swell Upload');
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
                filename: 'can-cooler-thumbnail.' + ext,
            },
        }];
        console.log('  Image attached: ' + path.basename(IMAGE_PATH));
    } else if (IMAGE_PATH) {
        console.log('  ⚠️  Image not found: ' + IMAGE_PATH);
    }

    var existing = await swell.get('/products', { where: { slug: SLUG } });
    var product;

    if (existing && existing.results && existing.results.length > 0) {
        var prod = existing.results[0];
        console.log('  Product exists (ID: ' + prod.id + '). Updating...');
        product = await swell.put('/products/' + prod.id, productData);
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
    console.log('\nVariant options: 12 Design Styles × 3 Font Colors × 2 Cooler Colors = 72 combinations');
    console.log('Custom fields: Names or Initials (required), Event Date (required)');
}

run().catch(function(err) {
    console.error('❌ Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
