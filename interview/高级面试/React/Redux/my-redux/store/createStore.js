const createStore = (reducer) => {
  let state = null
  
  // ♨️定义 观察者模式 的观察者；
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