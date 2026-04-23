require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const IMAGE_PATH = path.resolve('C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\0e82f879-b9ba-435d-ad88-106db765df51\\concierge_service_thumbnail_1776921189998.png');

const PRODUCT = {
  name: 'Personal Product Specialist (1-on-1 Concierge)',
  slug: 'personal-product-specialist',
  active: true,
  price: 19.00,
  type: 'digital',
  description: '<p>1-on-1 dedicated concierge service guiding your heirloom from initial design proofs to final artisan production and shipping.</p>',
};

(async () => {
  try {
    console.log('Creating/Updating Concierge Service in Swell...');
    
    // 1. Fetch existing
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
    
    // 2. Upload image
    console.log('Uploading thumbnail...');
    if (!fs.existsSync(IMAGE_PATH)) {
      throw new Error(`Image not found at ${IMAGE_PATH}`);
    }

    const imageBuffer = fs.readFileSync(IMAGE_PATH);
    const base64Image = imageBuffer.toString('base64');
    const imageDataUri = `data:image/png;base64,${base64Image}`;

    const updatedProduct = await swell.put(`/products/${product.id}`, {
      images: [
        {
          file: {
            data: imageDataUri,
            filename: 'concierge-service-thumbnail.png',
            content_type: 'image/png',
          },
        },
      ],
    });

    const uploadedImageUrl = updatedProduct.images?.[0]?.file?.url 
                          || updatedProduct.images?.[0]?.url 
                          || '(URL pending CDN propagation)';

    console.log(`SUCCESS! Product ID: ${product.id}`);
    console.log(`Image URL: ${uploadedImageUrl}`);
  } catch (err) {
    console.error('ERROR:', err.message || err);
  }
})();
