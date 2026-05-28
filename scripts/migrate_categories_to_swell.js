require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function run() {
    console.log('Loading local categories...');
    const content = fs.readFileSync('src/lib/categories.ts', 'utf8');
    
    // Extract categories
    const categoriesMatch = content.match(/export const WEDDING_CATEGORIES = \[([\s\S]*?)\];/);
    const categoryNames = categoriesMatch[1].split(',').map(s => s.trim().replace(/'/g, '')).filter(Boolean);
    console.log(`Found ${categoryNames.length} categories locally.`);

    // Extract mapping
    const mapMatch = content.match(/export const PRODUCT_TO_CATEGORIES_MAP: Record<string, string\[\]> = (\{[\s\S]*?\});/);
    const catMap = eval('(' + mapMatch[1] + ')');
    
    console.log('Fetching existing Swell categories...');
    const existingCatsResponse = await swell.get('/categories', { limit: 1000 });
    const existingCats = existingCatsResponse.results || [];
    
    const catNameToIdMap = {};

    console.log('Creating/Syncing 11 core categories to Swell...');
    for (const name of categoryNames) {
        const slug = name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        let existing = existingCats.find(c => c.slug === slug || c.name === name);
        
        if (!existing) {
            console.log(`  Creating category: ${name} (${slug})`);
            existing = await swell.post('/categories', { name, slug });
        } else {
            console.log(`  Category already exists: ${name} (${existing.id})`);
        }
        catNameToIdMap[name] = existing.id;
    }

    console.log('Fetching all products from Swell...');
    let allProducts = [];
    let page = 1;
    let hasMore = true;
    while(hasMore) {
        const res = await swell.get('/products', { limit: 100, page });
        allProducts = allProducts.concat(res.results);
        if (res.results.length < 100) hasMore = false;
        else page++;
    }
    console.log(`Found ${allProducts.length} products total.`);

    console.log('Updating products with new category mapping...');
    for (const product of allProducts) {
        const localCats = catMap[product.slug];
        if (!localCats || localCats.length === 0) continue;

        const categoryIndexIds = localCats.map(name => ({ id: catNameToIdMap[name] })).filter(c => c.id);
        
        console.log(`  Updating ${product.slug} -> [${localCats.join(', ')}]`);
        
        try {
            await swell.put(`/products/${product.id}`, {
                category_index: categoryIndexIds
            });
        } catch (err) {
            console.error(`  Error updating ${product.slug}:`, err.message);
        }
    }

    console.log('Migration complete!');
}

run().catch(console.error);
