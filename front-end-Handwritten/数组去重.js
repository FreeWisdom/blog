function uniqueA(arr) {
    return Array.from(new Set(arr));
}

function uniqueB(arr) {
    const res = [];
    for (let index = 0; index < arr.length; index++) {
        if(res.indexOf(arr[index]) === -1) {
            res.push(arr[index])
        }
    }
    return res;
} 

const arr = [1, 2, 'a', 'c', 3, 3, 1, 2, 'c', 'd'];

const uniqueArr = uniqueB(arr);
console.log(uniqueArr);