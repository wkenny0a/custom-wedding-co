import swell from 'swell-js';

// Initialize the Swell client
// Find your Store ID and Public Key in the Swell dashboard under Settings > API
const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
const publicKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;

if (storeId && publicKey) {
    swell.init(storeId, publicKey);
} else {
    console.warn('Swell credentials are not fully set in the environment variables.');
}

export default swell;

/**
 * Fetches products from your Swell store.
 */
export async function getProducts(options = {}) {
    try {
        const products = await swell.products.list(options);
        return products;
    } catch (error) {
        console.error('Error fetching products from Swell:', error);
        return null;
    }
}
