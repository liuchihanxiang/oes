export const formProps = {
  isInternational: { //是否支持国际化  
    type: Boolean,
    default: false
  },
  submitLoading:{
    type: Boolean,
    default: false
  },
  statusIcon: { //是否显示校验结果的反馈图标
    type: Boolean,
    default: false
  },
  inline: { //是否设置为行内表单模式
    type: Boolean,
    default: true
  },
  labelPosition: { //表单域标签的位置
    type: String,
    default: 'right'
  },
  labelWidth: Number, //表单域标签的宽度
  disabled: { //是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
    type: Boolean,
    default: false
  },
  size: { //用于控制该表单内组件的尺寸 medium / small / mini
    type: String,
    default: ''
  },
  formValue:Object,
  searchBtn: {
    type: Object,
    default: () => {
      return {
        show: false,
        text: 'Search',
        type: 'primary',
        classs: ''
      }
    }
  },
  resetBtn: {
    type: Object,
    default:() => {
        return  {
            show: false,
            text: 'Reset',
            classs: ''
          }
    }
  },
  submitHandler: Function, //查询事件
  forms: { //表单
    type: Array,
    required: true
  }
}
