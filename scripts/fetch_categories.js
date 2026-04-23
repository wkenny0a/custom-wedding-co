require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

(async () => {
  try {
    const categories = await swell.get('/categories', { limit: 100 });
    console.log("ALL CATEGORIES:");
    categories.results.forEach(c => console.log(`- ${c.name} (${c.id})`));
  } catch (err) {
    console.error('ERROR:', err);
  }
})();
