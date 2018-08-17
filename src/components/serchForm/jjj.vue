<!--  -->
<template>
    <el-form   
     :inline="inline"
     :model="fromModel"
     :label-width="labelWidth ? (labelWidth + 'px') : ''"
     :status-icon="statusIcon"
     :label-position="labelPosition"
     :disabled="disabled"
     :size="size"
     @submit.native.prevent="searchHandler" 
     ref="form">
     <el-form-item v-for="(form, index) in forms" :key="index"
      :prop=" form.prop"
      :label="isInternational&&form.label?$t(form.label):form.label" 
      :rules="form.rules || []"
      :label-width="!form.label?'':form.labelWidth ? (form.labelWidth + 'px'):'100px' ">
        <el-input v-if="form.itemType === 'input' || form.itemType === undefined"
        v-model="fromModel[form.prop]"
        :size="form.size ? form.size : size"
        :readonly="form.readonly"
        :disabled="form.disabled"
        :placeholder="isInternational?$t(form.placeholder):form.placeholder"/>
        <el-select v-else-if="form.itemType === 'select'"
        v-model="fromModel[form.prop]"
        :size="form.size ? form.size : size"
        :disabled="form.disabled"
        :placeholder="isInternational?$t(form.placeholder):form.placeholder">
            <!-- <el-option value=""></el-option> -->
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
        :placeholder="form.placeholder"
        :picker-options="form.pickerOptions || {}" />
      </el-form-item>
        <el-form-item v-if="searchBtn.show||resetBtn.show">
            <el-button v-if="searchBtn.show" 
            :type="searchBtn.type?searchBtn.type:'primary'"
            :size="searchBtn.size"
             :loading="submitLoading"
            :class="searchBtn.classs" 
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
        let fromModel=this.getFormModel()
        return {
            fromModel
        }
    },
   watch: {
        formValue: {
            handler: function(value, oldValue) {
                if (JSON.stringify(value) === "{}") {
                    // console.log(this.resetForm)
                    // this.resetForm();
                    // console.log('创建呀');
                    // if(this.resetForm){
                    //     this.resetForm();
                    // }else{
                    // this.fromModel=this.fromModel
                    this.fromModel=this.getFormModel()
                    // }
                } else {
                    console.log('编辑呀');
                    this.fromModel=this.getFormModel(value)
                    // this.Object.assign(this.fromModel, value);
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted(){
        // this.modelFrom=getRealData(this.formData)
        // console.log(this.modelFrom);
        
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
            this.$refs['form'].resetFields();
        },
        searchHandler() {
            //  this.$emit('confirmAjax')
            this.$refs['form'].validate(valid=>{
                if(valid){
                        let params=this.formFormat?this.formFormat(this.fromModel):this.fromModel
                        this.submitHandler(params)
                }
            })
        },
        getFormModel(value){
            let fromModel={}//定义一个表单数据模型 下面通过循环父元素数据填充
            const {forms}=this.$props
            forms.forEach((e,i) => {
            if(typeof e.prop === 'string'){
                e.modelKeys=e.prop;
                fromModel[e.prop]=''
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
            if(value){
                Object.assign(fromModel, value);
            }
        });
        return fromModel
        }
    }
}
</script>
<style lang='scss' scoped>

</style>