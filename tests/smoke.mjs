import assert from 'node:assert/strict';
const origin=process.env.TEST_BASE_URL||'http://localhost:3000';
const queue=['/'];const seen=new Set();
while(queue.length){const path=queue.shift();if(seen.has(path))continue;seen.add(path);const res=await fetch(origin+path);assert.equal(res.status,200,path);const html=await res.text();assert.match(html,/<title>/,path+' title');assert.match(html,/id="main"/,path+' main landmark');for(const m of html.matchAll(/href="(\/[^"#?]*)"/g)){if(!m[1].startsWith('/_next/')&&!/\.[a-z]+$/i.test(m[1])&&!seen.has(m[1]))queue.push(m[1]);}}
assert.ok(seen.size>=29,`Expected complete navigation graph, found ${seen.size}`);
assert.equal((await fetch(origin+'/not-a-real-page')).status,404);
assert.equal((await fetch(origin+'/services/not-real')).status,404);
const post=async(data,headers={})=>fetch(origin+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(data)});
assert.equal((await post({})).status,400);
const data={name:'Demo tester',email:'tester@example.com',company:'Example',topic:'General enquiry',message:'This is a test enquiry.',consent:'yes'};
const good=await post(data);assert.equal(good.status,200);assert.equal((await good.json()).demo,true,'Run smoke tests with CONTACT_WEBHOOK_URL unset');
assert.equal((await post({...data,email:'invalid'})).status,400);
assert.equal((await post({...data,consent:'no'})).status,400);
assert.equal((await post(data,{Origin:'https://untrusted.example'})).status,403);
assert.equal((await post({...data,message:'x'.repeat(17000)})).status,413);
assert.equal((await fetch(origin+'/sitemap.xml')).status,200);
assert.match(await (await fetch(origin+'/robots.txt')).text(),/Disallow: \//);
console.log(`PASS: ${seen.size} linked pages, two 404 routes, metadata/landmarks, sitemap, robots, contact validation, demo response, origin and size checks.`);

