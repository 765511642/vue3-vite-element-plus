<template>
    <div>
        <el-tooltip effect="dark"
            content="全屏"
            :offset="8"
            placement="top-start">
            <span class="icon">
                <el-icon @click="handleClick">
                    <Rank v-if="!isFullScreen" />
                    <FullScreen v-else />
                </el-icon>
            </span>
        </el-tooltip>
    </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import screenfull from 'screenfull';
import { useSettingsStore } from '@/store';
const settingsStore = useSettingsStore();
const isFullScreen = computed(() => {
    return settingsStore.isFullScreen;
});
const handleClick = () => {
    if (!screenfull.isEnabled) {
        ElMessage.warning('进入全屏失败');
        return false;
    }
    settingsStore.CHANGE_SETTING('isFullScreen', !isFullScreen.value);
    screenfull.toggle();
};
const change = () => {
    if (screenfull.isFullscreen !== isFullScreen.value) {
        settingsStore.CHANGE_SETTING('isFullScreen', screenfull.isFullscreen);
    }
};
onMounted(() => {
    screenfull.on('change', change);
});

// 删除监听器
onUnmounted(() => {
    screenfull.off('change', change);
});
</script>
<style lang="scss" scoped>
.icon {
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		color: var(--el-color-primary);
	}
}
</style>