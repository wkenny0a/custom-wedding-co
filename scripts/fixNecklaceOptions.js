/**
 * Adds a "Custom Name" text option to the Bespoke Pavé Name Necklace product in Swell.
 * The product was missing this option entirely — only had Color select.
 * 
 * Run: node scripts/fixNecklaceOptions.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const SLUG = 'bespoke-pav-name-necklace';

async function fixNecklace() {
    try {
        const existing = await swell.get('/products', {
            where: { slug: SLUG }
        });

        if (!existing || existing.results.length === 0) {
            console.error(`Product with slug "${SLUG}" not found`);
            return;
        }

        const product = existing.results[0];
        const options = product.options || [];

        // Check if Custom Name already exists
        const hasCustomName = options.some(o => o.name === 'Custom Name');

        if (!hasCustomName) {
            options.push({
                name: 'Custom Name',
                input_type: 'short_text',
                variant: false,
                active: true,
                required: true,
                description: 'Enter the name exactly as you would like it on the necklace.',
            });

            await swell.put(`/products/${product.id}`, { options });
            console.log('✅ Successfully added "Custom Name" text option to the necklace product');
        } else {
            console.log('"Custom Name" option already exists — no changes needed.');
        }

    } catch (error) {
        console.error('❌ Error:', error.message || error);
    }
}

fixNecklace();
