export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        name: '404',
        hidden: true,
        component: () => import('@/views/errorPage/404')
    },
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/errorPage/401'),
        hidden: true
    },
    {   // 解决控制台waring，不重定向的路径不会定向至404，定向在路由守卫文件
        path: '/:pathMatch(.*)*',
        hidden: true,
        component: () => import('@/views/errorPage/404')
    }
];