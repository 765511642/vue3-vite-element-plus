<template>
    <section class="app-main">
        <div class="main">
            <template v-if="isRefresh">
                <router-view v-slot="{ Component }">
                    <keep-alive :include="cachedViews">
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </template>
            <Tool />
        </div>
    </section>
</template>
<script setup>
import { computed } from 'vue';
import { useTagsViewStore, useSettingsStore } from '@/store';
import Tool from './Tool';
const tagsViewStore = useTagsViewStore();
const settingsStore = useSettingsStore();
const cachedViews = computed(() => {
    return tagsViewStore.cachedViews;
});
const isRefresh = computed(() => {
    return settingsStore.isRefresh;
});
</script>
<style scoped lang="scss">
.app-main {
	/*50 = navbar  */
	min-height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	overflow: hidden;
	background: #fff;

	.main {
		background: #fff;
		position: relative;
		z-index: 2;
	}
}
.fixed-header + .app-main {
	padding: 104px 10px 10px 10px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
// 	.fixed-header {
// 		padding-right: 15px;
// 	}
// }
</style>
