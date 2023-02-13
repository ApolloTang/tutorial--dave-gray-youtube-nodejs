import path from 'node:path'
import fs from 'node:fs'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const sleep = ms => new Promise((resolve) => { setTimeout(()=>resolve(), ms) })

const fsPromise = fs.promises
const {
  mkdir,
  rmdir
} = fsPromise


async function createDir(dirToCreate) {
  if (!fs.existsSync(dirToCreate)) {
    try {
      await mkdir(dirToCreate)
      console.log('directory created'),
    } catch (err) {
      console.log(err)
    }
  }
}

async function removeDir(dirToRemove) {
  if (fs.existsSync(dirToRemove)) {
      try {
        await rmdir(dirToCreate)
        console.log('directory removed'),
      } catch (err) {
        console.log(err)
      }
    )
  }
}

const myDirnameWithPath = path.join(__dirname, 'created-dir')
await createDir(myDirnameWithPath)
await sleep(2000)
await removeDir(myDirnameWithPath)


