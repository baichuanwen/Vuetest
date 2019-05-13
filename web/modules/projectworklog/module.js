import Config from '@/config'

let projectworklog = {

  module: {
    title: '施工日志',
    icon: 'icon-announce',
    path: '/projectworklog',
    children: [
      { name: 'projectworklogAdd', title: '新增施工日志', type: 'button', icon: 'fa-plus', path: 'projectworklog/add', permission: [116, 117]},
      { name: 'projectworklogList', title: '施工日志列表', icon: 'fa-fa', path: 'projectworklog/list', isActive: true},
      { name: 'projectworklogReportForm', title: '报表', icon: 'fa-fa', path: 'projectworklog/reportForm'}
    ]
  },
    routes: {
        path: '/projectworklog',
        name: 'projectworklog',
        redirect: '/projectworklog/list',
        meta: {
            title: '施工日志',
            icon: 'icon-projectworklog'
        },
      children: [{
        path: 'add',
        name: 'projectworklogAdd',
        meta: {
          title: '新增施工日志',
          permission: []
        },
        component: resolve => require(['@/modules/projectworklog/ProjectworklogAdd.vue'], resolve)
      },{
        path: 'list',
        name: 'projectworklogList',
        meta: {
          title: '施工日志列表',
          permission: []
        },
        component: resolve => require(['@/modules/projectworklog/ProjectworklogList.vue'], resolve)
      },{
        path: 'reportForm',
        name: 'projectworklogReportForm',
        meta: {
          title: '报表',
          permission: []
        },
        component: resolve => require(['@/modules/projectworklog/ProjectworklogReportForm.vue'], resolve)
      }]
    }
}

export default projectworklog
