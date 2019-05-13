import { axiosHandle } from '@/libs/util'

let ForgetPassword = {
    forgetPassword: {
        passwordFindValidCodeCheck(request) { return axiosHandle('post', '/web/customer/passwordFindValidCodeCheck', request) },
        passwordFindValidCode(request) { return axiosHandle('post', '/web/customer/passwordFindValidCode', request) },
        passwordFind(request) { return axiosHandle('post', '/web/customer/passwordFind', request) },
        },
}

export default ForgetPassword