<!-- 
 enter-active-class="animated fadeInRight fullPage"
         leave-active-class=" fadeInLeft" -->
<template>
    <div class="main-content" >
        <transition 
        name="fade-transform" mode="out-in"
         >
            <keep-alive :include="cachedViews">
                <router-view :key="key"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>
<style lang='scss' >

</style>