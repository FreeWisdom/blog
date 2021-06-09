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

## 11、函数 call / apply / bind 的区别？

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

4. 闭包有哪些影响？
   1. 变量会常驻内存，得不到释放，不要乱用，可能造成内存泄漏；

* 闭包的内存如何释放？
  * 没办法，闭包的内存释放不了，除非重新刷新浏览器。

## 20、函数声明和函数表达式的区别？

* 函数声明：`function fn() {...}`
  * 函数声明会在代码执行前**预加载**；
* 函数表达式：`const fn = function () {...}`
  * 函数把表达式，**不会预加载**；

## 21、new Object() 和 Object.create() 的区别？

* new Object(xxx) 

  ```js
  const obj1 = {
    a: 10,
    b: 20
  };
  const obj2 = new Object(obj1);
  
  console.log(obj1 === obj2);			// true，地址相同
  ```

* Object.create(xxx) 会创建一个空对象，并且该空对象的`__proto__`原型指向传入的对象；

  ```js
  const obj1 = Object.create(null);
  const obj2 = Object.create({
    a: 10,
    b: 20
  });
  console.log(obj1);
  // {}
  // 		No properties
  console.log(obj2);
  // {}
  // 		__proto__: 
  // 			a: 10
  // 			b: 20
  // 			__proto__: Object
  ```

# 22、关于 this 的场景题

* this 值在执行的时候下结论，切勿在定义的时候下结论；

# 23、关于作用域和自由变量的场景题

```js
let i;
for(i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0)
}

// 4
// 4
// 4
// 4
```

```js
let a =100;
function test() {
  alert(a);
  a = 10;
  alert(a);
};
test();
alert(a);

// 100
// 10
// 10
```

# 24、判断字符串以字母开头，后面字母数字下划线，长度6-30

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

# 25、手写字符串 trim 方法，保证浏览器兼容性

```js
String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/);
}
```

# 26、如何获取多个数字中的最大值？

```js
Math.max(10, 20, 30);
// 30
```

# 27、如何用 JS 实现继承？（8种）

* Class 继承
* prototype 继承（不推荐）

# 28、如何捕获 js 程序异常？

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

# 29、什么是 JSON ?

* 是一种数据格式，本质是一段字符串；
* json 格式和 js 对象结构一致，对 js 语言友好；
* window.JSON 是一个全局对象：
  * JSON.stringify()-----对象转换成JSON；
  * JSON.parse()--------JSON转换成对象；

# 30、获取当前页面 url 参数

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
  }
  
  query('a')
  ```

# 31、将 url 参数解析为 JS 对象

```js
function urlToObj() {
  const res = {};
  const search = location.search.substr(1);
  search.split('&').forEach(paramStr => {
    const paramArr = paramStr.split('=');
    const key = paramArr[0];
    const val = paramArr[1];
    res[key] = val;
  });
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

# 32、手写数组 flatern ，考虑多层级

```js
function flat(arr) {
  // 先判断 arr 中是否还有类似 [1, 2, [3, 4]] 的深层数组；
  // 若没有则直接返回 arr， 已被拍平，走出递归；
	const isDeep = arr.some(item => item instanceof Array);
  if(!isDeep) {
    return arr;
  }
  
  // 若有责之行递归，继续拍；
  const res = Array.prototype.concat.apply([], arr);
  return flat(res);
}

flat([[1, 2], 3, [4, 5, [6, 7, [8, 9, [10, 11]]]]]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
```

# 33、数组去重

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

# 34、✍️手写深拷贝

* **深拷贝和浅拷贝区别：**
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
  // 值类型直接返回
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
}
```

# 35、介绍 RAF request animation frame

* 要想动画流畅，更新频率要 60帧/s，即 16.67ms 更新一次视图；
* js 控制要使用 setTimeout 手动控制频率；
* RAF 控制时，浏览器会自动控制；
* 若页面切换到后台标签或隐藏iframe中，使用 RAF 浏览器会帮助暂停，而使用 setTimeout 则浏览器会依然之行； 

# 36、前端性能如何优化，几个方面考虑？

* 流畅中添加raf

# 3⃣️ JS-web-API

## 11、事件代理（委托）是什么？

* 利用事件冒泡将事件代理到父元素

## 14、如何阻止事件冒泡和默认行为？

* event.stopPropagation()
* event.preventDefault()

## 15、查找、添加、删除、移动 DOM 节点的方法？

* `document.getElementById('XXX')`
* `document.getElementsByTagName('xxx')`
* `document.getElementsByClassName('xxx')`
* `document.querySelectorAll('xxx')`
* `document.createElement('xxx')`
* 插入：`xxx.appendChild(newxxx)`
* 移动：`xxx.appendChild(oldxxx)`
* `xxxchildeNodes = xxx.childNodes`
* `xxx.removeChild(removechild)`

## 16、如何减少 DOM 操作？

* 缓存 DOM 查询结果；
* 多次 DOM 操作，合并到一次插入；

## 18、document load 和 ready 的区别？

```js
window.addEventListener('load', function () {
  //页面加载完全部资源才会执行，包括图片/视频
})
document.addEventListener('DOMContentLoaded', function () {
  // DOM 渲染完即可执行，此时图片、视频可能还未加载完
})
```

# 4⃣️ http

## 10、ajax 请求 get 和 post 的区别？

* get 一般用于查询操作，post 一般用于用户提交操作；
* get 参数拼接在 url 上，post 放在请求体内（数据体积可更大）；
* 安全性：post 易于防止 CSRF；

## 17、解释 jsonp 的原理，为何它不是真正的 ajax ？

* jsonp 原理
  * script 标签绕过同源策略限制进行跨域，携带 callback=abc ；
  * 服务端在 callback 中返回 json 数据 abc( {a: 10, b:20} )；
  * 前端调用 callback 函数 window.abc = function (data) {console.log(data)} 就可以获得数据；
* ajax 依据 XMLHttpRequest API；
* jsonp 依据 `<script>` 标签可绕过跨域限制；

# 5⃣️ development

# 6⃣️ production

