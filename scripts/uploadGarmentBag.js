require('dotenv').config({ path: '.env.local' });
const swell = require('swell-node').swell;
const fs = require('fs');
const path = require('path');

// Initialize Swell Client
swell.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.NEXT_PUBLIC_SWELL_SECRET_KEY
);

const PRODUCT_SLUG = 'personalized-heirloom-canvas-leather-garment-bag';

// Path to the generated hero image
const IMAGE_PATH = path.resolve(__dirname, '../generated_images/garment_bag_hero.webp');

const uploadProduct = async () => {
    try {
        console.log("🧳 Uploading Personalized Heirloom Canvas & Leather Garment Bag...\n");

        if (!process.env.NEXT_PUBLIC_SWELL_SECRET_KEY) {
            console.error('ERROR: NEXT_PUBLIC_SWELL_SECRET_KEY is missing from .env.local');
            process.exit(1);
        }

        // ── Step 1: Prepare image data ──────────────────────────────
        let imageData = null;
        if (fs.existsSync(IMAGE_PATH)) {
            const imageBuffer = fs.readFileSync(IMAGE_PATH);
            const base64 = imageBuffer.toString('base64');
            imageData = {
                data: base64,
                content_type: 'image/webp',
                filename: 'garment-bag-hero.webp'
            };
            console.log("✅ Image loaded from:", IMAGE_PATH);
        } else {
            console.warn("⚠️  Image not found at:", IMAGE_PATH, "— uploading without image.");
        }

        // ── Step 2: Ensure categories exist ─────────────────────────
        const categoryNames = [
            'Groomsmen Gifts',
            'Bespoke Wedding Accessories',
            'Luxury Travel Goods',
            'Gifts for the Groom'
        ];

        const categorySlugs = categoryNames.map(name =>
            name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        );

        const categoryIds = [];
        for (let i = 0; i < categoryNames.length; i++) {
            const slug = categorySlugs[i];
            const name = categoryNames[i];

            const existing = await swell.get('/categories', {
                where: { slug }
            });

            if (existing && existing.results && existing.results.length > 0) {
                categoryIds.push(existing.results[0].id);
                console.log(`📂 Category exists: ${name}`);
            } else {
                const created = await swell.post('/categories', {
                    name,
                    slug,
                    active: true
                });
                categoryIds.push(created.id);
                console.log(`📂 Created category: ${name}`);
            }
        }

        // ── Step 3: Build product data ──────────────────────────────
        const productData = {
            name: "Personalized Heirloom Canvas & Leather Garment Bag",
            slug: PRODUCT_SLUG,
            active: true,
            price: 44.40,
            compare_at_price: 0,
            currency: "USD",
            description: `Celebrate the journey to the altar with a bespoke, heirloom-quality garment bag, thoughtfully crafted to protect his most important attire in timeless style. 
<ul>
<li><b>Artisanal Craftsmanship:</b> Woven from premium, high-density cotton canvas and accented with refined faux leather handles for enduring, classic elegance.</li>
<li><b>Generous Capacity:</b> Expertly tailored with a full 3-inch gusset (42" L x 23" W), offering ample space to comfortably cradle up to two suits alongside his favorite shirts.</li>
<li><b>Effortless Travel:</b> Features a smooth, full-length pull-down zipper pocket and a dedicated easy-hang tab to keep garments crisp and organized on the go.</li>
<li><b>Bespoke Detailing:</b> Custom embroidered with his name or monogram in your choice of elegant thread colors, ensuring a truly one-of-a-kind keepsake.</li>
<li><b>A Meaningful Keepsake:</b> An intimate, sophisticated gift for the groom, groomsmen, or father of the bride that will be cherished long after the vows are spoken.</li>
</ul>`,
            tags: [
                "garment bag", "groomsmen gifts", "personalized garment bag",
                "monogrammed suit bag", "wedding accessories", "luxury travel",
                "gifts for the groom", "bespoke wedding"
            ],
            meta_title: "Personalized Heirloom Garment Bag | Luxury Groomsmen Gifts",
            meta_description: "Gift the men in your wedding party a bespoke, heirloom-quality canvas and leather suit bag. Custom monogrammed for a timeless, personal touch. Shop our luxury wedding collection.",
            category_index: {
                id: categoryIds
            },
            options: [
                {
                    name: "Bag Color",
                    input_type: "select",
                    active: true,
                    required: true,
                    values: [
                        { name: "Black" },
                        { name: "Brown" },
                        { name: "Cream" }
                    ]
                },
                {
                    name: "Embroidery Thread Color",
                    input_type: "select",
                    active: true,
                    required: true,
                    values: [
                        { name: "White" },
                        { name: "Cream" },
                        { name: "Silver" },
                        { name: "Gray" },
                        { name: "Charcoal" },
                        { name: "Black" },
                        { name: "Champagne" },
                        { name: "Gold" },
                        { name: "Bronze Antique" },
                        { name: "Stone" },
                        { name: "Espresso" },
                        { name: "Burnt Orange" },
                        { name: "Olive" },
                        { name: "Sage" },
                        { name: "Misty Blue" },
                        { name: "Lemon" },
                        { name: "Clementine" },
                        { name: "Light Pink" },
                        { name: "Hot Pink" },
                        { name: "Coral" },
                        { name: "Turkish Rose" },
                        { name: "Rose Gold" },
                        { name: "Lilac" },
                        { name: "Plum" },
                        { name: "Berry" },
                        { name: "Burgundy" },
                        { name: "Tuscan Red" },
                        { name: "Caribbean Blue" },
                        { name: "Emerald" },
                        { name: "Evergreen" },
                        { name: "Teal" },
                        { name: "Light Blue" },
                        { name: "Royal Blue" },
                        { name: "Navy Blue" }
                    ]
                },
                {
                    name: "Personalized Name or Monogram",
                    input_type: "short_text",
                    active: true,
                    required: true,
                    description: "Please provide the exact casing and order of letters. For traditional monograms, provide First, Last, Middle initials."
                }
            ]
        };

        // ── Step 4: Add image if available ──────────────────────────
        if (imageData) {
            productData.images = [{
                file: {
                    data: imageData.data,
                    content_type: imageData.content_type,
                    filename: imageData.filename
                }
            }];
        }

        // ── Step 5: Create or update product ────────────────────────
        const existing = await swell.get('/products', {
            where: { slug: PRODUCT_SLUG }
        });

        let product;
        if (existing && existing.results && existing.results.length > 0) {
            console.log("\n📝 Product already exists, updating...");
            product = await swell.put(`/products/${existing.results[0].id}`, productData);
            console.log("✅ Successfully updated product!");
        } else {
            console.log("\n📦 Creating new product...");
            product = await swell.post('/products', productData);
            console.log("✅ Successfully created product!");
        }

        console.log("\n── Product Summary ──────────────────────────────");
        console.log(`   Name:  ${product.name}`);
        console.log(`   Slug:  ${product.slug}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   ID:    ${product.id}`);
        console.log(`   Active: ${product.active}`);
        console.log(`   Options: ${(product.options || []).length}`);
        if (product.images && product.images.length > 0) {
            console.log(`   Images: ${product.images.length}`);
        }
        console.log("─────────────────────────────────────────────────\n");
        console.log("🎉 Done! Product is live on your Swell store.");

    } catch (error) {
        console.error("❌ Error uploading product:", error.message || error);
        if (error.response) {
            console.error("Response:", JSON.stringify(error.response, null, 2));
        }
    }
};

uploadProduct();
