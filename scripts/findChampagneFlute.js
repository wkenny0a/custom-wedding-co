require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function run() {
    try {
        const products = await swell.get('/products', {
            search: 'Champagne Flute',
            expand: 'options'
        });

        console.log(`Found ${products.results.length} products`);
        for (const p of products.results) {
            console.log(`Name: ${p.name}, Slug: ${p.slug}`);
            console.log("Current options:", JSON.stringify(p.options, null, 2));
        }

    } catch (err) {
        console.error(err);
    }
}
run();
