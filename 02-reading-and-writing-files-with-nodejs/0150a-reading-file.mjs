import fs from 'node:fs'

fs.readFile('./files/my-text-file.txt', (err, buffer)=> {
  if (err) throw err
  console.log('buffer: ', buffer)
  console.log('buffer.toString(): ', buffer.toString())
})


// pass in ENCODING to get read file content
const ENCODING = 'utf8'
fs.readFile('./files/my-text-file.txt', ENCODING, (err, data)=> {
  if (err) throw err
  console.log('data2: ', data)
})

