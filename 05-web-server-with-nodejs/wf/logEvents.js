import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import {format} from 'date-fns'
import {v4 as uuid} from  'uuid'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fsPromises = fs.promises

const logEvents = async (message, logName) => {
  const dateTime = `${ format(new Date(), 'yyyMMdd\tHH:mm:ss') }`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`
  console.log(logItem)
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem)
  } catch (err) {
     console.error(err)
  }
}


export {logEvents}
