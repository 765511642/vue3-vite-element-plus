<template>
	<div class="errPage-container">
		<el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back"> 返回 </el-button>
		<el-row>
			<el-col :span="12">
				<h1 class="text-jumbo text-ginormous">Oops!</h1>
				<h2>你没有权限去该页面</h2>
				<h6>如有不满请联系你领导</h6>
			</el-col>
			<el-col :span="12">
				<img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
			</el-col>
		</el-row>
		<el-dialog v-model:visible="dialogVisible" title="随便看">
			<img :src="ewizardClap" class="pan-img" />
		</el-dialog>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import errI from '@/assets/images/error/401.gif';

const route = useRoute();
const router = useRouter();
let errGif = ref(errI + '?' + +new Date());
let ewizardClap = ref('https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646');
let dialogVisible = ref(false);

const back = () => {
	if (route.query.noGoBack) {
		router.push({
			path: '/dashboard'
		});
	} else {
		router.go(-1);
	}
};
</script>

<style lang="scss" scoped>
.errPage-container {
	width: 800px;
	max-width: 100%;
	margin: 100px auto;
	.pan-back-btn {
		background: #008489;
		color: #fff;
		border: none !important;
	}
	.pan-gif {
		margin: 0 auto;
		display: block;
	}
	.pan-img {
		display: block;
		margin: 0 auto;
		width: 100%;
	}
	.text-jumbo {
		font-size: 60px;
		font-weight: 700;
		color: #484848;
	}
	.list-unstyled {
		font-size: 14px;
		li {
			padding-bottom: 5px;
		}
		a {
			color: #008489;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
