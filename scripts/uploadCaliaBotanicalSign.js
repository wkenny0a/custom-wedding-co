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
        console.log("Uploading The Calia Botanical Welcome Sign...");

        // Read image file and convert to base64 for Swell file upload
        const imagePath = path.resolve(__dirname, '../product_images/calia_botanical_sign.png');
        let imageFile = null;
        if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const base64 = imageData.toString('base64');
            imageFile = {
                data: base64,
                filename: 'calia-botanical-welcome-sign-main.png',
                content_type: 'image/png'
            };
            console.log("✅ Image loaded successfully");
        } else {
            console.warn("⚠️ Image file not found at:", imagePath);
        }

        const productData = {
            name: "The Calia Botanical Welcome Sign | Bespoke Engagement Signage",
            active: true,
            currency: "USD",
            description: `<p><em>Welcome your loved ones with the breathtaking elegance of our bespoke botanical sign, crafted to set a warm, romantic tone for your celebration from the very first glance.</em></p>
<ul>
<li><strong>Bespoke Artistry:</strong> Delicate botanical line-art and elegant Antique Gold accents bring timeless romance to your entryway.</li>
<li><strong>Heirloom Quality:</strong> Printed on premium materials—choose from a gallery-grade matte poster, sturdy foam core, or our signature architectural arch.</li>
<li><strong>Perfectly Proportioned:</strong> Available in an intimate 18x24 or a striking 24x36 statement size to flawlessly suit your venue.</li>
<li><strong>Intimately Yours:</strong> Completely personalized with your names and celebration date in beautifully spaced, classic serif typography to honor your unique love story.</li>
<li><strong>Effortless Elegance:</strong> Arrives expertly printed and carefully shipped directly to your door, ready to display and cherish.</li>
</ul>`,
            tags: ["botanical welcome sign", "engagement party sign", "bespoke signage", "welcome sign", "botanical collection", "wedding decor"],
            meta_title: "The Calia Botanical Welcome Sign | Luxury Engagement Signage",
            meta_description: "Elevate your engagement party with our luxury bespoke welcome sign. Featuring delicate botanical artistry, classic serif typography, and premium heirloom printing.",
            slug: "the-calia-botanical-welcome-sign",
            categories: [
                { name: "Bespoke Signage" },
                { name: "Engagement Party Decor" },
                { name: "Welcome Signs" },
                { name: "The Botanical Collection" }
            ],
            options: [
                {
                    name: "Material",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "Matte Poster" },
                        { name: "1/8 Inch Foam Core Board" },
                        { name: "ARCH Foam Board" }
                    ]
                },
                {
                    name: "Size",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "18x24 inches" },
                        { name: "24x36 inches" }
                    ]
                },
                {
                    name: "Partner 1 Name",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter the first partner's name"
                },
                {
                    name: "Partner 2 Name",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter the second partner's name"
                },
                {
                    name: "Event Date",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter your event date"
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
        const categoryNames = ["Bespoke Signage", "Engagement Party Decor", "Welcome Signs", "The Botanical Collection"];
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

        console.log("\n🎉 The Calia Botanical Welcome Sign product upload complete!");

    } catch (error) {
        console.error("❌ Error uploading product:", error);
    }
};

uploadProduct();
