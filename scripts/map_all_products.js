const fs = require('fs');

const coreCats = [
    { name: 'Signage & Displays', slug: 'signage-displays', keywords: ['sign', 'seating', 'chart', 'display', 'banner'] },
    { name: 'Barware & Drinkware', slug: 'barware-drinkware', keywords: ['glass', 'tumbler', 'cup', 'stirrer', 'opener', 'flask', 'stones', 'cocktail', 'wine', 'pint', 'mug', 'flute', 'bottle', 'coaster', 'drink'] },
    { name: 'Bridal Party Gifts', slug: 'bridal-party-gifts', keywords: ['bridesmaid', 'bridal', 'maid of honor', 'proposal', 'bachelorette'] },
    { name: 'Groomsmen Gifts', slug: 'groomsmen-gifts', keywords: ['groomsman', 'groomsmen', 'best man', 'groom', 'bachelor'] },
    { name: 'Wedding Keepsakes', slug: 'wedding-keepsakes', keywords: ['keepsake', 'heirloom', 'dish', 'vow', 'photo', 'puzzle', 'rose', 'magnet', 'album'] },
    { name: 'Ceremony & Reception', slug: 'ceremony-reception', keywords: ['ceremony', 'reception', 'cake', 'fan', 'ribbon', 'petal', 'guest book', 'place card'] },
    { name: 'Bags & Totes', slug: 'bags-totes', keywords: ['tote', 'bag', 'pouch', 'luggage', 'cosmetic', 'duffel', 'purse'] },
    { name: 'Jewelry & Accessories', slug: 'jewelry-accessories', keywords: ['necklace', 'bracelet', 'ring', 'earring', 'sunglasses', 'clip', 'hair', 'pin', 'claw', 'jewelry case', 'jewelry box', 'trinket'] },
    { name: 'Apparel & Loungewear', slug: 'apparel-loungewear', keywords: ['robe', 'slipper', 'sleep', 'mask', 'apparel', 'shirt', 'pajama', 'towel', 'pocket square'] },
    { name: 'Favors & Party Extras', slug: 'favors-party-extras', keywords: ['favor', 'party', 'game', 'matchbox', 'mint', 'gummy', 'coffee', 'tea', 'card', 'playing card', 'cigar'] },
    { name: 'Beauty & Self-Care', slug: 'beauty-self-care', keywords: ['lotion', 'spray', 'mist', 'oil', 'bomb', 'comb', 'lip', 'file', 'self-care', 'soap', 'spa', 'candle', 'scrunchie', 'brush'] }
];

const allProducts = JSON.parse(fs.readFileSync('all_products.json', 'utf8'));

let mappedCount = 0;
let mappingSummary = {};

allProducts.forEach(p => {
    let assigned = new Set();
    const searchableText = `${p.name} ${p.slug} ${(p.tags || []).join(' ')}`.toLowerCase();

    coreCats.forEach(cat => {
        cat.keywords.forEach(kw => {
            if (searchableText.includes(kw.toLowerCase())) {
                assigned.add(cat.slug);
            }
        });
    });

    // Fallbacks if nothing matched
    if (assigned.size === 0) {
        if (searchableText.includes('box')) assigned.add('wedding-keepsakes');
        else assigned.add('favors-party-extras'); // ultimate fallback
    }

    const assignedArr = Array.from(assigned);
    if (assignedArr.length > 0) mappedCount++;
    
    mappingSummary[p.slug] = assignedArr;
});

fs.writeFileSync('generated_mapping.json', JSON.stringify(mappingSummary, null, 2));
console.log(`Successfully mapped ${mappedCount} out of ${allProducts.length} products.`);
