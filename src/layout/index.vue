<template>
    <div :class="classObj"
        class="app-wrapper">
        <div v-if="device === 'mobile' && sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside" />
        <appSidebar class="sidebar-container" />
        <div class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <appNavbar />
                <TagsView />
            </div>
            <AppMain />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import appSidebar from './components/Sidebar/index';
import appNavbar from './components/Navbar';
import AppMain from './components/AppMain';
import TagsView from './components/TagsView';
import { useAppStore, useSettingsStore } from '@/store';
let appStore = useAppStore();
let settingsStore = useSettingsStore();
const sidebar = computed(() => {
    return appStore.sidebar;
});
const device = computed(() => {
    return appStore.device;
});
const fixedHeader = computed(() => {
    return settingsStore.fixedHeader;
});
const classObj = computed(() => {
    return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile' // 设备
    };
});
const handleClickOutside = () => {
    appStore.CLOSE_SIDEBAR(false);
};

</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - #{$sideBarWidth});
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 54px);
}

.mobile .fixed-header {
	width: 100%;
}
</style>
