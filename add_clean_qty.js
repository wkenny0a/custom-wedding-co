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

async function fixOptions() {
    console.log('Fetching product...');
    const prodRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const prodData = await prodRes.json();
    const p = prodData.results[0];
    const pid = p.id;

    console.log('Adding Quantity Tiers first...');
    const values = Array.from({ length: 100 }, (_, i) => {
        const sets = i + 1;
        const balls = sets * 6;
        const priceNum = 24.99 + (sets - 1) * 19.99;
        const priceStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNum);
        const optName = `${sets} Set (${balls} Golf Balls) @ ${priceStr}`;
        if (sets === 1) return { name: optName };
        return { name: optName, price: parseFloat(((sets - 1) * 19.99).toFixed(2)) };
    });

    const addRes = await fetch(`https://api.swell.store/products/${pid}/options`, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Quantity Tiers',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: values
        })
    });
    const addData = await addRes.json();
    console.log('Added Quantity Tiers!', addData.id);

    // Reorder options to make Quantity Tiers first
    console.log('Reordering options...');
    const updatedProdRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const updatedData = await updatedProdRes.json();
    const up = updatedData.results[0];

    const qtyId = addData.id;
    // Get all options except the new one
    const otherOptions = up.options.filter(o => o.id !== qtyId).map(o => ({ id: o.id }));
    const newOptionsOrder = [{ id: qtyId }, ...otherOptions];

    const putRes = await fetch(`https://api.swell.store/products/${pid}`, {
        method: 'PUT',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ options: newOptionsOrder })
    });

    if(!putRes.ok) {
        console.error('Failed to reorder:', await putRes.text());
        return;
    }
    
    const putData = await putRes.json();
    console.log('Reordered! New order:', putData.options.map(o => o.name).join(', '));
    console.log('Done!');
}

fixOptions().catch(e => console.error(e));
