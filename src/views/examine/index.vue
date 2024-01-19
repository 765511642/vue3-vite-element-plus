<template>
    <div>
        <div class="search_div">
            <el-form :inline="true"
                :model="form"
                class="search_form">
                <el-form-item label="状态:">
                    <el-select v-model="form.status">
                        <el-option v-for="(item, index) in statusOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="审批类别:">
                    <el-select v-model="form.examineType">
                        <el-option v-for="(item, index) in examineTypeOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <template #label>
                        <label>发起日期:</label>
                    </template>
                    <el-date-picker v-model="form.fqrq"
                        value-format="YYYY-MM-DD"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" />
                </el-form-item>
                <el-form-item label="提交人:">
                    <el-input v-model="form.tjr"
                        placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="任务名称:">
                    <el-input v-model="form.rwmc"
                        placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="发起部门:">
                    <el-tree-select v-model="form.fqbm"
                        :data="departmentOptions"
                        filterable
                        class="custom-tree-select"
                        multiple
                        clearable
                        collapse-tags
                        collapse-tags-tooltip
                        :max-collapse-tags="2"
                        placeholder="请选择发起部门"
                        :render-after-expand="false">
                    </el-tree-select>
                </el-form-item>
            </el-form>
            <div class="search_btns clearfix">
                <el-button class="fr"
                    type="primary">查询</el-button>

            </div>
        </div>
        <div class="mt10">
            <el-table :data="tableData">
                <el-table-column label="序号"
                    type="index"
                    align="center"
                    fixed="left"
                    width="80" />
                <el-table-column prop="Date"
                    align="center"
                    label="任务类型" />
                <el-table-column prop="Name"
                    align="center"
                    label="任务名称" />
                <el-table-column prop="Address"
                    align="center"
                    label="节点备注" />
                <el-table-column prop="Date"
                    align="center"
                    label="处理状态" />
                <el-table-column prop="Name"
                    align="center"
                    label="节点" />
                <el-table-column prop="Address"
                    align="center"
                    label="审批规则" />
                <el-table-column prop="Date"
                    align="center"
                    label="发起人" />
                <el-table-column prop="Name"
                    align="center"
                    label="发起部门" />
                <el-table-column prop="Name"
                    align="center"
                    label="发起时间" />
                <el-table-column prop="Address"
                    align="center"
                    label="创建时间" />
                <el-table-column fixed="right"
                    label="操作"
                    align="center"
                    width="230">
                    <template #default="scope">
                        <el-button link
                            type="primary"
                            @click="handleClick(scope.$index, scope.row)">节点备注</el-button>
                        <el-button link
                            type="primary"
                            @click="handleClick(scope.$index, scope.row)">查看</el-button>
                        <el-button link
                            type="primary"
                            @click="handleClick(scope.$index, scope.row)">处理</el-button>
                        <el-button link
                            type="primary"
                            @click="handleClick(scope.$index, scope.row)">审批查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="center mt10">
            <el-pagination background
                small
                v-model:current-page="page.pageNum"
                v-model:page-size="page.pageSize"
                :page-sizes="[100, 200, 300, 400]"
                layout="prev, pager, next, total, jumper, sizes"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script setup name="examineIndex">
import { ref, reactive } from "vue";
let form = reactive({
    status: null,
    examineType: null
});
let statusOptions = ref([
    {
        label: '全部',
        value: '0'
    },
    {
        label: '代办',
        value: '1'
    },
    {
        label: '已办',
        value: '2'
    },
    {
        label: '过期',
        value: '3'
    }
]);
let examineTypeOptions = ref([
    {
        label: '全部',
        value: '3'
    },
    {
        label: '线路审批',
        value: '3'
    },
    {
        label: '首次预算审批',
        value: '3'
    }
]);
let departmentOptions = ref([
    {
        value: '1',
        label: '国际游学',
        children: [
            {
                value: '1-1',
                label: '销售中心'
            },
            {
                value: '1-2',
                label: '襄阳分校'
            },
            {
                value: '1-3',
                label: '销售中心'
            },
            {
                value: '1-4',
                label: '襄阳分校'
            },
            {
                value: '1-5',
                label: '销售中心'
            },
            {
                value: '1-6',
                label: '襄阳分校'
            }
        ]
    }
]);
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
const handleClick = (index, row) => {
    console.log(row);
};
</script>
<style scoped lang="scss">
</style>