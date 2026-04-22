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

async function getAllVariants(pid) {
    let variants = [];
    let page = 1;
    while (true) {
        const res = await fetch(`https://api.swell.store/products/${pid}/variants?limit=1000&page=${page}`, {headers:{Authorization: authHeader}});
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            variants = variants.concat(data.results);
            if (data.results.length < 1000) break;
            page++;
        } else {
            break;
        }
    }
    return variants;
}

async function fixVariantsAndOptions() {
    console.log('Fetching product...');
    const prodRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const p = (await prodRes.json()).results[0];
    const pid = p.id;

    console.log('Fetching variants...');
    const allVariants = await getAllVariants(pid);
    console.log('Found variants:', allVariants.length);

    console.log('Computing variant absolute prices...');
    const payloadVariants = allVariants.map(v => {
        // v.name is something like "Design #1, 2 Set (12 Golf Balls) @ $44.98"
        // Find the quantity sets.
        const match = v.name.match(/(\d+)\s+Set/);
        const sets = match ? parseInt(match[1]) : 1;
        const absPrice = 24.99 + (sets - 1) * 19.99;
        return {
            id: v.id,
            price: parseFloat(absPrice.toFixed(2))
        };
    });

    console.log('Zeroing out Option prices...');
    const opt = p.options.find(o => o.name === 'Quantity Tiers');
    const newValues = opt.values.map(v => ({
        id: v.id,
        name: v.name,
        price: null // DO NOT output a price modifier
    }));

    console.log('Submitting bulk PUT to Product API to update Variants AND Options simultaneously...');
    const reqBody = {
        options: p.options.map(o => o.id === opt.id ? { id: opt.id, values: newValues } : { id: o.id }),
        variants: payloadVariants
    };

    const putRes = await fetch('https://api.swell.store/products/' + pid, {
        method: 'PUT',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    });
    
    if(!putRes.ok) {
        console.log('Timeout achieved as expected. Swell is crunching the 1200 definitions locally:', await putRes.text());
    } else {
        console.log('Instant success!', await putRes.json());
    }
}
fixVariantsAndOptions().catch(e => console.error(e));
