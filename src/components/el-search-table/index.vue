<!-- v-loading.lock="loading" -->
<template>
    <div class="el-perfect-table">
        <search-form ref="serchForm"
        v-if="formOptions"
        :is-international="isInternational"
        :inline="formOptions.inline"
        :label-width="formOptions.labelWidth"
        :status-icon="formOptions.statusIcon"
        :label-position="formOptions.labelPosition"
        :disabled="formOptions.disabled"
        :size="formOptions.size"
        :submit-loading="loading"
        :search-btn="formOptions.searchBtn"
        :reset-btn="formOptions.resetBtn"
        :submit-handler="searchHandler"
        :forms="formOptions.forms">
        </search-form>
        <slot name="form"  :search="searchHandler" />
        <div class="btnList-container">
            <el-button-group class="table-left-btnList pull-left" >
                <el-button  v-for="(btnItem,btnIndex) in btnList" v-if="btnItem.position!=='right'" :key="btnIndex" @click="btnItem.click" :type="btnItem.type?btnItem.type:'primary'">{{isInternational?$t(btnItem.text):btnItem.text}}</el-button>
            </el-button-group>
            <el-button-group class="table-right-btnList pull-right" >
                <el-button  v-for="(btnItem,btnIndex) in btnList" v-if="btnItem.position==='right'" :key="btnIndex" @click="btnItem.click" :type="btnItem.type?btnItem.type:'primary'">{{isInternational?$t(btnItem.text):btnItem.text}}</el-button>
                <el-button @click="handlerRefresh" v-if="refreshBtn" size='mini'><i class="el-icon-refresh"></i></el-button>
            </el-button-group>
        </div>
        
        <el-table
        ref="elBaseTable"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :is-international="isInternational"
        :data="formatData"
        :height="height"
        :max-height="maxHeight"
        :stripe="stripe"
        :border="border"
        :size="size"
        :fit="fit"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="treeTable?showRow:rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-style="headerRowStyle"
        :header-row-class-name="headerRowClassName"
        :header-cell-style="headerCellStyle"
        :row-key="rowKey"
        :empty-text="empyText"
        :default-expand-all="defautExpandAll"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :select-on-indeterminate="selectOnIndeterminate"
        style="width: 100%"
        @select="(selection, row) => emitEventHandler('select', selection, row)"
        @select-all="selection => emitEventHandler('select-all', selection)"
        @selection-change="selection => emitEventHandler('selection-change', selection)"
        @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
        @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
        @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
        @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
        @row-click="handlerSelect"
        @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
        @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
        @header-click="(column, event) => emitEventHandler('header-click', column, event)"
        @sort-change="args => emitEventHandler('sort-change', args)"
        @filter-change="filters => emitEventHandler('filter-change', filters)"
        @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
        @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
        @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)" 
        >
        <el-table-column
        v-if="columns[0].type&&type.indexOf(columns[0].type)>=0"
        :class-name="(columns[0].className||'')+' el-table-checkbox' " 
        :type="columns[0].type"
        :width="columns[0].width?columns[0].width:50">
        </el-table-column>
       <el-table-column
       :class-name="(columns[0].className||'')+' el-table-checkbox' " 
       v-if="columns[0].type==='radio'"  
       :width="columns[0].width?columns[0].width:50">
            <template slot-scope="scope">
                <el-radio  v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
        </el-table-column>
    
   <template v-if="!treeTable">
    <el-table-column 
      v-for="(column,columnIndex) in columns"
      v-if="!column.type"
      :key="columnIndex"
      :column-key="column.columnKey"
      :prop="column.prop"
      :label="isInternational?$t(column.label):column.label"
      :width="column.width"
      :min-width="column.minWidth"
      :fixed="column.fixed"
      :render-header="column.renderHeader"
      :sortable="column.sortable"
      :sort-method="column.sortMethod"
      :resizable="column.resizable"
      :show-overflow-tooltip="column.showOverflowTooltip?column.showOverflowTooltip:true"
      :align="column.align?column.align:'center'"
      :header-align="column.headerAlign"
      :class-name="column.className"
      :label-class-name="column.labelClassName"
      :selectable='column.selectable'
      :reserve-selection='column.reserveSelection'
      :filters="column.filters"
      :filter-placement="column.filterPlacement"
      :filter-multiple="column.filterMultiple"
      :filter-method="column.filterMethod"
      :filtered-value="column.filteredValue">
      <template slot-scope="scope" :scope="'scope'">
          <span v-if="column.filter">
            {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
          </span>
          <span v-else-if="column.slotName">
            <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
          </span>
          <span v-else-if="column.htmlFormatter">
            {{column.htmlFormatter ? column.htmlFormatter(scope.row,scope.row[column.prop]) : scope.row[column.prop] }}
          </span>
          <span v-else v-html="column.formatter ? column.formatter(scope.row,scope.row[column.prop]) : scope.row[column.prop] ">
          </span>
        </template>
    </el-table-column>
    </template>
    <template v-else>
        <el-table-column  v-for="(column, index) in columns" :key="index" :label="isInternational?$t(column.label):column.label" :width="column.width">
            <template slot-scope="scope">
                <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index,$event)">
                    <i v-if="!scope.row._expanded" :class="collapsedIcon"></i>
                    <i v-else :class="expandedIcon"></i>
                </span>
                <span v-if="column.filter">
                    {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
                </span>
                <span v-else-if="column.slotName">
                    <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
                </span>
                <span v-else-if="column.htmlFormatter">
                    {{column.htmlFormatter ? column.htmlFormatter(scope.row,scope.row[column.prop]) : scope.row[column.prop] }}
                </span>
                <span v-else v-html="column.formatter ? column.formatter(scope.row,scope.row[column.prop]) : scope.row[column.prop] ">
                </span>
            </template>
        </el-table-column>
    </template>

     <el-table-column
      fixed="right"
      :label="isInternational?$t(operationText):operationText"
      width="170"
      v-if="operations&&operations instanceof Array&&operations.length&&!isMobile"
      class-name="operation-list no-choose-row"
      >
        <template  slot-scope="scope">
          <template v-if="operationFormater(scope.row,operations)&&operationFormater(scope.row,operations).length&&(operationFormater(scope.row,operations).length<=operationsAutoDropdownMaxNum || !operationsAutoDropdown)">
            <template v-for="(operationItem,operationIndex) in operationFormater(scope.row,operations)">
            <el-button v-if="!operationsOnlyShowIcon" @click="operationItem.click(scope.row,$event)" :class="operationItem.class"  :key="operationIndex" class="operation-text no-choose-row"  type="text" size="small" >
              {{isInternational?$t(operationItem.text):operationItem.text}}
              <!-- {{operationItem.text}} -->
            </el-button>
            <el-tooltip v-else="operationsOnlyShowIcon && operationItem.icon" class="item" effect="dark" :content="isInternational?$t(operationItem.text):operationItem.text" placement="top-start">
              <a  class="operation-icon no-choose-row" @click="operationItem.click(scope.row,$event)">
                <i v-if="operationItem.icon" :class="operationItem.icon+' '+operationItem.class"></i>
                <svg-icon v-if="operationItem.svgIcon" :icon-class='operationItem.svgIcon' :className='operationItem.class'></svg-icon>                
              </a>
            </el-tooltip>
           <a v-else="operationsOnlyShowIcon && operationItem.svgIcon" @click="operationItem.click(scope.row,$event)" class="operation-icon no-choose-row"><svg-icon :icon-class='operationItem.svgIcon'></svg-icon></a>
        </template>
        </template>
        <template v-if="operationFormater(scope.row,operations)&&operationFormater(scope.row,operations).length&&operationsAutoDropdown&&operationFormater(scope.row,operations).length>operationsAutoDropdownMaxNum">
          <template v-for="n in 2" >          
            <template v-if="!operationsOnlyShowIcon"  :class="operation-text">
              <el-button class="operation-text no-choose-row" :class="operationFormater(scope.row,operations)[n-1].class" @click="operationFormater(scope.row,operations)[n-1].click(scope.row,$event)" type="text" size="small" >
                {{isInternational?$t(operationFormater(scope.row,operations)[n-1].text):operationFormater(scope.row,operations)[n-1].text}}
              </el-button>
            </template>
            <template v-if="operationsOnlyShowIcon && operationFormater(scope.row,operations)[n-1].icon">
              <el-tooltip  class="item" effect="dark" :content="isInternational?$t(operationFormater(scope.row,operations)[n-1].text):operationFormater(scope.row,operations)[n-1].text" placement="top-start">
                <a  class="operation-icon no-choose-row" @click="operationFormater(scope.row,operations)[n-1].click(scope.row,$event)">
                  <i v-if="operationFormater(scope.row,operations)[n-1].icon" :class="operationFormater(scope.row,operations)[n-1].icon+' '+operationFormater(scope.row,operations)[n-1].class"></i>
                  <svg-icon v-if="operationFormater(scope.row,operations)[n-1].svgIcon" :icon-class='operationItem.svgIcon' :className='operationFormater(scope.row,operations)[n-1].class'></svg-icon>
                </a>
              </el-tooltip>
            </template>
            <!-- <template v-if="operationsOnlyShowIcon && operationFormater(scope.row,operations)[n-1].svgIcon">
              <el-tooltip  class="item" effect="dark" :content="isInternational?$t(operationFormater(scope.row,operations)[n-1].text):operationFormater(scope.row,operations)[n-1].text" placement="top-start">
                <a @click="operationFormater(scope.row,operations)[n-1].click(scope.row,$event)"  class="operation-icon no-choose-row">
                  <i  :class="operationFormater(scope.row,operations)[n-1].svgIcon"></i></a>
              </el-tooltip>
            </template> -->
          </template>
            
            <el-dropdown class="operation-dropdown" :show-timeout='80' :hide-on-click="false">
              <span class="el-dropdown-link">
                {{isInternational?$t(operationMore):operationMore}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item v-for="(operationItem,operationIndex) in operationFormater(scope.row,operations)" class="no-choose-row" :class="operationItem.class"  @click.native="operationItem.click(scope.row,$event)" :key="operationIndex" v-if="operationIndex>=2">
                  <i v-if="operationItem.icon" :class="operationItem.icon"></i>
                  <svg-icon v-if="operationItem.svgIcon" :icon-class='operationItem.svgIcon'></svg-icon>
                  {{isInternational?$t(operationItem.text):operationItem.text}}
                  </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
      </template>
      </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      :label="isInternational?$t(operationText):operationText"
      width="40"
      v-else-if="operations&&operations instanceof Array&&operations.length&&isMobile"
      class-name="operation-list no-choose-row"
      >
      <template  slot-scope="scope">
        <el-dropdown class="operation-dropdown" :show-timeout='80' :hide-on-click="false">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item v-for="(operationItem,operationIndex) in operationFormater(scope.row,operations)" class="no-choose-row" :class="operationItem.class"  @click.native="operationItem.click(scope.row,$event)" :key="operationIndex" >
                  <i v-if="operationItem.icon" :class="operationItem.icon"></i>
                  <svg-icon v-if="operationItem.svgIcon" :icon-class='operationItem.svgIcon'></svg-icon>
                  {{isInternational?$t(operationItem.text):operationItem.text}}
                  </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
             </template>
      </el-table-column>
  </el-table>
    <div v-if="pagination"
      style="margin-top: 10px;text-align: right;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageList"
        :page-size="pageSize"
        :layout="paginationLayout"
        :total="total">
      </el-pagination>
    </div>
    </div>
</template>

<script>
import { tableProps } from "./props";
import {isInArr,eq} from '@/utils/eqObject.js'
import treeToArray from "./treeTable.js";
import searchForm from "@/components/serchForm/index.vue";
import Cookies from 'js-cookie'
export default {
  components: { searchForm },
  name: "ElSearchTable",
  props: tableProps,
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      isTreeStatus:false,
      currentData: [],
      selectData:[],
      type:['selection','index','expand'],
      radio:false
    };
  },
  methods: {
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).splice(1));
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.initData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.initData();
    },
    searchHandler(resetPage = true) {
      if (resetPage) {
        this.page = 1;
      }
      this.initData(arguments[0]);
    },
    initData() {
      /**
       * 从后台获取数据时 第一次进来tableData为空  所以url或者fetch只要有一个就可以第一次请求数据
       * 请求到数据后 若有分页且是前台分页则把数据放到tableData
       * 后面点击分页时 tableData不为0直接进到localDataHandler方法里面
       * 若是后台分页 则不存数据到tableData 直接赋值给currentData
       */
      let { tableData, url, fetch } = this;
      //数据从哪里拿 前台还是后台
      if (!tableData.length && (url || fetch)) {
        //数据从后台拿  必须满足 url和fetch字少有一个 并且没有从后台拿过数据
        this.initServe(arguments[0]);
      } else {
        this.localDataHandler(tableData);
      }
    },
    localDataHandler() {
      let {
        pagination,
        paginationSide,
        currentData,
        tableData,
        treeTable
      } = this;
      const cachData = JSON.parse(JSON.stringify(tableData));
      if (pagination) {
        this.paginationData(cachData);
      } else {
        this.currentData = cachData;
      }
    },
    //请求数据
    initServe(formParams = {}) {
      this.loading = true;
      let {
        axios,
        fetch,
        url,
        tableData,
        pagination,
        sidePagination,
        listField,
        pageIndexKey,
        pageSizeKey,
        page,
        pageSize,
        totalField,
        queryParams,
        ajaxOptions,
        treeTable,
        total
      } = this;
      let params = {};
      if (queryParams && typeof queryParams === "function") {
        params = queryParams(formParams);
      } else {
        params = formParams;
        if (pagination) {
          params = Object.assign(params, {
            [pageIndexKey]: page,
            [pageSizeKey]: pageSize
          });
        }
      }
      let requestObject = null;
      if (fetch) {
        requestObject = fetch(params);
      } else {
        $axios.interceptors.request.use(
          config => {
            object.keys(ajaxOptions).forEach(e => {
              config.headers[v] = ajaxOptions[v];
            });
            return config;
          },
          error => {
            return Promise.reject(error);
          }
        );
        method = ajaxOptions.method
          ? ajaxOptions.method.toLowerCase()
          : method.toLowerCase();
        if (method === "get") {
          requestObject = $axios[method](url, { params });
        } else {
          requestObject = $axios[method](url, params);
        }
      }
      requestObject
        .then(response => {
          let res = response,
            list = JSON.parse(JSON.stringify(res));
          let totalValue = list;
          if (res) {
            //总页数
            if (totalField && totalField.indexOf(".") !== -1) {
              totalField.split(".").forEach(e => {
                totalValue = totalValue[e];
              });
            } else {
              totalValue = res[totalField];
            }
            //列表数据
            // debugger
            if (listField && listField.indexOf(".") !== -1) {
              listField.split(".").forEach(e => {
                res = res[e];
              });
            } else {
              res = res[listField];
            }

            //前端分页 要处理数据
            if (pagination && sidePagination === "client") {
              this.tableData = res;
              this.paginationData(this.tableData);
            } else {
              this.total = totalValue ? totalValue : 0;
              if (this.responseHandler) {
                this.currentData = this.responseHandler(res);
              } else {
                this.currentData = res;
              }
            }
            this.loading = false;
          }
        })
        .catch(error => {
          this.loading = false;
        });
    },
    //处理前端分页
    paginationData(data) {
      let { pageSize, page } = this;
      let totalValue = data.length; //这里不必判断总页数为0 能进到这个函数就必须有数据
      this.total = totalValue;
      this.currentData = data.filter((v, i) => {
        if (i >= (page - 1) * pageSize && i < page * pageSize) {
          return true;
        }
      });
    },
    saveTreeStateToCookies(data){
      let cookiesArr=[]
      data.forEach(v=>{
        cookiesArr.push({id:v.id,_expanded:v._expanded})
      })
      Cookies.set('TREE_TABLE_STATUS',JSON.stringify(cookiesArr))
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      let cookiesArr=[]
      this.isTreeStatus=false
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.children && record.children.length > 0;
    },
    showRow: function(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 0.5s;-webkit-animation:treeTableShow 0.5s;"
        : "display:none;";
    },
    //根据行数据 筛选对应的操作
    operationFormater(row = {}, operationList = []) {
       return  operationList.filter(item=>{
            let isRight=true
            let judgesObj=item.judges
            if(judgesObj){
                let keysArr=Object.keys(judgesObj)
                for(let i=0;i<keysArr.length;i++){
                    let v=keysArr[i]
                    if(row[v]!==judgesObj[v]){
                        isRight=false
                        break
                    }
                }
            }
            return isRight
        })
    },
    //有单选或多选并 点击行选中处理
    handlerSelect(row, event, column){
        if(this.clickToSelect&&this.columns[0].type==='radio'){
            if(typeof event.target.className==='string'&&event.target.className.indexOf('no-choose-row')===-1 && event.target.tagName!=='I'&&event.target.parentElement.className.indexOf('no-choose-row')===-1){
                this.radio=this.formatData.indexOf(row)
            }
        }else if(this.clickToSelect&&this.columns[0].type==='selection'){
            if( event.target.tagName!=='svg'&&(typeof event.target.className==='string'&&event.target.className.indexOf('no-choose-row')===-1) && event.target.tagName!=='I'&&event.target.parentElement.className.indexOf('no-choose-row')===-1){
                this.$refs.elBaseTable.toggleRowSelection(row)
                this.recordSelectData(row)
            }
        }
        this.emitEventHandler('row-click', row, event, column)
    },
    getSelectData(){
        return this.selectData
    },
    recordSelectData(row){
        let index=this.selectData.indexOf(row)
        if(index===-1){
            this.selectData.push(row)
        }else{
            this.selectData.splice(index,1)
        }
    },
    handlerRefresh(){
        this.isTreeStatus=true//刷新时保留树形状态
        this.initData();
    },
    //根据cookies里面保存的树形状态  同步到数据中
    changeTreeStatus(arr,statusArr){
      arr.forEach(e=>{
        let id=e.id
        let flag=false
        statusArr.forEach(v=>{
          if(v.id===id){
            flag=true
            e._expanded=v._expanded
          }
        })
        if(!flag){
          e._expanded=true
        }

        if(e.children&&e.children.length){
          this.changeTreeStatus(e.children,statusArr)
        }
      })
      return arr
    },
    expandTo(id,data){
      if(!this.treeTable){console.warn('只有开启树形表格才可以使用此方法'); return false}
      
    },
    expandAllParents(tem,parentIds){
        parentIds.forEach(v=>{
          for(let i=0;i<tem.length;i++){
            if(tem[i].id==v){
              tem[i]._expanded=true
              if(tem[i].parentId&&tem[i].parentId!==0){
              this.expandAllParents(tem,[tem[i].parentId])
              }
              break
            }
          }
        })
    }
  },
  computed: {
    formatData() {
      if (!this.treeTable) {
        return this.currentData;
      }
      let tmp,parentIds=[];
      if (!Array.isArray(this.currentData)) {
        tmp = [this.currentData];
      } else {
        tmp = this.currentData;
      }
      let cookiesStatus=Cookies.get('TREE_TABLE_STATUS')?JSON.parse(Cookies.get('TREE_TABLE_STATUS')) :''
      const func = treeToArray;
      const args =[tmp, this.expandAll];
      tmp=func.apply(null, args);
       if(this.isTreeStatus&&cookiesStatus&&cookiesStatus.length){
        tmp.forEach(v=>{
          let id=v.id
          let flag=false
          cookiesStatus.forEach(e=>{
            if(v.id==e.id){
              flag=true
              v._expanded=e._expanded
            }
          })
          if(!flag&&v.parentId&&v.parentId!=='0'){
              parentIds.push(v.parentId)
          }
        })
        if(parentIds.length){
          this.expandAllParents(tmp,parentIds)
        }
      }
      return tmp
    }
  },
  watch:{
      formatData(value,oldValue){
        //收集id 以及师傅展开状态并到cookie中 
        this.saveTreeStateToCookies(value)
        console.log()
        this.$nextTick(() => {
          if(this.selectData.length>0){
            value.forEach(v=>{
              if(isInArr(this.selectData,v)!==-1){
                this.$refs.elBaseTable.toggleRowSelection(v)
              }
            })
          }
        })
      }
  },
  mounted() {
    this.isTreeStatus=false //刷新页面不保存 状态 病移除cookies
    Cookies.remove('TREE_TABLE_STATUS')
    this.initData();    
  }
};
</script>
<style rel="stylesheet/css" lang="scss">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.el-perfect-table {
    .el-table__header th.operation-list {
        text-align: left;
    }
    .el-table__row .el-table-checkbox{
        text-align: center;
    }
    .el-radio .el-radio__label{
        position: absolute;
    }
}

</style>
<style lang='scss' scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
  i {
    font-size: 16px;
  }
}

.operation-list {
    text-align: left;
  .operation-text {
    font-size: 14px;
  }
  .el-button {
    margin-left: 0px;
    margin-right: 5px;
  }
  .operation-icon {
    margin-right: 5px;
    color: #409eff;
    font-size: 14px;
    i {
      font-size: 18px;
    }
    svg{
      font-size: 12px;
      position: relative;
      top: -3px;
    }
  }
  .operation-dropdown {
    cursor: pointer;
    // color: #409EFF;
    .el-icon--right {
      margin-left: 0px;
    }
  }
}
</style>