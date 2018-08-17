const _import = require('@/router/import_' + process.env.NODE_ENV)
    // 根据后台返回的菜单 返回用户对应路由
export function getRouteList11(menuList) {
    // menuList.splice(1,1)
    return menuList.map(ele1 => {
        if (ele1.children && ele1.children.length) { //主路由path 前面一定要加  ‘/’ 不然或导致添加不上路由
            return {
                path: ele1.router,
                component: _import('layout/index'),
                name: ele1.routerName,
                redirect: 'noredirect',
                meta: {
                    title: ele1.routerName,
                    icon: ele1.icon
                },
                children: ele1.children.map(ele2 => {
                    return {
                        path: ele2.router.split('/')[1],
                        name: ele2.icon,
                        component: resolve => require(['@/views/' + ele2.component], resolve),
                        meta: {
                            title: ele2.routerName,
                            icon: ele2.icon
                        },
                    }
                })

            }

        } else {
            return {
                path: ele1.router,
                component: _import('layout/index'),
                redirect: ele1.router + '/index',
                meta: {
                    title: ele1.icon,
                    icon: ele1.icon
                },
                children: [{
                    path: 'index',
                    name: ele1.icon + 'Index',
                    component: resolve => require(['@/views/' + ele1.component], resolve),
                    meta: {
                        title: ele1.icon,
                        icon: ele1.icon
                    }
                }]
            }
        }
    })
}
// 根据后台返回的菜单 返回用户对应路由
const getRouteList = function(menuList) {
        // menuList.splice(1,1)
        return menuList.map(ele1 => {
            //主路由path 前面一定要加  ‘/’ 不然或导致添加不上路由
            let obj1 = {
                path: ele1.path,
                component: ele1.component ? resolve => require(['@/views' + ele1.component], resolve) : _import('layout/index'),
                name: ele1.routerName,
                redirect: ele1.redirect ? ele1.redirect : null,
                meta: {
                    title: ele1.name,
                    icon: ele1.icon
                }
            }
            if (ele1.children && ele1.children.length) {
                obj1.children = getRouteList(ele1.children)
            } else {
                obj1.children = []
            }
            return obj1

        })
    }
    // 此部分是针对不同语言 通过icon获取对应路由的名称
export function getRoutesName(iconTitle) {
    if (this.$te('routes.' + iconTitle)) {
        return this.$t('routes.' + iconTitle)
    } else {
        return iconTitle
    }
}
export default getRouteList