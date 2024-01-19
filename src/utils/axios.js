import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store';
import { getAccessToken } from '@/utils/accessToken.js';
import { removeNullItem, to } from '@/utils';
const userStore = useUserStore();

class Axios {
	constructor() {
		this._axios = null;
		this.config = {
			baseURL: import.meta.env.VITE_APP_WEB_URL
		};
		this.init();
	}
	init() {
		this._axios = axios.create(this.config);
		this._axios.interceptors.request.use(
			(config) => {
				const params = {};
				config.timeout = 20000;
				if (getAccessToken()) {
					config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
				}

				const data = config.data || {};
				removeNullItem(data);
				config.data = data;

				removeNullItem(params);
				config.params = { ...config.params, ...params };
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// Add a response interceptor
		this._axios.interceptors.response.use(
			(response) => {
				// Do something with response data
				const res = response.data;
				if (res.error && res.error !== 0) {
					if (res.error === 401) {
						// 401，删除token-退出
						userStore.RESET_TOKEN();
						location.reload();
					} else {
						ElMessage({
							message: res.message,
							type: 'error',
							duration: 1600
						});
					}
					return Promise.reject(res);
				}
				return Promise.resolve(res);
			},
			(error) => {
				const msg =
					error.message === 'timeout of 20000ms exceeded'
						? '请求超时,请稍后再试'
						: error.message;
				ElMessage({
					message: msg,
					type: 'error',
					duration: 1600
				});
				return Promise.reject(error);
			}
		);
	}
	get(url, params, config) {
		return to(
			this._axios.get(import.meta.env.VITE_APP_BASE_URL_PATH + url, { params, ...config })
		);
	}
	post(url, data = {}, config = {}) {
		return to(this._axios.post(import.meta.env.VITE_APP_BASE_URL_PATH + url, data, config));
	}
}
let axios_ = new Axios();
export default axios_;
