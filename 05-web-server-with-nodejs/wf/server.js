import EventEmitter from 'node:events'
import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs'
import url from 'node:url'

import {logEvents} from './logEvents.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fsPromises = fs.promises
class Emitter extends EventEmitter {}

const PORT = process.env.PORT || 3500

const server = http.createServer((req, res) =>{
  console.log('xxx', req.url, req.method)
    const extension = path.extname(req.url);

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
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serveFile(filePath, contentType, res);
    } else {
      console.log(path.parse(filePath))
    }
})
const emitter = new Emitter()



// myEmitter.on(`log`, msg => {
//   logEvents(msg)
// })
//
// setTimeout(()=>{
//   emitter.emit('log', 'Log event emitted')
// }, 2000)


server.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
