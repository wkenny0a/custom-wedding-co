require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function fetchAllProducts() {
    let allProducts = [];
    let page = 1;
    const limit = 100;
    
    while (true) {
        const result = await swell.get('/products', {
            limit: limit,
            page: page,
            expand: ['variants', 'categories', 'options']
        });
        
        if (result && result.results && result.results.length > 0) {
            allProducts = allProducts.concat(result.results);
            console.error(`Fetched page ${page}: ${result.results.length} products (total so far: ${allProducts.length}/${result.count})`);
            
            if (result.results.length < limit || allProducts.length >= (result.count || Infinity)) {
                break;
            }
            page++;
        } else {
            break;
        }
    }
    
    // Output as JSON to stdout
    console.log(JSON.stringify(allProducts, null, 2));
}

fetchAllProducts().catch(err => {
    console.error('Error fetching products:', err);
    process.exit(1);
});
