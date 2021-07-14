# 1、React 组件如何通讯？

1. 父子组件 props

```js
const Child = ({ name }) => {
    <div>{name}</div>
}

class Parent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'zach'
        }
    }
    render() {
        return (
            <Child name={this.state.name} />
        )
    }
}
```

2. 父子组件 ref
   * 父组件中调用子组件的方法；
   * 达到控制子组件的效果；

```jsx
class Modal extends React.Component {
  show = () => {// do something to show the modal}
  hide = () => {// do something to hide the modal}
  render() {
    return <div>I'm a modal</div>
  }
}

class Parent extends React.Component {
  componentDidMount() {
    if(/* some condition */) {
        this.modal.show()		// 父组件操作子组件方法
    }
  }
  render() {
    return (
      <Modal
        ref={el => {
          this.modal = el
        }}
      />
    )
  }
}
```

3. 子父组件 自定义事件
   * 父组件的方法传递给子组件调用

```jsx
const Child = ({ getName }) => {
    <div onClick={() => getName('thales')}>Click Me</div>
}

class Parent extends React.Component {
    getName = (data) => {
        console.log("Parent received value from child: " + data)
    }
    render() {
        return (
            <Child getName={this.getName} />
        )
    }
}
```

4. 兄弟组件 公共父组件
5. 兄弟组件 context
6. 不相关组件 观察者模式

```js
class EventBus {
    constructor() {
        this.bus = document.createElement('fakeelement');
    }

    addEventListener(event, callback) {
        this.bus.addEventListener(event, callback);
    }

    removeEventListener(event, callback) {
        this.bus.removeEventListener(event, callback);
    }

    dispatchEvent(event, detail = {}){
        this.bus.dispatchEvent(
          // javascript提供了现成的api来发送自定义事件: CustomEvent，
          new CustomEvent(event, { detail })
        );
    }
}

export default new EventBus;
```

```js
import EventBus from './EventBus'
class ComponentA extends React.Component {
    componentDidMount() {
        EventBus.addEventListener('myEvent', this.handleEvent)
    }
    componentWillUnmount() {
        EventBus.removeEventListener('myEvent', this.handleEvent)
    }
    handleEvent = (e) => {
        console.log(e.detail.log)  //i'm zach
    }
}

class ComponentB extends React.Component {
    sendEvent = () => {
        EventBus.dispatchEvent('myEvent', {log: "i'm zach"}))
    }
    render() {
        return <button onClick={this.sendEvent}>Send</button>
    }
}
```

7. 所有组件 redux

# 2、JSX 本质是什么？

* React.createElement(tag, props, children) 函数执行返回 vnode；

# 3、context 是什么？什么用途？

* 父组件向其所有子孙组件传递信息；
  * 如：主题色、语言等；
* 复杂的公共信息，请用 redux；

# 4、SCU 的用途？

* 性能优化；
* 配合不可变值一起使用，否则会出错；

# 5、描述 Redux 单项数据流？

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622040360114-assets/web-upload/5a191447-f0f1-4199-9cd0-b86405d00e9f.png" alt="" style="width: 616px; height: 552px;">

# 6、setState 是同步还是异步？

```js
componentDidMount() {
  // count 初始化为 0
  this.setState({count: this.state.count + 1})
  console.log('1', this.state.count)							// '1' 0
  this.setState({count: this.state.count + 1})
  console.log('2', this.state.count)							// '2' 0
  setTimeout(() => {
    this.setState({count: this.state.count + 1})
    console.log('3', this.state.count)					 	// '3' 2
  })
  setTimeout(() => {
    this.setState({count: this.state.count + 1})
    console.log('4', this.state.count)					 	// '4' 3
  })
}
```

# 7、什么是纯函数？

* 返回一个新值（不可变值）；
* 不修改其它值（纯函数没有副作用）；

* 输入什么就返回什么（输入数组/数字/字符串，返回数组/数字/字符串）；

# 8、React 组件生命周期

## 8.1、单个组件生命周期

* 挂载时
  * constructor
  * static getDerivedStateFromProps
  * render
  * componentDidMount
* 更新时
  * static getDerivedStateFromProps
  * shouldComponentUpdate
  * render
  * getSnapshotBeforeUpdate
  * componentDidUpdate
* 卸载时
  * componentWillUnmount

## 8.2、父子组件生命周期

* 初始化父子组件执行顺序
  * 先父组件创建虚拟 dom ，再子组件创建虚拟dom 。初始化先保证父组件初始化完再初始化子组件。（外 => 内）
  * 然后子组件渲染，再父组件渲染 。渲染先保证子组件渲染完再渲染父组件 （内 => 外）
* 删除子组件触发生命周期顺序
  * 先在父组件的虚拟 dom 中删除子组件的虚拟 dom；
  * 子组件删除虚拟 dom ；
  * 子组件渲染删除 dom ；
  * 父组件渲染更新完毕；
* 更新子组件触发生命周期顺序
  * 先触发父组件修改 state ，更新 state 传给子组件；
  * 子组件更新 state  ；
  * 子组件渲染修改后的 state ；
  * 子组件渲染完成后，父组件才能渲染完；

# 9、ajax应该放在哪个生命周期？

* componentDidMount

# 10、渲染列表为何用key？

* 如 snabbdom 中处理核心 diff 算法的 updateChildren 函数中，是用 key + tag 判断是否是 sameNode ；
  * 若是 sameNode 则只移动相应 dom 即可，不用创建删除，提高了整体 patch 的性能；
  * 故减少渲染次数，提升渲染性能；
* 不可以是 random 或 index ，若不然，效果与不加 key 是相同的；

# 11、函数组件和class组件的区别？

* 函数组件：
  * 纯函数，输入 props ，输出 jsx；
  * 没有实例、没有生命周期、没有 state ；
  * 🤔️（hooks能了吧？）不能拓展其它方法；

# 12、什么是受控组件？

* 受 state 控制的组件；
  * 需要自动监听 onchange，更新 state；
* 非受控组件何时使用？

# 13、何时使用异步组件？

* 加载大组件；
* 路由懒加载；
* react.lazy
* suspense

# 14、多个组件公共逻辑如何抽离？

* HOC
* Render Props
* mixin 已废弃

# 15、redux 如何异步请求？

* 使用异步 action
  * 需要 rudux-thunk

# 16、react-router如何配置懒加载？

```jsX
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/about'))

const APP = () => {
  <Router>
    <Suspense fallback={ <div>loading...</div> }>
    	<Switch>
      	<Route exact path="/" component={ Home }></Route>
        <Route path="/about" component={ About }></Route>
      </Switch>
    </Suspense>
  </Router>
}
```

# 17、PureComponent 与 React.Component 区别？

* 都是类组件；
  * PureComponent：
    * 实现了浅层次数据比较的 shouldComponentUpdate；
    * 结合不可变值，优化了性能；
  * Component：
    * 即普通的类组件

* 函数组件中的 PureComponent 是 React.memo；

# 18、React 事件和 DOM 事件的区别？

* React 事件采用了合成事件（SyntheticEvent），是 react 用来模拟原生 DOM 事件所有能力的一个合成事件对象;
  1. **在 jsx 层**，事件并不是绑定在相应的 dom 上的，而是通过冒泡传到合成事件层；
     * 16 中事件被委托到 document ；
     * 17 中，为了渐进升级，并避免多 react 版本在 document 共存，发生事件系统的冲突，故事件被委托到 root ；
  2. **在合成事件层**，生成 SyntheticEvent 的实例（即 react event），并通过 dispatchEvent 派发给相应的事件处理函数；
  3. **在事件处理函数层**，react event 由对应的处理器执行；
* React 中可以用 e.nativeEvent 获取原生的 DOM 事件；
* 在组件卸载阶段，自动销毁绑定在 root 的 react event；

# 19、React 性能优化？

1. 合理使用 key ；
2. 自定义事件、DOM 事件及时销毁；
3. 合理使用异步加载大组件；
4. 减少函数 bind this 次数；
5. 合理使用 SCU 的 PurComponent & React.memo；
6. 合理使用 immutable.js；
7. webpack 层面的优化；
8. 前端通用性能优化，如图片懒加载；
9. 使用 ssr ；

# 20、React 和 Vue 的区别？

* 相同点
  1. 都支持组件化；
  2. 都是数据驱动视图；
  3. 都使用 vdom 操作 dom；
* 不同点
  1. 侧重点不同：
     * React 使用 jsx 侧重 js；
     * Vue 使用模版侧重 html；
  2. 编程方式不同：
     * React 函数式编程；
       * setState({})，函数中参数传入对象，
     * Vue 声明式编程；
       * 每一次操作都是一个声明，其它的底层都处理好；
  3. 手动挡 🆚 自动挡
     * React 只有核心实现，具体功能需要自己实现；
     * Vue 打包了很多现成的具体功能，直接使用即可（v-for/v-if/v-show）；

# 21、为什么会有 Hooks，它解决了什么问题？

1. 完善函数组件能力：
   * 函数组件更适合 react 组件，但函数组件能力比 class 组件差，Hooks 可以弥补这方面能力，故应运而生；

2. 组件逻辑复用，使用 hooks 表现更好；
3. class 组件逻辑复用表现的不易拆解、不易测试、逻辑混乱；
   * DidMount 和 DidUpdate 两个地方获取数据🤪；
   * DidMount 绑定事件，WillUnmount 解绑事件，两个地方处理事件🤪；
   * 使用了 hook 如上方两个例子中，相同的逻辑可以分割到各个 useEffect 中😌；

# 22、React Hooks 如何模拟组件生命周期？

1. 模拟 componentDidMount - useEffect 依赖 []；
2. 同时模拟 componentDidMount & componentDidUpdate - useEffect 无依赖，或者依赖 [a,b]；
3. useEffect 中返回一个函数 fn；
   * useEffect 若依赖 [] ，模拟 componentDidMount ；
     * 组件销毁时执行 fn ，等于 componentWillUnMount ；
   * useEffect 无依赖或依赖 [a,b] ，同时模拟 componentDidMount 或 componentDidUpdate ；
     * 组件更新时执行 fn，等于 componentDidUpdate；（即，下次执行useEffect之前，就会执行fn）
     * 组件销毁时执行 fn ，等于 componentWillUnMount ；

# 23、如何自定义 Hooks？

* 手写自定义 axios ；

# 24、React Hooks 如何性能优化？

* useMemo 缓存数据；
* useCallback 缓存函数；
* 相当于class组件的SCU和PureComponent

# 25、使用 React Hooks 有哪些坑？

1. useState 初始化值，只有第一次有效；
2. 依赖为 [] 时 useEffect 内部不能修改 state；
3. useEffect 可能出现死循环；

# 26、Hooks 相比 HOC 和 Render Prop 的组件逻辑复用有哪些优点？

* 组件逻辑复用完全符合 Hooks 原有规则，没有其他要求，易理解记忆；
* 变量作用域和明确；
* 不会产生组件嵌；

# 27、useMemo 和 useCallback 何时使用？

* useMemo 和 useCallback 的作用就在于，让你可以不用每次渲染都执行一遍，给你缓存起来；
* 例如，有一个函数中有网络请求，你不希望每次组件渲染都重新请求一次，那就用 useCallback 。

# 28、React 如何实现 Todolist？

1. 状态设计

   * 数据描述内容；
   * 数据要结构化，便于查；
   * 数据要可拓展，便于增删改；

   <img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1623108783130-assets/web-upload/b28e16b1-616d-4635-bd0d-a1657b658072.png" alt="" style="width: 994px; height: 286px;">

2. 组件设计

   * 功能上拆分层次；
   * 尽量让组件原子化；
   * 容器组件（只管数据的增删改逻辑）&UI组件（只显示视图）

   ```jsx
   <App>												{/* 负责管理数据 */}
   	<Input>										{/* 负责输入，将结果给父组件 */}
     <List>										{/* 负责输出列表，从父组件获取数据 */}
     	<ListItem></ListItem>		{/* 显示单条数据，删除、切换 completed 状态 */}
     </List>
   </App>
   ```

3. 见 src/component/TodoLIst