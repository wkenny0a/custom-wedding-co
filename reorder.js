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

async function reorder() {
    console.log('Fetching product...');
    const prodRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const prodData = await prodRes.json();
    const p = prodData.results[0];
    
    // find options
    const qty = p.options.find(o => o.name === 'Quantity Tiers');
    const design = p.options.find(o => o.name.includes('Design Style'));
    const names = p.options.find(o => o.name.includes('Names or Initials'));
    const event = p.options.find(o => o.name.includes('Event Date'));
    
    if(!qty || !design || !names || !event) {
        console.error('Missing some options! Options found:', p.options.map(o => o.name).join(', '));
        return;
    }
    
    // sort them
    console.log('Reordering options...');
    const newOptions = [
        { id: qty.id },
        { id: design.id },
        { id: names.id },
        { id: event.id }
    ];
    
    const putRes = await fetch('https://api.swell.store/products/' + p.id, {
        method: 'PUT',
        headers: {Authorization: authHeader, 'Content-Type': 'application/json'},
        body: JSON.stringify({ options: newOptions })
    });
    
    if(!putRes.ok) {
        console.error('Failed to reorder:', await putRes.text());
        return;
    }
    
    const putData = await putRes.json();
    console.log('Reordered! New order:', putData.options.map(o => o.name).join(', '));
}

reorder();
