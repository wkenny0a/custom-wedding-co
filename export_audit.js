require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function exportProducts() {
    try {
        const response = await swell.get('/products', { limit: 100, active: true });
        const fs = require('fs');
        fs.writeFileSync('products_audit.json', JSON.stringify(response.results, null, 2));
        console.log('Successfully exported ' + response.results.length + ' products to products_audit.json');
    } catch (e) {
        console.error('Error fetching products:', e);
    }
}
exportProducts();
