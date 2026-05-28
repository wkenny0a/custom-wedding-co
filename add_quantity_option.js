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

async function addQuantityTiers() {
    console.log('Fetching product...');
    const prodRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const prodData = await prodRes.json();
    const pid = prodData.results[0].id;
    
    console.log(`Adding Quantity Tiers option to product ${pid}...`);
    const values = Array.from({ length: 100 }, (_, i) => {
        const sets = i + 1;
        const balls = sets * 6;
        const optName = `${sets} Set (${balls} Golf Balls)`;
        if (sets === 1) return { name: optName };
        return { name: optName, price: parseFloat(((sets - 1) * 19.99).toFixed(2)) };
    });

    const body = {
        name: 'Quantity Tiers (Dropdown)',
        variant: true,
        active: true,
        required: true,
        input_type: 'select',
        values: values
    };

    const res = await fetch(`https://api.swell.store/products/${pid}/options`, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    
    if (!res.ok) {
        throw new Error(await res.text());
    }
    
    const result = await res.json();
    console.log('Successfully added Quantity Tiers option!');
    console.log(result.id);
}

addQuantityTiers().catch(e => console.error(e));
