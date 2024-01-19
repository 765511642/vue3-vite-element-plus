<template>
    <div>
        <el-card class="box-card">
            <div class="clearfix">
                <div class="card-header fl">
                    <div class="user-avatar">
                        <img src="https://i.gtimg.cn/club/item/face/img/2/15922_100.gif" />
                    </div>
                </div>
                <div class="fl ml30 card-center">
                    <div class="mt10">姓名：xxxx</div>
                    <div class="mt10">性别：xxxx</div>
                    <div class="mt10">部门：xxxx</div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card mt20">
            <el-tabs class="demo-tabs"
                size="small"
                :stretch="true"
                tab-position="left"
                @tab-click="handleClick">
                <el-tab-pane label="基本信息">User</el-tab-pane>
                <el-tab-pane label="权限信息">Config</el-tab-pane>
                <el-tab-pane label="联系方式">
                    <template #label>
                        <el-tooltip effect="dark"
                            content="（手机号、Email用于绑定用户钉钉，请务必填写正确）"
                            placement="top-start">
                            <el-icon color="#ee7d31">
                                <Warning />
                            </el-icon>
                        </el-tooltip>
                        <span class="pane-title">
                            <span>联系方式</span>
                        </span>
                    </template>
                    阿萨德
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <div class="mt30">
            <el-button class="btn"
                type="primary">保存</el-button>
        </div>
    </div>
</template>
<script setup>
const handleClick = () => {

};
</script>
<style lang="scss" scoped>
.card-header {
	.user-avatar {
		img {
			width: 80px;
			height: 80px;
			border-radius: 100%;
		}
	}
}
.box-card {
	.card-center {
		font-size: 14px;
		font-weight: 500;
	}
}
.pane-title {
	margin-left: 5px;
}
.btn {
	display: block;
	margin: 0 auto;
}
</style>