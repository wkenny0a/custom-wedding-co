require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);

async function run() {
    const pSlug = 'bespoke-engraved-groomsmen-pint-glass';
    const cSlug = 'barware-drinkware';
    
    const catRes = await swell.get('/categories', { slug: cSlug });
    const catId = catRes.results[0].id;
    console.log(`Category ID for ${cSlug}: ${catId}`);

    const pRes = await swell.get('/products', { slug: pSlug });
    const pId = pRes.results[0].id;
    console.log(`Product ID for ${pSlug}: ${pId}`);

    console.log('Attempting to update category_index...');
    await swell.put(`/products/${pId}`, {
        category_index: { id: [catId] }
    });

    console.log('Fetching back...');
    const verify = await swell.get(`/products/${pId}`);
    console.log(verify.category_index.id);
}

run().catch(console.error);
