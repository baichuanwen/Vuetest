import Config from '@/config'

let attendance = {
  module: {
    title: '考勤',
    icon: 'icon-attendance',
    path: '/attendance',
    children: []
  },
    routes: {
        path: '/attendance',
        name: 'attendance',
        meta: {
            title: '考勤',
            icon: 'icon-attendance'
        },
        component: resolve => require(['@/modules/attendance/Attendance.vue'], resolve)
    }
}

export default attendance
