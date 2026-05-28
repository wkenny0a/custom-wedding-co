require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Image ─────────────────────────────────────────────────────────────
const IMAGE_PATH = '/Users/kenny/.gemini/antigravity/brain/0b688d08-727a-4dde-b67c-7654492e22ea/ring_dish_product_1773359883499.png';

// ── Categories ────────────────────────────────────────────────────────
const categories = [
    {
        title: 'Bridal Party Gifts',
        slug: 'bridal-party-gifts',
        description: 'Curated, luxurious gifts for your bridal party and cherished loved ones.',
    },
    {
        title: 'Wedding Keepsakes',
        slug: 'wedding-keepsakes',
        description: 'Timeless, heirloom-quality keepsakes to treasure your most memorable moments.',
    },
    {
        title: 'Fine Jewelry Accessories',
        slug: 'fine-jewelry-accessories',
        description: 'Elegant jewelry accessories crafted with artisanal quality and refined detail.',
    },
    {
        title: 'Bespoke Home Decor',
        slug: 'bespoke-home-decor',
        description: 'Personalized, premium home decor pieces that add a touch of daily luxury.',
    },
];

// ── Product ───────────────────────────────────────────────────────────
const SLUG = 'bespoke-botanical-ceramic-ring-dish';

const productData = {
    name: 'Bespoke Botanical Ceramic Ring Dish | Personalized Heirloom Trinket Tray',
    slug: SLUG,
    active: true,
    price: 0,
    currency: 'USD',
    stock_tracking: false, // Made-to-order

    // ── Rich HTML description — brand-styled ──────────────────────────
    description: `
<div style="font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">

  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">
    Celebrate Love with a Personal Touch.
  </p>

  <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">
    A Keepsake Crafted for Your Most Treasured Moments
  </h2>

  <p style="margin-bottom: 2em; font-size: 1.05em; color: #4A2C2A;">
    Celebrate love with a personal touch by gifting this handcrafted, heirloom-quality ceramic ring dish, delicately personalized with bespoke botanical art to hold your most treasured keepsakes.
  </p>

  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Craftsmanship</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      Forged from premium, smooth ceramic and finished with an elegant, hand-painted antique gold rim.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Details</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      Intimately personalized with delicate botanical illustrations and classic serif typography to tell your unique story.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Silhouettes</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      Available in five elegant shapes, ranging from organic, wavy-edged rounds to romantic heart profiles.
    </li>
    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Quality</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      A warm, romantic keepsake designed to provide a touch of daily luxury to any vanity or bedside table.
    </li>
    <li style="padding: 0.8em 0;">
      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">The Perfect Gift</strong>
      <span style="color: #B89A52; margin: 0 0.4em;">—</span>
      The quintessential, one-of-a-kind offering for bridesmaids, maid of honor, or as a timeless wedding favor.
    </li>
  </ul>

</div>
`.trim(),

    // ── SEO ───────────────────────────────────────────────────────────
    meta_title: 'Personalized Botanical Ceramic Ring Dish | Luxury Bridal Party Gifts',
    meta_description:
        'Discover our bespoke botanical ceramic ring dishes. Featuring antique gold rims and custom typography, these heirloom-quality trinket trays are the perfect luxurious bridesmaid gift.',

    // ── Tags ──────────────────────────────────────────────────────────
    tags: [
        'ceramic ring dish',
        'trinket tray',
        'bridesmaid gift',
        'wedding keepsake',
        'botanical ring dish',
        'personalized ring dish',
        'bridal party gift',
        'heirloom trinket tray',
        'jewelry dish',
        'luxury wedding gift',
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
            flourishes: 'Delicate botanical olive branch line-art',
        },
    },
};

// ── Category slugs to link ────────────────────────────────────────────
const CATEGORY_SLUGS = ['bridal-party-gifts', 'wedding-keepsakes', 'fine-jewelry-accessories', 'bespoke-home-decor'];

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('═══════════════════════════════════════════════════');
    console.log(' Bespoke Botanical Ceramic Ring Dish — Swell Upload');
    console.log('═══════════════════════════════════════════════════\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    // ── Step 1: Upload image ──────────────────────────────────────────
    console.log('STEP 1 · Uploading product image...');
    let imageFileData = null;
    if (fs.existsSync(IMAGE_PATH)) {
        const imageBuffer = fs.readFileSync(IMAGE_PATH);
        const base64 = imageBuffer.toString('base64');
        const contentType = 'image/png';
        imageFileData = {
            data: base64,
            content_type: contentType,
            filename: 'bespoke-botanical-ceramic-ring-dish.png',
        };
        productData.images = [
            {
                file: imageFileData,
            },
        ];
        console.log('  ✅ Image loaded and attached.');
    } else {
        console.log('  ⚠️  Image not found at path. Proceeding without image.');
    }

    // ── Step 2: Create categories ─────────────────────────────────────
    console.log('\nSTEP 2 · Creating categories...');
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

    // ── Step 3: Create or update product ──────────────────────────────
    console.log('\nSTEP 3 · Creating product...');
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

    // ── Step 4: Link categories ───────────────────────────────────────
    if (pid) {
        console.log('\nSTEP 4 · Linking categories...');
        for (var i = 0; i < CATEGORY_SLUGS.length; i++) {
            var slug = CATEGORY_SLUGS[i];
            var result = await swell.get('/categories', { where: { slug: slug } });
            if (result && result.results && result.results.length > 0) {
                var catId = result.results[0].id;
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
    console.log(' 🎉  Bespoke Botanical Ceramic Ring Dish is LIVE in Swell!');
    console.log('═══════════════════════════════════════════════════');
    console.log('\nVariant options:');
    console.log('  Design Style: 12 Options');
    console.log('\n  Custom fields:');
    console.log('    • Names or Initials — Required');
    console.log('    • Event Date — Required');
}

run().catch(function(err) {
    console.error('❌ Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
