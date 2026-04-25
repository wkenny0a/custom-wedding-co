require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const swell = require('swell-node').swell;
const fs = require('fs');

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);

const uploads = [
  {
    slug: 'bridesmaid-box',
    file: 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\53a06ef5-315c-49f9-87bd-e0eb38017b6f\\bridesmaid_box_lifestyle_1777117676082.png',
    filename: 'bridesmaid_box_lifestyle.png'
  },
  {
    slug: 'groom-box',
    file: 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\53a06ef5-315c-49f9-87bd-e0eb38017b6f\\groom_box_lifestyle_1777117688689.png',
    filename: 'groom_box_lifestyle.png'
  }
];

(async () => {
  console.log('Starting Correct 2-Step Swell Upload Sequence...');
  
  for (const item of uploads) {
    try {
      console.log(`\nProcessing: ${item.slug}`);
      
      // 1. Validate Product
      const res = await swell.get('/products', { where: { slug: item.slug } });
      if (!res.results || res.results.length === 0) {
        throw new Error(`Product ${item.slug} not found.`);
      }
      const productId = res.results[0].id;
      
      // 2. Validate File
      if (!fs.existsSync(item.file)) {
        throw new Error(`Image not found at path: ${item.file}`);
      }
      const buf = fs.readFileSync(item.file);
      
      console.log(`Step 1: Uploading raw Base64 to /:files...`);
      const fileRes = await swell.post('/:files', {
        data: buf.toString('base64'), 
        filename: item.filename,
        content_type: 'image/png',
        width: 1024,
        height: 1024,
      });

      if (!fileRes.url) throw new Error("Upload failed, no CDN URL returned.");
      console.log(`Success! File hosted at: ${fileRes.url}`);

      // 3. Clear previous images per instructions
      console.log(`Step 2.A: Clearing old images...`);
      await swell.put(`/products/${productId}`, { images: null });

      // 4. Attach new image securely using explicit bounds
      console.log(`Step 2.B: Attaching CDN URL to product...`);
      await swell.put(`/products/${productId}`, {
        images: [{
          file: {
            url: fileRes.url,
            width: 1024,
            height: 1024,
          },
        }],
      });
      
      console.log(`✅ Fully Secured & Attached to ${item.slug}!`);
    } catch (e) {
      console.error(`❌ Failed on ${item.slug}:`, e.message);
    }
  }
  
  // Expose URLs for NextJS Injection
  console.log('\n--- UPLOAD SEQUENCE COMPLETE ---');
})();
