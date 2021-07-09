import React, { Component } from 'react';
import { Form, Button, Input, Icon } from "antd"
import { FormComponentProps } from 'antd/lib/form';
import {permission} from "@/store/mobx"

interface LoginFormState  {
    verificationCodeBase64: string
}

interface LoginFormProps extends FormComponentProps{
    historyPush:any
}


class LoginForm extends Component<LoginFormProps, LoginFormState> {
    componentDidMount() {
        this.refreshVerificationCode()
    }
    state: LoginFormState = {
        verificationCodeBase64: ""
    }
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("提交登陆请求")
                permission.login(values)
                this.props.historyPush("/console/news")
            }
        })
    }
    refreshVerificationCode = () => {
        //TODO 加载二维码
        console.log("加载二维码")
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { verificationCodeBase64 } = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator("userName", {
                            rules: [
                                { required: true, message: "用户名必填" },
                            ]
                        })(
                            <Input
                                placeholder="用户名"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            ></Input>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator("userPassword", {
                            rules: [
                                { required: true, message: "密码必填" }
                            ]
                        })(
                            <Input
                                placeholder="密码"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            ></Input>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator("verificationCode", {
                            rules: [
                                { required: true, message: "验证码必填" }
                            ]
                        })(
                            <Input
                                placeholder="验证码"
                            ></Input>
                        )
                    }
                    <img onClick={this.refreshVerificationCode} src={verificationCodeBase64} alt="验证码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">登陆</Button>
                </Form.Item>
            </Form>
        );
    }
}
export default Form.create({ name: 'LoginForm' })(LoginForm);
