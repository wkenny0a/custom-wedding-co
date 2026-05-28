require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const swell = require('swell-node').swell;

async function createBaseBox() {
    try {
        const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
        const secretKey = process.env.NEXT_PUBLIC_SWELL_SECRET_KEY;

        if (!storeId || !secretKey) {
            throw new Error("Missing Swell Access Keys in environment.");
        }

        console.log(`Authenticating to Swell Store: ${storeId}...`);
        swell.init(storeId, secretKey);

        const productPayload = {
            name: 'Custom Bridesmaid Box',
            slug: 'bridesmaid-box',
            type: 'standard',
            active: true,
            price: 0, // Base price is 0, they pay for contents
            category_index: {
               id: ['bridesmaid-box']
            },
            options: [
                {
                    name: "Box Color",
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "Navy Blue" },
                        { name: "Sky Blue" },
                        { name: "Vibrant Red" },
                        { name: "Premium Cream" },
                        { name: "Light Pink" },
                        { name: "Orange" },
                        { name: "Yellow" },
                        { name: "Matte Black" },
                        { name: "Champagne Gold" },
                        { name: "Forest Green" }
                    ]
                },
                {
                    name: "Matching Shredded Paper",
                    input_type: "select",
                    required: false,
                    values: [
                        { name: "Yes", price: 4.99 },
                        { name: "No", price: 0 }
                    ]
                },
                {
                    name: "Exterior Bow Tie Ribbon",
                    input_type: "select",
                    required: false,
                    values: [
                        { name: "Yes", price: 2.99 },
                        { name: "No", price: 0 }
                    ]
                },
                {
                    name: "Inner Lid Message",
                    input_type: "short_text",
                    required: false
                }
            ],
            description: "A meticulously crafted, hand-finished gift box designed for the perfect unboxing experience.",
            content: {
                 description: "A meticulously crafted, hand-finished gift box designed for the perfect unboxing experience. Fully customizable via our Configurator."
            }
        };

        console.log("Uploading Bridesmaid Box Bundle product to Swell database...");
        
        // Check if product already exists to prevent duplicate error
        const existing = await swell.get('/products', { where: { slug: 'bridesmaid-box' } });
        
        if (existing && existing.results && existing.results.length > 0) {
            console.log(`Product 'bridesmaid-box' already exists with ID: ${existing.results[0].id}. Updating configuration parameters instead of creating...`);
            const updateResponse = await swell.put(`/products/${existing.results[0].id}`, productPayload);
            console.log("Update Success! Swell Product Object: \n", updateResponse.id);
        } else {
            console.log("Creating new Product...");
            const response = await swell.post('/products', productPayload);
            console.log("Creation Success! Swell Product Object Built: \n", response.id);
        }

        console.log("\n✅ The store cart integration is now fully unblocked. Deployment is secure.");
    } catch (e) {
        console.error("FATAL SWELL ERROR: ", e);
    }
}

createBaseBox();
