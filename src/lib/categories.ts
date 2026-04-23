export const WEDDING_CATEGORIES = [
    'Welcome Signs & Signage',
    'Wedding Decor & Displays',
    'Stationery & Paper Goods',
    'Tabletop & Barware',
    'Favors & Gifts',
    'Bridal Party Gifts',
    'Groomsmen Gifts',
    'Wedding Keepsakes',
    'Apparel & Sleepwear',
    'Bags & Totes',
    'Bridal Accessories',
    'Ceremony Details'
];

export const PRODUCT_TO_CATEGORIES_MAP: Record<string, string[]> = {
    'custom-minimalist-wedding-welcome-sign': ['Welcome Signs & Signage', 'Wedding Decor & Displays', 'Ceremony Details'],
    'bespoke-mirrored-acrylic-wedding-welcome-sign': ['Welcome Signs & Signage', 'Wedding Decor & Displays', 'Ceremony Details'],
    
    'bespoke-illuminated-script-sign': ['Wedding Decor & Displays', 'Ceremony Details'],
    
    'the-heirloom-acrylic-wedding-invitation-suite': ['Stationery & Paper Goods'],
    'bespoke-handmade-wax-seal-stickers': ['Stationery & Paper Goods', 'Favors & Gifts'],
    'bespoke-folded-wedding-place-cards': ['Stationery & Paper Goods', 'Tabletop & Barware', 'Day-Of Details'],
    
    'bespoke-engraved-stemless-wine-glass-set': ['Tabletop & Barware', 'Bridal Party Gifts', 'Groomsmen Gifts'],
    'bespoke-engraved-champagne-flute': ['Tabletop & Barware', 'Bridal Party Gifts'],
    'bespoke-laser-engraved-wedding-shot-glasses': ['Tabletop & Barware', 'Favors & Gifts'],
    'bespoke-heirloom-whiskey-glass-decanter-collection': ['Tabletop & Barware', 'Groomsmen Gifts', 'Favors & Gifts'],
    'bespoke-monogram-cocktail-napkins': ['Tabletop & Barware', 'Wedding Decor & Displays'],
    
    'bespoke-beers-birdies-neoprene-can-cooler': ['Favors & Gifts', 'Groomsmen Gifts'],
    'personalized-organic-turkish-cotton-towel': ['Favors & Gifts', 'Bridal Party Gifts'],
    
    'bespoke-engraved-compact-mirror': ['Bridal Party Gifts', 'Favors & Gifts', 'Bridal Accessories'],
    'bespoke-16oz-acrylic-tumbler': ['Bridal Party Gifts', 'Favors & Gifts'],
    'bespoke-matte-acrylic-tumbler': ['Bridal Party Gifts', 'Favors & Gifts'],
    'heirloom-corduroy-cosmetic-pouch': ['Bridal Party Gifts', 'Bags & Totes'],
    
    'bespoke-personalized-golf-balls': ['Groomsmen Gifts', 'Favors & Gifts'],
    'bespoke-leather-wrapped-hip-flask': ['Groomsmen Gifts', 'Favors & Gifts'],
    
    'bespoke-interlocking-photo-keepsake': ['Wedding Keepsakes', 'Favors & Gifts'],
    'bespoke-heirloom-guest-book': ['Wedding Keepsakes', 'Wedding Decor & Displays'],
    
    'bespoke-satin-bridesmaid-pajama-set': ['Apparel & Sleepwear', 'Bridal Party Gifts'],
    
    'bespoke-hand-crocheted-bridal-tote': ['Bags & Totes', 'Bridal Party Gifts', 'Honeymoon'],
    'bespoke-embroidered-heirloom-canvas-tote': ['Bags & Totes', 'Bridal Party Gifts', 'Favors & Gifts'],
    
    'bespoke-wire-script-bridal-hanger': ['Bridal Accessories', 'Bridal Party Gifts', 'Apparel & Sleepwear'],
    'bespoke-pav-name-necklace': ['Bridal Accessories', 'Bridal Party Gifts', 'Favors & Gifts'],
    
    'bespoke-botanical-ceramic-ring-dish': ['Ceremony Details', 'Wedding Keepsakes', 'Bridal Party Gifts'],
    'personalized-heirloom-wedding-cake-topper': ['Ceremony Details', 'Wedding Decor & Displays', 'Tabletop & Barware']
};

export function getProductCategories(slug: string): string[] {
    return PRODUCT_TO_CATEGORIES_MAP[slug] || ['Personalized Details'];
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
