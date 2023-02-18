import {
  saveLogToFile,
} from "./logEvents.js";

const errorHandler = (err, req, res, next) => {
  // With this handler present, error will not longer log into terminal.
  // You can still access to the error in the formal-parameters `err`
  //
  // To create error, remove https://www.google.com from
  // CORS whitelist and do a fetch('http://localhost:3500') in
  // browser's console from https://www.google.com
  //
  saveLogToFile(`${err.name}: ${err.message}`, 'errorLog.txt')
  console.error('error.stack: ------[start] \n', err.stack)
  console.error('-------[end] error.stack')
  res.status(500).send(err.message)
}

export {errorHandler}
