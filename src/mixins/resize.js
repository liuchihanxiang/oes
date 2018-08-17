import store from '@/store'
import { isMobileFn } from '@/utils'


export default {
    //   watch: {
    //     $route(route) {
    //       if (this.device === 'mobile' && this.sidebar.opened) {
    //         store.dispatch('closeSideBar', { withoutAnimation: false })
    //       }
    //     }
    //   },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    mounted() {
        const isMobile = this.isMobileFn()
        if (isMobile) {
            store.dispatch('setIsMobile', isMobile)
            if (isMobile && this.isCollapse) {
                this.toggleSidebar()
            }
        }
    },
    methods: {
        isMobileFn,
        resizeHandler() {
            const isMobile = this.isMobileFn()
            store.dispatch('setIsMobile', isMobile)
            if (isMobile && this.sidebarStatus) {
                console.log(111);
                this.toggleSidebar()
            }
        }
    }
}