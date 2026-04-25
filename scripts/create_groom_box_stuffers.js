/**
 * create_groom_box_stuffers.js
 * ──────────────────────────────────
 * Creates 20 groom-box stuffer products on Swell.
 * Each product is a simple, no-variation add-on designed to
 * increase the average cart value inside the groomsman box configurator.
 *
 * All products are assigned to the "groom-box" category.
 *
 * Usage:  node scripts/create_groom_box_stuffers.js
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

// The groom-box category ID from live Swell store
const GROOM_BOX_CATEGORY_ID = '69ec79f9677641001228d01c'; // From previous lookup

// ═══════════════════════════════════════════════════════════════════════════
// 20 GROOMSMAN BOX STUFFER PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCTS = [
  // 1. Leather-Wrapped Flask
  {
    image: 'groom_flask_1777127273845.png',
    product: {
      name: 'Leather-Wrapped Stainless Steel Flask | Espresso Brown',
      slug: 'leather-wrapped-stainless-steel-flask',
      active: true,
      price: 18.99,
      type: 'standard',
      description: `<p><em>A gentleman's essential, built for celebration.</em></p>
<p>Our premium stainless steel hip flask is wrapped in a rich espresso brown leather exterior. Holding 6 oz of their favorite spirit, it's a timeless groomsman gift perfect for the pre-wedding toast.</p>
<ul>
<li><strong>Premium Materials:</strong> 304 food-grade stainless steel interior with a rich faux-leather wrap.</li>
<li><strong>Secure Cap:</strong> Integrated leak-proof screw cap means no lost parts on the wedding day.</li>
<li><strong>Classic Aesthetic:</strong> Dark espresso brown pairs seamlessly with any suit.</li>
<li><strong>Gift-Ready:</strong> Arrives ready to drop right into the groomsman box.</li>
</ul>`,
      meta_title: 'Leather Wrapped Flask | Groomsman Gift | Custom Wedding Co.',
      meta_description: 'Premium stainless steel 6oz flask wrapped in espresso brown leather. A classic groomsman box stuffer for the perfect pre-ceremony toast.',
    }
  },

  // 2. Granite Whiskey Stones
  {
    image: 'groom_whiskey_stones_1777127287182.png',
    product: {
      name: 'Granite Whiskey Stones Set | Velvet Pouch',
      slug: 'granite-whiskey-stones-set',
      active: true,
      price: 14.99,
      type: 'standard',
      description: `<p><em>Keep the pour pure and perfectly chilled.</em></p>
<p>A set of six dark granite whiskey stones, presented in an elegant black velvet drawstring pouch. Eliminates ice melt to preserve the complex flavor profile of top-shelf bourbon or scotch.</p>
<ul>
<li><strong>Solid Granite:</strong> High-density stones hold a chill beautifully and safely.</li>
<li><strong>Velvet Pouch:</strong> Includes a premium black pouch for freezer storage.</li>
<li><strong>Reusable Element:</strong> Wash and freeze repeatedly for endless pours.</li>
<li><strong>Essential Barware:</strong> The ideal addition for any groomsman's home bar.</li>
</ul>`,
      meta_title: 'Granite Whiskey Stones | Home Bar Accessory | Custom Wedding Co.',
      meta_description: 'Set of 6 dark granite whiskey stones in a black velvet pouch. Chills spirits without diluting. A must-have groomsman box addition.',
    }
  },

  // 3. Heavyweight Cigar Cutter
  {
    image: 'groom_cigar_cutter_1777127300911.png',
    product: {
      name: 'Heavyweight Cigar Cutter | Matte Black & Gold',
      slug: 'heavyweight-cigar-cutter-black',
      active: true,
      price: 16.99,
      type: 'standard',
      description: `<p><em>A clean cut for a momentous occasion.</em></p>
<p>Our Heavyweight Cigar Cutter features a sleek matte black metal body with brushed antique gold hardware details. Boasting dual guillotine blades for a precise, effortless cut every time.</p>
<ul>
<li><strong>Dual Stainless Blades:</strong> Self-sharpening dual guillotine action for a perfect cut.</li>
<li><strong>Matte Black Finish:</strong> A dark, sophisticated profile that feels solid in the hand.</li>
<li><strong>Large Gauge Capacity:</strong> Easily accommodates up to 60-ring gauge cigars.</li>
</ul>`,
      meta_title: 'Matte Black Cigar Cutter | Groomsman Accessory | Custom Wedding Co.',
      meta_description: 'Heavyweight dual-blade cigar cutter in matte black with gold hardware. The ultimate ceremonial add-on for a groomsman gift box.',
    }
  },

  // 4. Brushed Gold Tie Clip
  {
    image: 'groom_tie_clip_1777127312729.png',
    product: {
      name: 'Classic Tie Clip | Brushed Antique Gold',
      slug: 'classic-tie-clip-antique-gold',
      active: true,
      price: 12.99,
      type: 'standard',
      description: `<p><em>Understated luxury that holds the look together.</em></p>
<p>A minimalist tie clip crafted with a brushed antique gold finish. The perfect balance of form and function, ensuring his tie stays perfectly draped through the ceremony and the reception.</p>
<ul>
<li><strong>Antique Gold Finish:</strong> A subtle brushed texture that doesn't shine too brightly in photos.</li>
<li><strong>Secure Tension Clasp:</strong> Grips firmly without pulling or damaging delicate silk ties.</li>
<li><strong>Universal Width:</strong> Designed to fit perfectly across standard and slim ties alike.</li>
</ul>`,
      meta_title: 'Brushed Gold Tie Clip | Mens Accessory | Custom Wedding Co.',
      meta_description: 'Minimalist brushed antique gold tie clip. Secure tension clasp. A subtle and sophisticated fashion essential for the groomsman box.',
    }
  },

  // 5. Foil-Stamped Playing Cards
  {
    image: 'groom_playing_cards_1777127325646.png',
    product: {
      name: 'Premium Foil-Stamped Playing Cards | Black & Gold Edition',
      slug: 'premium-foil-stamped-playing-cards',
      active: true,
      price: 11.99,
      type: 'standard',
      description: `<p><em>For the bachelor party, the getting-ready suite, and beyond.</em></p>
<p>A stunning deck of playing cards enclosed in a matte black box with subtle gold foil accents. A great way to kill time in the suite before the main event.</p>
<ul>
<li><strong>Casino Grade:</strong> High-quality cardstock with an air-cushion finish for superior handling.</li>
<li><strong>Custom Artwork:</strong> Elegant, dark-themed face cards with a luxurious aesthetic.</li>
<li><strong>Premium Tuck Box:</strong> Features deep matte black stock with reflective gold foil.</li>
</ul>`,
      meta_title: 'Gold Foil Playing Cards | Grooms Party Gift | Custom Wedding Co.',
      meta_description: 'Premium deck of playing cards featuring a black and gold foil design. Perfect for the bachelor party or getting ready suite.',
    }
  },

  // 6. Solid Brass Collar Stays
  {
    image: 'groom_collar_stays_1777127349353.png',
    product: {
      name: 'Solid Brass Collar Stays | Matte Black Travel Tin',
      slug: 'solid-brass-collar-stays-tin',
      active: true,
      price: 9.99,
      type: 'standard',
      description: `<p><em>The secret to a razor-sharp profile.</em></p>
<p>Upgrade his dress shirt with a set of premium solid brass collar stays, housed in an ultra-sleek matte black metal slide tin. They provide the perfect weight to keep collars crisp and straight all day long.</p>
<ul>
<li><strong>Solid Brass:</strong> Heavier and infinitely more reliable than basic plastic stays.</li>
<li><strong>Set of Four:</strong> Includes two standard lengths to accommodate various collar types.</li>
<li><strong>Travel Tin:</strong> Keeps them secure and organized in his dopp kit or luggage.</li>
</ul>`,
      meta_title: 'Brass Collar Stays Set | Groomsman Grooming | Custom Wedding Co.',
      meta_description: 'Premium solid brass collar stays presented in a matte black travel tin. A sharp, practical accessory for the groomsman gift pack.',
    }
  },

  // 7. Espresso Silk Pocket Square
  {
    image: 'groom_pocket_square_1777127361620.png',
    product: {
      name: 'Silk Pocket Square | Solid Espresso Brown',
      slug: 'silk-pocket-square-espresso',
      active: true,
      price: 14.99,
      type: 'standard',
      description: `<p><em>A subtle touch of class for the breast pocket.</em></p>
<p>Our pure silk pocket square in a rich espresso brown offers a soft, elegant sheen that elevates any suit or tuxedo. Fold it to a crisp point or puff it effortlessly.</p>
<ul>
<li><strong>100% Woven Silk:</strong> Luxurious texture that holds its fold beautifully.</li>
<li><strong>Hand-Rolled Edges:</strong> A mark of true artisanal craftsmanship and quality.</li>
<li><strong>Rich Espresso Shade:</strong> Highly versatile; pairs stunningly with navy, charcoal, or tan suits.</li>
</ul>`,
      meta_title: 'Espresso Brown Silk Pocket Square | Mens Gift | Custom Wedding Co.',
      meta_description: '100% woven silk pocket square in deep espresso brown with hand-rolled edges. A classic menswear staple that elevates any groomsman box.',
    }
  },

  // 8. Artisan Solid Cologne
  {
    image: 'groom_solid_cologne_1777127373586.png',
    product: {
      name: 'Artisan Solid Cologne | Tobacco & Cedar Wood',
      slug: 'artisan-solid-cologne-tobacco',
      active: true,
      price: 15.99,
      type: 'standard',
      description: `<p><em>A rugged, sophisticated scent designed for the modern gentleman.</em></p>
<p>This artisan solid cologne offers warm, complex notes of dried tobacco leaf, raw cedar wood, and subtle leather. Packaged in a compact matte black slide tin—TSA approved and completely spill-proof.</p>
<ul>
<li><strong>Beeswax & Jojoba Base:</strong> Melts into the skin for a subtle, long-lasting scent that isn't overpowering.</li>
<li><strong>Travel-Ready:</strong> The perfect pocket-sized companion for the wedding day or honeymoon.</li>
<li><strong>Masculine Notes:</strong> A classic, woody aroma with a hint of warm vanilla and spice.</li>
</ul>`,
      meta_title: 'Artisan Solid Cologne | Tobacco & Cedar | Custom Wedding Co.',
      meta_description: 'Pocket-sized solid cologne featuring masculine notes of tobacco, cedar, and leather. Housed in a travel-ready matte black tin.',
    }
  },

  // 9. Sandalwood Pocket Comb
  {
    image: 'groom_pocket_comb_1777127385089.png',
    product: {
      name: 'Premium Sandalwood Pocket Comb',
      slug: 'premium-sandalwood-pocket-comb',
      active: true,
      price: 10.99,
      type: 'standard',
      description: `<p><em>Grooming, refined.</em></p>
<p>Handcrafted from genuine natural sandalwood, this fine-toothed pocket comb glides smoothly through hair and beards without static. The wood imparts a very subtle, natural scent.</p>
<ul>
<li><strong>Anti-Static Profile:</strong> Wood greatly reduces frizz compared to cheap plastic combs.</li>
<li><strong>Ergonomic Design:</strong> Compact enough for a breast pocket, yet sturdy enough for daily use.</li>
<li><strong>Natural Grain:</strong> Each comb features entirely unique wood grain and tone.</li>
</ul>`,
      meta_title: 'Sandalwood Pocket Comb | Beard Comb | Custom Wedding Co.',
      meta_description: 'Handcrafted fine-tooth natural sandalwood pocket comb. Anti-static and perfect for hair or beard grooming. A great groomsman gift.',
    }
  },

  // 10. Minimalist Magnetic Money Clip
  {
    image: 'groom_money_clip_1777127398097.png',
    product: {
      name: 'Minimalist Magnetic Money Clip | Matte Black',
      slug: 'minimalist-magnetic-money-clip',
      active: true,
      price: 13.99,
      type: 'standard',
      description: `<p><em>Ditch the bulky wallet on the big day.</em></p>
<p>A sleek, low-profile magnetic money clip in a smooth matte black finish. Designed to hold bills and essential cards securely in an inner jacket pocket without ruining the silhouette of his suit.</p>
<ul>
<li><strong>Strong Magnetic Grip:</strong> Secures everything tightly without damaging cards.</li>
<li><strong>Ultra-Slim Profile:</strong> Barely noticeable in the pocket of a well-tailored suit.</li>
<li><strong>Matte Black Finish:</strong> A stealthy, sophisticated aesthetic.</li>
</ul>`,
      meta_title: 'Matte Black Money Clip | Magnetic Wallet | Custom Wedding Co.',
      meta_description: 'Sleek matte black magnetic money clip. Holds bills and cards securely in a suit jacket. A minimalist favorite for the groomsman box.',
    }
  },

  // 11. Bartender's Bottle Opener
  {
    image: 'groom_bottle_opener_1777127420530.png',
    product: {
      name: 'Heavy-Duty Bartender\'s Bottle Opener | Matte Black',
      slug: 'bartenders-bottle-opener-black',
      active: true,
      price: 8.99,
      type: 'standard',
      description: `<p><em>Pop the top with authority.</em></p>
<p>A professional-grade, heavy-duty flat bottle opener featuring a stealthy matte black coating. Also known as a "bar blade," this is an essential tool for the getting-ready suite and any home bar.</p>
<ul>
<li><strong>Professional Design:</strong> Extra leverage for a fast, effortless open every time.</li>
<li><strong>Solid Stainless Core:</strong> Weighty, durable, and practically indestructible.</li>
<li><strong>Matte Finish:</strong> Sleek and highly resistant to fingerprints.</li>
</ul>`,
      meta_title: 'Matte Black Bottle Opener | Bar Blade | Custom Wedding Co.',
      meta_description: 'Professional grade heavy-duty flat bottle opener in matte black. Essential barware for the bachelor party and groomsman box.',
    }
  },

  // 12. Gourmet "Morning After" Coffee Beans
  {
    image: 'groom_coffee_beans_1777127432979.png',
    product: {
      name: '"The Morning After" Espresso Roast | Craft Coffee Beans',
      slug: 'morning-after-craft-coffee-beans',
      active: true,
      price: 12.99,
      type: 'standard',
      description: `<p><em>The ultimate recovery tool for the morning after the reception.</em></p>
<p>A 4 oz batch of premium, small-roast espresso beans packaged in a sleek, minimalist matte black bag. A dark, intense, and incredibly smooth roast guaranteed to bring him back to life.</p>
<ul>
<li><strong>Whole Bean Craft Roast:</strong> Retains peak freshness and bold flavor notes of dark chocolate and smoke.</li>
<li><strong>Perfect Size:</strong> 4 oz is just enough for a few strong pots of recovery brew.</li>
<li><strong>Sleek Presentation:</strong> An unbranded matte black bag that fits our dark, cinematic aesthetic.</li>
</ul>`,
      meta_title: 'Craft Espresso Beans | Morning After Gift | Custom Wedding Co.',
      meta_description: 'Premium small-batch whole bean espresso roast in a 4oz matte black bag. The perfect caffeinated recovery gift for your groomsmen.',
    }
  },

  // 13. Aromatic Cocktail Bitters
  {
    image: 'groom_bitters_1777127444720.png',
    product: {
      name: 'Aromatic Cocktail Bitters | Classic Old Fashioned Blend',
      slug: 'aromatic-cocktail-bitters',
      active: true,
      price: 11.99,
      type: 'standard',
      description: `<p><em>Elevate his home bartending game.</em></p>
<p>A premium amber glass dropper bottle of classic aromatic bitters. Featuring deep notes of cinnamon, clove, and gentian root, it's the secret weapon for crafting the perfect Old Fashioned or Manhattan.</p>
<ul>
<li><strong>Small Batch Recipe:</strong> Hand-crafted for superior, concentrated flavor.</li>
<li><strong>Glass Dropper:</strong> Allows for precision measurement (dash by dash) into the glass.</li>
<li><strong>Aesthetic Label:</strong> A moody black and gold border label that looks handsome on any bar cart.</li>
</ul>`,
      meta_title: 'Aromatic Cocktail Bitters | Old Fashioned Mix | Custom Wedding Co.',
      meta_description: 'Small batch aromatic cocktail bitters in a premium amber dropper bottle. Elevate any groomsman\'s home bar with this luxury staple.',
    }
  },

  // 14. Leather Cord Organizer
  {
    image: 'groom_cord_organizer_1777127461719.png',
    product: {
      name: 'Leather Cord & Cable Organizer | Espresso Brown',
      slug: 'leather-cord-organizer-espresso',
      active: true,
      price: 9.99,
      type: 'standard',
      description: `<p><em>Bring order to the chaos of travel.</em></p>
<p>A premium thick leather "taco" style cord organizer featuring a heavy-duty snap closure. Keeps phone chargers, headphone cables, and laptop cords neatly wrapped in his luggage or carry-on.</p>
<ul>
<li><strong>Full Grain Leather Look:</strong> Rich espresso brown texture that ages beautifully over time.</li>
<li><strong>Heavy-Duty Snap:</strong> Antique brass snap closure ensures the bundle stays tight.</li>
<li><strong>Travel Essential:</strong> A highly practical gift he'll use on every single trip, starting with the wedding weekend.</li>
</ul>`,
      meta_title: 'Leather Cord Organizer | Cable Strap | Custom Wedding Co.',
      meta_description: 'Thick espresso brown leather cord and cable organizer with a brass snap. A highly practical and stylish travel accessory for men.',
    }
  },

  // 15. Premium "Hangover Recovery" Pouch
  {
    image: 'groom_recovery_pouch_1777127477843.png',
    product: {
      name: 'Zip Recovery Pouch | Sleek Matte Black',
      slug: 'zip-recovery-pouch-black',
      active: true,
      price: 10.99,
      type: 'standard',
      description: `<p><em>Because it's going to be a long, incredible night.</em></p>
<p>A sleek, premium matte black canvas zipper pouch featuring brushed gold hardware. Shipped empty, it is the perfect vessel for you to fill with aspirin, mints, liquid IV, and bandaids for the ultimate recovery kit.</p>
<ul>
<li><strong>Durable Canvas:</strong> A rugged exterior that wipes clean effortlessly.</li>
<li><strong>Brushed Gold Zipper:</strong> High-quality zipper hardware that won't snag or break.</li>
<li><strong>Multi-Use:</strong> Long after the hangover fades, it functions perfectly as a tech pouch or minimal dopp kit.</li>
</ul>`,
      meta_title: 'Recovery Kit Zip Pouch | Groomsman Gift | Custom Wedding Co.',
      meta_description: 'Sleek matte black canvas zipper pouch with gold hardware. The perfect vessel for creating a custom bachelor party hangover recovery kit.',
    }
  },

  // 16. Black Single Cigar Tube
  {
    image: 'groom_cigar_tube_1777127497689.png',
    product: {
      name: 'Single Cigar Travel Tube | Matte Black Aluminum',
      slug: 'single-cigar-travel-tube-black',
      active: true,
      price: 13.99,
      type: 'standard',
      description: `<p><em>Protect the premium leaf until the moment is right.</em></p>
<p>A minimalist, ultra-durable matte black aluminum cigar tube. Designed with an airtight seal to maintain optimal humidity and protect a single cigar from crushing in his jacket pocket.</p>
<ul>
<li><strong>Crush-Proof Aluminum:</strong> Lightweight yet incredibly strong protection.</li>
<li><strong>Airtight Screw Cap:</strong> Locks in moisture to keep the cigar fresh even outside a humidor.</li>
<li><strong>Universal Fit:</strong> Easily holds most robusto and Churchill size cigars.</li>
</ul>`,
      meta_title: 'Black Cigar Tube | Travel Cigar Case | Custom Wedding Co.',
      meta_description: 'Crush-proof matte black aluminum single cigar tube. Airtight seal keeps cigars fresh in the pocket. Ideal luxurious groomsman accessory.',
    }
  },

  // 17. Travel Shoe Shine Cloth
  {
    image: 'groom_shoe_cloth_1777127510443.png',
    product: {
      name: 'Woven Shoe Shine Cloth | Travel Detailing',
      slug: 'woven-shoe-shine-cloth',
      active: true,
      price: 7.99,
      type: 'standard',
      description: `<p><em>For a mirror finish when walking down the aisle.</em></p>
<p>A dense, ultra-soft black woven microfiber cloth with a subtle gold crest detail in the corner. Removes dust and enhances the wax shine on dress shoes perfectly right before the photos begin.</p>
<ul>
<li><strong>Ultra-Soft Microfiber:</strong> Non-abrasive material won't scratch premium calfskin or cordovan leathers.</li>
<li><strong>Generous Size:</strong> Large enough to effectively buff the toe cap and heel without slipping.</li>
<li><strong>Pocket-Friendly:</strong> Folds away to virtually nothing, perfect for last-minute touchups.</li>
</ul>`,
      meta_title: 'Shoe Shine Cloth | Mens Grooming Accessory | Custom Wedding Co.',
      meta_description: 'Premium black woven microfiber shoe buffing cloth. Ultra soft and non-abrasive for achieving the perfect shine on dress shoes.',
    }
  },

  // 18. Cedar Wood Shoe Balls
  {
    image: 'groom_cedar_balls_1777127524123.png',
    product: {
      name: 'Cedar Wood Shoe Deodorizer Balls | Set of 6',
      slug: 'cedar-wood-shoe-deodorizer-balls',
      active: true,
      price: 10.99,
      type: 'standard',
      description: `<p><em>Natural care for his favorite footwear.</em></p>
<p>A set of six raw, aromatic cedar wood spheres designed to rest inside dress shoes or sneakers after a long day. They naturally absorb moisture and neutralize odors while imparting a fresh, woodsy scent.</p>
<ul>
<li><strong>100% Natural Cedar:</strong> Zero chemicals or synthetic fragrances; entirely natural odor combat.</li>
<li><strong>Moisture Wicking:</strong> Helps maintain the shape and longevity of leather shoes by absorbing sweat.</li>
<li><strong>Matte Box Presentation:</strong> Arrives in an elegant, minimal black box ready for gifting.</li>
</ul>`,
      meta_title: 'Cedar Wood Shoe Balls | Shoe Care Gift | Custom Wedding Co.',
      meta_description: 'Set of 6 natural aromatic cedar wood shoe deodorizer balls. Absorbs moisture and naturally freshens leather shoes. A smart groomsman gift.',
    }
  },

  // 19. Bespoke Matchbox
  {
    image: 'groom_matchbox_1777127535246.png',
    product: {
      name: 'Premium Oversized Matchbox | Black & Gold Foil',
      slug: 'premium-oversized-matchbox-black-gold',
      active: true,
      price: 6.99,
      type: 'standard',
      description: `<p><em>The perfect companion for a celebratory cigar.</em></p>
<p>An oversized, ultra-thick matte black matchbox enveloped in a subtle brushed gold foil perimeter design. Filled with extra-long black-tipped safety matches designed for lighting cigars or low-wick candles effortlessly.</p>
<ul>
<li><strong>Extra-Long Matches:</strong> Provide a longer burn times, perfect for properly toasting the foot of a cigar.</li>
<li><strong>Aesthetic Box:</strong> Looks incredibly sharp sitting on a coffee table or bar cart.</li>
<li><strong>High-Friction Striker:</strong> Ensures a clean, reliable light on the first strike.</li>
</ul>`,
      meta_title: 'Premium Black Matchbox | Cigar Matches | Custom Wedding Co.',
      meta_description: 'Oversize matte black matchbox with gold foil design. Contains long black-tipped matches perfect for cigars. An elegant groomsman box add-on.',
    }
  },

  // 20. Travel Lint Roller
  {
    image: 'groom_lint_roller_1777127549966.png',
    product: {
      name: 'Travel-Size Sleek Lint Roller | Matte Black',
      slug: 'travel-size-sleek-lint-roller',
      active: true,
      price: 8.99,
      type: 'standard',
      description: `<p><em>Look sharp, clean, and immaculate.</em></p>
<p>A highly compact, travel-size lint roller intelligently housed inside a smooth matte black cylindrical case with antique gold accents. Protects the sticky layers while stored in a dopp kit or jacket pocket.</p>
<ul>
<li><strong>Protective Housing:</strong> Prevents the roll from sticking to items in his travel bag.</li>
<li><strong>Extra Sticky Tape:</strong> Easily removes white lint, dog hair, or dust from a dark suit.</li>
<li><strong>Discreet Profile:</strong> Looks more like a high-end tech gadget than a cleaning tool.</li>
</ul>`,
      meta_title: 'Travel Lint Roller | Suit Accessory | Custom Wedding Co.',
      meta_description: 'Sleek matte black travel lint roller enclosed in a protective case. An essential last-minute grooming tool for a flawless groomsman suit.',
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION ENGINE
// ═══════════════════════════════════════════════════════════════════════════

(async () => {
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  Custom Wedding Co. — Groomsman Box Stuffers (20 Products)     ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\\n');

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
      let productId;

      if (existing.results?.length) {
        console.log('  ⚠  Slug exists — updating product info.');
        productId = existing.results[0].id;
        await swell.put(`/products/${productId}`, {
          ...product,
          category_index: { id: [GROOM_BOX_CATEGORY_ID] },
        });
      } else {
        const created = await swell.post('/products', {
          ...product,
          category_index: { id: [GROOM_BOX_CATEGORY_ID] },
        });
        productId = created.id;
      }
      console.log(`  ✓ Product ID: ${productId}`);

      // ── Two-step image upload ───────────────────────────────────────
      const imgPath = path.join(BRAIN, image);
      if (fs.existsSync(imgPath)) {
        const buf = fs.readFileSync(imgPath);
        
        // Step 1: Upload to /:files
        console.log('  Uploading file to CDN...');
        const filename = `${product.slug}-hero.png`;
        const fileRes = await swell.post('/:files', {
          data: buf.toString('base64'),
          filename,
          content_type: 'image/png',
          width: 1024,
          height: 1024
        });
        
        if (fileRes.url) {
          // Step 2: Attach to product, clearing existing images first
          await swell.put(`/products/${productId}`, { images: null });
          const result = await swell.put(`/products/${productId}`, {
            images: [{
              file: {
                url: fileRes.url,
                width: 1024,
                height: 1024
              }
            }]
          });
          
          if (result.images?.[0]?.file?.width) {
            console.log(`  ✓ Image attached (${result.images[0].file.width}×${result.images[0].file.height})`);
          } else {
             console.log('  ⚠ Image attached but missing dimensions');
          }
        } else {
          console.log('  ✗ File upload failed - no URL returned');
        }
      } else {
        console.log(`  ⚠ Source image not found: ${image}`);
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
