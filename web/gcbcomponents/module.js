import Config from '@/config'
import axios from '@/libs/axios'
import { axiosHandle } from '@/libs/util'

let components = {
    // 公告接口地址
    api: {
        file:{
          getOnlineUrl(request) { return axiosHandle('post',"web/previewOnline/getOnlineUrl", request)},
        },
        department: {
            tree(request) { return axiosHandle('post', '/web/department/tree', request) }
        },
        employee: {
            query(request) { return axiosHandle('post', '/web/employee/query', request) },
            infoQuery(request) { return axiosHandle('post', '/web/employee/infoQuery', request) },
            infoOrganizationQuery(request) { return axiosHandle('post', '/web/employee/infoOrganizationQuery', request) },
            organizationQuery(request) { return axiosHandle('post', '/web/employee/organizationQuery', request) }
        },
        project: {
            query(request) { return axiosHandle('post', '/web/project/query', request) },
            search(request) { return axiosHandle('post', '/web/project/search', request) },
            infoQuery(request) { return axiosHandle('post', '/web/project/infoQuery', request) },
            infoOrganizationQuery(request) { return axiosHandle('post', 'web/project/infoOrganizationQuery', request) },
            organizationQuery(request) { return axiosHandle('post', 'web/project/organizationQuery', request) },
        },
        contract: {
            queryContractStructure(request) { return axiosHandle('post', 'web/contract/queryContractStructure', request) }
        },
        certificate: {
            getTypeList(request) { return axiosHandle('post', 'web/certificateType/list', request) }
        },
        certificateType: {
            processFormTypeList(request) { return axiosHandle('post', 'web/processFormType/list', request) }
        },
    }
}

export default components
