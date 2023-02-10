const fs = require('fs')

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


// Error handling
fs.readFile('./files/does-not-exit.txt', 'utf8', (err, data)=> {
  if (err) throw err
  console.log('data2: ', data)
})
process.on('uncaughtException', err=>{
  console.error(`[Error] There was an uncaught error: ${err}`)
  process.exit(1)  // <----  This will stop the execution of node,
                   //        otherwise node will continue to run.
})
