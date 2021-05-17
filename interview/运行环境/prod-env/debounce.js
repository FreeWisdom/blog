const input1 = document.getElementById('input1')

// let timer = null
// input1.addEventListener('keyup', function () {
//     if (timer) {
//         clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//         // 模拟触发 change 事件
//         console.log(input1.value)

//         // 清空定时器
//         timer = null
//     }, 500)
// })

// 防抖
// function debounce(fn, delay = 500) {
//     // timer 是闭包中的
//     let timer = null

//     return function () {
//         if (timer) {
//             clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//             fn.apply(this, arguments)
//             timer = null
//         }, delay)
//     }
// }

// input1.addEventListener('keyup', debounce(function (e) {
//     console.log(e.target)
//     console.log(input1.value)
// }, 600))

function debounce(fn, delay = 500) {
    // timer 在闭包中，与外界隔离，保持变量不被外界改变；
    timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer)
        };
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay)
    }
};

input1.addEventListener('keyup', debounce(function (e) {
    console.log(input1.value);
    console.log(e.target);
}, 600))
