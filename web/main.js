import Vue from 'vue'
// import 'es6-promise/auto'
import promise from 'es6-promise'

import 'babel-polyfill'
import App from './App'
import config from '@/config'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/gcbstyle/iview.less'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'
import GcbComponents from '@/gcbcomponents/index'
// 路由
import router from './router'
// 过滤器
import * as filters from './filters'

// 文本编辑器 ueditor
import './../static/ueditor/ueditor.config.js'
import './../static/ueditor/ueditor.all.js'
import './../static/ueditor/lang/zh-cn/zh-cn.js'
import './../static/ueditor/ueditor.parse.min.js'
// 引入echarts
// import echarts from 'echarts'
/* 时间过滤器 */
import moment from 'moment'

// Vue.prototype.$echarts = echarts
// bootstrap组件  https://bootstrap-vue.js.org/docs/components/dropdown/
Vue.use(BootstrapVue)
promise.polyfill()
// iView组件  https://www.iviewui.com/docs/guide/start
Vue.use(iView)//vue 报错解决：TypeError: Cannot read property '_t' of undefined"
// Vue.use(iView, {
//   i18n: function (path, options) {
//     let value = i18n.t(path, options)
//     if (value !== null && value !== undefined) {
//       return value
//     }
//     return ''
//   }
// })
// N3 组件https://n3-components.github.io/N3-components/
Vue.use(N3Components)

// 引入vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: 'c3394ec51e11d1167579a6f69e41970d',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

// 全局注册应用配置
Vue.prototype.$config = config

// 全局注册工程宝组件
Vue.use(GcbComponents)
Vue.prototype.$gcb = GcbComponents

// 过滤器注册
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
/* 时间过滤器 */
Vue.filter('YYYYMMDD', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})
Vue.filter('YYYYMMDDHHMM', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
})

new Vue({
    el: '#app',
    router,
    store,
    gcbVue:new Vue(),
    template: '<App/>',
    components: {
        App
    }
})
