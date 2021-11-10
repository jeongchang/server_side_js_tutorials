const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req,res) =>{
    res.writeHead(200, { 'Content_type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port,hostname, () => {    //listen은 비동기 이고 시간이 걸리기 때문에 callback을 넣어줌
    console.log(`Server running at http://${hostname}:${port}/`);
});
