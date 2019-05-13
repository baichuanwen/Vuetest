import Config from '@/config'
import {axiosHandle} from '@/libs/util'
let project = {
  module: {
    title: '项目看板',
    icon: 'icon-project',
    path: '/project',
    children: [
      { name: 'add', title: '新增项目', type: 'button', icon: 'fa-plus', path: 'add' },
      { name: 'projectList', title: '项目管控平台', icon: 'fa-fa', path: 'projectList', isActive: true },
      { name: 'projectLabelManage', title: '基础设置', icon: 'fa-fa', path: 'projectLabelManage'},
      { name: 'projectPeopleInfo', title: '项目人员信息', icon: 'fa-fa', path: 'projectPeopleInfo'}
    ]
  },
  routes: {
    path: '/project',
    name: 'projectList',
    component: {
      render(c) { return c('router-view') }
    },
    meta: {
      title: '项目看板',
      icon: 'icon-project'
    },
    children:[
      {
        path: 'add',
        name: 'add',
        meta: {
          title: '新增项目',
          permission: [42]
        },
        component: resolve => require(['@/modules/project/project-add/projectAdd.vue'], resolve)
      },
      {
        path: 'edit',
        name: 'edit',
        meta: {
          title: '编辑项目',
          permission: [42]
        },
        component: resolve => require(['@/modules/project/project-edit/projectEdit.vue'], resolve),
      },
      {
        path: 'project',
        name: 'projectList',
        meta: {
          title: '项目列表',
          permission: [42, 43, 217]
        },
        component: resolve => require(['@/modules/project/project-list/projectList.vue'], resolve)
      },
      {
        path: 'projectDetail',
        name: 'projectDetail',
        meta: {
          title: '项目详情/:id',
          permission: [42, 43, 217]
        },
        component: resolve => require(['@/modules/project/project-detail/projectDetail.vue'], resolve)
      }
    ],
    // component: resolve => require(['@/modules/project/Project.vue'], resolve)
  },
  // 项目接口地址
  api: {
    project: {
      create(request) { return axiosHandle('post',"/web/project/create281", request)},
      update(request) { return axiosHandle('post',"/web/project/update281", request)},
      delete(request) { return axiosHandle('post',"/web/project/delete", request)},
      get(request) { return axiosHandle('post',"/web/project/get", request)},
      query(request) { return axiosHandle('post',"/web/project/query", request)},
      search(request) { return axiosHandle('post',"/web/project/search", request)},
      infoQuery(request) { return axiosHandle('post',"/web/project/infoQuery", request)},
      infoSearch(request) { return axiosHandle('post',"/web/project/infoSearch", request)},
      top(request) { return axiosHandle('post',"/web/project/top", request)},
      cancelTop(request) { return axiosHandle('post',"/web/project/cancelTop", request)},
      permissions(request) { return axiosHandle('post',"/web/project/permissions", request)},
      infoOrganizationQuery(request) { return axiosHandle('post',"/web/project/infoOrganizationQuery", request)},
      organizationQuery(request) { return axiosHandle('post',"/web/project/organizationQuery", request)},
      batchStopWork(request) { return axiosHandle('post',"/web/project/batchStopWork", request)},
      batchReWork(request) { return axiosHandle('post',"/web/project/batchReWork", request)},
      statusBatchUpdate(request) {return axiosHandle('post',"/web/project/statusBatchUpdate", request)},

      //zp 添加导入接口
      projectExcelImport(request, options) {
        return Upload.upload({
          url: "/web/project/excelImport",
          data: request,
          options: options
        })
      },
      // 导出接口
      projectExportExcel(request) {
        return axiosHandle('post',"/web/project/excelExport", request, {responseType :"blob"}).success(function(data, status, headers){
          headers = headers();
          var contentType = headers["content-type"];
          var contentDisposition = headers["content-disposition"].split(";");
          var fileName = contentDisposition[contentDisposition.length - 1].split("=")[1].replace(/"/g, "");
          var document = window.document;
          var file = new Blob([data], {type: contentType});
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.className = "hidden";
          a.href = window.URL.createObjectURL(file);
          a.download = decodeURI(fileName);
          a.click();
        });
      }

    }
  }
}

export default project
