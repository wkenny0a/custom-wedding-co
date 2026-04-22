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

async function fixQty() {
    console.log('Fetching product...');
    const prodRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const prodData = await prodRes.json();
    const p = prodData.results[0];
    const pid = p.id;

    const opt = p.options.find(o => o.name === 'Quantity Tiers');
    if (!opt) {
        console.error('Could not find Quantity Tiers option!');
        return;
    }

    console.log('Updating Quantity Tiers values with absolute prices...');
    const values = Array.from({ length: 100 }, (_, i) => {
        const sets = i + 1;
        const balls = sets * 6;
        const priceNum = 24.99 + (sets - 1) * 19.99;
        const priceStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNum);
        const optName = `${sets} Set (${balls} Golf Balls) @ ${priceStr}`;
        if (sets === 1) return { name: optName };
        return { name: optName, price: parseFloat(((sets - 1) * 19.99).toFixed(2)) };
    });

    const res = await fetch(`https://api.swell.store/products/${pid}/options/${opt.id}`, {
        method: 'PUT',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            values: values
        })
    });
    
    if(!res.ok) {
        console.log('Error or timeout, which is expected for 1200 variants!', await res.text());
    } else {
        console.log('Updated immediately!', await res.json());
    }
}

fixQty().catch(e => console.error(e));
