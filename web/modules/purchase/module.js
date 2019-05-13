import Config from '@/config'

let purchase = {
  module: {
    title: '采购',
    icon: 'icon-purchase',
    path: '/purchase',
    children: []
  },
    routes: {
        path: '/purchase',
        name: 'purchase',
        meta: {
            title: '采购',
            icon: 'icon-purchase'
        },
        component: resolve => require(['@/modules/purchase/Purchase.vue'], resolve)
    }
}

export default purchase
