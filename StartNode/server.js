const http=require('http');


const hostname='127.0.0.1';
const port=3000;
//create the server
const server =http.createServer((req,res)=>{
    //no issues from my side
    res.statusCode=200;
    res.setHeader(`Content-tYPE`,`text/plain`);
    //body
    res.end(`Hello world`);
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});