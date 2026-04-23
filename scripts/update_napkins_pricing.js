require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// We will use a regex hint that matches "Bespoke Monogram Cocktail Napkins"
const PRODUCT_NAME_HINT = 'Bespoke Monogram Cocktail Napkins';

// The prices provided map mathematically relative to the lowest tier $19.99 base price
const NEW_QUANTITY_VALUES = [
  { name: '50', price: 0 },
  { name: '100', price: 10.00 },
  { name: '150', price: 20.00 },
  { name: '200', price: 30.00 },
  { name: '250', price: 40.00 },
  { name: '300', price: 50.00 },
  { name: '350', price: 60.00 },
  { name: '400', price: 70.00 },
  { name: '500', price: 80.00 },
  { name: '1000', price: 160.00 },
  { name: '2000', price: 230.00 },
  { name: '3000', price: 3480.00 } // User specified 3499.99, difference is 3480
];

(async () => {
  try {
    const productsRes = await swell.get('/products', { 
      where: { name: { $regex: PRODUCT_NAME_HINT, $options: 'i' } } 
    });

    if (!productsRes.results || productsRes.results.length === 0) {
      console.error('Could not find product matching:', PRODUCT_NAME_HINT);
      process.exit(1);
    }

    const product = productsRes.results[0];
    console.log(`Found product: ${product.name} (ID: ${product.id})`);

    let options = product.options || [];
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

    const updatedProduct = await swell.put(`/products/${product.id}`, {
      price: 19.99, // Base product price explicitly anchors lowest tier
      options: options
    });

    console.log(`SUCCESS! Updated pricing matrix for ${product.slug}`);

  } catch (err) {
    console.error('ERROR:', err);
  }
})();
