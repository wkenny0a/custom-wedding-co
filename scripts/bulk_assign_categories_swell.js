require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function run() {
    console.log('Fetching Swell categories to map slugs to IDs...');
    const catRes = await swell.get('/categories', { limit: 1000 });
    const catNameToIdMap = {};
    for (const cat of (catRes.results || [])) {
        catNameToIdMap[cat.slug] = cat.id;
    }

    const allProducts = JSON.parse(fs.readFileSync('all_products.json', 'utf8'));
    const mapping = JSON.parse(fs.readFileSync('generated_mapping.json', 'utf8'));

    let updatedCount = 0;
    let failedCount = 0;

    for (const product of allProducts) {
        const assignedSlugs = mapping[product.slug] || [];
        
        if (assignedSlugs.length === 0) {
            console.log(`Skipping ${product.slug} (no categories mapped)`);
            continue;
        }

        const categoryIdsToAssign = assignedSlugs.map(slug => catNameToIdMap[slug]).filter(Boolean);

        if (categoryIdsToAssign.length === 0) {
            console.log(`Skipping ${product.slug} (could not resolve category IDs)`);
            continue;
        }

        try {
            // As tested, we must send an array of IDs under category_index.id
            await swell.put(`/products/${product.id}`, {
                category_index: { id: categoryIdsToAssign }
            });
            console.log(`✓ Updated [${product.slug}] with ${assignedSlugs.length} categories.`);
            updatedCount++;
        } catch (err) {
            console.error(`✗ Failed to update [${product.slug}]:`, err.message);
            failedCount++;
        }
    }

    console.log(`\nMigration complete! Updated: ${updatedCount}, Failed: ${failedCount}`);
}

run().catch(console.error);
