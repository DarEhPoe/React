
const {logEvent}=require('./logEnevnts')
const errorHandler=(req,res,err,next)=>{
    logEvent(`${err.name}\t${err.message}`,'errLog.txt');
    console.error(err.stack);
    //res.status(500).send(err.message);

}
module.exports=errorHandler;