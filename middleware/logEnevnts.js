const {format}=require('date-fns')
const{v4:uuid}=require('uuid');
const fs=require('fs');
const path=require('path')
const fsPromise=require('fs').promises;
const logEvent= async (message,name)=>{
    const data=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem=`${data}\t${uuid()}\t${message}\n`
    try{
        if(!fs.existsSync(path.join(__dirname,'..','log'))){
            await (fsPromise.mkdir(path.join(__dirname,'..','log')));

        }
        await (fsPromise.appendFile(path.join(__dirname,'..','log',name),logItem));
    }
    catch(err){
        console.log(err)
    }
}
const logger=(req,url,next)=>{
    console.log(`${req.method}\t${req.path}`)
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    next();
}
module.exports={logEvent,logger};