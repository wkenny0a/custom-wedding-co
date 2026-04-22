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

async function checkVars() {
    const prodRes = await fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}});
    const p = (await prodRes.json()).results[0];
    
    const vRes = await fetch('https://api.swell.store/products/' + p.id + '/variants?limit=1000', {headers:{Authorization: authHeader}});
    const v = await vRes.json();
    console.log('Variants count:', v.results ? v.results.length : 0);
    if (v.results && v.results.length > 0) {
        console.log(v.results[0].name, v.results[0].price);
    }
}
checkVars();
