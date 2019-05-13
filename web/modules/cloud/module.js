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
      listSearch: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/search"), request); },
      listSearchDown: function (request) { return $http.post(getSystemServerUrl("/cloudDisk/searchDown"), request); },
      createFile: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/add"), request); },
      renameFile: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/rename"), request); },
      deleteFile: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/delete"), request); },
      uploadSuccess: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/uploadSuccess"), request); },
      findShares: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/findShares"), request); },
      editShare: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/editShare"), request); },
      quitShare: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/quitShare"), request); },
      fileRemoval: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/fileRemoval"), request); },
      setTop: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/setTop"), request); },
      cancelTop: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/cancelTop"), request); },
      // 4.0增查询父级共享人员及部门
      findCloudDiskPersionInfo : function(request) { return $http.post(getSystemServerUrl("/cloudDisk/findCloudDiskPersionInfo"), request); },
      myFileSearch: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/search"), request); },
      myFileCreate: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/add"), request); },
      myFileList: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/list"), request); },
      myFileRename: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/update"), request); },
      myFileDelete: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/delete"), request); },
      myFileUpload: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/uploadFromMyFile"), request); },
      downloadRecord: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/downloadSuccess"), request); },
      myFileUploadSuccess: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/uploadSuccess"), request); },
      myFileRemoval: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/fileRemoval"), request); },
      myFilesetTop: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/setTop"), request); },
      myFilecancelTop: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/cancelTop"), request); },
      fileCopy: function(request) { return $http.post(getSystemServerUrl("/cloudDisk/folderRemoval"), request); },
      myFileCopy: function(request) { return $http.post(getSystemServerUrl("/cloudDiskTransmissionRecord/folderRemoval"), request); }
  }
}
export default cloud
