import swell from 'swell-js';

// Initialize the Swell client for any client-side components that might need it
const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
const publicKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;

if (storeId && publicKey) {
    swell.init(storeId, publicKey);
} else {
    console.warn('Swell credentials are not fully set in the environment variables.');
}

export default swell;

/**
 * Fetches products from your Swell store using native fetch for Server Components.
 */
export async function getProducts(options: any = {}) {
    if (!storeId || !publicKey) {
        console.error('Missing Swell credentials. Cannot fetch products.');
        // Return a mock object with a debug property so we know it failed due to missing keys
        return { results: [], _debug_missing_keys: true };
    }

    try {
        const auth = Buffer.from(`${publicKey}:`).toString('base64');
        let baseUrl = `https://${storeId}.swell.store/api/products?expand=options&limit=100`;

        if (options.category) {
            baseUrl += `&category=${options.category}`;
        }

        let allResults: any[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const url = `${baseUrl}&page=${page}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache',
                next: { revalidate: 0 }
            });

            if (!response.ok) {
                console.error(`Swell fetch failed with status: ${response.status}`);
                return { results: allResults.length ? allResults : [], _debug_error: response.status };
            }

            const data = await response.json();
            const results = data.results || [];
            allResults = allResults.concat(results);

            // Stop if we got fewer results than the limit (last page)
            if (results.length < 100 || allResults.length >= (data.count || Infinity)) {
                hasMore = false;
            } else {
                page++;
            }
        }

        return { results: allResults, count: allResults.length };
    } catch (error) {
        console.error('Error fetching products from Swell:', error);
        return { results: [], _debug_error: 'fetch_exception' };
    }
}

/**
 * Fetches a single product by slug from Swell
 */
export async function getProductBySlug(slug: string) {
    if (!storeId || !publicKey) return null;

    try {
        // Fetch all products (which works perfectly) and find the matching slug
        // Note: For stores with 1000s of products, pagination would be needed here, 
        // but this works flawlessly for Swell's default structure.
        const response = await getProducts();

        if (!response || !response.results) return null;

        const matchedProduct = response.results.find((p: any) => p.slug === slug);
        return matchedProduct || null;
    } catch (error) {
        console.error('Error fetching single product:', error);
        return null;
    }
}

/**
 * Calculates the lowest possible display price for UI grids.
 * Vital for Swell products that rely entirely on sequential additive variant pricing and have a base price of $0.
 */
export function getLowestDisplayPrice(product: any): number {
    const basePrice = Number(product.price) || 0;
    if (basePrice > 0) return basePrice;
    
    if (product.options && Array.isArray(product.options)) {
        let lowestOptionPrice = Infinity;
        for (const opt of product.options) {
            if (opt.values && Array.isArray(opt.values)) {
                for (const val of opt.values) {
                    let vp = Number(val.price) || 0;
                    // Fallback for options where price is accidentally embedded in the name (e.g. migrated data)
                    if (vp === 0 && val.name && typeof val.name === 'string') {
                        const match = val.name.match(/@\s*\$([0-9.]+)/);
                        if (match && match[1]) {
                            vp = Number(match[1]);
                        }
                    }
                    if (vp > 0 && vp < lowestOptionPrice) {
                        lowestOptionPrice = vp;
                    }
                }
            }
        }
        if (lowestOptionPrice !== Infinity) return lowestOptionPrice;
    }
    return 0; // fallback
}
