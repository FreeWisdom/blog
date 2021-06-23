> 🈳️：待补充
>
> ✍️：需手写
>
> ♨️：重要

# 1⃣️ THML & CSS

# 2⃣️ JS

## 1、var/let/const的区别？

* var

  * 变量声明提升

    ```js
    console.log(a);
    var a = 100;
    ```

    等价于

    ```js
    var a;
    console.log(a);
    a = 100;
    ```

* let

  * 块级作用域
  * 变量

* const

  * 块级作用域
  * 常量

## 2、typeof返回哪些类型？

* 可以识别所有值类型
  * string
  * number
  * boolean
  * symbol
  * undefined
* 可以识别的引用类型中
  * function
* 不可以识别的引用类型
  * object    ====>    object
  * array     ====>    object
  * null        ====>    object
* 应该使用 `Object.prototype.toString.call(obj)` ；

## 3、请列举强制类型转换和隐式类型转换

* 强制类型转换：
  * parseInt(string, redix)
    * 字符串转数字（整数）
    * 将空格或数字开头的字符串（第一个参数）中第一个数字（不含小数点），按照基数（第二个参数）转换成数字；
  * parseFloat(string)
    * 字符串转数字（小数）
    * 将空格或数字开头的字符串（第一个参数）中第一个数字（含小数点）转换成数字；
  * NumberObject.toString(redix)
    * 数字转字符串
    * 将数字转以 redix 为基数，换成字符串
* 隐式类型转换：
  * if
  * 逻辑运算
  * +字符串拼接
  * ==双等号

## 4、== 和 === 的不同？

* == 会类型转换
* === 不会进行类型转换，严格相等
* 只有在判断 a == null 时使用 == ；
  * 包含了a === null ||  a === undefined；

## 5、✍️手写深度比较 lodash isEqual

* 实现以下效果：

  ```js
  const obj1 = {a: 10, b: {x: 100, y: 200}};
  const obj2 = {a: 10, b: {x: 100, y: 200}};
  isEqual(obj1, obj2) === true;
  ```

* 手写深度比较

  ```js
  function isObj(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  function isEqual(obj1, obj2) {
    // 若两个值都不是对象，则可能是 值类型 间的判断；
    if(!isObj(obj1) || !isObj(obj2)) {
      return obj1 === obj2;
    }
    
    // 兼容两个相等的参数传入；
    if(obj1 === obj2) {
      return true;
    }
    
    // 两个对象都是 引用类型 间的判断；
    // 1、取出对象或数组的 Object.keys().length 的长度做比较，若数量不同肯定不同；
    if(Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    // 2、以 obj1 为基准，和 obj2 递归比较；
    for(let key in obj1) {
      const res = isEqual(obj1[key], obj2[key]);
      if(!res) {
        return false;
      }
    }
    // 3、全相等
    return true;
  }
  ```

## 6、split 和 join 的区别

```js
'1-2-3'.split('-');
// ["1", "2", "3"]
["1", "2", "3"].join('-');
// "1-2-3"
```

## 7、数组的pop/push/shift/unshift作用

* pop
  * 返回数组中最后一个值；
  * 改变原数组；
* push
  * 返回新数组的length；
  * 改变原数组；
* shift
  * 返回数组中第一个值；
  * 改变原数组；
* unshift
  * 返回新数组的length；
  * 改变原数组；

## 8、数组的 API 哪些是纯函数？

* 纯函数：不改变原数组（无副作用）、返回一个数组；

  * concat

    ```js
    const array1 = ['a', 'b', 'c'];
    const array2 = ['d', 'e', 'f'];
    const array3 = array1.concat(array2);
    
    console.log(array3);
    // expected output: Array ["a", "b", "c", "d", "e", "f"]
    ```

  * map

    ```js
    const array1 = [1, 4, 9, 16];
    
    // pass a function to map
    const map1 = array1.map(x => x * 2);
    
    console.log(map1);
    // expected output: Array [2, 8, 18, 32]
    ```

  * filter

    ```js
    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    
    const result = words.filter(word => word.length > 6);
    
    console.log(result);
    // expected output: Array ["exuberant", "destruction", "present"]
    ```

  * ✅ slice

    ```js
    const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
    
    console.log(animals.slice(2));
    // expected output: Array ["camel", "duck", "elephant"]
    
    console.log(animals.slice(2, 4));
    // expected output: Array ["camel", "duck"]
    
    console.log(animals.slice(1, 5));
    // expected output: Array ["bison", "camel", "duck", "elephant"]
    ```

* 非纯函数：

  * ✅ push

  * ✅ pop

  * ✅ shift

  * ✅ unshift

  * foreach

    * `forEach()` 方法对数组的每个元素执行一次给定的函数。
    * `forEach()` 被调用时，不会改变原数组，也就是调用它的数组（尽管 `callback` 函数在被调用时可能会改变原数组）。

    ```js
    const array1 = ['a', 'b', 'c'];
    
    array1.forEach(element => console.log(element));
    
    // expected output: "a"
    // expected output: "b"
    // expected output: "c"
    ```

  * some

    * `some()` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

    ```js
    const array = [1, 2, 3, 4, 5];
    
    // checks whether an element is even
    const even = (element) => element % 2 === 0;
    
    console.log(array.some(even));
    // expected output: true
    ```

  * every

    * `every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

    ```js
    const isBelowThreshold = (currentValue) => currentValue < 40;
    
    const array1 = [1, 30, 39, 29, 10, 13];
    
    console.log(array1.every(isBelowThreshold));
    // expected output: true
    ```

  * reduce

    * `reduce()` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

    ```js
    const array1 = [1, 2, 3, 4];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    // 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer));
    // expected output: 10
    
    // 5 + 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer, 5));
    // expected output: 15
    ```

  * ✅ splice

    * 剪接

    ```js
    const months = ['Jan', 'March', 'April', 'June'];
    months.splice(1, 0, 'Feb');
    // inserts at index 1
    console.log(months);
    // expected output: Array ["Jan", "Feb", "March", "April", "June"]
    
    months.splice(4, 1, 'May');
    // replaces 1 element at index 4
    console.log(months);
    // expected output: Array ["Jan", "Feb", "March", "April", "May"]
    ```

## 9、数组 slice 和 splice 区别

* 功能区别

  * slice：切片；

    ```js
    const arr = [10, 20, 30, 40, 50]
    
    // slice 纯函数   返回值为新数组
    const arr1 = arr.slice()			// [10, 20, 30, 40, 50]
    const arr2 = arr.slice(1, 4)	// [20, 30, 40]
    const arr3 = arr.slice(2)			// [30, 40, 50]
    const arr4 = arr.slice(-3)		// [30, 40, 50]
    console.log(arr)							// [10, 20, 30, 40, 50]
    ```

  * splice：剪接；

    ```js
    const arr = [10, 20, 30, 40, 50]
    
    // splice 非纯函数    返回值为原数组
    const spliceRes = arr.splice(1, 2, 'a', 'b', 'c')
    // const spliceRes1 = arr.splice(1, 2)										// 只剪不接
    // const spliceRes2 = arr.splice(1, 0, 'a', 'b', 'c')			// 只接不剪
    console.log(spliceRes, arr)
    // [20, 30]
    // [10, 'a', 'b', 'c', 40, 50]
    ```

* 参数和返回值

* 是否是纯函数

## 10、[10, 20, 30].map(parseInt)返回结果是什么？

* map参数（函数(item,index)），返回值（数组）
* parseInt参数（数,进制位），返回值（int值）

```js
const res = [10, 20, 30].map(parseInt)
console.log(res)		// [10, NaN, NaN]

// 拆解
[10, 20, 30].map((num, index) => {
    return parseInt(num, index)
})
```

## 11、✍️🈳函数 call / apply / bind 的区别？

* call /apply 区别在于第二个参数：

```js
fn.call(obj, 1, 2);						// 第二个参数零散拆分
fn.apply(obj, [1, 2]);				// 第二个参数数组或类数组的集合
```

* call / bind 区别在于立即执行还是等待执行：

```js
fn.call(obj, 1, 2); // 改变fn中的this，并且把fn立即执行
fn.bind(obj, 1, 2); // 改变fn中的this，fn并不执行
```

1. 手写 call 函数
2. 手写 bind 函数
3. 手写 apply 函数

## 12、闭包

1. 闭包是什么？

   1. 能够访问其他函数内部变量的函数；

   2. 有两种表现：
      1. 函数作为参数被传入；
      2. 函数作为返回值被返回；
   3. 自由变量的查找，要在函数定义的地方，而非执行的地方；

2. 闭包解决了什么问题？

   1. 函数内部能读取全局变量，函数外部无法读取函数内部的变量（局部变量），为了在函数外部读取局部变量，所以就有了闭包；

   2. ES5 之前 JS 是没有局部变量的，所以程序员发明了闭包，用来封装变量，把变量隐藏起来，不让外面修改；

3. 闭包的实际应用？https://cloud.tencent.com/developer/article/1728078?from=information.detail.js%E9%97%AD%E5%8C%85%E5%BA%94%E7%94%A8

   * 防抖
   * 节流
   * 高阶函数
   * 定时器
   * 事件绑定

4. 闭包有哪些影响？
   * 变量会常驻内存，得不到释放，不要乱用，可能造成内存泄漏；

## 13、JS 垃圾回收机制？

*  JS 垃圾回收机制采用**标记清楚法**：
   * 存在一个根结点，始终不会被回收，称为 GC root（即，浏览器中为 window， dom 根结点）；
   * 与 GC root 不链接的节点（即，不可访达的节点）被垃圾回收清除；

## 14、什么导致内存泄漏？

1. 使用过多的全局变量，存储了大量数据；

   *  GC root 在浏览器中称为 window，而全局变量是 window 的属性，故全局变量始终不回收；
   *  故使用过多的全局变量，存储了大量数据，就会导致内存泄漏；
   *  ✅ 建议：全局变量谨慎使用；

   ```html
   <body>
     <button onclick="grow()">全局变量</button>
     <script>
     	function largeObj() {
         this.largeArray = new Array(1000000);
       }
       
       // 全局变量存储大量数据，会导致内存泄漏；
       var x = [];
       
       function grow() {
         var o = new largeObj();
         x.push(o);
       }
     </script>
   </body>
   ```

2. 分离的 DOM 节点：

   * 节点从 DOM 树上删除了，但 js 仍留着对它的引用，就会导致内存泄漏；
   * ✅ 建议：js 对 dom 的引用，放在使用该 dom 的函数中，函数执行完，js 对 dom 的引用同时被垃圾回收；

   ```html
   <body>
     <button id="button">移除列表</button>
     <ul id="list">
       <li>项目 1</li>
     </ul>
     <script>
     	var button = document.getElementById('button');
       var list = document.getELementById('list');
       button.addEventListener('click', function() {
         // 建议将引用放在函数中；
         // var list = document.getELementById('list');
         list.remove();
       })
     </script>
   </body>
   ```

3. 闭包：

   * ♨️ ***函数实例上的隐式指针会留存实例创建环境下的作用域对象***； 
   * ✅ 建议：及时清除定时器、计时器，解除事件绑定，在退出函数之前，将不使用的局部变量全部删除。可以使变量赋值为null；

   ```js
   var funcs = [];
   function outer() {
     var someText = new Array(100000000);
     return function inner() {
       return someText;
     }
   }
   
   function closure() {
     // funcs 数组中每个 outer 函数的实例，都留存着各自定义作用域中的超大的数组对象；
     funcs.push(outer());
   }
   ```

4. 使用 `console.log()` 等进行控制台打印：

   * 控制台随时保持查看，需要保存打印，故会导致内存泄漏；
   * ✅ 建议：生产环境，删掉调试语句；

## 15、关于 this 的场景题

* this 值在执行的时候下结论，切勿在定义的时候下结论；

```js
const zhangsan = {
  sayHi() {
    console.log(this);			// {sayHi: ƒ, await: ƒ, awaitAgain: ƒ}
  },
  await() {
    setTimeout(function() {
      console.log(this);		// window	由于在 webAPI 中运行，脱离原函数，故指向 window，用尖头函数解决该问题；
    }, 1000)
  },
  awaitAgain() {
    setTimeout(() => {
      console.log(this);		// {sayHi: ƒ, await: ƒ, awaitAgain: ƒ}
    }, 1000)
  }
}
```

## 16、关于作用域和自由变量的场景题

```js
let i;for(i = 1; i <= 3; i++) {  setTimeout(function () {    console.log(i);  }, 0)}// 4// 4// 4// 4
```

```js
let a =100;function test() {  alert(a);  a = 10;  alert(a);};test();alert(a);// 100// 10// 10
```

## 17、函数声明和函数表达式的区别？

* 函数声明：`function fn() {...}`
  * 函数声明会在代码执行前**预加载**；
* 函数表达式：`const fn = function () {...}`
  * 函数表达式，**不会预加载**；

## 18、讲一下原型和原型链吧？

* 原型关系如下：

1. 每个类都有显示原型 `prototype` ；
2. 每个实例都有隐式原型 `__proto__` ；
3. 实例的隐式原型 `__proto__` 指向类的显示原型 `prototype` ；

* 原型链：实例获取属性或调取方法，会先在自身找，若找不到则顺着 `__proto__` 寻找，一直找到 `Object.prototype.__proto__` ；

## 19、如何判断一个变量是不是数组？

```js
const a = [1, 2, 3];a instanceof Array;		// true
```

## 20、🈳️如何用 JS 实现继承？（8种）

* Class 继承
* prototype 继承（不推荐）

## 21、new Object() 和 Object.create() 的区别？

* new Object(xxx) 

  ```js
  const obj1 = {  a: 10,  b: 20};const obj2 = new Object(obj1);console.log(obj1 === obj2);			// true，地址相同
  ```

* Object.create(xxx) 会创建一个空对象，并且该空对象的`__proto__`原型指向传入的对象；

  ```js
  const obj1 = Object.create(null);const obj2 = Object.create({  a: 10,  b: 20});console.log(obj1);// {}// 		No propertiesconsole.log(obj2);// {}// 		__proto__: // 			a: 10// 			b: 20// 			__proto__: Object
  ```

## 22、什么是同步/异步？

* JS 是单线程语言，同一时刻只能做一件事；
* 若遇到等待（网络请求/定时任务）不能卡主 js 运行；
* 因此异步就应运而生，基于event loop；
* 异步不会阻塞代码执行，同步会阻塞执行；

## 23、✍️🈳️手写ajax（普通+promise）

```js
// 普通function ajax(url, successFn) {  const xhr = new XHMHttpRequest();  xhr.open("GET", url, true);	xhr.onreadystatechange = function () {    if(xhr.readyState === 4) {      if(xhr.status === 200) {        successFn(xhr.responseText);      }    }  }  xhr.send(null);}
```

```js
// promise版function ajax(url) {  const p = new Promise((resolve, reject) => {    const xhr = new XMLHttpRequest();    xhr.open("GET", url, true);    xhr.onreadystatechange = function () {      if(xhr.readystate === 4) {        if(xhr.status === 200) {          resolve(          	JSON.parse(xhr.responseText);          )        } else if(xhr === 404) {          reject(          	new Error("404 not found");          )        }      }    }    xhr.send(null);  })  return p;};const url = '/xxx/xxx.json';ajax(url)	.then(res => {  	console.log(res);	})	.catch(err => {  	console.error(err);	})
```

## 24、请描述event loop的机制

### 24.1、浏览器中的 event loop

1. js是单线程的；
   * 异步（ajax/setTimeout）使用回调，基于event loop；
   * DOM事件也是使用回调，基于event loop，但DOM 事件不是异步的；
2. 描述 event loop 机制：
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

### 24.2、node 中的 event loop

1. js执行为单线程，所有代码皆在主线程调用栈完成执行，当主线程任务清空后才会去轮询取任务队列中任务；

2. 在node中事件**每一轮**循环按照**顺序**分为6个阶段，来自**libuv**的实现：
   1. timers【Timers Queue】：执行满足条件的setTimeout、setInterval回调。
   2. I/O callbacks【I/O Queue】：是否有已完成的I/O操作的回调函数，来自上一轮的poll残留。
   3. idle，prepare：可忽略
   4. poll：等待还没完成的I/O事件，会因timers和超时时间等结束等待。
   5. check【Check Queue】：执行setImmediate的回调。
   6. close callbacks【Close Queue】：关闭所有的closing handles，一些onclose事件。
3. process.nextTick 函数：
   1. 独立于 `Event Loop` 之外的，它有一个自己的队列；
   2. 当每个阶段完成后，如果存在`nextTick`队列，就会清空队列中的所有回调函数，并且优先于其他 `microtask` 执行。

### 24.3、node 和浏览器 之间的 event loop 有何差异？

⚠️有一个特别容易混淆的版本改变：

- 如果是node10及其之前版本：
  - 宏队列当中的有几个宏任务，是要等到宏队列当中的所有宏任务全部执行完毕才会去执行微队列当中的微任务。
- 如果是node11版本：
  - 一旦执行一个阶段里对应宏队列当中的一个宏任务(setTimeout,setInterval和setImmediate三者其中之一，不包括I/O)就立刻执行微任务队列，执行完微队列当中的所有微任务再回到刚才的宏队列执行下一个宏任务。这就跟浏览器端运行一致了。

## 25、什么是宏任务和微任务，两者有什么区别？

* 宏任务和微任务有哪些？
  1. 宏任务：setTimeout，setInterval，Ajax，DOM事件；
  2. 微任务：Promise async/await；
  3. 微任务执行时机比宏任务要早；
* 为何微任务执行时机比宏任务要早？
  * 宏任务：DOM渲染后触发，如setTimeout；
  * 微任务：DOM渲染前触发，如Promise；

## 26、Promise 有了解吗？

1. Promise 是一种异步编程的解决方案，解决了异步流程控制的回调地狱问题；

2. 是一个状态机：pending 只能流转到 resolve 或者 reject，resolve 和 reject 不能互相流转；

   * pending

   * fulfilled/resolved
   * rejected

3. .then & .catch 
   * resolved 状态的 Promise 会回调后面的第一个 .then；
   * rejected 状态的 Promise 会回调后面的第一个 .catch；
     * 任何一个 rejected 状态后面没有 .catch 的 Promise ，都会造成 Js环境的全局错误；

4. 执行 then 和 catch 会返回一个新的 Promise，该 Promise 最终状态根据 then 和 catch 的回调函数的执行结果决定：
   * 如果回调函数最终结果是 throw，则该 Promise 是 rejected 状态；
   * 如果回调函数最终结果是 return，则该 Promise 是 resolved 状态；
   * 如果回调函数最终 return 了一个新 Promise ，则该老 Promise 会和回调函数 return 的新 Promise 状态保持一致；
     * 这种 Promise 的链式调用中，可以串行的执行多个异步任务；
5. Promise.all([promise1, promise2]) 接受一个数组，数组中可以包含多个 promise ；
   * 数组中所有的 promise 状态都为 resolved 时，会回调后面的第一个 .then；
   * 数组中所有的 promise 状态都为 rejected 时，会回调后面的第一个 .catch；

## 27、判断字符串以字母开头，后面字母数字下划线，长度6-30

* `const reg = /^[a-zA-Z]\w{5,29}$/`

* 正则表达式规则

  ```js
  // 邮政编码
  /\d{6}/
  //小写英文字母
  /^[a-z]$/
  // 英文字母
  /^[a-zA-Z]+$/
  // 日期格式
  /^\d{4}-\d{1,2}-\d{1,2}$/
  // 用户名
  /^[a-zA-Z]\w{5, 17}$/
  // 简单的 IP 地址
  /\d+\.\d+\.\d+/
  ```

## 28、✍️手写字符串 trim 方法，保证浏览器兼容性

```js
String.prototype.trim = function () {
  return this.replace(/^\s+/,'').replace(/\s+$/,'');
}
```

## 29、如何获取多个数字中的最大值？

```js
Math.max(10, 20, 30);
// 30
```

## 30、如何捕获 js 程序异常？

* 手动捕获

```js
try {
    tryCode - 尝试执行代码块
}
catch(err) {
    catchCode - 捕获错误的代码块
}
finally {
    finallyCode - 无论 try / catch 结果如何都会执行的代码块
}
```

* 自动捕获

```js
window.onerror = function (message, source, linenum, colnum, error) {
  // ①，对跨域 js ，如cdn不会有详细报错信息；
  // ②，对于压缩 js ，还要配合 sourceMap 反查到未压缩代码的行列；
}
```

## 31、✍️手写数组 flatern ，考虑多层级

```js
function flat(arr) {
  // 先判断 arr 中是否还有类似 [1, 2, [3, 4]] 的深层数组；
  // 若没有则直接返回 arr， 已被拍平，走出递归；
	const isDeep = arr.some(item => item instanceof Array);
  if(!isDeep) {
    return arr;
  }
  
  // 若有，则执行递归，继续拍；
  const res = Array.prototype.concat.apply([], arr);
  return flat(res);
}

flat([[1, 2], 3, [4, 5, [6, 7, [8, 9, [10, 11]]]]]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
```

## 32、✍️数组去重

* 传统方式，遍历元素挨个比较、去重

  ```js
  const arr = [1, 1, 2, 2, 00, 44, 3];
  function unique(arr) {
    const res = [];
    arr.forEach(item => {
      if(res.indexOf(item) < 0) {
        res.push(item);
      }
    })
    return res;
  };
  unique(arr);
  // [1, 2, 0, 44, 3]
  ```

* 使用 Set（无序结构，不能重复，效率较高）

  ```js
  function unique(arr) {
    const set = new Set(arr);
    return [...set];
  }
  
  unique(arr);
  // [1, 2, 0, 44, 3]
  ```

## 33、✍️手写深拷贝

* **深拷贝和浅拷贝区别是啥？**

  * **浅拷贝**只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存；
  * **深拷贝**会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

* ⚠️Object.assign() 

  * **第一层级是深拷贝**；
  * **第二层级及更深层级是浅拷贝**；

  ```js
  const obj = {a: 10, b: {x: 100, y: 200}};
  const obj1 = Object.assign({}, obj, {c: 30});
  
  console.log(obj);		// {a: 10, b: {x: 100, y: 200}}
  console.log(obj1);	// {a: 10, b: {x: 100, y: 200}, c: 30}
  
  obj.a = 66;
  console.log(obj);		// {a: 66, b: {x: 100, y: 200}}
  console.log(obj1);	// {a: 10, b: {x: 100, y: 200}, c: 30}		obj1.a 不改变，故第一层级深拷贝
  
  obj.b.x = 888;
  console.log(obj);		// {a: 66, b: {x: 888, y: 200}}
  console.log(obj);		// {a: 10, b: {x: 888, y: 200}, c: 30}		obj1.b.x 改变，故第二层级或更深层级为浅拷贝
  ```

* 手写深拷贝：

```js
function deepClone(obj = {}) {
  // 值类型直接返回，过滤引用类型，若是值类型，直接原本返回；
  if(typeof obj !== 'object' && typeof obj === null) {
    return obj;
  };
  
  // 引用类型
  // 判断是对象还是数组，对返回值初始化
  let res;
  if(obj instanceof Array) {
    res = [];
  } else {
    res = {};
  };
  for(let key in obj) {
    // hasOwnProperty 该方法，检测一个对象是否含有特定的自身属性；会忽略掉那些从原型链上继承到的属性。
    if(obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key]);
    }
  }
  return res;

```

## 34、介绍 RAF request animation frame

* 要想动画流畅，更新频率要 60帧/s，即 16.67ms 更新一次视图；
* js 控制要使用 setTimeout 手动控制频率；
* RAF 控制时，浏览器会自动控制；
* 若页面切换到后台标签或隐藏iframe中，使用 RAF 浏览器会帮助暂停，而使用 setTimeout 则浏览器会依然之行； 

## 35、new 调用函数和直接调用函数区别？

* 如果函数返回值为值类型（Number、String、Boolean）时：
  * new 调用函数---- 将会返回一个该函数的实例对象；
  * 直接调用函数 ---- 将会返回该值类型；
* 如果函数返回一个引用类型（Object、Array、Function）时：
  * new 调用函数与直接调用函数产生的结果等同，都是该函数返回的对象；

https://blog.csdn.net/hy6688_/article/details/22453043?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control

## 36、匿名函数和箭头函数的区别？

1. 箭头函数没有`prototype`(原型)，所以箭头函数本身没有this。

```js
let a = () => {};
console.log(a.prototype); 									// undefined
```

2. 箭头函数内部的this是词法作用域，由上下文确定，this指向在定义的时候继承自外层第一个普通函数的this；

3. 匿名函数中，因为匿名函数的执行环境具有全局性，所以它的 this 一般指向 window；

   ```js
   var name = 'window'
       var person = {
           name :'Alan',
           sayName:function () {
             	// var that = this						// 把外部作用域的this传递给匿名函数
               return function () {
                   console.log(this.name)		// 这里sayName方法return了一个匿名函数，这个匿名函数中this指向window
               }
           }
       }
       person.sayName()()  									// window
   ```

## 37、✍️实现一个简单的 EventEmitter ，要求包括 on/emit/off 

https://www.xiabingbao.com/post/design/observer-eventemitter.html

## 38、实现一个 calculator

https://leetcode-cn.com/problems/basic-calculator/

## 39、将 location.search 中键值对，按照键的首字母顺序重排，返回新的 url



# 3⃣️ JS-web-API

## 1、常用的 DOM 操作有哪些？

* 创建：
  * `document.createElement('xxx')`
* 删除：
  * `xxx.removeChild('yyy')`；
* 改：
  * `xxx.opendChild('yyy')`；
* 查找：
  * `document.getElementById('xxx')`；
  * `document.getElementByTagName('xxx')`；
  * `document.getElementByClassName('xxx')`；
  * `document.querySelector('xxx')`；
  * `document.querySelectorAll('xxx')`；
  * `body.childNodes` childNodes 属性返回节点的子节点集合，以 NodeList 对象;

## 2、attrribute 和 property 区别？

- property 是 DOM 中的属性，是 JavaScript 里的对象；
  - Property是这个DOM元素作为对象，其附加的内容，例如childNodes、firstChild等。
  - 修改对象属性，不一定体现到html结构中；
- attribute 是 HTML 标签上的特性，它的值只能够是字符串；
  - 修改html属性，会改变html结构，可能引起DOM重新渲染；
  - Attribute就是dom节点自带的属性，例如html中常用的id、class、title、align等。

## 3、如何识别浏览器的类型？

* navigator.userAgent

## 4、♨️如何分析拆解URL各个部分？

* `location.href` ；
* `location.protocal` ；
* `location.host` ；
* `location.hostname` ；
* `location.port` ；
* `location.pathname` ；
* `location.search` ；
* `location.hash` ；

## 5、事件代理（委托）是什么？

* 利用事件冒泡将事件代理到父元素

## 6、如何阻止事件冒泡和默认行为？

* event.stopPropagation()
* event.preventDefault()

## 7、document load 和 ready 的区别？

```js
window.addEventListener('load', function () {  //页面加载完全部资源才会执行，包括图片/视频})document.addEventListener('DOMContentLoaded', function () {  // DOM 渲染完即可执行，此时图片、视频可能还未加载完})
```

## 8、什么是 cookie？

* 用于**浏览器和server通讯**；
* 如何使用：
  * 可用 `document.cookie = "a=100"` 来修改；
  * 同一key会覆盖，不同key需要多次追加，一次只能加一个；
* 缺点：
  * 存储大小，最大4KB；
  * http 请求时需要发送到服务端，增加请求数据量；
  * `document.cookie = "a=100"`的API使用方式不舒服，每次只能追加一个key；

## 9、localStorage 和 sessionStorage 的区别？

* HTML5专门为存储而设计的，最大可存5M；

* 如何使用：

  ```js
  localStorage.setItem("a", 100);							// 自动被转换成字符串localStorage.setItem("b", "200");localStorage.getItem("a");									// 100 自动被转换成字符串 "100"localStorage.getItem("b");									// "200"localStorage.setItem('myCat', 'Tom');				// 加了一个 localStorage 项let cat = localStorage.getItem('myCat');		// 读取 localStorage 项localStorage.removeItem('myCat');						// 移除 localStorage 项localStorage.clear();												// 移除所有的 localStorage 项sessionStorage.setItem('key', 'value');			// 保存数据到 sessionStoragelet data = sessionStorage.getItem('key');		// 从 sessionStorage 获取数据sessionStorage.removeItem('key');						// 从 sessionStorage 删除保存的数据sessionStorage.clear();											// 从 sessionStorage 删除所有保存的数据
  ```

* localStorage / sessionStorage 与 cookie 的区别？

  * 不随着 http 请求被发送出去；

* 区别：

  * localStorage 数据会永久存储，除非代码或手动删除；
  * sessionStorage 数据只存在于当前会话，浏览器关闭则清空；

# 4⃣️ HTTP

## 1、什么是跨域（同源策略）？

* ajax请求时，浏览器要求当前网页和server必须符合同源策略，即 协议、域名、端口，三者一致；

* 加载 图片/css/js 可无视同源策略

  * `<img src=跨域图片地址 />`

    * 可用于统计打点，访问静态页面时，通过img标签指定src 为访问统计的地址， img标签向统计程序发出请求，实现统计

      统计示例代码采用文件来记录访问次数，实际项目可以记录数据库；

  * `<link href=跨域css地址 />`

    * 可使用CDN，CDN一般都是外域；

  * `<script src=跨域js地址></script>`

    * 可实现 JSONP；

## 2、解释 jsonp 的原理，为何它不是真正的 ajax ？

* jsonp 原理
  * script 标签绕过同源策略限制进行跨域，携带 callback=abc ；
  * 服务端在 callback 中返回 json 数据 abc( {a: 10, b:20} )；
  * 前端调用 callback 函数 window.abc = function (data) {console.log(data)} 就可以获得数据；
* 为何它不是真正的 ajax
  * ajax 依据 XMLHttpRequest API；
  * jsonp 依据 `<script>` 标签可绕过跨域限制；

## 3、CORS（服务端支持）

```js
// 第二个参数填写允许跨域的域名称，不建议直接写"*";response.setHeader("Access-Control-Allow-Origin", "http//localhost:8011");// 接收跨域的cookieresponse.seterHeader("Access-Control-Allow-Credentials", "true");
```

## 4、🈳️fetch 与 axios

## 5、✍️手写XMLHttpRequest

```js
// GET 请求const xhr = new XMLHttpRequest();xhr.open("GET", "/data/test.json", true);	// true 异步请求xhr.onreadystatechange = function () {  if(xhr.readyState === 4) {    if(xhr.status === 200) {      console.log(JSON.parse(xhr.responseText));	// 转换成json形式      alert(xhr.responseText);    } else {      console.log("其他情况")    }  }}；xhr.send(null);			// get请求不用发送数据
```

```js
// POST 请求const xhr = new XMLHttpRequest();xhr.open("POST", "/login.json", true);xhr.onreadystatechange = function () {  if(xhr.readyState === 4) {    if(xhr.status === 200) {      console.log(JSON.parse(xhr.responseText))    }  }}const data = {  usr: zhz,  pasw: xxx}xhr.send(JSON.stringify(data));		// post请求发送字符串
```

## 6、了解 readyState 吗？

* 0-（未初始化）还没有调用send()方法；

* 1-（载入）已调用send()方法，正在发送请求；
* 2-（载入完成）send()方法执行完成，已接收到全部响应内容；
* 3-（交互）正在解析响应内容；
* 4-（完成）相应内容解析完成，可在客户端调用；

## 7、了解 xhr.status 吗？

* 1xx - 服务器收到请求；
* 2xx - 请求成功；
  * 200 - 成功；
* 3xx - 重定向；
  * 301 - 永久重定向，配合新地址（location）浏览器自动处理，下次直接访问新地址； 
  * 302 - 临时重定向，配合新地址（location）浏览器自动处理，下次访问旧地址；
  * 304 - 资源未被修改，浏览器读缓存；
* 4xx - 客户端错误；
  * 404 - 资源未找到，客户端路径错误；
  * 403 - 客户端没有权限；
* 5xx - 服务端错误；
  * 500 - 服务器错误；
  * 540 - 网关超时；

## 8、ajax 请求 get 和 post 的区别？

* get 一般用于查询操作，post 一般用于用户提交操作；
* get 参数拼接在 url 上，post 放在请求体内（数据体积可更大）；
* 安全性：post 易于防止 CSRF；

## 9、Rrestful API

1. 了解 Rrestful API 吗？
   * 是一种新的 API 设计方法；
   * 传统 API 设计把每个 **url 当作一个功能**；
   * Rrestful API 设计把每个 **url 当作一个唯一的资源**；

2. 如何设计 Rrestful API ？
   1. 尽量不用 url 参数，即不用 location.search 部分；
   2. 用 location.pathname 部直接表示要请求的资源；

## 10、常见的请求Request Headers

* Accept 浏览器可接收的数据格式；
* Accept-Encoding 浏览器可接收的压缩算法，如 gzip；
* Accept-Language 浏览器可接收的语言，如 zh-CN；
* Connection：keep-alive 一次TCP连接重复使用；
* cookie；
* Host 域名；
* User-Agent 浏览器信息；
* Cotent-type 发送数据的格式，如 application/json；
* **If-None-Match** 客户端发送资源唯一标识，用于协商缓存；
* **If-Modified-Since** 客户端发送资源最后修改时间，用于协商缓存；

## 11、常见的返回Response Headers

* Cotent-type 返回数据的格式，如 application/json；
* Cotent-length 返回数据的大小，多少字节；
* Cotent-Encoding 返回数据的压缩算法，如 gzip；
* Set-Cookie 服务端设置cookie；
* **Catch-Control** 服务端返回资源缓存时间，用于强制缓存，status-200；
* **Etag** 服务端返回资源唯一标识，用于协商缓存，status-304；
* **Last-Modified** 服务端返回资源最后修改时间，用于协商缓存，status-304；

## 12、什么是 JSON ?

* 是一种数据格式，本质是一段字符串；
* json 格式和 js 对象结构一致，对 js 语言友好；
* window.JSON 是一个全局对象：
  * JSON.stringify()-----对象转换成JSON；
  * JSON.parse()--------JSON转换成对象；

## 13、✍️获取当前页面 url 参数

* 传统方式：

  * location.search

  ```js
  // search:'a=10&b=20&c=30'
  function query(name) {  
    const search = location.search.substr(1);		// 删除 ? 号  
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');  
    const res = search.match(reg);  
    if(res === null) {    
      return null;  
    }  
    return res[2]
  };
  query('a');
  ```

* 新API，注意兼容

  * URLSearchParams

  ```js
  // search:'?a=10&b=20&c=30'
  function query(name) {  
    const search = location.search;  
    const p = new URLSearchParams(search);  
    return p.get(name);
  };
  query('a')
  ```

## 14、✍️将 url 参数解析为 JS 对象

```js
function urlToObj() {  
  const res = {};  
  const search = location.search.substr(1);  
  search.split('&').forEach( paramStr => {    
    const paramArr = paramStr.split('=');    
    const key = paramArr[0];    
    const val = paramArr[1];    
    res[key] = val;  });  
  return res;
}
```

```js
function urlToObj() {
  const res = {};
  const parList = new URLSearchParams(location.search);
  parList.forEach((val, key) => {
    res[key] = val;
  })
  return res;
}
```

## 15、♨️♨️了解 http 缓存吗？

### 15.1、强制缓存

* 后端若认为，资源适合做缓存，则在 Response Headers 中 设置 `Cache-Control: max-age=518400` ；
* 浏览器再次访问该资源时，若 max-age 设置的时间未过期，则命中缓存，不必请求；
* 若超过 Cache-Control 时间，缓存资源失效，浏览器则再次请求服务器，重新获取资源，并重新设置缓存时间；
  * ♨️max-age：最大缓存时间
  * ♨️no-catch：不用强制缓存，正常请求；
  * no-store：不用强制缓存，且不用服务端协商缓存，就是要服务端返回；
  * private：允许最终用户电脑、浏览器、手机做缓存；
  * public：允许中间的路由、代理做缓存；
* expires 已经被 catch-control 代替。
* webpack 的 `bundle.[hashcontent:8].js` 用的就是强缓存；

### 15.2、协商缓存

* 过程：
  * 浏览器初次请求，服务端返回 **资源** + **资源标识 **给浏览器；
  * 浏览器携带 **资源标识** 再次请求，服务端根据 **资源标识** 判断客户端资源，是否和服务端一致；
  * 一致，则返回304，浏览器使用缓存资源；
  * 不一致，则返回200 + 最新资源 + 资源标识；
* 协商缓存包含两种资源标识：
  * Etag（比时间戳更精确）
    1. 第一次访问，Response Header 中，服务端返回给浏览器资源，并标识为 `Etag: 资源🆔` ；
    2. 第二次访问，浏览器中需要在 Request Header 中携带 `If-None-Match: 资源🆔` ；
    3. 服务器根据 `资源🆔` 判断，资源是否改变；
    4. 未改变，返回304，命中缓存；
    5. 若改变，重新返回资源与 Etag ；
  * Last-Modified（只精确到秒级）
    1. 第一次访问，Response Header 中，服务端返回给浏览器资源，并标识为 `Last-Modified: 时间戳⌚️` ；
    2. 第二次访问，浏览器中需要在 Request Header 中携带 `If-Modified-Since: 时间戳⌚️` ；
    3. 服务器根据 `时间戳⌚️` 判断，资源是否改变；
    4. 未改变，返回 304，命中缓存；
    5. 若改变，重新返回资源与 Last-Modified ；

# 5⃣️ development

## 1、git 有哪些常用命令？

## 2、常见 Linux 命令知道吗？

# 6⃣️ production

## 1、讲一下输入 url 到渲染出页面的过程？

1. 加载资源的过程：
   1. 浏览器拿着域名根据 DNS 解析出 IP地址；
   2. 浏览器拿着 IP 地址向服务器发请求；
   3. 服务器接受请求，并返回给浏览器数据；
2. 渲染页面的过程：
   1. 浏览器根据 HTML & CSS 分别生成 DOM Tree & CSSDOM Tree；
   2. 浏览器根据 DOM Tree & CSSDOM Tree ，生成 Render Tree；
   3. 浏览器根据 Render Tree 渲染页面；
   4. 遇到 js ，暂停渲染，加载并执行 js ，js 可能更改 Render Tree ，则重新渲染；
   5. 直至渲染完成；

## 2、知道重绘和回流吗？

* 重绘：
  * 当前元素的样式(背景颜色、字体颜色等)发生改变的时候，我们只需要把改变的元素重新的渲染一下即可；
  * 重绘对浏览器的性能影响较小，所以 一般不考虑；
  * 发生重绘的情形：改变容器的外观风格等，比如background：black等。改变外观，不改变布局，不影响其他的dom。
* 回流：
  * 是指浏览器为了重新渲染部分或者全部的文档而重新计算文档中元素的位置和几何构造的过程；
  * 因为回流可能导致整个dom树的重新构造，所以是性能的一大杀手；（即：一个元素的回流导致了其所有子元素以及DOM中紧随其后的祖先元素的随后的回流）

* 什么会导致回流呢？

  1. 调整窗口大小（Resizing the window）
  2. 改变字体（Changing the font）
  3. 增加或者移除样式表（Adding or removing a stylesheet）
  4. 内容变化，比如用户在input框中输入文字（Content changes, such as a user typing text in
     an input box）
  5. 激活 CSS 伪类，比如 :hover (IE 中为兄弟结点伪类的激活)（Activation of CSS pseudo classes such as :hover (in IE the activation of the pseudo class of a sibling)）
  6. 操作 class 属性（Manipulating the class attribute）
  7. 脚本操作 DOM（A script manipulating the DOM）
  8. 计算 offsetWidth 和 offsetHeight 属性（Calculating offsetWidth and offsetHeight）
  9. 设置 style 属性的值 （Setting a property of the style attribute）
  10. fixed定位的元素,在拖动滚动条的时候会一直回流

* 如何避免回流或将它们对性能的影响降到最低？
  1. 如果想设定元素的样式，通过改变元素的 class 名 (尽可能在 DOM 树的最末端)（Change classes on the element you wish to style (as low in the dom tree as possible)）
  2. 避免设置多项内联样式（Avoid setting multiple inline styles）
  3. 应用元素的动画，使用 position 属性的 fixed 值或 absolute 值（Apply animations to elements that are position fixed or absolute）
  4. 权衡平滑和速度（Trade smoothness for speed）
  5. 避免使用table布局（Avoid tables for layout）
  6. 避免使用CSS的JavaScript表达式 (仅 IE 浏览器)（Avoid JavaScript expressions in the CSS (IE only)）

## 3、为何建议把 css 放到 head 中？

1. 用户体验：
   * css 放在 body 标签尾部时会在网页中短暂出现”裸奔“的 HTML ，这不利于用户体验；
2. 提升性能：
   1. css 放在 head 中会先形成 CSSDOM Tree 并和 DOM Tree 一同形成 Render Tree ，然后渲染；
   2. css 若放在 body 标签尾部，DOM Tree 会在读取 css 文件前，先进行一次 Render Tree 的转化；
   3. 在读取 css 形成 CSSDOM Tree 后再进行一次 Render Tree 转化；
   4. 多了一次 Render Tree 的转化；

## 4、为何建议把 JS 放到 body 最后？

* js 放到头部，会阻塞页面渲染；
* js 放到文件底部，当解析到 js 时，通常页面大部分内容都渲染完毕，用户可以在最早看到非空白的页面；

## 5、async/defer模式有什么区别？

* async
  * script.js 会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步）；
  * 当 script.js加载完整立即执行script.js。执行script.js时，html解析暂停；
  * 从加载完成立即执行来看，async模式执行顺序与写的顺序无关，不保证执行顺序；
* defer
  * script.js 会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步），这一点与 `async` 模式一致；
  * 不同的是当 script.js 加载完成并不会立即执行，而是在所有元素解析完成之后， `DOMContentLoaded` 事件触发之前完成。因此它会按照写的顺序执行。

## 6、window.onload 和 DOMContentLoaded 的区别？

```js
window.addEventListener('load', function(){
  // 页面全部资源加载完才会执行，包括图片、视频等；
})
document.addEventListener('DOMContentLoaded', function() {
  // DOM渲染完即可执行，此时图片、视频还可能没有加载完；
})
```

## 7、了解前端安全防范吗？

1. XSS 跨站请求攻击：
   * case：（核心：利用可执行脚本）
     * 如一个内容平台，黑客用户在发布的内容中嵌入恶意 script 脚本，脚本会在 html 执行时执行，用来获取正在读这篇文章普通用户的 cookie ，并发送到黑客用户的服务器；
   * countermeasures：
     * `<` / `>` / `&` 等特殊字符替换成 `&lt;` / `&gt;` / `&amp;` 等；
2. XSRF 跨站请求伪造：
   * case：（核心：利用已登陆的用户信息）
     * 如用户登陆了一个交易网站，黑客向用户发送了一个诱惑邮件，邮件中隐藏着该交易网站的付费接口，且该网站的付费接口无验证，用户打开该邮件，就调用了付费接口；
   * countermeasures：
     * 使用 POST 接口；
     * 增加验证；

# 7⃣️ 性能优化

## 1、♨️前端性能如何优化，几个方面考虑？

### 1.1、让加载更快：

* 减少资源体积
  1. webpack 压缩代码：

* 减少访问次数
  1. webpack 模块化代码：
  2. 雪碧图合并图片：
  3. SSR 服务端渲染：
  4. http 缓存：
* 使用更快的网络
  1. CDN；

### 1.2、✍️ 让渲染更快：

1. css 放在 head ，js 放在 body 底部；

2. js 执行用 DOMContentLoaded 触发；

3. 图片懒加载：

   * 根据元素顶到视口顶的距离 `object.getBoundingClientRect().top` ， 设置图片加载默认 `src="preview.png"` 还是加载真实 `real-src="real.png"` ；

4. 对DOM查询做变量缓存；

5. 将频繁 dom 插入，先插入文档片段，再一次性将文档片段插入；

6. ✍️ 防抖（减少频繁请求）：

   ```js
   const input1 = document.getElementById('input1')
   
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
   ```

7. ✍️ 节流（减少回流）：

   ```js
   const div1 = document.geteElementById('div');
   
   function throttle(fn, delay = 100) {
     let timer = null;
     return function () {
       if(timer) {
         return ;
       };
       timer = setTimeout(() => {
         fn.apply(this, arguments);
         timer = null;
       }, delay)
     }
   };
   
   div1.addEventListener('drag', throttle(function (e) {
     console.log(e.offsetX, e.offsetY);
   }, 1000))
   ```

8. 避免回流：
