// 系统设置
import { defineStore } from 'pinia';
import { setting } from '@/utils/settings';
import { getCookies, setCookies } from '@/utils/cookies';
const { showSettings, fixedHeader, sidebarLogo } = setting;
export const useSettingsStore = defineStore('settingsStore', {
	state: () => ({
		showSettings: showSettings,	// 是否显示设置按钮
		fixedHeader: fixedHeader,	// 是否固定头部
		sidebarLogo: sidebarLogo,	// 是否显示菜单logo
		isFullScreen: false, // 是否显示全屏
		isRefresh: true,	// 刷新变量
		Elsize: getCookies('Elsize') || 'default'
	}),
	getters: {
		GET_SETTING (key) {
			return this[key];
		}
	},
	actions: {
		CHANGE_SETTING (key, value) {
			this[key] = value;
			if (key === 'Elsize') {
				setCookies(key, value);
			}
		}
	}
});
