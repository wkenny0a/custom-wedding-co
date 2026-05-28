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

    console.log('Deleting all current options...');
    if (p.options && p.options.length) {
        for (const opt of p.options) {
            await fetch(`https://api.swell.store/products/${pid}/options/${opt.id}`, {
                method: 'DELETE',
                headers: {Authorization: authHeader}
            });
            console.log(`Deleted ${opt.name}`);
        }
    }

    console.log('Adding Quantity Tiers (Dropdown) first...');
    const values = Array.from({ length: 100 }, (_, i) => {
        const sets = i + 1;
        const balls = sets * 6;
        const priceNum = 24.99 + (sets - 1) * 19.99;
        const priceStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNum);
        const optName = `${sets} Set (${balls} Golf Balls) @ ${priceStr}`;
        if (sets === 1) return { name: optName };
        return { name: optName, price: parseFloat(((sets - 1) * 19.99).toFixed(2)) };
    });

    await fetch(`https://api.swell.store/products/${pid}/options`, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Quantity Tiers (Dropdown)',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: values
        })
    });
    console.log('Added Quantity Tiers!');

    console.log('Adding Design Style...');
    await fetch(`https://api.swell.store/products/${pid}/options`, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Design Style',
            variant: true,
            active: true,
            required: true,
            input_type: 'select',
            values: [
                { name: 'Design #1' }, { name: 'Design #2' }, { name: 'Design #3' },
                { name: 'Design #4' }, { name: 'Design #5' }, { name: 'Design #6' },
                { name: 'Design #7' }, { name: 'Design #8' }, { name: 'Design #9' },
                { name: 'Design #10' }, { name: 'Design #11' }, { name: 'Design #12 (Custom Design)' }
            ]
        })
    });
    console.log('Added Design Style!');

    console.log('Adding Names or Initials...');
    await fetch(`https://api.swell.store/products/${pid}/options`, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Names or Initials',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'Enter the names or initials exactly as you would like them engraved.'
        })
    });
    console.log('Added Names or Initials!');

    console.log('Adding Event Date...');
    await fetch(`https://api.swell.store/products/${pid}/options`, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Event Date',
            variant: false,
            active: true,
            required: true,
            input_type: 'short_text',
            description: 'e.g. October 12, 2026'
        })
    });
    console.log('Added Event Date!');
    
    console.log('Done!');
}

fixOptions().catch(e => console.error(e));
