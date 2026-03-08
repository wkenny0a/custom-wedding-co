require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function run() {
    try {
        const products = await swell.get('/products', {
            where: { slug: 'custom-minimalist-wedding-welcome-sign' }
        });
        
        const p = products.results[0];
        console.log("Product Images:", JSON.stringify(p.images, null, 2));
    } catch (e) { console.error(e) }
}
run();
