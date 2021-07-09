# 1、前端代码为何进行构建打包？

* 代码层面：
  1. 体积更小（tree shaking、压缩代码、合并代码），加载更快；
  2. 可以编译高级语言或语法（ts、es6+、模块化、scss）；
  3. 更好的兼容性和错误检查（Polifill、postcss、eslint）；
* 研发流程阶段：
  1. 形成统一、高效的开发环境；
  2. 形成统一的构建流程和打包产出标准；
  3. 可以集成公司的构建规范（提测、上线等）；

# 2、module chunk bundle 分别什么意思，有何区别？

* module 是源码，能引用的都是模块，不管是什么类型，css、js、图片等都是模块，都是源码；
* chunk 是多模块合并成的，中不一定是一个文件，比如 index.js 中还有引入其他的文件。（如，由entry、import()、splitChunk合成的代码）；
* bundle 就是 chunk 最终输出的文件，一个 chunk 对应一个 bundle；

# 3、loader 与 plugin 的区别？

* loader 是模块转换器。
  * 如 less --> css；
* Plugin 是拓展插件，是经过 loader 转换后再继续根据需求做拓展的插件。
  * 如 HtmlWebpackPlugin 把 chunk 状态的 js 塞进 html 文件；

# 4、常见的 loader 和 plugin 有哪些？

* loader：babel-loader、css-loader、style-loader、postcss-loader、less-loader、url-loader、file-loader、vue-loader......
* plugin：
  * HtmlWebpackPlugin
  * CleanWebpackPlugin
  * IgnorePlugin
  * MiniCssExtractPlugin、TerserPlugin、OptimizeCssAssetsPlugin
  * HappyPack、ParallelUglifyPlugin
  * HotModuleReplacementPlugin
  * DllPlugin、DllReferencePlugin
  * ModuleConcatenationPlugin

# 5、babel 和 weabpack 的区别？

1. babel 是 JS 语法编译工具，不关心语法（babel-polyfill 关心），不关心模块化（webpack 关心）；
2. webpack 是打包构建工具，是多个 loader、plugin 的集合；

# 6、webpack 如何产出一个 lib ？

*  `output.libary` 

```js
output: {
  filename: 'lodash.js',				// lib 的文件名
  path: distPath,								// 输出 lib 到 dist 目录下
  libary: 'lodash'							// lib 的全局变量名
}
```

# 7、babel-runtime 和 babel-polyfill 的区别？

* babel-polyfill
  * 是利用 core-js 和 regenerator 在目标环境添加缺失特性的标准库的集合；
  * 解决了 babel 仅转换 语法，不转换 API 的问题；
  * 会产生全局变量的污染；
  * 会冗余的加载整个库；
* babel-runtime 
  * 是为了解决上述 冗余加载 & 全局污染 问题的一个工具；
  * 无全局变量污染；
  * 可以按需加载库；
* ⚠️⚠️⚠️：
  * 若产出第三方 lib 一定要使用 babel-runtime；
  * 若仅产出自己使用的系统，不供第三方使用，可以使用 babel-polifill；

# 8、webpack 如何实现懒加载？♨️HOC的使用

* 其实就是 import() 的语法：

  ```js
  setTimeout(() => {
    import('xxx.js').then(res => {
      console.log(res)
    })
  }, 2000)
  ```

* 与 react 和 vue 的异步组件、路由相似：

  1. react 中使用 `const asyncComponent = React.lazy(() => import('asyncComponent'))` 引入异步组件；
  2. react 中使用 `<React.Suspense fallback={ <div>加载中...</div> }>` 处理加载前的等待效果；
  
* ♨️react-router路由懒加载

  1. 首先，使用 `() => import("./xxx" /* webpackchunkname */)` 告诉 webpack 如何划分 chunk ；

     * 将 `import Main from "@/view/main"` 替换为 `() => import("@/view/main" /* webpackChunkName:"user" */)` ;

     * 使用这个方式引入模块之后，再次打开项目，可以在谷歌浏览器的NetWork里面看到有个user.chunk.js被下载了，这里chunk就是webpack打出来的包的后缀名，user是我们引入模块的时候使用魔法注释 `/* webpackChunkName:"user" */` 指定的名字。

  2. 其次，由于 import 进来的只是个 Promise 对象，需要将 Promise 对象 await 之后的值，以 React 组件方式返回，返回后付值给所需变量；

     * 这时候就需要我们手写一个 HOC 来解决这个问题（⚠️react中使用 lazy➕suspense 实现⚠️）。

       * 函数1  包裹一个  异步返回组件的箭头函数2；
       * 在  函数1  中调用  箭头函数2自执行，得到 promise 对象；
       * await 处理 promise 对象得到 react 组件；
       * 返回出去，在第1步的 webpack 配置中得到该组件；

       ```typescript
       // src/components/async-module-loader/index.tsx
       import React from 'react'
       
       export interface AyncModuleLoaderState {
           asyncComponent: any
       }
       export default function AyncModuleLoader(importComponent: any) {
           return class AsyncComponent extends React.Component<unknown, AyncModuleLoaderState> {
               constructor(props: unknown) {
                   super(props);
                   this.state = {
                       asyncComponent: null
                   };
               }
               async componentDidMount() {
                   if (this.state.asyncComponent) {
                       return;
                   }
                   const { default: component } = await importComponent();
                   this.setState({
                       asyncComponent: component
                   });
               }
               render() {
                   const {asyncComponent:Component} = this.state
                   return Component ? <Component {...this.props} /> : null;
               }
           }
       }
       
       // 使用：
       // const model = {
       //		Main: AsyncModuleLoader(() => import("@/view/main" /* webpackChunkName:"user" */))
       // }
       ```

# 9、为何 proxy 不能被 polyfill？

* class 可以用 function 模拟；
* promise 可以用 callback 模拟；
* proxy 无法用 Object.defineProperty 模拟；

# 10、webpack 常见性能优化？

* 构建速度优化
  * common
    *  `babel-loader?catchDirectory` ；
    * 配置 HappyPack 插件，对代码开启多进程打包；
    * 针对所用库中的某个无用模块的忽略 IgnorePlugin，在使用的时候代码中手动引入；
  * prod
    * 针对 xxx.min.js 等文件的 noParse ；
    * 配置 ParalleleUglifyPlugin 插件，对 webpack 自带的 uglify 开启多进程压缩；
  * dev
    * 配置 watch & watchOptions ，自动更新；
    * 配置 HotModuleReplacementPlugin，并配合 entry、sevServer、module.hot.accept() 启动热更新；
* 代码产出
  * common
    * import() 异步加载
  * prod
    * 针对公共代码+第三方代码，使用 optimization.splitChunks.cachGroups 进行分组抽离；
    * 针对小图片，使用 url-loader 判断大小后，对小图片进行 base64 编码，生成 dataURL，打包到文件中；
    * 针对开发模式使用 `mode: 'production'` 进行区分；
    * 针对资源，配置 publickPath 进行 cdn 加速；
    * 针对使用库中无用的模块，使用 ignoreplugin，进行忽略；
    * 针对产出代码使用  `bundle.[contenthash:8].js` 命中服务端返回的 `ResponseHeader.catche-control:max-age=xxxxx` 强制缓存；
    * 针对多模块，使用 ModuleConcatenationPlugin 插件将多个模块合并成一个模块，达到 scopeHoisting（作用域提升）；

# 11、关于 webpack 5 有和不同？

*  webpack 5 主要进行内部效率的优化；
* 对比  webpack 4 无太多使用上的改动；
* webpack4 demo 升级 webpack5 以及周边插件后，会有一点点不同，代码需要做出的调整：
  * package.json 的 dev-server 命令改了 `"dev": "webpack serve --config build/webpack.dev.js",`
  * 升级新版本 `const { merge } = require('webpack-merge')`
  * 升级新版本  `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`
  *  `module.rules` 中 `loader: ['xxx-loader']` 换成 `use: ['xxx-loader']`
  *  `filename: 'bundle.[contenthash:8].js'` 其中 `h` 小写，不能大写

# 12、什么类型项目或什么需求需要多入口文件？

* 在很多 app 里用 webview 嵌入 h5 网页，都是一个单个页面的嵌入，不能是 spa 。这就需要输入多个页面。
  * 例如用 app 内嵌 h5 实现新闻列表页和详情页，现在给你两个选择：
    * 第一，❎使用 spa ，用一个 webview 加载，所有的路由跳转都在这个一个 webview 中完成；
      * 优势：路由web前端这边控制，不用与native原生交互，可共享一个状态vuex；
      * 劣势：
        * 没有转场动画；
        * 如果用 iphone ，用户用手势返回（从左边缘往右滑动）就直接把 webview 关闭了。
    * 第二，✅使用多页面，即分别打包出列表页和详情页，然后用一个 webview 加载列表页，进入新闻详情页时，再启动另外一个 webview 加载详情页。
      * 优势：有转场动画，继续做预加载，优化性能；
      * 劣势：需与native原生交互，webpack配置相对繁琐一点，不可共享一个状态vuex。
  * 体验优化这个原则就够了，spa 体验太差。而且，多页多 webview 还可以继续做预加载，优化性能。故选择多页；

# 13、抽离公共代码和第三方代码放在哪个环境？

* 首先，分割文件是为了减小文件大小，使得加载较快，但是拆分文件也需要耗费一定的时间；
* 针对于开发环境，文件都是在本地的，加载速度本身较快，而且代码频繁改动，每次改动都需要重新拆分代码，所以在开发环境没必要拆分代码；
* 在生产环境，文件从服务器获取，如果文件太大的话加载较慢，所以需要拆分，另外生产文件也不是频繁打包的，所以可以接受拆分代码时消耗一定的时间。

# 14、build 后如何产生 chunk（单独打包的 js ）？

1.  `import('').then(res => {})` 异步懒加载会产生一个chunk ；

2. 配置几个入口 js 文件，在 build 时就会生成几个 chunk ；

   ```js
   entry: {
     index: path.join(srcPath, 'index.js'),
     other: path.join(srcPath, 'other.js')
   },
   ```

3. optimization.splitChunks.cachGroups  中可进行公共代码、第三方代码的拆离，每一个拆离都会生成一个 chunk ；

   ```js
   optimizaition: {
     splitChunks: {
       catchGroup: {
         // 每一个拆离都会生成一个 chunk ;
         vendor: {},
         common: {}
       }
     }
   }
   ```


# 15、ES Module 和 Commonjs 的区别？

1. ES6 Module 静态引用，编译时引入；

   * 引用时机：静态引用，确定要引用，不能放在逻辑语句里；
   * 引入时机：🧬📦（编译打包）时才正式引入到代码中；

   <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622887098723-assets/web-upload/e0f546bf-cb40-4c07-93b2-7925b9174b22.png" alt="" style="width: 908px; height: 222px;">

2. Common Js 动态引用，执行时引入；

   * 引用时机：动态引用，没准引不引用，可方在逻辑语句中判断后引入；
   * 引入时机：代码执行时，同时引入代码；

   <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622887098707-assets/web-upload/0a25f7f5-ae30-4949-bcfc-3e3dc6c4a4ca.png" alt="" style="width: 9010px; height: 220px;">

3. 只有 ES6 Module 的静态引用，才能有 webpack 的 `production` 环境下编译时的静态代码分析；

4. 只有 ES6 Module 的编译时引入，才能根据上方静态代码分析的判断，做到按需引入，从而实现 Tree-Shaking ；

# 16、filename & chunkFilename

* `filename` 指**列在** `entry` 中，打包后输出的文件的名称。

* `chunkFilename` 指**未列在** `entry` 中，却又需要被打包出来的文件的名称。

