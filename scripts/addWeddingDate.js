require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
    try {
        const existing = await swell.get('/products', { where: { slug: 'custom-classic-wedding-welcome-sign' } });
        const product = existing.results[0];
        const options = product.options || [];

        const hasWeddingDate = options.some(o => o.name === 'Wedding Date');

        if (!hasWeddingDate) {
            options.push({
                name: 'Wedding Date',
                input_type: 'short_text',
                required: false
            });
            await swell.put(`/products/${product.id}`, { options });
            console.log('✅ Successfully added Wedding Date option to product');
        } else {
            console.log('Wedding Date option already exists');
        }
    } catch (error) { console.error('Error updating product:', error) }
})();
