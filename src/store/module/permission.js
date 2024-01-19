// 路由权限
import { defineStore } from 'pinia';
import { constantRoutes } from '@/router';
import routerList from '@/config/routerList';
import { toTree, addComponent } from '@/utils/utils';

const hasPermission = (roles, route) => {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta.roles.includes(role));
	} else {
		return true;
	}
};
export const filterAsyncRoutes = (routes, roles) => {
	const res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});
	return res;
};
export const usePermissionStore = defineStore('permissionStore', {
	state: () => ({
		routes: [],
		addRoutes: []
	}),
	actions: {
		SET_ROUTES (routes) {
			this.addRoutes = routes;
			this.routes = constantRoutes.concat(routes);
		},
		// generateRoutes
		GENERATE_ROUTES (roles) {
			return new Promise((resolve) => {
				// let accessedRoutes = [];
				// if (roles.includes('admin')) {
				// 	accessedRoutes = asyncRoutes || [];
				// } else {
				// 	accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
				// }
				// this.SET_ROUTES(accessedRoutes);
				// resolve(accessedRoutes);

				// 游学转树：
				let copyTree = JSON.parse(JSON.stringify(routerList.data.navigation));
				let tree = [];
				tree = toTree(copyTree, 'navigationId', 'fatherNavigationId');
				let newRouteList = addComponent(tree);
				this.SET_ROUTES(newRouteList);
				resolve(newRouteList);
			});
		}
	}
});
