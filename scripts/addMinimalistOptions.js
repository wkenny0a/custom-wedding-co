require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
    try {
        const existing = await swell.get('/products', { where: { slug: 'custom-minimalist-wedding-welcome-sign' } });

        if (!existing.results || existing.results.length === 0) {
            console.log('Product custom-minimalist-wedding-welcome-sign not found in Swell');
            return;
        }

        const product = existing.results[0];
        // Swell will completely overwrite options array if we PUT, so let's preserve existing (like Material)
        const options = product.options || [];

        // Check and inject "Custom Couple Names"
        if (!options.some(o => o.name === 'Custom Couple Names')) {
            options.push({ name: 'Custom Couple Names', input_type: 'short_text', required: true });
        }

        // Check and inject "Date"
        if (!options.some(o => o.name === 'Date')) {
            options.push({ name: 'Date', input_type: 'short_text', required: true });
        }

        // Check and inject "Extra Requests"
        if (!options.some(o => o.name === 'Extra Requests')) {
            options.push({ name: 'Extra Requests', input_type: 'long_text', required: false });
        }

        await swell.put(`/products/${product.id}`, { options });
        console.log('✅ Successfully added Custom Couple Names, Date, and Extra Requests to Minimalist Sign');

    } catch (error) {
        console.error('Error updating product:', error);
    }
})();
