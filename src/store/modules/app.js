import cookies from 'js-cookie'
import { constantRouter } from '@/router'
import { isMobileFn } from '@/utils'


const app = {
    state: {
        language: cookies.get('language') || 'zh',
        sidebarStatus: !!+cookies.get('sidebarStatus'),
        isMobile: isMobileFn(),
        router: constantRouter,
        headerCurRouter: '',
        addRouter: [],
        tableOnlyShowIcon: true,
        sidebarPosition: 'showLeft',
        labelPage: true,
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language
            cookies.set('language', language)
        },
        SET_ROUTER: (state, router) => {
            state.addRouter = router
            state.router = constantRouter.concat(router)
        },
        SET_SIDEBARSTATUS: (state) => {
            if (state.sidebarStatus == 1) {
                cookies.set('sidebarStatus', 0)
            } else {
                cookies.set('sidebarStatus', 1)
            }
            state.sidebarStatus = !state.sidebarStatus
        },
        SET_ISMOBILE: (state, isMobile) => {
            state.isMobile = isMobile
        },
        SET_TABLEONLYSHOWICON: (state, tableOnlyShowIcon) => {
            state.tableOnlyShowIcon = tableOnlyShowIcon
        },
        SET_SIDEBARPOSTION: (state, sidebarPosition) => {
            state.sidebarPosition = sidebarPosition
        },
        SET_LABELPAGE: (state, labelPage) => {
            state.labelPage = labelPage
        },
        SET_HEADERCURROUTER: (state, headerCurRouter) => {
            state.headerCurRouter = headerCurRouter
        }
    },
    actions: {
        setLanguage({ commit }, language) {
            commit('SET_LANGUAGE', language)
        },
        addRoutes({ commit }, newRoutes) {
            commit('SET_ROUTER', newRoutes)
        },
        setSidebarStatus({ commit }) {
            commit('SET_SIDEBARSTATUS')
        },
        setIsMobile({ commit }, isMobile) {
            commit('SET_ISMOBILE', isMobile)
        },
        setTableOnlyShowIcon({ commit }, tableOnlyShowIcon) {
            commit('SET_TABLEONLYSHOWICON', tableOnlyShowIcon)
        },
        setSidebarPosition({ commit }, sidebarPosition) {
            commit('SET_SIDEBARPOSTION', sidebarPosition)
        },
        setLabelPage({ commit }, labelPage) {
            commit('SET_LABELPAGE', labelPage)
        },
        setHeaderCurRouter({ commit }, headerCurRouter) {
            commit('SET_HEADERCURROUTER', headerCurRouter)
        }
    }
}

export default app