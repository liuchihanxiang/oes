<!--  -->
<template>
    <div>
        <element-table ref="dataTable" 
        :forms='forms'
        :url="baseUrl" 
        :columns='columns' 
        ></element-table>
    </div>
</template>

<script>
import ElementTable from "@/components/ElementTable";
export default {
    components: { ElementTable },
    data() {
        return {
            baseUrl:'/logs',
            forms:[
                {
                    prop: "username",
                    placeholder: "logManage.username"
                },
                {
                    prop: "flag",
                    placeholder: "logManage.logStatus",
                    itemType: "select",
                    options: [
                        { value: 1, label: "成功" },
                        { value: 0, label: "失败" }
                    ]
                },
                {
                    prop: 'createTime',
                    startPlaceholder:'common.startTime'	,
                    endPlaceholder:'common.endTime',
                    itemType:'daterange'
                },
            ],
            columns: [
                {
                    prop: "user",
                    label: "logManage.username",
                    formatter: (a, b) => {
                        return b.username
                    }
                },
                {
                    prop: "user",
                    label: "logManage.nickname",
                     formatter: (a, b) => {
                        return b.nickname
                    }
                },
                {
                    prop: "module",
                    label: "logManage.module"
                },
                {
                    prop: "flag",
                    label: "logManage.logStatus",
                    formatter: (a, b) => {
                        return b  ? "成功" : "失败";
                    }
                },
                {
                    prop: "createTime",
                    label: "logManage.createTime",
                },
                {
                    prop: "remark",
                    label: "table.remark"
                }
                
            ]
           
        };
    },
    methods: {
        
    }
};
</script>
<style lang='scss' scoped>
</style>