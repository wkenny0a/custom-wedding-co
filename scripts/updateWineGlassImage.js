require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

var IMAGE_PATH = process.argv[2];
var PRODUCT_ID = '69b9e09fcf798c001233268b';

async function run() {
    console.log('Updating wine glass thumbnail...\n');

    var imgBuffer = fs.readFileSync(IMAGE_PATH);
    var base64 = imgBuffer.toString('base64');
    var ext = path.extname(IMAGE_PATH).slice(1).toLowerCase();
    var mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';

    var description = [
        '<div style="font-family: \'Cormorant Garamond\', \'Playfair Display\', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">',
        '',
        '  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">',
        '    Elevate Your Most Cherished Milestones.',
        '  </p>',
        '',
        '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
        '    Elevate your most cherished milestones with our bespoke etched glassware, thoughtfully crafted to capture the timeless elegance of your unique love story.',
        '  </h2>',
        '',
        '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Heirloom Craftsmanship</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Each generous 18 oz glass is expertly and delicately etched by hand to ensure a flawless, enduring finish that lasts a lifetime.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Intimate Personalization</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Imprint your names, significant dates, or a quiet message of love to create a truly one-of-a-kind keepsake.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Elevated Presentation</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Opt for our premium, deep-toned presentation box, finished with elegant stitching and your choice of antique gold or silver lettering.',
        '    </li>',
        '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Artisanal Quality</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      Designed with a tall, elegant silhouette that feels simultaneously modern and deeply romantic in your hands.',
        '    </li>',
        '    <li style="padding: 0.8em 0;">',
        '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">The Perfect Tribute</strong>',
        '      <span style="color: #B89A52; margin: 0 0.4em;">\\u2014</span>',
        '      An unforgettable, bespoke offering for weddings, intimate anniversaries, or celebrating a quiet toast between just the two of you.',
        '    </li>',
        '  </ul>',
        '',
        '</div>',
    ].join('\n');

    var product = await swell.put('/products/' + PRODUCT_ID, {
        images: [{
            file: {
                data: base64,
                content_type: mimeType,
                filename: 'wine-glass-set-thumbnail.' + ext,
            },
        }],
        description: description,
    });

    console.log('✅ Thumbnail updated!');
    console.log('  Images: ' + (product.images && product.images.length));
    console.log('  Description updated to 18oz tall glasses');
}

run().catch(function(err) {
    console.error('❌ Error:', err.message || err);
});
