import './generate-source.mjs';
import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const [source,module,worker]=await Promise.all([readFile(new URL('worker/index.js',root),'utf8'),readFile(new URL('node_modules/pdfjs-dist/build/pdf.mjs',root),'utf8'),readFile(new URL('node_modules/pdfjs-dist/build/pdf.worker.mjs',root),'utf8')]);
if(!source.includes('const PDF_ASSETS = null;'))throw Error('PDF asset marker missing');
await writeFile(new URL('dist/server/index.js',root),source.replace('const PDF_ASSETS = null;',()=> 'const PDF_ASSETS = '+JSON.stringify({module,worker})+';'));
console.log('Bundled local PDF reader and worker');
