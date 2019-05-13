import { login, logout, getLoginData, getCusCompany } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        company: '',
        cusCompany: [],
        employee: '',
        menu: [],
        permissions: {},
        loginData: getToken
    },
    mutations: {
        setCompany(state, company) {
            state.company = company
        },
        setCusCompany(state, cuscompany) {
            state.cusCompany = cuscompany
        },
        setEmployee(state, employee) {
            state.employee = employee
        },
        setMenus(state, menus) {
            state.menus = menus
        },
        setPermissions(state, permissions) {
            if (!Array.isArray(permissions)) return
            permissions && permissions.forEach((permission, index) => {
                state.permissions[permission.id] = permission
            })
        },
        setLoginData(state, logindata) {
            state.loginData = logindata
            setToken(logindata)
        }
    },
    actions: {
        // 登录
        handleLogin({ commit }, { username, password, isAutoLogin }) {
            // username = username.trim()
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password,
                    isAutoLogin
                }).then(res => {
                    const data = res
                    if (!data.error) {
                        commit('setLoginData', data)
                    }
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({ state, commit }) {
            return new Promise((resolve, reject) => {
                // 如果退出登录无需请求接口,清空数据
                commit('setLoginData', '')
                commit('setPermissions', [])
                resolve()
            })
        },
        // 获取切换公司
        getCusCompany({ state, commit }) {
            return new Promise((resolve, reject) => {
                getCusCompany(state.token).then(res => {
                    const data = res
                    commit('setCusCompany', data)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户相关信息
        getLoginData({ state, commit }) {
            return new Promise((resolve, reject) => {
                getLoginData(state.token).then(res => {
                    const data = res
                    commit('setCompany', data.company)
                    commit('setEmployee', data.employee)
                    commit('setMenus', data.menus)
                    commit('setPermissions', data.permissions)

                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
