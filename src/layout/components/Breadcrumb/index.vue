<!-- 面包屑 -->
<template>
    <div>
        <el-breadcrumb class="app-breadcrumb"
            separator="/">
            <transition-group name="breadcrumb">

                <el-breadcrumb-item v-for="(item, index) in levelList"
                    :key="item.path">
                    <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                        class="no-redirect">{{ item.meta.title }}</span>
                    <a v-else
                        @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>
<script setup>
import { watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as pathToRegexp from 'path-to-regexp';
const router = useRouter();
const route = useRoute();
let levelList = ref();
// 是否是Dashboard路由；
const isDashboard = (route) => {
    const name = route && route.name;
    if (!name) {
        return false;
    }
    return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase();
};
// 获取面包屑
const getBreadcrumb = () => {
    let matched = route.matched.filter((item) => {
        return item.meta && item.meta.title;
    });
    const first = matched[0];
    if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched);
    }
    levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
    );
};
getBreadcrumb();
// 参数解析加跳转
const pathCompile = (path) => {
    const { params } = route;
    let toPath = pathToRegexp.compile(path);
    return toPath(params);
};
// 点击一级二级跳转
const handleLink = (item) => {
    const { redirect, path } = item;
    if (redirect) {
        router.push(redirect);
        return;
    }
    router.push(pathCompile(path));
};
// 监听路径，发生变化获取面包屑
watch(
    () => router.currentRoute.value.path,
    () => {
        getBreadcrumb();
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	font-size: 12px;
	line-height: 50px;
	margin-left: 8px;

	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
}
</style>
