require('dotenv').config({ path: '.env.local' });
var swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

var SLUG = 'bespoke-heirloom-whiskey-glass-decanter-collection';

async function run() {
    console.log('Fetching product: ' + SLUG);
    
    var existing = await swell.get('/products', { where: { slug: SLUG }, expand: ['options'] });
    if (!existing || !existing.results || existing.results.length === 0) {
        console.error('Product not found.');
        return;
    }
    
    var product = existing.results[0];
    
    // We update the base price to 139.99
    var productPatch = {
        price: 139.99
    };
    
    console.log('Changing base price to 139.99...');
    await swell.put('/products/' + product.id, productPatch);
    
    // Now update the options
    var options = product.options || [];
    var packagingOption = null;
    
    for (var i = 0; i < options.length; i++) {
        if (options[i].name === 'Engraving & Packaging') {
            packagingOption = options[i];
            break;
        }
    }
    
    if (packagingOption) {
        console.log('Found Engraving & Packaging option. Updating values...');
        var values = packagingOption.values || [];
        for (var j = 0; j < values.length; j++) {
            if (values[j].name === 'Add Handmade Wooden Gift Box') {
                values[j].price = 19.99;
                console.log('Changed Gift Box price to 19.99');
            }
        }
        
        await swell.put('/products/' + product.id + '/options/' + packagingOption.id, {
            values: values
        });
        console.log('Option updated successfully.');
    } else {
        console.error('Engraving & Packaging option not found.');
    }
    
    // Do we also need to adjust the Style options since base price is now 139.99?
    // If they changed the base price to 139.99, the "Standard Whiskey Glass" might still be price: 0, 
    // making a single glass 139.99. 
    console.log('\nWarning: Base price is now $139.99. Check if style modifiers (+15, +25.01, +75.01) need adjustment if they were relative to $24.99.');
}

run().catch(console.error);
