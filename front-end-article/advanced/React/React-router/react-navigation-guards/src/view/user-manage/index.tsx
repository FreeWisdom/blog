import React, { Component } from 'react'
export interface UserManageProps {

}

export interface UserManageState {
}

class UserManage extends Component<UserManageProps, UserManageState> {
    constructor(props: UserManageProps) {
        super(props);
        this.state = { };
    }
    render() {
        return (
            <div>这是用户管理页面，此页面只有管理员可见</div>
        );
    }
}

export default UserManage;