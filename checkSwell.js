async function run() {
  const res = await fetch('https://customweddingco.swell.store/api/categories', {
    headers: {
      'Authorization': 'Basic ' + Buffer.from('pk_0iFv2Wz7Fhyq1E2J2YmDIt4tQxGk52F1:').toString('base64'),
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  console.log(data.results.map(c => c.slug + ' - ' + c.name).join('\n'));
}
run();
