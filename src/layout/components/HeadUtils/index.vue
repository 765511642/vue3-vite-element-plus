<template>
    <div class="right-panel">
        <!-- 通知 -->
        <Notify class="box-item" />
        <!-- 设置 -->
        <Setting v-if="settingsStore.showSettings"
            class="box-item" />
        <!-- 刷新 -->
        <Refresh class="box-item" />
        <!-- 全屏 -->
        <FullScreen class="box-item" />
    </div>
</template>
<script setup>
import FullScreen from '../FullScreen';
import Refresh from '../Refresh';
import Notify from '../Notify';
import Setting from '../Setting';
import { useSettingsStore } from '@/store';
const settingsStore = useSettingsStore();
</script>
<style lang="scss" scoped>
.right-panel {
	float: right;
	height: 100%;
	margin-right: 20px;
	display: flex;
	align-items: center;
	justify-content: center;

	.box-item {
		position: relative;
		margin: 0 10px;
		display: inline-block;
		height: 16px;
		transition: transform 0.1s ease;
	}
}
</style>
