import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filenameWithPath = path.join(__dirname, 'files', 'created-text-file2.txt')
const content = 'this is writen from 0717a-write-file'

fs.writeFile(filenameWithPath, content, (err, data)=> {
  if (err) throw err
  console.log(`file ${filenameWithPath} written`)
})

process.on('uncaughtException', err=>{
  console.error(`[Error] There was an uncaught error: ${err}`)
  process.exit(1)  // <----  This will stop the execution of node,
                   //        otherwise node will continue to run.
})
