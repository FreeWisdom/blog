# ✅✅✅✅✅✅

# 1、知识点+题目概览

> 主要内容:
>
> * Event loop
> * Promise 进阶
> * async/await
>   * 基本语法
>   * async/await和Promise的关系
> * 异步本质
> * 异步中for...of的使用
> * 微任务/宏任务

> 题目：
>
> * 请描述event loop的机制，可画图
>
> * 什么是宏任务和微任务，两者有什么区别？
>
> * promise有哪三种状态？如何变化？
>
> * ⚠️常考⚠️promise then 和 catch的链式调用
>
>   ```js
>   promise.resolve().then(() => {
>     console.log(1);
>   }).catch(() => {
>     console.log(2);
>   }).then(() => {
>     console.log(3);
>   })
>
>   // 1
>   // 3
>   ```
>
>   ```js
>   promise.resolve().then(() => {
>     console.log(1);
>     throw new Error("error1");
>   }).catch(() => {
>     console.log(2);
>   }).then(() => {
>     console.log(3);
>   })
>
>   // 1
>   // 2
>   // 3
>   ```
>
>   ```js
>   promise.resolve().then(() => {
>     console.log(1);
>     throw new Error("error1");
>   }).catch(() => {
>     console.log(2);
>   }).catch(() => {
>     console.log(3);
>   })
>
>   // 1
>   // 2
>   ```
>
> * Async/await语法
>
>   ```js
>   async function fn() {
>     return 100;
>   };
>   (async function () {
>     const a = fn();					// Promise {<fulfilled>: 100}
>     const b = await fn();		// 100
>   })();
>   ```
>
>   ```js
>   (async function () {
>     console.log("start");
>     const a = await 100;
>     console.log("a", a);
>     const b = await Promise.resolve(200);
>     console.log("b", b);
>     const c = await Promise.reject(300);
>     console.log("c", c);
>     console.log("end");
>   })()
>
>   // start
>   // a 100
>   // b 200 
>   // 报错
>   ```
>
> * Promise 和setTimeout的顺序
>
>   ```js
>   console.log(100);
>   setTimeout(() => {
>     console.log(200);
>   });
>   Promise.resolve().then(() => {
>     console.log(300);
>   });
>   console.log(400);
>
>   // 100
>   // 400
>   // 300
>   // 200
>   ```
>
> * Async/await顺序问题
>
>   ```js
>   async function async1() {
>     console.log("async1 start");
>     await async2();
>     console.log("async1 end");		// 微任务
>   }
>   async function async2() {
>     console.log("async2");
>   }
>       
>   console.log("script start");
>   setTimeout(function () {				// 宏任务
>     console.log("settimeout")
>   }, 0);
>       
>   async1();
>       
>   // 初始化Promise时，传入的函数会立即被执行；
>   new Promise(function (resolve) {
>     console.log("promise1");
>     resolve()
>   }).then(function () {						// 微任务
>     console.log("promise2");
>   });
>       
>   console.log("script end");
>       
>   // script start
>   // async1 start
>   // async2
>   // promise1
>   // script end				此时callstack被清空 ==> 执行微任务 ==> 尝试触发DOM渲染 ==> 执行宏任务
>   // async1 end
>   // promise2
>   // settimeout
>
>
>   // 宏：settimeout
>   // 微：async1 end/promise2
>
>   ```

# 2、 知识点梳理

## 2.1、event loop（事件循环/事件轮询）

* js是单线程运行的；
* 异步要基于回调来实现；
* **event loop就是异步回调的实现原理；**

### 2.1.1、event loop 的执行过程

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620695522360-assets/web-upload/6d5ed31d-59d0-404e-b515-cee3c5e3689c.png?x-oss-process=image%2Fresize%2Cw_440" alt="eventloop" style="width: 600px; height: 400px;">

1. 同步代码，一行行放在callstack执行；
2. 遇到异步，先在webAPI记录下，等待时机（定时、网络请求等）；
3. 时机到了，移动到callback queue；
4. 若此时同步代码执行完，**callstack为空，先执行当前微任务，再尝试DOM渲染，最后执行宏任务**，再次触发新的Event Loop开始工作；
5. 轮询查找callback queue，若有则移动到call stack执行；
6. 然后继续轮询查找； 

### 2.1.2、DOM事件和event loop关系

* js是单线程的；
* 异步（ajax/setTimeout）使用回调，基于event loop；
* DOM事件也是使用回调，基于event loop；
* 但DOM 事件不是异步的；

## 2.2、Promise

### 2.2.1、Promise的三种状态

* pending：过程中还没有结果；
* resolved：成功结果；
* rejected：失败结果；

### 2.2.2、状态的表现和变化

* pending状态不会触发then和catch；
* resolve状态会触发后续的then回调函数；
* reject状态会触发后续的catch回调函数；
* pending---->resolved（不可逆）；
* pending---->rejected（不可逆）；
* 不可以从resolved---->rejected；

### 2.2.3、then和catch对状态的影响

* then正常返回resolved，里面有报错则返回rejected；

  ```js
  const p1 = Promise.resolve().then(() => {
    return 100;
  })
  console.log("p1", p1);				// resolved
  p1.then(() => {
    console.log("123")					// resolved 触发后续 then 回调
  })
  
  const p2 = Promise.resolve().then(() => {
    throw new Error("then error");
  })
  console.log("p2", p2);				// rejected
  p2.then(() => {
    console.log("456")					// rejected 无法触发 then 回调
  }).catch(err => {
    console.log("err789", err)	// rejected 触发后续 catch 回调
  })
  ```

* catch正常返回resolved，里面有报错则返回rejected；

  ```js
  const p3 = Promise.reject("my error").catch(err => {
    console.error(err);
  })
  console.log("p3", p3);				// resolved ⚠️⚠️
  p3.then(() => {
    console.log(100)						// resolved 触发后续 then 回调
  })
  
  const p4 = Promise.reject("my error").catch(err => {
    throw new Error("catch err");
  })
  console.log("p4", p4);				// rejected 
  p4.then(() => {
    cosnole.log(200)						// rejected 无法触发 then 回调
  }).catch(err => {
    console.log("some err")			// rejected 触发后续 catch 回调
  })
  ```

## 2.3、async/await

### 2.3.1、async/await基本用法

1. 异步回调，有callback hell的弊端；
2. 开始时候，使用Promise then catch（也是基于回调）链式调用，避免callback hell问题；
3. 现在，使用async/await同步语法，编写异步代码，彻底消灭回调函数；

```js
function loadImg(src) {
  return new Promise(
  	(resolve, reject) => {
      const img = document.createElement("img");
      img.src = src;
     	img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(err);
      }
    }
  )
}

const url1 = "https://cdn.nlark.com/yuque/0/2021/png/114317/1620345547660-assets/web-upload/8254db4f-cc29-4ac7-be38-7b1924a47497.png?x-oss-process=image%2Fresize%2Cw_440";
const url2 = "https://cdn.nlark.com/yuque/0/2021/png/114317/1620353009108-assets/web-upload/8ad45347-b5f0-4485-a3f3-0ba7cb881565.png?x-oss-process=image%2Fresize%2Cw_440";

async function loadImg2() {
  const img2 = await loadImg(url2);
  return img2;
}

(async function () {
  const img1 = await loadImg(url1);
  console.log(img1.height, img1.width);
  
  const img2 = await loadImg2;
  console.log(img2.height, img2.width);
})()
```

### 2.3.2、async/await和Promise的关系

* async/await是消灭异步回调的终极武器；

* async/await和Promise并不互斥，是相辅相成的：

  1. 执行async函数，返回是Promise对象；

     ```js
     async function fn1() {
       // 相当于return Promise.resolve(100);
       return 100;
     }
     
     // 执行async函数，返回一个promise对象
     const res1 = fn1();
     console.log("res1", res1);		// Promise {<fulfilled>: 100}
     
     // res1 是 Promise对象，可以接then/catch
     res1.then(data => {
       console.log("data", data);		// 100
     })
     ```

  2. await相当于Promise的then；

     ```js
     (async function () {
       const p1 = Promise.resolve(300);
       const data1 = await p1;				// await p1 相当于 Promise.resolve(300).then(data1 => conssole.log(data1))
       console.log("data1", data1);	// 300
     })
     
     (async function () {
       const data2 = await 400;			// await 400 相当于 await Promise.resolve(400);
       console.log("data2", data2);	// 400
     })
     
     async function fn1() {
       return 100;
     }
     (async function () {
       const data3 = await fn1();		// await fn1() 相当于 await Promise.resolve(100);
       console.log("data3", data3);	// 100
     })
     ```

  3. try...catch可捕获异常，代替Promise的catch；

     ```js
     (async function () {
       const p4 = Promise.reject("err1");
       try {
         const res = await p4;
         console.log(res);
       } catch (err) {
         console.error(err);
       }
     })()
     ```

## 2.4、异步的本质

* async/await消灭了异步回调，但js还是单线程，还得存在异步，还得基于event loop；
* async/await只是一个语法糖；

```js
async function async1 () {
  console.log("async1 start");	// 2 ⚠️ 此处非异步，应马上执行
  await async2();								// ⚠️ 先执行 async2()，再进行await操作
  // ⚠️ await 后面的代码，都可以看作 callback 里的内容，即异步
  // console.log("async1 end") 类似于:
  // setTimeout(function () {console.log("async1 end")}); 
  // 或
  // Promise.resolve.then(() => { console.log("async1 end") })
  console.log("async1 end");		// 5
};

async function async2 () {
  console.log("async2");				// 3 
};

console.log("script start");		// 1
async1();
console.log("script end");			// 4

// script start
// async1 start
// async2
// script end
// async1 end
```

> 升级

```js
async function async1 () {
  console.log("async1 start");	// 2
  await async2();
  // 下面三行都是异步回调
  console.log("async1 mid");		// 5
  await async3();
  	// 下面一行是异步回调内容
  	console.log("async1 end");	// 7
};

async function async2 () {
  console.log("async2");				// 3
};

async function async3 () {
  console.log("async3");				// 6
}

console.log("script start");		// 1
async1();
console.log("script end");			// 4  同步代码执行完，开始执行event loop异步代码

// script start
// async1 start
// async2
// script end
// async1 mid
// async3
// async1 end
```

## 2.5、异步中的for... of

* for...in/forEach/for是常规的同步遍历；
* for...of常用于异步遍历；

```js
function muti(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(num * num);
        }, 3000)
    })
}

const nums = [1, 2, 3];

// 1秒后，同时将1/4/9输出出来
nums.forEach(async (i) => {
    const res = await muti(i);
    console.log(res);
});

// 每隔3秒输出一个数字按照1/4/9顺序
!(async function () {
    for (let i of nums) {
        const res = await muti(i);
        console.log(res);
    }
})()
```

## 2.6、宏任务/微任务

### 2.6.1、宏任务/微任务基本知识

* 宏任务：setTimeout，setInterval，Ajax，DOM事件；
* 微任务：Promise async/await；
* 微任务执行时机比宏任务要早；

### 2.6.2、why微任务执行时机比宏任务要早？

* 宏任务：DOM渲染后触发，如setTimeout；
* 微任务：DOM渲染前触发，如Promise；

### 2.6.2、why宏任务在DOM渲染后触发，微任务在DOM渲染前触发？

*  why宏任务在DOM渲染后触发？

  <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620746479230-assets/web-upload/461e963f-3ec1-4ae3-aaec-3b6b13b52796.png?x-oss-process=image%2Fresize%2Cw_440" alt="eventloop" style="width: 600px; height: 400px;">

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620746479100-assets/web-upload/85745d31-ba95-478a-8511-6b7f0a1e0860.png?x-oss-process=image%2Fresize%2Cw_440" style="width: 600px; height: 400px;">

* why微任务在DOM渲染前触发？

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620747315868-assets/web-upload/e600d66f-b7c5-4f9b-956e-1c491fde661a.png?x-oss-process=image%2Fresize%2Cw_440" style="width: 600px; height: 400px;">

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620747315796-assets/web-upload/5093ce1c-a5c1-49af-a340-b253805b94d3.png?x-oss-process=image%2Fresize%2Cw_440" style="width: 600px; height: 400px;">

### 2.6.3、♨️总结♨️

1. 同步 js 代码在 Call Stack 执行；

   * 遇到微任务，将微任务的 then 或 catch 的 callback 函数插到 micro task queue 队列尾；

   * 遇到宏任务，将宏任务中的 callback 函数放到 webAPIs ；
     * webAPIs 等待时机，将宏任务中的 callback 函数插到 Callback Queue 队列尾；

2. 同步代码执行完毕，Call Stack 清空；

3. 执行当前微任务队列，直到清空：

   * micro task queue 队列中 callback 函数，按先进先出的顺序，从队列头到队列尾，依次放到 Call Stack 全部执行；
     * 若微任务中嵌套了宏任务，则将该宏任务也放到 webAPIs 中，按照宏任务处理；

4. 尝试 DOM 渲染；

5. 执行当前宏任务队列，直到清空：

   * Callback Queue 队列中 callback 函数，按先进先出的顺序，从队列头到队列尾，依次放到 Call Stack 执行；
     * 若某个宏任务中嵌套了微任务；
     * 则先清空上个宏任务中嵌套的微任务；
     * 再尝试 DOM 渲染；
     * 最后再执行下个宏任务；

> 即：同步完成，所有微任务；一个宏任务，所有微任务；一个宏任务，所有微任务......
>
> 与 node 的差异：
>
> - 浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。
> - 在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。

