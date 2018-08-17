<template>
    <div>
        <el-search-table
        ref="baseTable"
        :is-international='isInternational' 
        :formOptions="formOptions"
        :tree-table="treeTable"
        :btn-list="btnList"
        :isMobile='isMobile'
        :pagination='pagination'
        size='small'
        :paginationLayout='paginationLayout'
        header-row-class-name="base-table-header"
        :operations-only-show-icon="tableOnlyShowIcon"
        operation-more="table.operationMore"
        operation-text="table.operation"  
        :fetch="this.getList" 
        :columns='columns'
        :list-field="listField"
        :total-field="totalField"
        :operations="operations"
        ></el-search-table>
    </div>
</template>

<script>
import ajax from "@/utils/ajax";
import ElSearchForm from "@/components/serchForm";
import ElSearchTable from "@/components/el-search-table";
import { mapGetters } from "vuex";
export default {
  name: "ElementTable",
  components: { ElSearchForm, ElSearchTable },
  props: {
    url: String,
    pagination: {
      type: Boolean,
      default: true
    },
    btnList: {
      type: Array,
      default: () => []
    },
    isInternational: {
      type: Boolean,
      default: true
    },
    treeTable: {
      type: Boolean,
      default: false
    },
    listField: {
      type: String,
      default: "data.list"
    },
    totalField: {
      type: String,
      default: "data.total"
    },
    forms: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    operations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    let formOptions = {
      inline:!this.isMobile,
      searchBtn: {
        show: true
      },
      resetBtn: {
        show: true
      },
      forms: this.forms
    };
    return {
      formOptions: formOptions
    };
  },
  computed: {
    ...mapGetters(['isMobile','tableOnlyShowIcon']),
    paginationLayout(){
      if(this.isMobile){
        return 'total, prev, pager, next'
      }else{
        return 'total, prev, pager, next, jumper, sizes'
      }
    }
  },
  methods: {
    getList(params) {
      Object.keys(params).forEach(key => {
        if (
          params[key] === "" ||
          (params[key] instanceof Array && !params[key].length)
        ) {
          delete params[key];
        }
      });
      return ajax({
        url: this.url,
        method: "get",
        params: params
      });
    },
    refresh() {
      this.$refs["baseTable"].handlerRefresh();
    }
  }
};
</script>
<style lang="scss" >
.base-table-header th {
  background: #5092d7;
  color: #fff;
  text-align: center;
}
</style>
