/**
 * create_phase1_products.js
 * ──────────────────────────
 * Creates all 8 Phase-1 expansion products on Swell in a single run.
 * Each product gets: image upload, full SEO, variant options, custom
 * fields, tags, category assignment, and is published live.
 *
 * Usage:  node scripts/create_phase1_products.js
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

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCTS = [

  // ─── 1. Digital Wedding Invitation Suite ──────────────────────────────
  {
    image: path.join(BRAIN, 'digital_invitation_suite_1776944551356.png'),
    categorySlugs: [
      'wedding-stationery', 'invitation-embellishments', 'bespoke-details',
      'personalized-wedding-details', 'luxury-wedding-details',
    ],
    product: {
      name: 'Bespoke Digital Wedding Invitation Suite | Editable Canva Templates',
      slug: 'bespoke-digital-wedding-invitation-suite',
      active: true,
      price: 24.99,
      type: 'standard',
      description: `<p>Announce your love story with timeless elegance — no printing delays, no minimum orders. Our Bespoke Digital Wedding Invitation Suite gives you a complete set of professionally designed, fully editable Canva templates that match our signature cream, espresso, and gold aesthetic.</p>

<h3>What's Included</h3>
<ul>
<li><strong>Wedding Invitation</strong> — 5×7" editable template with refined serif typography and gold accent details</li>
<li><strong>RSVP Card</strong> — Matching response card with QR code or mail-in options</li>
<li><strong>Details / Enclosure Card</strong> — For venue directions, registry info, dress code, and accommodation details</li>
<li><strong>Save the Date</strong> — Coordinating design for early announcements</li>
<li><strong>Thank You Card</strong> — Post-wedding gratitude in the same elegant suite</li>
</ul>

<h3>How It Works</h3>
<ul>
<li>✦ Instant digital delivery after purchase — download links sent to your email</li>
<li>✦ Edit everything in free Canva — names, dates, colors, fonts, photos</li>
<li>✦ Print at home, at a local print shop, or send digitally via text/email</li>
<li>✦ Unlimited prints — no per-card fees, ever</li>
</ul>

<h3>Perfect For</h3>
<ul>
<li>✦ Budget-conscious couples who still demand premium design</li>
<li>✦ Destination weddings needing quick digital distribution</li>
<li>✦ Last-minute timeline changes — edit and reprint in minutes</li>
</ul>`,
      meta_title: 'Digital Wedding Invitation Suite | Editable Canva Templates | Custom Wedding Co.',
      meta_description: 'Elegant, fully editable digital wedding invitation templates for Canva. Includes invitation, RSVP, details card, save the date & thank you card. Instant download, unlimited prints.',
      tags: [
        'digital invitation', 'wedding invitation template', 'canva template',
        'editable invitation', 'digital stationery', 'printable invitation',
        'wedding suite', 'save the date template', 'RSVP template',
        'instant download', 'budget wedding', 'DIY invitation',
      ],
      options: [
        {
          name: 'Suite Package',
          variant: true,
          active: true,
          values: [
            { name: 'Full Suite (5 Templates)', price: 0 },
            { name: 'Essentials (Invitation + RSVP + Details)', price: -10 },
            { name: 'Single Template — Invitation Only', price: -12 },
          ],
        },
        {
          name: 'Color Palette',
          variant: true,
          active: true,
          values: [
            { name: 'Classic Cream & Gold', price: 0 },
            { name: 'Romantic Blush & Rose Gold', price: 0 },
            { name: 'Modern Espresso & Ivory', price: 0 },
            { name: 'Sage & Botanical', price: 0 },
          ],
        },
      ],
    },
  },

  // ─── 2. Custom Wedding Vow Art Print ──────────────────────────────────
  {
    image: path.join(BRAIN, 'wedding_vow_art_print_1776944565352.png'),
    categorySlugs: [
      'heirloom-keepsakes', 'bespoke-keepsakes', 'wedding-keepsakes',
      'personalized-wedding-details', 'bespoke-home-decor',
      'personalized-home-decor', 'heirloom-artisan',
    ],
    product: {
      name: 'Custom Wedding Vow Art Print | Personalized Heirloom Keepsake',
      slug: 'custom-wedding-vow-art-print',
      active: true,
      price: 25.00,
      type: 'standard',
      description: `<p>Preserve the most meaningful words you've ever spoken. Our Custom Wedding Vow Art Print transforms your personal wedding vows into a stunning piece of fine art — beautifully typeset in elegant serif calligraphy on archival-quality paper or canvas.</p>

<ul>
<li><strong>Bespoke Typography:</strong> Your exact vow text, artfully typeset by our design team with refined kerning, leading, and hierarchy for maximum emotional impact</li>
<li><strong>Archival Quality:</strong> Printed on museum-grade, acid-free paper or premium gallery-wrapped canvas with fade-resistant inks rated for 100+ years</li>
<li><strong>Multiple Formats:</strong> Available as a digital download, premium print, or gallery-wrapped canvas — framed or unframed</li>
<li><strong>His & Hers Option:</strong> Order as a single print or a matching pair — one for each set of vows, displayed side by side</li>
<li><strong>The Perfect Anniversary Gift:</strong> Paper is the traditional first anniversary gift. This is the most meaningful paper gift in existence.</li>
</ul>

<h3>Proofing & Production</h3>
<ul>
<li>✦ Digital proof within 2 business days</li>
<li>✦ Unlimited revisions until every word is perfect</li>
<li>✦ Prints ship within 3–5 business days after approval</li>
</ul>`,
      meta_title: 'Custom Wedding Vow Art Print | Personalized Anniversary Keepsake Gift',
      meta_description: 'Transform your wedding vows into elegant fine art. Custom typeset on archival paper or canvas. The perfect first anniversary gift. Digital, print, or framed canvas options.',
      tags: [
        'wedding vow art', 'vow print', 'anniversary gift', 'paper anniversary',
        'first anniversary', 'custom vow print', 'wedding keepsake',
        'personalized art', 'heirloom print', 'vow wall art',
        'couples gift', 'wedding gift',
      ],
      options: [
        {
          name: 'Format',
          variant: true,
          active: true,
          values: [
            { name: 'Digital Download (PDF + PNG)', price: 0 },
            { name: 'Premium Archival Print (Unframed)', price: 20 },
            { name: 'Gallery-Wrapped Canvas', price: 54 },
          ],
        },
        {
          name: 'Size',
          variant: true,
          active: true,
          values: [
            { name: '8 × 10 in', price: 0 },
            { name: '11 × 14 in', price: 8 },
            { name: '16 × 20 in', price: 18 },
          ],
        },
        {
          name: 'Layout',
          variant: true,
          active: true,
          values: [
            { name: 'Single Vow', price: 0 },
            { name: 'His & Hers (Side by Side)', price: 15 },
          ],
        },
        {
          name: 'Your Wedding Vow Text',
          input_type: 'long_text',
          required: true,
          description: 'Please type or paste your complete wedding vow text. For His & Hers, separate each vow with a line.',
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

  // ─── 3. Personalized Wedding Coloring Book ────────────────────────────
  {
    image: path.join(BRAIN, 'wedding_coloring_book_1776944578683.png'),
    categorySlugs: [
      'wedding-reception-details', 'wedding-reception-decor',
      'personalized-wedding-details', 'wedding-favors',
    ],
    product: {
      name: 'Personalized Wedding Coloring & Activity Book for Kids | Digital Download',
      slug: 'personalized-wedding-coloring-book',
      active: true,
      price: 12.99,
      type: 'standard',
      description: `<p>Keep your littlest guests delighted and entertained throughout your celebration with our bespoke Wedding Coloring & Activity Book — personalized with your names and wedding details for a truly special touch.</p>

<ul>
<li><strong>20 Thoughtfully Designed Pages:</strong> Elegant line-art illustrations of wedding scenes — the ceremony, the cake, the bouquet, the rings, dancing — plus word searches, mazes, and "draw the couple" prompts</li>
<li><strong>Personalized Cover & Pages:</strong> The cover features your names, wedding date, and a sweet "Junior Guest: ___" name line. Several interior pages reference your wedding details for an immersive experience</li>
<li><strong>Instant Digital Download:</strong> Receive a high-resolution PDF instantly after purchase. Print as many copies as you need at home or at your local print shop — no per-copy cost</li>
<li><strong>Elegant Design:</strong> Our illustrations are elevated and stylish — not cartoonish. They match the refined aesthetic of your wedding perfectly</li>
<li><strong>Parent-Approved:</strong> Activities span ages 3-12, keeping children happily occupied through cocktail hour, dinner, and speeches</li>
</ul>

<h3>What You Receive</h3>
<ul>
<li>✦ Personalized 20-page PDF (8.5 × 11" — standard printer paper)</li>
<li>✦ Instant download link via email</li>
<li>✦ Unlimited prints — print once or 100 times</li>
</ul>`,
      meta_title: 'Personalized Wedding Coloring Book for Kids | Digital Download | Custom Wedding Co.',
      meta_description: 'Keep kids entertained at your wedding with a personalized coloring & activity book. Customized with your names and date. Instant digital download, unlimited prints.',
      tags: [
        'wedding coloring book', 'kids wedding activity', 'wedding activity book',
        'children wedding entertainment', 'reception activity', 'digital download',
        'printable coloring book', 'personalized coloring book', 'wedding favor kids',
        'junior guest', 'flower girl gift',
      ],
      options: [
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
        {
          name: 'Special Requests (optional)',
          input_type: 'long_text',
          required: false,
          description: 'Any custom details — pet names, venue name, or specific activities you\'d like included.',
        },
      ],
    },
  },

  // ─── 4. Velvet Ring Box ───────────────────────────────────────────────
  {
    image: path.join(BRAIN, 'velvet_ring_box_1776944604166.png'),
    categorySlugs: [
      'heirloom-keepsakes', 'bespoke-keepsakes', 'wedding-keepsakes',
      'bespoke-accessories', 'bespoke-wedding-accessories',
      'luxury-wedding-details', 'fine-jewelry-accessories',
    ],
    product: {
      name: 'Heritage Velvet Ring Box | Luxury Ceremony & Photo Ring Display',
      slug: 'heritage-velvet-ring-box',
      active: true,
      price: 19.99,
      type: 'standard',
      description: `<p>Present your rings in the quiet luxury they deserve. Our Heritage Velvet Ring Box is handcrafted from sumptuous Italian-style velvet with a silk-lined interior, designed to cradle your wedding bands during the ceremony and create breathtaking detail shots for your photographer.</p>

<ul>
<li><strong>Premium Velvet Construction:</strong> Dense, brushed velvet exterior with a satisfying magnetic snap closure and silk-satin interior lining</li>
<li><strong>Photography Essential:</strong> Every wedding photographer recommends a beautiful ring box for flat-lay and detail shots. This box photographs flawlessly in any light</li>
<li><strong>Ceremony Ready:</strong> Sized for both the ring bearer's walk and the vow exchange — elegant, secure, and effortlessly sophisticated</li>
<li><strong>Heirloom Quality:</strong> Designed to last — store your rings in this box for decades as a tangible memory of your wedding day</li>
<li><strong>Available in 6 Curated Colors:</strong> Each color is hand-selected to complement our espresso, cream, gold, and blush brand palette</li>
</ul>`,
      meta_title: 'Luxury Velvet Ring Box | Wedding Ceremony & Photography Ring Display',
      meta_description: 'Present your wedding rings in handcrafted velvet luxury. Silk-lined interior, magnetic closure, photographer-approved. Available in 6 curated colors. Ships ready to use.',
      tags: [
        'ring box', 'velvet ring box', 'wedding ring box', 'ceremony ring box',
        'ring bearer box', 'ring display', 'jewelry box', 'engagement ring box',
        'wedding photography prop', 'flat lay prop', 'luxury ring box',
      ],
      options: [
        {
          name: 'Style',
          variant: true,
          active: true,
          values: [
            { name: 'Single Ring Slot', price: 0 },
            { name: 'Double Ring Slot (His & Hers)', price: 10 },
          ],
        },
        {
          name: 'Color',
          variant: true,
          active: true,
          values: [
            { name: 'Espresso Brown', price: 0 },
            { name: 'Ivory Cream', price: 0 },
            { name: 'Blush Pink', price: 0 },
            { name: 'Sage Green', price: 0 },
            { name: 'Dusty Blue', price: 0 },
            { name: 'Classic Black', price: 0 },
          ],
        },
      ],
    },
  },

  // ─── 5. Bridal Emergency Kit ──────────────────────────────────────────
  {
    image: path.join(BRAIN, 'bridal_emergency_kit_1776944617189.png'),
    categorySlugs: [
      'bespoke-wedding-accessories', 'bespoke-accessories',
      'bridal-shower-offerings', 'bridesmaids-gifts',
      'luxury-wedding-details',
    ],
    product: {
      name: 'Luxe Bridal Emergency Kit | Premium Wedding Day Survival Box',
      slug: 'luxe-bridal-emergency-kit',
      active: true,
      price: 44.99,
      type: 'standard',
      description: `<p>Because your wedding day should be flawless from first look to last dance. Our Luxe Bridal Emergency Kit is a meticulously curated collection of essentials — beautifully packaged in our signature cream and gold gift box — ready for anything the day may bring.</p>

<h3>What's Inside</h3>
<ul>
<li><strong>Fashion Fixes:</strong> Fashion tape strips, safety pins, mini sewing kit (white, ivory, black thread), clear nail polish (for stocking runs)</li>
<li><strong>Beauty Touch-Ups:</strong> Oil-blotting sheets, bobby pins, hair ties, cotton swabs, compact mirror</li>
<li><strong>Comfort & Care:</strong> Blister prevention balm, pain reliever, antacid, breath mints, tissues</li>
<li><strong>Stain & Spill:</strong> Instant stain remover pen, chalk stick (for scuff marks on white shoes)</li>
<li><strong>Just in Case:</strong> Super glue, earring backs, double-sided tape</li>
</ul>

<h3>Gift-Ready Packaging</h3>
<ul>
<li>✦ Presented in our signature cream linen box with gold foil "Just in Case" label</li>
<li>✦ Layered in cream tissue paper with a blush satin ribbon</li>
<li>✦ Perfect bridal shower gift — arrives ready to give, no wrapping needed</li>
<li>✦ Ships immediately — no customization required</li>
</ul>`,
      meta_title: 'Luxury Bridal Emergency Kit | Wedding Day Survival Gift Box | Custom Wedding Co.',
      meta_description: 'Be prepared for anything on the big day. Our luxury bridal emergency kit includes 20+ essentials in a beautiful gift box. The perfect bridal shower gift. Ships immediately.',
      tags: [
        'bridal emergency kit', 'wedding day kit', 'bride survival kit',
        'bridal shower gift', 'getting ready kit', 'wedding day essentials',
        'bridesmaid gift', 'maid of honor gift', 'mother of the bride gift',
        'wedding preparation', 'day-of essentials',
      ],
      options: [
        {
          name: 'Kit Size',
          variant: true,
          active: true,
          values: [
            { name: 'Standard (20+ Items)', price: 0 },
            { name: 'Deluxe (30+ Items — includes mini perfume & facial mist)', price: 20 },
          ],
        },
      ],
    },
  },

  // ─── 6. Bespoke Monogram Wax Seal Stickers ───────────────────────────
  {
    image: path.join(BRAIN, 'wax_seal_stickers_1776944634344.png'),
    categorySlugs: [
      'wedding-stationery', 'invitation-embellishments', 'bespoke-details',
      'personalized-wedding-details', 'luxury-wedding-details',
    ],
    product: {
      name: 'Bespoke Monogram Wax Seal Stickers | Peel & Stick Self-Adhesive',
      slug: 'bespoke-monogram-wax-seal-stickers',
      active: true,
      price: 18.00,
      type: 'standard',
      description: `<p>The timeless elegance of a hand-poured wax seal — without the candle, the dripping, or the stress. Our Bespoke Monogram Wax Seal Stickers are premium self-adhesive seals handcrafted to look and feel identical to real wax, personalized with your custom monogram.</p>

<ul>
<li><strong>Indistinguishable from Real Wax:</strong> Made from flexible, durable wax-finish resin that captures every detail of a traditional wax seal — including the beautiful texture and dimensional relief</li>
<li><strong>Custom Monogram Design:</strong> Your initials are set in an elegant intertwined monogram by our design team, surrounded by delicate botanical or classical border elements</li>
<li><strong>Effortless Application:</strong> Simply peel and stick — no heat, no mess, no equipment needed. Adheres beautifully to paper, vellum, and envelope surfaces</li>
<li><strong>Versatile Use:</strong> Perfect for invitation envelopes, favor bags, vow booklets, gift boxes, menu cards, and any detail that deserves a finishing touch</li>
<li><strong>Available in 8 Luxe Colors:</strong> Curated to complement any wedding palette</li>
</ul>`,
      meta_title: 'Custom Monogram Wax Seal Stickers | Self-Adhesive Wedding Envelope Seals',
      meta_description: 'Premium peel & stick wax seal stickers with your custom monogram. Handcrafted to look and feel like real wax. Available in 8 colors. Perfect for wedding invitations and favors.',
      tags: [
        'wax seal stickers', 'self-adhesive wax seal', 'monogram seal',
        'envelope seal', 'wedding stationery', 'invitation seal',
        'peel and stick wax seal', 'custom monogram', 'wedding envelope',
        'wax seal', 'stationery embellishment',
      ],
      options: [
        {
          name: 'Quantity',
          variant: true,
          active: true,
          values: [
            { name: '25 Stickers', price: 0 },
            { name: '50 Stickers', price: 12 },
            { name: '100 Stickers', price: 34 },
            { name: '150 Stickers', price: 50 },
            { name: '200 Stickers', price: 64 },
          ],
        },
        {
          name: 'Seal Color',
          variant: true,
          active: true,
          values: [
            { name: 'Classic Gold', price: 0 },
            { name: 'Antique Bronze', price: 0 },
            { name: 'Rose Gold', price: 0 },
            { name: 'Silver', price: 0 },
            { name: 'Ivory White', price: 0 },
            { name: 'Espresso Brown', price: 0 },
            { name: 'Dusty Rose', price: 0 },
            { name: 'Forest Green', price: 0 },
          ],
        },
        {
          name: 'Monogram Style',
          variant: true,
          active: true,
          values: [
            { name: 'Intertwined Initials (Classic)', price: 0 },
            { name: 'Stacked Initials with Botanical Border', price: 0 },
            { name: 'Single Initial with Wreath', price: 0 },
          ],
        },
        {
          name: 'Initials — e.g., S & D',
          input_type: 'short_text',
          required: true,
        },
      ],
    },
  },

  // ─── 7. Mr & Mrs Luggage Tag Set ──────────────────────────────────────
  {
    image: path.join(BRAIN, 'luggage_tags_1776944658326.png'),
    categorySlugs: [
      'honeymoon-essentials', 'personalized-accessories',
      'bespoke-accessories', 'luxury-travel-goods',
      'heirloom-artisan',
    ],
    product: {
      name: '"Mr & Mrs" Leather Luggage Tag Set | Personalized Honeymoon Travel Accessory',
      slug: 'mr-mrs-leather-luggage-tag-set',
      active: true,
      price: 24.99,
      type: 'standard',
      description: `<p>Start your forever adventure in style. Our matching "Mr & Mrs" Leather Luggage Tag Set is the quintessential honeymoon accessory — handcrafted from premium full-grain leather, gold-foil stamped, and personalized with your new shared surname.</p>

<ul>
<li><strong>Premium Full-Grain Leather:</strong> Buttery-soft genuine leather that develops a beautiful patina over time, getting more beautiful with each journey</li>
<li><strong>Gold Foil Stamping:</strong> "Mr." and "Mrs." in elegant serif lettering with your married surname, pressed in genuine gold foil</li>
<li><strong>Solid Gold-Tone Hardware:</strong> Heavy-duty buckle strap with secure attachment loop — no flimsy plastic clips</li>
<li><strong>ID Window:</strong> Flip side features a clear window for contact information cards (2 cards included)</li>
<li><strong>Perfect Registry Item:</strong> Comes in a cream gift box with gold foil branding — a stunning bridal shower or wedding gift</li>
</ul>`,
      meta_title: 'Mr & Mrs Leather Luggage Tag Set | Personalized Honeymoon Travel Gift',
      meta_description: 'Matching gold-foil stamped leather luggage tags personalized with your married surname. Premium full-grain leather with gold hardware. The perfect honeymoon or wedding gift.',
      tags: [
        'luggage tags', 'honeymoon gift', 'mr and mrs', 'travel accessories',
        'leather luggage tag', 'personalized luggage tag', 'wedding gift',
        'bridal shower gift', 'honeymoon accessories', 'newlywed gift',
        'couples travel', 'destination wedding',
      ],
      options: [
        {
          name: 'Leather Color',
          variant: true,
          active: true,
          values: [
            { name: 'Cream Ivory', price: 0 },
            { name: 'Espresso Brown', price: 0 },
            { name: 'Classic Black', price: 0 },
            { name: 'Blush Pink', price: 0 },
          ],
        },
        {
          name: 'Stamping',
          variant: true,
          active: true,
          values: [
            { name: 'Gold Foil', price: 0 },
            { name: 'Silver Foil', price: 0 },
            { name: 'Rose Gold Foil', price: 0 },
          ],
        },
        {
          name: 'Married Surname — e.g., The Wilsons',
          input_type: 'short_text',
          required: true,
        },
      ],
    },
  },

  // ─── 8. Groomsmen Proposal Gift Box ───────────────────────────────────
  {
    image: path.join(BRAIN, 'groomsmen_proposal_box_1776944672584.png'),
    categorySlugs: [
      'groomsmen-gifts', 'gifts-for-the-groom', 'the-grooms-party',
      'bachelor-party-keepsakes', 'bespoke-barware-accessories',
      'wedding-reception-details',
    ],
    product: {
      name: 'Groomsmen Proposal Gift Box | Personalized "Will You Be My Best Man?" Keepsake Set',
      slug: 'groomsmen-proposal-gift-box',
      active: true,
      price: 44.99,
      type: 'standard',
      description: `<p>Pop the question to your crew in unforgettable style. Our Groomsmen Proposal Gift Box is a thoughtfully curated collection of premium keepsakes — personalized with each groomsman's name — presented in a handsome espresso-stained wooden box they'll keep forever.</p>

<h3>What's Inside</h3>
<ul>
<li><strong>Engraved Whiskey Glass (10 oz):</strong> Heavy-base rocks glass with laser-engraved initials and wedding role — "Best Man," "Groomsman," or "Usher"</li>
<li><strong>Gold-Plated Cufflinks:</strong> Classic round cufflinks in a mini velvet pouch — engraved with initials</li>
<li><strong>Custom Cigar Band:</strong> A personalized cigar band with the groomsman's name in gold foil (cigar not included — add your own!)</li>
<li><strong>Proposal Card:</strong> A beautifully letterpressed card in our signature serif typography — "Will You Be My Best Man / Groomsman?"</li>
<li><strong>Espresso Wooden Box:</strong> Dark-stained hinged wooden keepsake box with magnetic closure — becomes a permanent storage box for cufflinks, watches, or mementos</li>
</ul>

<h3>Ordering Multiple?</h3>
<ul>
<li>✦ Select a quantity for your entire party — we personalize each box individually</li>
<li>✦ In the names field below, list each groomsman's name and role on a separate line</li>
<li>✦ Each box ships with individual gift wrapping at no extra cost</li>
</ul>`,
      meta_title: 'Groomsmen Proposal Gift Box | Personalized Best Man & Groomsman Keepsake Set',
      meta_description: 'Ask your groomsmen in style with a personalized proposal gift box. Includes engraved whiskey glass, gold cufflinks, custom cigar band & proposal card in a keepsake wooden box.',
      tags: [
        'groomsmen proposal', 'groomsman gift', 'best man gift',
        'groomsmen box', 'will you be my groomsman', 'wedding party gift',
        'bachelor party', 'engraved whiskey glass', 'personalized cufflinks',
        'groomsmen keepsake', 'groom gifts', 'usher gift',
      ],
      options: [
        {
          name: 'Quantity',
          variant: true,
          active: true,
          values: [
            { name: '1 Box', price: 0 },
            { name: '2 Boxes', price: 44.99 },
            { name: '3 Boxes', price: 89.98 },
            { name: '4 Boxes', price: 134.97 },
            { name: '5 Boxes', price: 179.96 },
            { name: '6 Boxes', price: 224.95 },
            { name: '7 Boxes', price: 269.94 },
            { name: '8 Boxes', price: 314.93 },
          ],
        },
        {
          name: 'Card Type',
          variant: true,
          active: true,
          values: [
            { name: '"Will You Be My Best Man?"', price: 0 },
            { name: '"Will You Be My Groomsman?"', price: 0 },
            { name: '"Will You Be My Usher?"', price: 0 },
            { name: 'Mixed (specify below)', price: 0 },
          ],
        },
        {
          name: 'Names & Roles (one per line — e.g., "James — Best Man")',
          input_type: 'long_text',
          required: true,
          description: 'List each groomsman name and role on a separate line. We will engrave the glass and cufflinks with the name/initials provided.',
        },
        {
          name: 'Wedding Date — e.g., June 15, 2026',
          input_type: 'short_text',
          required: true,
        },
      ],
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION ENGINE
// ═══════════════════════════════════════════════════════════════════════════

(async () => {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║   Custom Wedding Co. — Phase 1 Product Builder (8 Items)   ║');
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

      // ── Resolve categories ──────────────────────────────────────────
      const categoryIds = [];
      for (const slug of categorySlugs) {
        const res = await swell.get('/categories', { where: { slug } });
        if (res.results?.length) {
          categoryIds.push(res.results[0].id);
        }
      }
      console.log(`  Categories: ${categoryIds.length} resolved`);

      // ── Create or update product ────────────────────────────────────
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
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  BATCH COMPLETE: ${successCount} published, ${failCount} failed`);
  console.log(`${'═'.repeat(60)}\n`);
})();
