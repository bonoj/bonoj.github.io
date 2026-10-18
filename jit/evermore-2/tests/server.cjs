const http=require('node:http');
http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/plain'});res.end('test server')}).listen(4179,'127.0.0.1');
