const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = path.resolve('C:\\Users\\kennywong\\.gemini\\antigravity\\brain\\89324553-b6fc-4f04-9ef7-ecea3adfccef\\cwc_favicon_1778612450346.png');
const OUTPUT_ICO = path.resolve(__dirname, '..', 'src', 'app', 'favicon.ico');
const OUTPUT_PNG_180 = path.resolve(__dirname, '..', 'src', 'app', 'apple-icon.png');
const OUTPUT_ICON_SVG = path.resolve(__dirname, '..', 'public', 'icon.svg');

async function run() {
  // 1. Create 32x32 PNG for favicon.ico (Next.js accepts PNG named as .ico)
  await sharp(INPUT)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(OUTPUT_ICO);
  console.log('✅ favicon.ico (32x32)');

  // 2. Create 180x180 Apple touch icon
  await sharp(INPUT)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(OUTPUT_PNG_180);
  console.log('✅ apple-icon.png (180x180)');

  // 3. Create a 512x512 high-res icon for OG/manifest
  const OUTPUT_512 = path.resolve(__dirname, '..', 'public', 'icon-512.png');
  await sharp(INPUT)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(OUTPUT_512);
  console.log('✅ icon-512.png (512x512)');

  console.log('\nDone! All icons generated.');
}

run().catch(console.error);
