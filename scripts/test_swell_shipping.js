const swell = require('swell-js');

swell.init('customweddingco', 'pk_pA1RkUIfVn6dijUq3DIFc324L7V7Z9n1');

async function test() {
  try {
    const cart = await swell.cart.get();
    console.log("Cart retrieved");
    const rates = await swell.cart.getShippingRates();
    console.log("Rates", rates);
  } catch(e) {
    console.error("Test failed", e);
  }
}

test();
