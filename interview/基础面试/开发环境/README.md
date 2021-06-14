# ✅✅✅✅✅✅

# 开发环境概览

* git
* 调试工具
* 抓包
* webpack/babel
* ES6模块化规范
* linux常用命令

# 1、git常用命令

* git add .
* git checkout xxx
* git commit -m "xxx"
* git push origin master
* git pull origin master
* git branch
* git checkout -b xxx/git checkout xxx
  * 新建分支并切换
* git merge xxx
* git fetch
  * 拉取远程所有分支

* git stash
  * 当在master分支做完需求后，想起未切换分支，此时先git stash暂存更改的内容，再创建分支并切换，最后在新的分支git stash pop将暂存文件弹出，完成新需求的分支转移；
  * 将当前更改的内容放到一边作暂存；
* git stash pop
  * 将暂存的文件弹出来；

# 2、 调试工具

* chrome调试工具

# 3、 抓包

* 移动端H5页面，查看网络请求，需要工具抓包；

* charles

* 抓包过程：

  1. 手机-电脑必须链接同一个局域网；

  2. 将手机代理到电脑上；
  3. 手机浏览网页，即可抓包；

* 抓包时做的事情：

  1. 查看网络请求；
  2. 网址代理；
  3. https（解开加密密码）

# 4、webpack/babel

## 4.1、为何使用webpack

* ES6 模块化，浏览器暂不支持；
* ES6 语法，浏览器不完全支持；
* 压缩代码整合代码，网页加载更快；

## 4.2、webpack基础

### 4.2.1、webpack压缩一段js代码

1. 创建文件夹并npm初始化

   ```shell
   zhz$ mkdir webpack-demo
   zhz$ cd webpack-demo
   zhz$ npm init -y
   ```

   > package.json 添加 scripts 命令

   ```json
   {
     ……
     "script": {
     	"build": "webpack"
   	}
     ……
   }
   ```

2. 安装**webpack + webpack-cli**

   ```shell
   webpack-demo zhz$ npm install webpack webpack-cli -D
   ```

3. 新建src/index.js

   ```shell
   webpack-demo zhz$ mkdir src
   webpack-demo zhz$ cd src
   src zhz$ touch index.js
   ```

   > Index.js

   ```js
   console.log("this is index.js")
   ```

4. 新建webpack.config.js

   ```shell
   src zhz$ cd ..
   webpack-demo zhz$ touch webpack.config.js
   ```

   > webpack.config.js

   ```js
   const path = require('path')
   
   module.exports = {
     mode: 'development',
     entry: path.join(__dirname, 'src', 'index.js'),
     output: {
       filename: 'bundle.js',
       path: path.join(__dirname, 'dist'),
     }
   }
   ```

5. 命令行运行，生成打包文件：webpack-demo/dist/bundle.js

   ```shell
   webpack-demo zhz$ npm run build
   ```

### 4.2.2、webpack压缩js代码并在网页运行（承上）

1. 新建html文件

   ```shell
   webpack-demo zhz$ cd src
   src zhz$ touch index.html
   ```

   > Index.html

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>webpack-演示</title>
   </head>
   <body>
       <h1>webpack-demo</h1>
   </body>
   </html>
   ```

2. 安装**html-webpack-plugin插件（解析html文件）**

   ```shell
   src zhz$ cd ..
   webpack-demo zhz$ npm install html-webpack-plugin -D
   ```

3. 安装**webpack-dev-server（启动服务）**

   ```shell
   webpack-demo zhz$ npm install webpack-dev-server -D
   ```

4. 重新配置webpack.config.js文件

   ```js
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
       mode: 'development',
       entry: path.join(__dirname, 'src', 'index.js'),                 // path(当前目录，'src'，'index.js')
       output: {
           filename: 'bundle.js',
           path: path.join(__dirname, 'dist')
       },
       plugins: [                                                      // 配置插件 plugin 的位置
           new HtmlWebpackPlugin({
               template: path.join(__dirname, 'src', 'index.html'),    // 模版位置
               filename: 'index.html'                                  // dist 中生成 html 文件的名字
           })
       ],
       devServer: {
           open: true,                                                 // 自动打开浏览器
           port: 3000,                                                 // 配置本地服务端口
           contentBase: path.join(__dirname, 'dist')                   // 配置本地服务的目录为 dist
       }
   }
   ```

5. package.json中配置dev命令

   ```json
   {
     ……
     "scripts": {
     	"build": "webpack",
       "dev": "webpack-dev-server"
   	}
     ……
   }
   ```

6. 命令行运行，开发环境命令，默认浏览器中自动打开http://localhost:3000/

   ```shell
   webpack-demo zhz$ npm run dev
   ```

### 4.2.3、webpack中配置Babel（承上）

1. index.js中添加ES6语法

   ```js
   console.log("this is index.js.")
   
   const sum = (a, b) => {
       return a + b;
   };
   
   const res = sum(1, 9);
   console.log(res);
   ```

2. 安装**@babel/core + @babel/preset-env + babel-loader**

   ```shell
   webpack-demo zhz$ npm install @babel/core @babel/preset-env babel-loader --save-dev
   ```

3. 新建.babelrc配置文件

   ```shell
   webpack-demo zhz$ touch .babelrc
   ```

   > .babelrc

   ```json
   {
     "presets": ["@babel/preset-env"]
   }
   ```

4. Babel在webpack.config.js中的配置

   ```js
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     mode: 'development',
     entry: path.join(__dirname, 'src', index.js),
     output: {
       filename: 'bundle.js',
       path: path.join(__dirname, 'dist')
     },
     moudle: {
       rules: [
         {
   				test: /\.js$/,
           use: {
             loader: 'babel-loader'
           },
           include: path.join(__dirname, 'src'),
           exclude: /node_modules/         
         }
       ]
     },
     plugins: [
     	new HtmlWebpackPlugin({
     		template: path.join(__dirname, 'src', 'index.html'),
         filename: 'index.html'
   		})
     ],
     envServer: {
       port: 3000,
       contentBase: path.join(__dirname, 'dist')
     }
   }
   ```

5. 命令行运行，默认浏览器中自动打开http://localhost:3000/，查看引入的http://localhost:3000/bundle.js的源代码，其中ES6的`sum`方法被编译成了ES5。

   ```shell
   webpack-demo zhz$ npm run dev
   ```

### 4.2.4、webpack中配置生产环境（承上）

1. 新建webpack.prod.js

   ```shell
   webpack-demo zhz$ touch webpack.prod.js
   ```

   >  webpack.prod.js添加配置

   ```js
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   moudle.exports = {
     mode: 'production',
     entry: path.join(__dirname, 'src', 'index.html'),
     output: {
       filename: 'bundle.[contenthash].js',
       path: path.join(__dirname, 'dist')
     },
     moudle: {
       rules: [
         {
           test: /\.js$/,
           use: {
             loader: 'babel-loader'
           },
           include: path.join(__dirname, 'src'),
           exclude: /node_moudles/
         }
       ]
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: path.join(__dirname, 'src', 'index.html'),
         filename: 'index.html'
       })
     ]
   }
   ```

2. 修改package.json中的命令配置，使build切换到生产环境

   ```json
   {
     ……
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack --config webpack.prod.js",
       "dev": "webpack-dev-server"
     },
     ……
   }
   ```

3. 执行生产命令，dist中生产出含有哈希值的js文件，js文件内容不变，尾部的哈希值不变，用于区别js资源，可以命中Etag缓存。

   ```shell
   npm run build
   ```

# 5、ES6模块化（承上例子）

1. 添加a.js模块

   ```shell
   webpack-demo zhz$ cd src
   webpack-demo zhz$ touch a.js
   ```

   > a.js导出模块中的内容

   ```json
   export function fn() {
       console.log("this is fn.")
   };
   
   export const name = "zhz";
   
   export const obj = {
       task: "find good job!"
   }
   
   // export { fn, name, obj }
   
   // 若导出形势为：export defult { fn, name, obj }
   ```

   > index.js的引入a.js中的内容

   ```js
   import { fn, name, obj } from './a.js'
   
   fn();
   console.log(name);
   console.log(obj);
   ………………
   
   // 若导出形势为：export defult { fn, name, obj }
   // 则导入形势为：
   // import a from './a'
   // a.fn();
   // console.log(a.name);
   // console.log(a.obj);
   ```

2. 命令行运行，默认浏览器中自动打开http://localhost:3000/，可在浏览器控制台看到相应console.log。

   ```shell
   webpack-demo zhz$ npm run dev
   ```

# 6、linux常用命令

## 6.1、为何学Linux命令

* 公司的线上机器一般都是Linux；
* 测试机保持一致，也是Linux；
* 测试机、线上机问题，本地不能复现，需要排查；

## 6.2、常见的Linux命令

```shell
# 登陆线上/测试机器：ssh 用户名@192.168.xx.xx
webpack-demo zhz$ ssh zhz@192.168.xx.xx

# <平铺>查看文件夹：ls
webpack-demo zhz$ ls
dist                    package-lock.json       src                     webpack.prod.js
node_modules            package.json            webpack.config.js

# <平铺>查看文件夹（包括隐藏文件）：ls -a
webpack-demo zhz$ ls -a
.			.babelrc		node_modules		package.json		webpack.config.js
..			dist			package-lock.json	src			webpack.prod.js

# <列表>查看文件夹（包括隐藏文件）：ls -l
webpack-demo zhz$ ls -l
total 504
drwxr-xr-x    5 Thales  staff     160  5 14 18:12 dist
drwxr-xr-x  418 Thales  staff   13376  5 14 16:07 node_modules
-rw-r--r--    1 Thales  staff  244292  5 14 16:07 package-lock.json
-rw-r--r--    1 Thales  staff     561  5 14 18:05 package.json
drwxr-xr-x    5 Thales  staff     160  5 14 17:24 src
-rw-r--r--    1 Thales  staff    1406  5 14 17:21 webpack.config.js
-rw-r--r--    1 Thales  staff     978  5 14 18:12 webpack.prod.js

# 创建文件夹：mkdir xxx
webpack-demo zhz$ mkdir abc

# 创建文件：touch xxx.js
webpack-demo zhz$ touch abc.js

# 创建文件并打开修改：vi xxx.js
	# 输入 'i' 键，可以输入
	# 命令行中文件输入完成后，点击键盘 'esc' 键；
	# 输入 ':w' 将内容write进文件中，并保存；
	# 输入 ':q' 退出 vi 模式；
	# 输入 ':q!' 不保存，强制退出 vi 模式；
webpack-demo zhz$ vi d.js

# 打开vim教程
webpack-demo zhz$ vimtutor

# 打开已有文件并修改：vim xxx.js
webpack-demo zhz$ vim d.js

# 搜索该文件夹内某个文件中的某”字符片段“：grep 'xxx' 文件名
webpack-demo zhz$ grep babel package.json
    "@babel/core": "^7.14.2",
    "@babel/preset-env": "^7.14.2",
    "babel-loader": "^8.2.2",

# 打开已有文件仅预览：cat xxx.js
webpack-demo zhz$ cat package.json

# 删除文件夹：rm -rf xxx		(-r:递归删除；-f:强制删除)
webpack-demo zhz$ rm -rf abc

# 删除文件：rm xxx
webpack-demo zhz$ rm abc.js

# 进入目录：cd dist
webpack-demo zhz$ cd dist

# 修改文件名：mv 原文件名 新文件名
dist zhz$ mv index.html index1.html

# 按照路径移动文件：mv 文件名 ../文件名
dist zhz$  mv bundle.b3a2c49fa0c59e260828.js ../bundle.b3a2c49fa0c59e260828.js
cd ..
webpack-demo $ mv bundle.b3a2c49fa0c59e260828.js dist/bundle.b3a2c49fa0c59e260828.js

# 拷贝文件：cp 文件名 新文件名
cd dist
dist $ cp bundle.js bundle1.js 
```

