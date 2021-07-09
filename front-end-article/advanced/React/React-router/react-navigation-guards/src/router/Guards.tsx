import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom"
import NotFound from "./NotFound"
import { RouteModel } from "./route.config"
import { permission } from "@/store/mobx"

export interface NavigationGuardsProps {
    routeConfig: RouteModel[],
    match?: any
    location?: any
}
class NavigationGuards extends Component<NavigationGuardsProps, any> {

    /**
     * 判断一个路径是否是另一个路径的子路径
     * @param pathConfig 配置文件中的路径的全路径
     * @param pathTarget 用户请求的路径
     */
    static switchRoute(pathConfig: string, pathTarget: string) {
        if (pathConfig === pathTarget) return true;

        const reg = new RegExp(`(^${pathConfig})(?=/)`)
        return reg.test(pathTarget)
    }

    static permissionAuthentication(authArray, myPermis) {
        return !!authArray.find((item) => item === myPermis)
    }

    /**
     * 将简化后的路径还原成带前缀的路径
     * @param parentPath 父组件路径
     * @param pathOfTargetRouteConfig 用户希望访问的组件的在路由配置信息中填写的路径
     */
    static combinationPath(parentPath, pathOfTargetRouteConfig): string {
        let combinedPath = !pathOfTargetRouteConfig.startsWith("/") ? `/${pathOfTargetRouteConfig}` : pathOfTargetRouteConfig
        combinedPath = parentPath ? `${parentPath}${combinedPath}` : combinedPath
        return combinedPath
    }

    /**
     * 在路由配置信息中查找用户希望访问的组件
     * @param parentPath 父路由的路径
     * @param targetPath 用户当前希望访问的路径
     * @param routeConfig 路由配置信息
     */
    static findTargetRoute(parentPath: string, targetPath: string, routeConfig: RouteModel[]): RouteModel | null {
        for (let i = 0; i < routeConfig.length; i++) {
            let item = routeConfig[i]
            let path = NavigationGuards.combinationPath(parentPath, item.path)
            if (targetPath && NavigationGuards.switchRoute(path, targetPath)) {
                return { ...item, path }
            }
        }
        return null
    }

    render() {
        const { location, routeConfig, match } = this.props
        //父路由的路径
        const parentPath = match && match.path
        //用户当前希望访问的路径
        const targetPath: string | undefined = location && location.pathname

        let targetRoute: RouteModel | null | "" | undefined =
            targetPath && NavigationGuards.findTargetRoute(parentPath, targetPath, routeConfig)

        const isLogin = permission.isLogin

        if (!targetRoute) {
            return <NotFound></NotFound>
        }

        if(targetRoute.redirect){
            return <Redirect to={targetRoute.redirect}></Redirect>
        }

        if (isLogin) {
            return <LoginHandler targetRoute={targetRoute}></LoginHandler>
        } else {
            return <NotLoginHandler targetRoute={targetRoute}></NotLoginHandler>
        }
    }
}

//已经登陆的状态下，处理路由
function LoginHandler(props: any): any {
    const { targetRoute } = props
    const { path, auth } = targetRoute

    console.log("已登录", path)

    if (path === '/login') {
        return <Redirect to="/console/main"></Redirect>
    } else if (NavigationGuards.permissionAuthentication(auth, permission.role)) {
        return <Route path={path} render={
            props => (
                <targetRoute.component {...props} childRoutes={targetRoute.childRoutes}></targetRoute.component>
            )
        }></Route>
    } else {
        return <NotFound message="您无权访问此页"></NotFound>
    }
}

//未登录状态下，处理路由
function NotLoginHandler(props): any {
    const { targetRoute } = props
    const { path, auth } = targetRoute

    console.log("未登录", path)

    if (auth && auth.length > 0) {
        return <Redirect to="/login"></Redirect>
    } else {
        return <Route path={path} render={
            props => (
                <targetRoute.component {...props} childRoutes={targetRoute.childRoutes}></targetRoute.component>
            )
        }></Route>
    }
}

export default NavigationGuards;