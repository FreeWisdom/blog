# state

* vue：

  ```js
  Setup(props, context) {
    return {
      state: Thales
    }
  };
  ```

* react：

  ```js
  const [state, setState] = useState('Thales');
  ```

# 生命周期

* vue：

  ```js
  Setup() {
    // Setup 代替了 beforeCreate 到 created 之间的周期；
    const [
      onBeforeMount, onMounted, 
      onBeforeUpdate, onUpdated, 
      onBeforeUnMount, onUnMounted, 
      onRenderTracked, onRenderTriggered
    ] form vue;
    
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    // （不多）每次渲染后重新收集响应式依赖
    onRenderTracked(() => {
      console.log('onRenderTracked')
    })
    // （不多）触发页面重新渲染时自动执行
    onRenderTriggered(() => {
      console.log('onRenderTriggered')
    })
  }
  ```

* react：

  ```js
  useEffect(() => {
    console.log("componentDidMount & componentDidUpdate");
  });
  useEffect(() => {
    console.log("componentDidMount & componentDidUpdate");
  }, [state]);
  
  useEffect(() => {
    console.log("componentDidMount");
  }, []);
  
  useEffect(() => {
    // 若函数组件中，传入的参数改变，则 useEffect 表示 componentDidUpdate ;
    console.log("componentDidUpdate");
    
    // 若函数组件被父组件删除，则 useEffect 表示 componentWillUnmount ;
    console.log("componentWillUnmount");
  })
  ```

# ref

* vue

  ```js
  <script>
      // CompositionAPI 的语法下，获取真实的 DOM 元素节点
      const app = Vue.createApp({
        	// 此处 ref 为双向绑定
          setup() {
              const { ref, onMounted } = Vue;
              const hello = ref(null);
              onMounted(() => {
                  console.log(hello.value);
              })
              return { hello }
          },
        	// 此处 ref 为 dom 引用
          template: `
        <div>
          <div ref="hello">hello world</div>
        </div>
      `,
      });
  
      const vm = app.mount('#root');
  </script>
  ```

* react

  ```js
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

# Context 

* Vue:

  * `provide('name', readonly(name));` 
  * `const name = inject('name');` 

  ```html
  <script>
      // provide, inject
      const app = Vue.createApp({
          setup() {
              const { provide, ref, readonly } = Vue;
              const name = ref('dell');
              provide('name', readonly(name));
              provide('changeName', (value) => {
                  name.value = value;
              });
              return {}
          },
          template: `
        <div>
          <child />
        </div>
      `,
      });
  
      app.component('child', {
          setup() {
              const { inject } = Vue;
              const name = inject('name');
              const changeName = inject('changeName');
              const handleClick = () => {
                  changeName('lee');
              }
              return { name, handleClick }
          },
          template: '<div @click="handleClick">{{name}}</div>'
      })
  
      const vm = app.mount('#root');
  </script>
  ```

* React :

  * `React.createContext('初始值').provider`
  * `useContext(React.createContext('初始值'))`

  ```js
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