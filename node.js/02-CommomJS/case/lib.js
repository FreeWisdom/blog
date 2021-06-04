exports.hello = 'hello'

exports.add = function (a, b) {
    return a + b
}

exports.obj = { name: 'a', age: 20 }

module.exports = function min(a, b) {
    return a - b;
}

setTimeout(() => {
    console.log(exports);					// { hello: 'hello', add: [Function (anonymous)], obj: { name: 'a', age: 20 } }
}, 3000);