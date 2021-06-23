// // 异步 （callback 回调函数）
// console.log(100)
// setTimeout(() => {
//     console.log(200)
// }, 1000)
// console.log(300)
// console.log(400)

// 同步
// console.log(100)
// alert(200)
// console.log(300)

// (async function () {
//     const p4 = Promise.reject("err1");
//     console.log("xxxx", p4)
//     try {
//         const res = await p4;
//         console.log("try", res);
//     } catch (err) {
//         console.error(err);
//     }
// })()

console.log(100);
setTimeout(() => {
  console.log(200);
});
Promise.resolve().then(() => {
  console.log(300);
});
console.log(400);