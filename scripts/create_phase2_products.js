/**
 * create_phase2_products.js
 * ──────────────────────────
 * Creates all 7 Phase-2 expansion products on Swell.
 *
 * Usage:  node scripts/create_phase2_products.js
 */

require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const BRAIN = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\89324553-b6fc-4f04-9ef7-ecea3adfccef';

const PRODUCTS = [

  // ─── 9. Bridesmaid Proposal Box ───────────────────────────────────────
  {
    image: path.join(BRAIN, 'bridesmaid_proposal_box_1776944885681.png'),
    categorySlugs: [
      'bridesmaids-gifts', 'bridal-shower-offerings',
      'bespoke-accessories', 'personalized-accessories',
      'luxury-wedding-details',
    ],
    product: {
      name: 'Bridesmaid Proposal Gift Box | "Will You Be My Bridesmaid?" Keepsake Set',
      slug: 'bridesmaid-proposal-gift-box',
      active: true,
      price: 39.99,
      type: 'standard',
      description: `<p>Ask your favorite girls the most important question (after "will you marry me?") with a gift box as beautiful as your friendship. Our Bridesmaid Proposal Box is a lovingly curated collection of luxe, pampering keepsakes — wrapped in blush and gold — that sets the tone for everything your bridal party will experience together.</p>

<h3>What's Inside</h3>
<ul>
<li><strong>Satin Scrunchie:</strong> Oversized satin hair scrunchie in blush pink — perfect for getting-ready photos</li>
<li><strong>Mini Soy Candle:</strong> Hand-poured soy candle in a gold tin with a custom wedding-day scent (white gardenia & vanilla)</li>
<li><strong>Artisan Bath Bomb:</strong> Blush-colored botanical bath bomb with rose petals and essential oils</li>
<li><strong>Personalized Compact Mirror:</strong> Gold-trimmed compact mirror with their name in elegant script</li>
<li><strong>Proposal Card:</strong> Letterpress card in our signature serif typography — "Will You Be My Bridesmaid / Maid of Honor?"</li>
<li><strong>Gift Box:</strong> Blush magnetic-closure gift box with cream tissue paper, gold foil label, and dried flower sprig</li>
</ul>

<h3>Ordering for Your Full Party?</h3>
<ul>
<li>✦ Select the quantity for your entire bridal party</li>
<li>✦ List each bridesmaid's name on a separate line below — we personalize each mirror individually</li>
<li>✦ Each box ships individually wrapped and gift-ready</li>
</ul>`,
      meta_title: 'Bridesmaid Proposal Gift Box | Personalized "Will You Be My Bridesmaid?" Keepsake',
      meta_description: 'Ask your bridesmaids in style with a curated proposal gift box. Includes satin scrunchie, mini candle, bath bomb, personalized mirror & proposal card. Premium blush & gold packaging.',
      tags: [
        'bridesmaid proposal', 'bridesmaid gift', 'maid of honor gift',
        'bridesmaid box', 'will you be my bridesmaid', 'bridal party gift',
        'bridal shower', 'bridesmaid keepsake', 'wedding party',
        'proposal box', 'bridesmaid ask',
      ],
      options: [
        {
          name: 'Quantity',
          variant: true,
          active: true,
          values: [
            { name: '1 Box', price: 0 },
            { name: '2 Boxes', price: 39.99 },
            { name: '3 Boxes', price: 79.98 },
            { name: '4 Boxes', price: 119.97 },
            { name: '5 Boxes', price: 159.96 },
            { name: '6 Boxes', price: 199.95 },
            { name: '7 Boxes', price: 239.94 },
            { name: '8 Boxes', price: 279.93 },
          ],
        },
        {
          name: 'Card Type',
          variant: true,
          active: true,
          values: [
            { name: '"Will You Be My Bridesmaid?"', price: 0 },
            { name: '"Will You Be My Maid of Honor?"', price: 0 },
            { name: '"Will You Be My Matron of Honor?"', price: 0 },
            { name: 'Mixed (specify below)', price: 0 },
          ],
        },
        {
          name: 'Names for Mirrors (one per line)',
          input_type: 'long_text',
          required: true,
          description: 'List each bridesmaid name on a separate line. We will engrave each compact mirror individually.',
        },
      ],
    },
  },

  // ─── 10. Champagne Flute Set ──────────────────────────────────────────
  {
    image: path.join(BRAIN, 'champagne_flutes_1776944898601.png'),
    categorySlugs: [
      'bespoke-barware-accessories', 'wedding-reception-details',
      'wedding-reception-decor', 'heirloom-keepsakes',
      'luxury-wedding-details',
    ],
    product: {
      name: '"Cheers to the Mr & Mrs" Gold-Rimmed Crystal Champagne Flute Set',
      slug: 'mr-mrs-champagne-flute-set',
      active: true,
      price: 39.99,
      type: 'standard',
      description: `<p>Raise your first toast as newlyweds in crystal clarity and golden elegance. Our handcrafted champagne flute set features genuine gold rims and delicately etched "Mr." and "Mrs." lettering — a stunning centerpiece for your head table and a keepsake you'll use on every anniversary.</p>

<ul>
<li><strong>Lead-Free Crystal:</strong> Premium hand-blown crystal with extraordinary clarity and a satisfying, resonant clink</li>
<li><strong>Genuine Gold Rim:</strong> Each flute features a hand-applied 24K gold rim that catches candlelight beautifully</li>
<li><strong>Etched Personalization:</strong> "Mr." and "Mrs." etched in elegant script — or upgrade to custom names</li>
<li><strong>Gift-Ready Packaging:</strong> Arrives in a cream satin-lined gift box with gold foil branding</li>
<li><strong>Dishwasher-Safe:</strong> Hand-wash recommended for longevity, but the etching and gold rim are dishwasher-resistant</li>
</ul>`,
      meta_title: 'Mr & Mrs Gold-Rimmed Crystal Champagne Flutes | Luxury Wedding Toast Set',
      meta_description: 'Toast your new beginning with gold-rimmed crystal champagne flutes etched with "Mr." & "Mrs." Premium lead-free crystal, 24K gold rim. Gift-boxed and ready to celebrate.',
      tags: [
        'champagne flutes', 'wedding toast', 'mr and mrs glasses',
        'crystal champagne glasses', 'gold rimmed flutes', 'wedding gift',
        'toasting glasses', 'head table decor', 'anniversary gift',
        'couples champagne set', 'reception drinkware',
      ],
      options: [
        {
          name: 'Personalization',
          variant: true,
          active: true,
          values: [
            { name: 'Classic "Mr." & "Mrs."', price: 0 },
            { name: 'Custom Names (e.g., "Sophia" & "David")', price: 8 },
            { name: 'Custom Names + Date', price: 12 },
          ],
        },
        {
          name: 'Custom Names (if selected above)',
          input_type: 'short_text',
          required: false,
        },
        {
          name: 'Wedding Date (if selected above)',
          input_type: 'short_text',
          required: false,
        },
      ],
    },
  },

  // ─── 11. Custom Cocktail Napkins ──────────────────────────────────────
  {
    image: path.join(BRAIN, 'cocktail_napkins_1776944909915.png'),
    categorySlugs: [
      'wedding-reception-details', 'wedding-reception-decor',
      'bespoke-reception-decor', 'personalized-wedding-details',
      'custom-party-favors', 'wedding-favors',
    ],
    product: {
      name: 'Custom Foil-Stamped Cocktail Napkins | Personalized Wedding Reception Napkins',
      slug: 'custom-foil-stamped-cocktail-napkins',
      active: true,
      price: 34.99,
      type: 'standard',
      description: `<p>Elevate every sip and every surface at your reception with our luxurious foil-stamped cocktail napkins — an effortless detail that guests always notice and remember.</p>

<ul>
<li><strong>Premium 3-Ply Quality:</strong> Thick, absorbent 3-ply cocktail napkins (5" × 5") that feel substantial in the hand — not flimsy paper</li>
<li><strong>Genuine Foil Stamping:</strong> Your custom monogram, names, or message is hot-stamped in real metallic foil — not printed ink</li>
<li><strong>8 Foil Colors:</strong> Gold, Silver, Rose Gold, Copper, Black, White, Blush, and Espresso Brown</li>
<li><strong>Multiple Napkin Colors:</strong> White, Ivory, Black, Navy, or Blush napkin base</li>
<li><strong>Versatile Quantities:</strong> Order exactly what you need for cocktail hour, dinner, or the full event</li>
</ul>`,
      meta_title: 'Custom Foil-Stamped Cocktail Napkins | Personalized Wedding Reception Napkins',
      meta_description: 'Premium 3-ply cocktail napkins with genuine foil-stamped monogram. Available in 8 foil colors and 5 napkin colors. Custom personalization for your wedding reception.',
      tags: [
        'cocktail napkins', 'wedding napkins', 'custom napkins',
        'foil stamped napkins', 'monogram napkins', 'reception napkins',
        'personalized napkins', 'bar napkins', 'wedding reception',
        'wedding details', 'party napkins',
      ],
      options: [
        {
          name: 'Quantity',
          variant: true,
          active: true,
          values: [
            { name: '50 Napkins', price: 0 },
            { name: '100 Napkins', price: 20 },
            { name: '150 Napkins', price: 38 },
            { name: '200 Napkins', price: 52 },
            { name: '300 Napkins', price: 75 },
          ],
        },
        {
          name: 'Napkin Color',
          variant: true,
          active: true,
          values: [
            { name: 'White', price: 0 },
            { name: 'Ivory', price: 0 },
            { name: 'Black', price: 0 },
            { name: 'Navy', price: 0 },
            { name: 'Blush', price: 0 },
          ],
        },
        {
          name: 'Foil Color',
          variant: true,
          active: true,
          values: [
            { name: 'Gold', price: 0 },
            { name: 'Silver', price: 0 },
            { name: 'Rose Gold', price: 0 },
            { name: 'Copper', price: 0 },
            { name: 'Black', price: 0 },
            { name: 'White', price: 0 },
            { name: 'Blush', price: 0 },
            { name: 'Espresso Brown', price: 0 },
          ],
        },
        {
          name: 'Monogram Initials or Custom Text',
          input_type: 'short_text',
          required: true,
        },
        {
          name: 'Wedding Date (optional)',
          input_type: 'short_text',
          required: false,
        },
      ],
    },
  },

  // ─── 12. Scented Candle Collection ────────────────────────────────────
  {
    image: path.join(BRAIN, 'wedding_candle_1776944936178.png'),
    categorySlugs: [
      'ambient-illuminated-accents', 'bespoke-home-decor',
      'personalized-home-decor', 'luxury-wedding-details',
      'wedding-reception-decor',
    ],
    product: {
      name: 'Bespoke "Wedding Day" Scented Soy Candle Collection',
      slug: 'bespoke-wedding-day-scented-candle',
      active: true,
      price: 28.99,
      type: 'standard',
      description: `<p>Capture the essence of your most beautiful moments in fragrance. Our "Wedding Day" Candle Collection features three signature scents, each inspired by a chapter of your celebration — hand-poured from 100% natural soy wax into our signature cream ceramic vessels with gold foil branding.</p>

<h3>The Collection</h3>
<ul>
<li><strong>"The Ceremony" — White Gardenia & Sandalwood:</strong> The scent of fresh floral arrangements and warm wood — evoking the sacred intimacy of your vow exchange</li>
<li><strong>"The Reception" — Champagne & Wild Berries:</strong> Effervescent and celebratory — the intoxicating energy of toasts, laughter, and your first dance</li>
<li><strong>"The Honeymoon" — Sea Salt & Driftwood:</strong> Breezy, warm, and escapist — the promise of sandy toes and sunset cocktails</li>
</ul>

<h3>Details</h3>
<ul>
<li>✦ 8 oz (227g) — approximately 45 hours burn time per candle</li>
<li>✦ 100% natural soy wax with cotton wicks — clean, even burn</li>
<li>✦ Premium fragrance oils — phthalate-free and non-toxic</li>
<li>✦ Cream ceramic vessel with gold foil label — beautiful as décor even after burning</li>
<li>✦ Ships ready to gift — no customization required</li>
</ul>`,
      meta_title: 'Wedding Day Scented Candle Collection | Luxury Soy Candle Gift | Custom Wedding Co.',
      meta_description: '3 signature scents inspired by your wedding day: The Ceremony, The Reception, The Honeymoon. Hand-poured natural soy wax in premium ceramic vessels. Perfect wedding or bridal shower gift.',
      tags: [
        'wedding candle', 'scented candle', 'soy candle', 'bridal shower gift',
        'wedding gift', 'home fragrance', 'luxury candle', 'engagement gift',
        'bridesmaid gift', 'anniversary candle', 'wedding day scent',
      ],
      options: [
        {
          name: 'Scent',
          variant: true,
          active: true,
          values: [
            { name: '"The Ceremony" — White Gardenia & Sandalwood', price: 0 },
            { name: '"The Reception" — Champagne & Wild Berries', price: 0 },
            { name: '"The Honeymoon" — Sea Salt & Driftwood', price: 0 },
            { name: 'The Complete Trio (All 3 Candles)', price: 48 },
          ],
        },
      ],
    },
  },

  // ─── 13. Luxury Wedding Planner Binder ────────────────────────────────
  {
    image: path.join(BRAIN, 'wedding_planner_1776944949526.png'),
    categorySlugs: [
      'bespoke-details', 'luxury-wedding-details',
      'personalized-wedding-details', 'bespoke-home-decor',
      'bridal-shower-offerings',
    ],
    product: {
      name: 'Luxury Linen Wedding Planner Binder | Gold Foil Keepsake Organizer',
      slug: 'luxury-linen-wedding-planner-binder',
      active: true,
      price: 49.99,
      type: 'standard',
      description: `<p>Plan your dream wedding with the planner that's as beautiful as the day itself. Our Luxury Linen Wedding Planner is a comprehensive, tactile organizer bound in premium natural linen with gold-foil stamped details — designed to guide you from "YES!" to "I do" and become a keepsake you'll treasure forever.</p>

<h3>What's Inside</h3>
<ul>
<li><strong>12 Tabbed Sections:</strong> Budget tracker, vendor contacts, guest list manager, timeline, ceremony planning, reception details, floral & décor, beauty & attire, honeymoon, day-of schedule, notes, and mementos pocket</li>
<li><strong>Checklists & Templates:</strong> Pre-formatted checklists for every milestone — 12 months out to day-of</li>
<li><strong>Budget Worksheets:</strong> Track every expense with category breakdowns and running totals</li>
<li><strong>Pocket Folders:</strong> 4 built-in pockets for swatches, business cards, inspiration clippings, and contracts</li>
<li><strong>Acid-Free Pages:</strong> 200+ archival-quality pages — safe for photos, notes, and keepsakes</li>
</ul>

<h3>Details</h3>
<ul>
<li>✦ Premium natural linen cover with gold foil "Our Wedding" title</li>
<li>✦ Gold-tone ring-binder mechanism for easy page flipping</li>
<li>✦ Add-on: personalized cover with couple's names (+$5)</li>
<li>✦ Arrives in a cream gift box — perfect engagement or shower present</li>
</ul>`,
      meta_title: 'Luxury Linen Wedding Planner Binder | Gold Foil Organizer & Keepsake',
      meta_description: 'The most beautiful wedding planner you\'ll ever own. Premium linen cover, gold foil details, 12 tabbed sections, budget worksheets & keepsake pockets. The perfect engagement gift.',
      tags: [
        'wedding planner', 'wedding binder', 'wedding organizer',
        'engagement gift', 'bridal shower gift', 'wedding checklist',
        'wedding planning', 'linen planner', 'gold foil planner',
        'wedding journal', 'bride to be gift',
      ],
      options: [
        {
          name: 'Cover Color',
          variant: true,
          active: true,
          values: [
            { name: 'Natural Linen (Cream)', price: 0 },
            { name: 'Blush Linen', price: 0 },
            { name: 'Sage Green Linen', price: 0 },
            { name: 'Espresso Linen', price: 0 },
          ],
        },
        {
          name: 'Personalization',
          variant: true,
          active: true,
          values: [
            { name: 'Standard — "Our Wedding"', price: 0 },
            { name: 'Custom Names + Date on Cover', price: 5 },
          ],
        },
        {
          name: 'Custom Names & Date (if selected above)',
          input_type: 'short_text',
          required: false,
        },
      ],
    },
  },

  // ─── 14. Custom Matchboxes ────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'wedding_matchboxes_1776944962820.png'),
    categorySlugs: [
      'wedding-favors', 'custom-party-favors',
      'wedding-reception-details', 'personalized-wedding-details',
      'bespoke-details',
    ],
    product: {
      name: 'Custom Wedding Matchboxes | Gold Foil "The Perfect Match" Favors',
      slug: 'custom-wedding-matchboxes',
      active: true,
      price: 24.99,
      type: 'standard',
      description: `<p>A timeless, universally charming wedding favor that's as functional as it is beautiful. Our custom matchboxes are foil-stamped with your personalized details — the perfect finishing touch for every table setting, favor bag, or sparkler send-off.</p>

<ul>
<li><strong>Genuine Foil Stamping:</strong> Your text and monogram hot-stamped in real metallic foil — gold, silver, rose gold, or copper</li>
<li><strong>Premium Safety Matches:</strong> Each box contains 20+ strike-on-box safety matches with colored tips</li>
<li><strong>Multiple Design Options:</strong> "The Perfect Match," "Love is a Flame," custom monogram, or fully custom text</li>
<li><strong>Compact & Elegant:</strong> Standard matchbox size (2.3" × 1.5") — perfectly proportioned for place settings and favor bags</li>
<li><strong>Pairs Perfectly:</strong> With our Unity Candle Set, sparkler send-offs, or simply as an elegant reception detail</li>
</ul>`,
      meta_title: 'Custom Wedding Matchboxes | Foil-Stamped "The Perfect Match" Favors',
      meta_description: 'Charming custom wedding matchboxes with genuine foil-stamped personalization. Available in gold, silver, rose gold. The perfect wedding favor for every guest.',
      tags: [
        'wedding matchboxes', 'custom matches', 'wedding favors',
        'the perfect match', 'personalized favors', 'reception favors',
        'foil stamped matchbox', 'sparkler send off', 'table favor',
        'guest favor', 'party favor',
      ],
      options: [
        {
          name: 'Quantity',
          variant: true,
          active: true,
          values: [
            { name: '50 Matchboxes', price: 0 },
            { name: '100 Matchboxes', price: 18 },
            { name: '150 Matchboxes', price: 32 },
            { name: '200 Matchboxes', price: 44 },
            { name: '300 Matchboxes', price: 62 },
          ],
        },
        {
          name: 'Foil Color',
          variant: true,
          active: true,
          values: [
            { name: 'Gold', price: 0 },
            { name: 'Silver', price: 0 },
            { name: 'Rose Gold', price: 0 },
            { name: 'Copper', price: 0 },
          ],
        },
        {
          name: 'Design Style',
          variant: true,
          active: true,
          values: [
            { name: '"The Perfect Match" + Monogram', price: 0 },
            { name: '"A Match Made in Heaven" + Names', price: 0 },
            { name: 'Custom Monogram Only', price: 0 },
            { name: 'Fully Custom Text', price: 0 },
          ],
        },
        {
          name: 'Couple Names — e.g., Sophia & David',
          input_type: 'short_text',
          required: true,
        },
        {
          name: 'Wedding Date — e.g., June 15, 2026',
          input_type: 'short_text',
          required: true,
        },
      ],
    },
  },

  // ─── 15. Engraved Cufflinks ───────────────────────────────────────────
  {
    image: path.join(BRAIN, 'engraved_cufflinks_1776944985185.png'),
    categorySlugs: [
      'groomsmen-gifts', 'gifts-for-the-groom', 'the-grooms-party',
      'fine-jewelry-accessories', 'personalized-accessories',
      'bespoke-accessories',
    ],
    product: {
      name: 'Bespoke Engraved Cufflinks | Personalized Groomsmen & Groom Gift',
      slug: 'bespoke-engraved-cufflinks',
      active: true,
      price: 24.99,
      type: 'standard',
      description: `<p>A refined detail for the most important men in your life. Our Bespoke Engraved Cufflinks are precision-crafted from premium metal and laser-engraved with custom initials, a date, or a meaningful message — arriving in a luxurious velvet-lined gift box ready to present.</p>

<ul>
<li><strong>Precision Laser Engraving:</strong> Crisp, permanent engraving that won't fade, chip, or wear off — built to last a lifetime</li>
<li><strong>Three Finishes:</strong> 18K Gold-Plated, Sterling Silver, or Gunmetal Black — each with a satisfying weight and premium feel</li>
<li><strong>Classic Round Design:</strong> Timeless 18mm round face with beveled edges — versatile enough for the wedding day and every formal event after</li>
<li><strong>Velvet Gift Box:</strong> Presented in an espresso-brown velvet box with a magnetic closure — no wrapping needed</li>
<li><strong>Multi-Set Discount:</strong> Ordering for your whole wedding party? Select the quantity and list each name below</li>
</ul>`,
      meta_title: 'Personalized Engraved Cufflinks | Groomsmen & Groom Wedding Gift',
      meta_description: 'Premium laser-engraved cufflinks personalized with initials or a date. Gold, silver, or gunmetal finish. In a velvet gift box. The perfect groomsman or groom wedding gift.',
      tags: [
        'engraved cufflinks', 'groomsmen gift', 'groom gift', 'cufflinks',
        'personalized cufflinks', 'wedding cufflinks', 'best man gift',
        'father of the bride gift', 'groomsman keepsake', 'custom cufflinks',
        'mens wedding accessories',
      ],
      options: [
        {
          name: 'Finish',
          variant: true,
          active: true,
          values: [
            { name: '18K Gold-Plated', price: 0 },
            { name: 'Sterling Silver', price: 0 },
            { name: 'Gunmetal Black', price: 0 },
          ],
        },
        {
          name: 'Quantity',
          variant: true,
          active: true,
          values: [
            { name: '1 Pair', price: 0 },
            { name: '2 Pairs', price: 22 },
            { name: '3 Pairs', price: 42 },
            { name: '4 Pairs', price: 60 },
            { name: '5 Pairs', price: 75 },
            { name: '6 Pairs', price: 90 },
          ],
        },
        {
          name: 'Engraving Style',
          variant: true,
          active: true,
          values: [
            { name: 'Initials (up to 3 letters)', price: 0 },
            { name: 'Wedding Date', price: 0 },
            { name: 'Initials + Date', price: 3 },
            { name: 'Custom Message (up to 10 chars)', price: 5 },
          ],
        },
        {
          name: 'Names/Initials for Engraving (one per line for multi-pair)',
          input_type: 'long_text',
          required: true,
          description: 'For multi-pair orders, list each person\'s initials on a separate line — e.g., "JW", "DB", "MK".',
        },
        {
          name: 'Wedding Date (if applicable)',
          input_type: 'short_text',
          required: false,
        },
      ],
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

(async () => {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║   Custom Wedding Co. — Phase 2 Product Builder (7 Items)   ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < PRODUCTS.length; i++) {
    const { image, categorySlugs, product } = PRODUCTS[i];
    const num = `[${i + 1}/${PRODUCTS.length}]`;

    try {
      console.log(`\n${'─'.repeat(60)}`);
      console.log(`${num} ${product.name.substring(0, 55)}...`);
      console.log(`${'─'.repeat(60)}`);

      // Resolve categories
      const categoryIds = [];
      for (const slug of categorySlugs) {
        const res = await swell.get('/categories', { where: { slug } });
        if (res.results?.length) categoryIds.push(res.results[0].id);
      }
      console.log(`  Categories: ${categoryIds.length} resolved`);

      // Create or update product
      const existing = await swell.get('/products', { where: { slug: product.slug } });
      let created;

      if (existing.results?.length) {
        console.log('  ⚠  Slug exists — updating in place.');
        created = await swell.put(`/products/${existing.results[0].id}`, {
          ...product,
          category_index: { id: categoryIds },
        });
      } else {
        created = await swell.post('/products', {
          ...product,
          category_index: { id: categoryIds },
        });
      }
      console.log(`  ✓ Product ID: ${created.id}`);
      console.log(`  ✓ Price: $${created.price} | Active: ${created.active}`);

      // Upload image
      if (fs.existsSync(image)) {
        const buf = fs.readFileSync(image);
        const b64 = buf.toString('base64');
        const filename = `${product.slug}-hero.png`;

        await swell.put(`/products/${created.id}`, {
          images: [{
            file: {
              data: `data:image/png;base64,${b64}`,
              filename,
              content_type: 'image/png',
            },
          }],
        });
        console.log(`  ✓ Image uploaded: ${filename} (${(buf.length / 1024).toFixed(0)} KB)`);
      } else {
        console.log(`  ⚠ Image not found: ${image}`);
      }

      successCount++;
      console.log(`  ✅ PUBLISHED`);

    } catch (err) {
      failCount++;
      console.error(`  ✗ FAILED: ${err.message || err}`);
    }
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  BATCH COMPLETE: ${successCount} published, ${failCount} failed`);
  console.log(`${'═'.repeat(60)}\n`);
})();
