require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
    try {
        const carts = await swell.get('/carts');
        if (carts && carts.results && carts.results.length > 0) {
            console.log(JSON.stringify(carts.results[0].items, null, 2));
        } else {
            console.log('No carts found');
        }
    } catch (e) { console.error('Error:', e) }
})();
