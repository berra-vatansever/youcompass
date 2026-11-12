import http from 'node:http';
import app from '../dist/server/index.js';
const portArg=process.argv.indexOf('--port');
const port=Number(portArg>=0?process.argv[portArg+1]:process.env.PORT||3000);
http.createServer(async(req,res)=>{try{let chunks=[];for await(let c of req)chunks.push(c);let response=await app.fetch(new Request(new URL(req.url,'http://localhost:'+port),{method:req.method,headers:req.headers,...(chunks.length?{body:Buffer.concat(chunks)}:{})}));res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()))}catch{res.writeHead(500);res.end('Preview request failed')}}).listen(port,'0.0.0.0',()=>console.log('YouCompass preview on '+port));
