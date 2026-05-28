require('dotenv').config({ path: '.env.local' });
const fetch = require('node-fetch'); // or native fetch if node 18+

async function testFetch() {
    console.log("Store:", process.env.NEXT_PUBLIC_SWELL_STORE_ID);
    console.log("Key:", process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY);
    
    try {
        const res = await fetch(`https://${process.env.NEXT_PUBLIC_SWELL_STORE_ID}.swell.store/api/products`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY + ':').toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log("Fetch success. Products found:", data?.results?.length);
    } catch(e) {
        console.error(e);
    }
}
testFetch();
