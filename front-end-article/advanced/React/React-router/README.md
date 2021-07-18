# 1、路由模式

## 1.1、hash 模式

* ToB 一般选择 hash 模式

## 1.2、H5 history 模式

* 需 server 端支持，无特殊需求选择 hash 模式
* ToC 一般选择 H5 history 模式

# 2、路由配置

## 2.1、动态路由

## 2.2、跳转路由

## 2.3、♨️路由懒加载 👀 webpack面试 👀 结合 HOC 实现路由懒加载 

# 3、♨️路由守卫的最佳实践

> https://blog.csdn.net/ajh99990/article/details/104324739

## 3.1、基本配置

* 实现：

  1. 根据路由配置动态生成嵌套的路由

  2. 对路由增加访问权限，个别页面只能允许已经登陆的用户访问。权限不足时跳转到登录页面。

  3. 实现404页面

* 当我们使用 react-router-dom 提供的 Switch 组件将自定义组件包裹起来之后，自定义组件的 props 中会被注入一些与路径有关的信息，这部分数据的原型如下：

  ```typescript
  interface RouteProps {
      location?: H.Location;
      component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
      render?: (props: RouteComponentProps<any>) => React.ReactNode;
      children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
      path?: string | string[];
      exact?: boolean;
      sensitive?: boolean;
      strict?: boolean;
  }
  ```

* props.location.pathname 表示当前用户访问的目标路径：
  * 在路由守卫中会根据这个和传入的配置文件对比，来判断应该渲染哪一个组件。

* 完成路由配置；

  ```typescript
  // src/router/route.config.ts
  import Main from "@/view/main"
  import Login from "@/view/login"
  import News from "@/view/news"
  import Console from "@/view/console"
  import UserManage from "@/view/user-manage"
  
  export interface RouteModel {
      path: string,
      component: object,
      auth: boolean,
      childRoutes?: RouteModel[]
  }
  
  /* 
      这里只需配置好这些路由的相互关系即可
      比如login和console是同级（兄弟），而news是console的子路由（父子）
  */
  export const routeConfig: RouteModel[] = [
      {
          path: "/login",
          component: Login,
          auth: false  // false表示不需要登录即可访问
      },
      {
          path: "/console",
          component: Console,
          auth: true,
          childRoutes: [
              {
                  path: "/console/main",
                  component: Main,
                  auth: true
              },
              {
                  path: "/console/news",
                  component: News,
                  auth: true
              },
              {
                  path: "/console/userManage",
                  component: UserManage,
                  auth: true
              }
          ]
      }
  ]
  ```

* 路由守卫组件

  * 判断**用户请求的路径**是否是**配置文件中的路径**的子路径：	

    * 若不是则返回 404 页面；
    * 若是则得到配置文件中的子路径；
      * 判段是否登陆
        * 登陆状态：
          * 若该路径是登陆页面，则跳转到主页面；
          * 若该路径不是登陆页面，则展示该路径页面，及其组件；
        * 未登陆状态：
          * 若有 auth（true登陆才能访问）权限，则跳转到登陆页面；
          * 若无 auth （false不登陆也能访问）权限，则加载此路径（证明此路径也是登陆页）页面，及其组件；

    ```tsx
    // src/router/Guards.tsx
    import React, { Component } from 'react';
    import { RouteProps } from "react-router"
    import { Route, Redirect } from "react-router-dom"
    import NotFound from "./NotFound"
    import { RouteModel } from "./route.config"
    import { permission } from "@/store/mobx"
    
    export interface NavigationGuardsProps extends RouteProps {
        routeConfig: RouteModel[]
    }
    class NavigationGuards extends Component<NavigationGuardsProps, any> {
    
        /**
         * 判断  用户请求的路径  是否是  配置文件中的路径  的子路径
         * @param pathConfig 配置文件中的路径
         * @param pathTarget 用户请求的路径
         */
        static switchRoute(pathConfig:string,pathTarget:string){
            if(pathConfig===pathTarget) return true;
            const reg=new RegExp(`(^${pathConfig})(?=/)`)
            return reg.test(pathTarget)
        }
    
        render() {
            const { location, routeConfig } = this.props
            const targetPath: string | undefined = location && location.pathname
            const targetRoute: RouteModel | undefined = routeConfig.find((item) =>
                targetPath&&NavigationGuards.switchRoute(item.path,targetPath))
            
            const isLogin = permission.isLogin
            
            // 用户请求的路径 是 配置文件中的路径 的子路径，则得到配置文件中的子路径
            if (!targetRoute) {
                return <NotFound></NotFound>
            }
    
            if (isLogin) {
                return <LoginHandler targetRoute={targetRoute}></LoginHandler>
            } else {
                return <NotLoginHandler targetRoute={targetRoute}></NotLoginHandler>
            }
        }
    }
    
    //已经登陆的状态下，处理路由
    function LoginHandler(props): any {
        const { targetRoute } = props
        const { path } = targetRoute
        
        // 若该路径是登陆页面，则跳转到主页面；
        if (path === '/login') {
            return <Redirect to="/console/main"></Redirect>
            
        // 若该路径不是登陆页面，则展示该路径页面，及其组件；
        } else {
            return <Route path={targetRoute.path} render={
                props => (
                    <targetRoute.component {...props} childRoutes={targetRoute.childRoutes}>
                    </targetRoute.component>
                )
            }></Route>
        }
    }
    
    //未登录状态下，处理路由
    function NotLoginHandler(props): any {
        const { targetRoute } = props
        const { auth } = targetRoute
        
        // 若有 auth（true登陆才能访问）权限，则跳转到登陆页面；
        if (auth) {
            return <Redirect to="/login"></Redirect>
            
        // 若无 auth （false不登陆也能访问）权限，则加载此路径（证明此路径也是登陆页）页面，及其组件；
        } else {
            return <Route path={targetRoute.path} render={
                props => (
                    <targetRoute.component {...props} childRoutes={targetRoute.childRoutes}>
                  	</targetRoute.component>
                )
            }></Route>
        }
    }
    
    export default NavigationGuards;
    ```

  * 在 app 入口页，将配置传到路由守卫组件中：

    ```jsx
    const App = () => {
      return (
        <div className="App">
          <HashRouter>
            <Switch>
              <Guards routeConfig={routeConfig}></Guards>
            </Switch>
          </HashRouter>
        </div>
      );
    }
    
    export default App;
    ```

## 3.2、角色划分

* 首先，编写角色类型，我这里使用的是枚举类型，你也可以使用对象，这部分源码如下：

  ```typescript
  // src/utils/index.tsx
  export enum permissionTypes{
      NONE="none", //用作初始值
      USER="user",
      MANAGER="manager"
  }
  ```

* 将角色配进 auth 中：

  ```js
  // src/router/route.config.ts
  import Main from "@/view/main"
  import Login from "@/view/login"
  import News from "@/view/news"
  import Console from "@/view/console"
  import UserManage from "@/view/user-manage"
  import {permissionTypes} from "@/utils"
  export interface RouteModel {
      path: string,
      component: object,
      auth?: string[],
      childRoutes?: RouteModel[]
  }
  
  /* 
      这里只需配置好这些路由的相互关系即可
      比如login和console是同级（兄弟），而news是console的子路由（父子）
  */
  const {USER,MANAGER} =permissionTypes
  export const routeConfig: RouteModel[] = [
      {
          path: "/login",
          component: Login,
      },
      {
          path: "/console",
          component: Console,
          auth:[USER,MANAGER],
          childRoutes: [
              {
                  path: "/console/main",
                  component: Main,
                  auth: [USER,MANAGER]
              },
              {
                  path: "/console/news",
                  component: News,
                  auth: [USER,MANAGER]
              },
              {
                  path: "/console/userManage",
                  component: UserManage,
                  auth: [MANAGER]
              }
          ]
      }
  ]
  ```

* 修改路由守卫的代码，让它可以对角色做出反应。

  ```tsx
  // src/router/Guards.tsx
  import React, { Component } from 'react';
  import { RouteProps } from "react-router"
  import { Route, Redirect } from "react-router-dom"
  import NotFound from "./NotFound"
  import { RouteModel } from "./route.config"
  import { permission } from "@/store/mobx"
  
  export interface NavigationGuardsProps extends RouteProps {
      routeConfig: RouteModel[]
  }
  class NavigationGuards extends Component<NavigationGuardsProps, any> {
  
      /**
       * 判断一个路径是否是另一个路径的子路径
       * @param pathConfig 配置文件中的路径
       * @param pathTarget 用户请求的路径
       */
      static switchRoute(pathConfig:string,pathTarget:string){
          
          if(pathConfig===pathTarget) return true;
  
          const reg=new RegExp(`(^${pathConfig})(?=/)`)
          return reg.test(pathTarget)
      }
  
  		// ➕权限认证，配置🎭🆚当前🎭
      static permissionAuthentication(authArray, myPermis){
          return !!authArray.find((item) => item === myPermis)
      }
  
      render() {
          const { location, routeConfig } = this.props
          const targetPath: string | undefined = location && location.pathname
          const targetRoute: RouteModel | undefined = routeConfig.find((item) =>
              targetPath&&NavigationGuards.switchRoute(item.path,targetPath))
          
          const isLogin = permission.isLogin
          if (!targetRoute) {
              return <NotFound></NotFound>
          }
  
          if (isLogin) {
              return <LoginHandler targetRoute={targetRoute}></LoginHandler>
          } else {
              return <NotLoginHandler targetRoute={targetRoute}></NotLoginHandler>
          }
      }
  }
  
  //已经登陆的状态下，处理路由
  function LoginHandler(props): any {
      const { targetRoute } = props
      const { path, auth } = targetRoute
      
      // ➕若该路径是登陆页面，则跳转到主页面；
      if (path === '/login') {
          return <Redirect to="/console/main"></Redirect>
      // ➕若该路径不是登陆页，则判断 配置中的🎭auth🆚当前🎭permission.role，若匹配则跳转到该路径下的页面；
      } else if(NavigationGuards.permissionAuthentication(auth, permission.role)) {
          return <Route path={targetRoute.path} render={
              props => (
                  <targetRoute.component {...props} childRoutes={targetRoute.childRoutes}>
                	</targetRoute.component>
              )
          }></Route>
      // ➕若🎭不匹配，则跳转到无权访问页面；
      }else{
          return <NotFound message="您无权访问此页"></NotFound>
      }
  }
  
  //未登录状态下，处理路由
  function NotLoginHandler(props): any {
      const { targetRoute } = props
      const { auth } = targetRoute
      
      // ➕判断🎭列表中是否有🎭，若有🎭，则跳转到登陆页面；
      if (auth&&auth.length>0) {
          return <Redirect to="/login"></Redirect>
      // ➕若无🎭，也未登陆，则该页面必是登陆页面，跳转到该页面；
      } else {
          return <Route path={targetRoute.path} render={
              props => (
                  <targetRoute.component {...props} childRoutes={targetRoute.childRoutes}>
                	</targetRoute.component>
              )
          }></Route>
      }
  }
  
  export default NavigationGuards;
  ```

## 3.3、配置路由懒加载 react 16.6 以后

* react 16.6 以前，需要自己写 HOC 完成对 promise 的转换处理；

  ```typescript
  // src/components/async-module-loader/index.tsx
  import React from 'react'
  
  export interface AyncModuleLoaderState {
      asyncComponent: any
  }
  export default function AyncModuleLoader(importComponent: any) {
      return class AsyncComponent extends React.Component<unknown, AyncModuleLoaderState> {
          constructor(props: unknown) {
              super(props);
              this.state = {
                  asyncComponent: null
              };
          }
          async componentDidMount() {
              if (this.state.asyncComponent) {
                  return;
              }
            	// ⚠️这里
              const { default: component } = await importComponent();
              this.setState({
                  asyncComponent: component
              });
          }
          render() {
              const {asyncComponent:Component} = this.state
              return Component ? <Component {...this.props} /> : null;
          }
      }
  }
  ```

* 使用 `react.lazy` + `react.suspense` 

* webpack 会自动监听 import 语法；

  ```jsx
  import React, { Suspense } from 'react';
  
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  
  function MyComponent() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    );
  }
  ```

## 3.4、♨️♨️总结

> sessionStorage存储登录信息：https://blog.csdn.net/qq_34664239/article/details/107937929

1. 登陆后，tocken经Base64编码后存储到sessionStorage；
2. 页面跳转到系统首页，sessionStorage中拿到用户信息，去后端换取当前用户权限，存储到store中，防止被控制台篡改；
3. 封装fetch，所有HTTP Request Header Authorization 加上Base64编码后的token(前后端可约定规则)；
4. 后台拿到token后对每个请求进行校验，若校验失败返回401，前端response钩子里统一catch error 跳转至登陆页面。
5. 跳转路由时，写一个自定义路由守卫组件，并在路由组件中注入以下3种信息；
   1.  react-router-dom 的 Switch 将自定义路由守卫组件包裹起来之后，路由守卫组件的 props 中会被注入一些与路径有关的信息【location.pathname当前页面的路径】；
   2. 将路由配置文件传入自定义路由守卫组件中【routeConfig】；
   3. 将store中的当前用户权限，引入自定义路由守卫组件【当前用户权限】；
      * 同时后端也会判断若权限和用户不匹配时跳转到登陆页面；
6. 路由守卫组件中将【location.pathname当前页面的路径】在【routeConfig】中查找当前路径匹配的页面组件；
7. 路由守卫组件中根据【当前用户权限】在【routeConfig的auth权限数组】中查找，若找到了，就显示出7中当前路由匹配的组件；
