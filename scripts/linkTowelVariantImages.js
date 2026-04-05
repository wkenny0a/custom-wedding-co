/**
 * Links each color variant image to its specific Color option value in Swell.
 * This makes the correct image display when a customer selects a color variant.
 *
 * Run:  node scripts/linkTowelVariantImages.js
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2e9832dac010012c679cb';

// Map color name → filename fragment used during upload
const COLOR_TO_FILE = {
    'Mint':           'towel-mint',
    'Purple':         'towel-purple',
    'Light Gray':     'towel-light-gray',
    'Khaki Green':    'towel-khaki-green',
    'Lilac':          'towel-lilac',
    'Turquoise':      'towel-turquoise',
    'Brown':          'towel-brown',
    'Orange':         'towel-orange',
    'Burgundy':       'towel-burgundy',
    'Benetton Green': 'towel-benetton-green',
    'Baby Blue':      'towel-baby-blue',
    'Beige':          'towel-beige',
    'Petrol Green':   'towel-petrol-green',
    'Powder Pink':    'towel-powder-pink',
    'Mustard':        'towel-mustard',
    'Black':          'towel-black',
    'Light Mint':     'towel-light-mint',
    'Yellow':         'towel-yellow',
    'Blue':           'towel-blue',
    'Fuchsia':        'towel-fuchsia',
    'Sax Blue':       'towel-sax-blue',
    'Random Choice':  'towel-random-choice',
};

(async () => {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  Linking Variant Images to Color Option Values       ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    try {
        // Fetch product with options
        const product = await swell.get('/products/' + PRODUCT_ID, { expand: ['options'] });
        const images = product.images || [];
        const colorOption = product.options.find(o => o.name === 'Color');

        if (!colorOption) {
            console.error('❌ Could not find "Color" option!');
            return;
        }

        console.log(`Found ${images.length} images and ${colorOption.values.length} color values.\n`);

        // Build a lookup: filename fragment → image id
        const fileToImageId = {};
        for (const img of images) {
            if (img.file && img.file.filename) {
                const basename = img.file.filename.replace(/\.[^.]+$/, ''); // strip extension
                fileToImageId[basename] = img.id;
            }
        }

        // For each color value, find its matching image and update the option value
        let linked = 0;
        const updatedValues = [];

        for (const val of colorOption.values) {
            const fileFragment = COLOR_TO_FILE[val.name];
            if (!fileFragment) {
                console.log(`  ⚠️  No file mapping for color: ${val.name}`);
                updatedValues.push(val);
                continue;
            }

            const imageId = fileToImageId[fileFragment];
            if (!imageId) {
                console.log(`  ⚠️  No uploaded image found for: ${val.name} (looking for ${fileFragment})`);
                updatedValues.push(val);
                continue;
            }

            // Add image to the option value
            updatedValues.push({
                ...val,
                image: { file_id: imageId, id: imageId },
            });
            linked++;
            console.log(`  ✅ ${val.name} → image ${imageId}`);
        }

        // Update the Color option with the updated values
        const colorOptionId = colorOption.id;
        await swell.put('/products/' + PRODUCT_ID, {
            options: product.options.map(opt => {
                if (opt.id === colorOptionId) {
                    return { ...opt, values: updatedValues };
                }
                return opt;
            }),
        });

        console.log(`\n🎉 Done! Linked ${linked}/${colorOption.values.length} color variants to their images.`);
    } catch (err) {
        console.error('❌ Error:', err.message || err);
        if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
    }
})();
