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