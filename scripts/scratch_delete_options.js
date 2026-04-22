const fs = require('fs');
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
const authHeader = 'Basic ' + Buffer.from(process.env.NEXT_PUBLIC_SWELL_STORE_ID + ':' + process.env.NEXT_PUBLIC_SWELL_SECRET_KEY).toString('base64');

async function run() {
    const res = await fetch('https://api.swell.store/products?where[slug]=bespoke-engraved-compact-mirror', {
        headers: { Authorization: authHeader }
    });
    const data = await res.json();
    const product = data.results[0];
    console.log('Options found: ', product.options ? product.options.map(o => o.name) : []);
    
    if (product.options && product.options.length > 0) {
        for (let opt of product.options) {
            console.log('Deleting option:', opt.id, opt.name);
            const delRes = await fetch('https://api.swell.store/products/' + product.id + '/options/' + opt.id, {
                method: 'DELETE',
                headers: { Authorization: authHeader }
            });
            console.log('Deleted status:', delRes.status);
        }
    }
}
run();
