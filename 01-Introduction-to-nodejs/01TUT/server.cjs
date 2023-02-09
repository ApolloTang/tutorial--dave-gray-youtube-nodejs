const os = require('node:os')
const path = require('node:path')
const {
  add,
  subtract,
  multiply,
  devide
} = require('./math.cjs')

console.log('\n----- global -----------------------')
console.log(global)


console.log('\n----- os ---------------------------')
console.log(os.type())
console.log(os.version())
console.log(os.homedir())


console.log('\n----- __dirname, __filename --------')
console.log(__dirname)
console.log(__filename)


console.log('\n----- path --------')
console.log(path.dirname(__filename))  // same as __dirname
console.log(path.basename(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__filename))


console.log('\n----- custom module: ./math.cjs --------')
console.log(add(2,3))
console.log(subtract(2,3))
console.log(multiply(2,3))
console.log(devide(2,3))

