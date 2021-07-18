# ✅✅✅✅✅✅

# 运行环境概览

* 网页加载过程

  * 题目

  > * 输入url到渲染出页面的过程
  > * window.onload和DOMcontentLoaded区别

  * 知识点

  > * 加载资源的形式
  > * 加载资源的过程
  > * 渲染页面的过程

* 性能优化

* 安全

# 1、页面加载过程

## 1.1、加载资源的形式

* html代码
* 媒体文件，如图片、视频等
* JavaScript css

## 1.2、加载资源的过程

* DNS（domain name server）解析：域名 -> IP地址；
  * 不同区域IP地址是不同的，域名是相同（baidu）的，DNS解析会根据域名解析当地的IP地址；
* 浏览器根据 IP 地址向服务器发起 http 请求；
  * 浏览器调用操作系统的系统服务，发送请求；
  * 三次握手；

* 服务器接收请求，处理http请求，并返回给浏览器；

## 1.3、渲染过程

* 浏览器 **Parse HTML** 解析阶段，根据 HTML 代码生成 DOM 树；
* 浏览器 **Parse HTML** 解析阶段，根据 CSS 代码生成 CSSOM 树；
* 浏览器 **Layout** 布局阶段，将 DOM Tree 和 CSSOM Tree 整合形成 Render Tree；
* 浏览器 **Composite** 合成渲染阶段 ，根据 Render Tree 渲染页面；
* 浏览器 **Evaluate Script** 阶段，遇到 <script> 暂停渲染，优先加载并执行 JS 代码，完成再继续；
  * JS 和 HTML 解析，共用一个线程，JS 可能更改 Render Tree 结构，所以要优先加载 JS ；
* 直至把 Render Tree 渲染完成；

### 1.3.1、为何建议把 css 放到 head 中？

* `css` 放在 `body` 标签尾部：
  *  `DOMTree` 构建完成之后便开始构建 `RenderTree` ，并计算布局渲染网页，等加载解析完 `css` 之后，开始构建 `CSSOMTree` ， 并和 `DOMTree` 重新构建 `RenderTree` ， 重新计算布局渲染网页；
* `css` 放在 `head` 标签中时：
  * 先加载 `css` ， 之后解析 `css` 构建 `CSSOMTree` ，于此同时构建 `DOMTree` ， `CSSOMTree` 和 `DOMTree` 都构建完毕之后开始构建 `RenderTree` ，计算布局渲染网页；
* 对比两者：
  *  `css` 放在 `head` 标签中比 `css` 放在 `body` 标签尾部少了一次构建 `RenderTree` ，一次计算布局和一次渲染网页，因此性能会更好；
  * 并且 `css` 放在 `body` 标签尾部时会在网页中短暂出现”裸奔“的 HTML ，这不利于用户体验；

### 1.3.2、为何建议把 JS 放到 body 最后？

https://juejin.cn/post/6844904166528139277

* **脚本会阻塞页面的渲染**，所以推荐将其放在 body 底部，因为当解析到 script 标签时，通常页面的大部分内容都已经渲染完成，让用户马上能看到一个非空白页面。
* 多个脚本之间都是异步向服务器请求，他们之间不互相依赖，多个脚本异步加载，虽然脚本间响应时间不同，但最终执行顺序和请求顺序一致。

### 1.3.3、window.onload 和 DOMContentLoaded

```js
window.addEventListener('load', function(){
  // 页面全部资源加载完才会执行，包括图片、视频等；
})
document.addEventListener('DOMContentLoaded', function() {
  // DOM渲染完即可执行，此时图片、视频还可能没有加载完；
})
```

### 1.3.4、async/defer模式

* async
  * script.js 会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步）；
  * 当 script.js加载完整立即执行script.js。执行script.js时，html解析暂停；
  * 从加载完成立即执行来看，async模式执行顺序与写的顺序无关，不保证执行顺序；
* defer
  * script.js 会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步），这一点与 `async` 模式一致；
  * 不同的是当 script.js 加载完成并不会立即执行，而是在所有元素解析完成之后， `DOMContentLoaded` 事件触发之前完成。因此它会按照写的顺序执行。

# 2、性能优化

## 2.1、让加载更快

### 2.1.1、减少资源体积

* 压缩代码（前端webpack）

### 2.1.2、减少访问次数

* 合并代码（前端webpack模块化打包，将多js合并成一个js）
* 合并图片（雪碧图）
* SSR服务端渲染：
  * 将网页和数据一起加载，一起渲染；
  * （非ssr）先加载网页，再加载数据，再渲染数据；
* 缓存：
  * JS 资源添加 hash 后缀，根据文件内容计算 hash ；
  * 文件内容不变，则 hash 不变，则 url 不变；
  * url 和文件不变，则会自动触发 http 缓存机制，返回 304 ；

* 使用更快的网络：
  * CDN
    * 根据区域访问当地运营商服务器；
    * 专门做静态文件资源的服务，满足 304 机制；

## 2.2、让渲染更快

### 2.2.1、CSS放在 head ，JS 放在 body 最下面

### 2.2.2、尽早开始执行 JS ，用 DOMContentLoaded触发

```js
document.addEventListener('DOMContentLoaded', function() {
  // DOM渲染完即可执行，此时图片、视频还可能没有加载完；
})
```

### 2.2.3、懒加载

* 随着用户的滑动页面，加载相应出现的图片；

```html
<img id="img1" src="preview.png" data-realsrc="abc.png"/>
<script type="text/javascript">
  // 根据 DOM 元素距离顶部的 top 值获取是否加载该图片；
  var img1 = document.getElementById('img1');
  // if(img1.object.getBoundingClientRect().top === window.innerHeight){   }
  img1.src = img1.getAttribute('data-realsrc');
</script>
```

### 2.2.4、对 DOM 查询进行缓存

```js
// 不缓存 dom 查询结果
for(let i = 0; i < document.getElementsByTageName('p').length; i ++) {
  // 每次循环，都会计算 length ，频繁进行 DOM 查询
}

// 缓存 dom 查询结果
const pList = document.getElementsByTagName('p');
const length = pList.length;
for(let i = 0; i < length; i ++) {
  // 缓存 length ，只进行一次 DOM 查询；
}
```

### 2.2.5、频繁的 DOM 操作，合并到一起插入 DOM 结构

```js
const list = document.getElementById('list')

// 创建一个文档片段，此时还没有插入到 DOM 结构中
const frag = document.createDocumentFragment()

for (let i  = 0; i < 20; i++) {
    const li = document.createElement('li')
    li.innerHTML = `List item ${i}`

    // 先插入文档片段中
    frag.appendChild(li)
}

// 都完成之后，再统一插入到 DOM 结构中
list.appendChild(frag)

console.log(list)
```

### 2.2.6、防抖 debounce

* 监听输入框，文字变化后触发 change 事件；
* 直接用 keyup 事件，则会频繁触发 change 事件；
* 防抖：用户输入结束或暂停时，才会触发 change 事件；

```js
const input1 = document.getElementById('input1')

function debounce(fn, delay = 500) {
    // timer 在闭包中，与外界隔离，保持变量不被外界改变；
    timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer)
        };
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay)
    }
};

input1.addEventListener('keyup', debounce(function (e) {
    console.log(input1.value);
    console.log(e.target);
}, 600))
```

### 2.2.7、节流 throttle

* 拖拽一个元素时，要随时拿到该元素被拖拽的位置；
* 直接用 drag 事件，则会频繁触发，很容易导致卡顿；
* 节流：无论拖拽速度多快，都会每隔 100ms 触发一次；

```js
const div1 = document.geteElementById('div');

function throttle(fn, delay = 100) {
  let timer = null;
  return function () {
    if(timer) {
      return ;
    };
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay)
  }
};

div1.addEventListener('drag', throttle(function (e) {
  console.log(e.offsetX, e.offsetY);
}, 1000))
```

# 3、安全

## 3.1、XSS 跨站请求攻击

* XSS 介绍
  * 一个博客网站，攻击者发表一篇博客，其中嵌入 <script> 脚本；
  * 脚本内容：获取cookie，发送到攻击者的服务器（服务器配合跨域）；
  * 有其他用户查看攻击者发布的博客，攻击者的服务器会收到所有查看这篇博客用户的 cookie ；
* XSS 预防
  * 替换特殊字符，如（`<` 变为 `&lt;`）（ `>` 变为 `&gt;`）（`&` 变为 `&amp;`）
  * `<script>` 变为 `&lt;script&gt;` ，直接显示，而不会做为脚本执行；
  * 前端要替换，后端也要替换，都做总不会错；

## 3.2、XSRF 跨站请求伪造

* XSRF 介绍
  * 你正在购物，看中了某个商品，商品 ID 是100；（已登陆）
  * 付费接口是 xxx.com/pay?id=100，但没有任何验证；
  * 攻击者向你发送一封诱人的电子邮件，邮件正文隐藏着`<img src=xxx.com/pay?id=200 />`；
  * 你一查看邮件，就会付费购买了 id 是200的商品；（利用已登陆的用户信息）；
* XSRF 的预防
  * 使用 POST 接口；
    * post接口的跨域需要server端高度支持；
    * 敏感的操作应该使用POST，而不是GET，以form表单的形式提交，可以避免token泄露。
  * 增加验证，如密码、短信验证、指纹等；

