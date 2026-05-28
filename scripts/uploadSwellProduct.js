require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;

// Initialize Swell Client
swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const uploadProduct = async () => {
    try {
        console.log("Uploading Classic Minimalist Wedding Welcome Sign...");

        // Note: Swell handles options and variants. We'll set up the options.
        // Option 1: Material & Size (12 values)
        // Option 2: Design Style (12 values)

        const productData = {
            name: "Classic Minimalist Wedding Welcome Sign",
            active: true,
            price: 24.95,
            currency: "USD",
            description: "<p><b>Elevate your wedding décor with our custom welcome sign, offering a myriad of personalization choices.</b></p><p>Whether you lean towards timeless elegance or contemporary flair, this sign perfectly matches your wedding theme and makes a stunning first impression.</p><p><b>Material & Size Options:</b></p><ul><li><b>White Acrylic:</b> 1/8 inch (3mm) thick. Durable, smooth finish, perfect for a sleek, modern look.</li><li><b>White Foam Board:</b> 3/16 inch (5mm) thick. Lightweight yet sturdy, made from high-quality foam for easy display and transport.</li></ul><p><b>The Details:</b></p><ul><li><b>No Vinyl Stickers:</b> All of our signs are painted with a thick, crisp waterproof paint for ultimate durability and a high-end look.</li><li><b>12 Distinct Styles:</b> Choose from beautiful floral arrangements or sleek modern typography.</li><li><b>Display:</b> Designed to fit on standard wedding easels (Please note: Stand/easel is not included).</li></ul>",
            tags: ["wedding welcome sign", "minimalist wedding", "acrylic sign", "custom wedding print", "foam board sign"],
            meta_title: "Custom Classic Wedding Welcome Sign | Acrylic & Foam Board",
            meta_description: "Set the perfect tone for your special day with our customized minimalist wedding welcome signs. Available in premium painted acrylic or lightweight foam board.",
            slug: "custom-classic-wedding-welcome-sign",
            options: [
                {
                    name: "Material & Size",
                    values: [
                        { name: "Acrylic - 18x12" },
                        { name: "Acrylic - 24x18" },
                        { name: "Acrylic - 36x24" },
                        { name: "Foam - 17x11" },
                        { name: "Foam - 24x18" },
                        { name: "Foam - 36x24" }
                    ]
                },
                {
                    name: "Design Style",
                    values: [
                        { name: "WEL 001" },
                        { name: "WEL 002" },
                        { name: "WEL 003" },
                        { name: "WEL 004" },
                        { name: "WEL 005" },
                        { name: "WEL 006" },
                        { name: "STYLE 1" },
                        { name: "STYLE 2" },
                        { name: "STYLE 3" },
                        { name: "STYLE 4" },
                        { name: "STYLE 5" },
                        { name: "STYLE 6" }
                    ]
                }
            ]
        };

        const existing = await swell.get('/products', {
            where: { slug: productData.slug }
        });

        if (existing && existing.results && existing.results.length > 0) {
            console.log("Product already exists, updating...");
            await swell.put(`/products/${existing.results[0].id}`, productData);
            console.log("✅ Successfully updated product!");
        } else {
            console.log("Creating new product...");
            await swell.post('/products', productData);
            console.log("✅ Successfully created product!");
        }

    } catch (error) {
        console.error("❌ Error uploading product:", error);
    }
};

uploadProduct();
