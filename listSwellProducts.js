require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function listProducts() {
    try {
        const response = await swell.get('/products', {
            limit: 10,
            expand: ['options']
        });
        console.log(`Found ${response.results.length} products`);
        response.results.forEach(p => {
            console.log(`- ${p.name} (ID: ${p.id}, Active: ${p.active})`);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
listProducts();
