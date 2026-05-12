import swell from 'swell-node';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID || '', process.env.SWELL_SECRET_KEY || '');

async function run() {
  const result = await swell.get('/categories', { limit: 100 });
  console.log(result.results.map((c: any) => c.slug + ' -> ' + c.name).join('\n'));
}
run();
