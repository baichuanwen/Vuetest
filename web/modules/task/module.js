import Config from '@/config'

let task = {
  module: {
    title: '任务',
    icon: 'icon-task',
    path: '/task',
    children: []
  },
    routes: {
        path: '/task',
        name: 'task',
        meta: {
            title: '任务',
            icon: 'icon-task'
        },
        component: resolve => require(['@/modules/task/Task.vue'], resolve)
    }
}

export default task
