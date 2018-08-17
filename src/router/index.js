import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import Layout from "@/views/layout/index";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getInfo, logOut } from "@/api/login";
import { Message } from "element-ui";
import cookies from "js-cookie";
import { getToken, removeToken } from "@/utils/token";
import getRouteList from "@/utils/route";

NProgress.configure({ showSpinner: false }); // NProgress Configuration
const _import = require("./import_" + process.env.NODE_ENV);
Vue.use(Router);

export const constantRouter = [{
        path: "/login",
        name: "Login",
        component: _import("login/index"),
        hidden: true
    },
    {
        path: "",
        component: Layout,
        redirect: "homepage",
        hiddenHeader: true,
        children: [{
            path: "homepage",
            name: "homepage",
            component: _import("homePage/index"),
            meta: {
                title: "首页",
                icon: "homepage"
            }
        }]
    },
    {
        path: "/sysSetup",
        component: Layout,
        redirect: "index",
        name: 'sysSetup',
        meta: {
            title: "系统设置"
        },
        children: [{
            path: "index",
            name: "index",
            component: _import("sysSetup/index"),
            meta: {
                title: "系统设置"
            }
        }],
        hidden: true
    },
    {
        path: "/404",
        component: _import("errorPage/404"),
        hidden: true
    }
];

const NotFoundRouterMap = [{ path: "*", redirect: "/404", hidden: true }];

const router = new Router({
    routes: constantRouter,
    mode: 'history'
});

const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
    console.log(to);
    NProgress.start();
    if (getToken()) {
        if (to.path == "/login") {
            next({
                path: "/"
            });
            NProgress.done();
        } else {
            if (store.getters.addRouter.length === 0) {
                getInfo().then(
                    res => {
                        const newRoute = getRouteList(res.data);
                        store.dispatch("addRoutes", newRoute);
                        router.addRoutes(store.getters.addRouter);
                        router.addRoutes(NotFoundRouterMap); //404页面一定要在动态路由添加过后，再加进去
                        next({
                            ...to,
                            replace: true
                        });
                    },
                    error => {
                        logOut().then(res => {
                            store.dispatch("setUsertoken", "");
                            store.dispatch("setUsername", "");
                            // this.$t('login.tips.errorLoginVerify')
                            Message({
                                type: "error",
                                message: "登录失败请重新登录",
                                duration: 3 * 1000
                            });
                            next({
                                path: "/login"
                            });
                        });
                    }
                );
            } else {
                next();
                NProgress.done();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
            NProgress.done();
        } else {
            next("/login");
            NProgress.done();
        }
    }
});
router.afterEach(() => {
    NProgress.done();
});
export default router;