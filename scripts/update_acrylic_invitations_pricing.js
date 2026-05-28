require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
  try {
    const productsRes = await swell.get('/products', { 
      where: { slug: 'the-heirloom-acrylic-wedding-invitation-suite' }
    });

    if (!productsRes.results || productsRes.results.length === 0) {
      console.error('Could not find product matching acrylic invitations');
      process.exit(1);
    }

    const product = productsRes.results[0];
    console.log(`Found product: ${product.name} (ID: ${product.id})`);

    let options = product.options || [];
    let changed = false;
    
    options = options.map(opt => {
      // Find the tier option
      if (opt.name.toLowerCase().includes('quantity') || opt.name.toLowerCase().includes('set size')) {
        changed = true;
        
        opt.values = opt.values.map(val => {
          // It might be named "Physical Sample" or similar
          if (val.name.toLowerCase().includes('sample')) {
             return { ...val, price: 9.99 };
          }
          
          // Or a numeric tier
          const qty = parseInt(val.name, 10);
          if (!isNaN(qty)) {
            // Price is $4.00 per piece (25 = 100, 50 = 200, etc)
            const price = parseFloat((qty * 4.00).toFixed(2));
            return { ...val, price: price };
          }
          return val;
        });
      }
      return opt;
    });

    if (changed) {
      const updatedProduct = await swell.put(`/products/${product.id}`, {
        price: 0, // Zero base price standard
        options: options
      });
      console.log(`SUCCESS! Updated pricing matrix for ${product.slug}`);
    } else {
      console.log("Could not find Quantity option.");
    }

  } catch (err) {
    console.error('ERROR:', err);
  }
})();
