import {writeFileSync} from 'node:fs';
const keys=['NEXT_PUBLIC_SITE_URL','CONTACT_WEBHOOK_URL'];
writeFileSync('.env.production',keys.filter(k=>process.env[k]).map(k=>`${k}=${JSON.stringify(process.env[k])}`).join('\n')+'\n');
