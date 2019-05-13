import Config from '@/config'

let inventory = {

  module: {
    title: '库存',
    icon: 'icon-inventory',
    path: '/inventory',
    children: []
  },
    routes: {
        path: '/inventory',
        name: 'inventory',
        meta: {
            title: '库存',
            icon: 'icon-inventory'
        },
        component: resolve => require(['@/modules/inventory/Inventory.vue'], resolve)
    }
}

export default inventory
