import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const {
  readFile,
  writeFile,
  appendFile,
  rename,
  unlink,
} = fs.promises


const filenameWithPath = path.join(__dirname, 'files', 'created-text-file3.txt')
const newFilenameWithPath = path.join(__dirname, 'files', 'created-text-file4.txt')

const fileOps = async () => {
  try  {
    await unlink(newFilenameWithPath).catch( err => {
      // 'unlink' means deletion, it will thow if file does not exist
      console.log(err)
    })
    await writeFile(filenameWithPath, 'hello world\n')
    await appendFile(filenameWithPath, 'bye world\n')  // appendFile will create the file if not  exit,  but will not create a dir
    await rename(filenameWithPath, newFilenameWithPath)
    const data = await readFile(newFilenameWithPath, 'utf-8')
    console.log(data)
  } catch (err) {
    console.error(`[Error] There was an uncaught error: ${err}`)
    process.exit(1)  // <----  This will stop the execution of node,
                     //        otherwise node will continue to run.
  }
}

fileOps()
