import { createApp, reactive } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
// el修改全局主题
import '@/styles/element/index.scss';
// 滚动条
import 'normalize.css';
// 权限
import './config/permission.js';

import '@/styles/index.scss';
import { getCookies } from '@/utils/cookies';
const app = createApp(App);

// elicon组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

// 按钮权限自定义指令
import { checkPermission } from '@/directive/permission';
app.directive('checkPermission', checkPermission);

// el的config
const EleConfig = reactive({
	size: getCookies('Elsize') || 'default',
	zIndex: 3000
});

app.config.globalProperties.ELEMENTCONFIG = EleConfig;
app.use(createPinia());
app.use(router);
app.mount('#app');
