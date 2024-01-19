const whiteList = ['/login']; // 路由白名单
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
	easing: 'ease',
	speed: 500,
	trickleSpeed: 200,
	showSpinner: false
});
/**
 *
 * 路由导航，验证权限，添加路由
 */
import router from '@/router';
import { useUserStore, usePermissionStore } from '@/store';
import { setting } from '@/utils/settings.js';
let { title } = setting;
router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore();
	const permissionStore = usePermissionStore();
	let hasToken = userStore.accessToken;
	NProgress.start();
	document.title = to.meta.title ? title + ' - ' + to.meta.title : title;
	if (hasToken) {
		// 已登录用户去登录页跳转首页；
		if (to.path === '/login') {
			next({ path: '/' });
			NProgress.done();
		} else {
			let hasRoles = userStore.roles && userStore.roles.length > 0;
			if (hasRoles) {
				next();
			} else {
				try {
					/**
					 * 1.请求user.getInfo获取用户信息；userStore.GETINFO(token)
					 *  roles 必须是 array! such as: ['admin'] or ,['developer','editor']
					 * 2.请求路由接口获取路由权限；
					 * 3.路由add
					 */
					let { roles } = await userStore.GET_INFO();
					let accessRoutes = await permissionStore.GENERATE_ROUTES(roles);
					accessRoutes.forEach((item) => {
						item.children.forEach((i) => {
							router.addRoute(i);
						});
					});
					// 解决刷新，动态路由404
					router.addRoute({
						path: '/:pathMatch(.*)',
						redirect: '/404',
						hidden: true
					});
					next({ ...to, replace: true });
					NProgress.done();
				} catch (error) {
					await userStore.RESET_TOKEN();
					NProgress.done();
					next(`/login?redirect=${to.path}`);
				}
			}
		}
	} else {
		// 免登录路由
		if (whiteList.indexOf(to.path) !== -1) {
			next();
			NProgress.done();
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next(`/login?redirect=${to.path}`);
			NProgress.done();
		}
	}
});
router.afterEach(() => {
	NProgress.done();
});
