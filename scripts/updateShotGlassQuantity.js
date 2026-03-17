require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2d1fe9eb4fb00128a5e38';

// Build 100 set-based quantity values with decreasing per-set price
// Linear interpolation: $29.99 (1 set) → $19.99 (100 sets)
function buildQuantityValues() {
    const values = [];
    for (let s = 1; s <= 100; s++) {
        const glasses = s * 6;
        const pricePerSet = 29.99 - (s - 1) * (10.00 / 99);
        const roundedPrice = Math.round(pricePerSet * 100) / 100;
        values.push({
            name: `${s} Set (${glasses} glasses)`,
            price: roundedPrice,
        });
    }
    return values;
}

async function run() {
    console.log('===================================================');
    console.log(' Shot Glass — Update Quantity Tier Variants');
    console.log('===================================================\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    // Fetch product
    console.log('Fetching product', PRODUCT_ID, '...');
    const product = await swell.get(`/products/${PRODUCT_ID}`, { expand: 'options' });

    if (!product || !product.id) {
        console.error('Product not found!');
        process.exit(1);
    }

    console.log('Found:', product.name);
    console.log('Current options:', (product.options || []).map(o => o.name).join(', '));

    // Find the existing Quantity Tier option
    const currentOptions = product.options || [];
    const qtyOption = currentOptions.find(o =>
        o.name.toLowerCase().includes('quantity')
    );

    if (!qtyOption) {
        console.error('No "Quantity Tier" option found on this product.');
        console.log('Available options:', currentOptions.map(o => `${o.name} (${o.id})`).join(', '));
        process.exit(1);
    }

    console.log(`\nFound option: "${qtyOption.name}" (ID: ${qtyOption.id})`);
    console.log(`Old values: ${(qtyOption.values || []).map(v => v.name).join(', ')}`);

    // Build new values
    const newValues = buildQuantityValues();

    // Update the option in place by ID
    const updatedOptions = currentOptions.map(opt => {
        if (opt.id === qtyOption.id) {
            return {
                id: opt.id,
                name: 'Quantity',
                input_type: 'select',
                variant: true,
                active: true,
                required: true,
                values: newValues,
            };
        }
        return opt;
    });

    console.log(`\nUpdating with ${newValues.length} set-based values...`);
    console.log(`  First: ${newValues[0].name} @ $${newValues[0].price}`);
    console.log(`  Last:  ${newValues[newValues.length - 1].name} @ $${newValues[newValues.length - 1].price}`);

    const updated = await swell.put(`/products/${PRODUCT_ID}`, {
        options: updatedOptions,
    });

    console.log('\n✅ Product updated successfully!');
    console.log(`Options count: ${(updated.options || []).length}`);
    const updatedQty = (updated.options || []).find(o => o.name.toLowerCase().includes('quantity'));
    if (updatedQty) {
        console.log(`"${updatedQty.name}" now has ${(updatedQty.values || []).length} values`);
    }

    console.log('\n===================================================');
    console.log(' Done!');
    console.log('===================================================');
}

run().catch(function (err) {
    console.error('❌ Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
