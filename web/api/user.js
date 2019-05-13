import axios from '@/libs/axios'

export const login = ({ username, password, isAutoLogin }) => {
    const data = {
        username,
        password,
        isAutoLogin
    }
    return axios.request({
        url: '/web/employee/login',
        data,
        method: 'post'
    })
}

export const getLoginData = (token) => {
    return axios.request({
        url: '/web/employee/loginData',
        data: '{}',
        method: 'post'
    })
}

export const getCusCompany = (token) => {
    return axios.request({
        url: '/web/customer/companys',
        data: '{}',
        method: 'post'
    })
}

export const logout = (token) => {
    return axios.request({
        url: 'logout',
        method: 'post'
    })
}