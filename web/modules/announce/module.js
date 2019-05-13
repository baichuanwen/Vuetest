import { axiosHandle } from '@/libs/util'

let announce = {
    module: {
        title: '公告',
        icon: 'icon-announce',
        path: '/announce',
        name: 'announce',
        children: [
            { name: 'announceAdd', title: '新增公告', type: 'button', icon: 'fa-plus', path: 'announce/add', permission: [116, 117] },
            { name: 'announceList', title: '公告列表', icon: 'fa-fa', path: 'announce/list', isActive: true }
        ]
    },
    routes: {
        path: '/announce',
        name: 'announce',
        redirect: '/announce/list',
        component: {
            render(c) { return c('router-view') }
        },
        meta: {
            title: '公告',
            icon: 'icon-announce'
        },
        children: [{
                path: 'add',
                name: 'announceAdd',
                meta: {
                    title: '新增公告',
                    permission: [116, 117],
                    module: 'announceAdd'
                },
                component: resolve => require(['@/modules/announce/AnnounceAdd.vue'], resolve),
            },
            {
                path: 'edit/:id',
                name: 'announceEdit',
                meta: {
                    title: '编辑公告',
                    permission: [116, 117],
                    module: 'announceEdit'
                },
                component: resolve => require(['@/modules/announce/AnnounceEdit.vue'], resolve),
            },
            {
                path: 'list',
                name: 'announceList',
                meta: {
                    title: '公告列表',
                    module: 'announceList'
                },
                component: resolve => require(['@/modules/announce/AnnounceList.vue'], resolve)
            },
            {
                path: 'detail/:id',
                name: 'announceDetail',
                meta: {
                    title: '公告详情',
                    module: 'announceDetail'
                },
                component: resolve => require(['@/modules/announce/AnnounceDetail.vue'], resolve)
            }
        ]
    },
    // 公告接口地址
    api: {
        announce: {
            listSearch(request) { return axiosHandle('post', '/web/announcement/search', request) },
            historySearch(request) { return axiosHandle('post', '/web/announcement/browseSearch', request) },
            recordSearch(request) { return axiosHandle('post', '/web/announcement/browseRecord', request) },
            addAnnounce(request) { return axiosHandle('post', "/web/announcement/create", request) },
            editAnnounce(request) { return axiosHandle('post', "/web/announcement/update", request) },
            detailSearch(request) { return axiosHandle('post', "/web/announcement/get", request) },
            detailDelete(request) { return axiosHandle('post', "/web/announcement/delete", request) },
            // //一键提醒未读人员4.0增
            oneKeyRemind(request) { return axiosHandle('post', '/web/announcement/oneKeyRemind', request) },
        },
        employee: {
            info(request) { return axiosHandle('post', '/web/employee/info', request) }
        }
    }
}

export default announce