/**
 * create_seating_chart.js
 * ────────────────────────
 * Creates the "Custom Mirror Acrylic Seating Chart" product on Swell,
 * uploads 4 gallery images, configures variants & custom fields,
 * assigns to all relevant categories, and publishes live.
 *
 * Usage:  node scripts/create_seating_chart.js
 */

require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

// ── Swell init ──────────────────────────────────────────────────────────────
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// ── Image paths (4 gallery images) ──────────────────────────────────────────
const BRAIN_DIR = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\89324553-b6fc-4f04-9ef7-ecea3adfccef';
const IMAGES = [
  { path: path.join(BRAIN_DIR, 'gold_seating_chart_1776931548495.png'),         filename: 'mirror-seating-chart-gold-hero.png' },
  { path: path.join(BRAIN_DIR, 'seating_chart_detail_1776931705832.png'),        filename: 'mirror-seating-chart-detail-calligraphy.png' },
  { path: path.join(BRAIN_DIR, 'seating_chart_venue_1776931720006.png'),         filename: 'mirror-seating-chart-venue-lifestyle.png' },
  { path: path.join(BRAIN_DIR, 'seating_chart_silver_1776931735145.png'),        filename: 'mirror-seating-chart-silver-variant.png' },
];

// ── Categories this product belongs to (by slug) ────────────────────────────
const CATEGORY_SLUGS = [
  'wedding-decor',                  // Wedding Decor
  'wedding-reception-decor',        // Wedding Reception Decor
  'bespoke-reception-decor',        // Bespoke Reception Decor
  'bespoke-signage',                // Bespoke Signage
  'custom-signage',                 // Custom Signage
  'signs',                          // Signs
  'personalized-wedding-details',   // Personalized Wedding Details
  'luxury-wedding-details',         // Luxury Wedding Details
  'bespoke-details',                // Bespoke Details
  'bespoke-wedding-gifts',          // Bespoke Wedding Gifts (custom)
  'heirloom-artisan',               // Heirloom & Artisan (custom)
  'personalized-home-decor',        // Personalized Home Décor (custom)
];

// ── Product definition ──────────────────────────────────────────────────────
const PRODUCT = {
  name: 'Custom Mirror Acrylic Seating Chart | Luxury Wedding Reception Display',
  slug: 'custom-mirror-acrylic-seating-chart',
  active: true,
  price: 89.00,
  type: 'standard',
  description: `<p>Guide your guests to their seats in the most unforgettable way with our bespoke mirror acrylic seating chart — a statement piece that doubles as a work of art for your reception.</p>

<ul>
<li><strong>Premium Mirror Acrylic:</strong> Expertly crafted from high-quality mirror-finish acrylic that catches the ambient light of your venue, creating a luminous, show-stopping centerpiece at your welcome table.</li>
<li><strong>Precision UV Calligraphy:</strong> Every guest name and table assignment is printed with fade-resistant UV ink in elegant serif calligraphy — crisp, legible, and utterly refined.</li>
<li><strong>Fully Bespoke Layout:</strong> Send us your complete guest list and table assignments, and our design team will craft a balanced, beautiful layout with your choice of header text, fonts, and decorative flourishes.</li>
<li><strong>Multiple Finish Options:</strong> Available in Gold Mirror, Silver Mirror, or Rose Gold Mirror to perfectly complement your reception palette and décor theme.</li>
<li><strong>Generous Sizing:</strong> Available in three sizes to accommodate intimate gatherings to grand celebrations — from 60 to 250+ guests.</li>
<li><strong>Versatile Display:</strong> Arrives ready to display on an easel (not included). Our charts are lightweight yet rigid, ensuring they stand beautifully throughout your event.</li>
<li><strong>A Keepsake Beyond the Day:</strong> Many couples repurpose their seating chart as elegant wall art in their home — a daily reminder of the people who celebrated their love.</li>
</ul>

<h3>Production &amp; Shipping</h3>
<ul>
<li>✦ Digital proof delivered within 2–3 business days</li>
<li>✦ Unlimited revisions until you're completely in love with the design</li>
<li>✦ Production: 5–7 business days after proof approval</li>
<li>✦ Shipped in custom protective packaging to ensure flawless arrival</li>
</ul>

<h3>Our Promise</h3>
<p>Because every chart is custom-made to your specifications, we do not accept returns. However, we stand behind our craft 100%:</p>
<ul>
<li>✦ Unlimited proof revisions — we refine until you love it</li>
<li>✦ If we make a production error — we reprint at no charge</li>
<li>✦ If damaged in shipping — full replacement sent immediately</li>
</ul>`,

  meta_title: 'Custom Mirror Acrylic Seating Chart | Luxury Wedding Reception Sign',
  meta_description: 'Elevate your wedding reception with a bespoke mirror acrylic seating chart. Precision UV calligraphy on premium gold, silver, or rose gold mirror acrylic. Handcrafted luxury for your special day.',

  tags: [
    'seating chart', 'wedding seating chart', 'mirror seating chart',
    'acrylic seating chart', 'gold mirror sign', 'wedding reception',
    'wedding signage', 'luxury wedding', 'bespoke wedding',
    'personalized wedding', 'reception decor', 'table assignments',
    'wedding welcome sign', 'calligraphy sign',
  ],

  options: [
    // ── Variant: Mirror Finish ──────────────────────────────────────────────
    {
      name: 'Mirror Finish',
      variant: true,
      active: true,
      values: [
        { name: 'Gold Mirror',      price: 0 },
        { name: 'Silver Mirror',    price: 0 },
        { name: 'Rose Gold Mirror', price: 15 },
      ],
    },
    // ── Variant: Size ───────────────────────────────────────────────────────
    {
      name: 'Size',
      variant: true,
      active: true,
      values: [
        { name: 'Intimate (16 x 20 in) — Up to 60 guests',   price: 0 },
        { name: 'Classic (20 x 30 in) — Up to 150 guests',   price: 40 },
        { name: 'Grand (24 x 36 in) — Up to 250+ guests',    price: 85 },
      ],
    },
    // ── Variant: Header Style ───────────────────────────────────────────────
    {
      name: 'Header Style',
      variant: true,
      active: true,
      values: [
        { name: 'Classic — "Please Find Your Seat"',   price: 0 },
        { name: 'Romantic — "Find Your Seat, Find Your Place in Our Story"', price: 0 },
        { name: 'Custom Header Text',                  price: 0 },
      ],
    },
    // ── Custom fields ───────────────────────────────────────────────────────
    {
      name: 'Guest List & Table Assignments',
      input_type: 'long_text',
      required: true,
      description: 'Please provide your complete guest list with table assignments (e.g., "Table 1: John & Jane Smith, Robert & Mary Johnson"). You can also upload a spreadsheet link.',
    },
    {
      name: 'Couple Names for Header — e.g., Sophia & David',
      input_type: 'short_text',
      required: true,
    },
    {
      name: 'Wedding Date — e.g., June 15, 2026',
      input_type: 'short_text',
      required: true,
    },
    {
      name: 'Custom Header Text (if selected above)',
      input_type: 'short_text',
      required: false,
    },
    {
      name: 'Special Instructions or Design Preferences',
      input_type: 'long_text',
      required: false,
      description: 'Any additional details about fonts, decorative elements, layout preferences, or other special requests.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════
(async () => {
  try {
    console.log('══════════════════════════════════════════════════════════');
    console.log('  Mirror Acrylic Seating Chart  ·  Swell Product Builder');
    console.log('══════════════════════════════════════════════════════════\n');

    // ── 1. Resolve category IDs ───────────────────────────────────────────
    console.log('[1/5] Resolving categories...');
    const categoryIds = [];

    for (const slug of CATEGORY_SLUGS) {
      const result = await swell.get('/categories', { where: { slug } });
      if (result.results && result.results.length > 0) {
        console.log(`  ✓ Found: "${result.results[0].name}" (${slug})`);
        categoryIds.push(result.results[0].id);
      } else {
        console.log(`  ⚠ Not found, creating: ${slug}`);
        const created = await swell.post('/categories', {
          name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug,
          active: true,
        });
        console.log(`  + Created: "${created.name}" (${created.id})`);
        categoryIds.push(created.id);
      }
    }
    console.log(`  → ${categoryIds.length} categories resolved.\n`);

    // ── 2. Check for existing product & create/update ─────────────────────
    console.log('[2/5] Creating product listing...');
    const existing = await swell.get('/products', { where: { slug: PRODUCT.slug } });

    let product;
    if (existing.results && existing.results.length > 0) {
      console.log('  ⚠ Product slug already exists — updating in place.');
      product = await swell.put(`/products/${existing.results[0].id}`, {
        ...PRODUCT,
        category_index: { id: categoryIds },
      });
    } else {
      product = await swell.post('/products', {
        ...PRODUCT,
        category_index: { id: categoryIds },
      });
    }

    console.log(`  ✓ Product ID:  ${product.id}`);
    console.log(`  ✓ Slug:        ${product.slug}`);
    console.log(`  ✓ Base Price:  $${product.price}`);
    console.log(`  ✓ Active:      ${product.active}\n`);

    // ── 3. Upload gallery images ──────────────────────────────────────────
    console.log('[3/5] Uploading product gallery (4 images)...');
    const imagePayloads = [];

    for (let i = 0; i < IMAGES.length; i++) {
      const img = IMAGES[i];
      if (!fs.existsSync(img.path)) {
        console.error(`  ✗ Image not found: ${img.path}`);
        continue;
      }
      const buffer = fs.readFileSync(img.path);
      const base64 = buffer.toString('base64');
      imagePayloads.push({
        file: {
          data: `data:image/png;base64,${base64}`,
          filename: img.filename,
          content_type: 'image/png',
        },
      });
      console.log(`  ✓ Prepared: ${img.filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
    }

    const updatedProduct = await swell.put(`/products/${product.id}`, {
      images: imagePayloads,
    });

    console.log(`  → ${updatedProduct.images?.length || 0} images uploaded to CDN.\n`);

    // ── 4. Verify uploaded image URLs ─────────────────────────────────────
    console.log('[4/5] Verifying image URLs...');
    if (updatedProduct.images) {
      updatedProduct.images.forEach((img, i) => {
        const url = img.file?.url || img.url || '(pending)';
        console.log(`  [${i + 1}] ${url}`);
      });
    }

    // ── 5. Final verification ─────────────────────────────────────────────
    console.log('\n[5/5] Final product verification...');
    const final = await swell.get(`/products/${product.id}`);

    console.log('\n══════════════════════════════════════════════════════════');
    console.log('  ✅  PRODUCT PUBLISHED SUCCESSFULLY');
    console.log('══════════════════════════════════════════════════════════');
    console.log(`  Name:           ${final.name}`);
    console.log(`  ID:             ${final.id}`);
    console.log(`  Slug:           ${final.slug}`);
    console.log(`  Base Price:     $${final.price}`);
    console.log(`  Active:         ${final.active}`);
    console.log(`  Options:        ${final.options?.length || 0}`);
    console.log(`  Images:         ${final.images?.length || 0}`);
    console.log(`  Categories:     ${categoryIds.length}`);
    console.log(`  Tags:           ${final.tags?.length || 0}`);
    console.log(`  SEO Title:      ${final.meta_title}`);
    console.log(`  Meta Desc:      ${final.meta_description?.substring(0, 80)}...`);
    console.log('══════════════════════════════════════════════════════════\n');

  } catch (err) {
    console.error('\n✗ FATAL ERROR:', err.message || err);
    if (err.response) {
      console.error('  Response:', JSON.stringify(err.response, null, 2));
    }
    process.exit(1);
  }
})();
