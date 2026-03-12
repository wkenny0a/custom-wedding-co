require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);

async function run() {
    let productId = "69b2d85100ca85001243d0cb"; 
    let p1 = process.argv[2];
    let p2 = process.argv[3];
    
    let images = [];
    if(fs.existsSync(p1)) {
        let b1 = fs.readFileSync(p1).toString('base64');
        images.push({ file: { data: b1, content_type: 'image/png', filename: 'acrylic-lifestyle-1.png' }});
    }
    if(fs.existsSync(p2)) {
        let b2 = fs.readFileSync(p2).toString('base64');
        images.push({ file: { data: b2, content_type: 'image/png', filename: 'acrylic-lifestyle-2.png' }});
    }
    
    console.log('Fetching product...');
    let product = await swell.get('/products/' + productId);
    let existingImages = product.images || [];
    
    console.log('Uploading images to Swell...');
    await swell.put('/products/' + productId, {
        images: [...existingImages, ...images]
    });
    console.log("✅ Successfully uploaded additional images.");
}
run().catch(console.error);
