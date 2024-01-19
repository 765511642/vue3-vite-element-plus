<template>
    <div>
        <div class="search_div">
            <el-form :inline="true"
                :model="form"
                class="search_form">
                <el-form-item label="文档类型">
                    <el-select v-model="form.documentType">
                        <el-option v-for="(item, index) in documentTypeOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="文档名称">
                    <el-input v-model="form.documentName"
                        placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button class="mr10"
                        type="primary">查询</el-button>
                    <el-button type="primary">文档下载</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="mt10">
            <el-table :data="tableData">
                <el-table-column label="序号"
                    type="index"
                    align="center"
                    width="80" />
                <el-table-column prop="Date"
                    align="center"
                    label="文档名称" />
                <el-table-column prop="Name"
                    align="center"
                    label="文档类型" />
                <el-table-column prop="Address"
                    align="center"
                    label="状态" />
                <el-table-column prop="Date"
                    align="center"
                    label="创建人" />
                <el-table-column prop="Name"
                    align="center"
                    label="创建时间" />
                <el-table-column prop="Name"
                    align="center"
                    label="最后修改人" />
                <el-table-column prop="Name"
                    align="center"
                    label="最后修改时间" />
            </el-table>
        </div>
        <div class="center mt10">
            <el-pagination background
                small
                v-model:current-page="page.pageNum"
                v-model:page-size="page.pageSize"
                :page-sizes="[20, 40, 60, 200, 400]"
                layout="prev, pager, next, total, jumper, sizes"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
      
<script setup name="helpCentralIndex">
import { ref, reactive } from "vue";
let documentTypeOptions = ref([
    {
        label: '全部',
        value: 'all'
    }
]);
let form = reactive({
    documentType: '',
    documentName: ''
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
</script>
  
  
  <style scoped lang="scss">
</style>