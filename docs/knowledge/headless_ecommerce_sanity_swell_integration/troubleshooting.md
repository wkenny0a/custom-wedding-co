# Headless E-commerce Troubleshooting Guide

## Swell API Specifics

### Invalid Credentials Error
- **Cause:** Incorrect Store ID or Secret Key.
- **Solution:** 
    - Verify `NEXT_PUBLIC_SWELL_STORE_ID` matches your store's slug.
    - Ensure you are using the **Secret Key** (starting with `sk_`), not the Public Key (`pk_`).
    - Verify the key belongs to the correct environment (Proxima vs Sunset, etc.).

### Products Not Visible in Dashboard
- **Cause:** Environment Mismatch.
- **Solution:** Swell separates **Test** and **Live** data.
- Products uploaded using a test Secret Key (`sk_test_...`) will **only** appear in the "Test" view of the Swell Dashboard.
- Toggle the Dashboard between "Test" and "Live" using the switch in the top right or side menu.
- Ensure the Secret Key you use corresponds to the same environment as the Public Key used by your storefront.

### Initialization Errors
- **Cause:** Version 6.x of `swell-node` changed some export patterns.
- **Solution:** Use `require('swell-node').swell` and then call `.init(...)` on that object. Calling `.init()` directly on the required module may result in `swell.init is not a function`.

## Sanity Scripts and Environment Variables

### Seeding Script Fails
- **Cause:** Missing `NEXT_PUBLIC_SANITY_TOKEN` in the execution environment.
- **Solution:** Run with: `NEXT_PUBLIC_SANITY_TOKEN="your_token" npx tsx seed.ts`.
- Ensure the token used has **Write** permissions in the Sanity dashboard.

### Missing Products Template
- **Cause:** Transitioning from dummy data to dynamic props without updating all template references.
- **Solution:** If `ShopCatalog` is updated to require a `products` prop, all instance pages (e.g. `shop/page.tsx`, `shop/[category]/page.tsx`) must fetch and pass those products down even if the filter matches zero results.

## Next.js & Sanity Studio Specifics

### `useCart must be used within a CartProvider` in Studio
- **Cause:** The root `layout.tsx` wraps the whole app (including `/studio`) with a React Context Provider that uses client-side hooks not intended for the CMS.
- **Solution:** Use **Route Groups**. Move the storefront routes into a `(store)` folder with its own `layout.tsx` containing the `CartProvider`. Create a blank root `layout.tsx` that only provides a basic HTML/Body wrapper.

### Stray Console Errors (e.g. Snipcart initialization) after removal
- **Cause:** Persistent browser cache or Service Workers keeping old scripts in memory.
- **Solution:** Perform a **Hard Refresh** (`Cmd + Shift + R`) or clear browser application data for the specific domain/localhost to purge cached third-party scripts.
