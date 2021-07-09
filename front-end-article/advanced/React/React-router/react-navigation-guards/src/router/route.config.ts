import { permissionTypes } from "@/utils"
import AsyncModuleLoader from "@/components/async-module-loader"
const Modules = {
    Main: AsyncModuleLoader(() => import("@/view/main" /* webpackChunkName:"user" */)),
    Console: AsyncModuleLoader(() => import("@/view/console" /* webpackChunkName:"user" */)),
    Login: AsyncModuleLoader(() => import("@/view/login" /* webpackChunkName:"user" */)),
    News: AsyncModuleLoader(() => import("@/view/news" /* webpackChunkName:"user" */)),
    UserManage: AsyncModuleLoader(() => import("@/view/user-manage" /* webpackChunkName:"manager" */))
}

export interface RouteModel {
    path: string,
    component?: object,
    redirect?:string,
    auth?: string[],
    childRoutes?: RouteModel[]
}

/* 
    这里只需配置好这些路由的相互关系即可
    比如login和console是同级（兄弟），而news是console的子路由（父子）
*/
const { USER, MANAGER } = permissionTypes
const { Main, Console, Login, News, UserManage } = Modules
export const routeConfig: RouteModel[] = [
    {
        path:"/",
        redirect:"/console/main"
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/console",
        component: Console,
        auth: [USER, MANAGER],
        childRoutes: [
            {
                path: "main",
                component: Main,
                auth: [USER, MANAGER]
            },
            {
                path: "/news", //两种写法均可
                component: News,
                auth: [USER, MANAGER]
            },
            {
                path: "userManage",
                component: UserManage,
                auth: [MANAGER]
            }
        ]
    }
]

