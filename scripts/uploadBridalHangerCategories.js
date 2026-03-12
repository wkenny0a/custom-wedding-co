require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const categories = [
    {
        title: 'Bridesmaid Gifts',
        slug: 'bridesmaid-gifts',
        description: 'Thoughtfully crafted gifts to honor and celebrate your bridesmaids.',
    },
    {
        title: 'Wedding Day Accessories',
        slug: 'wedding-day-accessories',
        description: 'Elegant accessories to complete your wedding day aesthetic.',
    },
    {
        title: 'Bridal Party Keepsakes',
        slug: 'bridal-party-keepsakes',
        description: 'Timeless keepsakes your bridal party will treasure forever.',
    },
    {
        title: 'Getting Ready Details',
        slug: 'getting-ready-details',
        description: 'Beautiful details for picture-perfect getting-ready moments.',
    },
];

async function uploadCategories() {
    console.log('Starting bridal hanger category upload to Swell...');

    if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
        console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
        process.exit(1);
    }

    try {
        for (const cat of categories) {
            console.log(`Checking category: ${cat.title}...`);

            const existing = await swell.get('/categories', {
                where: { slug: cat.slug }
            });

            if (existing && existing.results && existing.results.length > 0) {
                console.log(`  ↳ Category '${cat.title}' already exists (ID: ${existing.results[0].id}). Skipping.`);
                continue;
            }

            await swell.post('/categories', {
                name: cat.title,
                slug: cat.slug,
                description: cat.description,
                active: true,
            });
            console.log(`  ✅ Created: ${cat.title}`);
        }

        console.log('\n🎉 Category upload complete!');
    } catch (error) {
        console.error('❌ Error uploading categories:', error.message || error);
    }
}

uploadCategories();
