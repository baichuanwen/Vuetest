import Config from '@/config'
import { axiosHandle } from '@/libs/util'
let knowledge = {
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
    title: '知识',
    icon: 'icon-knowledge',
    path: '/knowledge',
    name: 'knowledge',
    children: [
      { title: '新增知识', icon: 'fa-plus', name: 'knowledgeAdd', path: 'add', type: 'button'},
      { title: '知识列表', icon: 'fa-fa', name: 'knowledgeList',   path: 'knowledge/list', isActive: true },
      { title: '我的知识', icon: null, name: 'myKnowledge',  path: 'myKnowledge'},
      { title: '知识分类', icon: null, name: 'knowledgeClassify',  path: 'knowledgeClassify'}
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
    path: '/knowledge',
    redirect:"/knowledge/list",
    name: 'knowledge',
    meta: {
      title: '知识'
    },
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [{
      path: 'add',
      name: 'knowledgeAdd',
      meta: {
        title: '新增知识',
        permission: null,
        module: "knowledgeAdd"
      },
      component: resolve => require(['@/modules/knowledge/knowledgeAdd.vue'], resolve),
    },
      {
        path: 'edit/:id',
        name: 'knowledgeEdit',
        meta: {
          title: '编辑知识',
          permission: null,
          module: "myKnowledge"
        },
        component: resolve => require(['@/modules/knowledge/knowledgeEdit.vue'], resolve),
      },
      {
        path: 'list',
        name: 'knowledgeList',
        meta: {
          title: '知识列表',
          permission: null,
          module: "knowledgeList"
        },
        component: resolve => require(['@/modules/knowledge/knowledgeList.vue'], resolve)
      },
      {
        path: 'knowledgeDetail/:id',
        name: 'knowledgeDetail',
        meta: {
          title: '知识详情',
          permission: null,
          module: "knowledgeList"
        },
        component: resolve => require(['@/modules/knowledge/knowledgeDetail.vue'], resolve)
      },
      {
        path: 'myKnowledge',
        name: 'myKnowledge',
        meta: {
          title: '我的知识',
          permission: null,
          module: "myKnowledge"
        },
        component: resolve => require(['@/modules/knowledge/myKnowledge.vue'], resolve)
      },
      {
        path: 'knowledgeClassify',
        name: 'knowledgeClassify',
        meta: {
          title: '知识分类',
          permission: [115],
          module: "knowledgeClassify"
        },
        component: resolve => require(['@/modules/knowledge/knowledgeClassify.vue'], resolve)
      }
    ]
  },
  // 公告接口地址
  api: {
    upload(request, options) {return Upload.upload("/web/file/upload",  request ,options)},
    knowledgeList(request) { return axiosHandle('post', '/web/knowledge/query', request)},
    myKnowledgeList(request){ return axiosHandle('post', '/web/knowledge/queryMine', request)},
    knowledgeDetails(request) { return axiosHandle('post', '/web/knowledge/detail', request)},
    createKnowledge(request) {  return axiosHandle('post', '/web/knowledge/create', request)},
    deleteKnowledge(request){return axiosHandle('post', '/web/knowledge/delete', request)},
     updateKnowledge(request) {return axiosHandle('post', '/web/knowledge/update', request)},
    classifyList(request) { return axiosHandle('post', '/web/knowledgeCategory/query', request)},
     createClassify(request) {  return axiosHandle('post', '/web/knowledgeCategory/create', request) },
    deleteClassify(request) {return axiosHandle('post', '/web/knowledgeCategory/delete', request)},
     updateClassify(request) { return axiosHandle('post', '/web/knowledgeCategory/update', request)},
    knowledgeBrowse(request) { return axiosHandle('post', '/web/knowledgeBrowse/query', request)},
  }
}
export default knowledge
