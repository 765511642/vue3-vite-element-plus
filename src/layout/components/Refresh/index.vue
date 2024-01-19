<template>
    <div>
        <el-tooltip class="box-item"
            effect="dark"
            content="刷新"
            :offset="8"
            placement="top-start">
            <el-icon class="icon"
                title="刷新"
                @click="refresh">
                <Refresh />
            </el-icon>
        </el-tooltip>
    </div>
</template>
<script setup>
import { nextTick } from 'vue';
import { ElLoading } from 'element-plus';
import { useSettingsStore } from '@/store';
const settingsStore = useSettingsStore();
const refresh = () => {
    settingsStore.CHANGE_SETTING('isRefresh', false);
    const loading = ElLoading.service({
        lock: true,
        text: 'Refresh...',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    nextTick(() => {
        settingsStore.CHANGE_SETTING('isRefresh', true);
    });
    setTimeout(() => {
        loading.close();
    }, 1000);
};
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