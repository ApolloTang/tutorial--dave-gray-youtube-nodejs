// This is a very simple stream, see link for better example:
// https://github.com/nodejs/node/blob/main/doc/api/fs.md#filehandlecreatereadstreamoptions

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const filenameWithFile = path.join(__dirname, 'files', 'my-text-file.txt')  // assume this is a very large file
const outputFilenameWithPath = path.join(__dirname, 'files', 'created-text-file5.txt')
const outputFilenameWithPath6 = path.join(__dirname, 'files', 'created-text-file6.txt')

const readStream = fs.createReadStream(filenameWithFile, {encoding: 'utf8'})
const writeStream = fs.createWriteStream(outputFilenameWithPath)

readStream.on('data', dataChunk => {
  console.log('dataChunk: ', dataChunk)
  writeStream.write(dataChunk)
})

// better way to write the above is using pipe:
const writeStream2 = fs.createWriteStream(outputFilenameWithPath6, {encoding: 'utf8'})
readStream.pipe(writeStream2)
