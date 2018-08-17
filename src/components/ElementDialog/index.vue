<!--  -->
<template>
    <el-dialog  v-el-drag-dialog :title="$t(title)" :visible.sync="visible" :width="width"  @close='closeDialog'>
        <el-search-form ref="myForm" :formValue='formValue' :submit-handler="saveInfo" :is-international="true" :inline="false" :forms="formsList"></el-search-form>
        <slot name="content"></slot>
        <span slot="footer" class="dialog-footer">
            <el-button v-if="cancelBtn" @click="visible = false">{{$t(cancelText)}}</el-button>
            <el-button v-if="yesBtn" type="primary" @click="yes">{{$t(confirmText)}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ElSearchForm from "@/components/serchForm";
import elDragDialog from '@/directive/el-dragDialog' 
import ajax from "@/utils/ajax";

export default {
    name: "FormDialog",
    components: { ElSearchForm },
    directives:{elDragDialog},
    props: {
        baseUrl: String,
        formsList: {
            type: Array,
            default: () => []
        },
        width:{
            type:String,
            default:'500px'
        },
        createTitle:{
            type:String,
            default:'dialog.createTitle'
        },
        editTitle:{
            type:String,
            default:'dialog.editTitle'
        },
        beforeSave:Function,
        refeshTable: Function,
        saveFn: Function,
        saveSuccess:Function,
        cancelBtn: {
            type: Boolean,
            default: true
        },
        cancelText:{
            type:String,
            default:'dialog.cancel'
        },
        confirmText:{
            type:String,
            default:'dialog.confirm'
        },
        yesBtn: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            title:'dialog.createTitle',
            formValue: {},
            visible: false,
            id:''
        };
    },
    methods: {
        yes() {
            this.$refs["myForm"].searchHandler()
        },
        saveInfo(params) {
            if (!this.baseUrl) {
                return false
            }
            let _this = this
            let type = this.id ? "put" : "post"
            let data=this.id?params:{...params,id:this.id}
            if(this.beforeSave){
                data=this.beforeSave(data)
            }
            if(data){
            ajax({
                url:this.baseUrl,
                method: type,
                data: data
            }).then(v => {
                _this.visible = false;
                if (_this.refeshTable) {
                    _this.refeshTable();
                }
                _this.saveSuccess&&_this.saveSuccess()
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
            })
        }
        },
        open(id) {
            let _this = this;
            this.id=id?id:'';
            if (this.id && this.baseUrl) {

                this.title=this.editTitle
                ajax({
                    url: this.baseUrl + "/" + this.id,
                    method: "get"
                }).then(res => {
                    _this.formValue = res.data
                    _this.visible = true
                });
            } else {
                 _this.visible = true
            }
        },
        closeDialog(){
             this.formValue = {};
        },
        close() {
            this.visible = false
        }
    }
   
};
</script>
<style lang='scss' scoped>
</style>