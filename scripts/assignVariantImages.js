/**
 * Assigns each color variant image to its corresponding option value in Swell.
 * This links images via option_value_ids on each image record.
 */
require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_ID = '69b2e1a42790830012a1fd2d';

// Color option value ID -> image ID mapping
// Ordering: color option values match the order from the product data
const colorImageMap = [
    { color: 'Black',          optionValueId: '69b2e1a42790830012a1fd31', imageId: '69b2e84e9e27e000127580fe' },
    { color: 'Navy Blue',      optionValueId: '69b2e1a42790830012a1fd32', imageId: '69b2e8519e27e00012758114' },
    { color: 'Dark Blue',      optionValueId: '69b2e1a42790830012a1fd33', imageId: '69b2e8569e27e00012758126' },
    { color: 'Grey Blue',      optionValueId: '69b2e1a42790830012a1fd34', imageId: '69b2e8569e27e0001275813e' },
    { color: 'Light Blue',     optionValueId: '69b2e1a42790830012a1fd35', imageId: '69b2e8579e27e0001275814e' },
    { color: 'White',          optionValueId: '69b2e1a42790830012a1fd36', imageId: '69b2e8579e27e0001275815e' },
    { color: 'Burgundy',       optionValueId: '69b2e1a42790830012a1fd37', imageId: '69b2e8589e27e00012758176' },
    { color: 'Orange',         optionValueId: '69b2e1a42790830012a1fd38', imageId: '69b2e8599e27e00012758189' },
    { color: 'Rose Gold',      optionValueId: '69b2e1a42790830012a1fd39', imageId: '69b2e8599e27e0001275819b' },
    { color: 'Champagne Gold', optionValueId: '69b2e1a42790830012a1fd3a', imageId: '69b2e85a9e27e000127581ad' },
    { color: 'Champagne',      optionValueId: '69b2e1a42790830012a1fd3b', imageId: '69b2e85a9e27e000127581bf' },
    { color: 'Light Pink',     optionValueId: '69b2e1a42790830012a1fd3c', imageId: '69b2e85b9e27e000127581d5' },
    { color: 'Dark Green',     optionValueId: '69b2e1a42790830012a1fd3d', imageId: '69b2e85b9e27e000127581e7' },
    { color: 'Sage Green',     optionValueId: '69b2e1a42790830012a1fd3e', imageId: '69b2e85c9e27e000127581fb' },
    { color: 'Purple',         optionValueId: '69b2e1a42790830012a1fd3f', imageId: '69b2e85c9e27e0001275820e' },
    { color: 'Mauve',          optionValueId: '69b2e1a42790830012a1fd40', imageId: '69b2e85d9e27e00012758220' },
    { color: 'Lavender',       optionValueId: '69b2e1a42790830012a1fd41', imageId: '69b2e85e9e27e00012758232' },
    { color: 'Dusty Rose',     optionValueId: '69b2e1a42790830012a1fd42', imageId: '69b2e85e9e27e00012758246' },
];

(async () => {
    console.log('Assigning color images to option values...\n');

    // Get the current product to read its images array
    const product = await swell.get('/products/' + PRODUCT_ID);
    const images = product.images || [];

    // Build updated images array: for each image, add option_value_ids linking to its color
    const updatedImages = images.map(img => {
        const mapping = colorImageMap.find(m => m.imageId === img.id);
        if (mapping) {
            return {
                id: img.id,
                option_value_ids: [mapping.optionValueId],
            };
        }
        // Non-variant images (thumbnail, lifestyle) — keep as-is
        return { id: img.id };
    });

    // Push the update
    const updated = await swell.put('/products/' + PRODUCT_ID, {
        images: updatedImages,
    });

    // Verify
    console.log('Verifying assignments...\n');
    const verify = await swell.get('/products/' + PRODUCT_ID);
    let assigned = 0;
    (verify.images || []).forEach(img => {
        const mapping = colorImageMap.find(m => m.imageId === img.id);
        if (mapping) {
            const hasLink = img.option_value_ids && img.option_value_ids.includes(mapping.optionValueId);
            console.log(`  ${hasLink ? '✅' : '❌'} ${mapping.color} → ${img.file && img.file.filename || img.id}`);
            if (hasLink) assigned++;
        }
    });

    console.log(`\n🎉 Done! ${assigned}/18 color images assigned to their variant option values.`);
})();
