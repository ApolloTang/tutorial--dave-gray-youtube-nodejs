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
    await mkdir(dirToCreate).then(
      () => console.log('directory created'),
      err => console.log('make directory failed')
    )
  }
}

async function removeDir(dirToCreate) {
  if (fs.existsSync(dirToCreate)) {
    await rmdir(dirToCreate).then(
      () => console.log('directory removed'),
      err => console.log('remove directory failed')
    )
  }
}

const myDirnameWithPath = path.join(__dirname, 'created-dir')
await createDir(myDirnameWithPath)
await sleep(2000)
await removeDir(myDirnameWithPath)


