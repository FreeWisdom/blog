# 1、Redux 基本概念

1. 从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。

> - 某个组件的状态，需要共享
> - 某个状态需要在任何地方都可以拿到
> - 一个组件需要改变全局状态
> - 一个组件需要改变另一个组件的状态

2. Redux 的设计思想很简单，就两句话。

> （1）Web 应用是一个状态机，视图与状态是一一对应的。
>
> （2）所有的状态，保存在一个对象里面。

# 2、手动实现 redux

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

![image-20190420013410981](/Users/Thales/Desktop/学习资料/felixlu-course-gp21/React/react-v13.0-markdown/images/redux.png)

- store通过reducer创建了初始状态

- view通过store.getState()获取到了store中保存的state挂载在了自己的状态上

- 用户产生了操作，调用了actions 的方法

- actions的方法被调用，创建了带有标示性信息的action

- actions将action通过调用store.dispatch方法发送到了reducer中

- reducer(归并 view 的操作)接收到action并根据标识信息判断之后返回了新的state

- store的state被reducer更改为新state的时候，store.subscribe方法里的回调函数会执行，此时就可以通知view去重新获取state

# 3、react-redux



# 4、异步action

# 5、中间件

