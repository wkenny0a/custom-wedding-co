const swell = require('swell-js');

swell.init('customweddingco', 'pk_pA1RkUIfVn6dijUq3DIFc324L7V7Z9n1');

async function test() {
  try {
    // Create an empty cart just to test update
    await swell.cart.addItem({ product_id: '69e9a9c652ca2a001272aa14', quantity: 1 });
    console.log("Cart created");

    try {
      const res1 = await swell.cart.update({
        account: { email: 'test@example.com', first_name: 'Test', last_name: 'User' }
      });
      console.log("Update 1 success");
    } catch(e) {
      console.error("Update 1 failed:", e.message || e);
    }

    try {
      const res2 = await swell.cart.update({
        account: { email: 'test@example.com' }
      });
      console.log("Update 2 success");
    } catch(e) {
      console.error("Update 2 failed:", e.message || e);
    }

  } catch(e) {
    console.error("Test failed", e);
  }
}

test();
