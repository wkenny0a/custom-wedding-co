require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// Target product
const PRODUCT_SLUG = 'everlasting-heirloom-rose-set';

// The categories that conceptually fit "Faux Botanical Roses / DIY Floral Decor"
const TARGET_CATEGORY_IDS = [
  '69b39207800db000124013b1', // Table Décor
  '69b35ceec2713a0012217e8a', // Luxury Wedding Details
  '69b35cedc2713a0012217e6c', // Wedding Reception Decor
  '69b358aba89adf0012ba16e8', // Bespoke Reception Decor
  '69b3543f61119d0012fe5f44', // Wedding Decor
  '69b353ae4acd240012d8be73', // Bespoke Details
  '69b348ca05c0310012a23371', // Wedding Reception Details
  '69b34716399c680012aaed9b', // Wedding Day Essentials
  '69b2ea202138f80012800af8', // Wedding Weekend Essentials
  '69b2d812694d9e001240e5e3', // Bespoke Wedding Details
  '69b2d6c7144dc300123c91c5', // Bespoke Wedding Decor
  '69b2d5d6cc01040012c98298', // Luxury Table Decor
  '69b2cab34088dc00120e57c7'  // Wedding Decor & Accents
];

(async () => {
  try {
    console.log(`Fetching product: ${PRODUCT_SLUG}...`);
    const productRes = await swell.get('/products', { where: { slug: PRODUCT_SLUG }});
    
    if (!productRes.results || productRes.results.length === 0) {
      console.error("Product not found!");
      process.exit(1);
    }
    const product = productRes.results[0];

    // Combine existing categories with target ones (ensure unique)
    const existingIds = product.category_index?.id || [];
    const allCategoryIds = [...new Set([...existingIds, ...TARGET_CATEGORY_IDS])];

    console.log(`Updating ${PRODUCT_SLUG} with ${allCategoryIds.length} total categories...`);
    
    const updated = await swell.put(`/products/${product.id}`, {
      category_index: { id: allCategoryIds }
    });

    console.log("SUCCESS! Product categorization expanded across the store matrix.");
  } catch (err) {
    console.error('ERROR:', err);
  }
})();
