<template>
    <div v-if="!item.hidden">
        <!-- 有三级路由 -->
        <template v-if="isTherrCHidren(item)">
            <el-popover popper-class="app-popover"
                placement="right"
                :width="400"
                trigger="hover"
                :hide-after="50">
                <template #reference>
                    <div class="app-menu-item clearfix"
                        :class="{active: activeMenu(item)}">
                        <span class="fl app-icon">
                            <Icon :icon="item.meta.icon" />
                        </span>
                        <template v-if="!collapse">
                            <span class="fl title">{{ item.meta.title }}</span>
                            <el-icon :size="12"
                                class="fr icon-arrow">
                                <ArrowRightBold />
                            </el-icon>
                        </template>
                    </div>
                </template>
                <div>
                    <!-- 二级目录 -->
                    <div v-for="(twoItem, twoIndex) in item.children"
                        :key="twoIndex"
                        class="app-two-content">
                        <p class="app-two-title">{{ twoItem?.meta?.title }}</p>
                        <div class="app-therr-list">
                            <span v-for="(threeItem, threeIndex) in twoItem.children"
                                :key="threeIndex"
                                class="app-therr-item"
                                :class="{active: activeMenu({parent: twoItem, children: threeItem})}"
                                @click="toPage(threeItem, twoItem)">
                                {{ threeItem?.meta?.title }}
                            </span>
                        </div>
                    </div>
                </div>
            </el-popover>
        </template>
        <!-- 2级路由 -->
        <template v-else>
            <div class="app-menu-item clearfix"
                :class="{active: activeMenu(item)}"
                @click="toPageOne(item)">
                <span class="fl app-icon">
                    <Icon :icon="item.meta.icon" />
                </span>
                <template v-if="!collapse">
                    <span class="fl title">{{ item?.meta?.title }}</span>
                </template>

            </div>
        </template>
    </div>
</template>
<script setup>
import pathBrowserify from 'path-browserify';
import Icon from '../Icon';

import { useRouter, useRoute } from 'vue-router';
// import { ref } from 'vue';
// let visible = ref(false);
const router = useRouter();
const route = useRoute();
defineProps({
    item: {
        type: Object,
        required: true
    },
    collapse: {
        type: Boolean,
        required: true
    }
});
const isTherrCHidren = (item) => {
    if (item?.children[0] && item?.children[0]?.children?.length > 0) {
        // 有三级
        return true;
    } else {
        // 两级
        return false;
    }
};
const toPageOne = (item) => {
    let current = null;
    if (item?.path) {
        current = item?.path;
    }
    if (current) {
        router.push({
            path: current
        });
    }
};
const toPage = (item, twoItem) => {
    let current = null;
    if (item?.path && twoItem.path) {
        current = pathBrowserify.resolve(twoItem.path, item.path);
    }
    if (current) {
        router.push({
            path: current
        });
    }
};

const activeMenu = (params) => {
    const { path } = route;
    // 二级，三级路径对比；
    if (params.parent && params.children) {
        const joinPath = pathBrowserify.resolve(params.parent.path, params.children.path);
        return path === joinPath;
    } else {
        // 没有子集，只有二级路径对比
        if (path === '/dashboard' && params.path === '/') {
            // 首页
            return true;
        } else {
            let name = findRouteName(params.children, route.name);
            return name ? true : false;
        }
    }
};
// 查找子集下面是否有当前路由name的对象
const findRouteName = (list, name) => {
    for (const item of list) {
        if (item.name === name) {
            return item;
        }
        if (item.children && item.children.length > 0) {
            const foundInChildren = findRouteName(item.children, name);
            if (foundInChildren) {
                return foundInChildren;
            }
        }
    }
    return null;
};
</script>
<style lang="scss" scoped>
</style>
