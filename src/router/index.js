import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
let Routes = [

    // {
    //     path: '/platformOrder',
    //     name: '订单管理（平台）',
    //     redirect: '/platformOrder/index',
    //     hidden: true,
    //     meta: {
    //         code: 'order:guard:index',
    //         image: 'order.png'
    //     },
    //     children: [{
    //             path: 'index',
    //             name: '订单管理（平台）',
    //             hidden: true,
    //             meta: {
    //                 code: 'order:guard:index',
    //             },
    //             component: () =>
    //                 import ('@/pages/order/platformOrder'),
    //         },
    //         {
    //             path: 'after',
    //             name: '售后管理（平台）',
    //             hidden: true,
    //             meta: {
    //                 code: 'order:guard:index',
    //             },
    //             component: () =>
    //                 import ('@/pages/order/after'),
    //         }
    //     ]
    // },

    // {
    //     path: '/comment',
    //     name: '评价管理',
    //     redirect: '/comment/index',
    //     hidden: true,
    //     meta: {
    //         code: 'comment:index',
    //         image: 'order.png'
    //     },
    //     children: [{
    //         path: 'index',
    //         name: '评价管理',
    //         hidden: true,
    //         meta: {
    //             code: 'comment:index',
    //         },
    //         component: () =>
    //             import ('@/pages/comment/index'),
    //     }]
    // },
    // {
    //     path: '/suggestion',
    //     name: '意见反馈',
    //     redirect: '/suggestion/index',
    //     hidden: true,
    //     meta: {
    //         code: 'suggestion:index',
    //         image: 'order.png'
    //     },
    //     children: [{
    //         path: 'index',
    //         name: '意见反馈',
    //         hidden: true,
    //         meta: {
    //             code: 'suggestion:index',
    //         },
    //         component: () =>
    //             import ('@/pages/suggestion/index'),
    //     }]
    // },
    // {
    //     path: '/app',
    //     name: 'APP管理',
    //     redirect: '/app/index',
    //     hidden: true,
    //     meta: {
    //         code: 'app:index',
    //         image: 'site.png'
    //     },
    //     children: [{
    //         path: 'index',
    //         name: 'APP管理',
    //         hidden: true,
    //         meta: {
    //             code: 'app:index',
    //         },
    //         component: () =>
    //             import ('@/pages/appManager/index'),
    //     }]
    // },

    // {
    //     path: '/menu',
    //     name: '菜单管理',
    //     redirect: '/menu/index',
    //     hidden: !(process.env.NODE_ENV == 'development'),
    //     meta: {
    //         image: 'integral.png'
    //     },
    //     children: [{
    //         path: 'index',
    //         name: '菜单设置',
    //         hidden: !(process.env.NODE_ENV == 'development'),
    //         component: () =>
    //             import ('@/pages/menu/index'),
    //     }]
    // },
    // {
    //     path: '/merchant-only',
    //     name: '商品管理',
    //     redirect: '/merchant-only/product',
    //     hidden: true,
    //     meta: {
    //         image: 'merchant.png',
    //         code: '',
    //         byChildren: true,
    //     },
    //     children: [{
    //             path: 'product',
    //             name: '商品管理',
    //             hidden: true,
    //             meta: {
    //                 code: 'product:index'
    //             },
    //             component: () =>
    //                 import ('@/pages/merchant/product'),
    //         },
    //         {
    //             path: 'category',
    //             name: '分类管理',
    //             hidden: true,
    //             meta: {
    //                 code: 'category:index'
    //             },
    //             component: () =>
    //                 import ('@/pages/merchant/category'),
    //         },
    //         {
    //             path: 'product/proInfo',
    //             name: '商品详情',
    //             hidden: true,
    //             meta: {
    //                 alwaysHidden: true,
    //                 code: 'product:index'
    //             },
    //             component: () =>
    //                 import ('@/pages/merchant/proInfo'),
    //         },
    //     ]
    // },

    // {
    //     path: '/order',
    //     name: '订单管理',
    //     redirect: '/order/order',
    //     hidden: true,
    //     meta: {
    //         code: 'order:index',
    //         image: 'order.png'
    //     },
    //     children: [{
    //         path: 'order',
    //         name: '订单管理',
    //         hidden: true,
    //         meta: {
    //             code: 'order:index',
    //         },
    //         component: () =>
    //             import ('@/pages/order/order'),
    //     }]
    // },
    // {
    //     path: '/finance',
    //     name: '财务结算',
    //     redirect: '/finance/balance',
    //     hidden: true,
    //     meta: {
    //         code: 'wallet:index',
    //         image: 'finance.png'
    //     },
    //     children: [{
    //         path: 'balance',
    //         name: '财务结算',
    //         hidden: true,
    //         meta: {
    //             code: 'wallet:index',
    //         },
    //         component: () =>
    //             import ('@/pages/finance/balance'),
    //     }]
    // },

    {
        path: '/advertisement',
        name: '首页管理',
        redirect: '/advertisement/adver',
        hidden: false,
        meta: {
            byChildren: true,
            image: 'order.png'
        },
        children: [{
            path: 'adver',
            name: '广告管理',
            hidden: false,
            meta: {
                code: 'advertisement:index',
            },
            component: () =>
                import('@/pages/advertisement/index1'),
        },
        {
            path: 'bgAdmin',
            name: '背景图管理',
            hidden: false,
            meta: {
                // code: 'advertisement:index',
            },
            component: () =>
                import('@/pages/advertisement/index2'),
        },
            // {
            //     path: 'index/info',
            //     name: '详情',
            //     hidden: true,
            //     meta: {
            //         alwaysHidden: true,
            //         code: 'advertisement:index',
            //     },
            //     component: () =>
            //         import ('@/pages/advertisement/info'),
            // }
        ]
    },
    // message文件下面
    {
        path: '/message',
        name: '通知公告',
        redirect: '/message/news',
        hidden: false,
        meta: {
            byChildren: true,
            image: 'order.png'
        },
        children: [
            {
                path: 'news',
                name: '焦点新闻',
                hidden: false,
                meta: {
                    code: 'messa ge:index',
                },
                component: () =>
                    import('@/pages/advertisement/index1'),
            },
            {
                path: 'notice',
                name: '通知公告',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },
            {
                path: 'activity',
                name: '校园活动',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },

        ]
    },
    // message文件下面
    {
        path: '/services',
        name: '读者服务',
        redirect: '/services/guideReader',
        hidden: false,
        meta: {
            byChildren: true,
            image: 'order.png'
        },
        children: [
            {
                path: 'guideReader',
                name: '读者指南',
                hidden: false,
                meta: {
                    code: 'message:index',
                },
                component: () =>
                    import('@/pages/advertisement/index1'),
            },
            {
                path: 'rules',
                name: '借阅规则',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },
            {
                path: 'recommend',
                name: '新书推荐',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },
            {
                path: 'guideBook',
                name: '图书导购',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },

        ]
    },
    // message文件下面
    {
        path: '/introduce',
        name: '本馆介绍',
        redirect: '/introduce/time',
        hidden: false,
        meta: {
            byChildren: true,
            image: 'order.png'
        },
        children: [
            {
                path: 'time',
                name: '开放时间',
                hidden: false,
                meta: {
                    code: 'message:index',
                },
                component: () =>
                    import('@/pages/advertisement/index1'),
            },
            {
                path: 'features',
                name: '馆舍风貌',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },
            {
                path: 'special',
                name: '本馆特色',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },
            {
                path: 'history',
                name: '历史沿革',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/index2'),
            },

        ]
    },
    {
        path: '/question',
        name: '常见问题',
        redirect: '/question/index',
        hidden: false,
        meta: {
            byChildren: true,
            image: 'order.png'
        },
        children: [
            {
                path: 'index',
                name: '常见问题',
                hidden: false,
                meta: {
                    code: 'message:index',
                },
                component: () =>
                    import('@/pages/advertisement/index1'),
            },
           

        ]
    },

    // {
    //     path: '/permission',
    //     name: '',
    //     hidden: true,
    //     children: []
    // },
    {
        path: '',
        redirect: '/advertisement',
    },
    {
        path: '/login',
        name: '登录',
        hidden: true,
        meta: {
            alwaysHidden: true
        },
        component: () =>
            import('@/pages/login/index'),
    },

]

//给一级路由统一增加相同的模板，显示菜单栏和顶部栏
let Index = () =>
    import('@/pages/Index/index')
Routes = Routes.map(item => {
    if (!item.component) {
        item.component = Index
    }
    return item
})

export default new Router({
    routes: Routes
})