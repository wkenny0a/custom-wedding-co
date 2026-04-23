require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT = {
  name: 'Personal Product Specialist (1-on-1 Concierge)',
  slug: 'personal-product-specialist',
  active: true,
  price: 19.00,
  type: 'digital', // Make it digital or standard without shipping reqs
  description: '<p>1-on-1 dedicated concierge service guiding your heirloom from initial design proofs to final artisan production and shipping.</p>',
};

(async () => {
  try {
    console.log('Creating Concierge Service in Swell...');
    
    const existingProduct = await swell.get('/products', {
      where: { slug: PRODUCT.slug },
    });

    let product;
    if (existingProduct.results && existingProduct.results.length > 0) {
      console.log('Product exists. Updating in place...');
      product = await swell.put(`/products/${existingProduct.results[0].id}`, PRODUCT);
    } else {
      product = await swell.post('/products', PRODUCT);
    }
    
    console.log(`SUCCESS! Product ID: ${product.id}`);
  } catch (err) {
    console.error('ERROR:', err);
  }
})();
