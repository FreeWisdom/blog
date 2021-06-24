# 关于 React-Hooks 

* React-Hooks 与 class 组件共存；
* 100% 向后兼容；
* 不会取代 class 组件，无计划移除 class 组件；

# 内容概览

* State Hook
* Effect Hook
* 其它 Hook
* 自定义 Hook
* 组件逻辑复用
* 规范和注意事项 

# 1、函数组件 🆚 class 组件

## 1.1、函数式组件

* 纯函数，输入 props ，输出 JSX，执行完即销毁，不对除传入 props 以外的 变量产生作用；
* 无组件实例；
* 无生命周期；
* 无 state / setState ，只能接收 props；
* 不能拓展其他方法，hooks 之后就可以；

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114117/1621652111415-assets/web-upload/c11cc188-61e9-46ad-9f7f-b9409bf45e8a.png?x-oss-process=image%2Fresize%2Cw_800" alt="" style="width: 900px; height: 150px;">

## 1.2、class 组件存在的问题

* 大型组件很难拆分/重构/测试，不够灵活；
* 相同业务逻辑，分散到各个方法中，容易混乱；
  * 如，在 componentDidMount 和 componentDidUpdate 两个生命周期中都需要请求 ajax；
  * 如，绑定事件和解绑事件分别分散在 componentDidMount 和 componentWillUnmount 中；
* 组件复用逻辑复杂
  * 如，mixins/HOC/Render Prop，写起来较复杂；

## 1.3、React 组件更易用函数表达（官网）

* 提倡函数式编程
  * 即，view = fn(props)
* 函数比 class 更加灵活易拆分、易测试
* 但函数组件为了弥补本身过于简单（🈚️实例➕🈚️state➕🈚️生命周期）的现实，需要 Hooks 对函数组件进行增强；
  * 增强之后实现了 class 组件的功能，又减少了 class 组件的烦恼；

# 2、useState

## 2.1、让函数组件实现 state 和 setState

* 函数组件是纯函数：
  * 输入 props 输出 JSX ➕执行完即销毁➕不对除传入 props 以外的变量产生作用➕组件中没有 state➕无法存储state ；
* 故需要 State Hook ，把 state 功能“钩”到纯函数中，示例如下：

```jsx
import React, { useState } from 'react'

function ClickCounter() {
  const [count, setCount] = useState(1)
  const [name, setName] = useState('zhz')
  
  function clickHandler() {
    setCount(count + 1)
    setName(name + '帅哥')
  }
  
  return <div>
  	<p>点击{ count }次</p>
    <button onClick={ clickHandler }>点击</button>
  </div>
}

export default ClickCounter
```

* useState 重点：
  1. ♨️ useState('初始值') 传入初始值，返回数组 [state, setState]；
     * 初始值可以是数字，字符串和引用类型
  2. ♨️ 通过 state 获取值；
  3. ♨️ 通过 setState(1) 修改值；

## 2.2、Hooks 命名规范

* 规定所有的 Hooks 都 use 开头，如 useXxx；
* 自定义 Hook 也要以 use 开头
* 非 Hooks 的地方，尽量不要使用 useXxx 写法

# 3、useEffect

## 3.1、让函数组件模拟生命周期

* 函数组件是纯函数：

  * 输入 props 输出 JSX ➕执行完即销毁➕不对除传入 props 以外的变量产生作用➕组件没有生命周期➕自身无法实现生命周期；

* 故需要 Effect Hook ，把生命周期功能“钩”到纯函数中，示例如下：

  1. ♨️ **同时模拟 componentDidMount & componentDidUpdate** - **useEffect 不传第二个参数**
     * 效果同 3；

  ```jsx
  import React, { useState, useEffect } from 'react'
  
  function ClickCounter() {
    const [count, setCount] = useState(1)
    const [name, setName] = useState('zhz')
    
    // ♨️ 同时模拟 class 组件的 DidMount & DidUpdate
    useEffect(() => {
      console.log("componentDidMount & componentDidUpdate，可以在此发送 ajax 请求")
    })
    
    function clickHandler() {
      setCount(count + 1)
      setName(name + '帅哥')
    }
    
    return <div>
    	<p>点击{ count }次</p>
      <button onClick={ clickHandler }>点击</button>
    </div>
  }
  
  export default ClickCounter
  ```

  2. ♨️ **模拟 componentDidMount** - **useEffect 第二个参数 []，无依赖**

  ```jsx
  import React, { useState, useEffect } from 'react'
  
  function ClickCounter() {
    const [count, setCount] = useState(1)
    const [name, setName] = useState('zhz')
    
    // ♨️ 模拟 class 组件的 DidMount
    useEffect(() => {
      console.log("componentDidMount")
    }, [])
    
    function clickHandler() {
      setCount(count + 1)
      setName(name + '帅哥')
    }
    
    return <div>
    	<p>点击{ count }次</p>
      <button onClick={ clickHandler }>点击</button>
    </div>
  }
  
  export default ClickCounter
  ```

  3. ♨️ **同时模拟 componentDidUpdate & componentDidUpdate** - **useEffect 传第二个参数 [a,b]**
     * 效果同 1；

  ```jsx
  import React, { useState, useEffect } from 'react'
  
  function ClickCounter() {
    const [count, setCount] = useState(1)
    const [name, setName] = useState('zhz')
    
    // ♨️ 同时模拟 class 组件的 DidMount & DidUpdate
    useEffect(() => {
      console.log("componentDidMount & componentDidUpdate，可以在此发送 ajax 请求")
    }, [count, name])
    
    function clickHandler() {
      setCount(count + 1)
      setName(name + '帅哥')
    }
    
    return <div>
    	<p>点击{ count }次</p>
      <button onClick={ clickHandler }>点击</button>
    </div>
  }
  
  export default ClickCounter
  ```

  4. ♨️ 模拟 compoentWillUnMount - **useEffect 中返回一个函数**

  ```jsx
  import React, { useState, useEffect } from 'react'
  
  function ClickCounter() {
    const [count, setCount] = useState(1)
    const [name, setName] = useState('zhz')
    
    useEffect(() => {
      let timer = setInterval(() => {
        console.log(Date.now())
      })
  
      // ♨️ 返回一个函数，模拟 WillUnMount
      return () => {
        window.clearInterval('timer')
      }
    }, [])
    
    function clickHandler() {
      setCount(count + 1)
      setName(name + '帅哥')
    }
    
    return <div>
    	<p>点击{ count }次</p>
      <button onClick={ clickHandler }>点击</button>
    </div>
  }
  
  export default ClickCounter
  ```

## 3.2、useEffect 让纯函数有了副作用

* 默认情况下，执行纯函数，输入参数，返回结果，无副作用；
* 所谓副作用，就是对函数之外造成影响，如设置全局定时任务；
* 而组件需要副作用，所以需要 useEffect “钩” 住所有副作用，方便对副作用进行统一控制 ；
* 抛开 useEffect “钩” 住所有副作用，其它内容仍是纯函数，方便管理；

## 3.3、用 useEffect 的 return 函数模拟 WillUnmount｜DidUpdate

* **所谓更新：useEffect 中 return 的函数，在下一次 useEffect 执行前执行，则模拟 DidUpdate ；**
  * 组件初始化时会首次调用 useEffect ，在 useEffect 返回的函数中，可以使用初始化时 state 内容；
  * 组件内的 state 发生更新前，会先执行首次调用 useEffect 时的返回函数（该函数中可以得到 state 更新前的值）；
  * 接下来才可再次调用 useEffect & return jsx ，完成组件更新；
* **所谓销毁：useEffect 中 return 的函数，在组件销毁前前执行，则模拟 WillUnmount ；**
  * 组件初始化时会首次调用 useEffect ，在 useEffect 返回的函数中，可以使用初始化时 state 内容；
  * 组件销毁前，会先执行首次调用 useEffect 时的返回函数（该函数中可以得到 state 更新前的值）；
  * 然后组件销毁；

> src/APP.js

```jsx
import React, { useState } from 'react';
import FriendStatus from './components/FriendStatus'

function App() {
  const [flag, setFlag] = useState(true)
  const [id, setId] = useState(1)

  return (
    <div>
      <p>React Hooks 示例</p>
      <div>
        <button onClick={() => setFlag(false)}>flag = false</button>
        <button onClick={() => setId(id + 1)}>id++</button>
      </div>
      <hr></hr>
      {flag && <FriendStatus friendId={id}/>}
    </div>
  );
}

export default App;
```

> src/components/FriendStatus.js

```jsx
import React, { useState, useEffect } from 'react'

function FriendStatus({ friendId }) {
    const [status, setStatus] = useState(false)

    // 同时模拟 DidMount 和 DidUpdate
    useEffect(() => {
        console.log(`开始监听 ${friendId} 在线状态`)
      	
      	// ♨️⚠️♨️ 当父组件传入参数 friendId 发生变化时， 组件更新， 此时 return 的函数模拟 DidUpdate
      	// ♨️⚠️♨️ 当父组件的 flag === false 时，       组件销毁， 此时 return 的函数模拟 WillUnmount
      	// ♨️♨️♨️ 此处 return 的函数，在下一次 useEffect 执行前执行，则模拟 DidUpdate ；
      	// ♨️♨️♨️ 此处 return 的函数，在组件销毁前前执行，则模拟 WillUnmount ；
      	return () => {
            console.log(`结束监听 ${friendId} 在线状态`)
        }
    })

    return <div>
        好友 {friendId} 在线状态：{status.toString()}
    </div>
}

export default FriendStatus

```

# 4、useRef

```jsx
import React, { useRef, useEffect } from 'react'

function UseRef() {
    const btnRef = useRef(null) 				// 初始值
    const numRef = useRef(999)					// 初始值

    useEffect(() => {
        console.log(btnRef.current)     // <button>click</button>
        console.log(numRef.current)     // 999
    }, [])

    return <div>
        <button ref={btnRef}>click</button>
    </div>
}

export default UseRef
```

# 5、useContext

```jsx
import React, { useContext } from 'react'

// 主题颜色
const themes = {
    light: {
        foreground: '#000',
        background: '#eee'
    },
    dark: {
        foreground: '#fff',
        background: '#222'
    }
}

// 创建 Context
const ThemeContext = React.createContext(themes.light) // 初始值

function ThemeButton() {
    const theme = useContext(ThemeContext)

    return <button style={{ background: theme.background, color: theme.foreground }}>
        hello world
    </button>
}

function Toolbar() {
    return <div>
        <ThemeButton></ThemeButton>
    </div>
}

function App() {
    return <ThemeContext.Provider value={themes.dark}>
        <Toolbar></Toolbar>
    </ThemeContext.Provider>
}

export default App
```

# 6、useReducer 能代替redux吗？

* userReducer 是 useState 的代替方案，用于 state 复杂变化；
* useReducer 是单个组件状态管理，组件通讯还需要 props；
* redux 是全局的状态管理，多组件共享数据；

>  备注：useReducer 借鉴 redux，应用场景不一样，不能取代 redux；

```jsx
import React, { useReducer } from 'react'

const initialState = { count: 0 }

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            return state
    }
}

function App() {
    // 很像 const [count, setCount] = useState(0)
    const [state, dispatch] = useReducer(reducer, initialState)

    return <div>
        count: {state.count}
        <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
    </div>
}

export default App
```

# 7、useMemo 如何做♨️性能优化？

* useMemo使用总结：
  * react默认会更新所有子组件；
    * class组件使用SCU和PureComponent做优化；
    * Hooks中使用useMemo做优化；
  * class组件和hooks优化原理相同，都是对props做浅层比较；
* memo 是缓存组件；
* useMemo 是缓存组件内的一个值；

```jsx
import React, { useState, memo, useMemo } from 'react'

// 子组件
// function Child({ userInfo }) {
//     console.log('Child render...', userInfo)

//     return <div>
//         <p>This is Child {userInfo.name} {userInfo.age}</p>
//     </div>
// }

// 类似 class PureComponent ，对 props 进行浅层比较
const Child = memo(({ userInfo }) => {
    console.log('Child render...', userInfo)

    return <div>
        <p>This is Child {userInfo.name} {userInfo.age}</p>
    </div>
})

// 父组件
function App() {
    console.log('Parent render...')

    const [count, setCount] = useState(0)
    const [name, setName] = useState('zhz')

    // const userInfo = { name, age: 20 }
    // 用 useMemo 缓存数据，有依赖
    const userInfo = useMemo(() => {
        return { name, age: 21 }
    }, [name])

    return <div>
        <p>
            count is {count}
            <button onClick={() => setCount(count + 1)}>click</button>
        </p>
        <Child userInfo={userInfo}></Child>
    </div>
}

export default App
```

# 8、useCallback 如何做♨️性能优化？

* react hooks常见优化策略：
  * useMemo 缓存数据；
  * useCallback 缓存函数；
* ♨️若子组件调用了存在父组件的 callback ，而父组件不用 useCallback 包裹 callback 进行函数缓存，子组件 memo 缓存就会失效；

```jsx
import React, { useState, memo, useMemo, useCallback } from 'react'

// 子组件，memo 相当于 PureComponent
const Child = memo(({ userInfo, onChange }) => {
    console.log('Child render...', userInfo)

    return <div>
        <p>This is Child {userInfo.name} {userInfo.age}</p>
        <input onChange={onChange}></input>
    </div>
})

// 父组件
function App() {
    console.log('Parent render...')

    const [count, setCount] = useState(0)
    const [name, setName] = useState('zhz')

    // 用 useMemo 缓存数据
    const userInfo = useMemo(() => {
        return { name, age: 21 }
    }, [name])

    // ♨️⚠️♨️ 若子组件调用了存在父组件的 callback ，而父组件不用 useCallback 包裹进行函数缓存，子组件 memo 缓存就会失效；
    // function onChange(e) {
    //     console.log(e.target.value)
    // }
    
    // 用 useCallback 缓存函数
    const onChange = useCallback(e => {
        console.log(e.target.value)
    }, [])

    return <div>
        <p>
            count is {count}
            <button onClick={() => setCount(count + 1)}>click</button>
        </p>
        <Child userInfo={userInfo} onChange={onChange}></Child>
    </div>
}

export default App
```

# 9、自定义 Hook 实现 useAxios

* 自定义 hook
  * 本质是一个以 use 开头的函数；
  * 内部可以正常使用 useState、useEffect 或其它 Hooks；
  * 可以自定义返回结果，不一定限制以 [] 的格式；

> src/components/CustomHookUsage.js

```js
import React from 'react'
import useAxios from '../customHooks/useAxios'
// import useMousePosition from '../customHooks/useMousePosition'

function App() {
    const url = 'http://localhost:3000/'
    // 数组解构
    const [loading, data, error] = useAxios(url)

    if (loading) return <div>loading...</div>

    return error
        ? <div>{JSON.stringify(error)}</div>
        : <div>{JSON.stringify(data)}</div>
}

export default App
```

> src/customHooks/useAxios.js

```js
import { useState, useEffect } from 'react'
import axios from 'axios'

// 封装 axios 发送网络请求的自定义 Hook
function useAxios(url) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        // 利用 axios 发送网络请求
        setLoading(true)
        axios.get(url) // 发送一个 get 请求
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [url])

    return [loading, data, error]
}

export default useAxios

// 第三方 Hook
// https://nikgraf.github.io/react-hooks/
// https://github.com/umijs/hooks
```

# 10、Hooks 使用规范 

1. 命名规范 useXXX；
2. 只能用于React函数组件和自定义Hook中，其他地方不可以；
   * eslint插件 eslint-plugin-react-hooks 可以将检查该规则
3. 只能用于顶层代码，不能在循环、判断中使用Hooks；
   * eslint插件 eslint-plugin-react-hooks 可以将检查该规则

# 11、为何Hooks要依赖于调用顺序？

* Hooks 严重依赖于调用顺序；
* 无论是 render 还是 re-render，Hooks 调用顺序必须一致；
* 如果 Hooks 出现在循环、判断里，则无法保证顺序一致；
* 有可能会出现变量读取 hook 的返回值时，会错乱🤪；

# 12、class组件逻辑复用存在问题？

* Mixins
  * 变量作用域来源不清；
  * 属性重名；
  * Mixins 引入过多导致顺序冲突；
* 高阶组件 HOC
  * 组件层级嵌套过多，不易渲染，不易调试；
  * HOC会劫持props，必须严格规范，容易出现疏漏；
* render props缺点：
  * 学习成本高，不易理解；
  * 只能传递纯函数，而默认情况下纯函数功能有限（复杂功能需要借助hooks实现）；

# 13、Hooks 做组件逻辑复用好处？

* 组件逻辑复用完全符合Hooks原有规则，没有其他要求，易理解记忆；
* 变量作用域和明确；
* 不会产生组件嵌；

> src/customHooks/useMousePosition.js

```js
import { useState, useEffect } from 'react'

function useMousePosition() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    useEffect(() => {
        function mouseMoveHandler(event) {
            setX(event.clientX)
            setY(event.clientY)
        }

        // 绑定事件
        document.body.addEventListener('mousemove', mouseMoveHandler)

        // 解绑事件
        return () => document.body.removeEventListener('mousemove', mouseMoveHandler)
    }, [])

    return [x, y]
}

export default useMousePosition
```

> src/components/CustomHookUsage.js

```jsx
import React from 'react'
import useMousePosition from '../customHooks/useMousePosition'

function App() {
    const [x, y] = useMousePosition()
    return <div style={{ height: '500px', backgroundColor: '#ccc' }}>
        <p>鼠标位置 {x} {y}</p>
    </div>
}

export default App
```

# 14、React Hooks 有哪些坑？

## 14.1、useState 初始化值，只有第一次有效

* render: 
  * 初始化 state；
* re-render: 
  * 只恢复初始化的 state 值，不会再重新设置新的值；
  * 【解决方案】若想修改子组件的 name ，只能用子组件的 setName 修改；
    * 可以在 prop 改变的判断中 setName；
    * 可以在用 useeffect 模拟 DidUpadate 的生命周期中 setName；

```jsx
import React, { useState } from 'react'

// 子组件
function Child({ userInfo }) {
    const [ name, setName ] = useState(userInfo.name)

    // 点击父组件的 button ，prop 由 zhz 变为 thales
    console.log("prop:", userInfo.name)         				// prop: thales
    console.log("state:", name)                 				// state: zhz
 
  	// 在 prop 改变的判断中 setName
  	// if(userInfo.name !== name) {
    //     setName(userInfo.name)
    // }
  
		// 在用 useeffect 模拟 DidUpadate 的生命周期中 setName
    // useEffect(() => {
    //     setName(userInfo.name)
    // }, [userInfo.name])
  
    return <div>
        <p>Child, props name: {userInfo.name}</p>
        <p>Child, state name: {name}</p>
    </div>
}

// 父组件
function App() {
    const [name, setName] = useState('zhz')
    const userInfo = { name }

    return <div>
        <div>
            Parent &nbsp;
            <button onClick={() => setName('thales')}>setName</button>
        </div>
        <Child userInfo={userInfo}/>
    </div>
}

export default App
```

## 14.2、useEffect 内部不能修改 state

* 依赖为 [] 时，模拟 DidMount 生命周期，re-render 不会重新执行，故 effect 函数也不会重新执行；

* 【解决方案】没有依赖或依赖为 count 时，模拟 DidUpdate 生命周期，re-render 会重新执行，故 effect 函数也会重新执行；
* 【解决方案】在 useEffect 外，利用 useRef 创建变量（保持除 hook 外的纯函数），可在 useEffect 内使该变量自身 ++ ；

```js
import React, { useState, useRef, useEffect } from 'react'

function UseEffectChangeState() {
    const [count, setCount] = useState(0)
    // const countRef = useRef(count);

    // 依赖为 [] ，模拟 DidMount
    useEffect(() => {
        console.log('useEffect...', count)

        // 定时任务
        const timer = setInterval(() => {
            // console.log('setInterval...', countRef.current)
          	// setCount(++countRef.current)
            setCount(count + 1)
        }, 1000)

        // 清除定时任务
        return () => clearInterval(timer)
    }, [])

    return <div>count: {count}</div>
}

export default UseEffectChangeState
```

## 14.3、useEffect 可能出现死循环

* useEffect 中对依赖 [x, y] 判断用方法 Object.is(a,b) 去判断；

* 如果是 Object.is({}, {})/Object.is([], [])（即 x,y 为引用类型对象或数组）；

* 则 Object.is({}, {})/Object.is([], []) 结果为false；

* 即，useEffect 中所依赖的值不相等，会一遍遍触发更新，导致出现死循环；

  * 如：封装 axios 发送网络请求的自定义 Hook 时，useEffect 传入 config 对象；

    * 此时，config 对象为引用类型，引用类型的地址不同，会一遍遍触发更新，导致出现死循环；
    * 【解决方案】将 config 中具体的哪一项，写到依赖数组里；

    ```js
    import { useState, useEffect } from 'react'
    import axios from 'axios'
    
    function useAxios(url, config={ method: 'get', token: 'token' }) {
        const [loading, setLoading] = useState(false)
        const [data, setData] = useState()
        const [error, setError] = useState()
    
        useEffect(() => {
            setLoading(true)
            axios(url, config)
                .then(res => setData(res))
                .catch(err => setError(err))
                .finally(() => setLoading(false))
        }, [url, config])
    
        return [loading, data, error]
    }
    
    export default useAxios
    ```

    