import React from 'react'

function NotFound(props){
    const message=props.message;
    return(
        <div style={{
            fontSize:'30px'
        }}>{message?message:"未找到页面"}</div>
    )
}
 
export default NotFound;