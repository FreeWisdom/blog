const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

console.log(0);
(async function () {
    await delay(1000)
})()
console.log(1);