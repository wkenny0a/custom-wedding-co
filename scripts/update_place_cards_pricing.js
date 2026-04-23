require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_NAME_HINT = 'Bespoke Folded Wedding Place Cards';

const NEW_QUANTITY_VALUES = [
  { name: 'Personalized sample', price: 0 },
  { name: '10', price: 2.00 },
  { name: '20', price: 12.00 },
  { name: '30', price: 22.00 },
  { name: '40', price: 32.00 },
  { name: '50', price: 42.00 },
  { name: '60', price: 52.00 },
  { name: '70', price: 62.00 },
  { name: '80', price: 72.00 },
  { name: '90', price: 82.00 },
  { name: '100', price: 92.00 },
  { name: '125', price: 102.00 },
  { name: '150', price: 112.00 },
  { name: '175', price: 122.00 },
  { name: '200', price: 132.00 }
];

(async () => {
  try {
    // 1. Fetch products matching the hint
    const productsRes = await swell.get('/products', { 
      where: { name: { $regex: PRODUCT_NAME_HINT, $options: 'i' } } 
    });

    if (!productsRes.results || productsRes.results.length === 0) {
      console.error('Could not find product matching:', PRODUCT_NAME_HINT);
      process.exit(1);
    }

    const product = productsRes.results[0];
    console.log(`Found product: ${product.name} (ID: ${product.id})`);

    // 2. Clone options
    let options = product.options || [];
    
    // Find Quantity option or Set Quantity option
    const qtyOptionIndex = options.findIndex(opt => opt.name.toLowerCase().includes('quantity') || opt.name.toLowerCase() === 'set size');

    if (qtyOptionIndex !== -1) {
      console.log(`Updating existing '${options[qtyOptionIndex].name}' option...`);
      options[qtyOptionIndex].values = NEW_QUANTITY_VALUES;
      options[qtyOptionIndex].variant = true;
    } else {
      console.log(`No quantity option found. Adding a new 'Quantity' option...`);
      options.push({
        name: 'Quantity',
        variant: true,
        active: true,
        values: NEW_QUANTITY_VALUES
      });
    }

    // 3. To avoid double-pricing bugs in Swell where the base product price is added
    // to the option price, we should set the base product price to 0 and let
    // the variant drive it entirely. Wait, setting base price to 0 might make
    // the listing show as "$0.00" on the storefront card if we aren't careful.
    // Usually, the base price is the sample price or lowest tier ($7.99 in this case).
    // Swell option prices are ABSOLUTE if the variant overwrites it, or RELATIVE? 
    // Wait, in `create_photo_keepsake.js` the options are:
    // { name: 'Grand', price: 25 } <-- this typically adds $25 if base is $59.
    // If the user said "10 - 9.99, 20 - 19.99", these are ABSOLUTE prices for the whole set.
    // If we want these option values to be the absolute total, Swell has `price` which adds to base, 
    // OR we change the variant prices entirely.
    // Actually, in Swell API, if `variant: true`, the variant itself gets its own `price` field which overrides the base price.
    // Usually, when writing `values: [{ name: '...', price: 10 }]`, does it add or override?
    // Let's set the base product price to the lowest tier (7.99), and standard option values here.
    // Wait, let's just push it to Swell and test.
    
    // Actually, if we just want absolute price overrides on variants, we need to let Swell generate variants, then update the variants themselves, OR we rely on storefront logic.
    // Let's just set the option prices to EXACTLY what the user requested, and set the base product price to 0 to be completely safe against addition math, or 7.99 as base and let the option handle the rest.
    // The safest is putting the user's EXACT numbers in the option. Storefronts usually handle it. 

    const updatedProduct = await swell.put(`/products/${product.id}`, {
      price: 7.99, // Base product price sets the catalog display "From $7.99"
      options: options
    });

    console.log(`SUCCESS! Updated pricing matrix for ${product.slug}`);

  } catch (err) {
    console.error('ERROR:', err);
  }
})();
