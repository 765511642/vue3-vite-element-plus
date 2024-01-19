<template>
    <div class="navbar">
        <appHamburger :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar" />
        <appBreadcrumb class="breadcrumb-container" />
        <div class="right-menu">
            <el-dropdown class="avatar-container"
                size="small">
                <div class="avatar-wrapper">
                    <img src="https://i.gtimg.cn/club/item/face/img/2/15922_100.gif"
                        class="user-avatar" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="user-dropdown"
                        size="">
                        <router-link to="/">
                            <el-dropdown-item> 首页 </el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided
                            @click="toPage('/user')">
                            <span style="display: block"> <span :class="{active: fontColor('/user/index')}">个人中心</span> </span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="dialogVisible = true">
                            <span style="display: block"> 切换用户 </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided
                            @click="toPage('/taskList')">
                            <span style="display: block"> <span :class="{active: fontColor('/taskList/index')}">我的任务 {{ taskNum }}</span> </span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="toPage('/examine')">
                            <span style="display: block"> <span :class="{active: fontColor('/examine/index')}">审批任务 {{ examineNum }}</span></span>
                        </el-dropdown-item>
                        <el-dropdown-item divided
                            @click="toPage('/helpCentral')">
                            <span style="display: block"> <span :class="{active: fontColor('/helpCentral/index')}">帮助中心</span> </span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="toPage('/gpt')">
                            <span style="display: block"> <span :class="{active: fontColor('/gpt/index')}">GPT查询</span> </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided
                            @click="logout">
                            <span style="display: block"> 退出 </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <appHeadUtils />
        <el-dialog v-model="dialogVisible"
            title="选择商户"
            :z-index="9999"
            :append-to-body="true"
            width="50vw">
            <div class="clearfix merchant-list">
                <el-row :gutter="12">
                    <template v-for="(item, index) in merchantList"
                        :key="index">
                        <el-col :span="4">
                            <div class="merchant-item"
                                :class="{active: index === activeIndex}"
                                @click="activeIndex = index">{{ item.name }}</div>
                        </el-col>
                    </template>
                </el-row>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary"
                        @click="toggleCompany">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import appHamburger from './Hamburger';
import appBreadcrumb from './Breadcrumb';
import appHeadUtils from './HeadUtils';
import { useAppStore, useUserStore } from '@/store';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
const router = useRouter();
const route = useRoute();
let userStore = useUserStore();
let appStore = useAppStore();
let dialogVisible = ref(false);
let merchantList = ref([
    {
        name: '商户1'
    },
    {
        name: '商户2'
    },
    {
        name: '商户3'
    }
]);
let activeIndex = ref();
let taskNum = ref(0);
let examineNum = ref(0);
const sidebar = computed(() => {
    return appStore.sidebar;
});
const toggleSideBar = () => {
    appStore.TOGGLE_SIDEBAR();
};
const logout = () => {
    ElMessageBox.alert('确定要退出新东方国际游学系统吗？', 'Title', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        callback: (action) => {
            console.log(action);
            if (action === 'confirm') {
                ElMessage({
                    type: 'success',
                    message: `logout success`,
                });
                userStore.LOGOUT().then(() => {
                    // router.replace(`/login?redirect=${route.fullPath}`);
                    router.replace(`/login`);
                });
            }
        },
    });

};

const toggleCompany = () => {
    let selectMerchant = merchantList.value[activeIndex.value];
    console.log('切换商户', selectMerchant);
    dialogVisible.value = false;
};
const toPage = (path) => {
    if (!path) {
        return;
    }
    router.push(path);
};
const fontColor = (path) => {
    return route.fullPath === path;
};

</script>
<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	user-select: none;
	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.05);
		}
	}
	.breadcrumb-container {
		float: left;
	}
	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}
		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;
				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}
		.avatar-container {
			margin-right: 30px;
			:focus {
				outline: 0；;
			}
			.avatar-wrapper {
				margin-top: 5px;
				position: relative;
				outline: 0;
				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
.merchant-item {
	user-select: none;
	cursor: pointer;
	padding: 15px 10px;
	border-radius: 6px;
	border: 1px solid #e4e7ed;
	box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
	margin-bottom: 20px;
	transition: all 0.2s;
}
.user-dropdown {
	.active {
		color: var(--el-color-primary);
	}
}
.merchant-list {
	.active {
		background: var(--el-color-primary);
		color: #fff;
	}
}
</style>
