const getters = {
    username: state => state.user.username,
    usertoken: state => state.user.usertoken,
    sidebarStatus: state => state.app.sidebarStatus,
    isMobile: state => state.app.isMobile,
    language: state => state.app.language,
    router: state => state.app.router,
    addRouter: state => state.app.addRouter,
    headerCurRouter: state => state.app.headerCurRouter,
    sidebarPosition: state => state.app.sidebarPosition,
    labelPage: state => state.app.labelPage,
    tableOnlyShowIcon: state => state.app.tableOnlyShowIcon,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
}
export default getters