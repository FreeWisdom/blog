function upsetArr(arr) {
    let len = arr.length;
    for (let index = 0; index < len; index++) {
        let randomIndex = Math.floor(Math.random() * len);
        arr.push(arr[randomIndex]);
        arr.splice(randomIndex, 1)
    }
    return arr;
}

const arr = [1, 2, 2, 3, 66, 99];

// console.log(upsetArr(arr))

var randomNumber = function () {
    // 返回 -0.5 ～ +0.5 的随机数
    return 0.5 - Math.random()
}

console.log(arr.sort(randomNumber))