# HTTP

# 1、什么是 HTTP 服务？

* HTTP 是应用层协议，是计算机 5 层网络协议的一部分，处于最顶部
  1. 物理层
  2. 数据链路层
  3. 网络层----IP
  4. 运输层----TCP / UDP
  5. 应用层----HTTP / FTP / DNS
* 一个网页请求，包含两次HTTP交换：
  1. 浏览器向 HTTP 服务器发送 HTTP 包 --- 请求；
  2. HTTP 服务器向浏览器返回 HTTP 包 --- 响应；

# 2、实现一个 HTTP 服务

1. 如何创建HTTP服务：

   *  `http.createServer(function (request, response) {}).listen(8888)` 

2. HTTP服务如何返回HTML页面：

   *  `fs.createReadStream(__dirname + '/index.html').pipe(response)` 

3. HTTP服务如何返回其他类型的数据：

   *  `response.end('我再也不和你玩了！');` 

4. 如何获取URL地址：

   * 通过内置模块url，转换发送到该 http 服务上的 http 请求包的 url ，将其分割成：
     * 协议(protocol)://
     * 域名(host):
     * 端口(port)/
     * 路径名(pathname)?
     * 请求参数(query)

   *  `const parsedUrl = url.parse(request.url);` 
   *  `if (parsedUrl.pathname == '/game'){}` 

5. 如何获得URL地址参数：

   *  `http://localhost:3000/game?action=rock` 
   *  `const querystring = require('querystring');` 

   *  `const query = querystring.parse(parsedUrl.query);` 
   *  `const playerAction = query.action;      // rock` 

6. 如何设置状态码

   *  `response.writeHead(200);` 

# 3、Express

* express的关键功能
  * 路由系统
    * 在后台开发领域的"路由" 是指，一个请求包来到后台，服务器会根据请求包的内容进行分发，分发到不同的逻辑单元去处理。这个分发的过程就是路由
  * 专注高性能 + 广泛测试覆盖率

- * 简化HTTP操作
    * 封装重定向功能-302
    * 封装缓存功能-304
    * content nagotiation （内容协商）根据请求头-Accept 设置返回的数据格式

- * 模板引擎 支持 14+ 种模版引擎
  * 通过脚手架快速创建应用
  * 中间件
    * 中间件不能穿透事件循环，若在 next 使用 settimeout 等异步，计数的标志变量会记错；

# 4、koa

* 核心功能：
  1. 比 express 更简化的 request/response 功能：
     * ctx.status = 200
     * ctx.body = 'hello world'
  2. 使用了 async function 实现了中间件：
     * 有暂停执行能力；
     * 在异步情况下也符合洋葱模型；
  3. 上述两个强大的功能，为 koa 的精简内核，所有的额外功能都移到中间件实现；

* koa 🆚 express
  * express 门槛低，koa 更强大优雅；
  * express 封装的东西更多，开发速度更快，适用于更多的小型应用；
  * koa 可定制性高，适用于大型可维护型应用；

