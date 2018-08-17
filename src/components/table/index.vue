<!--  -->
<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column  v-for="(item,index) in columns" :key="index" :prop="item.prop" :label="item.label">
            </el-table-column>
            <el-table-column v-if="operation.length"  fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button v-for="(item,index) in operation" @click="item.click(scope.row)" :key="index" type="text" size="small">{{item.text}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="ifPagination" class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.currentPage" :page-sizes="pageSizes" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pageSizes: {
            type: Array,
            default: function() {
                return [10, 20, 30, 50];
            }
        },
        total: {
            type: Number
        },
        columns: {
            type: Array,
            required: true
        },
        tableData: {
            type: Array,
            required: true
        },
        getList: {
            type: Function
        },
        operation:{
            type:Array,
            default:function(){
                return []
            }
        },
        ifPagination: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            pageParams: {
                currentPage: 1,
                pageSize: 10
            }
        };
    },
    methods: {
        handleSizeChange(val) {
            this.pageParams.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageParams.currentPage = val;
            this.getList();
        }
    }
};
</script>
<style lang='scss' scoped>

</style>