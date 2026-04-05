require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

function buildQuantityValues() {
    const values = [];
    for (let s = 1; s <= 100; s++) {
        const glasses = s * 2;
        const totalPrice = 29.99 + (s - 1) * 27.99;
        const roundedPrice = Math.round(totalPrice * 100) / 100;
        values.push({
            name: `${s} Set (${glasses} Glasses)`,
            price: roundedPrice,
        });
    }
    return values;
}

function buildDesignValues() {
    const values = [];
    for (let i = 1; i <= 11; i++) {
        values.push({ name: `Design #${i}` });
    }
    values.push({ name: 'Design #12 (Custom Design)' });
    return values;
}

async function run() {
    const PRODUCT_SLUG = 'bespoke-engraved-champagne-flute';
    
    console.log('Fetching product:', PRODUCT_SLUG);
    const products = await swell.get('/products', {
        where: { slug: PRODUCT_SLUG },
        expand: 'options'
    });

    if (!products || !products.results || products.results.length === 0) {
        console.error('Product not found!');
        process.exit(1);
    }
    
    const product = products.results[0];
    const productId = product.id;
    console.log('Found ID:', productId);

    const newOptions = [
        {
            name: 'Design Style',
            type: 'select',
            input_type: 'select',
            variant: true,
            active: true,
            required: true,
            values: buildDesignValues(),
        },
        {
            name: 'Quantity Tiers',
            type: 'select',
            input_type: 'select',
            variant: true,
            active: true,
            required: true,
            values: buildQuantityValues(),
        },
        {
            name: 'Names or Initials',
            type: 'short_text',
            input_type: 'short_text',
            variant: false,
            active: true,
            required: true,
            description: 'Enter the names or initials exactly as you would like them engraved.'
        },
        {
            name: 'Event Date',
            type: 'short_text',
            input_type: 'short_text',
            variant: false,
            active: true,
            required: true,
            description: 'e.g. October 12, 2026'
        }
    ];

    console.log('Updating options for product...');
    const updated = await swell.put(`/products/${productId}`, {
        options: newOptions
    });

    console.log('✅ Product updated successfully!');
    console.log(`Updated options count: ${(updated.options || []).length}`);
}

run().catch(err => {
    console.error('❌ Error:', err.message || err);
});
