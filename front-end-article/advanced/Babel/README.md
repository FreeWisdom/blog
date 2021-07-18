# 概览

1. 环境搭建 & 基本配置
2. babel-polifill
3. babel-runtime

# 1、环境搭建 & 基本配置

1. 安装插件（devDependencies 开发环境）
   * babel/core
   * babel/cli
   * babel/preset-env (编译es 6/7/8 语法) 或者 babel/preset-react(编译 react jsx 语法，包括 es 6/7/8 语法)

2. 配置 .babelrc

   ```json
   {
     // preset 中配置的是各种 plugins 的集合的预设，是为了避免在 plugins 中书写繁琐过多；
     "preset": [
       "@babel/preset-env"
     ],
     // 若预设中的插件不满足需求，需要在此出额外进行配置；
     "plugins": [
       
     ]
   }
   ```

3. 若使用 webpack 需要在 webpack 中配置 "babel-loader"；

# 2、babel-polyfill

* Babel是什么？
  * 语法转换：Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中；
  * API 转换：通过 Polyfill 方式在目标环境中添加缺失的特性；
  * ⚠️ 只解析语法，不处理模块化，模块化交给 webpack 处理；

* babel-polyfill 是什么？
  *  完成 babel 的 API 转换，即，**利用 core-js 和 regenerator 在目标环境中添加缺失的特性**；
  * babel-polifill 是 core-js 和 regenerator 的集合，
    * core-js
      * 是一个标准库，兼容了各个浏览器在 js 各版本（即es6/7/8）的 API 差异 ；
        * 但是唯独不支持 es 6 中的 generator 的 API（也许是因为 async/awaite 的取代）在各浏览器的差异；
      * regenerator
        * 支持 generator 的 API；

* 如何使用 babel-polyfill ？

  * 将  babel-polyfill 完全引入（直接在 js 文件中引用使用），在打包时在目标环境添加缺失的特性 API：

  ```json
  import '@babel-polyfill'
  
  const sum = (a, b) => a + b
  
  // 新的 API
  Promise.resolve(100).then(data => data);
  
  // 新的 API
  [10, 20, 30].includes(20)
  ```

  * Babel 7.4 之后 babel-polyfill 弃用，推荐直接使用 core-js 和 regenerator ，即，按需引入时增加 .babelrc 文件配置，并在目标 js 文件中删除 `import '@babel-polyfill' ` ：

  ```json
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3
        }
      ]
    ],
    "plugins": []
  }
  ```

* babel-polyfill 存在的问题？

  * 会”加载整个polyfill库“；

  * 打包时在目标环境添加缺失的特性 API 的过程中会在全局进行新 API 的覆盖如下：

    ```js
    // 污染全局环境
    window.Promise = function() {}
    Array.prototype.includes = function () {}
    ```

  * 若你的库供给第三方使用，若使用方定义如下：

    ```js
    // 使用方
    window.Promise = 'abc'
    Array.prototype.includes = 100
    ```

  * 会造成 window.Promise 和 Array.prototype.includes 方法被覆盖，所以 **babel-polyfill 可能导致全局变量污染**；

# 3、babel-runtime

* babel-runtime 是什么？

  *  解决了 babel-polyfill 可能导致的全局变量污染；
  * 解决了加载整个库的冗余；
  * 原理：会在打包时将缺失的特性 API 进行特色包装（一般是在 API 前加 `_` ，如 `_promise` ），不与第三方使用者的变量冲突；

* babel-runtime 如何使用？

  * 安装插件（devDependencies 开发环境）

    * @babel/plugin-transform-runtime

  * 安装插件（dependencies 生产环境）

    * @babel/runtime

  * 配置 .babelrc

    ```json
    {
      "presets": [
            // .......
        ],
      	// +++++++
        "plugins": [
            [
                "@babel/plugin-transform-runtime",
                {
                    "absoluteRuntime": false,
                    "corejs": 3,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false
                }
            ]
        ]
    }
    ```

# 4、babel 原理

babel 的转译过程也分为三个阶段，这三步具体是： 

* 解析 Parse: 将代码解析生成抽象语法树( 即 AST )，即词法分析与语法分析的过程；
* 转换 Transform: 对于 AST 进行变换一系列的操作，babel 接受得到AST 并通过 `babel-traverse` 对其进行遍历，在此过程中进行添加、更新及移除等操作；
* 生成 Generate: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是 `babel-generator` ；
