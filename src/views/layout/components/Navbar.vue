<!--  -->
<template>
  <div class="navbar-container" >
    <div class="sysInfo">

      <span class="sysTitle">诺姆云平台</span>
    </div>
    <!-- <span class="hamburger" v-if="(sidebarPosition!=='hiddenLeft'&&sidebarPosition!=='hiddenRight')||isMobile" :class="{active:sidebarStatus}" @click="toggleSidebar">
      <svg-icon icon-class="hamburger" />
    </span> -->
    
    <!-- <breadcrumb v-if="!isMobile" class="breadcrumb-container"></breadcrumb> -->
    <!-- <div v-else class="mobileTitle">{{getRoutesName(routeName)}}</div> -->
    <el-menu  class="mainMenu pull-left" mode="horizontal" 
    :default-active="activeHeadPath"   
    background-color="#304156" text-color="#bfcbd9" 
    active-text-color="#409EFF" 
    :router="true"
    >
      <el-menu-item
              v-for='(item,index) in router'
              :index="item.path"
              :key='item.path'
              v-if='!item.hidden && (item.hiddenHeader===undefined|| !item.hiddenHeader)'>
              {{$t('routes.'+item.name)}}<!-- {{item.path}} -->
            </el-menu-item>
    </el-menu>
    <div class="right-menu pull-right">
      <language class="marginr-15" v-if="!isMobile"></language>
      <el-dropdown trigger="click" class="pointer user-info">
        <span class="el-dropdown-link">
          <svg-icon icon-class="user" />
          <div v-if="!isMobile" class="inline">
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="'/sysSetup/index'">
              <span>{{this.$t('navbar.sysSetup')}}</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="showChangePw = true">{{this.$t('navbar.changePw')}}</el-dropdown-item>
          <el-dropdown-item>
            <span @click="handleLogOut">{{this.$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog :title="$t('navbar.changePw')" :visible.sync="showChangePw" width="30%">
      <el-form :model="pwForm" status-icon ref="pwForm" label-width="100px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="pwForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="pwForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChangePw = false">取 消</el-button>
        <el-button type="primary" @click="savePw">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import { logOut } from "@/api/login";
import { getRoutesName } from "@/utils/route";

import language from "@/components/language";
import breadcrumb from "@/components/breadcrumb";

export default {
  components: { language, breadcrumb },
  props:{
    toggleSidebar: {
      type: Function,
      required: true
    },
    routes: {
      type: Array
    }
  },
  mounted(){
    // console.log(this.router);
  },
  data() {
    return {
      showChangePw: false,
      checkPass: "",
      pwForm: {
        oldPassword: "",
        password: ""
      }
    };
  },
  
  methods: {
    getRoutesName,
    handleLogOut() {
      logOut().then(res => {
        this.$store.dispatch("setUsertoken", "");
        this.$store.dispatch("setUsername", "");
        location.reload();
      });
    },
    savePw() {}
  },
  computed: {
    ...mapGetters(["username", "sidebarStatus","router", "isMobile",'sidebarPosition']),
    routeName() {
      return this.$route.meta.icon;
    },
     activeHeadPath(){ 
       console.log(this.$route.matched[0].path);
    return this.$route.matched[0].path
  }
  }
};
</script>
<style lang='scss' scoped>
.navbar-container {
  padding: 0 10px 0 0;
  height: 50px;
  .sysInfo{
    width: 180px;
    height: 100%;
    line-height: 50px;
    float: left;
    text-align: center;
    .sysTitle{
      color: #fff;
    }
  }
  .international-icon,.user-info{
    color: #fff;
  }
  .hamburger {
    position: relative;
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: 0.38s;
    transform-origin: 50% 50%;
    outline: none;
    width: 24px;
    height: 24px;
    margin-top: 13px;
    text-align: center;
    float: left;
    margin-right: 15px;
    z-index: 6;
    .svg-icon {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .hamburger.active {
    transform: rotate(90deg);
  }
  .breadcrumb-container {
    float: left;
    line-height: 50px;
  }
  .mainMenu .el-menu-item{
    height: 50px;
    line-height: 50px;
  }
}
</style>