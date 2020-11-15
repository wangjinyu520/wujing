import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
let Routes = [


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
            name: '背景图管理',
            hidden: false,
            meta: {
                code: 'advertisement:index',
            },
            component: () =>
                import('@/pages/advertisement/index1'),
        },
        {
            path: 'bgAdmin',
            name: '读书照管理',
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
                    code: 'message:index',
                },
                component: () =>
                    import('@/pages/advertisement/news'),
            },
            {
                path: 'notice',
                name: '通知公告',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/notice'),
            },
            {
                path: 'activity',
                name: '校园活动',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/activity'),
            },

        ]
    },
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
                    import('@/pages/advertisement/guideReader'),
            },
            {
                path: 'rules',
                name: '借阅规则',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/rules'),
            },
            {
                path: 'recommend',
                name: '新书推荐',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/books/index'),
            },
            // {
            //     path: 'guideBook',
            //     name: '图书导购',
            //     hidden: false,
            //     meta: {
            //         // code: 'advertisement:index',
            //     },
            //     component: () =>
            //         import('@/pages/advertisement/index2'),
            // },

        ]
    },
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
                path: 'orginSet',
                name: '机构设置',
                hidden: false,
                meta: {
                    code: 'message:index',
                },
                component: () =>
                    import('@/pages/advertisement/orginSet'),
            },
            {
                path: 'time',
                name: '开放时间',
                hidden: false,
                meta: {
                    code: 'message:index',
                },
                component: () =>
                    import('@/pages/advertisement/time'),
            },
            {
                path: 'features',
                name: '馆舍风貌',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/features'),
            },
            {
                path: 'special',
                name: '本馆特色',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/special'),
            },
            {
                path: 'history',
                name: '历史沿革',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/history'),
            },
            {
                path: 'regulation',
                name: '规章制度',
                hidden: false,
                meta: {
                    // code: 'advertisement:index',
                },
                component: () =>
                    import('@/pages/advertisement/regulation'),
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
                    import('@/pages/advertisement/question'),
            },
           

        ]
    },
    {
        path: '/app',
        name: '系统管理',
        redirect: '/app/dictionary',
        hidden: false,
        meta: {
            code: 'app:index',
            image: 'coupon.png'
        },
        children: [{
            path: 'dictionary',
            name: '字典管理',
            hidden: false,
            meta: {
                code: 'dictionary:index'
            },
            component: () =>
                import('@/pages/dictionary/index'),
        }
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