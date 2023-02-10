import fs from 'node:fs'

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
