<template>
    <div>
        <el-tooltip class="box-item"
            effect="dark"
            content="系统设置"
            :offset="8"
            placement="top-start">
            <el-icon class="icon"
                title="系统设置"
                @click="open">
                <Setting />
            </el-icon>
        </el-tooltip>
        <el-drawer v-model="drawer"
            title="系统设置"
            append-to-body
            :z-index="9999"
            direction="rtl"
            :show-close="false">
            <span>
                <el-form label-position="left"
                    size="small"
                    label-width="120px">
                    <el-form-item label="是否固定头部:">
                        <el-switch v-model="settingStore.fixedHeader" />
                    </el-form-item>
                    <el-form-item label="是否显示菜单logo:">
                        <el-switch v-model="settingStore.sidebarLogo" />
                    </el-form-item>
                    <el-form-item label="系统组件大小:">
                        <el-radio-group v-model="settingStore.Elsize"
                            @change="changeSize">
                            <template v-for="item in sizeOptions"
                                :key="item.value">
                                <el-radio :label="item.value">{{ item.label }}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </span>
        </el-drawer>
    </div>
</template>
<script setup>
import { ref, nextTick, getCurrentInstance } from 'vue';
import { useSettingsStore, useTagsViewStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
const instance = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const settingStore = useSettingsStore();
const tagsViewStore = useTagsViewStore();
let drawer = ref(false);
let sizeOptions = ref([
    // {
    //     value: 'large',
    //     label: '大'
    // },
    {
        label: '默认',
        value: 'default'
    },
    {
        label: '小',
        value: 'small'
    }
]);
const open = () => {
    drawer.value = !drawer.value;
};
const changeSize = (e) => {
    instance.appContext.config.globalProperties.ELEMENTCONFIG.size = e;
    settingStore.CHANGE_SETTING('Elsize', e);
    refreshView();
};
const refreshView = () => {
    let { fullPath } = route;
    tagsViewStore.DEL_ALL_CACHED_VIEWS();
    nextTick(() => {
        router.replace({
            path: fullPath
        });
    });
};
</script>
<style scoped lang="scss">
.icon {
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		color: var(--el-color-primary);
	}
}
</style>