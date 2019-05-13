import { axiosHandle } from '@/libs/util'

let login = {
    // 注册登陆接口地址
        login: {
            getCode(request) { return axiosHandle('post', '/web/employee/getMobileLoginValidCode', request) },
            mobileValidCodeLogin(request) { return axiosHandle('post', '/web/employee/mobileValidCodeLogin', request) },
            generateLoginQrCode(request) { return axiosHandle('post', '/web/employee/generateLoginQrCode', request) },
        },
}

export default login