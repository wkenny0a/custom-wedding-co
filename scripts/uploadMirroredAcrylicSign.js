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
        console.log("Uploading Bespoke Mirrored Acrylic Wedding Welcome Sign...");

        // Read image file and convert to base64 for Swell file upload
        const imagePath = path.resolve(__dirname, '../product_images/mirrored_acrylic_welcome_sign.png');
        let imageFile = null;
        if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const base64 = imageData.toString('base64');
            imageFile = {
                data: base64,
                filename: 'mirrored-acrylic-welcome-sign-main.png',
                content_type: 'image/png'
            };
            console.log("✅ Image loaded successfully");
        } else {
            console.warn("⚠️ Image file not found at:", imagePath);
        }

        const productData = {
            name: "Bespoke Mirrored Acrylic Wedding Welcome Sign | Heirloom Gold & Silver Decor",
            active: true,
            currency: "USD",
            description: `<p><em>Welcome your guests with a breathtaking, heirloom-quality mirrored acrylic sign, meticulously customized to reflect the timeless elegance of your love story.</em></p>
<ul>
<li><strong>Handcrafted Elegance:</strong> Choose between radiant antique gold or luminous silver mirror finishes that beautifully catch the warm, romantic light of your venue.</li>
<li><strong>Bespoke Artistry:</strong> Intimately personalized with your names and wedding date in classic, elegant typography to create a truly one-of-a-kind piece.</li>
<li><strong>Tailored to Your Vision:</strong> Select from four delicate silhouette shapes and six timeless design layouts to perfectly complement your minimalist aesthetic.</li>
<li><strong>Heirloom Quality:</strong> Crafted from premium, shatter-resistant acrylic, designed to be displayed and cherished in your home long after your vows are spoken.</li>
<li><strong>Effortless Display:</strong> Available with a curated metal or natural wooden easel, ensuring a flawless and sophisticated presentation at your ceremony or reception entrance.</li>
</ul>`,
            tags: ["mirrored acrylic sign", "wedding welcome sign", "gold mirror sign", "silver mirror sign", "heirloom wedding decor", "luxury wedding sign"],
            meta_title: "Bespoke Mirrored Wedding Welcome Sign | Custom Heirloom Decor",
            meta_description: "Elevate your wedding reception with our luxury bespoke mirrored acrylic welcome sign. Handcrafted in antique gold or silver for a timeless, elegant entrance.",
            slug: "bespoke-mirrored-acrylic-wedding-welcome-sign",
            categories: [
                { name: "Wedding Reception Decor" },
                { name: "Bespoke Signage" },
                { name: "Luxury Wedding Details" },
                { name: "Heirloom Keepsakes" }
            ],
            options: [
                {
                    name: "Material & Size",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "Silver Acrylic 12x18\"" },
                        { name: "Silver Acrylic 18x24\"" },
                        { name: "Silver Acrylic 24x36\"" },
                        { name: "Gold Acrylic 12x18\"" },
                        { name: "Gold Acrylic 18x24\"" },
                        { name: "Gold Acrylic 24x36\"" }
                    ]
                },
                {
                    name: "Easel Option",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "Sign Only" },
                        { name: "Sign + Metal Easel" },
                        { name: "Sign + Wooden Easel" }
                    ]
                },
                {
                    name: "Couple's Names",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter the couple's names as they should appear on the sign"
                },
                {
                    name: "Wedding Date",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter the wedding date (e.g. August 24, 2026)"
                },
                {
                    name: "Design Number",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "1" },
                        { name: "2" },
                        { name: "3" },
                        { name: "4" },
                        { name: "5" },
                        { name: "6" }
                    ]
                },
                {
                    name: "Acrylic Shape",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "1" },
                        { name: "2" },
                        { name: "3" },
                        { name: "4" }
                    ]
                },
                {
                    name: "Font Choice",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter your preferred font style"
                },
                {
                    name: "Text Color",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "White" },
                        { name: "Black" }
                    ]
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
        const categoryNames = ["Wedding Reception Decor", "Bespoke Signage", "Luxury Wedding Details", "Heirloom Keepsakes"];
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

        console.log("\n🎉 Bespoke Mirrored Acrylic Wedding Welcome Sign product upload complete!");

    } catch (error) {
        console.error("❌ Error uploading product:", error);
    }
};

uploadProduct();
