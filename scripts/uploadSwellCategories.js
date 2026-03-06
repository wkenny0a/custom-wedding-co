require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);
const categories = [
    { title: 'Paper Goods', slug: 'paper-goods', description: 'Elegant paper goods for your special day' },
    { title: 'Décor & Signage', slug: 'decor-signage', description: 'Beautiful decor and signs to guide your guests' },
    { title: 'Keepsakes', slug: 'keepsakes', description: 'Memorable keepsakes to cherish forever' },
    { title: 'Sentimental Gifts', slug: 'sentimental-gifts', description: 'Thoughtful gifts for your loved ones' },
];

async function uploadCategories() {
    console.log('Starting category upload to Swell...');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
        console.error('You need the secret key (not the public key) to use the Backend API.');
        process.exit(1);
    }

    try {
        for (const cat of categories) {
            console.log(`Uploading category: ${cat.title}...`);

            // Check if category already exists
            const existing = await swell.get('/categories', {
                where: { slug: cat.slug }
            });

            if (existing && existing.results && existing.results.length > 0) {
                console.log(`Category '${cat.title}' already exists. Skipping.`);
                continue;
            }

            // Create new category
            await swell.post('/categories', {
                name: cat.title,
                slug: cat.slug,
                description: cat.description,
                active: true
            });
            console.log(`✅ Successfully created: ${cat.title}`);
        }

        console.log('🎉 Category upload complete!');
    } catch (error) {
        console.error('❌ Error uploading categories:', error.message || error);
    }
}

uploadCategories();
