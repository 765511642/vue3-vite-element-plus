<template>
    <div class="tool">
        <div class="tool-icon">
            <el-icon>
                <Tools />
            </el-icon>
        </div>
        <div class="tool-list">
            <div @click="scrollToTop">
                <span class="icon iconfont icon-fanhuidingbu3"></span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useDebounceFn } from '@vueuse/core';
const scrollToTop = useDebounceFn(() => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // 平滑滚动
    });
}, 1000);
</script>
<style lang="scss" scoped>
.tool {
	position: fixed;
	right: -40px;
	bottom: 60px;
	width: 40px;
	padding: 20px 0;
	transition: all 0.2s;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	background: #fff;
	border: 1px solid #f3f3f3;
	text-align: center;
	z-index: 1000;
	.tool-icon {
		width: 35px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background: #fff;
		border: 1px solid #f3f3f3;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border-right: none;
		position: absolute;
		left: -35px;
		top: 50%;
		transform: translateY(-50%);
		box-shadow: -2px 2px 5px 0px #e8e3e3;
	}
	&:hover {
		right: 0;
	}
	.tool-list {
		.icon {
			font-size: 20px;
			cursor: pointer;
			user-select: none;
			transition: all 0.2s;
			&:hover {
				color: var(--el-color-primary);
			}
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.dsiabled {
			cursor: no-drop !important;
		}
	}
}
</style>