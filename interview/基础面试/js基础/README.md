# ✅✅✅✅✅✅

# 1、✅变量类型和计算

## 1.1、值类型和引用类型的区别

### 1.1.1、值类型

```js
let a = 100;
let b = a;
a = 200;
console.log(b)	// 100
```

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620345547260-assets/web-upload/0d5f2585-83d0-4f16-b763-2548cf652aeb.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 700px; height: 150px;">

### 1.1.2、引用类型

```js
let a = {age: 20};
let b = a;
b.age = 21;
console.log(a.age)	// 21
```

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620345547660-assets/web-upload/8254db4f-cc29-4ac7-be38-7b1924a47497.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 700px; height: 250px;">

### 1.1.3、常见值类型

```js
let a;	// undefined
const s = "abc";
const n = 123;
const b = true;
const s = Symbol("s");
```

### 1.1.4、常见引用类型

```js
const obj = { x: 100 };
const arr = ["a", "b", "c"];

const n = null;			// 特殊引用类型，指针指向为空地址；
function fn() {};		// 特殊引用类型，不用与存储数据，没拷贝/复制函数一说；
										// 也可以将函数理解为第三种类型，即，值类型/引用类型/函数类型；
```

## 1.2、类型判断

### 1.2.1、typeof能判断哪些类型？

* 识别所有值类型；

  ```js
  let a;															typeof a	// "undefined"
  const s = "abc";										typeof s	// "string"
  const n = 123;											typeof n	// "number"
  const b = true;											typeof b	// "boolean"
  const s = Symbol("s");							typeof s	// "symbol"
  ```

* 识别函数；

  ```js
  typeof console.log();													// "function"
  typeof function () {};												// "function"
  ```

* 判断是否是引用类型；（不可再细分）

  ```js
  typeof null;																	// "object"
  typeof ["a", "b"];														// "object"
  typeof { a: 100};															// "object"
  ```

### 1.2.4、Object.prototype.toString.call(obj)类型检测原理

1.  Object.prototype.toString.call() 功能：

   * 由于 typeof 不能分辨引用类型，即分不清 null、数组、对象;

   * 故使用 Object.prototype.toString.call() 可以精准判断所传入参数的数据类型，如下：

```js
console.log(Object.prototype.toString.call("jerry"));						//[object String]
console.log(Object.prototype.toString.call(12));								//[object Number]
console.log(Object.prototype.toString.call(true));							//[object Boolean]
console.log(Object.prototype.toString.call(undefined));					//[object Undefined]
console.log(Object.prototype.toString.call(null));							//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));		//[object Object]
console.log(Object.prototype.toString.call(function(){}));			//[object Function]
console.log(Object.prototype.toString.call([]));								//[object Array]
console.log(Object.prototype.toString.call(new Date));					//[object Date]
console.log(Object.prototype.toString.call(/\d/));							//[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));				//[object Object]
```

2. Object.prototype.toString.call(obj) 原理：
   * Object.prototype.toString.call(obj) 这句话的意思是：
     * 用 Object 原型上的 toString 方法作用在传入的 obj 的上下文中（通过call将this指向obj）；
   * 在 JavaScript 中，所有**类都继承于 Object ，因此 toString() 方法也被继承了**；
   * 但其实各数据类型使用 toString() 后的结果表现不一，原因在于：**所有类在继承Object的时候，改写了toString()方法**；
   * **但 Object 原型上的 toString() 方法是可以输出数据类型的**；
   * **因此想判断数据类型时，也只能使用 Object 原型上的 toString() 方法**；
   * 继而有了此方法：Object.prototype.toString.call(obj)；

### 1.2.3、♨️手写深拷贝

```js
/**
* 深拷贝
* @param {Object} obj 要拷贝的对象
*/
function deepClone(obj = {}) {
  // 若obj为null或obj不是引用类型"object"，直接返回obj；
	if(typeof obj !== "object" || obj == null) {
    return obj;
  }
  
  // 初始化返回值result;
  let result;
  if(obj instanceof Array) {
    result = [];
  } else {
    result = {};
  };
  
  // 保证key不是原型属性，然后递归付值
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  };
  
  return result;
}

const obj1 = {
    age: 20,
    name: 'xxx',
    address: {
        city: 'beijing'
    },
    arr: ['a', 'b', 'c']
}

const obj2 = deepClone(obj1)
obj2.address.city = 'shanghai'
obj2.arr[0] = 'a1'

console.log(obj1.address.city)		// beijing
console.log(obj1.arr[0])					// "a"
```

## 1.3、变量计算--类型转换

### 1.3.1、字符串拼接

```js
const a = 100 + 10;							// 110
const b = 100 + "10";						// "10010"
const c = true + "10";					// "true10"

const d = 100 + parseInt("10");	// 110
```

### 1.3.2、”==““===”如何使用？

* == 会进行隐式类型转换，=== 不会进行转换；

```js
100 == "100";				// true
0 == "";						// true
0 == false;					// true
false = "";					// true
null == undefined;	// true

// 除了 xxx == null 之外，其他一律用 === ，如：
const obj = { x: 100 };
if(obj.a == null) {};
// 相当于
// if(obj.a === null || obj.a === undefined) {};
```

### 1.3.3、if语句和逻辑运算

* truly 变量：`!!a === true`；

  * 除下方列出外均为truly变量；

* falsely变量：`!!a === false`；

  ```js
  !!0 === false;
  !!NaN === false;
  !!"" === false;
  !!null === false;
  !!undefined === false;
  !!false === false;
  ```

* if语句

  <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620353009108-assets/web-upload/8ad45347-b5f0-4485-a3f3-0ba7cb881565.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 400px; height: 300px;">

* 逻辑运算

  <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620353009035-assets/web-upload/45ba1d2a-fa4d-44d7-b226-5d81254fae37.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 500px; height: 100px;">

# 2、原型和原型链

* 手写简易jQuery，考虑插件和拓展性

## 2.1、class和继承

### 2.1.1、class

```js
// 类
class Student {
    constructor(name, number) {
        this.name = name
        this.number = number
    }
    sayHi() {
        console.log(
            `姓名 ${this.name} ，学号 ${this.number}`
        )
    }
}

// 通过类 new 对象/实例
const xialuo = new Student('夏洛', 100)
console.log(xialuo.name)
console.log(xialuo.number)
xialuo.sayHi()

const madongmei = new Student('马冬梅', 101)
console.log(madongmei.name)
console.log(madongmei.number)
madongmei.sayHi()
```

### 2.1.2、继承

```js
// 父类
class People {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat something`)
    }
}

// 子类
class Student extends People {
    constructor(name, number) {
        super(name)
        this.number = number
    }
    sayHi() {
        console.log(`姓名 ${this.name} 学号 ${this.number}`)
    }
}

// 子类
class Teacher extends People {
    constructor(name, major) {
        super(name)
        this.major = major
    }
    teach() {
        console.log(`${this.name} 教授 ${this.major}`)
    }
}

// 实例
const xialuo = new Student('夏洛', 100)
console.log(xialuo.name)
console.log(xialuo.number)
xialuo.sayHi()
xialuo.eat()

// 实例
const wanglaoshi = new Teacher('王老师', '语文')
console.log(wanglaoshi.name)
console.log(wanglaoshi.major)
wanglaoshi.teach()
wanglaoshi.eat()

// class 实际上是一个 function，可见是一个语法糖；
console.log(typeof People);                                     // "function"
console.log(typeof Student);                                    // "function"
```

## 2.2、instanceof

* 判断前者是否是后者的实例

> 打印上方继承中的例子

```js
console.log(Teacher instanceof Object);                         // true
console.log(Teacher instanceof People);                         // false
console.log(Student instanceof People);                         // false
console.log(xialuo instanceof Student);                         // true
console.log(xialuo instanceof People);                          // true
console.log(xialuo instanceof Object);                          // true

console.log([] instanceof Array);                               // true
console.log([] instanceof Object);                              // true
console.log(Array instanceof Object);                           // true
console.log({} instanceof Object);                              // true
```

### 2.2.1、如何判断一个变量是不是数组？

```js
let a = [1, 2, 6];
a instanceof Array	// true
```

## 2.3、原型和原型链

### 2.3.1、原型（如何理解class的原型本质）

> 打印上方继承中的例子

```js
console.log(Student.prototype);                         // People {constructor: ƒ, sayHi: ƒ}
console.log(xialuo.__proto__);                          // People {constructor: ƒ, sayHi: ƒ}
console.log(Student.prototype === xialuo.__proto__);    // true
```

> 原型关系图

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620357709405-assets/web-upload/7d07b13e-e7a9-45db-ac55-c15e148630f1.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 600px; height: 300px;">

#### 2.3.1.1、原型关系

* 每个class都有**显示原型**`prototype`；
* 每个实例都有**隐式原型**`__proto__`；
* 实例的`__proto__`指向对应的class的`prototype`；

#### 2.3.1.2、基于原型的执行规则

* 获取属性`xialuo.name`或执行方法`xialuo.sayhi();xialuo.eat()`时；
* 先在自身属性和方法寻找；
* 若找不到，则自动去顺着`__proto__`寻找；
* 一直找到`Object.prototype.__proto__`；
  * `Object.prototype.__proto__`值为null，指向null；

### 2.3.2、原型链

> 打印上方继承中的例子

```js
console.log(People.prototype);                                  // {constructor: ƒ, eat: ƒ}
console.log(Student.prototype.__proto__);                       // {constructor: ƒ, eat: ƒ}
console.log(People.prototype === Student.prototype.__proto__);  // true

console.log(xialuo.hasOwnProperty("name"));                     // true
console.log(xialuo.hasOwnProperty("sayhi"));                    // false
console.log(xialuo.hasOwnProperty("eat"));                      // false
console.log(xialuo.hasOwnProperty("hasOwnProperty"));           // false
```

> 原型链关系图

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620359442671-assets/web-upload/6d50ecac-f9fd-426a-9a97-97837d6b9914.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 600px; height: 300px;">

# 3、✅作用域和闭包

## 3.1、作用域

* 全局作用域
* 函数作用域
* 块级作用域

> 创建10个`<a>`标签，点击时候弹出来对应的序号

```js
let a;
// let i;  // 若 i 为全局作用域则点击时候弹出来都是 10 ；
// i 为 for 中的局部作用域才能点击时候弹出来对应的序号；
for (let i = 0; i < 10; i++) {
    a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function (e) {
        e.preventDefault()
        alert(i)
    })
    document.body.appendChild(a)
}
```

## 3.2、自由变量

* 一个变量在当前作用域没有定义，但被使用了；
* 向上级作用域一层层依次寻找，直到找到为止；
* 若全局作用域都没找到，则报错xx is not defined；

## 3.3、闭包

### 3.3.1、闭包的表现/自由变量查找规则

* 作用域应用的特殊情况，有两种表现：

  * **函数作为参数被传递**；

    ```js
    function print(fn) {
      const a = 200;
      fn();
    }
    const a = 100;
    function fn() {
      console.log(a);
    }
    print(fn);		// 100

  * **函数作为返回值被返回**；

    ```js
    function create() {
      const a = 100;
      return function () {
        console.log(a);
      }
    }
    const fn = create();
    const a = 200;
    fu();				// 100
    ```

* ***总结自由变量查找***：所有**自由变量的查找，是在函数定义的地方**（**不是在执行的地方！！！**），向上级作用域查找。

### 3.3.2、闭包的应用

* 闭包的实际应用，主要是用来封装变量。即把变量隐藏起来，不让外面修改。ES5之前JS是没有局部变量的，所以程序员发明了闭包。

  * 防抖
  * 节流
  * 高阶函数
  * https://cloud.tencent.com/developer/article/1728078?from=information.detail.js%E9%97%AD%E5%8C%85%E5%BA%94%E7%94%A8
  
* 闭包作用：避免变量被环境污染

* 隐藏数据：做一个简单的cache工具

  ```js
  // 闭包创建缓存工具
  function createCache() {
    data = {};	// 闭包中的数据被隐藏不被外界访问
    return {
      set: function(key, val) {
        data[key] = val;
      },
      get: function(key) {
        return data[key];
      }
    }
  }
  
  const c = createCache();
  c.set("a", 100);
  console.log(c.get(a));	// 100
  ```

## 3.4、this

### 3.4.1、this的不同使用场景，如何取值？

* **this**在以下几种场景中**取什么值**，是🌟🌟🌟**在函数执行的时候确定**🌟🌟🌟的，不在函数定义的时候确定。

  * 作为普通函数

    ```js
    function fn1() {
      console.log(this);
    }
    fn1()											// window
    ```

  * 使用call apply bind

    ```js
    function fn1() {
      console.log(this);
    }
    fn1.call({ x: 100 });	// { x: 100 }
    const fn2 = fn1.bind({ x: 200 });
    fn2();	// { x: 200 }
    ```

  * 作为对象方法被调用

    <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620374132932-assets/web-upload/89743db8-113e-45b8-9c52-1d66996908ff.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 800px; height: 400px;">

  * class方法中调用

    ```js
    class People {
      constructor(name) {
        this.name = name;
        this.age = 20;
      }
      sayhi() {
        console.log(this);
      }
    }
    const zhangsan = new People("张三");
    zhangsan.sayhi();	// zhangsan对象
    ```

  * 箭头函数（箭头函数中this取值取箭头函数上级作用域的值）

### 3.4.2、bind/apply/call区别及手写

1. 手写bind函数

   ```js
   // 模拟 bind
   Function.prototype.bind1 = function () {
     // 参数列表拆解为数组，在 argument 作用域使用 slice 将参数列表拆解为数组；
     const args = Array.prototype.slice.call(arguments);
     
     // 获取 this （数组第一项）
     const t = args.shift();
     
     // 获取 fn1.bind() 中的 fn1
     const self = this;
     
     // 返回一个函数
     return function () {
       return self.apply(t, args);
     }
   }
   
   // 使用 bind 
   function fn1(a, b, c) {
     console.log("this:", this);
     console.log(a, b, c);
     return "this is fn1";
   }
   const fn2 = fn1.bind({ x: 100 }, 10, 20, 30);
   const res = fn2();
   console.log(res);
   
   // this {x: 100}
   // 10 20 30
   // this is fn1
   ```

2. 手写apply
3. 手写call

# 4、✅异步

## 4.1、单线程和异步

### 4.1.1、单线程为什么需要异步？

* JS是单线程语言，同时只能做一件事；
* JS和DOM渲染共用同一个线程，因为js可修改DOM结构；
* 遇到等待（网络请求，定时任务）不能卡住；
* 需要异步；
* 异步是基于回调callback函数形式进行调用的；

### 4.1.2、同步和异步的区别是什么？

* 异步是基于JS是单线程语言的本质而产生的；

* 异步不会阻塞代码执行；

  ```js
  console.log(100);
  setTimeout(function() {
    console.log(200);
  }, 1000);
  console.log(300);
  
  // 100
  // 300
  // 200
  ```

* 同步会阻塞代码执行；

  ```js
  console.log(100);
  alert(200);
  console.log(300);
  
  // 100
  // 300

## 4.2、应用场景

### 4.2.1、网络请求（ajax/图片加载）

```js
// ajax
console.log("start");
$.get("./data.json", function(data) {
  console.log(data);
});
console.log("end");

// 图片加载
console.log("start");
let img = document.createElement("img");
img.onload = function() {
  console.log("loaded");
};
img.src = "/xxx.png";
console.log("end");
```

### 4.2.2、定时任务（setTimeout）

```js
// setTimeout
console.log(100);
setTimeout(function() {
  console.log(200);
}, 1000);
console.log(300);

// setInterval
console.log(100);
setInterval(function() {
  console.log(200);
}, 1000);
console.log(300);
```

## 4.3、callback hell 和 Promise

### 4.3.1、callback hell

```js
$.get(url1, (data1) => {
  console.log(data1);
  
  $.get(url2, (data2) => {
    console.log(data2);
    
    $.get(url3, (data3) => {
      console.log(3);
    })
  })
})
```

### 4.3.2、Promise 

```js
function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      }
    })
  })
}

const url1 = "/data1.json";
const url2 = "/data2.json";
const url3 = "/data3.json";

getData(url1).then(data1 => {
  console.log(data1);
  return getData2(url2);
}).then(data2 => {
  console.log(data2);
  return getData3(url3);
}).then(data3 => {
  console.log(data3);
}).catch(err => console.error(err));
```

### 4.3.3、手写用promise加载一张图片

```js
function loadImg(src) {
  const p = new Promise(
  	(resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
				const err = new Error(`图片加载失败${src}`);
        reject(err);
      };
      img.src = src;
    }
  )
  return p;
}

const url1 = "https://images.pexels.com/photos/7763793/pexels-photo-7763793.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const url2 = "https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

loadImg(url1).then(img1 => {
  console.log(img1.width);
  return img1;
}).then(img1 => {
  console.log(img1.height);
  return loadImg(url2);
}).then(img2 => {
  console.log(img2.width);
  return img2;
}).then(img2 => {
  console.log(img2.height);
}).catch(err => {
  cosnole.log(err);
})
```

