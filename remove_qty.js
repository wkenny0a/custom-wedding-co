const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w]+)\s*=\s*(.*)?\s*$/);
    if (match) {
        let val = match[2] || '';
        if (val.startsWith('"')) val = val.slice(1, -1);
        else if (val.startsWith("'")) val = val.slice(1, -1);
        process.env[match[1]] = val;
    }
});
const authHeader = 'Basic ' + Buffer.from(process.env.NEXT_PUBLIC_SWELL_STORE_ID + ':' + process.env.NEXT_PUBLIC_SWELL_SECRET_KEY).toString('base64');

async function removeQuantityTiers() {
    console.log('Fetching product...');
    const prodRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const prodData = await prodRes.json();
    const p = prodData.results[0];
    
    for (const o of p.options) {
        if (o.name === 'Quantity Tiers (Dropdown)') {
            console.log(`Deleting ${o.id} - ${o.name}`);
            await fetch(`https://api.swell.store/products/${p.id}/options/${o.id}`, {
                method: 'DELETE',
                headers: {Authorization: authHeader}
            });
        }
    }
    console.log('Done removing all Quantity Tiers options.');
}

removeQuantityTiers();
