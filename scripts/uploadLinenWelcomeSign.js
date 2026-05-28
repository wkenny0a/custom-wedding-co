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
        console.log("Uploading Bespoke Linen Wedding Welcome Sign...");

        // Read image file and convert to base64 for Swell file upload
        const imagePath = path.resolve(__dirname, '../product_images/linen_welcome_sign.png');
        let imageFile = null;
        if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const base64 = imageData.toString('base64');
            imageFile = {
                data: base64,
                filename: 'linen-welcome-sign-main.png',
                content_type: 'image/png'
            };
            console.log("✅ Image loaded successfully");
        } else {
            console.warn("⚠️ Image file not found at:", imagePath);
        }

        const productData = {
            name: "Bespoke Linen Wedding Welcome Sign | Custom Fabric Ceremony Banner",
            active: true,
            currency: "USD",
            description: `<p><em>Elevate your celebration with a touch of timeless elegance through our handcrafted, heirloom-quality linen welcome banner, designed to beautifully introduce your love story.</em></p>
<ul>
<li><strong>Artisanal Craftsmanship:</strong> Meticulously crafted from a premium linen-blend fabric that drapes beautifully and catches the natural light.</li>
<li><strong>Bespoke Personalization:</strong> Fully customizable with your unique names, wedding date, and tailored design flourishes featuring elegant serif typography.</li>
<li><strong>Effortless Romance:</strong> Available with delicate, flowing ribbons to add soft movement and a truly romantic aesthetic to your entryway.</li>
<li><strong>Versatile Display:</strong> Choose from antique gold, copper, classic espresso, or pristine cream stands to perfectly complement your venue's atmosphere.</li>
<li><strong>A Keepsake of Your Day:</strong> Designed not just as a welcoming statement, but as a cherished heirloom to remember the moment your forever began.</li>
</ul>`,
            tags: ["linen wedding sign", "fabric welcome sign", "wedding welcome banner", "custom ceremony sign", "linen banner", "wedding decor"],
            meta_title: "Custom Linen Wedding Welcome Sign | Luxury Fabric Ceremony Banner",
            meta_description: "Welcome your guests with timeless elegance. Shop our bespoke handcrafted linen fabric wedding signs, featuring custom serif typography and romantic ribbon accents.",
            slug: "bespoke-linen-wedding-welcome-sign",
            categories: [
                { name: "Wedding Decor" },
                { name: "Ceremony Signs" },
                { name: "Welcome Banners" },
                { name: "Custom Signage" }
            ],
            options: [
                {
                    name: "Size & Style",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "18x24 Inches" },
                        { name: "18x24 Inches +Ribbon" },
                        { name: "24x40 Inches" },
                        { name: "24x40 Inches +Ribbon" },
                        { name: "24x60 Inches" },
                        { name: "24x60 Inches +Ribbon" },
                        { name: "36x60 Inches" },
                        { name: "36x60 Inches +Ribbon" },
                        { name: "36x80 Inches" },
                        { name: "36x80 Inches +Ribbon" },
                        { name: "36x90 Inches" },
                        { name: "36x90 Inches +Ribbon" }
                    ]
                },
                {
                    name: "Stand Options",
                    active: true,
                    input_type: "select",
                    required: true,
                    values: [
                        { name: "No Stand" },
                        { name: "Black Stand" },
                        { name: "Copper Stand" },
                        { name: "Gold Stand" },
                        { name: "White Stand" }
                    ]
                },
                {
                    name: "Names & Event Date",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter the names and event date for your sign"
                },
                {
                    name: "Ribbon Color",
                    active: true,
                    input_type: "short_text",
                    required: false,
                    description: "Only required if +Ribbon style is selected"
                },
                {
                    name: "Design Option",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter your preferred design option"
                },
                {
                    name: "Need-By Date",
                    active: true,
                    input_type: "short_text",
                    required: true,
                    description: "Enter the date you need this item by (MM/DD/YYYY)"
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
        const categoryNames = ["Wedding Decor", "Ceremony Signs", "Welcome Banners", "Custom Signage"];
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

        console.log("\n🎉 Bespoke Linen Wedding Welcome Sign product upload complete!");

    } catch (error) {
        console.error("❌ Error uploading product:", error);
    }
};

uploadProduct();
