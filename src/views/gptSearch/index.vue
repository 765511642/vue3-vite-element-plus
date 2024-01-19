<template>
    <div>
        <div class="search_div">
            <el-form :inline="true"
                :model="form"
                class="search_form">
                <el-form-item label="产品名称">
                    <el-input v-model="form.productName"
                        placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item><el-button type="primary">查询</el-button></el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="tableData">
                <el-table-column label="序号"
                    type="index"
                    align="center"
                    width="80" />
                <el-table-column prop="Date"
                    align="center"
                    label="产品名称" />
                <el-table-column prop="Name"
                    align="center"
                    label="创建人" />
                <el-table-column prop="Address"
                    align="center"
                    label="创建时间" />
                <el-table-column prop="Date"
                    align="center"
                    label="最后修改人" />
                <el-table-column prop="Name"
                    align="center"
                    label="最后修改时间" />
                <el-table-column fixed="right"
                    label="操作"
                    align="center"
                    width="80">
                    <template #default="scope">
                        <el-button link
                            type="primary"
                            @click="seeDataRow(scope.$index, scope.row)">查看</el-button>
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
    
<script setup name="gptIndex">
import { ref, reactive } from "vue";
let form = reactive({
    productName: '',
});
let tableData = ref([{}]);
let total = ref(1000);
let page = reactive({
    pageSize: 20,
    pageNum: 1
});
const handleSizeChange = (e) => {
    console.log(e, page.pageSize);
};
const seeDataRow = (index, row) => {
    console.log(row);
};
const handleCurrentChange = (e) => {
    console.log(e, page.pageNum);
};
</script>


<style scoped lang="scss">
</style>