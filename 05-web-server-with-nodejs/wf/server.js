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

const emitter = new Emitter()
emitter.on(`log`, (msg, fileName) => logEvents(msg, fileName))
const PORT = process.env.PORT || 3500

const serveFile = async (filePath, contentType, response) => {
    try {
      const encoding = !contentType.includes('image') ? 'utf8': ''
      const rawData = await fsPromises.readFile(filePath, encoding)
      const data = contentType === 'application/json'
        ? JSON.stringify(JSON.parse(rawData)) : rawData

      const status = filePath.includes('404.html') ? 404 : 200
        response.writeHead(status, { 'Content-Type': contentType })
        response.end(data)
    } catch (err) {
        console.log(err);
        emitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) =>{
  console.log('xxx', req.url, req.method)
  emitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
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
    // console.log('contentType:', contentType)

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
    // console.log('filePath: ', filePath)
    // console.log('fileExists: ', fileExists)

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
      switch(path.parse(filePath).base) {
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
})


server.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
