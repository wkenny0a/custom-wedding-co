# Deployment and Environment Integration

## Required Environment Variables (.env.local)

### Sanity (Content Management)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: The unique project ID from Sanity.
- `NEXT_PUBLIC_SANITY_DATASET`: Usually "production".
- `NEXT_PUBLIC_SANITY_TOKEN`: **(Secret)** Write token for seeding scripts only.

### Swell (Commerce Engine)
- `NEXT_PUBLIC_SWELL_STORE_ID`: Your store's slug or ID.
- `NEXT_PUBLIC_SWELL_PUBLIC_KEY`: Used for `swell-js` on the client.
- `NEXT_PUBLIC_SWELL_SECRET_KEY`: **(Secret)** Used for backend operations and seeding. **Warning:** Ensure this key matches the environment (test/live) configured in the Swell dashboard.

## Environment Management (Swell Dashboard)
Swell operates two distinct data environments: **Test** and **Live**.
- Products uploaded using a test Secret Key (`sk_test_...`) will **only** appear in the "Test" view of the Swell Dashboard.
- If products are missing in the dashboard, verify that the dashboard environment toggle matches the API key type in `.env.local`.
