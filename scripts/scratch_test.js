const fs = require('fs');
try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let val = match[2] || '';
            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
            else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
            process.env[match[1]] = val;
        }
    });
} catch(e) {}

const storeId = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
const secretKey = process.env.NEXT_PUBLIC_SWELL_SECRET_KEY;
const authHeader = 'Basic ' + Buffer.from(storeId + ':' + secretKey).toString('base64');

async function testClear() {
    console.log('Fetching can cooler...');
    const res = await fetch(`https://api.swell.store/products?where[slug]=bespoke-beers-birdies-neoprene-can-cooler`, { headers: { Authorization: authHeader }});
    const json = await res.json();
    const prod = json.results[0];
    
    if (prod.options) {
        for (const opt of prod.options) {
            console.log('Deleting option:', opt.name, opt.id);
            const delRes = await fetch(`https://api.swell.store/products/${prod.id}/options/${opt.id}`, {
                method: 'DELETE',
                headers: { Authorization: authHeader, 'Accept': 'application/json' }
            });
            console.log('Delete status:', delRes.status);
            const delText = await delRes.text();
            console.log('Delete response:', delText);
        }
    }
}
testClear().catch(console.error);
