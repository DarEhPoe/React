const logEvent=require('./logEnevnts');
const emitter=require('events');
class Emitter extends emitter{}
const myEventEmitter=new Emitter();
const http=require('http');
const path=require('path')
const fs=require('fs');
const fsPromise=require('fs').promises;
const PORT=process.env.PORT || 3500;
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method)
});
server.listen(PORT,()=>{console.log(`sever running on port ${PORT}`)});





















/*myEventEmitter.on('log',(mes)=>logEvent(mes));
myEventEmitter.emit('log','emitter completed');*/


