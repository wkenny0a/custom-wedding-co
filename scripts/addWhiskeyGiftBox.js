require('dotenv').config({ path: '.env.local' });
var swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

var SLUG = 'bespoke-heirloom-whiskey-glass-decanter-collection';

async function run() {
    var existing = await swell.get('/products', { where: { slug: SLUG }, expand: ['options'] });
    var product = existing.results[0];

    console.log('Adding Gift Box option to ' + SLUG);
    
    // Check if Packaging option exists
    var options = product.options || [];
    var found = false;
    
    for (var i = 0; i < options.length; i++) {
        if (options[i].name === 'Packaging') {
            found = true;
            console.log('Packaging option already exists. Updating...');
            var values = options[i].values || [];
            var hasGiftBox = false;
            for (var j = 0; j < values.length; j++) {
                if (values[j].name === 'Handmade Wooden Gift Box') {
                    values[j].price = 19.99;
                    hasGiftBox = true;
                }
            }
            if (!hasGiftBox) {
                values.push({ name: 'Standard Packaging', price: 0 });
                values.push({ name: 'Handmade Wooden Gift Box', price: 19.99 });
            }
            await swell.put(`/products/${product.id}/options/${options[i].id}`, { values: values });
        }
    }
    
    if (!found) {
        console.log('Creating new Packaging option...');
        var newOption = {
            name: 'Packaging',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Standard Packaging', price: 0 },
                { name: 'Handmade Wooden Gift Box', price: 19.99 }
            ]
        };
        
        await swell.post(`/products/${product.id}/options`, newOption);
        console.log('Packaging option created successfully!');
    }
}

run().catch(console.error);
