# 1、前端代码为何进行构建打包？

# 2、module chunk bundle 分别什么意思，有何区别？

# 3、loader 与 plugin 的区别？

# 4、webpack 如何实现懒加载？

# 5、webpack 常见性能优化？

# 6、babel-runtime 和 babel-polyfill 的区别？

# 7、关于 webpack 5

*  webpack 5 主要进行内部效率的优化；
* 对比  webpack 4 无太多使用上的改动；
* webpack4 demo 升级 webpack5 以及周边插件后，会有一点点不同，代码需要做出的调整：
  * package.json 的 dev-server 命令改了 `"dev": "webpack serve --config build/webpack.dev.js",`
  * 升级新版本 `const { merge } = require('webpack-merge')`
  * 升级新版本  `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`
  *  `module.rules` 中 `loader: ['xxx-loader']` 换成 `use: ['xxx-loader']`
  *  `filename: 'bundle.[contenthash:8].js'` 其中 `h` 小写，不能大写

# 8、什么类型项目或什么需求需要多入口文件？

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

# 9、抽离公共代码和第三方代码放在哪个环境？

* 首先，分割文件是为了减小文件大小，使得加载较快，但是拆分文件也需要耗费一定的时间；
* 针对于开发环境，文件都是在本地的，加载速度本身较快，而且代码频繁改动，每次改动都需要重新拆分代码，所以在开发环境没必要拆分代码；
* 在生产环境，文件从服务器获取，如果文件太大的话加载较慢，所以需要拆分，另外生产文件也不是频繁打包的，所以可以接受拆分代码时消耗一定的时间。

