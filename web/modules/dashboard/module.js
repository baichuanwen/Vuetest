import {
  axiosHandle
} from '@/libs/util'
let dashboard = {
  module: {
    title: '工作台',
    icon: 'icon-home1',
    path: '/home',
    name: 'home'
  },
  routes: {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/modules/dashboard/home.vue'], resolve)
  },
  // 汇报接口地址
  api: {
    home: {
      systemGreet(request) {
        return axiosHandle('post', '/web/systemGreet/get', request)
      },
      lastUnRead(request) {
        return axiosHandle('post', '/web/announcement/lastUnRead', request)
      },
      index(request) {
        return axiosHandle('post', '/web/workReport/index', request)
      },
      backlogSearch(request) {
        return axiosHandle('post', '/web/backlog/search', request)
      },
      calendarTitleSearch(request) {
        return axiosHandle('post', '/web/attendanceStatistics/myStatistics', request)
      },
      workReportSummary(request) {
        return axiosHandle('post', '/web/workReport/summary', request)
      },
      taskTotalSearch(request) {
        return axiosHandle('post', '/web/task/total', request)
      },
      statisWorkbench(request) {
        return axiosHandle('post', '/web/attendanceStatistics/statis4Workbench', request)
      },
      submmitStatiscs(request) {
        return axiosHandle('post', '/web/workReport/submmitStatiscs', request)
      },
      homeMenuList(request) {
        return axiosHandle('post', '/web/deskEmployeeMenu/list', request)
      },
      homeProjectList(request) {
        return axiosHandle('post', '/web/deskEmployeeProject/list', request)
      }
    }
  }
}

export default dashboard
