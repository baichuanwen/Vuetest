import Vue from 'vue'

import gcbTest from './gcbTest'
import gcbLoading from './gcbloading'
import gcbUeditor from './gcbueditor/gcbUeditor'
import gcbPosition from './gcbposition'
import gcbDeparment from './gcbDeparment'
import gcbDeparmentTree from './gcbdeparmenttree'
import gcbEmployee from './gcbemployee'
import gcbEmployeeTree from './gcbemployeetree'
import gcbProject from './gcbproject'
import gcbProjectTree from './gcbprojecttree'
import gcbCertificate from './gcbcertificate'
import gcbContract from './gcbcontract'
import gcbContractTree from './gcbcontracttree'
import gcbProjectMultiple from './gcbprojectmultiple'
import gcbProjectTreeMultiple from './gcbprojecttreemultiple'
import gcbDeparmentMultiple from './gcbdeparmentmultiple'
import gcbDeparmentMultipleTree from './gcbdeparmentmultipletree'
import gcbCertificateType from './gcbCertificateType'
import gcbCustomModules from './gcbcustommodules'
import gcbUpload from './gcbupload/gcbUpload'
import gcbUploadDetail from './gcbUploaddetail/gcbUploadDetail'
// import gcbProjects from './gcbprojects'
import gcbModal from './gcbmodal1'
import gcbReadRecord from './gcbReadRecord'
import tooltip from './gcbToolTip'
import gcbImgViewer from './gcbimgviewer'
import gcbKnowledgeType from './gcbKnowledgeType'
import gcbprojectsss from './gcbprojectsss'



const GCBFrameWork = {
  gcbTest,
  gcbLoading,
  gcbUeditor,
  gcbPosition,
  gcbDeparment,
  gcbDeparmentTree,
  gcbEmployee,
  gcbEmployeeTree,
  gcbProject,
  gcbProjectTree,
  gcbCertificate,
  gcbContract,
  gcbContractTree,
  //gcbProjects,
  gcbModal,
  gcbReadRecord,
  tooltip,
  gcbKnowledgeType,
  gcbCertificateType,
  gcbProjectMultiple,
  gcbProjectTreeMultiple,
  gcbDeparmentMultiple,
  gcbDeparmentMultipleTree,
  gcbImgViewer,
  gcbCustomModules,
  gcbprojectsss,
  gcbUpload,
  gcbUploadDetail
}

const install = function () {
  Object.keys(GCBFrameWork).forEach((key) => {
    Vue.component(key, GCBFrameWork[key])
  })
}

// _resources: ["$q", function($q) {
//                     deferred = $q.defer();
//                     if (!isLoad) {
//                         require(files,
//                             function() { deferred.resolve('加载成功'); }
//                             // function(err) { deferred.reject(err); }
//                         );
//                         isLoad = !isLoad;
//                     } else {
//                         deferred.resolve('已经加载');
//                     }
//                     return deferred.promise;
//                 }]


// lazyLoad(router.files).then(function(success) {
//                         console.log(success)
//                     }, function(error) {
//                         console.log(error)
//                     }, function(notify) {
//                         console.log(notify)
//                     }).catch(function(error) {
//                         console.log(error)
//                     })


export default Object.assign(GCBFrameWork, {install})
