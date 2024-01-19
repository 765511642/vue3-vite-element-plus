// 程序操作
import { defineStore } from 'pinia';
import { getCookies, setCookies } from '@/utils/cookies';
export const useAppStore = defineStore('appStore', {
	state: () => ({
		sidebar: {
			opened: getCookies('sidebarStatus') ? !!+getCookies('sidebarStatus') : true, // 是否打开
			withoutAnimation: false // 是否带动画
		},
		device: 'desktop',
	}),
	getters: {},
	actions: {
		TOGGLE_SIDEBAR () {
			this.sidebar.opened = !this.sidebar.opened;
			this.sidebar.withoutAnimation = false;
			if (this.sidebar.opened) {
				setCookies('sidebarStatus', 1);
			} else {
				setCookies('sidebarStatus', 0);
			}
		},
		CLOSE_SIDEBAR (withoutAnimation) {
			setCookies('sidebarStatus', 0);
			this.sidebar.opened = false;
			this.sidebar.withoutAnimation = withoutAnimation;
		},
		TOGGLE_DEVICE (device) {
			this.device = device;
		}
	}
});
