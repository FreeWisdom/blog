//----【Promise.all 使用 then/catch 处理单个错误】---------------
// Promise
//     .all(
//         [interview('tencent'), interview('alibaba')]
//     )
//     .then(() => {
//         console.log('smile');
//     })
//     .catch((err) => {
//         console.log('cry for ' + err.name)
//     })
//
//----【Promise.all 使用 async/await 优化 处理单个错误】---------------
(async function() {
    try {
        await Promise.all(
            [interview('tencent'), interview('huawei'), interview('alibaba')]
        )
    } catch (err) {
        return console.log(err.name + " 面试失败！")
    }

    console.log("所有面试全部通过！")
})()

function interview(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                const error = new Error('failed');
                error.name = name;
                reject(error);

            } else {
                resolve('success');
            }
        }, 500)
    })
}

//----【Promise.all 处理多个错误】--------------------
// const result = {};
// let error = null;
// Promise.all([
//     promiseA.then(res=> {
//         result['A'] = res; return res;
//     }).catch(e=> {
//         error = e;
//     }),
//     promiseB.then(res=> {
//         result['B'] = res; return res;
//     }).catch(e=> {
//         error = e;
//     })
// ]).then(()=> { xxx })