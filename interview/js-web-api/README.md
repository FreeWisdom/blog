# 1、JS Web API 概览

1. DOM

   * 题目:

   > * DOM是哪种数据结构
   > * DOM操作常用API
   > * attr和property区别
   > * 一次性插入多个DOM节点，考虑性能

   * 知识点：

   > * DOM本质：从html文件解析出来的一棵树🌲；
   >
   > * DOM节点操作
   > * DOM结构操作
   > * DOM性能

2. BOM

   * 题目：

   > * 识别浏览器的类型
   > * 分析拆解URL各个部分

   * 知识点：

   > * navigator
   > * screen
   > * location
   > * history

3. 事件绑定

   * 题目

   > * 编写一个通用的事件监听函数
   > * 描述事件冒泡流程
   > * 无限下拉的图片列表，如何监听每个图片的点击（事件代理）

   * 知识点：

   > * 事件绑定
   > * 事件冒泡
   > * 事件代理

4. ajax

   * 题目

   > * 手写简易ajax
   > * 跨域的常用实现方式

   * 知识点：

   > * XMLHttpRequest
   > * 状态码
   > * 跨域：同源策略，跨域解决方案

5. 存储

   * 题目

   > * 描述 cookie localStorage sessionStorage 区别

   * 知识点

   > * cookie
   >
   > * localStorage 和 sessionStorage

# 2、DOM（文档对象模型）

## 2.1、DOM本质

* 从html文件解析出来的一棵树🌲；

## 2.2、DOM节点操作

### 2.2.1、获取DOM节点

```js
const div1 = document.getElementById('div1')
console.log('div1', div1)

const divList = document.getElementsByTagName('div') // 集合
console.log('divList.length', divList.length)
console.log('divList[1]', divList[1])

const containerList = document.getElementsByClassName('container') // 集合
console.log('containerList.length', containerList.length)
console.log('containerList[1]', containerList[1])

const pList = document.querySelectorAll('p')
console.log('pList', pList)
```

###  2.2.2、attribute

* 修改html属性，会改变html结构；
* 可能引起DOM重新渲染

```js
const pList = document.querySelectorAll('p')
const p1 = pList[0]p1.style.width = '100px'

p1.setAttribute('data-name', 'imooc')
console.log( p1.getAttribute('data-name') )
p1.setAttribute('style', 'font-size: 50px;')
console.log( p1.getAttribute('style') )
```

### 2.2.3、property

* 修改对象属性，不会体现到html结构中；
* 可能引起DOM重新渲染

```js
const pList = document.querySelectorAll('p')
const p1 = pList[0]p1.style.width = '100px'

console.log( p1.style.width )
p1.className = 'red'
console.log( p1.className )
console.log(p1.nodeName) // p1
console.log(p1.nodeType) // 1
```

## 2.3、DOM结构操作

```js
const div1 = document.getElementById('div1')
const div2 = document.getElementById('div2')
```

### 2.3.1、新增/插入节点

```js
// 新建节点
const newP = document.createElement('p')
newP.innerHTML = 'this is newP'

// 插入节点
div1.appendChild(newP)

// ⚠️移动节点
const p1 = document.getElementById('p1')
div2.appendChild(p1)
```

### 2.3.2、获取子元素列表/父元素

```js
// 获取子元素列表
const div1ChildNodes = div1.childNodes
console.log( div1.childNodes )
const div1ChildNodesP = Array.prototype.slice.call(div1.childNodes).filter(child => {
    if (child.nodeType === 1) {
        return true
    }
    return false
})
console.log('div1ChildNodesP', div1ChildNodesP)
```

### 2.3.3、删除子元素

```js
div1.removeChild( div1ChildNodesP[0] )
```

## 2.4、DOM性能⚠️

### 2.4.1、对DOM查询做缓存

```js
// ⚠️不缓存DOM查询结果
for (let i = 0; i < document.getElementByTagName("p").length; i ++) {
  // 每次循环都会计算length，频繁进行DOM查询；
}
```

```js
// ⚠️缓存DOM查询结果
const plist = documnet.getElementByTagName("p");
const length = plist.length
for (let i = 0; i < length; i ++) {
  // 缓存length，只进行一次DOM查询
}
```

### 2.4.2、将频繁操作改为一次性操作

```js
// ⚠️频繁操作
const list = document.getElementById("list");
for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  li.innerHTML = `List item ${i}`;
  list.appendChild(li);
}
```

```js
// ⚠️一次性操作
const list = document.getElementById("list");
const frag = document.createDocumentFragment();	// 创建一个文档片段
for (let i = 0; i < 20; i ++) {
  const li = document.createElement("li");
  li.innerHTML = `list item ${i}`;
  frag.appendChild(li);		// 先插入文档片段
}
list.appendChild(frag);		// 一次性操作
```

# 3、BOM（浏览器对象模型）

* navigator（识别浏览器类型）
  * `navigator.userAgent // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"`
* screen
* location（拆解URL部分）
  * `location.href`
  * `location.protocol  // 'http:' 'https:'`
  * `location.pathname`
  * `location.search`
  * `location.hash`
* history
  * `history.back()`
  * `history.forward()`

# 4、事件

## 4.1、事件绑定

```js
// 普通的事件绑定
const btn = document.getElementById("btn");
btn.addEventListener("click", event => {
  console.log("clicked");
})
```

```js
// 通用的绑定函数
function bindEvent(element, type, fn) {
  elem.addEventListener(type, fn);
};

// 通用的绑定函数升级
function bindEvent1(elem, type, selector, fn) {
  // 兼容三个参数  
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if (selector) {
      // 有 selector 代理绑定
      if (target.matches(selector)) {
        fn.call(target, event)
      }
    } else {
      // 无 selector 普通绑定
      fn.call(target, event)
    }
  })
}

const a = document.getElementById("link1");
bindEvent(a, "click", e => {
  e.preventDefault();		// 阻止默认行为
  alert("clicked");
})
bindEvent1(a, "click",function (e) {
  e.preventDefault();		// 阻止默认行为
  alert(this.innerHTML);
})
```

## 4.2、事件冒泡

* 基于DOM的树形结构；
* 事件会顺着触发元素向上冒泡；
* 应用场景：代理

```html
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <p id="p4">取消</p>
  </div>
  <div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
  </div>
</body>

<script>
const p1 = document.getElementById('p1')
bindEvent(p1, 'click', event => {
    event.stopPropagation() // 阻止冒泡
    console.log('激活')
})
const body = document.body
// 利用冒泡，将所有的取消事件都添加在body统一处理
bindEvent(body, 'click', event => {
    console.log('取消')
    // console.log(event.target)
})
</script>
```

## 4.3、事件代理

* 相对于瀑布流之类，绑定事件，代码简洁；
* 减少浏览器内存占用；
* 事件代理，表意不明，滥用容易让人误会；

```js
const div3 = document.getElementById('div3')
// 未升级
bindEvent(div3, 'click', event => {
    event.preventDefault()
  	const target = event.target;
  	if(target.nodeName === "A") {
	    alert(target.innerHTML)      
    }
})
// 升级版
bindEvent1(div3, 'click', "a", function (e) {
    e.preventDefault();
	  alert(this.innerHTML);
})
```

# 5、ajax

## 5.1、手写XMLHttpRequest

```js
// GET 请求
const xhr = new XMLHttpRequest();
xhr.open("GET", "/data/test.json", true);	// true 异步请求
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));	// 转换成json形式
      alert(xhr.responseText);
    } else {
      console.log("其他情况")
    }
  }
}；
xhr.send(null);			// get请求不用发送数据
```

```js
// POST 请求
const xhr = new XMLHttpRequest();
xhr.open("POST", "/login.json", true);
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText))
    }
  }
}
const data = {
  usr: zhz,
  pasw: xxx
}
xhr.send(JSON.stringify(data));		// post请求发送字符串
```

### 5.1.1、手写ajax（普通+promise）

```js
// 普通
function ajax(url, successFn) {
  const xhr = new XHMHttpRequest();
  xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        successFn(xhr.responseText);
      }
    }
  }
  xhr.send(null);
}
```

```js
// promise版
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readystate === 4) {
        if(xhr.status === 200) {
          resolve(
          	JSON.parse(xhr.responseText);
          )
        } else if(xhr === 404) {
          reject(
          	new Error("404 not found");
          )
        }
      }
    }
    xhr.send(null);
  })
  return p;
};

const url = '/xxx/xxx.json';
ajax(url)
	.then(res => {
  	console.log(res);
	})
	.catch(err => {
  	console.error(err);
	})
```

### 5.1.2、readyState

* 0-（未初始化）还没有调用send()方法；

* 1-（载入）已调用send()方法，正在发送请求；
* 2-（载入完成）send()方法执行完成，已接收到全部响应内容；
* 3-（交互）正在解析响应内容；
* 4-（完成）相应内容解析完成，可在客户端调用；

### 5.1.3、xhr.status

* 2xx - 表示成功处理请求；
  * 200
* 3xx - 需要重定向，浏览器直接跳；
  * 301 - 永久重定向，浏览器每次访问a地址，都会主动跳到b地址；
  * 302 - 临时重定向，浏览器访问a地址，会自动跳到b地址；
  * 304 - 资源未改变，浏览器使用本身缓存资源；
* 4xx - 客户端请求错误；
  * 404 - 请求地址错误；
  * 403 - 客户端没有请求权限；
* 5xx - 服务器端错误；

## 5.2、跨域

### 5.2.1、什么是跨域（同源策略）？

* ajax请求时，浏览器要求当前网页和server必须同源（安全）；
* 同源：协议、域名、端口，三者一致；

#### 5.2.1.1、加载图片/css/js可无视同源策略

* `<img src=跨域图片地址 />`
* `<link href=跨域css地址 />`
* `<script src=跨域js地址></script>`

#### 5.2.1.2、图片/css/js无视同源策略的用途

* `<img />`可用于统计打点，可使用第三方统计服务；
* `<link />` `<script>`可使用CDN，CDN一般都是外域；
* `<script>` 可实现 JSONP；

#### 5.2.1.3、跨域

* 所有的跨域，都必须经过server端允许和配合；
* 未经server端允许就实现跨域，说明浏览器有漏洞；

### 5.2.2、JSONP

#### 5.2.2.1、基本原理

* `<script>`可绕过跨域限制；
* 服务器可以任意动态拼接JSONP数据返回；
* 故，`<script>`可以获得跨域的数据，只要服务端愿意返回；

```html
<!-- 浏览器端 -->
<body>
  <p>一段文字 1</p>

  <script>
    window.abc = function (data) {
      console.log(data)
    }
  </script>
  <!-- ⚠️发送后会带着服务端数据执行 abc(服务端数据){} 函数 -->
  <script src="http://localhost:8002/jsonp.js?username=xxx&callback=abc"></script>
</body>
```

```json
// 服务器端数据格式，abc 与浏览器端的callback相同；
abc(
    { name: 'xxx' }
)
```

```js
// JQuery实现JSONP
$.ajax({
  url: 'http://localhost:8882/x-origin.json',
  dataType: 'jsonp',
  jsonpCallback: 'callback',
  success: function (data) {
    console.log(data);
  }
})
```

### 5.2.3、CORS（服务端支持）

```js
// 第二个参数填写允许跨域的域名称，不建议直接写"*";
response.setHeader("Access-Control-Allow-Origin", "http//localhost:8011");

// 接收跨域的cookie
response.seterHeader("Access-Control-Allow-Credentials", "true");
```

## 5.3、ajax常用的插件

* JQuery ajax

  ```js
  $(function(){
    //请求参数
    var list = {};
    //
    $.ajax({
      //请求方式
      type : "POST",
      //请求的媒体类型
      contentType: "application/json;charset=UTF-8",
      //请求地址
      url : "http://127.0.0.1/admin/list/",
      //数据，json字符串
      data : JSON.stringify(list),
      //请求成功
      success : function(result) {
        console.log(result);
      },
      //请求失败，包含具体的错误信息
      error : function(e){
        console.log(e.status);
        console.log(e.responseText);
      }
    });
  });
  ```

* Fetch(https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

  `fetch` 规范与 `jQuery.ajax()` 主要有三种方式的不同：

  - 当接收到一个代表错误的 HTTP 状态码时，从 `fetch()` 返回的 Promise **不会被标记为 reject，** 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 `ok` 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
  - `fetch()` **可以~~不会~~接受跨域 cookies；**你也可以~~不能~~使用 `fetch()` 建立起跨域会话。~~其他网站的 `Set-Cookie` 头部字段将会被无视。~~
  - `fetch` **不会发送 cookies**。除非你使用了*credentials* 的[初始化选项](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)。（自 2017 年 8 月 25 日以后，默认的 credentials 政策变更为 `same-origin`。Firefox 也在 61.0b13 版本中进行了修改）

* axios

  * 基于XMLHttpRequest
  * 支持promise

# 6、存储

## 6.1、cookie

* 本身用于**浏览器和server通讯**；
* H5以前，被借用到本地存储；
* 使用：
  * 可用`document.cookie = "a=100"`来修改；
  * 同一key会覆盖，不同key需要多次追加，一次只能加一个；
* 缺点：
  * 存储大小，最大4KB；
  * http 请求时需要发送到服务端，增加请求数据量；
  * `document.cookie = "a=100"`的API使用方式不舒服，每次只能追加一个key；

## 6.2、localStorage 和 sessionStorage

* HTML5专门为存储而设计，最大可存5M；

* 使用：

  ```js
  localStorage.setItem("a", 100);		// 自动被转换成字符串
  localStorage.setItem("b", "200");
  localStorage.getItem("a");				// "100"
  localStorage.getItem("b");				// "200"
  ```

* 不随着 http 请求被发送出去；

* 区别：
  * localStorage 数据会永久存储，除非代码或手动删除；
  * sessionStorage 数据只存在于当前会话，浏览器关闭则清空；