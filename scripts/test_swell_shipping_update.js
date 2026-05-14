const swell = require('swell-js');

swell.init('customweddingco', 'pk_pA1RkUIfVn6dijUq3DIFc324L7V7Z9n1');

async function test() {
  try {
    const res = await swell.cart.update({
      shipping: { service: 'standard' }
    });
    console.log("Success with service");
  } catch(e) {
    console.error("Failed with service:", e.message || e);
  }
}

test();
