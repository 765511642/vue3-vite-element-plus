import Layout from '@/layout/index';
export default [
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        name: 'user',
        children: [
            {
                path: 'index',
                name: 'userIndex',
                component: () => import('@/views/user/index'),
            }
        ],
        meta: { title: '个人中心' },
        hidden: true,
    },
    {
        path: '/taskList',
        component: Layout,
        redirect: '/taskList/index',
        name: 'taskList',
        children: [
            {
                path: 'index',
                name: 'taskListIndex',
                component: () => import('@/views/taskList/index'),
            }
        ],
        meta: { title: '我的任务' },
        hidden: true,
    },
    {
        path: '/examine',
        component: Layout,
        redirect: '/examine/index',
        name: 'examine',
        children: [
            {
                path: 'index',
                name: 'examineIndex',
                component: () => import('@/views/examine/index'),
            }
        ],
        meta: { title: '审批任务' },
        hidden: true,
    },
    {
        path: '/helpCentral',
        component: Layout,
        redirect: '/helpCentral/index',
        name: 'helpCentral',
        children: [
            {
                path: 'index',
                name: 'helpCentralIndex',
                component: () => import('@/views/helpCentral/index'),
            }
        ],
        meta: { title: '帮助中心' },
        hidden: true,
    },
    {
        path: '/gpt',
        component: Layout,
        redirect: '/gpt/index',
        name: 'gpt',
        children: [
            {
                path: 'index',
                name: 'gptIndex',
                component: () => import('@/views/gptSearch/index'),
            }
        ],
        meta: { title: 'GPT查询' },
        hidden: true,
    },
];