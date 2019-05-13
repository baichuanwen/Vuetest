import Config from '@/config'
import { axiosHandle } from '@/libs/util'

let approval = {
    module: {
        title: '审批',
        icon: 'icon-approval',
        path: '/approvalApply',
        children: [
            { name: 'approvalAdd', title: '新建审批', type: 'button', icon: 'fa-plus', path: 'approvalAdd' },
            { name: 'approvalApply', title: '我的申请', icon: 'fa-fa', path: 'approvalApply', isActive: true },
            { name: 'approvalMyApproval', title: '我的审批', icon: 'fa-fa', path: 'approvalMyApproval' },
            { name: 'approvalCopy', title: '抄送我的', icon: 'fa-fa', path: 'approvalCopy' },
            { name: 'approvalManage', title: '审批管理', icon: 'fa-fa', path: 'approvalManage' },
            { name: 'approvalSetting', title: '功能设置', icon: 'fa-fa', path: 'approvalSetting' }
        ]
    },
    routes: {
        path: '/approval',
        name: 'approval',
        redirect: '/approval/approvalApply',
        meta: {
            title: '审批',
            icon: 'icon-approval'
        },
        component: resolve => require(['@/modules/approval/ApprovalList.vue'], resolve),
        children: [{
            path: 'add',
            name: 'add',
            meta: {
                title: '新增审批',
                permission: [116, 117]
            },
            component: resolve => require(['@/modules/approval/ApprovalAdd.vue'], resolve),
        },
        {
            path: 'edit',
            name: 'edit',
            meta: {
                title: '编辑审批',
                permission: [116, 117]
            },
            component: resolve => require(['@/modules/approval/ApprovalEdit.vue'], resolve),
        },
        {
            path: 'approvalApply',
            name: 'approvalApply',
            meta: {
                title: '我的申请',
                permission: [116, 117]
            },
            component: resolve => require(['@/modules/approval/ApprovalList.vue'], resolve),
        }
    ]
    },
      // 公告接口地址
      api: {
        approval: {
            myApplyList(request) { return axiosHandle('post', '/web/process/myApplication', request) },
        }
    }
}

export default approval
