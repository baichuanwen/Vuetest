import Config from '@/config'

let labormanage = {
    module: {
        title: '劳务实名制',
        icon: 'icon-labormanage',
        path: '/labormanage',
        children: [
            { name: 'laborNameList', title: '花名册', icon: 'fa-fa', path: 'laborNameList', isActive: true, permission: [116, 117]}
        ]
    },
    routes: {
        path: '/labormanage',
        name: 'labormanage',
        redirect: '/labormanage/laborNameList',
        component: {
            render(c) { return c('router-view') }
        },
        meta: {
            title: '劳务实名制',
            icon: 'icon-labormanage'
        },
        children: [{
                path: 'laborNameList',
                name: 'laborNameList',
                meta: {
                    title: '新增公告',
                    permission: [116, 117]
                },
                component: resolve => require(['@/modules/labormanage/Labormanage.vue'], resolve),
            }
        ]
    },
    // 公告接口地址
    api: {
        announce: {
            listSearch(request) { return axiosHandle('post', '/web/announcement/search', request) },
            historySearch(request) { return axiosHandle('post', '/web/announcement/browseSearch', request)},
            recordSearch(request) { return axiosHandle('post', '/web/announcement/browseRecord', request)},
            addAnnounce(request) { return axiosHandle('post', "/web/announcement/create", request)},
            editAnnounce(request) { return axiosHandle('post', "/web/announcement/update", request)},
            detailSearch(request) { return axiosHandle('post', "/web/announcement/get", request)},
            detailDelete(request) { return axiosHandle('post', "/web/announcement/delete", request)},
            // //一键提醒未读人员4.0增
            oneKeyRemind(request) { return axiosHandle('post', '/web/announcement/oneKeyRemind', request) },
        },
        employee: {
            info(request) { return axiosHandle('post', '/web/employee/info', request) }
        }
    }
}

export default labormanage
