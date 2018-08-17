<!--  -->
<template>
  <el-dropdown trigger="click" @command="setLanguage">
      <div>
      <svg-icon class-name='international-icon' icon-class="language" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
        <el-dropdown-item  command="en" :disabled="language==='en'" >English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
  computed:{
      language(){
          return this.$store.getters.language
      }
  },
  methods:{
      setLanguage(lang){          
          this.$i18n.locale=lang
          this.$store.dispatch('setLanguage',lang)
          this.$message.success({message:this.$t('langTips'),center:true})
      }
  }

}

</script>
<style lang='scss' scoped>
.international-icon{
    font-size: 20px;
    cursor: pointer;
}
</style>