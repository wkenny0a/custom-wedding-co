require('dotenv').config({ path: '.env.local' });
var swell = require('swell-node').swell;
var fs = require('fs');
var path = require('path');

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

var SLUG = 'bespoke-heirloom-whiskey-glass-decanter-collection';

// ── Variant images to upload ──────────────────────────────────────────
var variantImages = [
    {
        label: 'Standard Whiskey Glass',
        path: '/Users/kenny/.gemini/antigravity/brain/4e559f59-2a6b-47c1-9d8b-09f641c0c2e7/standard_whiskey_glass_1773329784047.png',
    },
    {
        label: 'Crystal Whiskey Glass',
        path: '/Users/kenny/.gemini/antigravity/brain/4e559f59-2a6b-47c1-9d8b-09f641c0c2e7/crystal_whiskey_glass_1773329798931.png',
    },
    {
        label: 'Glass Decanter',
        path: '/Users/kenny/.gemini/antigravity/brain/4e559f59-2a6b-47c1-9d8b-09f641c0c2e7/glass_decanter_1773329815599.png',
    },
    {
        label: 'Decanter + 2 Glasses Set',
        path: '/Users/kenny/.gemini/antigravity/brain/4e559f59-2a6b-47c1-9d8b-09f641c0c2e7/decanter_glasses_set_1773329843619.png',
    },
];

// ══════════════════════════════════════════════════════════════════════
async function run() {
    console.log('===================================================');
    console.log(' Whiskey Glass — Upload Variant Images to Swell');
    console.log('===================================================\n');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing.');
        process.exit(1);
    }

    // ── Find product ──────────────────────────────────────────────────
    console.log('Finding product...');
    var result = await swell.get('/products', { where: { slug: SLUG } });
    if (!result || !result.results || result.results.length === 0) {
        console.error('Product not found: ' + SLUG);
        process.exit(1);
    }

    var product = result.results[0];
    var pid = product.id;
    console.log('  Found: ' + product.name + ' (ID: ' + pid + ')');

    // Get existing images
    var existingImages = product.images || [];
    console.log('  Existing images: ' + existingImages.length + '\n');

    // ── Build new images array ────────────────────────────────────────
    // Keep the existing main thumbnail, add variant images after it
    var newImages = existingImages.map(function(img) {
        return { id: img.id };
    });

    console.log('Preparing variant images...');
    for (var i = 0; i < variantImages.length; i++) {
        var vi = variantImages[i];
        if (!fs.existsSync(vi.path)) {
            console.log('  \u26a0\ufe0f  Not found: ' + vi.label + ' (' + vi.path + ')');
            continue;
        }
        var imgBuffer = fs.readFileSync(vi.path);
        var base64 = imgBuffer.toString('base64');
        var ext = path.extname(vi.path).slice(1).toLowerCase();
        var mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
        var slug = vi.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

        newImages.push({
            caption: vi.label,
            file: {
                data: base64,
                content_type: mimeType,
                filename: slug + '.' + ext,
            },
        });
        console.log('  \u2705 Prepared: ' + vi.label);
    }

    // ── Update product with all images ────────────────────────────────
    console.log('\nUploading to Swell...');
    var updated = await swell.put('/products/' + pid, {
        images: newImages,
    });

    var imgCount = (updated && updated.images && updated.images.length) || 0;
    console.log('  \u2705 Updated! Total images: ' + imgCount);

    // List all images
    if (updated && updated.images) {
        console.log('\nAll product images:');
        for (var j = 0; j < updated.images.length; j++) {
            var img = updated.images[j];
            var caption = img.caption || '(main thumbnail)';
            var fileId = img.file && img.file.id ? img.file.id : 'n/a';
            console.log('  ' + (j + 1) + '. ' + caption + '  [file: ' + fileId + ']');
        }
    }

    console.log('\n===================================================');
    console.log(' \ud83c\udf89  All variant images uploaded!');
    console.log('===================================================');
}

run().catch(function(err) {
    console.error('\u274c Fatal error:', err.message || err);
    if (err.response) console.error('Response:', JSON.stringify(err.response, null, 2));
});
