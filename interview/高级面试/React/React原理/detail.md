# 1、函数式编程

> 引用：https://www.ruanyifeng.com/blog/2012/04/functional_programming.html

## 1.1、什么是函数式编程？

* "函数式编程"一种编程范式["编程范式"](http://en.wikipedia.org/wiki/Programming_paradigm)（programming paradigm），即，如何编写程序的方法论。

## 1.2、函数式编程有哪些特点？

1. **函数是"第一等公民"**
   * 所谓["第一等公民"](http://en.wikipedia.org/wiki/First-class_function)（first class），指的是函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值。

2. **只用"表达式"，不用"语句"**
   * "表达式"（expression）是一个单纯的运算过程，总是有返回值；
   * "语句"（statement）是执行某种操作，没有返回值。
   * 函数式编程要求，只使用表达式，不使用语句。也就是说，每一步都是单纯的运算，而且都有返回值。
3. **没有"副作用"**
   * 函数式编程强调没有"副作用"，意味着函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值。
4. **不修改状态（不可变值）**
   * 函数式编程只是返回新的值，不修改系统变量。因此，不修改变量，也是它的一个重要特点。
   * 在其他类型的语言中，变量往往用来保存"状态"（state）。不修改变量，意味着状态不能保存在变量中。函数式编程使用参数保存状态，最好的例子就是递归。
5. **引用透明（纯函数）**
   * 引用透明（Referential transparency），指的是函数的运行不依赖于外部变量或"状态"，只依赖于输入的参数，任何时候只要参数相同，引用函数所得到的返回值总是相同的。

# 2、vdom & diff

## 2.1、为何出现 vdom？

1. DOM操作非常耗费性能；
2. 以前，jQuery 可以自行控制DOM操作的时机，手动调整；
3. 现在，Vue/React 是数据驱动视图，为了有效控制 DOM 操作，采用 vdom 解决方案，用JS模拟DOM结构，计算出最小的变更，再操作真实 DOM；

> ♨️♨️vdom 存在价值：数据驱动视图，采用 vdom ，控制 dom 操作

## 2.2、vdom 有什么特点？

* 使用 js 数据对象表示 DOM 结构 -> VNode
* 比较新旧两棵虚拟 DOM 树的差异 -> diff
* 将差异应用到真实的 DOM 树上 -> patch

## 2.2、♨️♨️vdom 如何用 JS 模拟 DOM 结构？

> DOM 

```html
<div id="div1" class="container">
  <p>VDOM</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```

> vnode — 用 JS 表现👆的 DOM

```js
{
  tag: 'div',
  props: {
    id: 'div1',
    className: 'container'
  }
  children: [
    {
      tag: 'p',
      children: 'VDOM'
    },
    {
      tag: 'ul',
      props: { style: 'font-size: 20px' },
      children: [
        {
          tag: 'li'
          children: 'a'
        }
      ]
    }
  ]
}
```

## 2.3、snabbdom 基本使用

* h 函数
  * 接收三个参数（标签或选择器，属性，子节点数组），返回的是一个vnode结构；

* vnode 数据结构
  * 由 h 函数生成 vnode

* patch 函数
  * 接收两个参数（旧vnode | dom元素，新vnode | null），patch 会将新旧 vnode 进行比较，并渲染 dom；

```js
const snabbdom = window.snabbdom

// 定义 patch
const patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])

// 定义 h
const h = snabbdom.h

const container = document.getElementById('container')

// 生成 vnode
const vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item 2')
])

// 1⃣️：将 vnode 渲染到 dom 
patch(container, vnode)

document.getElementById('btn-change').addEventListener('click', () => {
    // 生成 newVnode
    const newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 1'),
        h('li.item', {}, 'Item B'),
        h('li.item', {}, 'Item 3')
    ])
    
    // let patchVnode = patch(vnode, newVnode);

    // console.log(vnode, newVnode, patchVnode);
    // console.log(newVnode === patchVnode);        // true

    // 2⃣️：新旧 vnode 对比，更新 dom，并将新 newVdome 付值给 vnode；
    vnode = patch(vnode, newVnode) // patch 之后，应该用新的覆盖现有的 vnode ，否则每次 change 都是新旧对比
})
```

## 2.4、♨️♨️理论层面 diff 算法如何实现？

* 旧 diff 算法，时间复杂度 O(n^3)
  * 第一，遍历tree1；
  * 第二，遍历tree2；
  * 第三，排序；

* 新 diff 算法，时间复杂度 O(n)
  * 只比较同一层级，不跨级比较；
  * tag 不相同，则直接删掉重建，不再深度比较；
  * tag 和 key ，两者都相同，则认为是相同节点，不再深度比较；
    * 这条仅限于理论层面，snabbdom 具体实现时，tag 和 key ，两者都相同，会进行深度比较；

## 2.5、snabbdom（diff 算法）源码

### 2.5.1、源码目录

```shell
── h.ts   								# 创建vnode的函数
── helpers
 └── attachto.ts
── hooks.ts  							# 定义钩子
── htmldomapi.ts   				# 操作dom的一些工具类
── is.ts   								# 判断类型
── modules  							# 模块
 ├── attributes.ts
 ├── class.ts
 ├── dataset.ts
 ├── eventlisteners.ts
 ├── hero.ts
 ├── module.ts
 ├── props.ts
 └── style.ts
── snabbdom.bundle.ts 		# 入口文件
── snabbdom.ts  					# 初始化函数
── thunk.ts  							# 分块
── tovnode.ts   					# dom元素转vnode
── vnode.ts  							# 虚拟节点对象
```

### 2.5.2、入口文件：snabbdom.bundle.ts

* 入口文件导出 snabbdomBundle 对象，对象中包含：
  * patch 函数：
    * `init()` 函数中传入 modules ，生成 `patch()` 函数；
  * h 函数：
    * 帮助创造新的 vnodes；

```typescript
import { init } from './snabbdom';
import { attributesModule } from './modules/attributes'; 					// for setting attributes on DOM elements
import { classModule } from './modules/class'; 										// makes it easy to toggle classes
import { propsModule } from './modules/props'; 										// for setting properties on DOM elements
import { styleModule } from './modules/style'; 										// handles styling on elements with support for animations
import { eventListenersModule } from './modules/eventlisteners'; 	// attaches event listeners
import { h } from './h'; 																					// helper function for creating vnodes

var patch = init([ 																								// Init patch function with choosen modules
  attributesModule,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
]) as (oldVNode: any, vnode: any) => any;

export const snabbdomBundle = { patch, h: h as any };
export default snabbdomBundle;
```

### 2.5.3、♨️h() 函数

* 根据 `h(选择器, 数据, 子节点)` 函数中参数的不同，创建不同的 vnode 对象；

### 2.5.4、♨️patch() 函数

* `init(modules, domApi)` 方法传入 modules & domApi，然后返回 `patch()` 方法；
* `patch (oldVnode, vnode)` 方法传入 oldVnode & vnode，对新旧 vnode 判断，并返回新 vnode ；
* `patch()` 方法核心逻辑如下 ：
  * ✅ 旧 oldVnode 不是 vnode，创建一个空的 vnode ，关联到这个 DOM 元素；
  * ✅ 新旧 vnode 相同（key 和 sel 都相等），使用 patchVnode 进行新旧 vnode 对比，并对 vnode 进行修改；
  * ✅ 新旧 vnode 不同，直接依据新 vnode 覆盖旧的 vnode ；
  * ✅ 收集插入节点，调用插入钩子，插入渲染；

```js
export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
	
  function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    // ......
  }
  
	return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    const insertedVnodeQueue: VNodeQueue = [];
    // 执行 pre hook
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    // ✅ 第一个参数旧 oldVnode 不是 vnode，创建一个空的 vnode ，关联到这个 DOM 元素；
    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    }

    // ✅ 新旧 vnode 相同（key 和 sel 都相等），使用 patchVnode 进行新旧 vnode 对比；
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    
    // ✅ 新旧 vnode 不同，直接依据新 vnode 重建 dom；
    } else {
      elm = oldVnode.elm!;
      parent = api.parentNode(elm);
      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
    
    // 遍历所有收集到的插入节点，调用插入的钩子，
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    
    // 调用post的钩子
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}
```

### 2.5.5、♨️patchVnode() 函数

* `patchVnode(oldVnode, vnode)` ：
  * 当 `sameVnode(oldVnode, vnode) === true`（新旧 vnode 相同情况）时，判断新旧 vnode 各自 child 是否相同，并对 vnode 进行修改；
* patchVnode 方法主要的逻辑如下 ：
  * 新 vnode.children 非文本节点的情况
    * ✅ 新旧 children 都存在，调用 updateChildren() 根据 oldCh,ch 对新旧 child 比较，根据 elm 将 ch 插入 vnode ；
    * ✅ 新 children 有，旧 children 无（旧 text 有），setTextContent() 清空 text，addVnodes() 添加 children；
    * ✅ 旧 children 有，新 children 无，removeVnodes() 移除 children；
    * ✅ 旧 text 有，新 text 无值，setTextContent() 清空 text ；
  * 新 vnode.children 是文本节点的情况 
    * ✅ 旧 children 存在，removeVnodes() 移除旧 children；
    * ✅ setTextContent() 设置新 text；

```js
function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
  // 执行 prepatch hook
  const hook = vnode.data?.hook;
  hook?.prepatch?.(oldVnode, vnode);

  // 设置 vnode.elem
  const elm = vnode.elm = oldVnode.elm!;

  // 旧 children
  let oldCh = oldVnode.children as VNode[];
  // 新 children
  let ch = vnode.children as VNode[];

  if (oldVnode === vnode) return;

  // hook 相关
  if (vnode.data !== undefined) {
    for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    vnode.data.hook?.update?.(oldVnode, vnode);
  }

  // vnode.text === undefined （vnode.children存在 一般有值）
  if (isUndef(vnode.text)) {
      // ✅ 新旧 children 都存在，调用 updateChildren() 根据 oldCh,ch 对新旧 child 比较，根据 elm 将 ch 插入 vnode ；
      if (isDef(oldCh) && isDef(ch)) {
        	if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      // ✅ 新 children 有，旧 children 无 （旧 text 有），setTextContent() 清空 text，addVnodes() 添加 children
      } else if (isDef(ch)) {
          // 清空 text
          if (isDef(oldVnode.text)) api.setTextContent(elm, '');
          // 添加 children
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      // ✅ 旧 child 有，新 child 无，removeVnodes() 移除 children
      } else if (isDef(oldCh)) {
          // 移除 children
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      // ✅ 旧 text 有，而新 text 无值，setTextContent() 清空 text 
      } else if (isDef(oldVnode.text)) {
        	api.setTextContent(elm, '');
      }
  // vnode.text !== undefined （vnode.children不存在 无值）
  } else if (oldVnode.text !== vnode.text) {
    // ✅ 旧 children 存在，移除旧 children
    if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    }
    // ✅ 设置新 text
    api.setTextContent(elm, vnode.text!);
  }
  hook?.postpatch?.(oldVnode, vnode);
}
```

### 2.5.6、♨️updataChildren() 函数

* `updataChildren()` 是 `patchVnode` 里面最重要的方法，也是整个 `diff` 里面的最核心方法；

* 当`isDef(oldCh) && isDef(ch) === true`，调用 updateChildren() 根据 oldCh,ch 对新旧 child 比较，根据 elm 将 ch 插入 vnode ；

* `updateChildren` 主要的逻辑如下：

  1. ✅ 优先处理特殊场景，先对比两端，即：

     - 旧 vnode 头 vs 新 vnode 头
     - 旧 vnode 尾 vs 新 vnode 尾
     - 旧 vnode 头 vs 新 vnode 尾
     - 旧 vnode 尾 vs 新 vnode 头

     <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622187544650-assets/web-upload/bf3b0e60-fc03-4517-a607-460eabffdbd6.png" alt="" style="width: 816px; height: 552px;">

  2. ✅ 首尾不一样的情况，**拿新节点 key ，能否对应上 oldCh 中的某个节点的 key**；

     > ♨️**(体现 key 的重要性)**♨️

     * 没对应上（即，**没有使用 key** **｜** **key 不等的情况**），key 不相等，则 vnode 中新建元素；
       * 若没使用 key 则**浪费性能**；
     * 对应上了（即，**使用 key 的情况**），key 相等，则判断 sel 是否相等：
       * sel 不相等，则 vnode 中新建元素；
       * sel 相等，移动元素（即，使用 key **提高性能**）；

  3. ✅ 两个列表对比完之后，清理多余的元素，新增添加的元素

```js
function updateChildren (parentElm: Node, oldCh: VNode[], newCh: VNode[],insertedVnodeQueue: VNodeQueue) {
    let oldStartIdx = 0, newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx: KeyToIndexMap | undefined;
    let idxInOld: number;
    let elmToMove: VNode;
    let before: any;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];

      // 开始和开始对比
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      
      // 结束和结束对比
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];

      // 开始和结束对比
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];

      // 结束和开始对比
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];

      // 以上四个都未命中
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        // ✅ 拿新节点 key ，能否对应上 oldCh 中的某个节点的 key
        idxInOld = oldKeyToIdx[newStartVnode.key as string];
  
        // 没对应上
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!);
          newStartVnode = newCh[++newStartIdx];
        
        // 对应上了
        } else {
          // 对应上 key 的节点
          elmToMove = oldCh[idxInOld];

          // sel 不相等（sameVnode 的条件）
          if (elmToMove.sel !== newStartVnode.sel) {
            // New element
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!);
          
          // sel 相等，key 相等
          } else {
            // 执行 patchVnode 
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined as any;
            // oldStartVnode 删除，移动元素
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  	
  	// 新老数组其中一个到达末尾
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      
      // 如果老数组先到达末尾，说明新数组还有更多的元素，这些元素都是新增的，说以一次性插入
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);

      // 如果新数组先到达末尾，说明新数组比老数组少了一些元素，所以一次性删除
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
}
```

> * **由 updateChildren 体现 key 的重要性**，“使用 key”  🆚 “不使用key”
>   * 不使用 key ：乱序以后，会将老的 vnode 全部删除，再创建新的 vnode；
>   * 使用 key ：乱序以后，会将老的 vnode 做移动，不用删除便生成新的 vnode ；

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622171636275-assets/web-upload/5a3d49f1-c77e-405d-818a-6e83c4b5ba6d.png" alt="" style="width: 984px; height: 350px;">

### 2.5.7、sameVnode() 函数

* sameVnode 源码中根据 **key & sel** 判断是否是相同的虚拟节点；

```typescript
/**
 *  判断是否是相同的虚拟节点
 */
function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
```

# 3、JSX本质

* `React.createElement(tag, props{}, [child|text, ...])` 即对标 Vue 中的 `h()` 函数，都返回 vnode；
  * 第一个参数可能是组件，也可能是tag；
  * 第二个参数可能是对象，也可能是 null；
  * 第三个对象可能是 children 数组，也可能是数组中 child 内容分开写成多个参数；
* React 规定，组件名首字母必须大写；
  * html 的标签都是小写，两者在 jsx 中就可以很好的区分；
* `React.createElement()` 返回 vnode 后，react 底层再调用类似 `patch()` 的函数进行 vdom 的对比，再渲染真实 dom；

# 4、合成事件

# 5、♨️♨️setState & batchUpdate

# 6、组件渲染过程

# 7、前端路由（同vue）

