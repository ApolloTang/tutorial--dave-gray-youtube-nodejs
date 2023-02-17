import path from 'node:path'
import url from 'node:url'
import express from 'express'
import cors from 'cors'

import {logger, logEvents} from  './middleware/logEvents.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()


//
// Custom middleware
//
app.use( (req, res, next) =>{
  // do stuff here
  next()
})
app.use( logEvents )
app.use( logger )


//
// Cross Origin Resource Sharing
//
const whitelist = process.env.production
  ? ['https://www.yoursite.com']
  : [
    'http://127.0.0.1:5500', 'http://localhost:3500',
    'https://www.google.com' // <--- allow fetch('http://localhost:3500') in browser's console from https://www.google.com
  ]
const corsOptions = {
  origin: (origin, callback) => {
    const  isOriginInWhitelist = whitelist.indexOf(origin) !== -1
    const  isOriginNotFalsy = !origin
    if (isOriginInWhitelist || isOriginNotFalsy) {
      callback(null, true) // allow
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// express.urlencoded is a built-in middleware
// for handling urlencoded data. In other words, form data:
//   ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }))

// build-in middleware to serve static files
app.use(express.static(path.join(__dirname, '/public')));


//
// Sending text
//
app.get('/hello-world', (req, res) => {
  res.send('hello world')
})

//
// Sending file
//
app.get('^/$|/index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname})
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})


//
// Redirecting
//
app.get('/old-page(.html)?', (req, res) => {
  // res.redirect('/new-page.html')     // Status code is 302 if didn't specified.
  res.redirect(301, '/new-page.html')   // But we should respond with 302 for SEO
                                        //   301 means moved permanently
                                        //   302 means moved temporarily
                                        //   https://www.searchenginejournal.com/301-vs-302-redirects-seo/299843/
})

//
// Chaining route handlers
//
app.get('/try-out-route-handler', (req, res, next) => {
  console.log('try-out-route-handler')
  next()
}, (req, res, next) =>{
  console.log('next() has been called')
  next()
}, (req, res, next) =>{
  res.send('try-out-route-handler')
})

// Another route handler example:
const one = (req, res, next) => { console.log('one'); next() }
const two = (req, res, next) => { console.log('two'); next() }
const three = (req, res) => { console.log('three'); res.send('finish') }
app.get('/chain-123', [one, two, three])


// catch all
app.get(`/*`, (req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, 'views', '404.html'))
})


app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
