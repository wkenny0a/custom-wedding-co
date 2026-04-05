require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const CATEGORIES = {
    'paper-goods':       '69ab198ed093400012ac8b85',
    'signs':             '69b39207800db00012401361',
    'guest-books':       '69b39207800db0001240136d',
    'wedding-favors':    '69b39207800db00012401376',
    'bridesmaids-gifts': '69b39207800db0001240137f',
    'cake-toppers':      '69b39207800db0001240139d',
    'table-decor':       '69b39207800db000124013b1',
    'keepsakes':         '69ab198fd093400012ac8b9a',
};

// Additional cross-category assignments (product already has its primary category)
const EXTRA_ASSIGNMENTS = [
    // Guest Books → also Keepsakes
    { id: '69b358dec2ec9b00129046c5', cat: 'keepsakes' },   // Heirloom Wedding Guest Book
    { id: '69afb1de1da973001228b89c', cat: 'keepsakes' },   // BESPOKE HEIRLOOM GUEST BOOK

    // Cake Topper → also Keepsakes, Table Décor
    { id: '69b3544261119d0012fe5f7f', cat: 'keepsakes' },   // Cake Topper
    { id: '69b3544261119d0012fe5f7f', cat: 'table-decor' }, // Cake Topper

    // Wax Seal Stickers → also Wedding Favors
    { id: '69b353e1b6db1c001278ce78', cat: 'wedding-favors' },

    // Ceramic Ring Dish → also Bridesmaids' Gifts
    { id: '69b3535d9ce3a50012bfcb96', cat: 'bridesmaids-gifts' },

    // Cocktail Napkins → also Paper Goods, Wedding Favors
    { id: '69b348cc05c0310012a2339b', cat: 'paper-goods' },
    { id: '69b348cc05c0310012a2339b', cat: 'wedding-favors' },

    // Cosmetic Pouch → also Wedding Favors
    { id: '69b3474cbcff08001287a6d9', cat: 'wedding-favors' },

    // Hip Flask → also Keepsakes
    { id: '69b3474530e56b001217a885', cat: 'keepsakes' },

    // Garment Bag → also Keepsakes
    { id: '69b34741d1520400120b5bf5', cat: 'keepsakes' },

    // Compact Mirror → also Keepsakes, Wedding Favors
    { id: '69b347282e22150012dd1069', cat: 'keepsakes' },
    { id: '69b347282e22150012dd1069', cat: 'wedding-favors' },

    // Tumblers → also Bridesmaids' Gifts
    { id: '69b3471b399c680012aaedd5', cat: 'bridesmaids-gifts' },  // 16oz Tumbler
    { id: '69b345f5f1376800121a3759', cat: 'bridesmaids-gifts' },  // Matte Tumbler

    // Crocheted Tote → also Keepsakes
    { id: '69b345e79455d1001216c6da', cat: 'keepsakes' },

    // Champagne Flute → also Bridesmaids' Gifts, Table Décor
    { id: '69b345a24acd240012d88a8f', cat: 'bridesmaids-gifts' },
    { id: '69b345a24acd240012d88a8f', cat: 'table-decor' },

    // Canvas Tote → also Wedding Favors
    { id: '69b2ea212138f80012800b37', cat: 'wedding-favors' },

    // Turkish Cotton Towel → also Bridesmaids' Gifts
    { id: '69b2e9832dac010012c679cb', cat: 'bridesmaids-gifts' },

    // Whiskey Glass & Decanter → also Keepsakes
    { id: '69b2dc1f5ff12600129a1fd7', cat: 'keepsakes' },

    // Wire Bridal Hanger → also Bridesmaids' Gifts
    { id: '69b2d6c8144dc300123c91e6', cat: 'bridesmaids-gifts' },

    // Folded Place Cards → also Paper Goods
    { id: '69b2d5d7cc01040012c982ce', cat: 'paper-goods' },

    // Shot Glasses → also Table Décor
    { id: '69b2d1fe9eb4fb00128a5e38', cat: 'table-decor' },

    // Wooden Bridal Hangers → also Bridesmaids' Gifts
    { id: '69b1b2379da5ba0012e75949', cat: 'bridesmaids-gifts' },

    // Pavé Name Necklace → also Bridesmaids' Gifts
    { id: '69b1697f34fa440012d11f77', cat: 'bridesmaids-gifts' },
];

async function addExtraCategories() {
    console.log('🚀 Adding additional cross-category assignments...\n');

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const { id: productId, cat: categorySlug } of EXTRA_ASSIGNMENTS) {
        const categoryId = CATEGORIES[categorySlug];

        try {
            const product = await swell.get('/products/{id}', { id: productId });
            const productName = product.name || productId;

            // Check if already linked
            const catIndex = product.category_index || {};
            if (catIndex.id && Array.isArray(catIndex.id) && catIndex.id.includes(categoryId)) {
                console.log(`⏩ "${productName}" already in "${categorySlug}". Skipping.`);
                skipCount++;
                continue;
            }

            await swell.put('/products/{id}', {
                id: productId,
                categories: [{ parent_id: categoryId }]
            });

            console.log(`✅ "${productName}" → +${categorySlug}`);
            successCount++;
        } catch (error) {
            console.error(`❌ Failed for ${productId} → ${categorySlug}: ${error.message || error}`);
            errorCount++;
        }
    }

    console.log(`\n🎉 Done! ${successCount} added, ${skipCount} skipped, ${errorCount} failed.`);
}

addExtraCategories().catch(console.error);
