# Hybrid Product Page Builder Architecture

In this headless e-commerce setup, we divide responsibilities between two platforms to maximize flexibility:

## Separation of Concerns

1. **Swell (Commerce & Backend)**
    - **Single Source of Truth** for: Pricing, Inventory, Product Options (variants), Cart, and Checkout.
    - **Custom Data Fields**: Any field that must appear on a receipt or in calculations (like "Wedding Date" or "Custom Names") **must** exist as an option in the Swell product schema.

2. **Sanity (Content & Layout)**
    - **Master of Layout**: Defines *how* the page is organized.
    - **Dynamic Sections**: CMS users can drag-and-drop "blocks" (Hero, FAQ, Related Products, Tabs) into any order.
    - **Non-Standard Content**: Managing FAQs, Review highlights, or custom marketing copy that doesn't belong in a traditional e-commerce database.

## Integration Flow

1. **Dynamic Routing**: The Next.js route `/products/[slug]/page.tsx` is the orchestrator.
2. **Parallel Fetching**:
    - `swellProduct = await getProductBySlug(slug)`
    - `sanityProduct = await client.fetch(productBySlugQuery, { slug })`
3. **The Merge**:
    - The page builder array from `sanityProduct` is mapped over.
    - For the **Product Hero** block, the `swellProduct` data (price, options, etc.) is passed in so the **Add to Cart** button remains functional.
    - For other blocks (FAQ, Related Products), the Sanity data is used to render specific UI components.
4. **Fallback Strategy**: If `sanityProduct.pageBuilder` is empty, the route renders a hard-coded "Default Layout" so that old or newly-added products aren't broken before a CMS user builds their page.

## Key Benefits
- **No-Code Page Design**: Marketing teams can reorder pages without developer help.
- **Product-Level Customization**: Allows for distinct designs for "Best Sellers" vs. "Clearance" items.
- **Maintainable Commerce**: Pricing and checkout remain securely managed in a dedicated e-commerce platform.
