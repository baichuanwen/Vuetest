import Config from '@/config'

let certificate = {

  module: {
    title: '证书',
    icon: 'icon-certificate',
    path: '/certificate',
    children: []
  },
    routes: {
        path: '/certificate',
        name: 'certificate',
        meta: {
            title: '证书',
            icon: 'icon-certificate'
        },
        component: resolve => require(['@/modules/certificate/Certificate.vue'], resolve)
    }
}

export default certificate
