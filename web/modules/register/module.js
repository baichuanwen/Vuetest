import { axiosHandle } from '@/libs/util'

let register = {
    register: {
        getCode(request) { return axiosHandle('post', '/web/employee/getMobileLoginValidCode', request) },
        mobileValidCodeLogin(request) { return axiosHandle('post', '/web/employee/mobileValidCodeLogin', request) },
        generateLoginQrCode(request) { return axiosHandle('post', '/web/employee/generateLoginQrCode', request) },

        cusRegisterValidCode(request) { return axiosHandle('post', '/web/customer/registerValidCode', request) },
        registerValidCodeCheck(request) { return axiosHandle('post', '/web/customer/registerValidCodeCheck', request) },
    },
}

export default register