require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function run() {
    console.log('Fetching Swell categories to get their IDs...');
    const existingCatsResponse = await swell.get('/categories', { limit: 1000 });
    const existingCats = existingCatsResponse.results || [];

    const coreCatSlugs = [
        'signage-displays', 'barware-drinkware', 'bridal-party-gifts', 
        'groomsmen-gifts', 'wedding-keepsakes', 'ceremony-reception', 
        'bags-totes', 'jewelry-accessories', 'apparel-loungewear', 
        'favors-party-extras', 'beauty-self-care'
    ];

    const coreCatIds = existingCats
        .filter(c => coreCatSlugs.includes(c.slug))
        .map(c => c.id);

    console.log(`Found ${coreCatIds.length} core category IDs.`);

    let allProducts = [];
    let page = 1;
    let hasMore = true;
    while(hasMore) {
        const res = await swell.get('/products', { limit: 100, page });
        allProducts = allProducts.concat(res.results);
        if (res.results.length < 100) hasMore = false;
        else page++;
    }
    
    const unmappedProducts = allProducts.filter(p => {
        const catIds = p.category_index?.id || [];
        return !catIds.some(id => coreCatIds.includes(id));
    });

    const mappedProducts = allProducts.filter(p => {
        const catIds = p.category_index?.id || [];
        return catIds.some(id => coreCatIds.includes(id));
    });

    console.log(`Total products: ${allProducts.length}`);
    console.log(`Mapped products: ${mappedProducts.length}`);
    console.log(`Unmapped products: ${unmappedProducts.length}`);

    fs.writeFileSync('unmapped_products.json', JSON.stringify(unmappedProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug
    })), null, 2));
}

run().catch(console.error);
