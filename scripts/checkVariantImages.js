require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function run() {
    try {
        const products = await swell.get('/products', {
            where: { slug: 'custom-minimalist-wedding-welcome-sign' },
            expand: 'options'
        });
        
        const options = products.results[0].options;
        const styleOption = options.find(o => o.name === 'Style');
        
        console.log("Style Option Example Value:");
        console.log(JSON.stringify(styleOption.values[0], null, 2));
    } catch (e) { console.error(e) }
}
run();
