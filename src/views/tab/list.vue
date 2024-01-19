<template>
    <div>
        <div>
            <el-form :inline="true"
                :model="formInline"
                class="demo-form-inline">
                <el-form-item label="Approved by">
                    <el-input v-model="formInline.input"
                        placeholder="Approved by" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click="search">search</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="tableData"
                border
                highlight-current-row
                style="width: 100%">
                <el-table-column fixed
                    prop="date"
                    label="Date"
                    width="150" />
                <el-table-column prop="name"
                    label="Name"
                    width="120" />
                <el-table-column prop="name"
                    label="Name"
                    width="120" />
                <el-table-column prop="name"
                    label="Name"
                    width="120" />
                <el-table-column prop="state"
                    label="State"
                    width="120" />
                <el-table-column prop="city"
                    label="City"
                    width="120" />
                <el-table-column prop="address"
                    label="Address"
                    width="600" />
                <el-table-column prop="zip"
                    label="Zip"
                    width="120" />
                <el-table-column fixed="right"
                    label="Operations"
                    width="120">
                    <template #default>
                        <el-button link
                            type="primary"
                            @click="handleClick">Detail</el-button>
                        <el-button link
                            type="primary">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="center mt20">
                <el-pagination background
                    small
                    v-model:current-page="currentPage"
                    v-model:page-size="sizeMax"
                    :page-sizes="[100, 200, 300, 400]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="4000"
                    :pager-count="15"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from "vue";
let formInline = reactive({
    input: ''
});

const handleClick = () => {
    console.log('click');
};
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
];
const currentPage = ref(2);   // 当前页数
const sizeMax = ref(100);   // 多少条一页
const handleSizeChange = (e) => {
    console.log(`数据${e}条 1页`);
};
const handleCurrentChange = (e) => {
    console.log(`查询第${e}页`);
};
const search = () => {
    console.log(formInline);
};
</script>
<style scoped>
</style>
