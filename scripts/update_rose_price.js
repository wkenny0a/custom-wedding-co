require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_SLUG = 'everlasting-heirloom-rose-set';

(async () => {
  try {
    const existingProduct = await swell.get('/products', { where: { slug: PRODUCT_SLUG } });
    if (existingProduct.results && existingProduct.results.length > 0) {
      const id = existingProduct.results[0].id;
      const updated = await swell.put(`/products/${id}`, {
        price: 9.99
      });
      console.log(`Updated price for ${updated.slug} to $${updated.price}`);
    } else {
      console.log("Product not found.");
    }
  } catch (err) {
    console.error('ERROR:', err);
  }
})();
