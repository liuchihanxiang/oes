<template>
    <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="语言设置">
    <el-radio-group v-model="form.lang">
      <el-radio-button label="zh_cn">中文</el-radio-button>
      <el-radio-button label="en">英文</el-radio-button>      
    </el-radio-group>
  </el-form-item>
  <el-form-item label="表格操作设置">
    <el-radio-group v-model="form.tableOperations" @change="changeTableOperations">
      <el-radio label="showIcon" border>只显示图标</el-radio>
      <el-radio label="showText" border>只显示文字</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="表格查询设置">
    <el-radio-group v-model="form.tableSearch">
      <el-radio label="1">一直显示</el-radio>
      <el-radio label="0">隐藏（点击查询图标时显示）</el-radio>      
    </el-radio-group>
  </el-form-item>
  <el-form-item label="是否显示标签页">
    <el-switch v-model="form.labelPage" @change='changeLabelPage'></el-switch>
  </el-form-item>
  <el-form-item label="侧边栏设置">
    <el-radio-group v-model="form.sidebarPosition" @change='changeSidebarPosition'>
      <el-radio label="showLeft">一直显示在左侧</el-radio>
      <el-radio label="hiddenLeft">隐藏左侧（鼠标移到浏览器左侧显示）</el-radio>      
      <el-radio label="showRight">一直显示在右侧</el-radio>
      <el-radio label="hiddenRight">隐藏右侧（鼠标移到浏览器右侧显示）</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存设置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          lang: 'zh_cn',
          tableOperations: 'showIcon',
         tableSearch:'1',
         labelPage:true,
         sidebarPosition:'showLeft'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      changeTableOperations(value){
        let isOnlyIcon=value==='showIcon'
        console.log(isOnlyIcon);
        this.$store.dispatch("setTableOnlyShowIcon",isOnlyIcon)
      },
      changeSidebarPosition(value){
         this.$store.dispatch("setSidebarPosition",value)
      },
      changeLabelPage(value){
        this.$store.dispatch("setLabelPage",value)
      }
    }
  }
</script>

<style lang='scss' scoped>

 
</style>
