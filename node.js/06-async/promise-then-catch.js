const promise = new Promise((resolve, reject) => {
  resolve(3);
  // setTimeout(function () {
  //     reject(new Error(4))
  // }, 500)
})

promise
  .then(function (result) {
      console.log(result)		// 3
  })
  // .catch(function (err) {
  //     return 1
  // })

setTimeout(() => {
  console.log(promise);					// reject
}, 800)