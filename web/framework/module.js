import { axiosHandle } from '@/libs/util'

let framework = {
    // 公告接口地址
    api: {
        employee: {
            logout(request) { return axiosHandle('post', '/web/employee/logout', request) },
            info(request) { return axiosHandle('post', '/web/employee/info', request) },
            infoUpdate(request) { return axiosHandle('post', '/web/employee/infoUpdate', request) },
            companyOwnerPermissionReset(request) { return axiosHandle('post', '/web/employee/companyOwnerPermissionReset', request) },
            loginCompany(request) { return axiosHandle('post', '/web/employee/loginCompany', request) },
            agree(request) { return axiosHandle('post', '/web/employee/modifyAccountHandle', request) }
        },
        // partPosition: {
        //     query(request) { return axiosHandle('post', '/web/partPosition.query', request) },
        //     infoQuery(request) { return axiosHandle('post', '/web/partPosition.infoQuery', request) },
        //     batchSave(request) { return axiosHandle('post', '/web/partPosition.batchSave', request) }
        // },
        customer: {
            listSearch(request) { return axiosHandle('post', '/web/announcement/search', request) },
            bindValidCode(request) { return axiosHandle('post', '/web/customer/bindValidCode', request) },
            bindValidCodeCheck(request) { return axiosHandle('post', '/web/customer/bindValidCodeCheck', request) },
            bind(request) { return axiosHandle('post', '/web/customer/bind', request) },
            // info(request) { return axiosHandle('post', '/web/customer.info"), request, { options: { handleErrorCodes: ["200909"] } }); },
            companys(request) { return axiosHandle('post', '/web/customer/companys', request) },
            passwordUpdate(request) { return axiosHandle('post', '/web/customer/passwordUpdate', request) },
            employees4Bind(request) { return axiosHandle('post', '/web/customer/employees4Bind', request) },
            agreeQrCodeJoin(request) { return axiosHandle('post', '/web/customer/agreeQrCodeJoin', request) },
            disagreeQrCodeJoin(request) { return axiosHandle('post', '/web/customer/disagreeQrCodeJoin', request) },
            joinCompanyRecord(request) { return axiosHandle('post', '/web/joinCompanyRecord/get', request) },
        },
        // file: {
        //     getOnlineUrl(request) { return axiosHandle('post', '/web/previewOnline.getOnlineUrl', request) },
        //     upload(request, options) {
        //         return Upload.upload({
        //             url: 'post', '/web/file.upload"),
        //             data: request,
        //             options: options
        //         });
        //     },
        //     batchUpload(request, options) {
        //         return Upload.upload({
        //             url: 'post', '/web/file.batchUpload"),
        //             data: request,
        //             options: options
        //         });
        //     }
        // },
        // region: {
        //     query(request) { return axiosHandle('post', '/web/region.query', request) }
        // },
        message: {
            // search(request) { return axiosHandle('post', '/web/message.search', request) },
            // batchDelete(request) { return axiosHandle('post', '/web/message.batchUpdateDelete', request) },
            // batchRead(request) { return axiosHandle('post', '/web/message.batchUpdateRead', request) },
            count(request) { return axiosHandle('post', '/web/message/count', request) }
        },
        // employeeLoginDeviceHandleRecord: {
        //     get(request) { return axiosHandle('post', '/web/employeeLoginDeviceHandleRecord.get', request) }
        // },
        // //劳务工扫码加入项目
        // laborJoinProject: {
        //     agreeQrCodeJoin(request) { return axiosHandle('post', '/web/PubApplyRecord.agreeQrCodeJoin', request) },
        //     disagreeQrCodeJoin(request) { return axiosHandle('post', '/web/PubApplyRecord.disagreeQrCodeJoin', request) },
        //     PubJoinProjectApplyGet(request) { return axiosHandle('post', '/web/PubApplyRecord.get', request) }
        // },
        // /* 工程星盘的入口接口陈卫 */
        // authority: {
        //     powerEntrance(request) { return axiosHandle('post', '/web/dataView.hasAuthority', request) },
        //     powerAccept(request) { return axiosHandle('post', '/web/dataView.updateAgreement', request) },
        // }
        // 区域
        region: {
          query(request) {return axiosHandle('post', '/web/region/query', request)}
        },
    }
}

export default framework
