<template>
    <div>
        <template v-if="notifyList.length <= 0">
            <el-tooltip class="box-item"
                effect="dark"
                content="暂无通知"
                :offset="8"
                placement="top-start">
                <el-icon class="icon">
                    <Bell />
                </el-icon>
            </el-tooltip>
        </template>
        <template v-else>
            <el-dropdown class="avatar-container"
                size="small">
                <span>
                    <el-badge is-dot
                        style="border: none;">
                        <el-icon class="icon"
                            :size="16">
                            <Bell />
                        </el-icon>
                    </el-badge>
                </span>
                <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                        <el-dropdown-item v-for="(item, index) in notifyList"
                            :key="index"
                            @click="openNotifyInfo(item)">
                            <div>
                                {{ item.name }} {{ item.list.length }}
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
        <el-drawer v-model="drawer"
            direction="rtl">
            <template #header>
                <div class="drawer-title">{{ drawerTitle }}</div>
            </template>
            <el-scrollbar>
                <el-collapse accordion>
                    <template v-for="(item, index) in drawerList"
                        :key="index">
                        <el-collapse-item :title="item.title"
                            :name="index">
                            <div>
                                {{ item.content }}
                            </div>
                        </el-collapse-item>
                    </template>

                </el-collapse>
            </el-scrollbar>
        </el-drawer>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
let drawer = ref(false);
let drawerTitle = ref('');
let drawerList = ref([]);

let notifyList = ref([
    {
        name: '微信用户多次浏览线路',
        list: [
            {
                title: '我是第一条',
                content: '哈哈哈'
            },
            {
                title: '我是第一条',
                content: '哈哈哈'
            },
            {
                title: '我是第一条',
                content: '哈哈哈'
            },
            {
                title: '我是第一条',
                content: '哈哈哈'
            }
        ]
    },
    {
        name: '审批通过',
        list: []
    },
    {
        name: '商机源分配',
        list: []
    }
]);
const openNotifyInfo = (item) => {
    if (item.list.length <= 0) {
        ElMessage({
            showClose: true,
            message: `${item.name}暂时没有内容`,
            type: 'warning',
            size: 'small'
        });
        return;
    }
    drawerTitle.value = item.name;
    drawer.value = true;
    drawerList.value = item.list;
};
</script>
<style lang="scss" scoped>
// @import '../../styles/variables.module.scss';
.icon {
	cursor: pointer;
	transition: all 0.3s;
	color: #000;
	&:hover {
		// color: $menuActive;
		color: var(--el-color-primary);
	}
}
.drawer-title {
	font-weight: 700;
	color: #000;
}
</style>