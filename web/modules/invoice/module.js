import Config from '@/config'

let invoice = {

  module: {
    title: '发票管理',
    icon: 'icon-invoice',
    path: '/invoice',
    children: []
  },
    routes: {
        path: '/invoice',
        name: 'invoice',
        meta: {
            title: '发票管理',
            icon: 'icon-invoice'
        },
        component: resolve => require(['@/modules/invoice/Invoice.vue'], resolve)
    }
}

export default invoice
