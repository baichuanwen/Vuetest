import Config from '@/config'

let contract = {

  module: {
    title: '合同管理',
    icon: 'icon-contract',
    path: '/contract',
    children: []
  },
    routes: {
        path: '/contract',
        name: 'contract',
        meta: {
            title: '合同管理',
            icon: 'icon-contract'
        },
        component: resolve => require(['@/modules/contract/Contract.vue'], resolve)
    }
}

export default contract
