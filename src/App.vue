<template>
  <div id="app"  :class="isMobile">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    isMobile(){
      return  this.$store.getters.isMobile?'mobile-app':'app'
    }
  }
}
</script>


