<!--  -->
<template>
    <div class="app-container" :class="{'mini-sidebar':sidebarStatus,'left-sideBar':sidebarPosition==='showLeft','left-hover-sideBar':sidebarPosition==='hiddenLeft'}">
        <menu-list :routes="router" :toggleSidebar='toggleSidebar' :isCollapse='isCollapse' :handleSelect="handleSelect"></menu-list>
        <navbar :toggleSidebar='toggleSidebar' :router='router'></navbar>
        <div class="main-container" >
            <tags-view v-if="labelPage&&!isMobile"></tags-view>
            <main-content :class="{'hidden-label-page':!labelPage||isMobile}"></main-content>
        </div>
        <div v-show="sidebarStatus&&isMobile" @click="toggleSidebar" class="hideen shade full-page" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import MenuList from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MainContent from './components/Main';
import TagsView from './components/TagsView';
import resizeMixins from '@/mixins/resize.js'
export default {
    components: { MenuList, Navbar,MainContent,TagsView },
    data(){
        return{
            
        }
    },
    mixins:[resizeMixins],
    computed: {
        ...mapGetters(["sidebarStatus", "router",'isMobile','sidebarPosition','labelPage']),
        isCollapse(){
            return this.sidebarStatus&&!this.isMobile
        }
    },
    methods:{
        toggleSidebar(){
            this.$store.dispatch("setSidebarStatus")
        },
        handleSelect(index,indexPath){
            console.log(index);
      console.log(indexPath);
            if(this.isMobile){
                this.toggleSidebar()
            }
        }
    }
};
</script>
<style lang='scss' scoped>
@import "@/styles/color.scss";

</style>