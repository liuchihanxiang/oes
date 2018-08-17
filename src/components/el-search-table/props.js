export const tableProps = {
    isInternational: {
        type: Boolean,
        default: false
    },
    treeTable: {
        type: Boolean,
        default: false
    },
    expandAll: {
        type: Boolean,
        default: false
    },
    collapsedIcon: {
        type: String,
        default: 'el-icon-caret-right'
    },
    expandedIcon: {
        type: String,
        default: 'el-icon-caret-bottom'
    },
    formOptions: Object,
    btnList: Array,
    fetch: Function,
    pagination: {
        type: Boolean,
        default: true
    },
    isMobile: {
        type: Boolean,
        default: false
    },
    sidePagination: {
        type: String,
        default: 'server',
        validator: function(value) {
            return ['client', 'server'].indexOf(value) !== -1
        }
    },
    refreshBtn: {
        type: Boolean,
        default: false
    },
    clickToSelect: {
        type: Boolean,
        default: true
    },
    operationText: {
        type: String,
        default: '操作'
    },
    operationMore: {
        type: String,
        default: '更多'
    },
    operations: Array,
    operationsOnlyShowIcon: {
        type: Boolean,
        default: false
    },
    operationsAutoDropdown: {
        type: Boolean,
        default: true
    },
    operationsAutoDropdownMaxNum: {
        type: Number,
        default: 4
    },
    method: {
        type: String,
        default: 'get',
        validator: value => {
            return ['get', 'post', 'put', 'delete'].indexOf(value) !== -1
        }
    },
    ajaxOptions: {
        type: Object,
        default: () => {
            return {}
        }
    },
    responseHandler: Function,
    url: String,
    listField: {
        type: String,
        default: 'list'
    },
    totalField: {
        type: String,
        default: 'total'
    },
    queryParams: Function,
    pageList: {
        type: Array,
        default: () => [10, 20, 50, 100]
    },
    paginationLayout: {
        type: String,
        default: 'total, prev, pager, next, jumper, sizes'
    },
    pageIndexKey: {
        type: String,
        default: 'page'
    },

    pageSizeKey: {
        type: String,
        default: 'pageSize'
    },
    tableData: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        require: true
    },
    height: [String, Number],
    maxHeight: [String, Number],
    stripe: {
        type: Boolean,
        default: true
    },
    border: {
        type: Boolean,
        default: true
    },
    size: {
        type: String,
        validator: function(value) {
            return ['medium', 'small', 'mini'].indexOf(value) !== -1
        }
    },
    fit: {
        type: Boolean,
        default: true
    },
    showHeader: {
        type: Boolean,
        default: true
    },
    highlightCurrentRow: {
        type: Boolean,
        default: false
    },
    currentRowKey: [String, Number],
    rowClassName: [Function, String],
    rowStyle: [Function, Object],
    cellClassName: [Function, String],
    cellStyle: [Function, String],
    headerRowStyle: [Function, Object],
    headerCellClassName: [Function, String],
    headerRowClassName: [Function, String],
    headerCellStyle: [Function, Object],
    rowKey: [Function, String],
    empyText: {
        type: String,
        default: '暂无数据'
    },
    defautExpandAll: {
        type: Boolean,
        default: false
    },
    defaultSort: Object,
    tooltipEffect: String,
    summaryMethod: Function,
    spanMethod: Function,
    selectOnIndeterminate: Boolean,


}