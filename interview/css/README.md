# 1、HTML

## 1.1、如何理解HTML语义化

* 人易懂，增加代码可读性
* 机器易懂，增强SEO

## 1.2、默认情况下，哪些标签是块级元素、哪些是内联元素？

* `display:block/tabel`
  * div、h1、h6、tabel、ul、ol、p
* `display:inline/inline-block`
  * span、img、input、button

# 2、CSS

## 2.1、布局

### 2.1.1、盒模型的宽度如何计算？

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

### 2.1.3、margin的top、left、right、bottom设置负值的效果如何？

* margin-top和margin-left负值，元素向上、向左移动；
* margin-right负值，右侧元素左移，自身不受影响；
* margin-bottom负值，下方元素上移，自身不受影响；

### 2.1.4、BFC

#### 2.1.4.1、什么是BFC？

* Block format context，块级格式化上下文；
* 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素；

#### 2.1.4.2、形成BFC的常见条件

* （常用）元素设为float；
* （常用）position设为absolute/fixed；
  * （https://www.w3school.com.cn/cssref/pr_class_position.asp）
* （常用）overflow设为hidden/scroll/auto/inherit；
  * （https://www.w3school.com.cn/cssref/pr_pos_overflow.asp）
* （不常用）display设为flex/inline-block；

#### 2.1.4.2、BFC的常见应用

* 清除浮动

### 2.1.5、float布局问题，及clearfix

#### 2.1.5.1、如何实现圣杯布局和双飞翼布局？

#### 2.1.5.2、手写clearfix

### 2.1.6、flex画三点骰子

## 2.2、定位

### 2.2.1、absolute和relative分别依据什么定位？

### 2.2.2、居中对齐的实现方式

## 2.3、图文样式

### 2.3.1、line-height继承问题

## 2.4、响应式

### 2.4.1、rem是什么？

### 2.4.2、如何实现响应式？

## 2.5、CSS3

### 2.5.1、CSS3动画







