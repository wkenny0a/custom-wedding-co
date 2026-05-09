export const WEDDING_CATEGORIES = [
    'Signage & Displays',
    'Barware & Drinkware',
    'Bridal Party Gifts',
    'Groomsmen Gifts',
    'Wedding Keepsakes',
    'Ceremony & Reception',
    'Bags & Totes',
    'Jewelry & Accessories',
    'Apparel & Loungewear',
    'Favors & Party Extras',
    'Beauty & Self-Care',
    'Build Your Box',
];

export const PRODUCT_TO_CATEGORIES_MAP: Record<string, string[]> = {
    // ═══════════════════════════════════════════════════════════════
    // SIGNAGE & DISPLAYS
    // ═══════════════════════════════════════════════════════════════
    'bespoke-mirrored-acrylic-wedding-welcome-sign': ['Signage & Displays', 'Ceremony & Reception', 'Wedding Keepsakes'],
    'custom-mirror-acrylic-seating-chart': ['Signage & Displays', 'Ceremony & Reception'],

    // ═══════════════════════════════════════════════════════════════
    // BARWARE & DRINKWARE
    // ═══════════════════════════════════════════════════════════════
    'bespoke-engraved-groomsmen-pint-glass': ['Barware & Drinkware', 'Groomsmen Gifts'],
    'bespoke-engraved-heirloom-bottle-opener': ['Barware & Drinkware', 'Groomsmen Gifts', 'Favors & Party Extras'],
    'bespoke-frosted-acrylic-wedding-cups': ['Barware & Drinkware', 'Ceremony & Reception'],
    'bespoke-acrylic-cocktail-stirrers': ['Barware & Drinkware', 'Ceremony & Reception'],
    'bespoke-engraved-mini-whiskey-glass': ['Barware & Drinkware', 'Groomsmen Gifts'],
    'personlaized-wine-glass-custom-wine-glass-wedding-favor': ['Barware & Drinkware', 'Favors & Party Extras'],
    'personlaized-champagne-glass-custom-champagne-glass-wedding-favor': ['Barware & Drinkware', 'Favors & Party Extras'],
    'custom-16oz-acrylic-tumbler-personalized-bridal-party-wedding-favor': ['Barware & Drinkware', 'Bridal Party Gifts', 'Favors & Party Extras'],
    'bespoke-heirloom-photo-whiskey-glass': ['Barware & Drinkware', 'Wedding Keepsakes', 'Groomsmen Gifts'],
    'bespoke-engraved-crystal-whiskey-glass-keepsake-box-set': ['Barware & Drinkware', 'Groomsmen Gifts', 'Wedding Keepsakes'],
    'bespoke-engraved-stemless-wine-glass-set': ['Barware & Drinkware', 'Wedding Keepsakes'],
    'granite-whiskey-stones-set': ['Barware & Drinkware', 'Groomsmen Gifts'],
    'aromatic-cocktail-bitters': ['Barware & Drinkware', 'Groomsmen Gifts'],
    'bartenders-bottle-opener-black': ['Barware & Drinkware', 'Groomsmen Gifts'],
    'leather-wrapped-stainless-steel-flask': ['Barware & Drinkware', 'Groomsmen Gifts'],
    'gold-heart-wine-stopper-bridal': ['Barware & Drinkware', 'Favors & Party Extras', 'Bridal Party Gifts'],

    // ═══════════════════════════════════════════════════════════════
    // BRIDAL PARTY GIFTS
    // ═══════════════════════════════════════════════════════════════
    'bespoke-botanical-makeup-brush-portfolio': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'the-heirloom-mini-velvet-jewelry-case': ['Bridal Party Gifts', 'Jewelry & Accessories'],
    'bespoke-velvet-heirloom-jewelry-case': ['Bridal Party Gifts', 'Jewelry & Accessories', 'Wedding Keepsakes'],
    'bespoke-satin-lace-bridal-robe': ['Bridal Party Gifts', 'Apparel & Loungewear'],
    'bespoke-satin-sleep-collection': ['Bridal Party Gifts', 'Apparel & Loungewear'],
    'custom-cosmetic-pouch-personalized-bridal-party-gift': ['Bridal Party Gifts', 'Bags & Totes'],
    'personalized-compact-mirror-custom-heirloom-bridal-gift': ['Bridal Party Gifts', 'Beauty & Self-Care', 'Jewelry & Accessories'],
    'bespoke-diamond-rosegold-name-necklace-heirloom-script-pendant': ['Bridal Party Gifts', 'Jewelry & Accessories'],
    'heirloom-satin-scrunchie-set': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'mulberry-silk-pillowcase-bridal': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'botanical-bath-bomb-trio': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'rose-gold-reusable-straw-set': ['Bridal Party Gifts', 'Favors & Party Extras'],
    'rose-gold-compact-mirror-bridal': ['Bridal Party Gifts', 'Jewelry & Accessories', 'Beauty & Self-Care'],
    'pearl-embellished-hair-claw-clip': ['Bridal Party Gifts', 'Jewelry & Accessories'],
    'dainty-pearl-bracelet-bridal': ['Bridal Party Gifts', 'Jewelry & Accessories'],
    'luxe-satin-sleep-mask': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'luxury-botanical-lip-balm-trio': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'crystal-glass-nail-file-set': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'calm-collect-essential-oil-roller': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'champagne-gummy-bears-bridal': ['Bridal Party Gifts', 'Favors & Party Extras'],
    'botanical-body-lotion-bridal': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'rosewater-face-mist-bridal': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'floral-tea-sampler-bridal': ['Bridal Party Gifts', 'Beauty & Self-Care'],
    'rose-petal-hand-cream-bridal': ['Bridal Party Gifts', 'Beauty & Self-Care'],

    // ═══════════════════════════════════════════════════════════════
    // GROOMSMEN GIFTS
    // ═══════════════════════════════════════════════════════════════
    'bespoke-leather-golf-pouch': ['Groomsmen Gifts', 'Favors & Party Extras'],
    'bespoke-engraved-guitar-capo': ['Groomsmen Gifts', 'Wedding Keepsakes'],
    'single-cigar-travel-tube-black': ['Groomsmen Gifts'],
    'zip-recovery-pouch-black': ['Groomsmen Gifts', 'Favors & Party Extras'],
    'leather-cord-organizer-espresso': ['Groomsmen Gifts'],
    'minimalist-magnetic-money-clip': ['Groomsmen Gifts'],
    'premium-sandalwood-pocket-comb': ['Groomsmen Gifts', 'Beauty & Self-Care'],
    'silk-pocket-square-espresso': ['Groomsmen Gifts', 'Apparel & Loungewear'],
    'heavyweight-cigar-cutter-black': ['Groomsmen Gifts'],
    'classic-tie-clip-antique-gold': ['Groomsmen Gifts', 'Jewelry & Accessories'],
    'premium-foil-stamped-playing-cards': ['Groomsmen Gifts', 'Favors & Party Extras'],
    'solid-brass-collar-stays-tin': ['Groomsmen Gifts'],
    'artisan-solid-cologne-tobacco': ['Groomsmen Gifts', 'Beauty & Self-Care'],
    'morning-after-craft-coffee-beans': ['Groomsmen Gifts', 'Favors & Party Extras'],
    'woven-shoe-shine-cloth': ['Groomsmen Gifts'],
    'cedar-wood-shoe-deodorizer-balls': ['Groomsmen Gifts'],
    'premium-oversized-matchbox-black-gold': ['Groomsmen Gifts', 'Favors & Party Extras'],
    'travel-size-sleek-lint-roller': ['Groomsmen Gifts'],

    // ═══════════════════════════════════════════════════════════════
    // WEDDING KEEPSAKES
    // ═══════════════════════════════════════════════════════════════
    'bespoke-interlocking-photo-keepsake': ['Wedding Keepsakes', 'Favors & Party Extras'],
    'bespoke-heirloom-photo-block-puzzle': ['Wedding Keepsakes', 'Favors & Party Extras'],
    'bespoke-photo-magnet-favours': ['Wedding Keepsakes', 'Favors & Party Extras'],
    'everlasting-heirloom-rose-set': ['Wedding Keepsakes', 'Ceremony & Reception'],
    'heirloom-walnut-ring-dish': ['Wedding Keepsakes', 'Jewelry & Accessories', 'Ceremony & Reception'],
    'linen-wedding-vow-booklet': ['Wedding Keepsakes', 'Ceremony & Reception'],
    'gold-rimmed-ceramic-jewelry-dish': ['Wedding Keepsakes', 'Jewelry & Accessories'],
    'custom-ceramic-ring-dish-personalized-heirloom-trinket-tray': ['Wedding Keepsakes', 'Jewelry & Accessories'],

    // ═══════════════════════════════════════════════════════════════
    // CEREMONY & RECEPTION
    // ═══════════════════════════════════════════════════════════════
    'bespoke-satin-place-setting-ribbons': ['Ceremony & Reception', 'Favors & Party Extras'],
    'bespoke-engraved-wedding-cake-serving-set': ['Ceremony & Reception', 'Wedding Keepsakes'],
    'bespoke-keepsake-handheld-fan': ['Ceremony & Reception', 'Favors & Party Extras'],
    'welcome-wedding-box': ['Ceremony & Reception', 'Build Your Box'],
    'bespoke-gold-gilded-agate-coaster': ['Ceremony & Reception', 'Favors & Party Extras', 'Wedding Keepsakes'],

    // ═══════════════════════════════════════════════════════════════
    // BAGS & TOTES
    // ═══════════════════════════════════════════════════════════════
    'bespoke-canvas-and-burlap-tote': ['Bags & Totes', 'Bridal Party Gifts'],
    'personalized-hand-crocheted-bridal-tote-beach-bag': ['Bags & Totes', 'Bridal Party Gifts'],
    'personalized-embroidered-canvas-tote-custom-bridal-party-gift': ['Bags & Totes', 'Bridal Party Gifts'],

    // ═══════════════════════════════════════════════════════════════
    // JEWELRY & ACCESSORIES
    // ═══════════════════════════════════════════════════════════════
    'the-heirloom-botanical-hairbrush': ['Jewelry & Accessories', 'Bridal Party Gifts', 'Beauty & Self-Care'],
    'luxe-just-married-honeymoon-sunglasses': ['Jewelry & Accessories', 'Favors & Party Extras'],

    // ═══════════════════════════════════════════════════════════════
    // APPAREL & LOUNGEWEAR
    // ═══════════════════════════════════════════════════════════════
    'bespoke-bridal-slipper': ['Apparel & Loungewear', 'Bridal Party Gifts'],
    'personalized-white-cotton-towel-bespoke-bridal-party-gift-wedding-favor': ['Apparel & Loungewear', 'Bridal Party Gifts', 'Favors & Party Extras'],

    // ═══════════════════════════════════════════════════════════════
    // BEAUTY & SELF-CARE
    // ═══════════════════════════════════════════════════════════════
    'artisan-soy-candle-bridal': ['Beauty & Self-Care', 'Bridal Party Gifts'],

    // ═══════════════════════════════════════════════════════════════
    // BUILD YOUR BOX (Configurators)
    // ═══════════════════════════════════════════════════════════════
    'bridesmaid-box': ['Build Your Box'],
    'groom-box': ['Build Your Box'],

    // ═══════════════════════════════════════════════════════════════
    // CONCIERGE (shows in All Products only)
    // ═══════════════════════════════════════════════════════════════
    'personal-product-specialist': [],
};

export function getProductCategories(slug: string): string[] {
    const cats = PRODUCT_TO_CATEGORIES_MAP[slug];
    if (cats && cats.length > 0) return cats;
    return ['Personalized Details'];
}

export function getProductCategory(slug: string): string {
    const cats = getProductCategories(slug);
    return cats[0];
}

export const PRODUCT_TO_RELATED_MAP: Record<string, string[]> = {
    'custom-minimalist-wedding-welcome-sign': ['bespoke-mirrored-acrylic-wedding-welcome-sign', 'bespoke-illuminated-script-sign', 'bespoke-folded-wedding-place-cards', 'bespoke-heirloom-guest-book'],
    'bespoke-mirrored-acrylic-wedding-welcome-sign': ['custom-minimalist-wedding-welcome-sign', 'bespoke-illuminated-script-sign', 'bespoke-folded-wedding-place-cards', 'bespoke-heirloom-guest-book'],
    'bespoke-illuminated-script-sign': ['custom-minimalist-wedding-welcome-sign', 'bespoke-mirrored-acrylic-wedding-welcome-sign', 'bespoke-folded-wedding-place-cards', 'bespoke-heirloom-guest-book'],
    'the-heirloom-acrylic-wedding-invitation-suite': ['bespoke-handmade-wax-seal-stickers', 'bespoke-folded-wedding-place-cards', 'bespoke-monogram-cocktail-napkins', 'custom-minimalist-wedding-welcome-sign'],
    'bespoke-handmade-wax-seal-stickers': ['the-heirloom-acrylic-wedding-invitation-suite', 'bespoke-folded-wedding-place-cards', 'bespoke-interlocking-photo-keepsake', 'bespoke-botanical-ceramic-ring-dish'],
    'bespoke-folded-wedding-place-cards': ['the-heirloom-acrylic-wedding-invitation-suite', 'custom-minimalist-wedding-welcome-sign', 'bespoke-monogram-cocktail-napkins', 'bespoke-engraved-stemless-wine-glass-set'],
    'bespoke-engraved-stemless-wine-glass-set': ['bespoke-engraved-champagne-flute', 'bespoke-monogram-cocktail-napkins', 'bespoke-heirloom-whiskey-glass-decanter-collection', 'bespoke-laser-engraved-wedding-shot-glasses'],
    'bespoke-engraved-champagne-flute': ['bespoke-engraved-stemless-wine-glass-set', 'bespoke-monogram-cocktail-napkins', 'bespoke-laser-engraved-wedding-shot-glasses', 'personalized-heirloom-wedding-cake-topper'],
    'bespoke-laser-engraved-wedding-shot-glasses': ['bespoke-engraved-champagne-flute', 'bespoke-beers-birdies-neoprene-can-cooler', 'bespoke-leather-wrapped-hip-flask', 'bespoke-engraved-stemless-wine-glass-set'],
    'bespoke-heirloom-whiskey-glass-decanter-collection': ['bespoke-leather-wrapped-hip-flask', 'bespoke-personalized-golf-balls', 'bespoke-engraved-stemless-wine-glass-set', 'bespoke-laser-engraved-wedding-shot-glasses'],
    'bespoke-monogram-cocktail-napkins': ['bespoke-engraved-champagne-flute', 'bespoke-engraved-stemless-wine-glass-set', 'bespoke-folded-wedding-place-cards', 'personalized-heirloom-wedding-cake-topper'],
    'bespoke-beers-birdies-neoprene-can-cooler': ['bespoke-personalized-golf-balls', 'bespoke-leather-wrapped-hip-flask', 'bespoke-heirloom-whiskey-glass-decanter-collection', 'bespoke-laser-engraved-wedding-shot-glasses'],
    'personalized-organic-turkish-cotton-towel': ['bespoke-embroidered-heirloom-canvas-tote', 'heirloom-corduroy-cosmetic-pouch', 'bespoke-satin-bridesmaid-pajama-set', 'bespoke-16oz-acrylic-tumbler'],
    'bespoke-engraved-compact-mirror': ['heirloom-corduroy-cosmetic-pouch', 'bespoke-16oz-acrylic-tumbler', 'bespoke-pav-name-necklace', 'bespoke-wire-script-bridal-hanger'],
    'bespoke-16oz-acrylic-tumbler': ['bespoke-matte-acrylic-tumbler', 'bespoke-satin-bridesmaid-pajama-set', 'heirloom-corduroy-cosmetic-pouch', 'bespoke-engraved-compact-mirror'],
    'bespoke-matte-acrylic-tumbler': ['bespoke-16oz-acrylic-tumbler', 'bespoke-satin-bridesmaid-pajama-set', 'heirloom-corduroy-cosmetic-pouch', 'bespoke-engraved-compact-mirror'],
    'heirloom-corduroy-cosmetic-pouch': ['bespoke-engraved-compact-mirror', 'bespoke-16oz-acrylic-tumbler', 'bespoke-satin-bridesmaid-pajama-set', 'bespoke-embroidered-heirloom-canvas-tote'],
    'bespoke-personalized-golf-balls': ['bespoke-leather-wrapped-hip-flask', 'bespoke-beers-birdies-neoprene-can-cooler', 'bespoke-heirloom-whiskey-glass-decanter-collection', 'bespoke-laser-engraved-wedding-shot-glasses'],
    'bespoke-leather-wrapped-hip-flask': ['bespoke-personalized-golf-balls', 'bespoke-heirloom-whiskey-glass-decanter-collection', 'bespoke-laser-engraved-wedding-shot-glasses', 'bespoke-beers-birdies-neoprene-can-cooler'],
    'bespoke-interlocking-photo-keepsake': ['bespoke-heirloom-guest-book', 'bespoke-botanical-ceramic-ring-dish', 'bespoke-handmade-wax-seal-stickers', 'bespoke-pav-name-necklace'],
    'bespoke-heirloom-guest-book': ['bespoke-interlocking-photo-keepsake', 'personalized-heirloom-wedding-cake-topper', 'bespoke-botanical-ceramic-ring-dish', 'custom-minimalist-wedding-welcome-sign'],
    'bespoke-satin-bridesmaid-pajama-set': ['bespoke-wire-script-bridal-hanger', 'heirloom-corduroy-cosmetic-pouch', 'bespoke-16oz-acrylic-tumbler', 'bespoke-embroidered-heirloom-canvas-tote'],
    'bespoke-hand-crocheted-bridal-tote': ['bespoke-embroidered-heirloom-canvas-tote', 'personalized-organic-turkish-cotton-towel', 'bespoke-satin-bridesmaid-pajama-set', 'heirloom-corduroy-cosmetic-pouch'],
    'bespoke-embroidered-heirloom-canvas-tote': ['bespoke-hand-crocheted-bridal-tote', 'personalized-organic-turkish-cotton-towel', 'bespoke-satin-bridesmaid-pajama-set', 'heirloom-corduroy-cosmetic-pouch'],
    'bespoke-wire-script-bridal-hanger': ['bespoke-satin-bridesmaid-pajama-set', 'bespoke-pav-name-necklace', 'bespoke-engraved-compact-mirror', 'bespoke-botanical-ceramic-ring-dish'],
    'bespoke-pav-name-necklace': ['bespoke-wire-script-bridal-hanger', 'bespoke-engraved-compact-mirror', 'bespoke-botanical-ceramic-ring-dish', 'bespoke-interlocking-photo-keepsake'],
    'bespoke-botanical-ceramic-ring-dish': ['bespoke-pav-name-necklace', 'bespoke-heirloom-guest-book', 'bespoke-interlocking-photo-keepsake', 'bespoke-wire-script-bridal-hanger'],
    'personalized-heirloom-wedding-cake-topper': ['custom-minimalist-wedding-welcome-sign', 'bespoke-engraved-champagne-flute', 'bespoke-monogram-cocktail-napkins', 'bespoke-heirloom-guest-book']
};

export function getRelatedProductSlugs(slug: string): string[] {
    return PRODUCT_TO_RELATED_MAP[slug] || [];
}
