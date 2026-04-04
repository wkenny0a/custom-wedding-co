require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2d1fe9eb4fb00128a5e38';

async function run() {
    console.log('Fetching product', PRODUCT_ID, '...');
    const product = await swell.get(`/products/${PRODUCT_ID}`, { expand: 'options' });
    const currentOptions = product.options || [];

    // Filter out existing "Design Style" to completely replace it
    const filteredOptions = currentOptions.filter(o => !o.name.toLowerCase().includes('design'));

    const newValues = [];
    for (let i = 1; i <= 11; i++) {
        newValues.push({ name: `Design #${i}` });
    }
    newValues.push({ name: 'Design #12 (Custom Design)' });

    filteredOptions.unshift({
        name: 'Design Style',
        input_type: 'select',
        variant: true,
        active: true,
        required: true,
        values: newValues
    });

    console.log('Sending PUT to product with ' + newValues.length + ' new design values...');

    const updatedProduct = await swell.put(`/products/${PRODUCT_ID}`, {
        options: filteredOptions
    });
    
    const newDesignOpt = (updatedProduct.options || []).find(o => o.name.toLowerCase().includes('design'));
    console.log('Successfully recreated option! ID:', newDesignOpt?.id);
    console.log('Values count:', (newDesignOpt?.values || []).length);
    (newDesignOpt?.values || []).forEach(v => console.log(' - ' + v.name));
}

run().catch(console.error);
