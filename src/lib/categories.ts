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
