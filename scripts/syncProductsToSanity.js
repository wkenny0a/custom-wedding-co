require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const { createClient } = require('@sanity/client');

// Initialize Swell Client
swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

// Initialize Sanity Client
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
    token: process.env.SANITY_API_TOKEN, // Needs write access
    useCdn: false,
});

async function syncProducts() {
    try {
        console.log("Fetching active products from Swell...");

        // Let's get up to 100 products from Swell
        const swellProducts = await swell.get('/products', {
            limit: 100,
            where: { active: true }
        });

        if (!swellProducts || !swellProducts.results || swellProducts.results.length === 0) {
            console.log("No active products found in Swell.");
            return;
        }

        console.log(`Found ${swellProducts.results.length} products. Syncing to Sanity...`);

        for (const swellProd of swellProducts.results) {
            // Check if product already exists in Sanity
            const existing = await sanityClient.fetch(
                `*[_type == "product" && slug.current == $slug][0]`,
                { slug: swellProd.slug }
            );

            if (existing) {
                console.log(`Product already exists in Sanity: ${swellProd.name}`);
                continue;
            }

            // Map Swell data to Sanity schema
            const newSanityProduct = {
                _type: 'product',
                name: swellProd.name,
                slug: {
                    _type: 'slug',
                    current: swellProd.slug
                },
                price: swellProd.price || 0,
                rating: 5,
                reviewCount: 0,
                // Optional: we could download images and upload to Sanity here, 
                // but since Next.js merges them on the frontend, we just need the slug stub for the pageBuilder!
            };

            await sanityClient.create(newSanityProduct);
            console.log(`✅ Successfully created in Sanity: ${swellProd.name}`);
        }

        console.log("Sync complete!");

    } catch (error) {
        console.error("❌ Error syncing products:", error);
    }
}

syncProducts();
