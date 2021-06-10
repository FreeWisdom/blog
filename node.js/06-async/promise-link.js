// 串行的执行多个异步任务
//----【使用 promise 】-----------------------------------------
// interview(1)
//     .then(()=> {
//         return interview(2);
//     })
//     .then(()=> {
//         return interview(3);
//     })
//     .then(()=> {
//         console.log('smile')
//     })
//     .catch((err)=> {
//         console.log('cry at ' + err.round)
//     })
//
//----【使用 async/await 简化改造】-------------------------------------
(async function() {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
    } catch (err) {
        return console.log("第 " + err.round + " 轮面试失败！");
    }

    console.log("通过所有面试！")
})()


function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if (Math.random() < 0.2) {
                const error = new Error('failed');
                error.round = round;
                reject(error);
    
            } else {
                resolve('success');
            }
        }, 500)
    })
}