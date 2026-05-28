require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
  try {
    const productsRes = await swell.get('/products', { 
      where: { slug: 'bespoke-handmade-wax-seal-stickers' }
    });

    if (!productsRes.results || productsRes.results.length === 0) {
      console.error('Could not find product matching wax seals');
      process.exit(1);
    }

    const product = productsRes.results[0];
    console.log(`Found product: ${product.name} (ID: ${product.id})`);

    let options = product.options || [];
    let changed = false;
    
    options = options.map(opt => {
      // Find the tier option
      if (opt.name.toLowerCase().includes('quantity')) {
        changed = true;
        
        opt.values = opt.values.map(val => {
          const qty = parseInt(val.name, 10);
          if (!isNaN(qty)) {
            let price = 0;
            if (qty === 5) {
              price = 9.99;
            } else {
              price = parseFloat((qty * 1.99).toFixed(2));
            }
            return { ...val, price: price };
          }
          return val;
        });
      }
      return opt;
    });

    if (changed) {
      const updatedProduct = await swell.put(`/products/${product.id}`, {
        price: 0, // Set base to 0 to mirror our active dynamic pricing architecture
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
