import path from 'node:path'
import url from 'node:url'
import express from 'express'
import cors from 'cors'

import {logToTerminal, logEvents} from  './middleware/logEvents.js'
import {errorHandler} from  './middleware/errorHandler.js'
import data from './data/data.json' assert { type: "json" }

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
app.use( logToTerminal )


//
// Cross Origin Resource Sharing
//
const whitelist = process.env.production
  ? ['https://www.yoursite.com']
  : [
    'http://127.0.0.1:5500', 'http://localhost:3500',
    // 'https://www.google.com' // <--- This is to allow fetch('http://localhost:3500') in browser's console from https://www.google.com.
  ]
const corsOptions = {
  origin: (origin, callback) => {
    const  isOriginInWhitelist = whitelist.indexOf(origin) !== -1
    if (
      isOriginInWhitelist
      || (!process.env.production && !origin)  // During devlopment `req.heqders.origin` is undefined.
    ) {
      callback(null, true) // allow
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


//
// Build in middleware
//

// built-in middleware express.urlencoded is
// for handling urlencoded data. In other words, form data:
//   ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }))

// built-in middleware to handle json file.
app.use(express.json());

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

app.get('/data/data.json', (req, res) => {
  res.json(data)
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
app.all(`*`, (req, res) => {
  res.status(404)
  // TODO
  if (req.accepts(`text/html`)) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('application/json')) {
    res.json({error: '404 NOT Found'})
  }
})


//
// Error handling
//
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
