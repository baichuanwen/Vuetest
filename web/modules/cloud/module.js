import Config from '@/config'
import { axiosHandle } from '@/libs/util'
let cloud = {
  module: {
    title: '企业云盘',
    icon: 'icon-cloud',
    path: '/cloud',
    children: [
      { name: 'CloudEnterprise', title: '企业文档', icon: 'fa-plus', path: 'CloudEnterprise' },
      { name: "cloudProject", title: "项目文档", icon: "fa-fa", path: "cloudProject" },
      { name: "cloudFileSubList", title: "我的文件", icon: "fa-fa", path: "cloudFileSubList" }

    ]
  },
    routes: {
        path: '/cloud',
        name: 'cloud',
        meta: {
            title: '企业云盘',
            icon: 'icon-cloud'
        },
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: 'CloudEnterprise',
          name: 'CloudEnterprise',
          meta: {
            title: '企业文档',
          },
          component: resolve => require(['@/modules/cloud/cloud-enterprise/CloudEnterprise.vue'], resolve)
        },
        {
          path: 'cloudEnterpriseSub/:fullName/:id',
          name: 'cloudEnterpriseSub',
          meta: {
            title: '企业文档sub',
          },
          component: resolve => require(['@/modules/cloud/cloud-enterprise/cloudEnterpriseSub.vue'], resolve)
        },
        {
          path: 'cloudProject',
          name: 'cloudProject',
          meta: {
            title: '项目文档',
          },
          component: resolve => require(['@/modules/wisdom/report/wisdomWorkReportDetail.vue'], resolve)
        },
        {
          path: 'cloudFileSubList',
          name: 'cloudFileSubList',
          meta: {
            title: '我的文件',
          },
          component: resolve => require(['@/modules/wisdom/report/wisdomWorkReportSubDetail.vue'], resolve)
        },

      ]
    },
    api: {
      myFileSearch(request) { return axiosHandle('post',"web/cloudDisk/search", request) },
      // listSearch: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/search"), request); },
      // listSearchDown: function (request) { return $http.post(getSystemServerUrl("/cloudDisk/searchDown"), request); },
       createFile(request) { return axiosHandle('post',"web/cloudDisk/add", request); },
       renameFile(request) { return axiosHandle('post',"web/cloudDisk/rename", request) },
      deleteFile(request) { return axiosHandle('post',"web/cloudDisk/delete", request) },
       uploadSuccess(request) { return axiosHandle('post',"web/cloudDisk/uploadSuccess", request) },
      // findShares: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/findShares"), request); },
       editShare(request) { return axiosHandle('post',"web/cloudDisk/editShare", request); },
      // quitShare: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/quitShare"), request); },
       fileRemoval(request) {  return axiosHandle('post',"web/cloudDisk/fileRemoval", request) },
      getOnlineUrl(request) { return axiosHandle('post',"web/previewOnline/getOnlineUrl", request)},
      setTop(request) {  return axiosHandle('post',"web/cloudDisk/setTop", request) },
      cancelTop(request) { return axiosHandle('post',"web/cloudDisk/cancelTop", request) },
      // // 4.0增查询父级共享人员及部门
      // findCloudDiskPersionInfo : function(request) { return $http.post(getSystemServerUrl("/cloudDisk/findCloudDiskPersionInfo"), request); },
      //
      // myFileCreate: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/add"), request); },
      // myFileList: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/list"), request); },
      // myFileRename: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/update"), request); },
      // myFileDelete: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/delete"), request); },
      // myFileUpload: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/uploadFromMyFile"), request); },
      // downloadRecord: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/downloadSuccess"), request); },
      // myFileUploadSuccess: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/uploadSuccess"), request); },
      // myFileRemoval: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/fileRemoval"), request); },
      // myFilesetTop: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/setTop"), request); },
      // myFilecancelTop: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTansmissionRecord/cancelTop"), request); },
       fileCopy: function(request) { return  axiosHandle('post',"web/cloudDisk/folderRemoval", request); },
       myfileCopy(request) { return  axiosHandle('post',"web/cloudDiskTransmissionRecord/folderRemoval", request); }
  }
}
export default cloud
