<script setup>
import zh from 'element-plus/dist/locale/zh-cn.mjs';
import { onMounted, watch, getCurrentInstance } from 'vue';
import { useAppStore } from '@/store';
import { useRoute } from 'vue-router';
const route = useRoute();
const appStore = useAppStore();
const instance = getCurrentInstance();
const elConfig = instance.appContext.config.globalProperties.ELEMENTCONFIG;
onMounted(() => {
    changeBodyWidth();
    window.addEventListener('resize', changeResize);
});
let buttonConfig = {
    autoInsertSpace: true
};
// 因为菜单是hover出现，关闭导致菜单还在
// watch(
//     () => route,
//     () => {
//         console.log('device', appStore.device);
//         if (appStore.device === 'mobile' && appStore.sidebar.opened) {
//             appStore.CLOSE_SIDEBAR(false);
//         }
//     },
//     { immediate: true, deep: true }
// );
const changeBodyWidth = () => {
    const flag = document.body.getBoundingClientRect().width - 1 < 992;
    let device = '';
    if (flag) {
        device = 'mobile';
        appStore.CLOSE_SIDEBAR(true);
    } else {
        device = 'desktop';
    }
    appStore.TOGGLE_DEVICE(device);
};

const changeResize = () => {
    changeBodyWidth();
};
</script>
<template>
    <el-config-provider :locale="zh"
        :size="elConfig.size"
        :zIndex="elConfig.zIndex"
        :button="buttonConfig">
        <RouterView />
    </el-config-provider>
</template>

<style lang="scss">
#nprogress .bar {
	background: #50b089 !important;
}
</style>
