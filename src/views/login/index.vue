<script setup>
import { useUserStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { UserFilled, Lock, Unlock } from '@element-plus/icons-vue';
const ruleFormRef = ref();
const redirect = ref('');
const otherQuery = ref('');
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const getOtherQuery = (query) => {
    return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
            acc[cur] = query[cur];
        }
        return acc;
    }, {});
};
watch(
    () => router,
    () => {
        const query = route.query;
        if (query) {
            redirect.value = query.redirect;
            otherQuery.value = getOtherQuery(query);
        }
    },
    { immediate: true, deep: true }
);
const form = reactive({
    user: '',
    paswd: '',
    yzm: '',
});
const rules = reactive({
    user: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
    paswd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    yzm: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
});

const login = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            await userStore.LOGIN();
            router.push({
                path: '/'
                // path: redirect.value || '/'	// 路由动态添加，还没添加就跳转了，会出现404
            });
        }
    });
};
</script>
<template>
    <div class="login_div">
        <!-- <div class="image_div">
            <img src="../../assets/login_back.png"
                alt="">
        </div> -->
        <div class="login_form">
            <div class="login_form_card">
                <div class="title">欢迎登录</div>
                <el-form :model="form"
                    :rules="rules"
                    size="large"
                    ref="ruleFormRef"
                    class="demo-form-inline">
                    <el-form-item prop="user">
                        <el-input v-model="form.user"
                            placeholder="请输入用户名"
                            :prefix-icon="UserFilled"
                            clearable />
                    </el-form-item>
                    <el-form-item prop="paswd">
                        <el-input v-model="form.paswd"
                            :prefix-icon="Lock"
                            placeholder="请输入密码"
                            show-password
                            clearable />
                    </el-form-item>
                    <el-form-item prop="yzm">
                        <div class="form_code">
                            <el-input v-model="form.yzm"
                                placeholder="请输入验证码"
                                clearable />
                            <img class="code-img"
                                src="../../assets/login_back.png"
                                alt="验证码">
                        </div>
                    </el-form-item>
                </el-form>
                <div class="login_btn">
                    <el-button type="primary"
                        size="large"
                        @click="login">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login_div {
	height: 100%;
	background-image: url('@/assets/home.png');
	background-repeat: no-repeat;
	background-size: 60%;
	background-color: #7373da;
	background-position: 10% 50%;
	position: relative;
	overflow: hidden;
	.image_div {
		position: absolute;
		left: 275px;
		top: 100px;
		width: 600px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.login_form {
		position: absolute;
		right: 200px;
		top: 50%;
		transform: translateY(-50%);
		width: 380px;
		background-color: rgba(255, 255, 255, 0.1);
		padding: 10px;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		.login_form_card {
			width: 100%;
			height: 100%;
			padding: 35px;
			border-radius: 10px;
		}
		.title {
			font-size: 26px;
			text-align: center;
			margin-bottom: 26px;
			color: #fff;
		}
		.login_btn {
			padding-top: 18px;
		}
		.el-button {
			width: 100%;
		}
		:deep(.el-input__prefix-inner) {
			font-size: 17px;
			margin-left: 5px;
		}
		.form_code {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;
			.el-input {
				margin-right: 10px;
			}
			img {
				width: 145px;
				height: 32px;
				border-radius: 5px;
				cursor: pointer;
			}
		}
	}
}
</style>
