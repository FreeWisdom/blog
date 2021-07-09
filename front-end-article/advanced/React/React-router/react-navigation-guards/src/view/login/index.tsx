//@ts-nocheck
import React, { Component } from 'react';
import LoginForm from "./LoginForm"
import { RouteComponentProps } from "react-router"
import "./index.scss"
export interface LoginProps extends RouteComponentProps {
    
}
class Login extends Component<LoginProps,any> {
    render() {
        console.log(this.props)
        return (
            <div className="login-outside-box">
                {/* <img className="bg" src="this.$cos.loginBackground" /> */}
                <div className="login-box">
                    <div className="title">后台管理</div>
                    <div className="login-panel">
                        <LoginForm historyPush={this.props.history.push}></LoginForm>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login