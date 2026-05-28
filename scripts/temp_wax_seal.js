require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);
swell.get('/products', { where: { slug: 'bespoke-handmade-wax-seal-stickers' } }).then(res => {
    console.log(JSON.stringify(res.results[0].options, null, 2));
});
