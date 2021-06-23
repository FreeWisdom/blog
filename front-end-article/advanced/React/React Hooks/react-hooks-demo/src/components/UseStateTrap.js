import React, { useState, useEffect } from 'react'

// 子组件
function Child({ userInfo }) {
    // render: 初始化 state
    // re-render: 只恢复初始化的 state 值，不会再重新设置新的值
    //            只能用 setName 修改
    const [ name, setName ] = useState(userInfo.name)
    
    // if(userInfo.name !== name) {
    //     setName(userInfo.name)
    // }

    // useEffect(() => {
    //     setName(userInfo.name)
    // }, [userInfo.name])

    console.log("prop:", userInfo.name)         // prop: thales
    console.log("state:", name)                 // state: zhz

    return <div>
        <p>Child, props name: {userInfo.name}</p>
        <p>Child, state name: {name}</p>
    </div>
}


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
