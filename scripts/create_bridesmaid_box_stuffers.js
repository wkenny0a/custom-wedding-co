/**
 * create_bridesmaid_box_stuffers.js
 * ──────────────────────────────────
 * Creates 20 bridesmaid-box stuffer products on Swell.
 * Each product is a simple, no-variation add-on designed to
 * increase the average cart value inside the bridesmaid box configurator.
 *
 * All products are assigned to the "bridesmaid-box" category.
 *
 * Usage:  node scripts/create_bridesmaid_box_stuffers.js
 */

require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const BRAIN = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\917f75ee-5ea8-46af-9233-c4793b0b7f2e';

// The bridesmaid-box category ID from live Swell store
const BRIDESMAID_BOX_CATEGORY_ID = '69eb909b2df1750012880fa2';

// ═══════════════════════════════════════════════════════════════════════════
// 20 BRIDESMAID BOX STUFFER PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCTS = [

  // ─── 1. Satin Scrunchie Set ────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'scrunchie_set_1777114894870.png'),
    product: {
      name: 'Heirloom Satin Scrunchie Set | Bridal Party Hair Accessory Trio',
      slug: 'heirloom-satin-scrunchie-set',
      active: true,
      price: 9.99,
      type: 'standard',
      description: `<p><em>Effortless elegance, from getting ready to the last dance.</em></p>

<p>Our Heirloom Satin Scrunchie Set is a curated trio of sumptuous, oversized satin scrunchies in three versatile colorways — blush pink, champagne gold, and ivory cream. Designed to hold hair gently without creasing or pulling, they're the refined alternative to basic elastics.</p>

<ul>
<li><strong>Premium Satin Construction:</strong> Dense, lustrous satin that glides over hair without snagging — kind to every hair type and texture</li>
<li><strong>Set of Three:</strong> Blush, champagne, and ivory colorways coordinate effortlessly with any bridesmaid palette</li>
<li><strong>Getting-Ready Essential:</strong> Perfect for updos, half-up styles, or simply keeping hair swept back during makeup and mimosas</li>
<li><strong>Gift-Ready:</strong> Arrives wrapped in tissue paper — ready to tuck into your bridesmaid box</li>
</ul>`,
      meta_title: 'Satin Scrunchie Set | Bridal Party Hair Accessory | Custom Wedding Co.',
      meta_description: 'Luxury satin scrunchie set in blush, champagne & ivory. The perfect bridesmaid box stuffer. Gentle on hair, effortlessly elegant. Ships gift-ready.',
      tags: [
        'satin scrunchie', 'bridesmaid gift', 'hair accessory', 'bridal party',
        'getting ready', 'bridesmaid box', 'scrunchie set', 'bridal hair',
      ],
    },
  },

  // ─── 2. Artisan Soy Candle ─────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'soy_candle_1777114905340.png'),
    product: {
      name: 'Artisan Soy Candle | Hand-Poured Wedding Day Fragrance',
      slug: 'artisan-soy-candle-bridal',
      active: true,
      price: 14.99,
      type: 'standard',
      description: `<p><em>Set the mood for the most beautiful chapter yet.</em></p>

<p>Our Artisan Soy Candle is hand-poured from 100% natural soy wax and infused with a delicate bouquet of white tea, jasmine, and soft vanilla — a fragrance designed to evoke the warmth and intimacy of a beautiful celebration.</p>

<ul>
<li><strong>Clean-Burning Soy Wax:</strong> 100% natural soy with a cotton wick — no paraffin, no toxins, no soot</li>
<li><strong>30+ Hour Burn Time:</strong> A generous 4 oz pour in a reusable glass jar with a brushed gold lid</li>
<li><strong>Curated Fragrance:</strong> White tea, jasmine, and vanilla — sophisticated, never overpowering</li>
<li><strong>Thoughtful Presentation:</strong> Arrives in tissue wrapping, ready to nestle into your bridesmaid box</li>
</ul>`,
      meta_title: 'Hand-Poured Soy Candle | Bridal Gift | Custom Wedding Co.',
      meta_description: 'Hand-poured artisan soy candle in white tea & jasmine. 30+ hour burn time in a reusable gold-lidded jar. The perfect bridesmaid box add-on. Clean-burning & toxin-free.',
      tags: [
        'soy candle', 'bridesmaid gift', 'bridal candle', 'wedding candle',
        'hand-poured candle', 'bridesmaid box', 'bridal party gift',
      ],
    },
  },

  // ─── 3. Satin Sleep Mask ───────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'sleep_mask_1777114918092.png'),
    product: {
      name: 'Luxe Satin Sleep Mask | Bridal Beauty Rest Essential',
      slug: 'luxe-satin-sleep-mask',
      active: true,
      price: 8.99,
      type: 'standard',
      description: `<p><em>Beauty sleep has never looked this elegant.</em></p>

<p>Our Luxe Satin Sleep Mask is crafted from buttery-soft mulberry-style satin with adjustable gold-tone hardware — designed for the night before the big day, the honeymoon suite, and every restful night after.</p>

<ul>
<li><strong>Premium Satin:</strong> Smooth, breathable satin that's gentle on delicate under-eye skin and won't disturb lash extensions</li>
<li><strong>Adjustable Fit:</strong> Elasticized band with gold-accented slide adjuster for every head size</li>
<li><strong>Light-Blocking Design:</strong> Contoured nose bridge ensures total darkness for uninterrupted rest</li>
<li><strong>Travel-Friendly:</strong> Tucks into any carry-on, clutch, or overnight bag</li>
</ul>`,
      meta_title: 'Satin Sleep Mask | Bridal Beauty Essential | Custom Wedding Co.',
      meta_description: 'Luxury satin sleep mask with gold-tone hardware. Gentle on skin and lashes. The perfect bridesmaid box stuffer for bridal beauty rest. Adjustable & travel-friendly.',
      tags: [
        'sleep mask', 'satin eye mask', 'bridesmaid gift', 'bridal beauty',
        'getting ready', 'bridesmaid box', 'beauty sleep', 'travel accessory',
      ],
    },
  },

  // ─── 4. Luxury Lip Balm Set ────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'lip_balm_set_1777114931746.png'),
    product: {
      name: 'Luxury Botanical Lip Balm Trio | Rose, Honey & Vanilla',
      slug: 'luxury-botanical-lip-balm-trio',
      active: true,
      price: 11.99,
      type: 'standard',
      description: `<p><em>Soft lips for every kiss, every toast, every photograph.</em></p>

<p>Our Luxury Botanical Lip Balm Trio features three indulgent formulas — Rose Petal, Wildflower Honey, and Madagascar Vanilla — in elegant gold tubes. Made with organic shea butter and vitamin E for long-lasting hydration that looks as beautiful as it feels.</p>

<ul>
<li><strong>Organic Ingredients:</strong> Shea butter, beeswax, jojoba oil, and vitamin E — no parabens, no petroleum</li>
<li><strong>Three Curated Scents:</strong> Rose Petal, Wildflower Honey, and Madagascar Vanilla</li>
<li><strong>Photo-Ready Finish:</strong> Clear, non-glossy formula that hydrates without interfering with lipstick application</li>
<li><strong>Elegant Packaging:</strong> Gold metallic tubes that look beautiful tucked into a bridesmaid box</li>
</ul>`,
      meta_title: 'Botanical Lip Balm Trio | Bridal Party Gift | Custom Wedding Co.',
      meta_description: 'Organic lip balm trio in rose, honey & vanilla. Elegant gold tubes with shea butter & vitamin E. The perfect bridesmaid box add-on for bridal party pampering.',
      tags: [
        'lip balm', 'bridesmaid gift', 'bridal beauty', 'organic lip balm',
        'lip care', 'bridesmaid box', 'getting ready gift',
      ],
    },
  },

  // ─── 5. Rose Gold Compact Mirror ───────────────────────────────────────
  {
    image: path.join(BRAIN, 'compact_mirror_1777114947073.png'),
    product: {
      name: 'Rose Gold Compact Mirror | Premium Dual-Sided Bridal Accessory',
      slug: 'rose-gold-compact-mirror-bridal',
      active: true,
      price: 7.99,
      type: 'standard',
      description: `<p><em>Every touch-up deserves a moment of elegance.</em></p>

<p>Our Rose Gold Compact Mirror features a premium metal body with a satisfying magnetic snap closure and dual-sided glass — one standard and one 2x magnifying — for flawless touch-ups from the getting-ready suite to the dance floor.</p>

<ul>
<li><strong>Dual-Sided Glass:</strong> Standard mirror on one side, 2x magnification on the other for precision touch-ups</li>
<li><strong>Premium Metal Body:</strong> Weighty, rose gold-plated metal that feels substantial and luxurious in hand</li>
<li><strong>Purse-Perfect Size:</strong> 2.75" diameter — slips easily into a clutch, cosmetic pouch, or pocket</li>
<li><strong>Magnetic Snap Closure:</strong> Secure closure keeps the mirrors protected from scratches</li>
</ul>`,
      meta_title: 'Rose Gold Compact Mirror | Bridal Accessory | Custom Wedding Co.',
      meta_description: 'Premium rose gold compact mirror with dual-sided glass and magnetic closure. The perfect bridesmaid box stuffer. Purse-size, elegant, and 2x magnifying.',
      tags: [
        'compact mirror', 'bridesmaid gift', 'rose gold mirror', 'bridal accessory',
        'purse mirror', 'bridesmaid box', 'bridal party',
      ],
    },
  },

  // ─── 6. Pearl Hair Claw Clip ───────────────────────────────────────────
  {
    image: path.join(BRAIN, 'hair_claw_clip_1777114966408.png'),
    product: {
      name: 'Pearl-Embellished Hair Claw Clip | Elegant Bridal Hair Accessory',
      slug: 'pearl-embellished-hair-claw-clip',
      active: true,
      price: 12.99,
      type: 'standard',
      description: `<p><em>An everyday luxury your bridesmaids will reach for long after the wedding.</em></p>

<p>Our Pearl-Embellished Hair Claw Clip is a statement accessory featuring hand-placed faux pearls on a champagne-gold metal frame. Strong enough for thick hair, elegant enough for the ceremony — this is the bridesmaid gift that keeps on giving.</p>

<ul>
<li><strong>Hand-Placed Faux Pearls:</strong> High-lustre acrylic pearls individually set on a brushed gold frame</li>
<li><strong>Strong Spring Mechanism:</strong> Industrial-grade hinges that hold all hair types — fine, thick, curly, or straight</li>
<li><strong>Champagne Gold Finish:</strong> A warm, neutral metallic that complements every palette and skin tone</li>
<li><strong>Versatile Styling:</strong> Perfect for effortless half-up looks, messy buns, or keeping hair back during getting-ready photos</li>
</ul>`,
      meta_title: 'Pearl Hair Claw Clip | Bridal Hair Accessory | Custom Wedding Co.',
      meta_description: 'Elegant pearl-embellished hair claw clip in champagne gold. Strong hold for all hair types. A beautiful bridesmaid box add-on they will use every day.',
      tags: [
        'hair claw clip', 'pearl hair clip', 'bridesmaid gift', 'bridal hair',
        'hair accessory', 'bridesmaid box', 'claw clip',
      ],
    },
  },

  // ─── 7. Botanical Bath Bomb Set ────────────────────────────────────────
  {
    image: path.join(BRAIN, 'bath_bomb_set_1777114981210.png'),
    product: {
      name: 'Botanical Bath Bomb Trio | Lavender, Rose & Chamomile',
      slug: 'botanical-bath-bomb-trio',
      active: true,
      price: 13.99,
      type: 'standard',
      description: `<p><em>Because every bridesmaid deserves a moment to exhale.</em></p>

<p>Our Botanical Bath Bomb Trio is a hand-pressed set of three spa-worthy bath bombs infused with real dried flower petals and pure essential oils. Lavender for calm, rose for romance, and chamomile for the deepest relaxation — the perfect pre-wedding pampering ritual.</p>

<ul>
<li><strong>Real Dried Botanicals:</strong> Each bath bomb is embedded with genuine dried flower petals that float and bloom in the water</li>
<li><strong>Pure Essential Oils:</strong> Lavender, rose, and chamomile — never synthetic fragrances</li>
<li><strong>Skin-Nourishing Formula:</strong> Epsom salt, baking soda, and coconut oil leave skin silky smooth</li>
<li><strong>Set of Three:</strong> One of each scent — beautifully wrapped in tissue paper</li>
</ul>`,
      meta_title: 'Botanical Bath Bomb Set | Bridal Party Spa Gift | Custom Wedding Co.',
      meta_description: 'Hand-pressed botanical bath bomb trio with real dried flowers & essential oils. Lavender, rose & chamomile. The ultimate bridesmaid box self-care add-on.',
      tags: [
        'bath bomb', 'bridesmaid gift', 'spa gift', 'bath soak',
        'self-care', 'bridesmaid box', 'bridal party pampering',
      ],
    },
  },

  // ─── 8. Gold-Rimmed Jewelry Dish ───────────────────────────────────────
  {
    image: path.join(BRAIN, 'jewelry_dish_1777114992548.png'),
    product: {
      name: 'Gold-Rimmed Ceramic Jewelry Dish | Ring Holder & Trinket Tray',
      slug: 'gold-rimmed-ceramic-jewelry-dish',
      active: true,
      price: 10.99,
      type: 'standard',
      description: `<p><em>A place for every precious thing.</em></p>

<p>Our Gold-Rimmed Ceramic Jewelry Dish is a petite, hand-finished trinket tray with a genuine gold-foil edge. Designed for nightstands, vanities, and hotel bathrooms — a beautiful home for rings, earrings, and delicate chains, especially on the morning of the wedding.</p>

<ul>
<li><strong>Genuine Gold Foil Rim:</strong> Hand-applied 18K gold-foil edging that catches the light beautifully</li>
<li><strong>Premium Ceramic:</strong> Smooth, glazed white ceramic with a satisfying weight and a non-scratch base</li>
<li><strong>Petite & Practical:</strong> 4" diameter — perfectly sized for rings, studs, and small baubles</li>
<li><strong>Everyday Use:</strong> Long after the wedding, this becomes a permanent fixture on her nightstand</li>
</ul>`,
      meta_title: 'Gold-Rimmed Jewelry Dish | Ring Holder | Custom Wedding Co.',
      meta_description: 'Petite ceramic jewelry dish with genuine gold-foil rim. Ideal for rings & earrings. A beautiful and practical bridesmaid box add-on they will keep forever.',
      tags: [
        'jewelry dish', 'ring dish', 'trinket tray', 'bridesmaid gift',
        'ceramic dish', 'bridesmaid box', 'gold rim',
      ],
    },
  },

  // ─── 9. Calm & Collect Essential Oil Roller ────────────────────────────
  {
    image: path.join(BRAIN, 'essential_oil_roller_1777115008403.png'),
    product: {
      name: 'Calm & Collect Essential Oil Roller | Lavender & Chamomile Blend',
      slug: 'calm-collect-essential-oil-roller',
      active: true,
      price: 9.99,
      type: 'standard',
      description: `<p><em>For steady hands and a calm heart on the biggest day.</em></p>

<p>Our Calm & Collect Essential Oil Roller is a soothing blend of lavender, chamomile, and ylang ylang in a luxurious frosted glass rollerball with a brushed gold cap. Roll onto pulse points — wrists, temples, behind the ears — and let the wedding-day nerves melt away.</p>

<ul>
<li><strong>Pure Essential Oil Blend:</strong> Lavender, Roman chamomile, and ylang ylang in a base of organic jojoba oil</li>
<li><strong>Stainless Steel Rollerball:</strong> Smooth, precise application — no mess, no drips</li>
<li><strong>Luxury Frosted Glass Bottle:</strong> 10ml frosted glass with a brushed gold cap — beautiful enough to display</li>
<li><strong>TSA-Friendly:</strong> 10ml size is under travel limits — perfect for destination weddings and the honeymoon</li>
</ul>`,
      meta_title: 'Essential Oil Roller | Wedding Day Calm Blend | Custom Wedding Co.',
      meta_description: 'Soothing lavender & chamomile essential oil rollerball for wedding day calm. Frosted glass with gold cap. A thoughtful bridesmaid box wellness add-on.',
      tags: [
        'essential oil', 'rollerball', 'bridesmaid gift', 'wedding day calm',
        'aromatherapy', 'bridesmaid box', 'wellness gift', 'lavender',
      ],
    },
  },

  // ─── 10. Crystal Nail File Set ─────────────────────────────────────────
  {
    image: path.join(BRAIN, 'nail_file_set_1777115024206.png'),
    product: {
      name: 'Crystal Glass Nail File Set | Velvet Pouch Bridal Set',
      slug: 'crystal-glass-nail-file-set',
      active: true,
      price: 8.99,
      type: 'standard',
      description: `<p><em>A small luxury that makes a world of difference.</em></p>

<p>Our Crystal Glass Nail File Set includes two precision-etched Czech glass files — one full-size and one travel-size — housed in a blush pink velvet carrying pouch. Unlike emery boards, glass files seal the nail edge for stronger, smoother nails that won't snag on satin or lace.</p>

<ul>
<li><strong>Genuine Czech Glass:</strong> Precision-etched tempered glass that never dulls — lasts for years</li>
<li><strong>Two Sizes:</strong> Full-size (19cm) for home and travel-size (9cm) for your clutch</li>
<li><strong>Blush Velvet Pouch:</strong> Soft, protective velvet pouch in our signature blush pink</li>
<li><strong>Nail-Sealing Technology:</strong> Glass files seal the keratin layers of the nail, preventing peeling and splitting</li>
</ul>`,
      meta_title: 'Crystal Nail File Set | Premium Glass Files | Custom Wedding Co.',
      meta_description: 'Czech glass nail file set with velvet pouch. Two sizes, never dulls, seals nail edges. An elegant and practical bridesmaid box stuffer.',
      tags: [
        'nail file', 'glass nail file', 'bridesmaid gift', 'bridal beauty',
        'manicure', 'bridesmaid box', 'crystal nail file',
      ],
    },
  },

  // ─── 11. Silk Pillowcase ───────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'silk_pillowcase_1777115040823.png'),
    product: {
      name: 'Mulberry Silk Pillowcase | Champagne Gold Beauty Sleep Essential',
      slug: 'mulberry-silk-pillowcase-bridal',
      active: true,
      price: 19.99,
      type: 'standard',
      description: `<p><em>Wake up wedding-ready — every single morning.</em></p>

<p>Our Mulberry Silk Pillowcase is crafted from 22-momme, grade 6A pure mulberry silk in a warm champagne gold hue. Clinically proven to reduce hair friction and minimize sleep creases on the face, it's the luxury upgrade to every bridesmaid's beauty routine — and the most-used gift in every bridesmaid box.</p>

<ul>
<li><strong>22-Momme Pure Mulberry Silk:</strong> The highest quality silk weight — dense, lustrous, and incredibly smooth</li>
<li><strong>Anti-Aging Benefits:</strong> Reduces sleep lines, minimizes hair breakage, and helps skin retain moisture overnight</li>
<li><strong>Hidden Zipper Closure:</strong> Invisible zip keeps the pillowcase secure — no slipping off during the night</li>
<li><strong>Standard Size:</strong> Fits all standard and queen pillows (20" × 26")</li>
</ul>`,
      meta_title: 'Silk Pillowcase | Champagne Gold | Bridal Beauty Gift | Custom Wedding Co.',
      meta_description: '22-momme pure mulberry silk pillowcase in champagne gold. Reduces hair breakage & sleep lines. The ultimate luxury bridesmaid box add-on for beauty sleep.',
      tags: [
        'silk pillowcase', 'bridesmaid gift', 'beauty sleep', 'mulberry silk',
        'bridal beauty', 'bridesmaid box', 'anti-aging', 'luxury pillowcase',
      ],
    },
  },

  // ─── 12. Dainty Pearl Bracelet ─────────────────────────────────────────
  {
    image: path.join(BRAIN, 'bracelet_set_1777115056026.png'),
    product: {
      name: 'Dainty Pearl Bracelet | Gold-Filled Chain Bridal Jewelry',
      slug: 'dainty-pearl-bracelet-bridal',
      active: true,
      price: 14.99,
      type: 'standard',
      description: `<p><em>Something small, something golden, something they'll wear forever.</em></p>

<p>Our Dainty Pearl Bracelet features a single lustrous freshwater pearl on a delicate 14K gold-filled chain with a lobster clasp. Minimalist enough for everyday wear, elegant enough for the ceremony — this is the bridesmaid gift that transcends the wedding day.</p>

<ul>
<li><strong>14K Gold-Filled Chain:</strong> Not plated — gold-filled is 5× thicker than gold plating and won't tarnish, fade, or turn skin green</li>
<li><strong>Genuine Freshwater Pearl:</strong> Each pearl is unique — a natural, 6mm gem with beautiful lustre</li>
<li><strong>Adjustable Length:</strong> 6" – 7.5" with a 1.5" extension chain for a perfect fit on every wrist</li>
<li><strong>Presented on Jewelry Card:</strong> Arrives on a cream velvet-finish display card, ready for the bridesmaid box</li>
</ul>`,
      meta_title: 'Dainty Pearl Bracelet | Gold-Filled Bridal Jewelry | Custom Wedding Co.',
      meta_description: 'Delicate freshwater pearl on 14K gold-filled chain. Adjustable, tarnish-resistant, everyday elegant. The perfect bridesmaid box jewelry add-on.',
      tags: [
        'pearl bracelet', 'bridesmaid jewelry', 'gold bracelet', 'dainty bracelet',
        'bridal jewelry', 'bridesmaid box', 'freshwater pearl', 'gold-filled',
      ],
    },
  },

  // ─── 13. Champagne Gummy Bears ─────────────────────────────────────────
  {
    image: path.join(BRAIN, 'champagne_gummy_bears_1777115070873.png'),
    product: {
      name: 'Champagne Gummy Bears | Luxury Bridal Party Treat',
      slug: 'champagne-gummy-bears-bridal',
      active: true,
      price: 9.99,
      type: 'standard',
      description: `<p><em>A toast you can chew.</em></p>

<p>Our Champagne Gummy Bears are premium, small-batch gummy candies infused with real champagne flavor — presented in an elegant glass jar with a brushed gold lid. The sweetest way to ask your girls to celebrate with you.</p>

<ul>
<li><strong>Real Champagne Flavor:</strong> Each gummy is infused with authentic champagne flavoring — bubbly, sophisticated, and irresistible</li>
<li><strong>Elegant Glass Jar:</strong> 4 oz jar with a brushed gold lid — reusable as a trinket or bloom holder after the treats are gone</li>
<li><strong>Small-Batch Quality:</strong> Made without artificial colors — just clean, premium ingredients</li>
<li><strong>Non-Alcoholic:</strong> All of the champagne flavor, none of the alcohol — safe for everyone to enjoy</li>
</ul>`,
      meta_title: 'Champagne Gummy Bears | Luxury Bridal Treat | Custom Wedding Co.',
      meta_description: 'Premium champagne-flavored gummy bears in an elegant glass jar with gold lid. Non-alcoholic & small-batch. A sweet and unique bridesmaid box add-on.',
      tags: [
        'champagne gummy bears', 'bridesmaid gift', 'bridal treat', 'wedding candy',
        'champagne flavor', 'bridesmaid box', 'bridal party treat',
      ],
    },
  },

  // ─── 14. Botanical Body Lotion ─────────────────────────────────────────
  {
    image: path.join(BRAIN, 'body_lotion_1777115085045.png'),
    product: {
      name: 'Botanical Body Lotion | Shea Butter & Rose Petal Formula',
      slug: 'botanical-body-lotion-bridal',
      active: true,
      price: 10.99,
      type: 'standard',
      description: `<p><em>Petal-soft skin for the most photographed day of her life.</em></p>

<p>Our Botanical Body Lotion is a rich, fast-absorbing formula infused with organic shea butter and crushed rose petals. Lightweight enough for morning application under a dress, nourishing enough for post-flight honeymoon recovery — and beautifully packaged in a travel-size tube with our signature cream and gold design.</p>

<ul>
<li><strong>Organic Shea Butter Base:</strong> Deeply hydrating without feeling heavy or greasy</li>
<li><strong>Crushed Rose Petal Infusion:</strong> A whisper of natural rose fragrance — sophisticated, never synthetic</li>
<li><strong>Fast-Absorbing Formula:</strong> Sinks in within seconds — no residue on fabric or lace</li>
<li><strong>Travel Size (2 oz):</strong> TSA-friendly and perfectly sized for bridesmaid boxes and overnight bags</li>
</ul>`,
      meta_title: 'Botanical Body Lotion | Rose & Shea Butter | Custom Wedding Co.',
      meta_description: 'Organic shea butter body lotion with crushed rose petals. Fast-absorbing, travel-size, beautifully packaged. A pampering bridesmaid box essential.',
      tags: [
        'body lotion', 'bridesmaid gift', 'bridal beauty', 'rose lotion',
        'shea butter', 'bridesmaid box', 'travel lotion', 'skin care',
      ],
    },
  },

  // ─── 15. Wedding Vow Booklet ───────────────────────────────────────────
  {
    image: path.join(BRAIN, 'vow_booklet_1777115096146.png'),
    product: {
      name: 'Linen Wedding Vow Booklet | Gold Foil Ceremony Keepsake',
      slug: 'linen-wedding-vow-booklet',
      active: true,
      price: 7.99,
      type: 'standard',
      description: `<p><em>Your most meaningful words deserve a beautiful home.</em></p>

<p>Our Linen Wedding Vow Booklet is a petite, hand-bound journal crafted from textured linen with gold foil stamping. Designed to hold handwritten vows during the ceremony — and to be preserved as a keepsake long after the last dance.</p>

<ul>
<li><strong>Premium Linen Cover:</strong> Textured cream linen with "My Vows" stamped in genuine gold foil</li>
<li><strong>12 Acid-Free Pages:</strong> Thick, 120gsm ivory paper that takes ink beautifully — no bleed-through</li>
<li><strong>Ceremony-Ready Size:</strong> 4.5" × 6.5" — fits comfortably in one hand at the altar</li>
<li><strong>Keepsake Quality:</strong> Designed to be stored alongside wedding photos, rings, and dried florals</li>
</ul>`,
      meta_title: 'Wedding Vow Booklet | Linen & Gold Foil | Custom Wedding Co.',
      meta_description: 'Handbound linen vow booklet with gold foil stamping. 12 acid-free pages, ceremony-ready size. A beautiful bridesmaid box keepsake for the big day.',
      tags: [
        'vow booklet', 'wedding vows', 'ceremony keepsake', 'vow journal',
        'wedding stationery', 'bridesmaid box', 'gold foil', 'bridal keepsake',
      ],
    },
  },

  // ─── 16. Rosewater Face Mist ───────────────────────────────────────────
  {
    image: path.join(BRAIN, 'face_mist_1777115113799.png'),
    product: {
      name: 'Rosewater Face Mist | Hydrating Bridal Beauty Spray',
      slug: 'rosewater-face-mist-bridal',
      active: true,
      price: 11.99,
      type: 'standard',
      description: `<p><em>A fresh, dewy glow that lasts from first look to sparkler exit.</em></p>

<p>Our Rosewater Face Mist is a ultra-fine spray infused with pure Bulgarian rosewater, aloe vera, and hyaluronic acid. Mist over bare skin for hydration, over makeup for a dewy set, or throughout the reception for an instant refresh — all in an elegant frosted glass bottle with a gold spray top.</p>

<ul>
<li><strong>Pure Bulgarian Rosewater:</strong> Steam-distilled from organic Rosa Damascena — the gold standard of rosewater</li>
<li><strong>Makeup Setting Formula:</strong> Ultra-fine mist sets makeup without disturbing application — photographer-approved</li>
<li><strong>Hyaluronic Acid Boost:</strong> Deep hydration that plumps skin and gives a healthy, dewy glow</li>
<li><strong>Frosted Glass Bottle (2 oz):</strong> Luxurious presentation with a gold spray top — reusable and refillable</li>
</ul>`,
      meta_title: 'Rosewater Face Mist | Bridal Beauty Spray | Custom Wedding Co.',
      meta_description: 'Bulgarian rosewater face mist with hyaluronic acid. Sets makeup, hydrates skin, dewy finish. A must-have bridesmaid box beauty essential.',
      tags: [
        'face mist', 'rosewater spray', 'bridesmaid gift', 'bridal beauty',
        'makeup setting spray', 'bridesmaid box', 'hydrating mist',
      ],
    },
  },

  // ─── 17. Floral Tea Sampler ────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'tea_sampler_1777115125664.png'),
    product: {
      name: 'Floral Tea Sampler Gift Set | Rose, Chamomile, Lavender & Jasmine',
      slug: 'floral-tea-sampler-bridal',
      active: true,
      price: 14.99,
      type: 'standard',
      description: `<p><em>A quiet cup of calm before the beautiful chaos begins.</em></p>

<p>Our Floral Tea Sampler Gift Set features four single-origin loose leaf teas curated specifically for moments of pre-wedding stillness. Rose for romance, chamomile for calm, lavender for rest, and jasmine for joy — presented in hand-filled glass jars in a cream gift box with gold accents.</p>

<ul>
<li><strong>Four Premium Loose Leaf Blends:</strong> Rose petal, chamomile, English lavender, and jasmine green — each making 8-10 cups</li>
<li><strong>Hand-Filled Glass Jars:</strong> Clear glass jars with gold lids — beautiful enough to display in any kitchen</li>
<li><strong>Premium Gift Packaging:</strong> Arrives in a cream gift box with gold foil detail, ready for the bridesmaid box</li>
<li><strong>Caffeine-Free Options:</strong> Rose, chamomile, and lavender are naturally caffeine-free — perfect for evenings</li>
</ul>`,
      meta_title: 'Floral Tea Sampler Set | Bridal Party Gift | Custom Wedding Co.',
      meta_description: 'Curated tea sampler with rose, chamomile, lavender & jasmine in glass jars. A calming, elegant bridesmaid box gift set they will actually use.',
      tags: [
        'tea sampler', 'loose leaf tea', 'bridesmaid gift', 'bridal tea',
        'floral tea', 'bridesmaid box', 'self-care gift', 'tea set',
      ],
    },
  },

  // ─── 18. Rose Petal Hand Cream ─────────────────────────────────────────
  {
    image: path.join(BRAIN, 'hand_cream_1777115138813.png'),
    product: {
      name: 'Rose Petal Hand Cream | Luxury Travel-Size Bridal Essential',
      slug: 'rose-petal-hand-cream-bridal',
      active: true,
      price: 8.99,
      type: 'standard',
      description: `<p><em>Soft hands for the ring exchange and every hand-hold after.</em></p>

<p>Our Rose Petal Hand Cream is a rich yet non-greasy formula infused with organic rose extract, shea butter, and vitamin E — perfect for keeping hands photo-ready on the wedding day. Packaged in a beautiful cream and gold tube that's travel-friendly and bridesmaid-box perfect.</p>

<ul>
<li><strong>Organic Rose Extract:</strong> A subtle, natural rose fragrance that doesn't compete with perfume</li>
<li><strong>Non-Greasy Formula:</strong> Absorbs in seconds — no slippery residue when holding champagne flutes or bouquets</li>
<li><strong>Vitamin E & Shea Butter:</strong> Deep nourishment that protects and softens cuticles and knuckles</li>
<li><strong>Travel Size (1.5 oz):</strong> Perfectly sized for clutch bags, cosmetic pouches, and bridesmaid boxes</li>
</ul>`,
      meta_title: 'Rose Petal Hand Cream | Bridal Essential | Custom Wedding Co.',
      meta_description: 'Luxury rose hand cream with shea butter & vitamin E. Non-greasy, fast-absorbing, travel-size. A practical and pampering bridesmaid box essential.',
      tags: [
        'hand cream', 'bridesmaid gift', 'rose hand cream', 'bridal beauty',
        'travel size', 'bridesmaid box', 'skin care', 'moisturizer',
      ],
    },
  },

  // ─── 19. Gold Heart Wine Stopper ───────────────────────────────────────
  {
    image: path.join(BRAIN, 'wine_stopper_1777115150447.png'),
    product: {
      name: 'Gold Heart Wine Stopper | Elegant Bridal Party Keepsake',
      slug: 'gold-heart-wine-stopper-bridal',
      active: true,
      price: 7.99,
      type: 'standard',
      description: `<p><em>A golden toast to the women who made it all possible.</em></p>

<p>Our Gold Heart Wine Stopper is a premium, weighted bottle stopper featuring a sculptural heart finial in brushed gold. Functional and beautiful, it preserves opened wine while adding a touch of elegance to any countertop — a practical keepsake they'll think of you every time they use.</p>

<ul>
<li><strong>Brushed Gold Heart Finial:</strong> Sculptural, weighty heart design with a warm, antique gold finish</li>
<li><strong>Silicone Seal:</strong> Food-grade silicone ring creates an airtight seal — keeps wine fresh for days</li>
<li><strong>Universal Fit:</strong> Fits standard wine, champagne, and prosecco bottles</li>
<li><strong>Weighted Base:</strong> Heavy enough to stand upright on a bar cart or countertop when not in use</li>
</ul>`,
      meta_title: 'Gold Heart Wine Stopper | Bridal Keepsake | Custom Wedding Co.',
      meta_description: 'Elegant brushed gold heart wine stopper with silicone seal. Universal fit, premium weighted design. A beautiful and useful bridesmaid box keepsake.',
      tags: [
        'wine stopper', 'bridesmaid gift', 'gold heart', 'bridal party keepsake',
        'wine accessory', 'bridesmaid box', 'barware', 'wine lover gift',
      ],
    },
  },

  // ─── 20. Rose Gold Reusable Straw Set ──────────────────────────────────
  {
    image: path.join(BRAIN, 'straw_set_1777115161950.png'),
    product: {
      name: 'Rose Gold Reusable Straw Set | Eco-Luxe Bridal Party Gift',
      slug: 'rose-gold-reusable-straw-set',
      active: true,
      price: 9.99,
      type: 'standard',
      description: `<p><em>Sip in style — sustainably.</em></p>

<p>Our Rose Gold Reusable Straw Set features four premium stainless steel straws in a mirror-polished rose gold finish — two straight, two bent — with a cleaning brush and a cream cotton carrying pouch with gold drawstring. The eco-chic companion for tumblers, iced lattes, and champagne cocktails.</p>

<ul>
<li><strong>Mirror-Polished Rose Gold:</strong> Premium 18/8 stainless steel with a stunning rose gold PVD coating that won't chip or fade</li>
<li><strong>Four Straws + Brush:</strong> Two 8.5" straight, two 8.5" angled, plus a bristle cleaning brush</li>
<li><strong>Cotton Carrying Pouch:</strong> Cream cotton bag with gold drawstring — stores neatly in a purse or bridesmaid box</li>
<li><strong>Eco-Friendly Gift:</strong> Replace thousands of single-use straws — a gift that keeps on giving for the planet</li>
</ul>`,
      meta_title: 'Rose Gold Reusable Straw Set | Eco Bridal Gift | Custom Wedding Co.',
      meta_description: 'Premium rose gold stainless steel straw set with cleaning brush & cotton pouch. Eco-friendly, chip-resistant, beautiful. A fun bridesmaid box add-on.',
      tags: [
        'reusable straws', 'rose gold straws', 'bridesmaid gift', 'eco-friendly',
        'metal straws', 'bridesmaid box', 'sustainable gift', 'straw set',
      ],
    },
  },

];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION ENGINE
// ═══════════════════════════════════════════════════════════════════════════

(async () => {
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  Custom Wedding Co. — Bridesmaid Box Stuffers (20 Products)    ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < PRODUCTS.length; i++) {
    const { image, product } = PRODUCTS[i];
    const num = `[${i + 1}/${PRODUCTS.length}]`;

    try {
      console.log(`\n${'─'.repeat(64)}`);
      console.log(`${num} ${product.name.substring(0, 58)}...`);
      console.log(`${'─'.repeat(64)}`);

      // ── Create or update product ────────────────────────────────────
      const existing = await swell.get('/products', { where: { slug: product.slug } });
      let created;

      if (existing.results?.length) {
        console.log('  ⚠  Slug exists — updating in place.');
        created = await swell.put(`/products/${existing.results[0].id}`, {
          ...product,
          category_index: { id: [BRIDESMAID_BOX_CATEGORY_ID] },
        });
      } else {
        created = await swell.post('/products', {
          ...product,
          category_index: { id: [BRIDESMAID_BOX_CATEGORY_ID] },
        });
      }
      console.log(`  ✓ Product ID: ${created.id}`);
      console.log(`  ✓ Price: $${created.price} | Active: ${created.active}`);

      // ── Upload image ────────────────────────────────────────────────
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

  // ── Final summary ─────────────────────────────────────────────────────
  console.log(`\n${'═'.repeat(64)}`);
  console.log(`  BATCH COMPLETE: ${successCount} published, ${failCount} failed`);
  console.log(`${'═'.repeat(64)}\n`);
})();
