# 1、函数组件

* 纯函数，输入 props ，输出 JSX；
* 无实例，无生命周期，无 state ；
* 不能拓展其他方法；

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1621652133415-assets/web-upload/c13cc388-61e9-46ad-9f7f-b9409bf45e8a.png?x-oss-process=image%2Fresize%2Cw_800" alt="" style="width: 900px; height: 350px;">

# 2、非受控组件

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

# 3、Protals (传送门)

* 组件默认按照既定层次嵌套渲染；

* 而许多情况下，`position:fixed` 将会失效；

  * MDN："当元素祖先的 transform 属性非 none 时，定位容器由视口改为该祖先。"
  * 详见：https://www.imooc.com/article/67784

* 为了避免 `position:fixed` 失效；

  * 解决方案：需要让 `position:fixed`  的组件放到 DOM 树的最外层；

* 如何让组件脱离默认的嵌套渲染，而渲染到父组件以外呢？

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
  * class 组件：**ThemeButton.contextType** = ThemeContext;   const theme = **this.context**;
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
    // 指定 contextType 读取当前的 theme context。
    static contextType = ThemeContext           // 也可以用 ThemedButton.contextType = ThemeContext
    render() {
        const theme = this.context              // React 会往上找到最近的 theme Provider，然后使用它的值。
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

  * ♨️**必须配合不可变值一起使用**；

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

  3. 若开发者设计的 state 结构很深，而使用 shouldComponentUpdate 需要对深层结构的 state 进行对比，若使用递归深度比较也会影响一定的性能，当然也能用其他的方法，所以这个交给开发者自己估量利用 scu 进行优化，则体现了react 更强的拓展性；

## 6.2、PureComponent 和 React.memo

## 6.3、不可变值 immutable.js

# 7、高阶组件 HOC

# 8、Render Props



