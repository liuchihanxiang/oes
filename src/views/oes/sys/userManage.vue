<!--  -->
<template>
    <div>
        <element-table ref="dataTable" 
        :forms="form" :url="baseUrl" 
        :columns='columns' 
        :btnList="btnList" 
        :operations="operation"></element-table>
        <!-- 创建编辑弹框 -->
        <form-dialog 
        ref="userInfo"
        width='500px' 
        :id="rowId"
        v-bind:is="FormDialog" 
        :baseUrl="baseUrl" 
        :formsList="createList"
        createTitle="userManage.createTitle" 
        editTitle="userManage.editTitle"     
        :refeshTable="refeshTable">
        </form-dialog>
        <!-- 勾选角色弹窗 -->
        <el-dialog
        title="添加角色"
        :visible.sync="showUserRoles"
        width="30%">
            <el-checkbox-group v-model="checkedRoles" >
             <el-checkbox v-for="(role,roleIndex) in allRoles" :label="role.id"  :key="roleIndex">{{role.name}}</el-checkbox>
            </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showUserRoles = false">取 消</el-button>
            <el-button type="primary" @click="saveAddroles">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import ElementTable from "@/components/ElementTable";
import FormDialog from "@/components/ElementDialog";
import { saveUserRoles, getSingleUser } from "@/api/userManage";
import { operationMixins } from '@/mixins/tableOperation.js';
import {userRole} from "@/api/roleManage";
import axios from 'axios'
export default {
    components: { ElementTable, FormDialog },
    mixins:[operationMixins],
    data() {
        return {
            FormDialog:'FormDialog',
            showUserRoles:false,
            baseUrl:'/users',
            allRoles:[],
            checkedRoles:[],
            rowId: "",
            btnList: [
                {
                    text: "table.new",
                    click: this.showUserInfo
                }
            ],
            createList: [
                {
                    prop: "username",
                    label: "userManage.username",
                    rules: [{ required: true, message: "请输入用户名" }]
                },
                { prop: "telephone", label: "userManage.telephone" },
                {
                    prop: "birthday",
                    label: "userManage.birthday",
                    itemType: "date"
                },
                {
                    prop: "password",
                    label: "userManage.password",
                    default:123456,
                    style:'display: none',
                },
                {
                    prop: "status",
                    label: "userManage.status",
                    itemType: "switch",
                    activeValue:1,
                    inactiveValue:0,
                    default:1,
                    options: [
                        { value: 1, label: "启用" },
                        { value: 0, label: "禁用" }
                    ]
                },
                {
                    prop: "sex",
                    label: "userManage.sex",
                    itemType: "select",
                    default:0,
                    options: [
                        { value: 0, label: "男" },
                        { value: 1, label: "女" }
                    ]
                }
            ],
            form: [
                {
                    prop: "username",
                    placeholder: "userManage.username"
                },
                { prop: "telephone", placeholder: "userManage.telephone" },
                {
                    prop: "birthday",
                    placeholder: "userManage.birthday",
                    itemType: "date"
                },
                {
                    prop: "sex",
                    placeholder: "userManage.sex",
                    itemType: "select",
                    options: [
                        { value: 1, label: "男" },
                        { value: 0, label: "女" }
                    ]
                }
            ],
            columns: [
                {
                    type:'selection'
                },
                {
                    prop: "username",
                    label: "userManage.username"
                },
                {
                    prop: "nickname",
                    label: "userManage.nickname"
                },
                {
                    prop: "birthday",
                    label: "userManage.birthday"
                },
                {
                    prop: "telephone",
                    label: "userManage.telephone"
                },
                {
                    prop: "sex",
                    label: "userManage.sex",
                    formatter: (a, b) => {
                        return b === 1 ? "男0" : "女";
                    }
                },
                {
                    prop: "status",
                    label: "userManage.status",
                    formatter: this.formatterStatus
                }
            ],
            operation: [
                {
                    icon: "el-icon-edit-outline",
                    click: this.showUserInfo,
                    text: "table.edit"
                },
                {
                    icon: "el-icon-refresh",
                    click: this.showUserInfo,
                    text: "table.resetPassword",
                },
                 {
                    icon: "el-icon-plus",
                    click: this.addRoles,
                    text: "userManage.addRoles",
                },
                {
                    icon: "el-icon-delete",
                    click: this.operationDel,
                    text: "table.delete"
                },
                {
                    icon: "el-icon-circle-close-outline",
                    click: this.operationDisable,
                    text: "table.disable",
                    judges:{status:1},
                },
                {
                    icon: "el-icon-circle-check-outline",
                    click: this.operationDisable,
                    text: "table.enable",
                    judges:{status:0},
                }
            ]
        };
    },
    methods: {
        showUserInfo(row) {
            if (row && row.id) {
                this.rowId = row.id;
            } else {
                this.rowId = "";
            }
            this.$refs["userInfo"].open(this.rowId);
        },
        addRoles(row){
            userRole(row.id).then(v=>{
                this.rowId = row.id;
                this.showUserRoles=true
                this.allRoles=v.data.allRoles
                this.checkedRoles=v.data.selectedRoles.map(e=>{
                        return e.id
                })
            })
        },
        saveAddroles(){
            saveUserRoles({
                id:this.rowId,
                roleIds:this.checkedRoles
            }).then(res=>{
                this.showUserRoles=false
                this.seccessMsg()
            })
        }
    },
    mounted(){
        debugger
    }
};
</script>
<style lang='scss' scoped>
</style>