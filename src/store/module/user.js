// 用户信息
import { defineStore } from 'pinia';
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken';
import { resetRouter } from '@/router';
import { useTagsViewStore } from './tagsView';
import { usePermissionStore } from './permission';


export const useUserStore = defineStore('userStore', {
	state: () => ({
		accessToken: getAccessToken(),
		userInfo: {
			username: null,
			avatar: null
		},
		roles: [] // 身份，根据身份获取路由权限【此处为商户，分校】;
	}),
	getters: {
		getUserName (state) {
			return state.userName;
		},
		getRoles (state) {
			return state.roles;
		},
		getUserInfo (state) {
			return state.userInfo;
		}
	},
	actions: {
		SET_ROLES (list) {
			this.roles = list;
		},
		GET_INFO () {
			return new Promise((resolve) => {
				let data = {
					roles: ['admin']
				};
				// 通过token获取用户信息,其中包含roles;
				this.SET_ROLES(data.roles);
				resolve(data);
			});
		},
		LOGIN () {
			return new Promise((resolve) => {
				// 登录，获取token，设置token，在设置accessToken
				let data = {
					token: 'token'
				};
				setAccessToken(data.token);
				this.accessToken = data.token;
				resolve();
			});
		},
		RESET_TOKEN () {
			return new Promise((resolve) => {
				this.accessToken = '';
				this.roles = [];
				removeAccessToken();
				resolve();
			});
		},
		LOGOUT () {
			const tagsViewStore = useTagsViewStore();
			const permissionStore = usePermissionStore();
			return new Promise((resolve) => {
				removeAccessToken(); // 删除token
				this.accessToken = '';
				this.roles = [];
				resetRouter();	// 重置路由

				tagsViewStore.delAllViews();	// 清空tagsView
				permissionStore.SET_ROUTES([]);
				resolve();
			});
		},
		// 切换商户，切换路由
		CHANGEROLES () {
		}
	}
});
