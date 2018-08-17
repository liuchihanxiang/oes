<!--  -->
<template>
  <div class="sidebar-container">
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-row v-for="(route,findex) in routes"
              :key='route.path'
              v-if='!route.hidden && $route.matched.length && $route.matched[0].path===route.path'>
        <el-col :span="24">
          <el-menu :default-active="currentIndex"
                   unique-opened
                   mode="vertical"
                   :collapse-transition='false'
                   @select='handleSelect'
                   background-color="#304156"
                   text-color="#bfcbd9"
                   active-text-color="#409EFF"
                   :collapse="isCollapse">
            <el-menu-item index="111"
                          class="sideBarSwitch">
              <!-- <span class="hamburger" v-if="(sidebarPosition!=='hiddenLeft'&&sidebarPosition!=='hiddenRight')||isMobile" :class="{active:sidebarStatus}" @click="toggleSidebar">
                        </span> -->
              <svg-icon icon-class="hamburger"
                        @click.native="toggleSidebar" />
              <span slot="title"
                    class="navTitle"></span>
            </el-menu-item>
            <template v-if="!item.hidden && item.children && item.children.length"
                      v-for="(item,index) in route.children">
              <el-submenu v-if="item.children.length>1"
                          :index="item.path">
                <template slot="title">
                  <svg-icon v-if="item.meta&&item.meta.icon"
                            :icon-class="item.meta.icon"></svg-icon>
                  <span slot="title"
                        v-if="item.meta&&item.meta.icon"
                        class="menu-title">{{getRoutesName(item.name)}}</span>
                </template>
                <router-link v-for="(citem,cindex) in item.children"
                             :to="citem.path"
                             @click.native="flushCom"
                             :key="citem.path">
                  <el-menu-item :index="$route.matched[0].path+'/'+item.path+'/'+citem.path">
                    <svg-icon v-if="citem.meta&&citem.meta.icon"
                              :icon-class="citem.meta.icon"></svg-icon>
                    <span slot="title"
                          v-if="citem.meta&&citem.meta.icon"
                          class="menu-title">{{getRoutesName(citem.name)}}</span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
              <router-link v-else
                           :to="item.children[0].path"
                           @click.native="flushCom"
                           :key="item.children[0].name">
                <el-menu-item :index="item.children[0].name">
                  <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon"
                            :icon-class="item.children[0].meta.icon"></svg-icon>
                  <span slot="title"
                        v-if="item.children[0].meta&&item.children[0].meta.icon"
                        class="menu-title">{{getRoutesName(item.children[0].name)}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import { getRoutesName } from "@/utils/route"
import { mapGetters } from "vuex"
export default {
  name: "MenuList",
  props: {
    routes: {
      type: Array
    },
    handleSelect: {
      type: Function
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    toggleSidebar: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters(["username", "sidebarStatus", "isMobile", "sidebarPosition"]),
    currentIndex() {
      console.log(this.$route.path)
      console.log("666")
      return this.$route.path
    }
  },
  methods: {
    getRoutesName,
    flushCom() {
      // this.$router.go(0);
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/styles/color.scss";
.sidebar-container {
  .el-menu--collapse .sideBarSwitch {
    cursor: auto;
    .svg-icon {
      position: static;
      transform: rotate(90deg);
    }
  }

  .sideBarSwitch {
    cursor: auto;
    .svg-icon {
      position: relative;
      // top: 18px;
      // right: 10px;
      // cursor: pointer;
      transform: rotate(0deg);
      transition: 0.38s;
      transform-origin: 50% 50%;
    }
    .navTitle {
      margin-left: 25px;
      color: #fff;
    }
  }
  .el-menu {
    border-right: 0px;
    .router-link-active {
      background: $menuHover !important;
    }
    .el-submenu {
      .el-menu-item {
        &:hover {
          background: $menuHover !important;
        }
        padding: 0px;
        min-width: 180px;
        background: $subMenuBg !important;
      }
    }
    .svg-icon {
      margin-right: 5px;
    }
  }
}
</style>