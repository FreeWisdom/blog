# 1、HTML

## 1.1、如何理解HTML语义化

* 人易懂，增加代码可读性
* 机器易懂，增强SEO

## 1.2、默认情况下，哪些标签时块级元素、哪些是内联元素？

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

* `box-sizing: border-box;`
  * #div1的offsetWidth（#div1盒子宽度）为100px = 20px(padding) + 2px(border) + 78px(content)
* `box-sizing: content-box;`
  * * #div1的offsetWidth（#div1盒子宽度）为122px = 20px(padding) + 2px(border) + 100px(content)

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



### 2.1.3、margin负值问题



### 2.1.4、BFC的理解和应用

### 2.1.5、float布局问题，及clearfix

### 2.1.6、flex画骰子

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







