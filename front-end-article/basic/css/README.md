# 1、HTML

## 1.1、如何理解HTML语义化

* 人易懂，增加代码可读性
* 机器易懂，增强SEO
* header、h1、h2、h3、nav、footer、article、section、aside

## 1.2、默认情况下，哪些标签是块级元素、哪些是内联元素？

* `display:block/tabel`
  * div、h1、h6、tabel、ul、ol、li、dl、dt、dd、p
* `display:inline/inline-block`
  * span、img、input、button

# 2、CSS

## 2.1、布局

### 2.1.1、♨️盒模型的宽度如何计算？

```html
<!--#div1的offsetWidth值是多少？-->
<style type="text/css">
  #div1 {
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
    box-sizing: border-box;
  }
</style>
<div id="div1">
  this is div1
</div>
```

* offsetWidth = 内容宽度 + 内边距 + 边框，（无外边距）；
* `box-sizing: border-box;`
  * #div1的offsetWidth（#div1盒子宽度）为100px = 20px(padding) + 2px(border) + 78px(content)
* `box-sizing: content-box;`
  * #div1的offsetWidth（#div1盒子宽度）为122px = 20px(padding) + 2px(border) + 100px(content)

### 2.1.2、margin纵向重叠问题

```html
<!--AAA到BBB之间的距离是多少？-->
<style type="text/css">
  p {
    font-size: 16px;
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>

<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```

* `line-height: 1` 相当于line-height：100%，会根据该元素本身的字体大小设置行高，比如字体大小是16px，行高就是16px。
* 相邻元素margin-top和margin-bottom会发生重叠，处于纵向重叠其间空白内容的`<p></p>`标签，会被重叠掉，高度为0；
* AAA到BBB之间的距离：(`<p>AAA</p>`标签`margin-bottom`的距离)15px；
* 为什么margin只会上下溢出/重叠而不会左右溢出/重叠?
  * 当你用任何可能的手段使块级元素能横向排列时，如inline-block、float、table-cell等，实际都触发了BFC规则，那么无论w3c有没有设定左右margin是否能溢出/重叠，都不会溢出/重叠，但从之前发现的简单粗暴的规则设计来看，w3c应该不至于多此一举，所以**左右margin不会溢出/重叠的原因大概率是因为触发了BFC。**

### 2.1.3、margin的top、left、right、bottom设置负值的效果如何？

* margin-top和margin-left负值，元素向上、向左移动；
* margin-right负值，右侧元素左移，自身不受影响；
* margin-bottom负值，下方元素上移，自身不受影响；

### 2.1.4、♨️BFC

#### 2.1.4.1、什么是BFC？

* Block format context，块级格式化上下文；
* 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素；

#### 2.1.4.2、形成BFC的常见条件

* （常用）元素设为float；
* （常用）position设为absolute/fixed；
  * （https://www.w3school.com.cn/cssref/pr_class_position.asp）
* （常用）overflow设为hidden/scroll/auto/inherit，不为 visible 的元素；
  * （https://www.w3school.com.cn/cssref/pr_pos_overflow.asp）
* （不常用）display设为flex/inline-block；

#### 2.1.4.2、BFC的常见应用

* 清除浮动

  * 图片浮动后，脱离正常流，包裹图片的容器并未撑高；

  ```css
  .container {
    background-color: #f1f1f1;
  }
  .left {
    float: left;
  }
  .bfc {
    overflow: hidden;  /*设置bfc，清除图片浮动带来的容器未撑开问题*/
  }
  ```

  ```html
  <div class="container bfc">
    <img src="https://images.pexels.com/photos/147359/pexels-photo-147359.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=50" class="left"/>
    <p>某一段文字……</p>
    <p>某一段文字……</p>
  </div>
  ```

### 2.1.5、float布局问题，及clearfix

#### 2.1.5.1、♨️如何实现圣杯布局和双飞翼布局？

* 圣杯布局/双飞翼布局**目的**：
  * 三栏布局，中间一栏最先加载渲染；
  * 两侧内容固定，中间内容自适应；
  * 一般用于PC；
* 圣杯布局/双飞翼布局**技术总结**：
  * 使用float布局；
  * 双飞翼：
    * 左侧使用 `margin-left: “父元素宽度的-100%“` ；
    * 右侧使用 `margin-left: "-自身宽度"` ；
  * 圣杯：
    * 左侧使用 `margin-left: “父元素宽度的-100%“;` + `position: realative;` + `right: “自身宽度”` ；
    * 右侧使用 `margin-right: -自身宽度` ；

1. **圣杯布局**

   ```html
   <style>
     body {
       min-width: 550px;
     }
   
     #header {
       text-align: center;
       background-color: #f1f1f1;
     }
   
     #container {
       padding-left: 150px;
       padding-right: 200px;
     }
     .column {
       float: left;
     }
     #center {
       width: 100%;
       background-color: aqua;
     }
     #left {
       width: 150px;
       background-color: rgb(229, 255, 0);
       margin-left: -100%;					/*移动到前一个元素（前一个元素宽度==父元素宽度）的头部（该元素left与前一个元素left重合）*/
       position: relative;
       right: 150px;               /*根据当前元素位置进行偏移*/
     }
     #right {
       width: 200px;
       background-color: rgb(25, 0, 255);
       margin-right: -200px;       /*移动到前一个元素的尾部（该元素left与前一个元素right重合）(后面元素把该元素表面宽度挤为0)*/
     }
     .clearfix:after {
       content: '';
       display: table;
       clear: both;
     }
   
     #footer {
       text-align: center;
       background-color: #f1f1f1;
     }
   </style>
   <body>
     <div id="header">this is header</div>
     <div id="container" class="clearfix">
       <div id="center" class="column">this is center</div>
       <div id="left" class="column">this is left</div>
       <div id="right" class="column">this is right</div>
     </div>
     <div id="footer">this is footer</div>
   </body>

2. **双飞翼布局**

   ```html
   <style type="text/css">
     body {
       min-width: 550px;
     }
     #main {
       background-color: blue;
       width: 100%;
       height: 200px;
     }
     #main #main-wrap {
       margin: 0 200px;
     }
     #left {
       background-color: brown;
       width: 200px;
       height: 200px;
       margin-left: -100%;
     }
     #right {
       background-color: rgb(67, 165, 42);
       width: 200px;
       height: 200px;
       margin-left: -200px;
     }
     .col {
       float: left;
     }
   </style>
   <body>
       <div id="main" class="col">
           <div id="main-wrap">
               this is main
           </div>
       </div>
       <div id="left" class="col">
           this is left
       </div>
       <div id="right" class="col">
           this is right
       </div>
   </body>
   ```

#### 2.1.5.2、手写clearfix

```css
.clearfix:after {
  content: '';
  display: table;
  clear: both;
}
```

### 2.1.6、♨️flex画三点骰子

1. 以下6个属性设置在容器上。

> - flex-direction
>
>   - row
>   - column
>
> - flex-wrap
>
>   - wrap
>   - nowrap
>
> - flex-flow：是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap` 。
>
>   - ```css
>     flex-flow: <flex-direction> || <flex-wrap>;
>     ```
>
> - justify-content：项目在主轴上的对齐方式。
>
>   - ```css
>     flex-start | flex-end | center | space-between | space-around
>     ```
>
> - align-items：定义项目在交叉轴上如何对齐。
>
>   - ```css
>     flex-start | flex-end | center | baseline | stretch
>     ```
>
> - align-content：定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
>
>   - ```css
>     flex-start | flex-end | center | space-between | space-around | stretch;
>     ```

2. 以下6个属性设置在项目上。

> - `order` ：属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
> - `flex-grow` ：定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。
> - `flex-shrink` ：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
> - `flex-basis` ：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。
> - `flex` ：是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。
> - `align-self` ：允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。

```html
<style type="text/css">
  .box {
    width: 300px;
    height: 300px;
    border: 2px solid cornflowerblue;
    border-radius: 30px;
    padding: 30px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .item {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: gray;
  }
  .item:nth-child(2) {
    align-self: center;
  }
  .item:nth-child(3) {
    align-self: flex-end;
  }
</style>
<body>
    <div class="box">
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
    </div>
</body>
```

## 2.2、定位

### 2.2.1、absolute和relative分别依据什么定位？

* relative依据自身定位；
* absolute依据最近一层的定位元素定位；
  * 定位元素：relative、absolute、fixed；
  * 若父级无定位元素，则依据body定位；

### 2.2.2、♨️居中对齐的实现方式

* 水平居中
  * inline元素：`text-align:center;`
  * block元素：`margin: 0 auto;`
  * absolute元素：`left:50%;`+`margin-left:负值;`（需先知自身宽度）
* 垂直居中
  * inline元素：`line-height`值等于`height`值；
  * absolute元素：`top:50%;`+`margin-top:负值;`（需先知自身高度）
  * absolute元素：`transform: translate(-50%, -50%);`（古老项目兼容性不佳）
  * absolute元素：`top:0; left:0; bottom:0; right:0; margin:auto;`（终极方案）

```html
<head>
  <style type="text/css">
    .container {
      border: 1px solid #ccc;
      margin: 10px;
      padding: 10px;
      height: 200px;
    }
    .item {
      background-color: #ccc;
    }

    .container-1{
      text-align: center;
      line-height: 200px;
      height: 200px;
    }

    .container-2 {
      position: relative;
    }
    .container-2 .item {
      width: 300px;
      height: 100px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      top: 50%;
      margin-top: -50px;
    }

    .container-3 {
      position: relative;
    }
    .container-3 .item {
      width: 200px;
      height: 80px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }

    .container-4 {
      position: relative;
    }
    .container-4 .item {
      width: 100px;
      height: 50px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  </style>
</head>
<body>
    <div class="container container-1">
        <span>一段文字</span>
    </div>

    <div class="container container-2">
        <div class="item">
            this is item
        </div>
    </div>

    <div class="container container-3">
        <div class="item">
            this is item
        </div>
    </div>

    <div class="container container-4">
        <div class="item">
            this is item
        </div>
    </div>
</body>
```

## 2.3、图文样式

### 2.3.1、line-height如何继承？

1. 父元素`line-height: 40px;`为**具体数值**，此时子元素p标签`line-height: 40px;`**继承具体数值**；

   ```html
   <head>
     <style type="text/css">
       body {
         font-size: 20px;
         line-height: 40px;
       }
       p {
         background-color: #ccc;
         font-size: 16px;
       }
     </style>
   </head>
   <body>
       <p>这是一行文字</p>
   </body>
   ```

2. 父元素`line-height: 1.5;`为**比例**，此时子元素p标签`line-height: 24px;`**继承比例**；

   ```html
   <head>
     <style type="text/css">
       body {
         font-size: 20px;
         line-height: 1.5;
       }
       p {
         background-color: #ccc;
         font-size: 16px;
       }
     </style>
   </head>
   <body>
       <p>这是一行文字</p>
   </body>
   ```

3. 父元素`line-height: 1.5;`为**百分比**，此时子元素p标签`line-height: 40px;`**继承计算出来的具体数值**；

   ```html
   <head>
     <style type="text/css">
       body {
         font-size: 20px;
         line-height: 200%;
       }
       p {
         background-color: #ccc;
         font-size: 16px;
       }
     </style>
   </head>
   <body>
       <p>这是一行文字</p>
   </body>
   ```

## 2.4、响应式

### 2.4.1、rem是什么？

* px，相同倍屏情况下是绝对长度，常用；
* em，相对长度，相对于父元素，不常用；
* rem，相对长度，相对于跟元素，常用于响应式布局；

### 2.4.2、如何实现响应式？

```html
<head>
  <title>响应式布局</title>
  <style type="text/css">
    @media only screen and (max-width: 374px) {
      /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置 font-size */
      html {
        font-size: 86px;
      }
    }
    @media only screen and (min-width: 375px) and (max-width: 413px) {
      /* iphone6/7/8 和 iphone x */
      html {
        font-size: 100px;
      }
    }
    @media only screen and (min-width: 414px) {
      /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置 font-size */
      html {
        font-size: 110px;
      }
    }

    body {
      font-size: 0.16rem;
    }
    #div1 {
      width: 1rem;
      background-color: #ccc;
    }

  </style>
</head>
<body>
  <div id="div1">
    this is div
  </div>
</body>
```

## 2.5、🤔️vw/vh

### 2.5.1、rem弊端

* 阶梯性，不能实现阶梯内更细分屏幕宽度的尺寸响应式（即，不能实现真正意义上的等比缩放，同一屏幕不能展示相同多的内容）。

### 2.5.2、网页视口尺寸

* `window.screen.height		// 屏幕高度`；
* `window.innerHeight			//网页视口高度`；
  * 浏览器模拟高度与真机不准，真机不包含头和下巴，浏览器中模拟时网页视口高度与屏幕高度相等；
* `document.body.clientHeight  // 网页 body 内容高度`；

### 2.5.3、vw/vh

* vh网页视口高度的1/100；
* vw网页视口高度的1/100；
* vmax取上方两者最大值，vmin取上方两者最小值；

## 2.6、CSS3动画

# 3、css 补充题目

- css哪些属性可以被继承？有没有什么网站工具可以查阅到所有可被继承的属性以及不能被继承的属性？
  - css 的作用，可以概括为：图文样式，定位，尺寸，布局。一般图文样式的都可以被继承，例如行高、字体、字号、颜色等。
- 怎么查看当前浏览器默认字体大小 & 浏览器中多行文本的默认行高？
  - 浏览器默认字体、行高等，可以从浏览器设置里查。
- 行高以百分比设置的时候是怎么计算出行高的像素值的？
  - 具体行高多少，可以用 getComputedStyle 查出