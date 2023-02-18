import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import {format} from 'date-fns'
import {v4 as uuid} from  'uuid'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fsPromises = fs.promises

const composeLogMessage = (req) => {
  const dateTime = `${ format(new Date(), 'yyyyMMdd HH:mm:ss') }`
  return `
    ${uuid()}
    timeStemp:\t ${dateTime}
    req.method:\t ${req.method}
    req.header.origin:\t ${req.headers.origin}
    req.header.referer:\t ${req.headers.referer}
    req.url:\t ${req.url}
  `
  // note that req.header is undefined if COR not set,
  // see: https://stackoverflow.com/questions/29531521/req-headers-origin-is-undefined
}


const saveLogToFile = async (message, logName) => {
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), message)
  } catch (err) {
     console.error(err)
  }
}


const logEvents = (req, res, next) => {
  saveLogToFile(composeLogMessage(req), 'reqLog.txt')
  next()
}

const logToTerminal = (req, res, next) => {
  console.log(composeLogMessage(req))
  next()
}

export {
  saveLogToFile,

  logToTerminal,
  logEvents
}
