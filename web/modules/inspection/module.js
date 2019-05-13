import { axiosHandle } from '@/libs/util'

let inspection = {

    module: {
        title: '日常巡检',
        icon: 'icon-inspection',
        path: '/inspection',
        name: 'inspection',
        children: [
            { name: 'inspectionAdd', title: '新增巡检', type: 'button', icon: 'fa-plus', path: 'inspection/add', permission: [129] },
            { name: 'inspectionList', title: '巡检列表', icon: 'fa-fa', path: 'inspection/list', isActive: true },
        ]
    },
    routes: {
        path: '/inspection',
        name: 'inspection',
        redirect: '/inspection/list',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            title: '日常巡检',
            icon: 'icon-inspection'
        },
        children: [{
                path: 'add',
                name: 'inspectionAdd',
                meta: {
                    title: '新增巡检',
                    permission: [129],
                    module: 'inspectionAdd'
                },
                component: resolve => require(['@/modules/inspection/inspection-add/inspectionAdd.vue'], resolve)
            },
            {
                path: 'list',
                name: 'inspectionList',
                meta: {
                    title: '巡检列表',
                    module: 'inspectionList'
                },
                component: resolve => require(['@/modules/inspection/inspection-list/inspectionList.vue'], resolve)
            },
            {
                path: 'detail/:id',
                name: 'inspectionDetail',
                meta: {
                    title: '查看巡检',
                    module: 'inspectionDetail'
                },
                component: resolve => require(['@/modules/inspection/inspection-detail/inspectionDetail.vue'], resolve)
            },
            {
                path: 'edit/:id',
                name: 'inspectionEdit',
                meta: {
                    title: '编辑巡检',
                    module: 'inspectionEdit',
                    permission: [129]
                },
                component: resolve => require(['@/modules/inspection/inspection-edit/inspectionEdit.vue'], resolve)
            }
        ]
    },
    api: {
        inspection: {
            addInspection(request) { return axiosHandle('post', '/web/dailyPatrol/create', request) },
            editInspection(request) { return axiosHandle('post', '/web/dailyPatrol/update', request) },
            listSearch(request) { return axiosHandle('post', '/web/dailyPatrol/query', request) },
            deleteInspection(request) { return axiosHandle('post', '/web/dailyPatrol/delete', request) },
            detailInspection(request) { return axiosHandle('post', '/web/dailyPatrol/detail', request) },
            commentSearch(request) { return axiosHandle('post', '/web/dailyComment/query', request) },
            addComment(request) { return axiosHandle('post', '/web/dailyComment/create', request) },
            deleteComment(request) { return axiosHandle('post', '/web/dailyComment/delete', request) },
            replyComment(request) { return axiosHandle('post', '/web/dailyComment/reply', request) },
            //导出
            exportExcel(request) { return axiosHandle('post', "/web/dailyPatrol/listExcel", request, { responseType: "blob" }) },
            exportPdf(request) { return axiosHandle('post', "/web/dailyPatrol/listPdf", request, { responseType: "blob" }) },
            exportWord(request) { return axiosHandle('post', "/web/dailyPatrol/detailWord", request, { responseType: "blob" }) },
            exportDetailPdf(request) { return axiosHandle('post', "/web/dailyPatrol/detailPdf", request, { responseType: "blob" }) }
        }
    }
}

export default inspection
