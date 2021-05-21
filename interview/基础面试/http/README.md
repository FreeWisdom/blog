# HTTP概览

* 题目

> * http 常见的状态码有哪些？
> * http 常见的 methods 有哪些？
>   * 什么是 Restful API ？
> * http 常见的 header 有哪些？
> * 描述 http 缓存机制（‼️重要‼️）

# 1、http 状态码

## 1.1、状态码分类

* 1xx - 服务器收到请求；
* 2xx - 请求成功；
  * 200 - 
* 3xx - 重定向；
  * 302 - 
* 4xx - 客户端错误；
  * 404 - 
* 5xx - 服务端错误；
  * 500 - 

## 1.2、常见状态码

* 1xx - 服务器收到请求；
* 2xx - 请求成功；
  * 200 - 成功；
* 3xx - 重定向；
  * 301 - 永久重定向，配合新地址（location）浏览器自动处理，下次直接访问新地址； 
  * 302 - 临时重定向，配合新地址（location）浏览器自动处理，下次访问旧地址；
  * 304 - 资源未被修改，浏览器读缓存；
* 4xx - 客户端错误；
  * 404 - 资源未找到，客户端路径错误；
  * 403 - 客户端没有权限；
* 5xx - 服务端错误；
  * 500 - 服务器错误；
  * 540 - 网关超时；

# 2、http methods

## 2.1、传统 methods

1. get 获取服务器的数据；
2. post 向服务器提交数据；

## 2.2、现在 methods

1. get 获取服务器的数据；
2. post 新建数据；
3. patch/put 更新数据；
4. delete 删除数据；

## 2.3、Rrestful API

* 新的 API 设计方法；
* ⚠️传统 API 设计：把每个 **url 当作一个功能**；
* ⚠️Rrestful API 设计：把每个 **url 当作一个唯一的资源**；

### 2.3.1、url 如何设计成一个资源？

* 尽量不用 url 参数；
  * 传统 API 设计：`/api/list?pageIndex=2`
  * Restful API 设计：`/api/list/2`
* 用 method 表示操作类型；
  * 传统 API 设计：
    * post 请求-- `/api/create-blog`
    * post 请求-- `/api/update-blog?id=100`
    * get 请求---- `/api/get-blog?id=100`
  * Restful API 设计：
    * post 请求---- `/api/blog`
    * patch 请求--- `/api/blog/100`
    * get 请求------- `/api/blog/100`

# 3、http headers

## 3.1、常见的请求Request Headers

* Accept 浏览器可接收的数据格式；
* Accept-Encoding 浏览器可接收的压缩算法，如 gzip；
* Accept-Language 浏览器可接收的语言，如 zh-CN；
* Connection：keep-alive 一次TCP连接重复使用；
* cookie；
* Host 域名；
* User-Agent 浏览器信息；
* Cotent-type 发送数据的格式，如 application/json；
* **If-None-Match** 客户端发送资源唯一标识，用于协商缓存；
* **If-Modified-Since** 客户端发送资源最后修改时间，用于协商缓存；

## 3.2、常见的返回Response Headers

* Cotent-type 返回数据的格式，如 application/json；
* Cotent-length 返回数据的大小，多少字节；
* Cotent-Encoding 返回数据的压缩算法，如 gzip；
* Set-Cookie 服务端设置cookie；
* **Catch-Control** 服务端返回资源缓存时间，用于强制缓存，status-200；
* **Etag** 服务端返回资源唯一标识，用于协商缓存，status-304；
* **Last-Modified** 服务端返回资源最后修改时间，用于协商缓存，status-304；

## 3.3、自定义 headers

* 简单权限验证，自定义header中写入密钥；

## 3.4、缓存相关headers

* Cache-Control
  * 控制强制缓存的逻辑，如 `Cache-Control: max-age=31536000`(单位是秒，即该文件缓存一年)；
  * Cache-Control 的值
    * max-age：设置缓存的最大过期时间；
    * no-cache：不用本地缓存，正常的向服务端去请求；
    * no-store：不用本地缓存，并不用服务端的缓存措施
    * private：只允许最终的客户端做缓存；
    * public：允许中间的路由/代理做缓存；
* Expires
  * 已被 Cache-Control 代替；
* Last-Modified		If-Modified-Since
  * 资源的最后修改时间；
* Etag						 If-None-Match
  * 资源的唯一标识；

# 4、http 缓存

## 4.1、缓存介绍

* **缓存**：把内容从暂存中读取，而非重新获取；

* 缓存减少了网络请求的数量，让页面加载更快；
* 静态资源（js/css/img）可以被缓存；

## 4.2、http 缓存策略

### 4.2.1、强制缓存

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620891559352-assets/web-upload/e1049027-4dba-43a7-9b30-feb2d1fbe7b3.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 700px; height: 400px;">

* 若超过Cache-Control时间，缓存资源失效，浏览器则再次请求服务器，重新获取资源，并重新设置缓存时间；

### 4.2.2、协商缓存（对比缓存）

* 是服务端的缓存策略：
  * 同样缓存在浏览器；
  * 浏览器，初次请求，服务端返回**资源** + **资源标识**给浏览器；
  * 浏览器，携带**资源标识**再次请求，服务端根据**资源标识**判断客户端资源，是否和服务端一致；
  * 一致，则返回304，浏览器使用缓存资源；
  * 不一致，则返回200 + 最新资源 + 资源标识；

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620893930559-assets/web-upload/44ae9dbd-5bed-446f-8e23-c51b6a05144d.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 700px; height: 400px;">

* **两种资源标识**

  * **Etag的值 === If-None-Match的值**
  * **Last-Modified的值 === If-Modified-Since的值**

  <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620896778100-assets/web-upload/2718176f-6915-4c4d-b318-529733eb3b23.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 900px; height: 300px;">

* 资源标识：Last-Modified

  ​		<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620894957301-assets/web-upload/c85bac15-f7f9-4408-b5aa-6a975299fa92.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 700px; height: 400px;">

* 资源标识：Etag

  ​		<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620894957327-assets/web-upload/04c45424-9b62-474f-9369-356f8cad1520.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 700px; height: 400px;">

* **优先使用Etag**
  * Last-Modified只能精确到秒级；
  * 如果资源被重复生成，而内容不变，则Etag更精准；

### 4.2.3、http缓存综述图（手动画一次❗️❗️）

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1620897389319-assets/web-upload/958347aa-66cd-4926-baa0-54c83563adba.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 700px; height: 500px;">

## 4.3、刷新操作方式，对缓存影响

* 正常操作：地址栏输入URL、跳转链接、前进后退；
  * 强制缓存有效、协商缓存有效；
* 手动刷新：F5/command + r、点击刷新按钮、右键菜单刷新；
  * 强制缓存失效、协商缓存有效；（故，需要  强制缓存 + 协商缓存  一起使用）
* 强制刷新：shift + command + r/ctrl + F5、
  * 强制缓存失效、协商缓存失效；