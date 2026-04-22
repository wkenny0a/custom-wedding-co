/**
 * create_photo_keepsake.js
 * ─────────────────────────
 * Creates the "Bespoke Interlocking Photo Keepsake" product on Swell,
 * uploads the generated hero image, configures variants & custom fields,
 * and publishes the listing live.
 *
 * Usage:  node scripts/create_photo_keepsake.js
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

// ── Image path ──────────────────────────────────────────────────────────────
const IMAGE_PATH = path.resolve(
  'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\89324553-b6fc-4f04-9ef7-ecea3adfccef\\photo_keepsake_product_1776592566470.png'
);

// ── Category definitions ────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Bespoke Wedding Gifts',     slug: 'bespoke-wedding-gifts' },
  { name: 'Anniversary Keepsakes',     slug: 'anniversary-keepsakes' },
  { name: 'Personalized Home Décor',   slug: 'personalized-home-decor' },
  { name: 'Heirloom & Artisan',        slug: 'heirloom-artisan' },
];

// ── Product definition ──────────────────────────────────────────────────────
const PRODUCT = {
  name: 'Bespoke Interlocking Photo Keepsake | Personalized Couples Heirloom Display',
  slug: 'bespoke-interlocking-photo-keepsake',
  active: true,
  price: 59.00,
  type: 'standard',
  description: `<p>Transform your most cherished memory into a timeless, interactive heirloom with our bespoke interlocking photo display.</p>
<ul>
<li><strong>Handcrafted Precision:</strong> Expertly printed on premium, durable acrylic with vibrant, fade-resistant UV ink to preserve your moments flawlessly.</li>
<li><strong>Bespoke Personalization:</strong> Elegantly customized with your chosen photograph, names, and special date for a truly one-of-a-kind keepsake.</li>
<li><strong>Interactive Elegance:</strong> An intimate, tactile experience allowing you to gently assemble and display your love story piece by piece.</li>
<li><strong>Versatile Display:</strong> Designed to stand beautifully on your mantle, desk, or bedside table as a constant reminder of your union.</li>
<li><strong>The Perfect Heirloom:</strong> A thoughtful, romantic gift for weddings, anniversaries, or celebrating the quiet milestones of your journey together.</li>
</ul>`,
  meta_title: 'Custom Photo Heirloom Keepsake | Luxury Personalized Wedding Gift',
  meta_description: 'Discover our Bespoke Interlocking Photo Keepsake. Handcrafted to celebrate your love story, this elegant personalized acrylic display is the perfect luxury wedding or anniversary gift.',
  options: [
    // ── Variant options ─────────────────────────────────────────────────────
    {
      name: 'Size',
      variant: true,
      active: true,
      values: [
        { name: 'Petite (8 x 10 cm)',     price: 0  },
        { name: 'Classic (10 x 12.7 cm)', price: 10 },
        { name: 'Grand (17 x 22 cm)',     price: 25 },
      ],
    },
    {
      name: 'Print Style',
      variant: true,
      active: true,
      values: [
        { name: 'Single-Sided Print', price: 0  },
        { name: 'Double-Sided Print', price: 15 },
      ],
    },
    // ── Custom input fields ─────────────────────────────────────────────────
    {
      name: 'Upload Your High-Resolution Photograph',
      input_type: 'long_text',
      required: true,
      description: 'Please provide a direct link (Google Drive, Dropbox, etc.) to your high-resolution photograph.',
    },
    {
      name: 'Names - e.g., Sophia & David',
      input_type: 'short_text',
      required: true,
    },
    {
      name: 'Established Date/Year - e.g., est. 2026',
      input_type: 'short_text',
      required: true,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════
(async () => {
  try {
    console.log('──────────────────────────────────────────────');
    console.log('  Bespoke Photo Keepsake  ·  Swell Publisher  ');
    console.log('──────────────────────────────────────────────\n');

    // ── 1. Ensure categories exist ────────────────────────────────────────
    console.log('[1/4] Ensuring categories exist...');
    const categoryIds = [];

    for (const cat of CATEGORIES) {
      const existing = await swell.get('/categories', { where: { slug: cat.slug } });

      if (existing.results && existing.results.length > 0) {
        console.log(`  ✓ Category exists: "${cat.name}" (${existing.results[0].id})`);
        categoryIds.push(existing.results[0].id);
      } else {
        const created = await swell.post('/categories', {
          name: cat.name,
          slug: cat.slug,
          active: true,
        });
        console.log(`  + Created category: "${cat.name}" (${created.id})`);
        categoryIds.push(created.id);
      }
    }

    // ── 2. Create product ─────────────────────────────────────────────────
    console.log('\n[2/4] Creating product listing...');

    // Check if already exists
    const existingProduct = await swell.get('/products', {
      where: { slug: PRODUCT.slug },
    });

    let product;
    if (existingProduct.results && existingProduct.results.length > 0) {
      console.log('  ⚠  Product already exists – updating in place.');
      product = await swell.put(`/products/${existingProduct.results[0].id}`, {
        ...PRODUCT,
        category_index: { id: categoryIds },
      });
    } else {
      product = await swell.post('/products', {
        ...PRODUCT,
        category_index: { id: categoryIds },
      });
    }
    console.log(`  ✓ Product ID: ${product.id}`);
    console.log(`  ✓ Slug:       ${product.slug}`);
    console.log(`  ✓ Status:     ${product.active ? 'ACTIVE / LIVE' : 'DRAFT'}`);

    // ── 3. Upload image ───────────────────────────────────────────────────
    console.log('\n[3/4] Uploading product hero image...');

    if (!fs.existsSync(IMAGE_PATH)) {
      console.error(`  ✗ Image not found at: ${IMAGE_PATH}`);
      process.exit(1);
    }

    const imageBuffer = fs.readFileSync(IMAGE_PATH);
    const base64Image = imageBuffer.toString('base64');
    const imageDataUri = `data:image/png;base64,${base64Image}`;

    const updatedProduct = await swell.put(`/products/${product.id}`, {
      images: [
        {
          file: {
            data: imageDataUri,
            filename: 'bespoke-photo-keepsake-hero.png',
            content_type: 'image/png',
          },
        },
      ],
    });

    const uploadedImageUrl = updatedProduct.images?.[0]?.file?.url
      || updatedProduct.images?.[0]?.url
      || '(URL pending CDN propagation)';
    console.log(`  ✓ Image uploaded: ${uploadedImageUrl}`);

    // ── 4. Final confirmation ─────────────────────────────────────────────
    console.log('\n[4/4] Verifying final product state...');
    const finalProduct = await swell.get(`/products/${product.id}`);

    console.log('\n══════════════════════════════════════════════');
    console.log('  PRODUCT PUBLISHED SUCCESSFULLY');
    console.log('══════════════════════════════════════════════');
    console.log(`  Name:         ${finalProduct.name}`);
    console.log(`  ID:           ${finalProduct.id}`);
    console.log(`  Slug:         ${finalProduct.slug}`);
    console.log(`  Price:        $${finalProduct.price}`);
    console.log(`  Active:       ${finalProduct.active}`);
    console.log(`  Options:      ${finalProduct.options?.length || 0}`);
    console.log(`  Images:       ${finalProduct.images?.length || 0}`);
    console.log(`  Categories:   ${categoryIds.length}`);
    console.log(`  Meta Title:   ${finalProduct.meta_title}`);
    console.log('══════════════════════════════════════════════\n');

  } catch (err) {
    console.error('\n✗ FATAL ERROR:', err.message || err);
    if (err.response) {
      console.error('  Response:', JSON.stringify(err.response, null, 2));
    }
    process.exit(1);
  }
})();
