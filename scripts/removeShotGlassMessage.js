require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_SECRET_KEY);

const PRODUCT_ID = '69b2d1fe9eb4fb00128a5e38';

(async () => {
    const p = await swell.get('/products/' + PRODUCT_ID, { expand: 'options' });
    console.log('Found:', p.name);

    const opts = p.options || [];
    console.log('Current options:', opts.map(o => o.name).join(', '));

    // Mark "Custom Message or Slogan" as inactive
    const updatedOptions = opts.map(o => {
        if (o.name.toLowerCase().includes('custom message')) {
            console.log('Setting inactive:', o.name);
            return { id: o.id, active: false };
        }
        return { id: o.id };
    });

    const updated = await swell.put('/products/' + PRODUCT_ID, {
        options: updatedOptions
    });

    console.log('\n✅ Done!');
    console.log('Active options:', (updated.options || []).filter(o => o.active !== false).map(o => o.name).join(', '));
    console.log('Inactive options:', (updated.options || []).filter(o => o.active === false).map(o => o.name).join(', '));
})();
