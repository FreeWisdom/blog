import { fn, name, obj } from './a.js'

fn();
console.log(name);
console.log(obj);

console.log("this is index.js.")

const sum = (a, b) => {
    return a + b;
};

const res = sum(1, 9);
console.log(res);