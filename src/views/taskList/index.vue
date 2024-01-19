<template>
    <div>
        <div class="search-center">
            <el-form :inline="true"
                :model="form"
                class="search-form">
                <el-form-item label="类型:">
                    <el-select v-model="form.type">
                        <el-option label="全部"
                            value="-1" />
                        <el-option label="商机回访"
                            value="0" />
                    </el-select>
                </el-form-item>

                <el-form-item label="状态:">
                    <el-select v-model="form.state">
                        <el-option label="全部"
                            value="-1" />
                        <el-option label="未完成"
                            value="0" />
                        <el-option label="已完成"
                            value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="创建人:">
                    <el-input v-model="form.createUser"
                        placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="任务名称:">
                    <el-input v-model="form.taskName"
                        placeholder="请输入关键字" />
                </el-form-item>

                <el-form-item>
                    <template #label>
                        <label>发起日期:</label>
                    </template>
                    <el-date-picker v-model="form.startTime"
                        class="custom-date-picker"
                        value-format="YYYY-MM-DD"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" />
                </el-form-item>
                <el-form-item>
                    <template #label>
                        <label>启动时间:</label>
                    </template>
                    <el-date-picker v-model="form.firingTime"
                        class="custom-date-picker"
                        value-format="YYYY-MM-DD"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" />
                </el-form-item>

            </el-form>
            <div class="search-btns clearfix">
                <el-dropdown class="fr"
                    trigger="click"
                    @command="handleCommand">
                    <el-button type="primary">按钮组
                        <el-icon><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="a"> 操作 </el-dropdown-item>
                            <el-dropdown-item command="b"> 编辑 </el-dropdown-item>
                            <el-dropdown-item command="c"> 删除 </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-button class="fr mr10"
                    type="primary">查询</el-button>
            </div>
        </div>
        <div class="mt10">
            <el-table :data="tableData">
                <el-table-column label="序号"
                    type="index"
                    width="80" />
                <el-table-column prop="date"
                    label="任务类型" />
                <el-table-column prop="Name"
                    label="任务名称" />
                <el-table-column prop="Address"
                    label="状态" />
                <el-table-column prop="Date"
                    label="发起人" />
                <el-table-column prop="Name"
                    label="任务创建时间" />
                <el-table-column prop="Address"
                    label="任务启动时间" />
                <el-table-column prop="Date"
                    label="任务截止时间" />
                <el-table-column prop="Name"
                    label="任务完成时间" />
            </el-table>
        </div>
        <div class="center mt10">
            <el-pagination background
                small
                v-model:current-page="page.pageNum"
                v-model:page-size="page.pageSize"
                :page-sizes="[100, 200, 300, 400]"
                layout="total, sizes,prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script setup name="taskListIndex">
import { reactive, ref } from "vue";
let form = reactive({
    type: '',
    state: '',
    taskName: '',
    startTime: '',
    firingTime: '',
    createUser: ''
});
let tableData = ref([]);
let total = ref(1000);
let page = reactive({
    pageSize: 20,
    pageNum: 1
});
const handleSizeChange = (e) => {
    console.log(e, page.pageSize);
};
const handleCurrentChange = (e) => {
    console.log(e, page.pageNum);
};
const handleCommand = (e) => {
    console.log(e);
};
</script>
<style scoped lang="scss">
.search-center {
	.search-form {
	}
	.search-btns {
	}
}
</style>