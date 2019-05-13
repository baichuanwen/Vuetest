import Config from '@/config'

let security = {
    module: {
      title: '安全',
      icon: 'icon-security',
      path: '/security',
      name: 'security',
      children: []
    },
    routes: {
        path: '/security',
        name: 'security',
        meta: {
            title: '安全',
            icon: 'icon-security'
        },
        component: resolve => require(['@/modules/security/Security.vue'], resolve)
    }
}

export default security
