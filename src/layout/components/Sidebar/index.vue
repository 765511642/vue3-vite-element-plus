<template>
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo"
            :collapse="isCollapse" />
        <el-scrollbar>
            <div class="app-menu-list">
                <SidebarItem v-for="route in permission_routes"
                    :key="route.path"
                    :collapse="isCollapse"
                    :item="route" />
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup>
import logo from '@/layout/components/Logo/Logo';
import SidebarItem from '@/layout/components/Sidebar/SidebarItem';
import { computed } from 'vue';
import { useSettingsStore, useAppStore, usePermissionStore } from '@/store';

const settingStore = useSettingsStore();
const appStore = useAppStore();
const permissionStore = usePermissionStore();

let permission_routes = permissionStore.routes;

const showLogo = computed(() => {
    return settingStore.sidebarLogo;
});
const isCollapse = computed(() => {
    return !appStore.sidebar.opened;
});
</script>
<style lang="scss" scoped></style>
