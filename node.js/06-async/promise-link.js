// 串行的执行多个异步任务
interview(1)
    .then(()=> {
        return interview(2);
    })
    .then(()=> {
        return interview(3);
    })
    .then(()=> {
        console.log('smile')
    })
    .catch((err)=> {
        console.log('cry at ' + err.round)
    })

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