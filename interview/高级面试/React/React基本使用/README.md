# 1、JSX 基本知识点

```js
import React from 'react'
import './style.css'
import List from '../List'

class JSXBaseDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '双越',
            imgUrl: 'https://img1.mukewang.com/5a9fc8070001a82402060220-140-140.jpg',
            flag: true
        }
    }
    render() {
        // // 获取变量 插值
        // const pElem = <p>{this.state.name}</p>
        // return pElem

        // // 表达式
        // const exprElem = <p>{this.state.flag ? 'yes' : 'no'}</p>
        // return exprElem

        // // 子元素
        // const imgElem = <div>
        //     <p>我的头像</p>
        //     <img src="xxxx.png"/>
        //     <img src={this.state.imgUrl}/>
        // </div>
        // return imgElem

        // // class
        // const classElem = <p className="title">设置 css class</p>
        // return classElem

        // // style
        // const styleData = { fontSize: '30px',  color: 'blue' }
        // const styleElem = <p style={styleData}>设置 style</p>
        // // 内联写法，注意 {{ 和 }}
        // // const styleElem = <p style={{ fontSize: '30px',  color: 'blue' }}>设置 style</p>
        // return styleElem

        // ⚠️原生 html
        const rawHtml = '<span>富文本内容<i>斜体</i><b>加粗</b></span>'
        const rawHtmlData = {
            __html: rawHtml // 注意，必须是这种格式
        }
        const rawHtmlElem = <div>
            <p dangerouslySetInnerHTML={rawHtmlData}></p>
            <p>{rawHtml}</p>
        </div>
        return rawHtmlElem

        // // 加载组件
        // const componentElem = <div>
        //     <p>JSX 中加载一个组件</p>
        //     <hr/>
        //     <List/>
        // </div>
        // return componentElem
    }
}

export default JSXBaseDemo
```

# 2、条件判断和渲染列表

* 条件判断
  * if else
  * 三元表达式
  * 逻辑运算符 && ||
* 渲染列表
  * map

# 3、事件

## 3.1、bind this

* this - 使用 bind

```jsx
import React from 'react'

class EventDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'zhangsan',
        }

        // 修改方法的 this 指向，若在此处修改 this 指向，则只需初始化时生成一次函数并绑定 this ；
        this.clickHandler1 = this.clickHandler1.bind(this)
    }
    render() {
        // 若在此处修改 this 指向，则每次点击都要重新生成函数并绑定 this ；
        return <p onClick={this.clickHandler1}>
            {this.state.name}
        </p>
    }
    clickHandler1() {
        // 若不 .bind(this)，则 this 默认是 undefined，报错；
        this.setState({
            name: 'lisi'
        })
    }
}

export default EventDemo
```

* this - 不用 bind ，使用静态方法

```jsx
import React from 'react'

class EventDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'zhangsan'
        }
    }
    render() {
        // this - 使用静态方法
        return <p onClick={this.clickHandler2}>
            clickHandler2 {this.state.name}
        </p>
    }
  
    // 静态方法，this 指向当前实例
    clickHandler2 = () => {
        this.setState({
            name: 'lisi'
        })
    }
}

export default EventDemo
```

## 3.2、♨️event 参数（17与16区别处）

* ❗️react 中 event 是由 SyntheticEvent 封装出来，用来模拟 DOM 事件所有能力；
* ❗️而 event.nativeEvent 才可以在 react 中得到原生事件对象 MouseEvent ；
* ❗️react 和 DOM & Vue 事件不一样，DOM & Vue 事件挂载到当前元素；
* ❗️React17 以前（不包括17），所有的事件，都被挂载到 document 上；
* ❗️React17 以后（包括17），所有的事件，都被挂载到 root 上；

> ⚠️上述为什么？♨️见原理部分。

```jsx
import React from 'react'

class EventDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        // event
        return <a href="https://imooc.com/" onClick={this.clickHandler3}>
            click me
        </a>
    }

    // 获取 event
    clickHandler3 = (event) => {
       event.preventDefault() // 阻止默认行为
       event.stopPropagation() // 阻止冒泡
       console.log('target', event.target) // 触发事件的元素，指向当前元素，即当前元素触发
       console.log('current target', event.currentTarget) // 绑定事件的元素，指向当前元素，假象！！！

       // ⚠️注意，event 其实是 React 封装的 SyntheticEvent 组合事件，可以看 __proto__.constructor 。
       console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
       console.log('event.__proto__.constructor', event.__proto__.constructor)

       // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
       console.log('nativeEvent', event.nativeEvent)
       console.log('nativeEvent target', event.nativeEvent.target)  // 触发事件的元素，指向当前元素，即当前元素触发
       console.log('nativeEvent current target', event.nativeEvent.currentTarget) // 绑定事件的元素，指向 document ！！！
    }
}

export default EventDemo
```

## 3.3、传递自定义参数 3 种方法

```jsx
import React from 'react'

class EventDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    id: 'id-1',
                    title: '标题1'
                },
                {
                    id: 'id-2',
                    title: '标题2'
                },
                {
                    id: 'id-3',
                    title: '标题3'
                }
            ]
        }
    }
    render() {
        // 传递参数 - 用 bind(this, a, b)
        return <ul>{this.state.list.map((item, index) => {
            // 方法①
            return <li key={item.id} onClick={this.clickHandler5(item.id, item.title)}>
              
            {/* 方法② */}
            {/* return <li key={item.id} onClick={(e) => this.clickHandler4(item.id, item.title, e)}> */}
              
            {/* 方法③ */}
            {/* return <li key={item.id} onClick={this.clickHandler4.bind(this, item.id, item.title)}> */}
                index {index}; title {item.title}
            </li>
        })}</ul>
    }
  
    // 传递参数
    clickHandler4(id, title, event) {
        console.log(id, title)
        console.log('event', event) // 最后追加一个参数，即可接收 event
    }
    clickHandler5(id, title) {
        return (e) => {
            console.log(id, title)
            console.log('event', e) 
        }
    }
}

export default EventDemo
```

# 4、表单

## 4.1、受控组件（后补充非受控组件）

* 受控组件，其中受控是组件中的值受到 state 控制；
* 非受控组件：组件中的值不受到 state 控制；
* 类似于 vue 中的 v-model，react 将双向绑定交给开发者自己写；

```jsx
import React from 'react'

class FormDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'zhz',
        }
    }
    render() {
        // 受控组件（非受控组件，后面再讲）
        return <div>
            <p>{this.state.name}</p>
            <label htmlFor="inputName">姓名：</label> {/* 由于 for 是 js 关键字，用 htmlFor 代替 for */}
            <input id="inputName" value={this.state.name} onChange={this.onInputChange}/>
        </div>
    }
  
    onInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
}

export default FormDemo
```

## 4.2、input/select/textarea 使用 value

```jsx
import React from 'react'

class FormDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'zhz',
            info: '个人信息',
            city: 'beijing'
        }
    }
    render() {
        // select/textarea - 使用 value
        return <div>
            <textarea value={this.state.info} onChange={this.onTextareaChange}/>
            <p>{this.state.info}</p>
            <select value={this.state.city} onChange={this.onSelectChange}>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="shenzhen">深圳</option>
            </select>
            <p>{this.state.city}</p>
        </div>
    }
 
    onTextareaChange = (e) => {
        this.setState({
            info: e.target.value
        })
    }
    onSelectChange = (e) => {
        this.setState({
            city: e.target.value
        })
    }
}

export default FormDemo
```

## 4.3、checkbox/radio 使用 checked

```jsx
import React from 'react'

class FormDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: true,
            gender: 'male'
        }
    }
    render() {
        // checkbox
        return <div>
            <input type="checkbox" checked={this.state.flag} onChange={this.onCheckboxChange}/>
            <p>{this.state.flag.toString()}</p>
            <div>
                male <input type="radio" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.onRadioChange}/>
                female <input type="radio" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.onRadioChange}/>
                <p>{this.state.gender}</p>
            </div>
        </div>
    }
    
    onCheckboxChange = () => {
        this.setState({
            flag: !this.state.flag
        })
    }
    onRadioChange = (e) => {
        this.setState({
            gender: e.target.value
        })
    }
}

export default FormDemo
```

# 5、♨️组件使用

* props 传递数据
  * 状态（数据）提升：数据在父组件，可以与所有子组件共享影响数据；

* props 传递函数
  * 父组件给子组件传递函数，函数在子组件中包裹子组件的参数，父组件函数声明处接收到子组件的参数，利用该参数对父组件的数据进行修改；

* props 类型检查
  * 检查父组件传递给子组件的 props 的类型；

> ⚠️：SCU 一定要每次都用吗？—— 需要的时候才优化

```jsx
import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }
    render() {
        return <div>
            <input value={this.state.title} onChange={this.onTitleChange}/>
            <button onClick={this.onSubmit}>提交</button>
        </div>
    }
    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    onSubmit = () => {
        const { submitTitle } = this.props
        submitTitle(this.state.title) // 'abc'

        this.setState({
            title: ''
        })
    }
}
// props 类型检查
Input.propTypes = {
    submitTitle: PropTypes.func.isRequired
}

class List extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { list } = this.props

        return <ul>{list.map((item, index) => {
            return <li key={item.id}>
                <span>{item.title}</span>
            </li>
        })}</ul>
    }
}
// props 类型检查
List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <p>
            {this.props.text}
            {this.props.length}
        </p>
    }
    componentDidUpdate() {
        console.log('footer did update')
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.text !== this.props.text
            || nextProps.length !== this.props.length) {
            return true // 可以渲染
        }
        return false // 不重复渲染
    }

    // React 默认：父组件有更新，子组件则无条件也更新！！！
    // 性能优化对于 React 更加重要！
    // SCU 一定要每次都用吗？—— 需要的时候才优化
}

class TodoListDemo extends React.Component {
    constructor(props) {
        super(props)
        // 状态（数据）提升
        this.state = {
            list: [
                {
                    id: 'id-1',
                    title: '标题1'
                },
                {
                    id: 'id-2',
                    title: '标题2'
                },
                {
                    id: 'id-3',
                    title: '标题3'
                }
            ],
            footerInfo: '底部文字'
        }
    }
    render() {
        return <div>
            <Input submitTitle={this.onSubmitTitle}/>
            <List list={this.state.list}/>
            <Footer text={this.state.footerInfo} length={this.state.list.length}/>
        </div>
    }
    onSubmitTitle = (title) => {
        this.setState({
            list: this.state.list.concat({
                id: `id-${Date.now()}`,
                title
            })
        })
    }
}

export default TodoListDemo
```

# 6、♨️♨️♨️setState

## 6.1、不可变值

* 不可变值是函数式编程的概念——纯函数；
* 不可变值是在对 state 中的值进行操作之后，不能影响原来的对应值；
* 不可变值 操作数组、对象的常用形式：
  * 数组是不能使用push、pop、splice等，这些方法会改变原数组，SCU中深入探析；
  * 对象也不能直接进行属性设置；
* 必须使用setState对目标进行修改；

## 6.2、setState 异/同步更新均有可能

1. setState 直接设置值是异步的:

   * 可以增加函数的第二个参数方式（回调函数）获取更新后的值，和 Vue 的 $nextTick 方法类似。

   ```js
   this.setState({
     count: this.state.count + 1
   }, () => {
     // 联想 Vue $nextTick - DOM
     console.log('count by callback', this.state.count) 			// 回调函数中可以拿到最新的 state
   })
   console.log('count', this.state.count) 										// 异步的，拿不到最新值
   ```

2. setTimeout 中的 setState 是同步的:

   ```js
   setTimeout(() => {
     this.setState({
       count: this.state.count + 1
     })
     console.log('count in setTimeout', this.state.count)		// 可以拿到最新的 state
   }, 0)
   ```

3. componentDidMount 中自己定义的 DOM 事件，setState 是同步的:

   ```js
   bodyClickHandler = () => {
     this.setState({
       count: this.state.count + 1
     })
     console.log('count in body event', this.state.count)		// 可以拿到最新的 state
   }
   componentDidMount() {
     // 自己定义的 DOM 事件，setState 是同步的
     document.body.addEventListener('click', this.bodyClickHandler)
   }
   ```

## 6.3、可能会被合并

1. 传入对象，会被合并：

   * （类似 Object.assign() ）。执行结果只一次 this.state.count + 1；

   ```js
   this.setState({
     count: this.state.count + 1				// 相当于 count: 0 + 1
   })
   this.setState({
     count: this.state.count + 1				// 相当于 count: 0 + 1
   })
   this.setState({
     count: this.state.count + 1				// 相当于 count: 0 + 1
   })
   																 		// 最终将 {count: 1},{count: 1},{count: 1} 合并为一个 {count: 1}
   ```

2. 传入函数，不被合并：

   * 会将传入的函数一个一个执行完，期间 state 会被更改，故执行结果是 +3，故而不会被合并；

   ```js
   this.setState((prevState, props) => {
     return {
       count: prevState.count + 1
     }
   })
   this.setState((prevState, props) => {
     return {
       count: prevState.count + 1
     }
   })
   this.setState((prevState, props) => {
     return {
       count: prevState.count + 1
     }
   })
   ```

# 7、组件生命周期

react16.4后使用了新的生命周期，使用getDerivedStateFromProps代替了旧的componentWillReceiveProps及componentWillMount。使用getSnapshotBeforeUpdate代替了旧的componentWillUpdate。

* 使用getDerivedStateFromProps(nextProps, prevState)的原因：
  * 旧的React中componentWillReceiveProps方法是用来判断前后两个 props 是否相同，如果不同，则将新的 props 更新到相应的 state 上去。在这个过程中我们实际上是可以访问到当前props的，这样我们可能会对this.props做一些奇奇怪怪的操作，很可能会破坏 state 数据的单一数据源，导致组件状态变得不可预测。
  * 而在 getDerivedStateFromProps 中禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去访问this.props并做其他一些让组件自身状态变得更加不可预测的事情。
* 使用getSnapshotBeforeUpdate(prevProps, prevState)的原因：
  * 在 React 开启异步渲染模式后，在执行函数时读到的 DOM 元素状态并不总是渲染时相同，这就导致在 componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。
  * 而getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与componentDidUpdate 中一致的。

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1621603992361-assets/web-upload/d86f49cc-3a44-4b55-8e55-77591cbc08f5.png?x-oss-process=image%2Fresize%2Cw_700" alt="react生命周期" style="width: 900px; height: 500px;">