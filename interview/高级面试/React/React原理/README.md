# 1、什么是函数式编程

* 是什么：
  * "函数式编程"一种编程范式；
* 特点：
  * 不修改参数/状态（不可变值）；
  * 纯函数，引用透明，只依赖传入参数，不依赖外部其它参数；
  * 导致没有副作用，任何时候只要参数相同，引用函数所得到的返回值总是相同的。

# 2、说一下 vdom 吧？

* 是什么：
  * vdom 是数据驱动视图时代，为有效控制 dom 操作，而采用的解决方案；
* 特点：
  * js 写的 vnode ，表示 dom 结构；
  * 用 diff 算法对比新旧 vnode 不同之处；
  * 只更新 dom 树关于新旧 vnode 的不同之处；
  * 提高渲染效率；

# 3、说一下 diff 吧？

* 只对同一层级进行比较；
* 若 tag 不同，则直接更新该处 dom 为新 vnode ，不做深度比较；
* 若 tag 和 key 都相同，理论上不进行深度比较；
  * 此处，各个框架具体实现时不同，有的不比较，有的要进行深度比较
    * 当时为了学习了解 vdom 原理，找了比较有代表性的 snabbdom 源码进行学习，这个是有深度比较的；

# 4、你还看过 snabbdom 源码吗？

* snabbdom 暴露了两个函数

  * h 函数
    * 接收 tag字符串+props对象+child数组/text 三个参数；
    * 返回表示 dom 的 vnode ；
  * patch 函数
    * 接受 oldVNode+newVNode 两个参数进行比较，并根据差异修改真实 dom ；

* **patch(oldvnode|el, newvnode)** 函数内部的流程：

  1. ✅ 初始时，oldVNode 不是 vnode，是一个 DOM 元素，此时判断 oldVNode 不是 vnode 则创建一个空的 vnode ，关联到这个 DOM 元素；

  2. ✅ sameVnode(oldVnode, vnode)返回true，说明新旧 vnode 相同（key 和 sel 都相等），则使用 patchVnode 进行新旧 vnode 的 children 对比；

  3. ✅ 新旧 vnode 不同，直接依据新 vnode 覆盖旧的 vnode ；
  4. ✅ 收集插入节点，调用插入钩子，插入渲染；

* **patchVnode(oldvnode, newvnode, insertvnodeque)** 函数主要的逻辑如下 ：

  * 新 vnode.children 非文本节点的情况
    * ✅ 新旧 children 都存在，调用 updateChildren() 根据 oldCh,ch 对新旧 child 比较，根据 elm 将 ch 插入 vnode ；
    * ✅ 新 children 有，旧 children 无（旧 text 有），setTextContent() 清空 text，addVnodes() 添加 children；
    * ✅ 旧 children 有，新 children 无，removeVnodes() 移除 children；
    * ✅ 旧 text 有，新 text 无值，setTextContent() 清空 text ；
  * 新 vnode.children 是文本节点的情况 
    * ✅ 旧 children 存在，removeVnodes() 移除旧 children；
    * ✅ setTextContent() 设置新 text；

* **updateChildren(parentElm, oldvnode, newvnode, insertedVnodeQueue)** 函数主要的逻辑如下：
  1. ✅ 优先处理特殊场景，先用 sameVnode 对比两端，即：

     - sameVnode(oldStartVnode, newStartVnode)
     - sameVnode(oldEndVnode, newEndVnode)
     - sameVnode(oldStartVnode, newEndVnode)
     - sameVnode(oldEndVnode, newStartVnode)
  2. ✅ 以上对比若有返回 true ，则调用 patchVnode() 再进行比较，相应 index ++ 或 --；
  3. ✅ 以上对比若均返回 fasle ，则拿新节点 key 与 oldCh 中的某个节点的 key 进行对比；
     * 没对应上，说明该旧节点 key 不相等或没有使用 key ，则 vnode 用新的覆盖；
     * 对应上了，说明该节点 key 相等，则判断 sel 是否相等：
       * sel 不相等，说明不新旧 vnode 不等，则 vnode 用新的覆盖；
       * sel 相等，说明新旧 vnode 相等，移动元素即可；
  4. ✅ 由上述几步得知，一定要在 vdom 中科学的使用 key 值：
     * 不用随机数/index：
       * 若用 随机数/index 作为 key ，乱序后 key 就不会相等，对于 vnode 还要删除重建；
     * 使用唯一值 id 作为 key；
       * 乱序后，仅仅需要移动 vnode 即可；

# 5、JSX本质

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

