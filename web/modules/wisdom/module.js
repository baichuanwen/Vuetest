import Config from '@/config'
import { axiosHandle } from '@/libs/util'
let wisdom = {
  module: {
    title: '智能报表',
    icon: 'icon-wisdom',
    path: '/wisdom',
    children: [
      { name: 'wisdomWorkReportList', title: '汇报报表', icon: 'fa-plus', path: 'wisdomWorkReportList' },
    ]
  },
    routes: {
        path: '/wisdom',
        name: 'wisdom',
        meta: {
            title: '智能报表',
            icon: 'icon-wisdom'
        },
        component: {
          render(c) { return c('router-view') }
        },
      children: [
        {
          path: 'wisdomWorkReportList',
          name: 'wisdomWorkReportList',
          meta: {
            title: '汇报报表',
          },
          component: resolve => require(['@/modules/wisdom/report/wisdomWorkReportList.vue'], resolve)
        },
        {
          path: 'wisdomWorkReportDetail',
          name: 'wisdomWorkReportDetail',
          meta: {
            title: '汇报报表',
          },
          component: resolve => require(['@/modules/wisdom/report/wisdomWorkReportDetail.vue'], resolve)
        },
        {
          path: 'wisdomWorkReportSubDetail',
          name: 'wisdomWorkReportSubDetail',
          meta: {
            title: '汇报报表',
          },
          component: resolve => require(['@/modules/wisdom/report/wisdomWorkReportSubDetail.vue'], resolve)
        },

      ]
    },
  api:{
    // 汇报接口地址
    report:{
      dayReport(request) {return axiosHandle('post',"/web/reportWorkReport/all", request)},
      dailyReportExport(request) {return axiosHandle('post',"/web/reportWorkReport/allExport", request,{responseType: "blob" })},
      dailyReportYear(request) { return axiosHandle('post',"/web/reportWorkReport/dailyReportEmployeeSummary", request) },
      dailyReportYearExport(request) { return axiosHandle('post',"/web/reportWorkReport/dailyReportEmployeeSummaryExport",request,{responseType: "blob" }) },
      dailyReportMonth(request) { return axiosHandle('post',"/web/reportWorkReport/dailyReportMonthSummary", request) },
      dailyReportEmployeeDetail(request) { return axiosHandle('post',"/web/reportWorkReport/dailyReportEmployeeDetail", request) },
      dailyReportEmployeeDetailExport(request) { return axiosHandle('post',"/web/reportWorkReport/dailyReportEmployeeDetailExport", request,{responseType: "blob" }) },
      weeklyReportEmployeeSummary(request) { return axiosHandle('post',"/web/reportWorkReport/weeklyReportEmployeeSummary", request)},
      weeklyReportEmployeeSummaryExport(request) { return axiosHandle('post',"/web/reportWorkReport/weeklyReportEmployeeSummaryExport", request,{responseType: "blob" }) },
      weeklyReportEmployeeDetail(request) { return axiosHandle('post',"/web/reportWorkReport/weeklyReportEmployeeDetail", request) },
      weeklyReportEmployeeDetailExport(request) {return axiosHandle('post',"/web/reportWorkReport/weeklyReportEmployeeDetailExport",request,{responseType: "blob" }) },
      monthlyReportEmployeeDetail(request) {return axiosHandle('post',"/web/reportWorkReport/monthlyReportEmployeeDetail", request)},
      monthlyReportEmployeeDetailExport(request) { return axiosHandle('post',"/web/reportWorkReport/monthlyReportEmployeeDetailExport",request,{responseType: "blob" })  }
    },
  }
}
export default wisdom
