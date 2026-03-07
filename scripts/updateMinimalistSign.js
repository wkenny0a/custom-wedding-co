require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function run() {
    try {
        console.log("Fetching Minimalist Sign...");
        const products = await swell.get('/products', {
            where: { slug: 'custom-minimalist-wedding-welcome-sign' },
            expand: 'options'
        });
        
        if (!products || !products.results || products.results.length === 0) {
            console.error("Product not found");
            return;
        }

        const product = products.results[0];
        console.log("Found product:", product.name);

        const newOptions = [
            {
                name: 'Custom Couple Names',
                type: 'short_text',
                required: true,
                description: 'Enter the names exactly as you want them to appear (e.g. Sarah & Michael)',
            },
            {
                name: 'Date',
                type: 'short_text',
                required: true,
                description: 'Enter your wedding date (e.g. October 12, 2025)',
            },
            {
                name: 'Extra Information',
                type: 'long_text',
                required: false,
                description: 'Any extra details or customization requests?',
            }
        ];

        console.log("Current options:", JSON.stringify(product.options || [], null, 2));

        const updatedProduct = await swell.put(`/products/${product.id}`, {
            options: newOptions
        });

        console.log("Successfully updated product options! New options length:", updatedProduct.options?.length);

    } catch (error) {
        console.error("Error connecting to Swell:", error);
    }
}

run();
