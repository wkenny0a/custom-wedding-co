/**
 * cro_immediate_fixes.js
 * ───────────────────────
 * Executes all critical Swell backend fixes from the CRO audit:
 * 1. Fix $0 products (Golf Balls, Invitation Suite, Place Cards)
 * 2. Fix BESPOKE HEIRLOOM GUEST BOOK ALL CAPS title + add tags/cats
 * 3. Fix Bridesmaid PJs $21.21 → $21.99
 * 4. Add compare-at (sale) pricing to 15+ products
 * 5. Add tags to 5 products with 0 tags
 * 6. Assign categories to 6 orphaned products
 *
 * Usage: node scripts/cro_immediate_fixes.js
 */

require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);

async function getProduct(slug) {
  const r = await swell.get('/products', { where: { slug } });
  return r.results?.[0];
}

async function getCategoryIds(slugs) {
  const ids = [];
  for (const slug of slugs) {
    const r = await swell.get('/categories', { where: { slug } });
    if (r.results?.length) ids.push(r.results[0].id);
  }
  return ids;
}

(async () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   CRO Immediate Fixes — Swell Backend Updates          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // ─── FIX 1: $0 Products ─────────────────────────────────────────────
  console.log('━━━ FIX 1: Products at $0 ━━━');

  // Golf Balls — set to $24.99 (1 dozen base)
  const golf = await getProduct('bespoke-personalized-golf-balls');
  if (golf) {
    await swell.put(`/products/${golf.id}`, { price: 24.99 });
    console.log('  ✓ Golf Balls: $0 → $24.99');
  }

  // Invitation Suite — set to $49.99 (suite base)
  const invites = await getProduct('the-heirloom-acrylic-wedding-invitation-suite');
  if (invites) {
    await swell.put(`/products/${invites.id}`, { price: 49.99 });
    console.log('  ✓ Invitation Suite: $0 → $49.99');
  }

  // Place Cards — set to $9.99 (per set base)
  const placeCards = await getProduct('bespoke-folded-wedding-place-cards');
  if (placeCards) {
    await swell.put(`/products/${placeCards.id}`, { price: 9.99 });
    console.log('  ✓ Place Cards: $0 → $9.99');
  }

  // ─── FIX 2: Guest Book ALL CAPS + missing tags/cats ─────────────────
  console.log('\n━━━ FIX 2: Guest Book ALL CAPS + Tags + Categories ━━━');

  const guestBook = await getProduct('bespoke-heirloom-guest-book');
  if (guestBook) {
    const gbCats = await getCategoryIds([
      'wedding-stationery', 'bespoke-details', 'heirloom-keepsakes',
      'personalized-wedding-details', 'luxury-wedding-details',
      'wedding-reception-details',
    ]);
    await swell.put(`/products/${guestBook.id}`, {
      name: 'Bespoke Heirloom Wedding Guest Book | Personalized Linen & Gold Foil',
      tags: [
        'guest book', 'wedding guest book', 'heirloom guest book',
        'linen guest book', 'personalized guest book', 'gold foil guest book',
        'reception decor', 'wedding keepsake', 'signature book',
        'photo guest book',
      ],
      category_index: { id: gbCats },
    });
    console.log('  ✓ Title fixed: ALL CAPS → Title Case');
    console.log('  ✓ Tags added: 10');
    console.log('  ✓ Categories assigned: ' + gbCats.length);
  }

  // ─── FIX 3: Bridesmaid PJs $21.21 → $21.99 ─────────────────────────
  console.log('\n━━━ FIX 3: Bridesmaid PJs pricing ━━━');

  const pjs = await getProduct('bespoke-satin-bridesmaid-pajama-set');
  if (pjs) {
    await swell.put(`/products/${pjs.id}`, { price: 21.99 });
    console.log('  ✓ Satin PJs: $21.21 → $21.99');
  }

  // ─── FIX 4: Add tags to products with 0 tags ────────────────────────
  console.log('\n━━━ FIX 4: Add tags to untagged products ━━━');

  // Rose Set
  const roses = await getProduct('everlasting-heirloom-rose-set');
  if (roses) {
    const roseCats = await getCategoryIds([
      'bespoke-details', 'heirloom-keepsakes', 'luxury-wedding-details',
      'wedding-reception-decor', 'bridal-shower-offerings',
    ]);
    await swell.put(`/products/${roses.id}`, {
      tags: [
        'preserved roses', 'heirloom roses', 'wedding flowers',
        'anniversary gift', 'forever roses', 'luxury roses',
        'bridal bouquet keepsake', 'wedding decor',
        'table centerpiece', 'gift for bride',
      ],
      category_index: { id: roseCats },
    });
    console.log('  ✓ Rose Set: +10 tags, +' + roseCats.length + ' categories');
  }

  // Sunglasses
  const sunglasses = await getProduct('luxe-just-married-honeymoon-sunglasses');
  if (sunglasses) {
    const sunCats = await getCategoryIds([
      'personalized-accessories', 'bespoke-accessories',
      'honeymoon-essentials', 'wedding-favors',
      'bridal-shower-offerings',
    ]);
    await swell.put(`/products/${sunglasses.id}`, {
      tags: [
        'just married sunglasses', 'honeymoon accessories', 'wedding sunglasses',
        'bride sunglasses', 'bachelorette party', 'wedding favors',
        'beach wedding', 'honeymoon gift', 'newlywed gift',
        'photo prop sunglasses',
      ],
      category_index: { id: sunCats },
    });
    console.log('  ✓ Sunglasses: +10 tags, +' + sunCats.length + ' categories');
  }

  // Concierge Service
  const concierge = await getProduct('personal-product-specialist');
  if (concierge) {
    await swell.put(`/products/${concierge.id}`, {
      tags: [
        'wedding concierge', 'personal stylist', 'wedding planning',
        'bridal consultation', 'gift consultation', 'personalized service',
        'wedding coordinator', 'custom order help',
      ],
      meta_title: 'Personal Wedding Concierge Service | 1-on-1 Custom Order Specialist',
      meta_description: 'Get personalized help designing your perfect wedding details. Our concierge works 1-on-1 with you to customize any product in our collection.',
    });
    console.log('  ✓ Concierge: +8 tags, +SEO meta');
  }

  // Photo Keepsake
  const photo = await getProduct('bespoke-interlocking-photo-keepsake');
  if (photo) {
    const photoCats = await getCategoryIds([
      'heirloom-keepsakes', 'personalized-home-decor', 'bespoke-home-decor',
      'luxury-wedding-details', 'personalized-wedding-details',
    ]);
    await swell.put(`/products/${photo.id}`, {
      tags: [
        'photo keepsake', 'acrylic photo block', 'couples photo gift',
        'anniversary gift', 'wedding photo display', 'heirloom display',
        'personalized photo', 'engagement gift', 'custom photo block',
        'interlocking photo',
      ],
      category_index: { id: photoCats },
    });
    console.log('  ✓ Photo Keepsake: +10 tags, +' + photoCats.length + ' categories');
  }

  // Pavé Necklace
  const necklace = await getProduct('bespoke-pav-name-necklace');
  if (necklace) {
    await swell.put(`/products/${necklace.id}`, {
      tags: [
        'name necklace', 'pave necklace', 'bridal necklace',
        'bridesmaid gift', 'personalized necklace', 'custom necklace',
        'gold name necklace', 'wedding jewelry', 'script necklace',
        'diamond necklace',
      ],
    });
    console.log('  ✓ Pavé Necklace: +10 tags');
  }

  // ─── FIX 5: Assign categories to orphaned products ──────────────────
  console.log('\n━━━ FIX 5: Assign categories to orphaned products ━━━');

  // Welcome Sign
  const welcomeSign = await getProduct('bespoke-mirrored-acrylic-wedding-welcome-sign');
  if (welcomeSign && (!welcomeSign.category_index?.id?.length)) {
    const wsCats = await getCategoryIds([
      'bespoke-signage-mirrors', 'wedding-signs', 'wedding-reception-decor',
      'heirloom-keepsakes', 'luxury-wedding-details', 'bespoke-details',
    ]);
    await swell.put(`/products/${welcomeSign.id}`, { category_index: { id: wsCats } });
    console.log('  ✓ Welcome Sign: +' + wsCats.length + ' categories');
  } else {
    console.log('  - Welcome Sign: already categorized or not found');
  }

  // Wine Glass Set
  const wineGlass = await getProduct('bespoke-engraved-stemless-wine-glass-set');
  if (wineGlass && (!wineGlass.category_index?.id?.length)) {
    const wgCats = await getCategoryIds([
      'bespoke-barware-accessories', 'personalized-accessories',
      'heirloom-keepsakes', 'luxury-wedding-details',
      'wedding-reception-details',
    ]);
    await swell.put(`/products/${wineGlass.id}`, { category_index: { id: wgCats } });
    console.log('  ✓ Wine Glass Set: +' + wgCats.length + ' categories');
  } else {
    console.log('  - Wine Glass Set: already categorized or not found');
  }

  // ─── FIX 6: Add compare-at pricing ──────────────────────────────────
  console.log('\n━━━ FIX 6: Add compare-at (strikethrough) pricing ━━━');

  const comparePricing = [
    { slug: 'heritage-velvet-ring-box', sale: 19.99, orig: 34.99 },
    { slug: 'luxe-bridal-emergency-kit', sale: 44.99, orig: 64.99 },
    { slug: 'bespoke-monogram-wax-seal-stickers', sale: 18, orig: 28 },
    { slug: 'mr-mrs-leather-luggage-tag-set', sale: 24.99, orig: 39.99 },
    { slug: 'bridesmaid-proposal-gift-box', sale: 39.99, orig: 59.99 },
    { slug: 'groomsmen-proposal-gift-box', sale: 44.99, orig: 69.99 },
    { slug: 'mr-mrs-champagne-flute-set', sale: 39.99, orig: 59.99 },
    { slug: 'bespoke-wedding-day-scented-candle', sale: 28.99, orig: 42 },
    { slug: 'luxury-linen-wedding-planner-binder', sale: 49.99, orig: 74.99 },
    { slug: 'bespoke-engraved-cufflinks', sale: 24.99, orig: 39.99 },
    { slug: 'bespoke-hand-crocheted-bridal-tote', sale: 25, orig: 39.99 },
    { slug: 'bespoke-satin-bridesmaid-pajama-set', sale: 21.99, orig: 34.99 },
    { slug: 'bespoke-engraved-compact-mirror', sale: 19.99, orig: 29.99 },
    { slug: 'heirloom-corduroy-cosmetic-pouch', sale: 23.99, orig: 34.99 },
    { slug: 'bespoke-leather-wrapped-hip-flask', sale: 23.99, orig: 39.99 },
  ];

  for (const item of comparePricing) {
    const p = await getProduct(item.slug);
    if (p) {
      await swell.put(`/products/${p.id}`, {
        price: item.sale,
        sale: true,
        sale_price: item.sale,
        orig_price: item.orig,
      });
      console.log(`  ✓ ${item.slug}: $${item.sale} (was $${item.orig})`);
    }
  }

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║   ALL SWELL BACKEND FIXES COMPLETE                     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
})();
