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
                        { name: "Gold" },
                        { name: "Silver" },
                        { name: "White" }
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
                    name: "Design Style",
                    active: true,
                    input_type: "select",
                    variant: true,
                    required: true,
                    values: [
                        { name: "Design #1" },
                        { name: "Design #2" },
                        { name: "Design #3" },
                        { name: "Design #4" },
                        { name: "Design #5" },
                        { name: "Design #6" },
                        { name: "Design #7" },
                        { name: "Design #8" },
                        { name: "Design #9" },
                        { name: "Design #10" },
                        { name: "Design #11" },
                        { name: "Design #12 (Custom Design)" }
                    ]
                },
                {
                    name: "Names or Initials",
                    active: true,
                    input_type: "short_text",
                    variant: false,
                    required: true,
                    description: "Enter the names or initials exactly as you would like them engraved."
                },
                {
                    name: "Event Date",
                    active: true,
                    input_type: "short_text",
                    variant: false,
                    required: true,
                    description: "e.g. October 12, 2026"
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
