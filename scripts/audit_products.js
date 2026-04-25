// audit_products.js — Full product health scan
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);

(async () => {
  const r = await swell.get('/products', { limit: 100, where: { active: true } });
  r.results.forEach((p, i) => {
    const hasDesc = p.description && p.description.length > 50;
    const imgCount = p.images?.length || 0;
    const optCount = p.options?.length || 0;
    const tagCount = p.tags?.length || 0;
    const hasMeta = !!p.meta_title;
    const catCount = p.category_index?.id?.length || 0;
    console.log(
      `${i + 1}. $${p.price} | ${imgCount}img | ${optCount}opt | ${tagCount}tag | meta:${hasMeta ? 'Y' : 'N'} | cat:${catCount} | desc:${hasDesc ? 'Y' : 'N'} | ${p.name.substring(0, 65)}`
    );
  });
  console.log('\nTotal:', r.results.length);
})();
