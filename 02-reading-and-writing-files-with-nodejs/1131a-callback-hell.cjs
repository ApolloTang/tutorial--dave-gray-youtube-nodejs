// This is a bad way do write water fall operation
// because it will end up in callback hell

const fs = require('fs')
const path = require('path')

const filenameWithPath = path.join(__dirname, 'files', 'created-text-file3.txt')
const content = 'new content\n'
const appendedContent = 'appended content'


fs.writeFile(filenameWithPath, content, (err)=> {
  if (err) throw err
  console.log(`file ${filenameWithPath} written`)

  fs.appendFile(filenameWithPath, appendedContent, (err)=> {
    if (err) throw err
    console.log(`Append to ${filenameWithPath} `)
  })
})

process.on('uncaughtException', err=>{
  console.error(`[Error] There was an uncaught error: ${err}`)
  process.exit(1)  // <----  This will stop the execution of node,
                   //        otherwise node will continue to run.
})
