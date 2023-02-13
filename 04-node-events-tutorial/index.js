import EventEmitter from 'node:events'

import {logEvents} from './logEvents.js'

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

myEmitter.on(`log`, msg => {
  logEvents(msg)
})

setTimeout(()=>{
  myEmitter.emit('log', 'Log event emitted')
}, 2000)

