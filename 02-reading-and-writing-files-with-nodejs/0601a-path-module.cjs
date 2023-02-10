const fs = require('fs')
const path = require('path')

// using path.join make the filenameWithPath interoperable with
// window plateform
const filenameWithPath = path.join(__dirname, 'files', 'my-text-file.txt')

fs.readFile(filenameWithPath, 'utf8', (err, data)=> {
  if (err) throw err
  console.log('data: ', data)
})

process.on('uncaughtException', err=>{
  console.error(`[Error] There was an uncaught error: ${err}`)
  process.exit(1)  // <----  This will stop the execution of node,
                   //        otherwise node will continue to run.
})
