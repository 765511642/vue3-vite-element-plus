import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index';
import hiddenRoute from './modules/hiddenRouter';	// 隐藏不展示的路由
import defaultRoute from './modules/defaultRouter';
// meta : {
//     roles: ['admin','editor']    control the page roles (you can set multiple roles)
//     title: 'title'               the name show in sidebar and breadcrumb (recommend set)
//     icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
//     noCache: true                if set true, the page will no be cached(default is false)
//     affix: true                  if set true, the tag will affix in the tags-view
//     breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
//     activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
//   }

// 不删除路由父子级路由的name，可以在路由表上定义；
const notRemoveRouters = [
	'home',
	'Dashboard',
	'login',
	'401',
	'404',
	'name',
	'user',
	'userIndex',
	'taskList',
	'taskListIndex',
	'examine',
	'examineIndex',
	'helpCentral',
	'helpCentralIndex',
	'gpt',
	'gptIndex'
];
export const constantRoutes = [
	{
		path: '/',
		redirect: '/dashboard',
		component: Layout,
		name: 'home',
		children: [
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: () => import('@/views/dashboard/index'),
				meta: { affix: true, noCache: true }	// affix 默认展示在tagView里，并且不可关闭，只用作首页
			}
		],
		meta: { title: '首页', icon: 'icon-shouye' }
	},
	...defaultRoute,
	...hiddenRoute
];

const create_router = () => createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),	// 需要服务器配置
	routes: constantRoutes
});
let router = create_router();
export function resetRouter () {
	router.getRoutes().forEach((route) => {
		const { name } = route;
		if (name && notRemoveRouters.indexOf(name) === -1) {
			router.hasRoute(name) && router.removeRoute(name);
		}
	});
}
export default router;
