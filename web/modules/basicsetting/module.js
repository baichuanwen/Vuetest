import Config from '@/config'

let basicsetting = {
  module: {
    title: '基础设置',
    icon: 'icon-basicsetting',
    path: '/basicsetting',

  },
  routes: {
    path: '/basicsetting',
    name: 'basicsetting',
    meta: {
        title: '基础设置',
        icon: 'icon-basicsetting'
    },
    component: resolve => require(['@/modules/basicsetting/Basicsetting.vue'], resolve)
    }
}
export default basicsetting


