import React, { useRef, useEffect } from 'react'

function UseRef() {
    const btnRef = useRef(null) // 初始值

    const numRef = useRef(999)

    useEffect(() => {
        console.log(btnRef.current)     // <button>click</button>
        console.log(numRef.current)     // 999
    }, [])

    return <div>
        <button ref={btnRef}>click</button>
    </div>
}

export default UseRef
