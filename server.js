/*const logEvent=require('./logEnevnts');
const emitter=require('events');
class Emitter extends emitter{}
const myEventEmitter=new Emitter();
const http = require('http');
const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');
const fsPromise = require('fs').promises;
const PORT = process.env.PORT || 3500;

// serveFile
const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromise.readFile(filePath);

        // For images, set the response content type and send raw binary data
        if (contentType.includes('image')) {
            response.writeHead(filePath.includes('404.html')?404:200, { 'Content-Type': contentType });
            response.end(rawData, 'binary');
        } else {
            // For other content types, convert to UTF-8 or parse JSON as needed
            const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData.toString('utf-8');
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(contentType === 'application/json' ? JSON.stringify(data) : data);
        }
    } catch (err) {
        myEventEmitter.emit('log',`${err.method}\t${err.message}`,'errLog.txt')

        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}


// create http
const server = http.createServer( (req, res) => {
    myEventEmitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt')
    // call reqestFile extname
    const extension = path.extname(req.url);
    // create contentFile
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html'
    }
    console.log("contentype",contentType);
    // create FilePath
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);
    // upadate everygileinto .html
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    console.log("file Path",filePath); // Log filePath here

    // check fileExist
    const fileExist = fs.existsSync(filePath);

    // call and pass the value to serveFile function
    if (fileExist) {
        // serve file
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;

            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;

            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

server.listen(PORT, () => { console.log(`server running on port ${PORT}`) });
myEventEmitter.on('log',(message,name)=>{
    logEvent(message,name)

})*/