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

export const PRODUCT_TO_CATEGORY_MAP: Record<string, string> = {
    'custom-minimalist-wedding-welcome-sign': 'Welcome Signs & Signage',
    'bespoke-mirrored-acrylic-wedding-welcome-sign': 'Welcome Signs & Signage',
    
    'bespoke-illuminated-script-sign': 'Wedding Decor & Displays',
    
    'the-heirloom-acrylic-wedding-invitation-suite': 'Stationery & Paper Goods',
    'bespoke-handmade-wax-seal-stickers': 'Stationery & Paper Goods',
    'bespoke-folded-wedding-place-cards': 'Stationery & Paper Goods',
    
    'bespoke-engraved-stemless-wine-glass-set': 'Tabletop & Barware',
    'bespoke-engraved-champagne-flute': 'Tabletop & Barware',
    'bespoke-laser-engraved-wedding-shot-glasses': 'Tabletop & Barware',
    'bespoke-heirloom-whiskey-glass-decanter-collection': 'Tabletop & Barware',
    'bespoke-monogram-cocktail-napkins': 'Tabletop & Barware',
    
    'bespoke-beers-birdies-neoprene-can-cooler': 'Favors & Gifts',
    'personalized-organic-turkish-cotton-towel': 'Favors & Gifts',
    
    'bespoke-engraved-compact-mirror': 'Bridal Party Gifts',
    'bespoke-16oz-acrylic-tumbler': 'Bridal Party Gifts',
    'bespoke-matte-acrylic-tumbler': 'Bridal Party Gifts',
    'heirloom-corduroy-cosmetic-pouch': 'Bridal Party Gifts',
    
    'bespoke-personalized-golf-balls': 'Groomsmen Gifts',
    'bespoke-leather-wrapped-hip-flask': 'Groomsmen Gifts',
    
    'bespoke-interlocking-photo-keepsake': 'Wedding Keepsakes',
    'bespoke-heirloom-guest-book': 'Wedding Keepsakes',
    
    'bespoke-satin-bridesmaid-pajama-set': 'Apparel & Sleepwear',
    
    'bespoke-hand-crocheted-bridal-tote': 'Bags & Totes',
    'bespoke-embroidered-heirloom-canvas-tote': 'Bags & Totes',
    
    'bespoke-wire-script-bridal-hanger': 'Bridal Accessories',
    'bespoke-pav-name-necklace': 'Bridal Accessories',
    
    'bespoke-botanical-ceramic-ring-dish': 'Ceremony Details',
    'personalized-heirloom-wedding-cake-topper': 'Ceremony Details'
};

export function getProductCategory(slug: string): string {
    return PRODUCT_TO_CATEGORY_MAP[slug] || 'Personalized Details';
}
