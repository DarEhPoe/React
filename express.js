
require('dotenv').config();
const express = require('express');
const corsOptions=require('./config/corsOptions');
const cors=require('cors');
const app = express();
const path=require('path');
const {logger}=require('./middleware/logEnevnts');
const { error } = require('console');
const errorHandler=require('./middleware/errorHandler');
const veriyfyJWT=require('./middleware/verifyJWT');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const connectDB=require('./config/dbConn');
const PORT = process.env.PORT || 3500;
//custom middleware logger


//connect to MongoDB
connectDB();

// Applying CORS middleware to all routes
app.use(cors(corsOptions));
app.use(logger)
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());



/*app.use('/subdir',require('./routes/subdir'));*/
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./public/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logOut'));
app.use(veriyfyJWT)
app.use('/employees',require('./routes/api/employees'))

app.use('/',express.static(path.join(__dirname,'/public')));
/*app.use('/subdir',express.static(path.join(__dirname,'/public')));*/


app.get('/hello(.html)?',(req,res,next)=>{
    console.log("the next is completed")
    next()
},(req,res)=>{
    res.send("helloFile")
})
const one=(req,res,next)=>{
    console.log("one");
    next();
}
const two=(req,res,next)=>{
    console.log('two')
    next()
}

const three=(req,res)=>{
    console.log("three")
    res.send("Finished!")
}
app.get('/chain(.html)?',[one,two,three])

//app.get('/*',(req,res)=>{
//    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
//})
app.all('*',(req,res)=>{
    if(req.accepts('html')){
        res.status(404).sendFile(path.join(__dirname,'views','404.html'))

    }else if(req.accepts('json')){
        res.json({error:'404 not found'})

    }else{
        res.type('txt').send("404 not found")
    }
})

app.use(errorHandler);

mongoose.connection.once('open',()=>{
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})



