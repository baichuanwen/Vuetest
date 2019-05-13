import { axiosHandle } from '@/libs/util'

let system = {
    // 模块
    module: {
        title: '系统管理',
        icon: 'icon-system',
        path: '/system',
        children: [
            { name: 'setting', title: '企业设置', path: 'setting' },
            { name: 'organization', title: '组织架构', path: 'organization', isActive: true },
            { name: 'position', title: '职务权限', path: 'position' },
            { name: 'sorting', title: '组织排序', path: 'sorting' },
            { name: 'service', title: '服务中心', path: 'service' },
            { name: 'order', title: '订单中心', path: 'order' },
            { name: 'person', title: '个人权限', path: 'person' }
        ]
    },
    // 路由
    routes: {
        path: '/system',
        name: 'system',
        redirect: '/system/organization',
        component: {
            render(c) { return c('router-view') }
        },
        children: [{
                path: 'setting',
                name: 'setting',
                meta: {
                    permission: [121]
                },
                component: resolve => require(['@/modules/system/setting/Setting.vue'], resolve)
            },
            {
                path: 'organization',
                name: 'organization',
                meta: {
                    permission: [121]
                },
                component: resolve => require(['@/modules/system/organization/Organization.vue'], resolve)
            },
            {
                path: 'position',
                name: 'position',
                meta: {
                    permission: [121]
                },
                component: resolve => require(['@/modules/system/position/Position.vue'], resolve)
            },
            {
                path: 'sorting',
                name: 'sorting',
                meta: {
                    permission: [121]
                },
                component: resolve => require(['@/modules/system/sorting/Sorting.vue'], resolve)
            },
            {
                path: 'service',
                name: 'service',
                meta: {
                    permission: [121]
                },
                component: resolve => require(['@/modules/system/service/Service.vue'], resolve)
            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    permission: [121]
                },
                component: resolve => require(['@/modules/system/order/Order.vue'], resolve)
            },
            {
                path: 'person',
                name: 'person',
                meta: {
                    permission: [121]
                },
                component: resolve => require(['@/modules/system/person/Person.vue'], resolve)
            }
        ]
    },
    // 接口
    api: {
        company: {
            create(request) { return axiosHandle('post', '/web/company/update', request) },
            get(request) { return axiosHandle('post', '/web/company/get', request) },
            infoUpdate(request) { return axiosHandle('post', '/web/company/infoUpdate', request) },
            info(request) { return axiosHandle('post', '/web/company/info', request) },
            transfer(request) { return axiosHandle('post', '/web/company/transfer', request) },
            transferValidCode(request) { return axiosHandle('post', '/web/company/transferValidCode', request) },
            // 下载公司二维码
            // generateCompanyQrCode(request) { return axiosHandle('post', '/web/company/generateCompanyQrCode', request) },
        },
        companyService: {
            get(request) { return axiosHandle('post', '/web/companyService/get', request) },
            info(request) { return axiosHandle('post', '/web/companyService/info', request) }
        },
        department: {
            create(request) { return axiosHandle('post', '/web/department/create', request) },
            delete(request) { return axiosHandle('post', '/web/department/delete', request) },
            update(request) { return axiosHandle('post', '/web/department/update', request) },
            get(request) { return axiosHandle('post', '/web/department/get', request) },
            query(request) { return axiosHandle('post', '/web/department/query', request) },
            tree(request) { return axiosHandle('post', '/web/department/tree', request) },
            infoTree(request) { return axiosHandle('post', '/web/department/departProjectSearch', request) },
            sort(request) { return axiosHandle('post', '/web/department/sort', request) }
        },
        employee: {
            create(request) { return axiosHandle('post', '/web/employee/create', request) },
            delete(request) { return axiosHandle('post', '/web/employee/delete', request) },
            update(request) { return axiosHandle('post', '/web/employee/update', request) },
            enable(request) { return axiosHandle('post', '/web/employee/enable', request) },
            disable(request) { return axiosHandle('post', '/web/employee/disable', request) },
            get(request) { return axiosHandle('post', '/web/employee/get', request) },
            query(request) { return axiosHandle('post', '/web/employee/query', request) },
            infoQuery(request) { return axiosHandle('post', '/web/employee/infoQuery', request) },
            organizationQuery(request) { return axiosHandle('post', '/web/employee/organizationQuery', request) },
            infoOrganizationQuery(request) { return axiosHandle('post', '/web/employee/infoOrganizationQuery', request) },
            findShares(request) { return axiosHandle('post', '/web/cloudDisk/findShares', request) },
            search(request) { return axiosHandle('post', '/web/employee/search', request) },
            sort(request) { return axiosHandle('post', '/web/employee/sort', request) },
            batchAdvanced(request) { return axiosHandle('post', '/web/employee/batchAdvanced', request) },
            batchUnAdvanced(request) { return axiosHandle('post', '/web/employee/batchUnAdvanced', request) },
            companyOwnerPermissionReset(request) { return axiosHandle('post', '/web/employee/companyOwnerPermissionReset', request) },
            partPositionQuery(request) { return axiosHandle('post', '/web/employee/partPositionQuery', request) },
            // 导入
            // import(request) { return axiosHandle('post', '/web/employee/import', request) },
            // 导出
            export (request) { return axiosHandle('post', '/web/employee/export', request, { responseType: 'blob' }) }
        },
        position: {
            create(request) { return axiosHandle('post', '/web/position/create', request) },
            delete(request) { return axiosHandle('post', '/web/position/delete', request) },
            update(request) { return axiosHandle('post', '/web/position/update', request) },
            get(request) { return axiosHandle('post', '/web/position/get', request) },
            query(request) { return axiosHandle('post', '/web/position/query', request) },
            sort(request) { return axiosHandle('post', '/web/position/sort', request) },
            permissions(request) { return axiosHandle('post', '/web/position/permissions', request) },
            employees(request) { return axiosHandle('post', '/web/position/employees', request) }
        },
        permission: {
            query(request) { return axiosHandle('post', '/web/permission/query', request) },
            tree(request) { return axiosHandle('post', '/web/permission/tree', request) }
        },
        orderCenter: {
            price(request) { return axiosHandle('post', '/web/payServiceFee/list', request) },
            discountList(request) { return axiosHandle('post', '/web/payDiscount/list', request) },
            createOrder(request) { return axiosHandle('post', '/web/payOrder/create', request) },
            orderList(request) { return axiosHandle('post', '/web/payOrder/list', request) },
            orderDetail(request) { return axiosHandle('post', '/web/payOrder/get', request) },
            orderUpdate(request) { return axiosHandle('post', '/web/payOrder/update', request) },
            createInvoice(request) { return axiosHandle('post', '/web/payInvoice/create', request) },
            wxQuery(request) { return axiosHandle('post', '/web/wxpay/queryOrder', request) },
            alipay(request) { return axiosHandle('post', '/web/alipay/prepay', request) },
            //
            // wxpay(request) { return axiosHandle('post', '/web/wxpay/prepay', request) },
        },
        person: {
            personList(request) { return axiosHandle('post', '/web/dataView/selectPage', request) },
            personListCreate(request) { return axiosHandle('post', '/web/dataView/create', request) },
            personListDelete(request) { return axiosHandle('post', '/web/dataView/delete', request) },
            personListUpdate(request) { return axiosHandle('post', '/web/dataView/update', request) },
            powerEntrance(request) { return axiosHandle('post', '/web/dataView/hasAuthority', request) }
        }
    }
}

export default system
