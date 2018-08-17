<!--  -->
<template>
    <el-form
     class="el-perfect-form"   
     :inline="inline"
     :model="fromModel"
     v-if="forms&&forms instanceof Array&&forms.length"
     :label-width="labelWidth ? (labelWidth + 'px') : ''"
     :status-icon="statusIcon"
     :label-position="labelPosition"
     :disabled="disabled"
     :size="size"
     @submit.native.prevent="searchHandler" 
     ref="baseForm">
     <el-form-item v-for="(form, index) in forms" :key="index"
      :prop=" form.prop"
      :class="form.class"
      :style="form.style"
      :label="isInternational&&form.label?$t(form.label):form.label" 
      :rules="form.rules || []"
      :label-width="!form.label?'':form.labelWidth ? (form.labelWidth + 'px'):'100px' ">
        <el-input v-if="form.itemType === 'input'||form.itemType === 'number'||form.itemType === 'textarea' || form.itemType === undefined"
        v-model="fromModel[form.prop]"
        :type="form.itemType?form.itemType:'input'"
        :size="form.size ? form.size : size"
        :readonly="form.readonly"
        :disabled="form.disabled"
        :placeholder="isInternational?$t(form.placeholder):form.placeholder"/>
        <el-select v-else-if="form.itemType === 'select'"
        v-model="fromModel[form.prop]"
        :size="form.size ? form.size : size"
        :disabled="form.disabled"
        :placeholder="isInternational?$t(form.placeholder):form.placeholder">
            <el-option v-for="(option, optionIndex) in form.options" :key="optionIndex"
            :value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
            :label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option" />
        </el-select>
        <el-date-picker v-else-if="form.itemType === 'date'"
        v-model="fromModel[form.prop]"
        type="date" :placeholder="isInternational?$t(form.placeholder):form.placeholder"
        :size="form.size ? form.size : size"
        :disabled="form.disabled"
        :readonly="form.readonly"
        :value-format='form.valueFormat?form.valueFormat:"yyyy-MM-dd"'
        :editable="form.editable"
        :picker-options="form.pickerOptions || {}" />
      <el-date-picker v-else-if="form.itemType === 'daterange'"
        v-model="fromModel[form.prop]"
        :size="form.size ? form.size : size"
        type="daterange"
        :value-format='form.valueFormat?form.valueFormat:"yyyy-MM-dd"'
        :disabled="form.disabled"
        :readonly="form.readonly"
        :editable="form.editable"
        :start-placeholder="isInternational?$t(form.startPlaceholder):form.startPlaceholder"
        :end-placeholder="isInternational?$t(form.endPlaceholder):form.endPlaceholder"	
        :picker-options="form.pickerOptions || {}" />
     <el-switch 
        v-else-if="form.itemType === 'switch'"
        :active-value='form.activeValue'
        :inactive-value='form.inactiveValue'
        :active-text="form.activeText"
        :inactive-text="form.inactiveText"
        :active-color="form.activeColor?form.activeColor:'#409EFF'"
        :inactive-color="form.inactiveColor?form.inactiveColor:'#C0CCDA'"
      v-model="fromModel[form.prop]"></el-switch>
      <el-checkbox-group v-else-if="form.itemType === 'checkbox'" v-model="fromModel[form.prop]">
        <el-checkbox v-for="(option,checkboxIndex) in form.options" :key="checkboxIndex" :label="option.label" :name="form.prop"></el-checkbox>
      </el-checkbox-group>
      <el-radio-group v-else-if="form.itemType === 'checkbox'" v-model="fromModel[form.prop]">
        <el-radio v-for="(option,radioIndex) in form.options" :key="radioIndex" :label="option.label" :name="form.prop"></el-radio>
      </el-radio-group>
      </el-form-item>
        <el-form-item v-if="searchBtn.show||resetBtn.show" class="el-perfect-btn-container">
            <el-button v-if="searchBtn.show" 
            :type="searchBtn.type?searchBtn.type:'primary'"
            :size="searchBtn.size"
             :loading="submitLoading"
            :class="searchBtn.classs"
            icon="el-icon-search" 
            @click="searchHandler">{{this.$t('serchForm.serchBtn')}}</el-button>
            
            <el-button v-if="resetBtn.show" 
            :size="searchBtn.size"
            :type="searchBtn.type?searchBtn.type:'primary'" 
            :class="resetBtn.classs" 
            @click="resetForm">{{this.$t('serchForm.resetBtn')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getRealData } from "@/utils";
import {formProps} from './props'
export default {
    name:"ElSearchForm",
    props: formProps,    
    data() {
        return {
            fromModel:this.getFormModel()
        }
    },
   watch: {
        formValue: {
            handler: function(value, oldValue) {
                console.log(value)
                if (JSON.stringify(value) === "{}") {
                    this.fromModel=this.getFormModel();
                    this.resetForm()
                } else {
                    Object.assign(this.fromModel, value);
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        getRemoteData({index,fetch,resultField,resultHandler}){
            fetch().then(res=>{
                let data=res.data
                if(typeof response === 'object' && !(data instanceof Array)){
                    if(resultField.indexOf('.')!==-1){
                        resultField.split('.').forEach(e=>{
                            data=data[e]
                        })
                    }else{
                        data=data[resultField]
                    }
                }
                if(!data || !(data instanceof Array)){
                    console.warn(`结果应该是一个数组`)
                }
                    this.forms[index].options=resultHandler?resultHandler(data):data
            })
        },
        resetForm() {
            // this.$nextTick(() => { 
                this.$refs.baseForm&&this.$refs.baseForm.resetFields()
            // })
        },
        searchHandler() {
            this.$refs.baseForm.validate(valid=>{
                if(valid){
                    let params=this.formFormat?this.formFormat(this.fromModel):this.fromModel
                    this.submitHandler(params)
                }
            })
        },
        getFormModel(){
             let fromModel={}//定义一个表单数据模型 下面通过循环父元素数据填充
        const {forms}=this.$props
        forms.forEach((e,i) => {
            if(typeof e.prop === 'string'){
                if(e.default!==undefined){
                    fromModel[e.prop]=e.default
                }else if(e.type==="checkbox"){
                    fromModel[e.prop]=[]
                }else{
                    fromModel[e.prop]=''
                }
            }else if(e.prop instanceof Array&&e.prop.length>0){//主要是日期范围 两个input框
                e.prop.forEach(v=>{
                    fromModel[v]=''
                })
            }
            if(e.itemType==='select'&& !e.options && (e.selectFetch||e.selectUrl)){//select选择器 并且没有本地的options 并且 请求数据的函数或url至少存在一个
                const {$axios}=this
                if(!e.selectMethod){
                    e.selectMethod='get'
                }
                this.getRemoteData({
                    index:i,
                    fetch: v.selectFetch?v.selectFetch:()=>{
                        return $axios[v.selectMethod](v.selectUrl,v.selectMethod.toLowerCase() === 'get'?{params:v.selectParams}:v.selectParams)
                    },
                    resultField: v.selectResultField || 'result',
                    resultHandler: v.selectResultHandler
                })
            }

        });
        return fromModel
        }
    }
}
</script>
<style lang='scss' scoped>

</style>