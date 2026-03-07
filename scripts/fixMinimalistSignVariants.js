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

        const currentOptions = product.options || [];

        // Restore the original variant options
        const updatedOptions = currentOptions.map(opt => {
            if (opt.id === '69ab1afe06508a001279bd38') {
                return {
                    id: opt.id,
                    name: 'Material & Size',
                    type: 'select',
                    input_type: 'select',
                    variant: true,
                    active: true,
                    required: true,
                };
            }
            if (opt.id === '69ab1afe06508a001279bd3f') {
                return {
                    id: opt.id,
                    name: 'Style',
                    type: 'select',
                    input_type: 'select',
                    variant: true,
                    active: true,
                    required: true,
                };
            }
            // If it's the extra info we added, keep it or remove it
            if (opt.id === '69ac6762a8660169df235adf') {
                return {
                    id: opt.id,
                    name: 'Extra Information',
                    type: 'long_text',
                    active: true,
                    required: false,
                };
            }
            return opt;
        });

        // Ensure we have the new text options properly added without overwriting
        const customNamesOption = updatedOptions.find(o => o.name === 'Custom Couple Names');
        if (!customNamesOption) {
            updatedOptions.push({
                name: 'Custom Couple Names',
                type: 'short_text',
                required: true,
                description: 'Enter the names exactly as you want them to appear (e.g. Sarah & Michael)',
            });
        }

        const dateOption = updatedOptions.find(o => o.name === 'Date');
        if (!dateOption) {
            updatedOptions.push({
                name: 'Date',
                type: 'short_text',
                required: true,
                description: 'Enter your wedding date (e.g. October 12, 2025)',
            });
        }

        console.log("Updating options with:", JSON.stringify(updatedOptions, null, 2));

        const updatedProduct = await swell.put(`/products/${product.id}`, {
            options: updatedOptions
        });

        console.log("Successfully restored variants! New options length:", updatedProduct.options?.length);
        console.log("Updated options:", JSON.stringify(updatedProduct.options, null, 2));

    } catch (error) {
        console.error("Error connecting to Swell:", error);
    }
}

run();
