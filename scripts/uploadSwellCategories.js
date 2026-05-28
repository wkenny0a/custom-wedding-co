require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);
const categories = [
    { title: 'Paper Goods', slug: 'paper-goods', description: 'Elegant invitations, menus, and stationery for your special day' },
    { title: 'Signs', slug: 'signs', description: 'Beautiful welcome signs and displays to guide your guests' },
    { title: 'Guest Books', slug: 'guest-books', description: 'Heirloom-quality guest books to treasure forever' },
    { title: 'Wedding Favors', slug: 'wedding-favors', description: 'Thoughtful personalized favors your guests will love' },
    { title: "Bridesmaids' Gifts", slug: 'bridesmaids-gifts', description: 'Curated gift sets for your bridal party' },
    { title: 'Cake Toppers', slug: 'cake-toppers', description: 'Personalized cake toppers for the sweetest moment' },
    { title: 'Table Décor', slug: 'table-decor', description: 'Place cards, table numbers, and reception details' },
    { title: 'Keepsakes', slug: 'keepsakes', description: 'Memorable keepsakes to cherish forever' },
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
