require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function listProducts() {
    try {
        const response = await swell.get('/products', {
            limit: 10
        });
        console.log("Full product object:");
        console.dir(response.results[0], { depth: null });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
listProducts();
