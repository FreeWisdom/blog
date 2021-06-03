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
			include: /src/,
      exclude: /node_modules/
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
      * async 异步 chunk，只对异步导入的文件处理；
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

## 2.4、

