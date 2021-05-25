# 1、Redux 基本概念

## 1.1、Store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

Redux 提供`createStore`这个函数，用来生成 Store。

> ```javascript
> import { createStore } from 'redux';
> const store = createStore(fn);
> ```

上面代码中，`createStore`函数接受另一个函数作为参数，返回新生成的 Store 对象。

## 1.2、State

当前时刻的 State，可以通过`store.getState()`拿到。

> ```javascript
> import { createStore } from 'redux';
> const store = createStore(fn);
> 
> const state = store.getState();
> ```

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

## 1.3、Action

用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 是一个对象。其中的`type`属性是必须的，表示 Action 的名称。其他属性可以自由设置。

> ```javascript
> const action = {
>   type: 'ADD_TODO',
>   payload: 'Learn Redux'
> };
> ```

上面代码中，Action 的名称是`ADD_TODO`，它携带的信息是字符串`Learn Redux`。

可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

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

`store.dispatch()`是 View 发出 Action 的唯一方法。

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

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

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

上面代码中，`reducer`函数收到名为`ADD`的 Action 以后，就返回一个新的 State，作为加法的计算结果。

# 2、（🔔补充redux源码）手动实现 redux

> App.jsx

```jsx
import React, { Component } from 'react'
import store from './store'
import Child from './Child'

class App extends Component {
  handleClick = () => {
    store.dispatch({
      type: 'add'
    })
  }

  render() {
    let { count } = store.getState()
    return (
      <div>
        <h1>{count}</h1>
        <Child></Child>
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}

export default App;
```

> Child.jsx

```jsx
import React, { Component } from 'react';
import store from './store/index'

class Child extends Component {
  render() {
    return (
      <div>
        {store.getState().count}
      </div>
    );
  }
}

export default Child;
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
  let listeners = []

  // 获取state
  const getState = () => state

  // 定义一个dispatch方法，用来执行reducer
  const dispatch = (action) => {
    // 让reducer来更新state
    state = reducer(state, action)

    // publish消息，让视图更新
    listeners.forEach(listener => listener())
  }

  const subscribe = listener => listeners.push(listener)

  // 手动派发一次action
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
  
    default:
      return state
  }
}

export default reducer
```

# 3、单向数据流

![image-20190420013410981](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

- store通过reducer创建了初始状态

- view通过store.getState()获取到了store中保存的state挂载在了自己的状态上

- 用户产生了操作，调用了actions 的方法

- actions的方法被调用，创建了带有标示性信息的action

- actions将action通过调用store.dispatch方法发送到了reducer中

- reducer(归并 view 的操作)接收到action并根据标识信息判断之后返回了新的state

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

# 4、异步action

# 5、中间件

## 5.1、Redux-thunk

- **Redux-thunk简介**
  - 组件中使用dispatch派发action；
  - 使用thunk前，派发的 action 是一个扁平的对象；
  - 使用thunk后，派发的 action 是一个函数（中间件一旦挂上，dispatch就会被中间件拦截）；
    - 该函数，返回之前的扁平action对象，函数的参数为dispatch（该参数是原本往reducer中派发扁平对象的dispatch）；
    - 函数中返回的**扁平对象就是可以加入异步ajax请求得到的数据**；

* **Redux-thunk.js 源码（三层函数包裹）**

  ```jsx
  function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
  
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
    Products,
    reducer,
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

## 5.2、