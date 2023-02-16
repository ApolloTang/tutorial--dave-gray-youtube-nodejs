import path from 'node:path'
import url from 'node:url'
import express from 'express'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
