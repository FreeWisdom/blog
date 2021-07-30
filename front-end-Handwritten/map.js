function myMap(fn, thisArg) {
    const res = [];

}

/**
 * 用数组的reduce方法实现数组的map
 */
Array.prototype.Mmap = function (fn, thisArg) {
    const result = [];
    this.reduce((prev, curr, index, array) => {
        result[index] = fn.call(thisArg, array[index], index, array);
    }, 0);
    return result;
};

const test = [1, 2, 3, 4];
test.map((cur, index) => {
    console.log(cur, index);
    // return 
})
console.log()