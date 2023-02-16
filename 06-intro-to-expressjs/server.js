import path from 'node:path'
import url from 'node:url'
import express from 'express'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()

app.get('/hello-world', (req, res) => {
  res.send('hello world')
})

app.get('^/$|/index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname})
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})


app.get('/old-page(.html)?', (req, res) => {
  // res.redirect('/new-page.html')     // 302 by default
  res.redirect(301, '/new-page.html')   // change 302 to 301 for SEO
                                        //   301 means moved permanently
                                        //   302 means moved temporarily
                                        //   https://www.searchenginejournal.com/301-vs-302-redirects-seo/299843/
})


// The following is the route handler
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
