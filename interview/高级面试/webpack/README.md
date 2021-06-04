# 概览

* 基本配置
* 高级配置
* 性能优化
  * 优化打包效率
  * 优化产出代码
* 构建流程概述
* babel

# 1、基本配置

## 1.1、拆分 & 配置 merge

*  **webpack-merge** ：
  * 将 common config & prod config & dev config 进行公共逻辑的拆分合并；
  * webpack 4 中 `webpack-merge` 模块，由 `const { smart } = require('webpack-merge')` 引入；
    * `module.export = smart(webpackCommonConfig, {..本身配制..})`
  * webpack 5 中 `webpack-merge` 模块，由 `const { merge } = require('webpack-merge')` 引入；
    * `module.export = merge(webpackCommonConfig, {..本身配制..})`

```js
const { smart } = require('webpack-merge')

module.exports = smart(webpackCommonConf, {
  // 配置 ...
})
```

## 1.2、启动本地服务（dev）

*  **webpack-dev-server** ：
  * 在 dev 环境使用 `devServer:{..配置..}` 配置代理；
  * webpack 4 中，package.json 的 dev-server 命令为 `"dev": "webpack-dev-server --config build/webpack.dev.js",` 
  * webpack 5 中，package.json 的 dev-server 命令改了 `"dev": "webpack serve --config build/webpack.dev.js",`

```js
devServer: {
    port: 8080,
    progress: true,  // 显示打包的进度条
    contentBase: distPath,  // 根目录
    open: true,  // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩

    // 设置代理
    proxy: {
        // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
        '/api': 'http://localhost:3000',
          
        // 将本地 /api2/xxx 代理到 localhost:3000/xxx
        '/api2': {
            target: 'http://localhost:3000',
            pathRewrite: {
                '/api2': ''
            }
        }
    }
}
```

## 1.3、处理 ES 6（common）

* **@babel/core**：
  * 把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。
* **@babel/preset-env**：
  * 使用 babel 需要配置 .babelrc 文件；
  * 根据你支持的环境，自动预设适合你的 Babel 插件。

```json
{
	"presets": ["@babel/preset-env"],
	"plugins": 
}
```

* **babel-loader**：
  * 实现处理 es 6 转换，。

```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: ['babel-loader],
			include: path.join(__dirname, '..', 'src'),
    },
    {}
  ]
}
```

## 1.4、处理样式（dev）

* **postcss-loader**：补全 css 代码的兼容性前缀，实现各个浏览器兼容；

* **autoprefixer**：postcss-loader 依赖的增加前缀的插件；

  * 需要配合 postcss.config.js 文件使用：

  ```js
  module.exports = {
      plugins: [require('autoprefixer')]
  }

* **less-loader**：将 .less 文件解析成 .css 文件；

* **css-loader**：模块不认识 .js/.css 结尾的区别，该 loader 将 .css 结尾的文件解析成 css；

* **style-loader**：将 css 插入到页面中，让 css 起作用；

```js
loader: {
  rules: [
    {
      test: /\.css$/,
      // ♨️⚠️ loader 的执行顺序是：从后往前；
      loader: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test:/\.less$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }
  ]
}
```

## 1.5、处理图片（dev+prod 图片优化）

* **file-loader**：（dev）
  * file-loader 可以用来帮助 webpack 打包处理一系列的图片文件；比如：**.png** 、 **.jpg 、.jepg**等格式的图片；
  * 然后修改打包后图片的储存路径，再根据配置修改我们引用的路径，使之对应引入；
  * 使用 file-loader 打包的图片会给每张图片都生成一个随机的hash值作为图片的名字；

```js
module: {
  rules: [
    // 直接引入图片 url ，需要请求每个图片的地址；
    {
      test: /\.(jpg|png|jpeg|gif)$/,
      use: 'file-loader'
    }
  ]
}
```

* **url-loader**：（prod）
  * url-loader 会将引入的图片 base64 编码，生成dataURl并将其打包到文件中，最终只需要引入这个 dataURL 就能访问图片了；
  * 如果图片较大，编码会消耗性能。因此 url-loader 提供了一个 limit 参数，小于limit字节的文件会被转为 DataURl ，大于 limit  的还会使用 file-loader 进行 copy；

```js
module: {
  rules: [
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: {
       	loader: 'url-loader',		// 图片 - 考虑 base64 编码的情况
        options: {
          limite: 1024 * 5,			// 小于 5kb 的图片用 base64 格式产出，否则，依然延用 file-loader 的形式，产出 url 格式
          outputPath: '/img'		// 打包到 img 目录下
        }
      }
    }
  ]
}
```

## 1.6、output（prod-hash.js优化）

* 若文件未改动，打包后 hash 不变，触发缓存机制；
  * contenthash ：会根据内容不通过加上 hash 戳，可利用特性优化；
  * chunckhash：每次都不一样的 hash 戳，无优化效果；

```js
output: {
  filename: 'bundle.[contenthash:8].js',			// 打包代码时，contenthash 会根据内容不通过加上 hash 戳
  path: path.join(__dirname, '..', 'dist')
}
```

# 2、高级配置

## 2.1、如何配置多入口文件？（common+prod）

1. common config 中**配置两个 js 入口文件**：

   ```js
   entry: {
     index: path.join(srcPath, 'index.js'),
     other: path.join(srcPath, 'other.js')
   },
   ```

2. common config 中配置**生成两个 HtmlWeabpackPlugin 的实例**；

   * ♨️ **chunks 配置每个实例引入的 js 包**，默认生成几个包就会引入几个包（都引入）；

   ```js
   plugins: [
       // 多入口 - 生成 index.html
       new HtmlWebpackPlugin({
           template: path.join(srcPath, 'index.html'),
           filename: 'index.html',
           // chunks 表示该页面要引用哪些 js 包，默认全部引用(即引用 index.js 也引用 other.js)
           chunks: ['index']  // 只引用 index.js
       }),
     
       // 多入口 - 生成 other.html
       new HtmlWebpackPlugin({
           template: path.join(srcPath, 'other.html'),
           filename: 'other.html',
           chunks: ['other']  // 只引用 other.js
       })
   ]
   ```

3. prod config 中 **`[name]` 配置多出口**；

   * `[name]` 即，多入口时 entry 的 key；
     * 生成 chunk ；

   ```js
   output: {
     filename: '[name].[contentHash:8].js', 		// name 即多入口时 entry 的 key
     path: distPath
   },
   ```

## 2.2、如何抽离 css 文件？（dev+prod 优化）

1. 在 dev 环境使用（1.4、处理样式）中的方法；

   * 使用 `style-loader` 将 css 插入到 style 中；

2. 在 prod 环境中：

   * `module`  **配置 `MiniCssExtractPlugin.loader`**，使用 `MiniCssExtractPlugin` 代替  `style-loader` ；

   * `plugins` **配置 `MiniCssExtractPlugin` 插件，把 css 从 style 中抽离出来，放入 filename 中约定的文件夹和文件名**（使用hash来命名，命中缓存做优化）；
   * 在 `optimization` 中**配置 `TerserJSPlugin` 和 `OptimizeCSSAssetsPlugin`压缩 css**；

   ```js
   module: {
     rules: [
       {
         test: /\.css$/,
   	    loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
       },
       {
       	test: /\.less$/,
         loader: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
       }
     ]
   },
   
   plugins: [
     new CleanWeabpackPlugin(),																						// 清空 dist
     new MiniCssExtractPlugin({
       filename: 'css/main.[contenthash:8].css'
     })
   ],
   
   optimization: {
     minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})]		// 压缩 css
   }
   ```

## 2.3、如何抽离公共代码和第三方代码？（prod 优化）

* 在 dev 环境，追求快速打包、快速调试，不需要对公共代码和第三方代码进行抽离；

* 在 prod 环境，需对公共代码&第三方代码进行抽离，单独打包；

  * `optimization` 中**配置 `splichunks` 对代码块进行切分**；
    * `chunks` 中**配置 `all` ，对全部的 chunk 进行处理**；
    * `cachgroups` 中**配置 `vender:{}`  和 `common:{}` ，对缓存进行分组**；

  ```js
  optimization: {
  
    // 分隔代码
    spliChunks: {
      
      /**
      * initial 入口 chunk，对于异步导入的文件不处理；
      * async 异步 chunk，只对异步导入的文件处理，默认；
      * all 全部 chunk
  		*/
      chunks: 'all',
      
      //缓存分组
      cachGroups: {
        // 第三方组件
        vendor: {
          name: 'vendor',					// chunk 名称
          priority: 1,						// 抽离优先级
          test: /node_modules/,		// 区分抽离文件的来源
          minSize: 0,							// 要抽离文件的大小限制 kb
          minChunks:1							// 最少复用次数
        },
          
        // 公共模块
        common: {
          name: 'common',
          prioirity: 0,
          minSize: 5,
          minChunks: 2
        }
      }
    }
  }
  ```

* 对公共代码&第三方代码进行抽离打包后，使用 chunk 名称，可以在多入口文件生成 html 时，对 `chunks: ['vendor']` 进行配置，配置后相应的 html 就会引用相应的抽离打包后的代码（即， chunk 名为 'vendor' 的代码） ；

  ```js
  plugins: [
      // 多入口 - 生成 index.html
      new HtmlWebpackPlugin({
          template: path.join(srcPath, 'index.html'),
          filename: 'index.html',
          // chunks 表示该页面要引用哪些打包后的 js 代码
          chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
      }),
  ]
  ```

## 2.4、如何实现懒（异步）加载？

* 使用 import 同步加载：

  * import 返回同步加载的资源；

  ```js
  import { sum } from './math'
  
  const sumRes = sum(10, 20)
  console.log('sumRes', sumRes)
  ```

* 使用 import 异步懒加载：

  * import() 返回 Promise，then 中的参数为异步返回的资源；
  * 不用特意进行 webpack 配置；
  * 懒加载的资源会单独打包，生成单独的 chunk ；

  > index.js

  ```js
  setTimeout(() => {
    // 定义一个 chunk
    import('./dynamic-data.js').then(res => {
      console.log(res.default.message)
    })
  }, 2000)
  ```

  > dynamic-data.js

  ```js
  export.default = {
    message: "这是异步数据"
  }
  ```

## 2.5、如何处理 jsx ？

* 安装：

  ```shell
  npm install --save-dev @babel/preset-react
  ```

* 配置 .babelrc

  ```json
  {
    "presets": ["@babel/preset-react"]
  }
  ```

* common 中 `/\.js$/` 匹配到 `'babel-loader'`，就会使用到 .babelrc 中 `"presets"` 配置的 `"@babel/preset-react"` ；

## 2.6、如何处理 vue ？

* 配置 v-loader

  ```js
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ['vue-loader'],
        include: path.join(__dirname, '..', 'src')
      }
    ]
  }
  ```

# 3、性能优化

## 3.1、优化打包构建速度-开发体验/效率

### 3.1.1、babel-loader（common 开启缓存）

* 优化点：
  * ✅ build 构建速度加快；
  * ✅ 防止 `node_modules` 被打包，减少打包体积，减少请求耗时；

```js
mnodule: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader?catchDirectory',	// 第二次启动时，若 es6 代码未改动，则启用缓存，不必重新编译，减少编译时间
      include: path.join(_dirname, '..', 'src')	// 确定打包范围；
    }
  ]
}
```

### 3.1.2、IgnorePlugin （prod 不引入无用模块）

* 若使用多国语言兼容的库，其中只使用库中的汉语或英语，会有很多其他国家语言冗余的兼容代码；

  1. 导致 build 会很慢；
  2. 产出体积很大，prod 环境下请求资源费时；

* 此时需要在 prod 环境下配置 `IgnorePlugin` ，忽略各国语言兼容的包，如下：

  ```js
  plugins: [
    // webpack 4
    new IgnorePlugin(/^\.\/locale$/, /moment$/)			// 忽略 moment 下的 /locale 目录
    
    // webpack 5
    // new webpack.IgnorePlugin({
    //  	resourceRegExp: /^\.\/locale$/,
    //  	contextRegExp: /moment$/,
  	// })
  ]
  ```

* 其次，需要在该库使用的地方，单独引入汉语兼容，如下：

  ```js
  // index.js
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  
  console.log(moment().locale());								// zh-cn
  console.log(moment().format('LLL'));					// 2021年6月4日下午1点01分
  ```

* 优化点：
  * ✅ build 构建速度加快；
  * ✅ 产出体积减小，减少请求耗时；

### 3.1.3、noParse（prod 不二次babel+webpack模块化的分析）

* 若文件中存在类似于 `xxxx.min.js` 的文件，是已经经过 webpack 模块化+babel处理过的，不用进行二次文件解析处理；

  * 导致 build 变慢；

* 相比于 IgnorePlugin 不同点在于，ignoreplugin 不引入，noparse会引入；

* 此时需要在 prod 环境下配置 `noParse` ，避免类似于 `xxx.min.js` 的文件打包，如下：

  ```js
  module: {
    noParse: [/xxx\.min\.js$/]
  }
  ```

* 在 env 环境下， `xxx.min.js` 不利于调试；
  
* 优化点：
  
  * ✅ build 构建速度加快；

### 3.1.4、happyPack（common 多进程打包）

* Js 本身是单线程的，打包慢，开启多进程打包；

  * ✅ 提高构建速度**（按需使用：⚠️大项目，打包慢的情况下使用；项目小，多进程开启的开销反而会影响打包速度）**；

* 在 common 环境配置 `happyPack` 可以同时提高 prod 或 env 的打包效率，也可以根据情况单独在 prod 或 env 环境使用；

* 首先，在 common 环境的 `rules` 中配置 `happyPack` ，把对 .js 文件的处理，转交给 id 为 babel 的 HappyPack ，如下：

  ```js
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],				// 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        include: path.join(__dirname, '..', 'src')
      }
    ]
  },
  ```

* 其次，在 common 环境的 `plugins` 中配置 `new HappyPack({})` ，如下：

  ```js
  plugins: [
    new HappyPack({																// happyPack 开启多进程打包
      id: 'babel',																// 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      loader: ['babel-loader?catchDirectory']			// 如何处理 .js 文件，用法和 Loader 配置中一样
    })
  ]
  ```

### 3.1.5、ParallelUglifyPlugin（prod 多进程代码压缩）

* Js 本身是单线程的，代码压缩慢，开启多进程压缩；

  * ✅ 提高压缩速度**（按需使用：⚠️大项目，代码压缩慢的情况下使用；项目小，多进程开启的开销反而会影响代码压缩速度）**；

* env 环境行，没必要做压缩；

* 在 prod 环境的 `plugins` 配置 `new ParallelUglifyPlugin({})` ，如下：

  ```js
  plugins: [
    new ParallelUglifyPlugin({		// 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
      uglifyJS: {									// 还是使用 UglifyJS 压缩，只不过帮助开启了多进程，传递给 UglifyJS 的参数
        output: {
          beautify: false, 				// 最紧凑的输出
          comments: false, 				// 删除所有的注释
        },
        compress: {
          drop_console: true,			// 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true,    // 内嵌定义了但是只用到一次的变量
          reduce_vars: true,			// 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
  ]
  ```

### 3.1.6、自动刷新（dev 自动刷新代码生效）

* 自动刷新功能：新代码保存后，网页要重新刷新，新代码生效，页面表单的状态会丢失 + spa页面的路由会回到首页；
  * ✅ 提高开发体验；
* 平时使用 webpack-dev-server 概率较大，而使用 webpack-dev-server 后会帮你实现自动刷新功能，所以自动刷新功能用处不大；

```js
module.export = {
  	// 开启监听，默认为 false
		watch: true,
    watchOptions: {
      	// 忽略监听的文件
        ignored: /node_modules/,
        // 监听到变化发生后会等 300ms (默认)再去执行动作，防止文件更新太快导致重新编译频率太高
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的，默认每隔1000毫秒询问一次
        poll: 1000
    }
}
```

### 3.1.7、热更新（dev 不用刷新代码生效）

* 热更新功能：新代码保存后，网页不重新刷新，新代码生效，页面表单的状态不丢失 + spa页面的路由不会回到首页；
  * 由于有成本，建议按需使用；
  * ✅ 提高开发体验；

1. 在 entry 增加两个参数配置：

   ```js
   entry: {
     index: [
       'webpack-dev-server/client?http://localhost:8080/',			// 参数①
       'webpack/hot/dev-server',																// 参数②
       path.join(__dirname, '../src', 'index.js')
     ]
   }
   ```

2. 在 plugins 中配置 `new HotModuleReplacementPlugin()`

   ```js
   plugins: [
     new HotModuleReplacementPlugin()
   ]
   ```

3. 在 devServer 中配置 `hot: true` :

   ```js
   devServer: {
     hot: true
   }
   ```

4. 使用的成本较高：

   * 需要在开发时自己注册哪些模块需要使用热更新，下方例子中 sum 模块使用热更新，如：

   ```js
   // 增加，开启热更新之后的代码逻辑
   if(module.hot) {
     module.hot.accept([./sum], () => {
       const sumRes = sum(10, 30);
       console.log("sumRes in hot:", sumRes);
     })
   }
   ```

5. 全局热更新

   ```js
   // 把所有的代码都放在一个 entry 入口，然后如下
   module.hot.accept(['./entry'], () => { /*...*/ })
   ```

### 3.1.8、DllPlugin（dev 提高构建速度）

* DLL（Dynamic Link Library）文件：为动态链接库文件，在Windows中，许多应用程序并不是一个完整的可执行文件，它们被分割成一些相对独立的动态链接库，即DLL文件，放置于系统中。当我们执行某一个程序时，相应的DLL文件就会被调用。
* 通常来说，我们的代码都可以至少简单区分成**业务代码**和**第三方库**。如果不做处理，每次构建时都需要把所有的代码重新构建一次，耗费大量的时间。
* 大部分情况下，很多第三方库的代码并不会发生变更（除非是版本升级），这时就可以用到 dll：**把复用性较高的第三方模块打包到动态链接库中，在不升级这些库的情况下，动态库不需要重新打包，每次构建只重新打包业务代码**。
  * ✅ 提高构建速度；
* 不要用于生产环境：生产环境要考虑打包的体积，和加载的性能。DllPlugin 解决的是打包的速度。这两者不一个目的。如果生产环境用了 DllPlugin ，可能会和打包体积、打包合并的逻辑，产生冲突。

1. 使用 `DLLPlugin` 打包出 dll 文件：

   * `DllPlugin`是`webpack`内置的插件，不需要额外安装，需要单独配置一个 `webpack.dll.config.js` 文件：

   ```js
   const path = require('path')
   const DllPlugin = require('webpack/lib/DllPlugin')
   const { srcPath, distPath } = require('./paths')
   
   module.exports = {
     mode: 'development',
     // JS 执行入口文件
     entry: {
       // 把 React 相关模块的放到一个单独的动态链接库
       react: ['react', 'react-dom']
     },
     output: {
       // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
       // 也就是 entry 中配置的 react 和 polyfill
       filename: '[name].dll.js',
       // 输出的文件都放到 dist 目录下
       path: distPath,
       // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
       // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
       library: '_dll_[name]',
     },
     plugins: [
       // 接入 DllPlugin
       new DllPlugin({
         // 动态链接库的全局变量名称，需要和 output.library 中保持一致
         // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
         // 例如 react.manifest.json 中就有 "name": "_dll_react"
         name: '_dll_[name]',
         // 生成 json 文件描述动态链接库的 manifest.json 文件输出时的文件名称
         path: path.join(distPath, '[name].manifest.json'),
       }),
     ],
   }
   ```

   * package.json 中 script 配置打包命令 `npm run dll` ，dist 中生成两个文件：
     * react.dll.js
       * 即，react库 & react-dom库的打包结果；
     * react.mainfast.json
       * 即，react库 & react-dom库的索引映射的 json；

   ```json
   "dll": "webpack --config build/webpack.dll.js"
   ```

   * 在 index.html 文件中，发现添加了 `<script src="./react.dll.js"></script>` 对 react.dll.js 做引用；
     * 保证组件内不引用 node_modules 中的内容，也能正常使用；

2. 在 dev 环境的 plugins 中，通过配置 `DllReferencePlugin` 使用 dll 文件：

   ```js
   // 告诉 Webpack 使用了哪些动态链接库
   plugins: [
     new DllReferencePlugin({
       // 描述 react 动态链接库的文件内容
       mainfest: require(path.join(__dirname, '../dist', 'react.mainfest.json'))
     })
   ]
   ```

## 3.2、优化产出代码-产品性能

