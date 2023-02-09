import os from 'node:os'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  add,
  subtract,
  multiply,
  devide
} from './math.mjs'

console.log('\n----- global -----------------------')
console.log(global)


console.log('\n----- os ---------------------------')
console.log(os.type())
console.log(os.version())
console.log(os.homedir())


console.log('\n----- __dirname, __filename --------')
// __filename and __dirname is not available in mjs
// https://stackoverflow.com/a/55944697/3136861
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
console.log(__filename)


console.log('\n----- path --------')
console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__filename))


console.log('\n----- custom module: ./math.cjs --------')
console.log(add(2,3))
console.log(subtract(2,3))
console.log(multiply(2,3))
console.log(devide(2,3))

