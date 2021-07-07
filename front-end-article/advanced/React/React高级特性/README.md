# 1、非受控组件(不被state控制)

* ref

  * defaultValue

    ```jsx
    import React from 'react'
    
    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                name: 'zhz'
            }
            this.nameInputRef = React.createRef() 		// 创建 ref
        }
        render() {
            // input defaultValue
            return <div>
                {/* 非受控组件：使用 defaultValue 而不是 value + 使用 ref */}
                <input defaultValue={this.state.name} ref={this.nameInputRef}/>
                {/* state 并不会随着改变 */}
                <span>state.name: {this.state.name}</span>
                <br/>
                <button onClick={this.alertName}>alert name</button>
            </div>
        }
        alertName = () => {
            const elem = this.nameInputRef.current 		// 通过 ref.current 获取 DOM 节点
            alert(elem.value) 												// 不是 this.state.name
        }
    }
    
    export default App
    ```

  * defaultChecked

    ```jsx
    import React from 'react'
    
    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                flag: true
            }
        }
        render() {
            // checkbox defaultChecked
            return <div>
                <input
                    type="checkbox"
                    defaultChecked={this.state.flag}
                />
            </div>
        }
    }
    
    export default App
    ```

  * 手动操作 DOM 元素 --- file上传

    ```jsx
    import React from 'react'
    
    class App extends React.Component {
        constructor(props) {
            super(props)
            this.fileInputRef = React.createRef()
        }
        render() {
            // file
            return <div>
                <input type="file" ref={this.fileInputRef}/>
                <button onClick={this.alertFile}>alert file</button>
            </div>
    
        }
        alertFile = () => {
            const elem = this.fileInputRef.current // 通过 ref 获取 DOM 节点
            console.log(elem.files)
            alert(elem.files[0].name)
        }
    }
    
    export default App
    ```

* 非受控组件使用场景：必须手动操作 DOM ，setState 实现不了；
  * 文件上传`<input type=file>`；
  * 富文本编辑器，需要传入 DOM 元素；

# 3、Portals (传送门)

* 使用场景
  * 一个典型的用法就是当父组件的dom元素有 `overflow:hidden`或者`z-inde`样式，而你又需要显示的子元素超出父元素的盒子。
    * 举例来说，如对话框，悬浮框，和小提示。
  * 另一个典型用法就是`position:fixed` 失效的情况下：
    * 组件默认按照既定层次嵌套渲染；
    * 而许多情况下，`position:fixed` 将会失效；
      * MDN："当元素祖先的 transform 属性非 none 时，定位容器由视口改为该祖先。"
      * 详见：https://www.imooc.com/article/67784
    * 为了避免 `position:fixed` 失效；
      * 解决方案：需要让 `position:fixed`  的组件放到 DOM 树的最外层；
    * 如何让组件脱离默认的嵌套渲染，而渲染到父组件以外呢？

* 基本使用：

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        // // 正常渲染
        // return <div className="modal">
        //     {this.props.children} {/* vue slot */}
        // </div>

        // 使用 Portals 渲染到 body 上。
        // fixed 元素要放在 body 上，有更好的浏览器兼容性。
        return ReactDOM.createPortal(
            <div className="modal">{this.props.children}</div>,
            document.body 			// 参数二，将参数一插在哪个目标 DOM 节点？
        )
    }
}

export default App
```

# 4、context

* 公共信息（语言/主题）如何传递给每隔组件？
* 用 props 太繁琐，用 redux 小题大做；
* 用 context 正好，常用API如下；
  * const ThemeContext = **React.createContext**('light');
  * <**ThemeContext.Provider** value={this.state.theme}><ThemeButton /><ThemeLink/></ThemContext.Provider>
  * class 组件：`static.contextType = ThemeContext;` && `const theme = this.context;` 
  * 函数组件：<**ThemeContext.Consumer**>{value => <p>{value}</p>>}</ThemeContext.Consumer>

```jsx
import React from 'react'

// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext('light')

// 底层组件 - 函数是组件
function ThemeLink (props) {
    // const theme = this.context 							// 会报错。函数式组件没有实例，即没有 this
    // 函数式组件可以使用 Consumer
    return <ThemeContext.Consumer>
        { value => <p>link's theme is {value}</p> }
    </ThemeContext.Consumer>
}

// 底层组件 - class 组件
class ThemedButton extends React.Component {
    static contextType = ThemeContext           // 用static来声明contextType，在运行时就可以获取到一个新的属性。
    render() {
        const theme = this.context              // 在运行时就可以获取到一个新的属性，然后使用它的值。
        return <div>
            <p>button's theme is {theme}</p>
        </div>
    }
}
// ThemedButton.contextType = ThemeContext      // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
            <ThemeLink />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
    }
    render() {
        return <ThemeContext.Provider value={this.state.theme}>
            <Toolbar />
            <hr/>
            <button onClick={this.changeTheme}>change theme</button>
        </ThemeContext.Provider>
    }
    changeTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light'
        })
    }
}

export default App
```

# 5、异步组件

* 遇到   组件较大时  /  路由懒加载，使用异步组件，实现loading......效果，减少页面阻塞时常；
  * 异步组件会被单独打包，异步加载；
* 常用API
  * React.lazy------------异步引入组件；
  * React.Suspense  fallback属性-----------处理异步加载等待效果；

```jsx
import React from 'react'

const ContextDemo = React.lazy(() => import('./ContextDemo'))

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <p>引入一个动态组件</p>
            <hr />
            <React.Suspense fallback={<div>Loading...</div>}>
                <ContextDemo/>
            </React.Suspense>
        </div>

        // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
        // 2. 看 network 的 js 加载
    }
}

export default App
```

# 6、react 性能优化

## 6.1、♨️♨️shouldComponentUpdate(SCU)

* 基本用法？

  * ♨️**必须配合不可变值一起使用**：
    * setState 时候不可以改变原来 state 中的值；
    * 若直接改变 state 中的值则 scu 对比时，会出现 this.state.count === nextState.count ；
    * 故而 scu 会失效；

  ```jsx
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
  ```

* shouldComponentUpdate 的默认返回值是什么？

  ```jsx
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  ```

  * ♨️在不操作 shouldComponentUpdate 时，**react  默认 shouldComponentUpdate 返回 true （即父组件有更新，子组件无条件更新）**；
  * 由于shouldComponentUpdate默认返回true，所以性能优化对于react更为重要，但不一定每次都用scu，要做到需要的时候才优化；

* react 作者为何不直接底层做好 scu 优化？

  1. 开发者项目大小参差不齐，小项目没必要，效果跟做不做差不多；

  2. ♨️**react 无法约束开发者 setState 时都遵循不可变值原则，若在底层做了scu 优化，遇到不遵守不可变值原则的开发者，会产生 bug** ；

     ```js
     onSubmitTitle = (title) => {
             // 正确的用法
             this.setState({
                 list: this.state.list.concat({
                     id: `id-${Date.now()}`,
                     title
                 })
             })
     
             // ⚠️若使用了 SCU ，使用这种不遵守不可变值的错误用法，则会产生 bug ，state 中的值并不会改变，因为 push 已经修改了原 state 中的 list ，在 scu 中判断的两个 list 相等，故 scu 返回 false ，不会进行正确渲染；
             // this.state.list.push({
             //     id: `id-${Date.now()}`,
             //     title
             // })
             // this.setState({
             //     list: this.state.list
             // })
         }
     ```

  3. 若开发者设计的 **state 结构很深**，而使用 shouldComponentUpdate 需要对深层结构的 state 进行对比，若使用递归深度比较也会影响一定的性能，当然也能用其他的方法，所以这个交给开发者自己估量利用 scu 进行优化，则体现了react 更强的拓展性；

## 6.2、PureComponent 和 React.memo

* PureComponent 类组件：`React.PureComponent` 与 [`React.Component`](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 很相似。两者的区别在于 [`React.Component`](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 并未实现 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)，而 `React.PureComponent` 中以浅层对比 prop 和 state 的方式来实现了该函数。

* React.memo 函数组件：默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

  ```jsx
  function MyComponent(props) {
    /* 使用 props 渲染 */
  }
  function areEqual(prevProps, nextProps) {
    /*
    如果把 nextProps 传入 render 方法的返回结果与
    将 prevProps 传入 render 方法的返回结果一致则返回 true，
    否则返回 false
    */
  }
  export default React.memo(MyComponent, areEqual);
  ```

## 6.3、不可变值 immutable.js

* 不可变数据 (Immutable Data )就是一旦创建，就不能再被更改的数据。**对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象**；
* Immutable 实现的原理是持久化数据结构（ Persistent Data Structure），也就是**使用旧数据创建新数据时，要保证旧数据同时可用且不变**；
* 同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 结构共享（Structural Sharing），即**如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享**。

![react](/Users/Thales/Desktop/学习资料/felixlu-course-gp21/React/react-v13.0-markdown/images/structure-sharing.png)

# 7、组件公共逻辑的抽离

## 7.1、（🔔使用场景）高阶组件 HOC

* 核心思想
  * Higher-Order Components就是一个函数，传给它一个组件，它返回一个新的组件。

* 基本用法：

  ```jsx
  const HOCFactory = (Component) => {
    class HOC extends React.Component {
      render() {
        return <Component {...this.props} />
      }
    }
    return HOC;
  }
  const EnhancedComponent1 = HOCFactory(WrappedComponent1);
  const EnhancedComponent1 = HOCFactory(WrappedComponent1);
  ```

## 7.2、（🔔使用场景）Render Props

* 核心思想
  * 通过一个 `this.props.render(this.state)` 函数，将 class 组件的 state 作为参数传给纯函数组件；

* 基本使用

```jsx
const App = () => (
	<Factory render={
      /* render 是一个函数组件 */
      (props) => <p>{props.a}{props.b}...</p>
  } />
)

class Factory extends React.Component {
  constructor() {
    this.state = {
      /* 多个组件的公共逻辑 */
    }
  }
  
  /* 修改state */
  
  render() {
    return <div>{this.props.render(this.state)}</div>
  }
}
```

## 7.3、HOC 🆚 Render Props

* HOC：模式简单
  * 增加组件层级，增加透传成本，透传过程中会有覆盖，维护成本高；
* Render Props：代码简洁
  * 学习成本高
  * 增加组件层级