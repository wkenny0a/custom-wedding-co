require('dotenv').config({ path: '.env.local' });
var swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

var SLUG = 'bespoke-heirloom-whiskey-glass-decanter-collection';

async function run() {
    var existing = await swell.get('/products', { where: { slug: SLUG }, expand: ['options'] });
    console.log(JSON.stringify(existing.results[0].options, null, 2));
}

run().catch(console.error);
