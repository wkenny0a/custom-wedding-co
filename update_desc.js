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
const desc = [
    '<div style="font-family: \'Cormorant Garamond\', \'Playfair Display\', Georgia, serif; color: #4A2C2A; max-width: 680px; margin: 0 auto; line-height: 1.8;">',
    '',
    '  <p style="font-style: italic; color: #B89A52; letter-spacing: 0.08em; margin-bottom: 2em; font-size: 0.95em;">',
    '    Elevate your wedding weekend with these bespoke, custom-printed golf balls, thoughtfully designed to celebrate the gentlemen standing by your side with a touch of artisanal elegance.',
    '  </p>',
    '',
    '  <h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 1.35em; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; color: #4A2C2A; margin-bottom: 1.2em; border-bottom: 1px solid #F2D9D9; padding-bottom: 0.6em;">',
    '    Heirloom-Quality Details',
    '  </h2>',
    '',
    '  <ul style="list-style: none; padding: 0; margin: 0 0 2em 0;">',
    '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
    '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Handcrafted Exclusivity</strong>',
    '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
    '      Custom-printed with your unique monogram, tailored message, or a meaningful date in elegant typography.',
    '    </li>',
    '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
    '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Timeless Presentation</strong>',
    '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
    '      Arrives beautifully packaged in a clear keepsake sleeve, ready to be gifted to your groomsmen or the father of the bride.',
    '    </li>',
    '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
    '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Premium Keepsake Quality</strong>',
    '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
    '      Crafted with high-fidelity UV printing, ensuring your intimate design remains a lasting memento long after the final hole.',
    '    </li>',
    '    <li style="padding: 0.8em 0; border-bottom: 1px solid #F2D9D9;">',
    '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">Bespoke Options</strong>',
    '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
    '      Available in curated sets of 1, 3, or 6, with single or double-sided personalization to perfectly match your vision.',
    '    </li>',
    '    <li style="padding: 0.8em 0;">',
    '      <strong style="color: #4A2C2A; letter-spacing: 0.04em;">A Memorable Detail</strong>',
    '      <span style="color: #B89A52; margin: 0 0.4em;">&mdash;</span>',
    '      The sophisticated companion for a celebratory bachelor weekend or a peaceful morning on the greens before the ring.',
    '    </li>',
    '  </ul>',
    '',
    '</div>',
].join('\n');

fetch('https://api.swell.store/products?where[slug]=bespoke-personalized-golf-balls', {headers:{Authorization: authHeader}})
.then(r=>r.json())
.then(d => {
    const id = d.results[0].id;
    return fetch('https://api.swell.store/products/' + id, {
        method: 'PUT',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc })
    });
})
.then(r => r.json())
.then(data => console.log('Update Complete! Description mdash?', data.description.includes('&mdash;')));
