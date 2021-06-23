import React, { useState, useRef, useEffect } from 'react'

function UseEffectChangeState() {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)
    
    // 依赖为 [] ，模拟 DidMount
    useEffect(() => {
        console.log('useEffect...', count)

        // 定时任务
        const timer = setInterval(() => {
            console.log('setInterval...', countRef.current)
            // setCount(count + 1)
            setCount(++countRef.current)
        }, 1000)

        // 清除定时任务
        return () => clearTimeout(timer)
    }, [])

    // 依赖为 [] 时，模拟 DidMount 生命周期，re-render 不会重新执行，故 effect 函数也不会重新执行；
    // 没有依赖时，模拟 DidUpdate 生命周期，re-render 会重新执行，故 effect 函数也会重新执行

    return <div>count: {count}</div>
}

export default UseEffectChangeState
