require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// We will use a regex hint that matches "Bespoke Monogram Cocktail Napkins"
const PRODUCT_NAME_HINT = 'Bespoke Monogram Cocktail Napkins';

// The prices provided map absolutely to what the user wants them to say in the dropdown
const NEW_QUANTITY_VALUES = [
  { name: '50', price: 19.99 },
  { name: '100', price: 29.99 },
  { name: '150', price: 39.99 },
  { name: '200', price: 49.99 },
  { name: '250', price: 59.99 },
  { name: '300', price: 69.99 },
  { name: '350', price: 79.99 },
  { name: '400', price: 89.99 },
  { name: '500', price: 99.99 },
  { name: '1000', price: 179.99 },
  { name: '2000', price: 249.99 },
  { name: '3000', price: 3499.99 }
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
      price: 0, // Base product price explicitly anchored to 0 to bypass delta addition logic
      options: options
    });

    console.log(`SUCCESS! Updated pricing matrix for ${product.slug}`);

  } catch (err) {
    console.error('ERROR:', err);
  }
})();
