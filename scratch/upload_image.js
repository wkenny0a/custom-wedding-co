require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

async function uploadImage() {
  try {
    const IMAGE_PATH = 'C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\53a06ef5-315c-49f9-87bd-e0eb38017b6f\\welcome_gift_box_1778321980704.png';
    const buf = fs.readFileSync(IMAGE_PATH);
    const fileRes = await swell.post('/:files', {
      data: buf.toString('base64'),
      filename: 'welcome_gift_box_lifestyle.png',
      content_type: 'image/png'
    });
    console.log('Upload successful:', fileRes);
  } catch (err) {
    console.error('Upload failed:', err);
  }
}

uploadImage();
