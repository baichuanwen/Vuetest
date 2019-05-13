import Config from '@/config'

let gcbdevcase = {
    module: {
        title: '用法案例',
        icon: 'icon-home',
        path: '/case',
        children: [
            { name: 'gcbdevcase', title: '工程宝案例', path: 'gcbdevcase' },
            { name: 'iviewcase', title: 'IView', path: 'https://www.iviewui.com' },
            { name: 'bootstrapcase', title: 'Vue-Bootstrap', path: 'https://bootstrap-vue.js.org', },
            { name: 'n3case', title: 'N3', path: 'https://n3-components.github.io/N3-components/index.html', }
        ]
    },
    routes: {
        path: '/case',
        title: 'title',
        redirect: '/case/gcbdevcase',
        component: {
            render(c) { return c('router-view') }
        },
        meta: {
            title: '用法案例'
        },
        children: [{
            path: 'gcbdevcase',
            name: 'gcbdevcase',
            meta: {
                title: 'GCB用法案例'
            },
            component: resolve => require(['@/gcbdevcase/gcbDevCase.vue'], resolve)
        }]
    }
}

export default gcbdevcase
