<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="param"
      label="参数"
      >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="说明"
      >
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      >
      </el-table-column>
      <el-table-column
      prop="isRequired"
      label="是否必填"
      >
    </el-table-column>
    <el-table-column
      prop="default"
      label="默认值">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          param: 'url',
          remark: '表格请求数据的地址',
          isRequired:'否',
          type: 'Sting',
          default:''
        },{
          param: 'pagination',
          remark: '是否显示分页（支持前端分页）',
          isRequired:'否',
          type: 'Boolean',
          default:'true'
        },{
          param: 'forms',
          remark: '是否显示表格上方的form表单查询，详细配置参看表单组件',
          isRequired:'否',
          type: 'Array',
          default:'[]'
        },{
          param: 'treeTable',
          remark: '是否显示树形表格，只接受父子结构数据',
          isRequired:'否',
          type: 'Boolean',
          default:'false'
        },{
          param: 'columns',
          remark: '表格列配置，详细参看element-ui表格组件',
          isRequired:'否',
          type: 'Array',
          default:'[]'
        },{
          param: 'operations',
          remark: '表格左侧操作，接受数组，更详细参数参见下面',
          isRequired:'否',
          type: 'Array',
          default:'[]'
        },{
          param: 'btnList',
          remark: '表格上方操作按钮，可放批量删除 创建 导入等功能按钮',
          isRequired:'否',
          type: 'Array',
          default:'[]'
        }]
      }
    }
  }
</script>

<style lang='scss' scoped>

 
</style>
