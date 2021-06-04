# CommonJS规范

# 〇、重中之重

* 每个模块内部，都有一个 `module` 对象，代表当前模块，`module.exports` 表示模块对外输出的值，初始为 {}； 

* 模块A `exports` 导出的对象，被外部其它模块 require 加载付值并修改，此时在模块 A 中监听 exports 对象也被修改；

  * ♨️ 故， “模块外部 require 后的对象”与“模块本身 exports 的对象”是同一个引用，地址相同，一改具改；

* 如果，同时存在 ` module.exports` &  `exports`：

  ```js
  // lib.js
  exports.hello = 'hello'
  
  exports.add = function (a, b) {
      return a + b
  }
  
  exports.obj = { name: 'a', age: 20 }
  
  module.exports = function min(a, b) {
      return a - b;
  }
  
  setTimeout(() => {
      console.log(exports);		// { hello: 'hello', add: [Function (anonymous)], obj: { name: 'a', age: 20 } }
  }, 3000);
  ```

  ```js
  // index.js
  const lib = require('./lib.js')
  lib.additional = 'test'
  
  console.log(lib);																		// [Function: min] { additional: 'test' }
  console.log(lib.additional);                        // test
  ```

  * `module.exports` 会覆盖 `exports` ，体现在，在外部引用会使用 `module.exports` 的内容；
  * 但是 `exports` 的引用还是存在的，体现在，在内部打印 `exports` 仍可以得到 `exports` 本身原本的内容；

# 1、概览

* Node 应用由模块组成，采用 CommonJS 模块规范；
* 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见；
* CommonJS 规范规定，每个模块内部，`module` 变量代表当前模块。
  * 这个变量是一个对象，它的 `exports` 属性（即`module.exports`）是对外的接口。
  * 加载某个模块，其实是加载该模块的`module.exports`属性。
* CommonJS 模块的特点如下：
  * 所有代码都运行在模块作用域，不会污染全局作用域。
  * 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
  * 模块加载的顺序，按照其在代码中出现的顺序。

# 2、module对象

* Node内部提供一个`Module`构建函数。所有模块都是`Module`的实例。
* 每个模块内部，都有一个`module`对象，代表当前模块。它有以下属性：
  * `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
  * `module.filename` 模块的文件名，带有绝对路径。
  * `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
  * `module.parent` 返回一个对象，表示调用该模块的模块。
  * `module.children` 返回一个数组，表示该模块要用到的其他模块。
  * `module.exports` 表示模块对外输出的值。 

## 2.1、module.exports属性

* `module.exports` 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 `module.exports` 变量。

## 2.2、exports变量

* Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令：

  ```js
  var exports = module.exports;
  ```
  

* 在对外输出模块接口时，可以向exports对象添加方法。

  ```js
  exports.area = function (r) {
    return Math.PI * r * r;
  };
  
  exports.circumference = function (r) {
    return 2 * Math.PI * r;
  };
  ```

* 不能直接将exports变量指向一个值，因为这样等于切断了`exports`与`module.exports`的联系，如：

  ```js
  exports = function(x) {console.log(x)};
  ```

* 如果一个模块的对外接口，就是一个单一的值，不能使用`exports`输出，只能使用`module.exports`输出。

  * 下面代码，`hello`函数是无法对外输出的，因为`module.exports`被重新赋值了。

  ```js
  exports.hello = function() {
    return 'hello';
  };
  
  module.exports = 'Hello world';
  ```

# 3、require命令

* `require`命令用于加载文件，后缀名默认为`.js`；

* `require`发现参数字符串指向一个目录以后，会自动查看该目录的`package.json`文件，然后加载`main`字段指定的入口文件；

* 如果`package.json`文件没有`main`字段，或者根本就没有`package.json`文件，则会加载该目录下的`index.js`文件或`index.node`文件；

* 第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的`module.exports`属性；

* 缓存的模块保存在`require.cache`之中，如果想删除模块的缓存，可以像下面这样写：

  ```js
  // 删除指定模块的缓存
  delete require.cache[moduleName];
  
  // 删除所有模块的缓存
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  })
  ```

* `require`方法有一个`main`属性，可以用来判断模块是直接执行，还是被调用执行。

  * 直接执行的时候（`node module.js`），`require.main`属性指向模块本身。

    ```js
    require.main === module
    // true
    ```

  * 调用执行的时候（通过`require`加载该脚本执行），上面的表达式返回false。

# 4、模块的加载机制

* CommonJS模块的加载机制是，输入的是被输出的值的拷贝；
  * 即，一旦输出一个值，模块内部的变化就影响不到这个值；