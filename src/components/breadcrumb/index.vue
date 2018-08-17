<!--  -->
<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.name'>
                <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{getRoutesName(item.name)}}</span>
                <router-link v-else :to="item.redirect||item.path">{{getRoutesName(item.name)}}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
import { getRoutesName } from "@/utils/route";
export default {
    created() {
        this.getBreadcrumb();
    },
    data() {
        return {
            levelList: null
        };
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    methods: {
        getRoutesName,
        getBreadcrumb() {
            let iconList = this.$route.matched.filter(item => item.name);
            const first = iconList[0];
            if (first && first.name !== "homepage") {
                iconList = [
                    { path: "/homepage",name:'homepage' }
                ].concat(iconList);
            }
            this.levelList = iconList;
        }
    }
};
</script>
<style lang='scss' scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>