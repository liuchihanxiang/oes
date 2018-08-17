<!--  -->
<template>
    <div>
        <element-table ref="dataTable" 
        :forms="form" 
        :url="baseUrl" 
        :columns='columns' 
        :btnList="btnList"
        :operations="operation"></element-table>

        <el-dialog
        title="授权管理"
        :visible.sync="showRoleMenu"
        width="30%">
            <el-tree
            ref="treeMenu"
            :data="menuList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="checkMenu"
            :default-checked-keys='checkMenu'
            :props="{label:'name'}">
            </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showRoleMenu = false">取 消</el-button>
            <el-button type="primary" @click="saveMenu">确 定</el-button>
        </span>
        </el-dialog>

        <form-dialog 
        ref="userInfo"
        width="500px" 
        :id="rowId"
        :baseUrl="baseUrl"
        :formsList="createList"
        createTitle="userManage.createTitle" 
        editTitle="userManage.editTitle"     
        :refeshTable="refeshTable">
        </form-dialog>
    </div>
</template>

<script>
import ElementTable from "@/components/ElementTable";
import FormDialog from "@/components/ElementDialog";
import { baseRole } from "@/api/roleManage";
import {getMenuList,getMenuListByRoleId} from '@/api/menuManage' 
import { operationMixins } from '@/mixins/tableOperation.js';
import axios from 'axios'
export default {
    components: { ElementTable, FormDialog },
    mixins:[operationMixins],
    data() {
        return {
            baseUrl:'/roles',
            rowId: "",
            name:'',
            leafArr:[],
            menuList:[],
            checkMenu:[],
            showRoleMenu:false,
            btnList: [
                {
                    text: "table.new",
                    click: this.showUserInfo
                }
            ],
            createList: [
                {
                    prop: "name",
                    label: "roleManage.name",
                    rules: [{ required: true, message: "请输入用户名" }]
                },
                { prop: "description", label: "roleManage.description" },
            ],
            form: [
                {
                    prop: "name",
                    placeholder: "roleManage.name"
                },
                { prop: "description", placeholder: "roleManage.description" },
                {
                    prop: "updateTime",
                    placeholder: "table.updateTime",
                    itemType: "date"
                }
            ],
            columns: [
                {
                    type:'selection'
                },
                {
                    prop: "name",
                    label: "roleManage.name"
                },
                {
                    prop: "description",
                    label: "roleManage.description"
                },
                {
                    prop: "updateTime",
                    label: "table.updateTime"
                }
            ],
            operation: [
                {
                    icon: "el-icon-edit-outline",
                    click: this.showUserInfo,
                    text: "table.edit"
                },
                ,
                {
                    svgIcon: "menuManage",
                    click: this.Authorization,
                    text: "table.check"
                },
                {
                    icon: "el-icon-delete",
                    click: this.operationDel,
                    text: "table.check"
                }
                // {
                //     icon: "el-icon-circle-close-outline",
                //     click: this.showUserInfo,
                //     text: "table.disable",
                //     judges:{status:1},
                // },
                // {
                //     icon: "el-icon-circle-check-outline",
                //     click: this.showUserInfo,
                //     text: "table.enable",
                //     judges:{status:0},
                // }
            ]
        };
    },
    methods: {
        showUserInfo(row) {
            let _this = this;
            if (row && row.id) {
                this.rowId = row.id;
            } else {
                this.rowId = "";
            }
            this.$refs["userInfo"].open(this.rowId);
        },
        getMenuId(data,leafArr){
            let arr=[]
           data.map(e=>{
               if(leafArr.indexOf(e.id)>=0){
                arr.push(e.id)
               }
            })
            return arr
        },
        getLeafNode(data){
            let leafArr=[]
            let getdata=function(arr){
                arr.map(element => {
                    console.log(1);
                    if(element.children&&element.children instanceof Array&&element.children.length){
                        getdata(element.children)
                    }else{
                        leafArr.push(element.id)
                    }
                });
            }
            getdata(data)
            return leafArr
        },
        //获取角色菜单
        Authorization(row){
            let _this=this
            axios.all([getMenuList(),getMenuListByRoleId(row.id)]).then(axios.spread(function(allMenu,roleMneu){
                _this.showRoleMenu=true
                _this.rowId=row.id
                _this.name=row.name
                _this.menuList=allMenu.data
               let leafArr= _this.getLeafNode(allMenu.data)
                _this.checkMenu=_this.getMenuId(roleMneu.data,leafArr)
            }))
        },
        //保存角色菜单
        saveMenu(){
            let _this=this
           let permissionIds=this.$refs.treeMenu.getCheckedKeys()
           let parentId=this.$refs.treeMenu.getHalfCheckedKeys()
            baseRole('post',{id:this.rowId,name:this.name,permissionIds:[...permissionIds,...parentId]}).then(res=>{
                _this.refeshTable()
                _this.showRoleMenu=false
                _this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
            })
        }
    }
};
</script>
<style lang='scss' scoped>
</style>