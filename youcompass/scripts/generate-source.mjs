import {readFile,writeFile} from 'node:fs/promises';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
let html=await read('web/layout.html');
for(const [key,path] of Object.entries({STYLE:'web/hub.css',ACADEMIC_DATA:'data/academic.json',LEGACY_SCRIPT:'web/legacy-client.js',HUB_SCRIPT:'web/hub.js',RESEARCH_SCRIPT:'web/research.js',PRESERVED_SECTIONS:'web/preserved-sections.html',LEGACY_DIALOGS:'web/legacy-dialogs.html'})){const value=await read(path);html=html.replace('{{'+key+'}}',()=>value)}
if(/\{\{[A-Z_]+\}\}/.test(html))throw Error('Unresolved UI marker');
let legacy=await read('worker/legacy.mjs');legacy=legacy.slice(legacy.indexOf('\n')+1).replace('export default app;','');
let academic=(await read('worker/academic.mjs')).replace(/^import DATA[^\n]+\n/,'').replaceAll('export ','');
const source='const HTML='+JSON.stringify(html)+';\n'+legacy+'\nconst academicHandler=(()=>{const DATA='+await read('data/academic.json')+';'+academic+';return academicFetch})();\nexport default {async fetch(request,env,ctx){if(["/api/academics","/api/academic-source","/api/abroad"].includes(new URL(request.url).pathname))return academicHandler(request);return app.fetch(request,env,ctx)}};\n';
await writeFile(new URL('../worker/index.js',import.meta.url),source);
