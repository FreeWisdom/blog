# 1、Redux 基本概念

## 1.1、Store

* Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

* Redux 提供`createStore`这个函数，用来生成 Store。

> ```javascript
> import { createStore } from 'redux';
> const store = createStore(fn);
> ```

上面代码中，`createStore`函数接受另一个函数作为参数，返回新生成的 Store 对象。

## 1.2、State/store.getState()

当前时刻的 State，可以通过`store.getState()`拿到。

> ```javascript
> import { createStore } from 'redux';
> const store = createStore(fn);
> 
> const state = store.getState();
> ```

* Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

## 1.3、Action

* 可以这样理解，**Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。**

用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 是一个对象。其中的`type`属性是必须的，表示 Action 的名称。其他属性可以自由设置。

> ```javascript
> const action = {
>   type: 'ADD_TODO',
>   payload: 'Learn Redux'
> };
> ```

上面代码中，Action 的名称是`ADD_TODO`，它携带的信息是字符串`Learn Redux`。

## 1.4、Action Creator

* 定义一个函数来生成 Action，这个函数就叫 Action Creator，loadData 就是一个 Action Creator 。

* Action Creator 中可以处理副作用操作，例如计时器、Fetch/Ajax等等，

```js
const LOADDATA = 'LOADDATA'

export const loadData = (data) => {
  return {
    type: LOADDATA,
    data
  }
}

// actionCreator 配合中间件 thunk 处理副作用
export const loadDataSync = (url) => {
  return (dispatch) => {
    axios.get(url)
      .then(result => {
        dispatch(loadData(result.data.list))
      })
  }
}
```

## 1.5、store.dispatch()

* `store.dispatch()`是 View 发出 Action 的唯一方法。

> ```javascript
> import { createStore } from 'redux';
> const store = createStore(fn);
> 
> store.dispatch({
>   type: 'LOADDATA',
>   payload: 'Learn Redux'
> });
> ```

上面代码中，`store.dispatch`接受一个 Action 对象作为参数，将它发送出去。

结合 Action Creator，这段代码可以改写如下。

> ```javascript
> store.dispatch(loadData('Learn Redux'));
> ```

## 1.6、Reducer

* Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 **State 的计算过程**就叫做 Reducer。

* Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```js
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```

* 实际应用中，Reducer 函数不用像上面这样手动调用，`store.dispatch`方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入`createStore`方法。

```js
import { createStore } from 'redux';
const store = createStore(reducer);
```

* 上面代码中，`createStore`接受 Reducer 作为参数，生成一个新的 Store。以后**每当`store.dispatch`发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。**

## 1.7、纯函数

* **Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。**

* 纯函数是函数式编程的概念，必须遵守以下约束：
  * **不得改写入参**
  * 不能调用系统 I/O 的API
  * 不能调用`Date.now()`或者`Math.random()`等不纯的方法，因为每次会得到不一样的结果

> 由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。
>
> 但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法：

```js
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

> 最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。
>
> 这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

## 1.8、store.subscribe()

* State 一旦有变化，Store 就会调用监听函数 store.subscribe() ，并根据新的 store 中的数据，重新设置组件中用到的 state 。

  ```js
  listener = () => {
    let newState = store.getState()
    this.setState({
      count: newState
    })
  }
  
  componentDidMount() {
    store.subscribe(this.listener)
  }
  ```

* `store.subscribe`方法返回一个函数，调用这个函数就可以解除监听。

  ```js
  let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  );
  
  unsubscribe();
  ```

# 2、（🔔补充redux源码）手动实现 redux

 **见 my-redux文件夹**

> App.jsx

```jsx
import React, { Component } from 'react'
import store from './store'

class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  handleClickAdd = () => {
    store.dispatch({
      type: 'add'
    })
  }

  handleClickSubtract = () => {
    store.dispatch({
      type: 'subtract'
    })
  }

  listener = () => {
    let newState = store.getState()
    this.setState({
      count: newState.count
    })
  }

  componentDidMount() {
    store.subscribe(this.listener)
  }

  render() {
    let { count } = this.state
    return (
      <div>
        <button onClick={this.handleClickSubtract}>-</button>
        <h1>{count}</h1>
        <button onClick={this.handleClickAdd}>+</button>
      </div>
    );
  }
}

export default App;
```

> store/index.js

```jsx
import createStore from './createStore'
import reducer from './reducer'

let store = createStore(reducer)

export default store
```

> store/createStore.js

```jsx
const createStore = (reducer) => {
  let state = null
  
  // 定义 观察者模式 的♨️观察者♨️；
  let listeners = []

  // 获取state
  const getState = () => state

  // 定义一个dispatch方法，用来执行reducer
  const dispatch = (action) => {
    // 让reducer来更新state
    state = reducer(state, action)

    // 定义 发布订阅模式 的♨️发布♨️，让视图更新
    listeners.forEach(listener => listener())
  }

  // 定义 发布订阅模式 的♨️订阅♨️，将传入的函数push到观察者数组listeners中；
  const subscribe = listener => listeners.push(listener)

  // 第一次初始化时，手动派发一次action.type === undefined，页面渲染默认数据；
  dispatch({})

  // 接口暴露
  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore
```

> store/reducer.js

```jsx
const defaultState = {
  count: 0
}

const reducer = (state, action) => {
  if (!state) state = defaultState
  
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + 1
      }
    case 'subtract':
      return {
        ...state,
        count: state.count - 1
      }
  
    default:
      return state
  }
}

export default reducer
```

# 3、单向数据流

> **普通数据流**

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/jpeg/114317/1622035864314-assets/web-upload/c6f4e7f9-189d-4831-a0fc-bcb04d8bbc84.jpeg" alt="" style="width: 638px; height: 479px;">

> **含中间件数据流**

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622040360114-assets/web-upload/5a191447-f0f1-4199-9cd0-b86405d00e9f.png" alt="" style="width: 616px; height: 552px;">

- store通过reducer创建了初始状态
- view通过store.getState()获取到了store中保存的state挂载在了自己的状态上
- 用户产生了操作，调用了actions 的方法
- actions的方法被调用，创建了带有标示性信息的action
- actions将action通过调用store.dispatch方法发送到了reducer中
- reducer(归并 view 的操作)接收到action并根据标识信息判断之后返回了新的state
- State 一旦有变化，Store 就会调用监听函数 store.subscribe(callback) ，并根据新的 store 数据，重新设置组件中用到的 state 
- store的state被reducer更改为新state的时候，store.subscribe方法里的回调函数会执行，此时就可以通知view去重新获取state

# 3、react-redux

## 3.1、`<Provider store>`

* `<Provider store>` 使组件层级中的 `connect()` 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 `<Provider>` 中才能使用 `connect()` 方法。

## 3.2、`connect()`

* `connect`方法接受两个参数：
  * `mapStateToProps` 负责输入逻辑，即将 `state` 映射到 UI 组件的参数（`props`）；
  * `mapDispatchToProps` 负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

> **react-redux 示例**

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(
	state = { count: 0 },
  action
) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

# 4、异步Action

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622035864869-assets/web-upload/289160bc-7aa3-467e-81c6-b81769a4e263.png" alt="" style="width: 900px; height: 342px;">

* 同步Action：
  * Action 发出以后，Reducer 立即算出 State，这叫做同步；

* 异步Action：
  * Action 发出以后，过一段时间再执行 Reducer，这就是异步。

*  要使 Reducer 在异步操作结束后自动执行，这就要用到新的工具：中间件（middleware）。

# 5、中间件

> * **无中间件 🆚 有中间件**

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1622041571237-assets/web-upload/55e83873-3e6e-47e1-ba63-8a45387bc17b.png" alt="" style="width: 1000px; height: 350px;">

## 5.1、中间件用法

（1）`createStore`方法可以接受整个应用的初始状态作为参数，那样的话，`applyMiddleware`就是第三个参数了。

> ```javascript
> const initialState = Immutable.Map({})
> 
> const store = createStore(
>     reducer,
>     initialState,
>     applyMiddleware(thunk)
> )
> 
> export default store
> ```

（2）中间件的次序有讲究。

> ```javascript
> const store = createStore(
>   	reducer,
>   	applyMiddleware(thunk, promise, logger)
> );
> ```

上面代码中，`applyMiddleware`方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。比如，`logger`就一定要放在最后，否则输出结果会不正确。

## 5.2、Redux-thunk

- Redux-thunk简介
  - 拦截并包裹 dispatch ；
  - 组件中使用dispatch派发action；
  - 使用thunk前，派发的 action 是一个扁平的对象；
  - 使用thunk后，派发的 action 是一个函数（中间件一旦挂上，dispatch就会被中间件拦截）；
    - 该函数返回（之前的）扁平action对象，函数的参数为(dispatch, action, asyncState)（该参数是原本往reducer中派发扁平对象的dispatch）；
    - 函数中返回的**扁平对象就是可以加入异步ajax请求得到的数据**；

* **Redux-thunk 相较不使用中间件的 react-redux 有哪些优点？**

  * 从设计原则的角度，数据层应该和 view 层（即 页面或者 React 组件）是分离的，即便没有 view 层，数据层也应该保持独立；
  * 而如果用普通的 ajax ，就得放在页面或者 react 组件中触发请求，然后再把请求结果 dispatch 到 store 中；
  * 这样把数据层抽拆分了；
  
* **Redux-thunk.js 源码（三层函数包裹）**

  ```jsx
  function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
      // 如果是函数，则函数中返回 dispatch ，获取到数据后，重新发送 dispatch(action) ；
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
  		
      // 如果不是函数，则直接发送 dispatch(action) ；
      return next(action);
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;
  ```

* **Redux-thunk示例**

  > Store.js
  >
  > * 暴漏 store ，store 中使用 `applyMiddleware(thunk)` 引入中间件 thunk；

  ```jsx
  import { applyMiddleware, createStore } from 'redux'
  import thunk from 'redux-thunk'
  import Immutable from 'immutable'
  import { combineReducers } from 'redux-immutable'
  import { reducer as product } from '../products'
  import { reducer as cart } from '../carts'
  
  const reducer = combineReducers({
    product,
    cart
  })
  
  const initialState = Immutable.Map({})
  
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  )
  
  export default store
  ```

  > products/index.js
  >
  > * 负责暴漏 products 中的 UI 和 逻辑

  ```jsx
  import Products from './Products'
  import reducer from './reducer'
  import * as actionCreator from './actionCreator'
  
  export {
    Products,		// UI
    reducer,		// 逻辑
    actionCreator
  }
  ```

  > products/Products.jsx
  >
  > * componentDidMount中加载初始数据；
  > * dispatch 被 thunk 中间件拦截；
  > * **故第一次发送 dispatch 时**，扁平对象 action 会被函数包裹，在该函数中可以执行异步请求数据操作 loadDataSync ；

  ```jsx
  import React, { Component } from 'react'
  import { connect } from 'react-redux'
  import { loadDataSync, incrementInventory } from './actionCreator'
  import { actionCreator } from '../carts'
  
  @connect(
    state => {
      return {
        products: state.getIn(['product', 'all'])
      }
    },
    dispatch => ({
      loadData() {
        dispatch(loadDataSync('/api/all'))
      },
      addToCart(product) {
        return () => {
          dispatch(actionCreator.addProductToCart(product))
          dispatch(incrementInventory(product))
        }
      }
    })
  )
  class Products extends Component {
    render() {
      return (
        <ul>
          {
            this.props.products.map(p => {
              // let { id, name, price, inventory } = product
              return (
                <li key={p.get('id')}>
                  {p.get('name')} - {p.get('price')}
                  <button
                    onClick={this.props.addToCart(p)}
                    disabled={p.get('inventory') === 0}
                  >放入购物车</button>
                </li>
              )
            })
          }
        </ul>
      )
    }
  
    componentDidMount() {
      this.props.loadData()
    }
  }
  
  export default Products
  ```

  > products/actionCreator.js
  >
  > * 使用 axios 异步加载数据；
  > * loadDataSync 异步请求数据后，继续发送 dispatch ；
  > * **故第二次发送 dispatch 时**，action 即 `dispatch(loadData(result.data.list))` 为扁平对象，通过 loadData ，发送给reducer；

  ```jsx
  import { LOADDATA, DECINVENTORY } from './actionTypes'
  import axios from 'axios'
  
  export const loadData = (data) => {
    return {
      type: LOADDATA,
      data
    }
  }
  
  export const incrementInventory = (product) => {
    return {
      type: DECINVENTORY,
      product
    }
  }
  
  // actionCreator 配合中间件 thunk 处理副作用
  export const loadDataSync = (url) => {
    return (dispatch) => {
      axios.get(url)
        .then(result => {
          dispatch(loadData(result.data.list))
        })
    }
  }
  ```

  > products/reducer.js
  >
  > * reducer 中接收到上方代码发出的 action ，对数据进行相应修改；

  ```js
  import { LOADDATA } from './actionTypes'
  import { fromJS } from 'immutable'
  
  const defaultState = Map({
    all: List([])
  })
  
  const reducer = (state = defaultState, action) => {
    switch(action.type) {
      case LOADDATA:
        return state.set('all', fromJS(action.data))
      default:
        return state
    }
  }
  
  export default reducer
  ```

## 5.2、Redux-saga

# 6、dva基本用法

Model 对象的属性

- namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成

- state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出

- reducers: Action 处理器，处理同步动作，用来算出最新的 State

- effects：Action 处理器，处理异步动作，基于基于 Redux-saga 实现，使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试。

  ```js
  function *addAfter1Second(action, { put, call }) {
    yield call(delay, 1000);
    yield put({ type: 'add' });
  }
  ```

  - call：执行异步函数
  - put：发出一个 Action，类似于 dispatch

```js
{
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) { return state + 1 },
  },
  effects: {
    *addAfter1Second(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
  },
}
```

