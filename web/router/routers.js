// 配置文件
import Config from '@/config'
// Framework
import Full from '@/framework/Full'

// 登陆
let Login = {
    path: '/',
    name: 'Login',
    meta: {
        title: '登录'
    },
    component: resolve => require(['@/modules/login/Login.vue'], resolve)
}

// 注册
let Register = {
    path: '/register',
    name: 'Register',
    meta: {
        title: '注册'
    },
    component: resolve => require(['@/modules/register/Register.vue'], resolve)
}
// 注册协议
let RegisterProtical = {
    path: '/registerProtical',
    name: 'RegisterProtical',
    meta: {
        title: '注册协议'
    },
    component: resolve => require(['@/modules/register/RegisterProtical.vue'], resolve)
}
//忘记密码
let ForgetPassword = {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    meta: {
        title: '忘记密码'
    },
    component: resolve => require(['@/modules/forgetpassword/ForgetPassword.vue'], resolve)
}

let moduleRouter = []
Config.gcbModules.forEach((module, index) => {
    moduleRouter.push(module.routes)
})

// 主页
let Home = {
    path: '/home',
    name: 'Home',
    component: Full,
    meta: {
        title: '主页'
    },
    children: [
        // 没有权限
        {
            path: '/page500',
            name: 'Page500',
            meta: {
                title: '没有权限'
            },
            component: resolve => require(['@/modules/Page500.vue'], resolve)
        }
    ].concat(moduleRouter)
}

export default [].concat(Login, Register, Home, ForgetPassword, RegisterProtical)
//export default [].concat(Login, Register,moduleRouter)
