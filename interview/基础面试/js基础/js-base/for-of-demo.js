function muti(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(num * num);
        }, 3000)
    })
}

const nums = [1, 2, 3];

nums.forEach(async (i) => {
    const res = await muti(i);
    console.log(res);
});

!(async function () {
    for (let i of nums) {
        const res = await muti(i);
        console.log(res);
    }
})()