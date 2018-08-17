// import {MessageBox} from 'element-ui'
import ajax from '@/utils/ajax.js'
export const operationMixins={
    methods:{
        operationDel(row){
            let delMsg=this.deleteMsg || '此操作将永久删除该文件, 是否继续?'
            let _this=this
            this.$confirm(delMsg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                ajax({
                    url:this.baseUrl+'/'+row.id,
                    method:'delete'
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                      _this.refeshTable()
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            
        },
        operationDisable(row){
            let delMsg=this.deleteMsg || '此操作将禁用, 是否继续?'
            let _this=this
            let status=row.status===1?0:1
            this.$confirm(delMsg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                ajax({
                    url:this.baseUrl,
                    method:'put',
                    data:{
                        status,
                        id:row.id
                    }
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '禁用成功!'
                      });
                      _this.refeshTable()
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
        },
        refeshTable() {
            this.$refs["dataTable"].refresh();
        },
        seccessMsg(msg){
            this.$message({
                type: 'success',
                message: msg||'保存成功'
              });
        },
        formatterStatus(row,value){
            return value===0?'<span style="color:red">禁用</span>':'启用'
        }
    }
}