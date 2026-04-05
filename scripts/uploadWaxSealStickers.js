require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

// Initialize Swell Client
swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const uploadProduct = async () => {
    try {
        console.log("Uploading Bespoke Handmade Wax Seal Stickers...");

        // Read image file and convert to base64 for Swell file upload
        const imagePath = path.resolve(__dirname, '../product_images/wax_seal_product.png');
        let imageFile = null;
        if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const base64 = imageData.toString('base64');
            imageFile = {
                data: base64,
                filename: 'wax-seal-stickers-main.png',
                content_type: 'image/png'
            };
            console.log("✅ Image loaded successfully");
        } else {
            console.warn("⚠️ Image file not found at:", imagePath);
        }

        const productData = {
            name: "Bespoke Handmade Wax Seal Stickers | Custom Monogram & Botanical Envelope Seals",
            active: true,
            currency: "USD",
            description: `<p><em>Celebrate Love with a Personal Touch.</em></p>
<p>Elevate your invitation suite with our heirloom-quality, self-adhesive wax seals, meticulously handcrafted to add a touch of timeless romance to your special day.</p>
<ul>
<li><strong>Artisanal Craftsmanship:</strong> Each seal is individually poured and stamped by hand, preserving the romantic, organic edges and subtle unique variations of traditional wax.</li>
<li><strong>Effortless Elegance:</strong> Pre-applied with a premium, strong self-adhesive backing—simply peel and press to your handmade paper or linen envelopes for a flawless, secure finish.</li>
<li><strong>Bespoke Details:</strong> Choose from our curated collection of 40+ delicate botanical and monogram designs, or upload your own custom artwork.</li>
<li><strong>Curated Palette:</strong> Available in 50 exquisite, richly pigmented shades to perfectly complement your color aesthetic.</li>
<li><strong>Enduring Quality:</strong> Crafted from a flexible, high-end wax blend specifically designed to survive the modern postal journey beautifully intact.</li>
</ul>`,
            tags: ["wax seal", "wax seal stickers", "wedding invitations", "envelope seals", "custom monogram", "botanical seal", "wedding stationery"],
            meta_title: "Custom Handmade Wax Seal Stickers | Luxury Wedding Invitations",
            meta_description: "Add a bespoke, romantic touch to your wedding invitations with our handcrafted, self-adhesive custom wax seals. Available in 50 elegant colors and 40+ custom monogram designs.",
            slug: "bespoke-handmade-wax-seal-stickers",
            categories: [
                { name: "Wedding Stationery" },
                { name: "Invitation Embellishments" },
                { name: "Bespoke Details" }
            ],
            options: [
                {
                    name: "Color",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "#01 White" },
                        { name: "#02 Pearl White" },
                        { name: "#03 Milky White" },
                        { name: "#04 Light Pink" },
                        { name: "#05 Clean Powder" },
                        { name: "#06 Water Powder" },
                        { name: "#07 Penang Orange" },
                        { name: "#08 Apricot" },
                        { name: "#09 Rose Gold" },
                        { name: "#10 Orange Red" },
                        { name: "#11 Watermelon Red" },
                        { name: "#12 Big Red" },
                        { name: "#13 Chinese Red" },
                        { name: "#14 Wine Red" },
                        { name: "#15 Purple Red" },
                        { name: "#16 Brown Red" },
                        { name: "#17 New Wine Red" },
                        { name: "#18 Flame Red" },
                        { name: "#19 Deep Red" },
                        { name: "#20 Lilac Purple" },
                        { name: "#21 Pearlescent Purple" },
                        { name: "#22 Purple" },
                        { name: "#23 Sauce Purple" },
                        { name: "#24 Aubergine" },
                        { name: "#25 Silver" },
                        { name: "#26 Green Silver" },
                        { name: "#27 Snow Blue" },
                        { name: "#28 Light Blue" },
                        { name: "#29 Tile Blue" },
                        { name: "#30 Dark Blue" },
                        { name: "#31 Sky Blue" },
                        { name: "#32 Aquamarine" },
                        { name: "#33 Jade" },
                        { name: "#34 Mint Green" },
                        { name: "#35 Tender Green" },
                        { name: "#36 Mustard" },
                        { name: "#37 Greenish Gold" },
                        { name: "#38 Pine Green" },
                        { name: "#39 Grass Green" },
                        { name: "#40 Duck Green" },
                        { name: "#41 Pearl Rice" },
                        { name: "#42 Pure Gold" },
                        { name: "#43 Golden" },
                        { name: "#44 Light Yellow" },
                        { name: "#45 Light Gold" },
                        { name: "#46 Orange Gold" },
                        { name: "#47 Champagne Gold" },
                        { name: "#48 Bronze Gold" },
                        { name: "#49 Bronze" },
                        { name: "#50 Black" }
                    ]
                },
                {
                    name: "Quantity Pack",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "5" },
                        { name: "10" },
                        { name: "20" },
                        { name: "30" },
                        { name: "40" },
                        { name: "50" },
                        { name: "60" },
                        { name: "70" },
                        { name: "80" },
                        { name: "90" },
                        { name: "100" },
                        { name: "125" },
                        { name: "150" },
                        { name: "200" },
                        { name: "250" },
                        { name: "300" },
                        { name: "350" },
                        { name: "400" },
                        { name: "450" },
                        { name: "500" },
                        { name: "550" },
                        { name: "600" }
                    ]
                },
                {
                    name: "Design Selection",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter Design # (e.g., Design #12)"
                },
                {
                    name: "Personalization Details",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter Initials, Names, or Date for your seal"
                },
                {
                    name: "Custom Logo Upload",
                    active: true,
                    input_type: "long_text",
                    required: false,
                    description: "Upload custom artwork (Optional) — Please email your file to info@customweddingco.com with your order number"
                }
            ]
        };

        // Add images if loaded
        if (imageFile) {
            productData.images = [
                {
                    file: imageFile
                }
            ];
        }

        const existing = await swell.get('/products', {
            where: { slug: productData.slug }
        });

        let productId;
        if (existing && existing.results && existing.results.length > 0) {
            console.log("Product already exists, updating...");
            const result = await swell.put(`/products/${existing.results[0].id}`, productData);
            productId = existing.results[0].id;
            console.log("✅ Successfully updated product!");
        } else {
            console.log("Creating new product...");
            const result = await swell.post('/products', productData);
            productId = result.id;
            console.log("✅ Successfully created product! ID:", productId);
        }

        // Ensure categories exist
        const categoryNames = ["Wedding Stationery", "Invitation Embellishments", "Bespoke Details"];
        for (const catName of categoryNames) {
            const catSlug = catName.toLowerCase().replace(/\s+/g, '-');
            const existingCat = await swell.get('/categories', {
                where: { slug: catSlug }
            });
            if (!existingCat || !existingCat.results || existingCat.results.length === 0) {
                await swell.post('/categories', {
                    name: catName,
                    slug: catSlug,
                    active: true
                });
                console.log(`✅ Created category: ${catName}`);
            } else {
                console.log(`Category '${catName}' already exists.`);
            }
        }

        console.log("\n🎉 Wax Seal Stickers product upload complete!");

    } catch (error) {
        console.error("❌ Error uploading product:", error);
    }
};

uploadProduct();
