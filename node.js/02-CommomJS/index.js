const lib = require('./lib.js')
lib.additional = 'test'

console.log(lib);									// [Function: min] { additional: 'test' }
console.log(lib.additional);                        // test