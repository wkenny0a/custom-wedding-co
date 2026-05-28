require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2d1fe9eb4fb00128a5e38';

async function run() {
    console.log('===================================================');
    console.log(' Shot Glass — Update Design Style Options');
    console.log('===================================================\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    console.log('Fetching product', PRODUCT_ID, '...');
    const product = await swell.get(`/products/${PRODUCT_ID}`, { expand: 'options' });

    if (!product || !product.id) {
        console.error('Product not found!');
        process.exit(1);
    }

    console.log('Found:', product.name);

    const currentOptions = product.options || [];
    const designOption = currentOptions.find(o => o.name.toLowerCase().includes('design'));

    if (!designOption) {
        console.error('No "Design Style" option found.');
        console.log('Available options:', currentOptions.map(o => `${o.name} (${o.id})`).join(', '));
        process.exit(1);
    }

    console.log(`\nFound option: "${designOption.name}" (ID: ${designOption.id})`);
    console.log(`Old values: ${(designOption.values || []).map(v => v.name).join(', ')}`);

    // Build new design values: Design #1 through #11, plus Design #12 (Custom Design)
    const newValues = [];
    for (let i = 1; i <= 11; i++) {
        newValues.push({ name: `Design #${i}` });
    }
    newValues.push({ name: 'Design #12 (Custom Design)' });

    const updatedOptions = currentOptions.map(opt => {
        if (opt.id === designOption.id) {
            return {
                id: opt.id,
                name: 'Design Style',
                input_type: 'select',
                variant: true,
                active: true,
                required: true,
                values: newValues,
            };
        }
        return opt;
    });

    console.log(`\nUpdating with ${newValues.length} design values...`);
    newValues.forEach(v => console.log(`  • ${v.name}`));

    const updated = await swell.put(`/products/${PRODUCT_ID}`, {
        options: updatedOptions,
    });

    console.log('\n✅ Product updated successfully!');
    const updatedDesign = (updated.options || []).find(o => o.name.toLowerCase().includes('design'));
    if (updatedDesign) {
        console.log(`"${updatedDesign.name}" now has ${(updatedDesign.values || []).length} values`);
    }

    console.log('\n===================================================');
    console.log(' Done!');
    console.log('===================================================');
}

run().catch(function (err) {
    console.error('❌ Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
