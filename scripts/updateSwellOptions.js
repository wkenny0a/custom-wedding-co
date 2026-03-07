require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const updateProductOption = async () => {
    try {
        const existing = await swell.get('/products', {
            where: { slug: 'custom-classic-wedding-welcome-sign' }
        });

        if (!existing || existing.results.length === 0) {
            console.error("Product not found");
            return;
        }

        const product = existing.results[0];
        const options = product.options || [];

        // Check if Custom Names already exists
        const hasCustomNames = options.some(o => o.name === 'Custom Names');

        if (!hasCustomNames) {
            options.push({
                name: 'Custom Names',
                input_type: 'short_text',
                required: false
            });

            await swell.put(`/products/${product.id}`, { options });
            console.log('✅ Successfully added Custom Names option to product');
        } else {
            console.log('Custom Names option already exists');
        }

    } catch (error) {
        console.error("❌ Error updating product:", error);
    }
};

updateProductOption();
