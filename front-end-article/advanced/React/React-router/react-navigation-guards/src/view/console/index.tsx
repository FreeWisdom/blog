import React from 'react'
import { RouteComponentProps,Switch,Link } from "react-router-dom"
import { Guards } from "@/router"
import { RouteModel } from "@/router/route.config"
export interface ConsoleProps extends RouteComponentProps, RouteModel {

}

export interface ConsoleState {

}

class Console extends React.Component<ConsoleProps, ConsoleState> {
    render() {
        console.log(this.props)
        const { childRoutes } = this.props
        return (
            <React.Fragment>
                <div>这是控制台页面</div>
                <Link to="/console/news">新闻</Link><br></br>
                <Link to="/console/main">主页</Link><br></br>
                <Link to="/console/userManage">用户管理</Link><br></br>
                <Switch>
                {childRoutes && <Guards {...this.props} routeConfig={childRoutes}></Guards>}
                </Switch>
            </React.Fragment>
        );
    }
}

export default Console;