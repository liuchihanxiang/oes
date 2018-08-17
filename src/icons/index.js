import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
import generateIconsView from '@/views/dev/icon/generateIconsView.js'

Vue.component('svg-icon',SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svgs', false, /\.svg$/)
const iconMap = requireAll(req)

generateIconsView.generate(iconMap) 