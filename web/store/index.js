import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import sidebar from './modules/sidebar'
import demo from './modules/demo'
import cloud from './modules/cloud'


// vuex文档
// https://vuex.vuejs.org/zh/guide/
// https://cn.vuejs.org/v2/guide/state-management.html
Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        user,
        sidebar,
        demo,
        cloud
    }
})
