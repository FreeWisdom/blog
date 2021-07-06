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

# 4、合成事件机制

## 4.1、 什么是 React 合成事件？

* React 合成事件（SyntheticEvent）是 React 用来模拟原生 DOM 事件所有能力的一个合成事件对象；

* 在 React 中，所有事件都是合成的，不是原生 DOM 事件，但可以通过 `e.nativeEvent` 属性获取 DOM 事件。

  <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622353917962-assets/web-upload/a84a0a80-c0d6-4cd0-9d36-de6a7b6219d7.png" alt="" style="width: 900px; height: 350px;">

  1. jsx 中的事件并不被绑定在所属 DOM 上，而是被委托到组件最顶层进行事件合成（React16与React17各自委托不同目标）；
     * React16 中所有的事件被委托到 document 对象；
     * 为了渐进升级，为了避免多版本的 React 共存的场景中事件系统发生冲突，React17 中所有事件被委托到 root 节点；。

  2. 在合成事件层，生成 `SyntheticEvent` 的实例 `react event` ，并通过 `dispatchEvent` 传递给相应的事件处理函数；
  3. 在事件处理层， `react event` 由对应的处理器执行；
  4. 在组件卸载（unmount）阶段自动销毁绑定在 root 的事件；

## 4.2、React 为什么使用合成事件？

* 进行浏览器兼容，实现更好的跨平台；
  * 比如由 "浏览器a"==>"浏览器b"，仅仅需要不同浏览器端的dom层面进行小量兼容即可，而合成事件则可以在不同端的浏览器共用，所以实现了更好的跨平台；
* 减少内存消耗；
  * 比如“瀑布流的事件绑定”，事件绑定挂载的越多，内存消耗越高，通过合成事件的顶层事件合成代理，则只需在顶层绑定挂载一个事件，减少了内存消耗；
* 避免频繁解绑；
  * 所有的事件看似挂载在 dom 上，实则挂载在 root 上；
  * 所有 dom 删除时，看似所有 dom 都需要将所绑定的事件解绑，实则都没有绑定在每一个 dom ，而是统一绑定在 root 上；
  * 故而不需要对每一个 dom 解绑，而是在组件卸载阶段统一对 root 解绑，故而减少频繁解绑；
* 方便事件的统一管理（事务机制）

## 4.3、合成事件和原生事件的区别是什么？

1. 事件名称命名方式不同
   * 原生事件命名为**纯小写**（onclick, onblur）；
   * React 事件命名采用**小驼峰式**（camelCase）；

```jsx
// 原生事件绑定方式
<button onclick="handleClick()">Leo 按钮命名</button>
      
// React 合成事件绑定方式
const button = <button onClick={handleClick}>Leo 按钮命名</button>
复制代码
```

2. 事件处理函数写法不同
   * 原生事件中事件处理函数为**字符串**；
   * 在 React JSX 语法中，传入一个**函数**作为事件处理函数。

```jsx
// 原生事件 事件处理函数写法
<button onclick="handleClick()">Leo 按钮命名</button>
      
// React 合成事件 事件处理函数写法
const button = <button onClick={handleClick}>Leo 按钮命名</button>
复制代码
```

3. 阻止默认行为方式不同
   * 在原生事件中，可以通过**返回 `false` 方式**来阻止默认行为；
   * 在 React 中，需要**显式使用 `preventDefault()` 方法**来阻止；

```jsx
// 原生事件阻止默认行为方式
<a href="https://www.pingan8787.com" 
  onclick="console.log('Leo 阻止原生事件~'); return false"
>
  Leo 阻止原生事件
</a>

// React 事件阻止默认行为方式
const handleClick = e => {
  e.preventDefault();
  console.log('Leo 阻止原生事件~');
}
const clickElement = <a href="https://www.pingan8787.com" onClick={handleClick}>
  Leo 阻止原生事件
</a>
```

## 4.4、React 事件与原生事件的执行顺序

> - React 所有事件，在初始化时都挂载在 `document` 对象上；
> - 当真实 DOM 元素触发事件
>   - 若是 React 事件，会先拿到 `SyntheticEvent` 实例，再处理 React 事件；
>   - 若是原生事件，则没有拿 `SyntheticEvent` 实例的环节，会直接处理原生事件；

* 原生事件 ==> React 事件 ==> document 事件

# 5、♨️♨️React: transaction 实现 batchUpdate

## 5.1、什么是 batchUpdate（批量更新）机制？

* 在 MV* 框架中，Batch Update 可以理解为将一段时间内对 model 中 state 的修改，批量更新到 view 的机制。
  * react 中并不是所有的 setState 修改的 state 都可以命中 batchUpdate 机制；
  * react 是通过 transaction 机制实现的 batchUpdate 机制；

## 5.2、setState 如何命中 batchUpdate 机制？

* React 可以“管理”入口的函数（即，符合合成事件机制），setState 可以命中 batchUpdate 机制，如：
  * 生命周期（及其调用的函数）；
  * React 中注册的事件（及其调用的函数）；

* React 不可以“管理”入口的函数（即，超出合成事件机制），setState 不可以命中 batchUpdate 机制，如：
  * setTimeout & setInterval 等（及其调用的函数）；     
  * 自定义的 DOM 事件（及其调用的函数）；

## 5.3、什么是 transaction（事务）机制？

```ABAP
*                                    Transaction 作用图
*                       wrappers (injected at creation time)
*                                      +        +
*                                      |        |
*                    +-----------------|--------|--------------+
*                    |                 v        |              |
*                    |      +---------------+   |              |
*                    |   +--|    wrapper1   |---|----+         |
*                    |   |  +---------------+   v    |         |
*                    |   |          +-------------+  |         |
*                    |   |     +----|   wrapper2  |--------+   |
*                    |   |     |    +-------------+  |     |   |
*                    |   |     |                     |     |   |
*                    |   v     v                     v     v   | wrapper
*                    | +---+ +---+   +---------+   +---+ +---+ | invariants
* perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
* +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
*                    | |   | |   |   |         |   |   | |   | |
*                    | |   | |   |   |         |   |   | |   | |
*                    | |   | |   |   |         |   |   | |   | |
*                    | +---+ +---+   +---------+   +---+ +---+ |
*                    |  initialize                    close    |
*                    +-----------------------------------------+
```

* Transaction 是什么？

  * Transaction 对一个setState的函数进行包装，让 React 在在函数运行前后执行特定逻辑，从而完成整个 Batch Update 流程的控制。

  * Transaction 源码，伪代码如下：

    ```js
    var transaction = {
      perform: function(anyMethod) {
        try {
          this.initialize();		// 1、创建 updateQueue，创建 isBatchingUpdate === true；
          anyMethod();					// 2、调用 setState(newState) 方法，将 newState 被推入 updateQueue；
          													// 若 setState 命中 batchUpdate 机制，则 isBatchingUpdate === true
    																// 若 setState 不中 batchUpdate 机制，则 isBatchingUpdate === false
        } finally {
          this.close();					// 3、旧的 state 被 updateQueue 中新的 state 批量更新，并渲染组件；
        }
      },
      initialize: function() {
        console.log("initialize")
      },
      close: function() {
        console.log("close")
      }
    };
    
    function anyMethod() {
      this.setState({
        xxx: "xxx"
      })
      console.log("anyMethod")
    };
    
    transaction.perform(anyMethod)
    ```

* Transaction 的各个流程：

  1. 在 Transaction 的 initialize 阶段：

     * 创建一个 update queue；
     * 创建一个 isBatchingUpdate === true 布尔变量；

  2. 在 Transaction 中调用 setState 方法阶段：

     > setState 主流程图
     >
     > <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622381621184-assets/web-upload/f3bc6dca-42a3-47f1-b2df-f9739e85d9f9.png" alt="" style="width: 506px; height: 250px;">

     * 状态并不会立即应用，而是被推入到 update queue 中；

     * 判断 setState 是否命中 batchUpdate 机制：

       * 若 setState 命中 batchUpdate 机制，isBatchingUpdate === true；

         * 则将接收到的新状态保存到 dirtyComponents (脏组件)中；

         ```js
         calss demo extends React.component {
           constructor(props) {}
           render() {}
           
           // 命中 🎯
           increase = () => {
             // 开始：处于 batchUpdate
             // isBatchingUpdate = true
             this.setState = ({
               count = count + 1
             })
             // 结束：
             // isBatchingUpdate = false
           }
         }
         ```

       * 若 setState 不中 batchUpdate 机制，isBatchingUpdate === false；（🤔️宏任务(非合成事件)不会触发 batchUpdate 机制）

         * 则遍历所有接受新状态的 dirtyComponents；
         * 并调用其 updateComponent 方法更新渲染；
         * 并将  update queue 中的 state 更新；
         * 执行完之后，将 isBatchingUpdates 置为 true。

         ```js
         calss demo extends React.component {
           constructor(props) {}
           render() {}
           
           // 不命中 🙅‍🎯
           increase = () => {
             // 开始：处于 batchUpdate
             // isBatchingUpdate = true
             setTimeout(() => {
               // 异步 callback 执行回来，此时 isBatchingUpdate === false
               this.setState = ({
                 count: count + 1
               })
             })
             // 结束：
             // isBatchingUpdate = false
           }
           
           // 不命中 🙅‍🎯
           componentDidMount() {
             // 开始：处于 batchUpdate
             // isBatchingUpdate = true
             document.body.addEventListener('click', () => {
               // 宏任务的异步 callback 执行回来，此时 isBatchingUpdate === false
               this.setState = ({
                 count: count + 1
               })
             })
             // 结束：
             // isBatchingUpdate = false
           }
         }
         ```

  3. 函数执行结束进入 Transaction 的 close 阶段：

     * update queue 会被 flush，这时新的状态会被应用到组件上并开始后续 Virtual DOM 更新等工作。
     * 布尔变量 isBatchingUpdate === false；（🤔️此时宏任务还未执行，再执行宏任务时候，isBatchingUpdate 便被付值 false）

# 6、组件渲染 & 更新过程

## 6.1、组件渲染过程

* 组件整理好自己的 state 和 props；
* react 通过 jsx 的 `React.createElement(tag, props, children)` 生成 vnode；
* react 会在底层通过类似 `patch(ele, vnode)` 的方法将 vnode 渲染到相应 dom ；

## 6.2、组件更新过程(默认处于 batchUpdate 机制)

* Class 组件
  * 组件中通过 `setState(newState)` 修改数据，生成 dirtyComponent ；
  * react 通过 jsx 的 `React.createElement(tag, props, children)` 遍历所有的 dirtyComponent ，生成 newVnode；
  * react 会在底层通过类似 `patch(oldVnode, newVnode)` 的方法将 newVnode 渲染到相应 dom ；
* 函数组件
  * 函数组件的大概的过程是，重新执行函数，生成新的组件配置，然后进行 diff 、渲染 view 。所以，每次修改 state ，函数组件都会重新执行、返回新内容。

## 6.3、React-fiber如何性能优化？

* react 中的 patch 分为两个阶段：
  * reconciliation 阶段：执行 diff 算法，纯 js 计算；
  * commit 阶段：将 diff 结果渲染 dom ；
* patch 的过程中可能会有性能问题：
  * JS 是单线程，且和 DOM 渲染共用一个线程；
  * 当组件足够复杂，组件更新时，计算和渲染两个阶段的压力都很大；
  * 若同时再有 dom 操作（如动画、拖拽等），将出现卡顿；
* React-fiber 则解决该问题的出现：
  * 由于 dom 渲染的 commit 不能拆分，所以将 js diff 计算的 reconciliation 阶段进行拆分一个个小片；
  * 再通过浏览器的 API `window.requestIdleCallback` 监听浏览器 dom 是否需要渲染；
  * 若浏览器 dom 需要渲染，则暂停 js 计算；
  * 若浏览器 dom 不需渲染，则继续 js 计算；

# 7、♨️前端路由（同vue）

## 7.1、hash

* hash 特点：
  * hash 变化，会触发网页跳转；
    * 即，浏览器前进、后退；
  * hash 变化，页面跳转，不会刷新页面（刷新页面则为后端路由）；
    * 即，spa 必备特点；
  * hash 永远不会提交到 server 端；
    * 即，前端生前端灭；
* js 实现 hash 路由：
  * `location.hash` 获取 hash 初始值；
  * `location.href = '#/user'` js 修改 url；
  * ♨️ `window.onhashchange` 监听 hash 变化；
    * JS 修改 							  url 的 hash
    * 手动修改 				          url 的 hash
    * 浏览器前进、后退修改    url 的 hash

```html
<body>
    <p>hash test</p>
    <button id="btn1">修改 hash</button>

    <script>
        // ✅ hash 变化，包括以下 3 种：
            // 1. JS 修改 url
            // 2. 手动修改 url 的 hash
            // 3. 浏览器前进、后退
        window.onhashchange = (event) => {
            console.log('old url', event.oldURL)
            console.log('new url', event.newURL)

            console.log('hash:', location.hash)
        }

        // ✅ 页面初次加载，获取 hash
        document.addEventListener('DOMContentLoaded', () => {
            console.log('hash:', location.hash)
        })

        // ✅ JS 修改 url
        document.getElementById('btn1').addEventListener('click', () => {
            location.href = '#/user'
        })
    </script>
</body>
```

## 7.2、H5 history

* H5 history 特点：
  * 用 url 规范的路由（浏览器路径中无法区分前后端路由）；
  * 跳转时同样不刷新页面（刷新页面则为后端路由）；
  * 需要后端支持；
    * 即，无论访问什么路由，后端都要配合返回 `index.html` 文件；
    * 因为所有的路径都返回 `index.html` ，故而服务器不会返回 404 错误页面，需要前端配置一个补充路由处理 404 界面；
  * ♨️通过以下两个方法实现：
    * history.pushState
    * window.onpopstate

* js 实现 H5 history
  * `location.pathname` 获取 history 初始值；
  * ♨️ `history.pushState(state, '', 'page1')` js 切换路由；
  *  ♨️ `window.onpopstate` 监听浏览器前进、后退；

```html
<body>
    <p>history API test</p>
    <button id="btn1">修改 url</button>

    <script>
        // ✅ 页面初次加载，获取 path
        document.addEventListener('DOMContentLoaded', () => {
            console.log('load', location.pathname)
        })

        // ✅ 打开一个新的路由
		        // ♨️ 用 pushState 方式，浏览器不会刷新页面
        document.getElementById('btn1').addEventListener('click', () => {
            const state = { name: 'page1' }
            console.log('切换路由到', 'page1')
            history.pushState(state, '', 'page1') // 重要！！
        })

        // ✅ 监听浏览器前进、后退
        window.onpopstate = (event) => { // 重要！！
            console.log('onpopstate', event.state, location.pathname)
        }

        // ✅ 需要 server 端配合，无论前端路由是什么，后端始终都要返回 index.html
        // 可参考：https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
    </script>
</body>
```

# 8、redux 原理

1. createStore 实现

   ```js
   const store = createStore(rootReducer, initalStore, middleware);
   ```

   1. 在 Redux 中，store 一般通过 createStore 来创建。
   2. `createStore` 接收三个参数，分别是 reducers 函数、初始值 initalStore、中间件 middleware。
   3. 其中 `createStore` 返回的方法主要有 `subscribe`、`dispatch`、`getState`、`replaceReducer`。
      1. `getState` 是获取到 store 的方法，可以通过 `store.getState()` 获取到 `store`。
         * 根据传入的初始值来创建一个对象。利用闭包的特性来保留这个 store，允许通过 getState 来获取到 store。
      2. `dispatch` 是发送 action 的方法，它接收一个 action 对象，通知 `store` 去执行 reducer 函数。
         * 将 action 传给 reducer 函数，将执行后的结果设置为新的 store；
         * 然后执行 listeners 中的方法进行发布；
      3. `subscribe` 是一个监听方法，可以监听 `store` 的变化，所以可以通过 `subscribe` 将 Redux 和其他框架结合起来。
         * subscribe：使用一个数组来保存所有监听的方法；
         * unsubscribe：subscribe 返回一个函数，函数中根据传入的 listener 的 index ，将传入的方法从数组中删除；
      4. `replaceReducer` 用来异步注入 reducer 的方法，可以传入新的 reducer 来代替当前的 reducer。

2. createStore 关键代码分析

   ```js
   export default function createStore(reducer, initialState) {
     var currentReducer = reducer
     var currentState = initialState
     var listeners = []
     var isDispatching = false;
   
     // 返回当前的state
     function getState() {
       return currentState
     }
   
     // 注册listener，同时返回一个取消事件注册的方法
     function subscribe(listener) {
       // 发布订阅模式的 订阅
       listeners.push(listener)
       var isSubscribed = true
   
       return function unsubscribe() {
         if (!isSubscribed) {
            return
         }
         isSubscribed = false
         var index = listeners.indexOf(listener)
         listeners.splice(index, 1)
       }
     }
     
     // 通过action该改变state，然后执行subscribe注册的方法
     function dispatch(action) {
       try {
         isDispatching = true
         currentState = currentReducer(currentState, action)
       } finally {
         isDispatching = false
       }
       // 发布订阅模式的 发布
       listeners.slice().forEach(listener => listener())
       return action
     }
   
     // 替换reducer，修改state变化的逻辑
     function replaceReducer(nextReducer) {
       currentReducer = nextReducer
       dispatch({ type: ActionTypes.INIT })
     }
     
     // 初始化时，执行内部一个dispatch，得到初始state
     dispatch({ type: ActionTypes.INIT })
   }
   ```

3. combineReducers 源码分析

   ```js
   export default function combineReducers(reducers) {
     const reducerKeys = Object.keys(reducers)
     const finalReducers = {}
     //将合法的reducer提出来
     for (let i = 0; i < reducerKeys.length; i++) {
       const key = reducerKeys[i] 
       if (typeof reducers[key] === 'function') {
         finalReducers[key] = reducers[key]
       }
     }
     const finalReducerKeys = Object.keys(finalReducers)
     //返回一个reducer，同样接受两个参数，state和action
     return function combination(state = {}, action) {
       let hasChanged = false
       const nextState = {}
       for (let i = 0; i < finalReducerKeys.length; i++) {
         const key = finalReducerKeys[i]
         const reducer = finalReducers[key]
         const previousStateForKey = state[key]
         const nextStateForKey = reducer(previousStateForKey, action)    
         nextState[key] = nextStateForKey
         hasChanged = hasChanged || nextStateForKey !== previousStateForKey
       }
       return hasChanged ? nextState : state
     }
   }
   ```

4. react-redux / provider

   * Provider原理：
     * React通过Context属性，可以将属性(props)直接给子孙component，无须通过props层层传递, Provider仅仅起到获得store，然后将其传递给子孙元素而已。

5. react-redux / connect

