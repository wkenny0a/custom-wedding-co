require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
  try {
    const prods = await swell.get('/products', { limit: 1 });
    const p = prods.results[0];
    
    // Create cart
    const cart = await swell.post('/carts', {
      items: [{ product_id: p.id, quantity: 1 }]
    });
    
    // Set shipping address
    await swell.put(`/carts/${cart.id}`, {
      shipping: {
        name: 'Test',
        address1: '123 Test',
        city: 'LA',
        state: 'CA',
        zip: '90001',
        country: 'US'
      }
    });
    
    // Get rates
    const rates = await swell.get(`/carts/${cart.id}/shipping-rates`);
    console.log("Rates response:", JSON.stringify(rates, null, 2));
  } catch(e) {
    console.error(e);
  }
})();
