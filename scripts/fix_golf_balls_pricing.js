require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
  try {
    const productsRes = await swell.get('/products', { 
      where: { slug: 'bespoke-personalized-golf-balls' }
    });

    if (!productsRes.results || productsRes.results.length === 0) {
      console.error('Could not find product matching golf balls');
      process.exit(1);
    }

    const product = productsRes.results[0];
    console.log(`Found product: ${product.name} (ID: ${product.id})`);

    let changed = false;
    let options = product.options || [];
    
    options = options.map(opt => {
      // Find the tier option
      if (opt.name.toLowerCase().includes('quantity') || opt.name.toLowerCase().includes('set size')) {
        opt.variant = false; // MUST be false to prevent 1,200 SKU matrix timeout
        opt.values = opt.values.map(val => {
          // Extract price from string like "1 Set (6 Golf Balls) @ $24.99"
          const match = val.name.match(/^(.*?)\s*@\s*\$([\d.,]+)/);
          if (match) {
            changed = true;
            // Clean up the commas if any (e.g. 1,004.50 -> 1004.50)
            const cleanPrice = Number(match[2].replace(/,/g, ''));
            return { ...val, name: match[1].trim(), price: cleanPrice };
          }
          return val;
        });
      }
      return opt;
    });

    if (changed) {
      const updatedProduct = await swell.put(`/products/${product.id}`, {
        price: 0, // Base product price 0
        options: options
      });
      console.log(`SUCCESS! Extracted embedded prices into true Swell schema for ${product.slug}`);
    } else {
      console.log("No embedded prices found to fix.");
    }

  } catch (err) {
    console.error('ERROR:', err);
  }
})();
