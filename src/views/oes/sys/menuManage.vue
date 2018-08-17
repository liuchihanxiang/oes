<!--  -->
<template>
    <div>
        <element-table ref="dataTable" 
        :forms="form" :url="'/permissions/all'" 
        :columns='columns' 
        :is-international='true'
        :tree-table="true"
        :pagination="false"
        :list-field="'data'"
        :btnList="btnList" 
        :operations="operation"></element-table>
        
        <form-dialog 
        ref="userInfo" 
        :id="rowId"
        baseUrl="/permissions" 
        :formsList="createList"
        :beforeSave='beforeSave'
        :saveSuccess='saveSuccess'
        createTitle="userManage.createTitle" 
        editTitle="userManage.editTitle"     
        :refeshTable="refeshTable">
        </form-dialog>
    </div>
</template>

<script>
import ElementTable from "@/components/ElementTable";
import FormDialog from "@/components/ElementDialog";
import { saveUser, getSingleUser } from "@/api/userManage";
import { operationMixins } from '@/mixins/tableOperation.js';
export default {
    components: { ElementTable, FormDialog },
    mixins:[operationMixins],
    data() {
        return {
            rowId: "",//行id
            baseUrl:'/permissions',
            isInTableCreate:false,
            parentId:0,
            btnList: [
                {
                    text: "menuManage.btnNew",
                    click: this.showUserInfo
                }
            ],
            createList: [
                {
                    prop: "name",
                    label: "menuManage.name",
                    rules: [{ required: true, message: "菜单名称" }]
                },
                { 
                    prop: "icon",
                    label: "menuManage.icon",
                    class:''
                },
                {
                    prop: "router",
                    label: "menuManage.router",
                    class:''
                },
                 {
                    prop: "routerName",
                    label: "menuManage.routerName",
                    class:''
                },
                {
                    prop: "component",
                    label: "menuManage.component",
                    class:''
                },
                 {
                    prop: "sort",
                    label: "menuManage.sort",
                    itemType:'number'
                },
                {
                    prop: "type",
                    label: "menuManage.type",
                    itemType: "select",
                    options: [
                        { value: 1, label: "菜单" },
                        { value: 2, label: "按钮" }
                    ]
                }
                
            ],
            form: [
                {
                    prop: "name",
                    placeholder: "menuManage.name"
                },
                { 
                    prop: "icon",
                     placeholder: "menuManage.icon"
                 },
                 { 
                    prop: "router",
                     placeholder: "menuManage.router"
                 },
                 { 
                    prop: "type",
                     placeholder: "menuManage.type"
                 },
            ],
            columns: [
                {
                    prop: "name",
                    label: "menuManage.name"
                },
                {
                    prop: "icon",
                    label: "menuManage.icon"
                //     formatter: (row, value) => {
                //         return '<svg-icon icon-class="'+value+'"></svg-icon>'
                //     }
                },
                {
                    prop: "router",
                    label: "menuManage.router"
                },
                {
                    prop: "type",
                    label: "menuManage.type",
                    formatter: (a, b) => {
                        return b === 1? "菜单" : "按钮";
                    }
                }
            ],
            operation: [
                {
                    icon: "el-icon-edit-outline",
                    click: this.showUserInfo,
                    text: "table.edit"
                },
                {
                    icon: "el-icon-plus",
                    click: this.showUserInfo,
                    text: "table.new",
                    class:"create",
                    judges:{type:1}
                },
                {
                    icon: "el-icon-delete",
                    click: this.operationDel,
                    text: "table.delete"
                },
                {
                    icon: "el-icon-circle-close-outline",
                    click: this.showUserInfo,
                    text: "table.disable",
                    judges:{status:1},
                },
                {
                    icon: "el-icon-circle-check-outline",
                    click: this.showUserInfo,
                    text: "table.enable",
                    judges:{status:0},
                }
            ]
        }
    },
    methods: {
        beforeSave(data){
            if(this.isInTableCreate){//点击table内创建
                return {...data,parentId:this.parentId}
            }else{
                if(data.parentId===undefined){//点击创建一级菜单 
                    data.parentId=0
                }
                return data
            }
        },
        saveSuccess(){
            if(this.isInTableCreate){
                console.log(111)
            }
        },
        showUserInfo(row,event) {
            let _this = this;
            this.isInTableCreate=event?event.target.className.indexOf('create')>=0:false//判断是否为点击的table中的创建
            if (row && row.id && !this.isInTableCreate) {
                    this.rowId = row.id;
            } else {
                this.rowId = "";
            }
            if(this.isInTableCreate){
                this.parentId=row.id
            }
            console.log(row);
            if(row&&(row._level===3||(row._level===2&&this.isInTableCreate))){
                this.$set(this.createList[1],'class','hide')
                this.$set(this.createList[2],'class','hide')
            }else{
                this.$set(this.createList[1],'class','')
                this.$set(this.createList[2],'class','')
            }
            this.$refs["userInfo"].open(this.rowId);
        }
    }
};
</script>
<style lang='scss' scoped>

</style>