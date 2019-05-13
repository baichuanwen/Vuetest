import Config from '@/config'

let quality = {
  /*
   * title: 显示名称
   * icon：显示图标
   * path：页面路由 对应routes中的path
   * children: 子模块
   * name：模块名称 对应进入该模块默认页面的name 唯一
   * type：模块类型 如按钮 type--button
   * isActive: 默认显示模块
   *
   * */
  module: {
    title: '质量',
    icon: 'icon-quality',
    path: '/quality',
    name: 'quality',
    children: [
      {title: '质量计划', name: 'qualityPlan', icon: 'fa-plus', path: 'planList', isActive: true},
      {title: '质量检查', name: 'qualityInspect', icon: 'fa-fa', path: 'inspectList'}
    ]
  },

  /*
   * path：路由路径
   * redirect：页面重定向
   * name：路由名称
   * title：显示名称
   * module：左侧菜单高亮 该页面属于那个模块就对应模块中的 name
   * component: html页面的url路径
   * permission：用户权限
   *
   * */
  routes: {
    path: '/quality',
    name: 'quality',
    meta: {
      title: '质量',
      icon: 'icon-quality'
    },
    component: {
      render(c) {
        return c("router-view")
      }
    },
    children: [
      //计划列表
      {
        path: "planList",
        name: "qualityPlan",
        meta: {
          title: "计划",
          permission: [239, 240, 145],
          module: "qualityPlan"
        },
        component: resolve => require(['@/modules/quality/qualityPlan/qualityPlanList.vue'], resolve),
      },
      //计划新增
      {
        path: "planAdd",
        name: "planAdd",
        meta: {
          title: "计划新增",
          permission: [240, 145],
          module: "qualityPlan"
        },
        component: resolve => require(['@/modules/quality/qualityPlan/qualityPlanAdd.vue'], resolve),
      },
      //计划编辑
      {
        path: "planEdit",
        name: "planEdit",
        meta: {
          title: "计划编辑",
          permission: [239, 240, 145],
          module: "qualityPlan"
        },
        component: resolve => require(['@/modules/quality/qualityPlan/qualityPlanEdit.vue'], resolve),
      },
      //计划详情
      {
        path: "planDetail",
        name: "planDetail",
        meta: {
          title: "计划详情",
          permission: [239, 240, 145],
          module: "qualityPlan"
        },
        component: resolve => require(['@/modules/quality/qualityPlan/qualityPlanDetail.vue'], resolve),
      }
    ]
  }
}

export default quality
