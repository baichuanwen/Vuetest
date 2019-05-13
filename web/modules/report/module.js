import Config from '@/config'
import { axiosHandle } from '@/libs/util'
let report = {
    module: {
        title: '工作汇报',
        icon: 'icon-report',
        path: '/report',
        children: [
            { name: 'reportAdd', title: '新增汇报', type: 'button', icon: 'fa-plus', path: 'reportAdd' },
            { name: 'reportList', title: '汇报列表', icon: 'fa-fa', path: 'reportList', isActive: true },
            { name: 'reportReview', title: '汇报评阅', icon: 'fa-fa', path: 'reportReview',},
            { name: 'reportStatistics', title: '汇报统计', icon: 'fa-fa', path: 'reportStatistics',},
        ]
    },
    routes: {
        path: '/report',
        name: 'report',
        redirect: '/report/list',
        component: {
            render(c) { return c('router-view') }
        },
        meta: {
            title: '工作汇报',
            icon: 'icon-report'
        },
        children: [{
                path: 'reportAdd',
                name: 'reportAdd',
                meta: {
                    title: '新增汇报',
                    permission: []
                },
                component: resolve => require(['@/modules/report/report-add/reportAdd.vue'], resolve),
            },
          {
                path: 'reportList',
                name: 'reportList',
                meta: {
                    title: '汇报列表',
                },
                component: resolve => require(['@/modules/report/report-list/reportList.vue'], resolve)
            },
            {
              path: 'reportDetail/:id',
              name: 'reportDetail',
              meta: {
                title: '汇报详情',
              },
              component: resolve => require(['@/modules/report/report-detail/reportDetail.vue'], resolve)
            },
          {
            path: 'reportDetailReview/:id',
            name: 'reportDetailReview',
            meta: {
              title: '评阅详情',
            },
            component: resolve => require(['@/modules/report/report-detail-review/reportDetailReview.vue'], resolve)
          },

          {
            path: 'reportEdit/:id',
            name: 'reportEdit',
            meta: {
              title: '汇报编辑',
            },
            permission: [116, 117],
            component: resolve => require(['@/modules/report/report-edit/reportEdit.vue'], resolve)
          },
            {
              path: 'reportReview',
              name: 'reportReview',
              meta: {
                title: '汇报评阅',
              },
              component: resolve => require(['@/modules/report/report-review/report-review.vue'], resolve)
            },
            {
              path: 'reportStatistics',
              name: 'reportStatistics',
              meta: {
                title: '汇报统计',
              },
              component: resolve => require(['@/modules/report/report-statistics/reportStatistics.vue'], resolve)
            },
        ]
    },
    // 汇报接口地址
    api:{
        report:{
            commentSearch(request) { return axiosHandle('post',"/web/workReportComment/search", request)},
            listSearch(request) { return axiosHandle('post',"/web/workReport/search", request)},
            reviewSearch(request) { return axiosHandle('post',"/web/workReport/review", request)},
            addReport(request) { return axiosHandle('post',"/web/workReport/create", request)},
            editReport(request) { return axiosHandle('post',"/web/workReport/update", request)},
            deleteReport(request) { return axiosHandle('post',"/web/workReport/delete", request)},
            detailSearch(request) { return axiosHandle('post',"/web/workReport/get", request)},
            statisticsSearch(request) { return axiosHandle('post',"/web/workReport/statistics", request)},
            weekSearch(request) { return axiosHandle('post',"/web/workReport/weeklyDate", request)},
            addComment(request) { return axiosHandle('post',"/web/workReportComment/create", request)},
            replyComment(request) { return axiosHandle('post',"/web//workReportComment/createReply", request)},
            deleteComment(request) {  return axiosHandle('post',"/web/workReportComment/delete", request)},
            browseSearch(request) { return axiosHandle('post',"/web/workReportBrowse/browseSearch", request)},
            praiseSearch(request) {return axiosHandle('post',"/web/workReportPraise/search", request)},
            createLike(request) { return axiosHandle('post',"/web/workReportPraise/create", request)},
            cancelLike(request) {  return axiosHandle('post',"/web/workReportPraise/cancel", request)},
            createFocus(request) { return axiosHandle('post',"/web/workReportAttention/create", request)},
            cancelFocus(request) { return axiosHandle('post',"/web/workReportAttention/cancel", request)},
            remind(request) { return axiosHandle('post',"/web/workReport/remind", request)},
            index(request) { return $http.post(getSystemServerUrl("/workReport/index"), request);},
            reviewIds(request) {  return axiosHandle('post',"/web/workReport/reviewIds", request)},
          // 未提交人员一键提醒4.0增
            oneKeyRemind(request) {return axiosHandle('post',"/web/workReport/oneKeyRemind", request)},
            // 临时数据
            hideData(request) { return $http.post(getSystemServerUrl("/company/queryRegistCount"), request);},
            // 导出
            exportDetailWord(request) {return axiosHandle('post',"/web/workReport/exportWordDetail", request, {responseType :"blob"})},
            exportDetailPdf(request) {return axiosHandle('post',"/web/workReport/exportPdfDetail", request, {responseType :"blob"})},
            exportWord(request) {return axiosHandle('post',"/web/workReport/exportWord",request, {responseType :"blob"})},
            exportPdf(request) {return axiosHandle('post',"/web/workReport/exportPdf",request, {responseType :"blob"})},
            exportReviewPdf(request) {return axiosHandle('post',"/web/workReport/exportReviewPdf",request, {responseType :"blob"})},
            exportReviewWord(request) {return axiosHandle('post',"/web/workReport/exportReviewWord",request, {responseType :"blob"})},
        },
    }

}

export default report
