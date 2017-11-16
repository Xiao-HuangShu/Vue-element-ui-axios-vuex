import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '../pages/error'
import Layout from '../pages/layout'
import Login from '../pages/login'
import Index from '../pages/index'

/*
在大型应用中，可能需要将应用拆分为多个小模块，按需从服务器下载
    一般写法:
    import RoleList from '../pages/appControl/role-list'

    webpack代码分割,异步写法:
    这个特殊的 require 语法告诉 webpack
    自动将编译后的代码分割成不同的块，
    这些块将通过 Ajax 请求自动下载。
    const RoleList = reslove => require(['../pages/appControl/role-list'], reslove);

    异步 webpack+ ES写法，功能同上，也能实现懒加载,代码分割
    const RoleList = () => import('../pages/appControl/role-list')
 */

 // 报表导入
const SalesRecord = () => import('../pages/salesRecord/sales-list') // 销售记录
const SaleReportImport = () => import('../pages/salesReportsImport/index') // 销售报表导入
// APP权限控制
const RoleList = () => import('../pages/appControl/role-list') // 角色列表
const PersonList = () => import('../pages/appControl/person-list') //人员管理

// 基础信息管理
const AgentList = () => import('../pages/userManagement/agent-list') //代办员列表
const AgentDetail = () => import('../pages/userManagement/agent-detail') //代办员详情
const FarmerList = () => import('../pages/userManagement/farmer-list') // 农户信息

Vue.use(Router)

const router =  new Router({
    mode: 'history',//该模式为了好看的Uurl,用了该模式后最好在路由中全局配置一个404错误页，匹配不到路由自动进入错误页
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置,这个功能只在 HTML5 history 模式下可用
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '*',
            component: ErrorPage
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: '/index',
            meta: {
                requiresAuth: true,
                keepAlive: true,
            },
            children: [
                {
                    path: '/index',
                    component: Index
                },
                {
                    path: 'saleordersearchlist',
                    component: SalesRecord,
                    meta: {
                        breadcrumbs : [{
                            name: '销售记录查询'
                        }],
                        keepAlive: false
                    }
                },
                {
                    path: 'salerecordimport',
                    component: SaleReportImport,
                    meta: {
                        breadcrumbs : [{
                            name: '销售报表导入'
                        }],
                        keepAlive: false
                    }
                },
                {
                    path: 'unsaleordersearch',
                    component: SalesRecord,
                    meta: {
                        breadcrumbs : [{
                            name: '当日未销售综合体查询'
                        }],
                        keepAlive: false
                    }
                },
                {
                    path: 'require-import',
                    component: SalesRecord,
                    meta: {
                        breadcrumbs : [{
                            name: '要货单导入'
                        }],
                        keepAlive: false
                    }
                },
                {
                    path: 'urequire-import',
                    component: SalesRecord,
                    meta: {
                        breadcrumbs : [{
                            name: '要货单导入'
                        }],
                        keepAlive: false
                    }
                },
                {
                    path: 'require-shop-search',
                    component: RoleList,
                    meta: {
                          breadcrumbs: [{
                              name: '要货单查询',
                          }],
                          keepAlive: false,
                    }
                },
                {
                    path: 'role-search',
                    component: RoleList,
                    meta: {
                          breadcrumbs: [{
                              name: '角色列表',
                          }],
                          keepAlive: false,
                    }
                },
                {
                    path: 'person',
                    component: PersonList,
                    meta: {
                          breadcrumbs: [{
                              name: '人员管理',
                          }],
                          keepAlive: false,
                    }
                },
                {
                    path: 'agents',
                    component: AgentList,
                    meta: {
                          breadcrumbs: [{
                              name: '代办员管理',
                          }],
                          keepAlive: false,
                    }
                },
                {
                   path: 'agents/:id',
                   component: AgentDetail,
                   meta: {
                       breadcrumbs: [{
                           name: '代办员管理',
                           to: '/agents',
                       }, {
                           name: '代办员详情',
                       }],
                       keepAlive: false,
                   },
               },
                {
                    path: 'farmer-search',
                    component: FarmerList,
                    meta: {
                          breadcrumbs: [{
                              name: '农户信息',
                          }],
                          keepAlive: false,
                    }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/') {
        next({
            path: '/index',
        });
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        const sessionToken = localStorage.getItem('token') || sessionStorage.getItem('token');    // eslint-disable-line no-undef
        if (!sessionToken) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
        next();
    } else {
        next();
    }
});

export default router
