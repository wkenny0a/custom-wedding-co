require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Categories ────────────────────────────────────────────────────────
const categories = [
    {
        title: 'Wedding Signs',
        slug: 'wedding-signs',
        description: 'Elegant, handcrafted wedding signs to set the tone for your celebration.',
    },
    {
        title: 'Event Decor',
        slug: 'event-decor',
        description: 'Beautiful decor pieces for weddings, events, and special occasions.',
    },
    {
        title: 'Welcome Signs',
        slug: 'welcome-signs',
        description: 'Stunning welcome signs to greet your guests with warmth and style.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
const SLUG = 'bespoke-wildflower-acrylic-wedding-welcome-sign';

const productData = {
    name: 'Bespoke Wildflower Acrylic Wedding Welcome Sign | Heirloom Floral Reception Sign',
    slug: SLUG,
    active: true,
    price: 71.45,
    currency: 'USD',
    stock_tracking: false, // Made-to-order

    // ── Rich HTML description — brand-styled ──────────────────────────
    description: `
<div style="font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">

  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">
    Celebrate Love with a Personal Touch.
  </p>

  <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">
    Welcome Your Guests with Timeless Elegance
  </h2>

  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">
    Welcome your guests with timeless elegance using our handcrafted, heirloom-quality wildflower acrylic sign, designed to add a warm, romantic, and bespoke touch to your unforgettable day.
  </p>

  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Botanical Design</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      Features delicate, line-art-inspired wildflower flourishes that evoke the beauty of a hand-gathered garden bouquet.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Quality Materials</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      Crafted from premium 1/8″ thick acrylic for a flawless, crystal-clear finish that catches the light beautifully.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Typography</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      Personalized with classic, widely-spaced serif fonts for an intimate, bespoke feel.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Premium Finish</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      UV-printed for a durable, fade-resistant finish that preserves every detail for years to come.
    </li>
    <li style="padding: 0.8em 0;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">A Personal Touch</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      Intimately crafted and fully customizable — every sign is made to order, just for you.
    </li>
  </ul>

</div>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Custom Wildflower Acrylic Wedding Welcome Sign | Luxury Floral Sign',
    meta_description:
        'Elevate your wedding decor with our luxury wildflower acrylic welcome sign. Handcrafted with timeless elegance, classic serif typography, and delicate botanical art. Fully customizable for your special day.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'wedding welcome sign',
        'acrylic sign',
        'wildflower sign',
        'floral wedding sign',
        'custom wedding sign',
        'reception sign',
        'wedding decor',
        'heirloom sign',
        'botanical sign',
        'luxury wedding',
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
                { name: '12x16 Inches', price: 0 },         // Base price: $71.45
                { name: '18x24 Inches', price: 28.55 },     // Total: $100.00
                { name: '24x36 Inches', price: 58.55 },     // Total: $130.00
            ],
        },
        {
            name: 'Design',
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
                { name: 'Design 6' },
            ],
        },
        {
            name: 'Partner 1 Name',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the first name exactly as you would like it to appear.',
        },
        {
            name: 'Partner 2 Name',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the second name exactly as you would like it to appear.',
        },
        {
            name: 'Wedding Date',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'e.g. October 12, 2026',
        },
        {
            name: 'Special Instructions',
            variant: false,
            active: true,
            required: false,
            input_type: 'long_text',
            description: 'Optional — any additional details or requests for your sign.',
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
            flourishes: 'Delicate wildflower/botanical line-art flourishes',
        },
    },
};

// ── Category slugs to link ────────────────────────────────────────────
const CATEGORY_SLUGS = ['wedding-signs', 'event-decor', 'welcome-signs'];

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('═══════════════════════════════════════════════════');
    console.log(' Wildflower Acrylic Welcome Sign — Swell Upload');
    console.log('═══════════════════════════════════════════════════\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    // ── Step 1: Create categories ─────────────────────────────────────
    console.log('STEP 1 · Creating categories...');
    for (const cat of categories) {
        const existing = await swell.get('/categories', { where: { slug: cat.slug } });
        if (existing && existing.results && existing.results.length > 0) {
            console.log('  ↳ "' + cat.title + '" already exists. Skipping.');
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

    // ── Step 2: Create or update product (without categories) ─────────
    console.log('\nSTEP 2 · Creating product...');
    const existing = await swell.get('/products', { where: { slug: SLUG } });

    let product;
    if (existing && existing.results && existing.results.length > 0) {
        console.log('  Product exists (ID: ' + existing.results[0].id + '). Updating...');
        product = await swell.put('/products/' + existing.results[0].id, productData);
        console.log('  ✅ Updated!');
    } else {
        product = await swell.post('/products', productData);
        console.log('  ✅ Created!');
    }

    var pid = product && product.id;
    var pname = product && product.name;
    var pslug = product && product.slug;
    var pprice = product && product.price;
    var pactive = product && product.active;
    var popts = product && product.options && product.options.length;
    console.log('\n  ID      : ' + pid);
    console.log('  Name    : ' + pname);
    console.log('  Slug    : ' + pslug);
    console.log('  Price   : $' + pprice);
    console.log('  Active  : ' + pactive);
    console.log('  Options : ' + (popts || 0));

    // If product returned without id, try to fetch it by slug
    if (!pid) {
        console.log('\n  ⚠️  Response missing ID, fetching product by slug...');
        var fetched = await swell.get('/products', { where: { slug: SLUG } });
        if (fetched && fetched.results && fetched.results.length > 0) {
            product = fetched.results[0];
            pid = product.id;
            console.log('  ✅ Found product: ' + pid);
        }
    }

    // ── Step 3: Link categories ───────────────────────────────────────
    if (pid) {
        console.log('\nSTEP 3 · Linking categories...');
        for (var i = 0; i < CATEGORY_SLUGS.length; i++) {
            var slug = CATEGORY_SLUGS[i];
            var result = await swell.get('/categories', { where: { slug: slug } });
            if (result && result.results && result.results.length > 0) {
                var catId = result.results[0].id;
                // Add product to this category via the :categories collection
                await swell.post('/products/' + pid + '/categories', {
                    parent_id: pid,
                    category_id: catId,
                });
                console.log('  ✅ Linked: ' + slug);
            } else {
                console.log('  ⚠️  Category not found: ' + slug);
            }
        }
    }

    // ── Summary ───────────────────────────────────────────────────────
    console.log('\n═══════════════════════════════════════════════════');
    console.log(' 🎉  Product is LIVE in Swell!');
    console.log('═══════════════════════════════════════════════════');
    console.log('\nVariant pricing:');
    console.log('  • 12x16 Inches  →  $71.45  (base)');
    console.log('  • 18x24 Inches  →  $100.00 (+$28.55)');
    console.log('  • 24x36 Inches  →  $130.00 (+$58.55)');
}

run().catch(function(err) {
    console.error('❌ Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
