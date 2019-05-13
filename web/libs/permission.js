import { forEach, hasOneOf } from '@/libs/tools'

/**
 * @param [*] permissions 用户权限数组
 * @param {*} routes 路由列表
 */
const hasAccess = (access, route) => {
    if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
    else return true
}

/**
 * @param '*' router 即将跳转的路由
 * @param [*] permissions 用户权限数组
 * @description 用户是否可跳转到该页
 */
export const hasPermission = (router, permissions) => {
    let hasPermission = true
    if (router.meta.permission && Array.isArray(router.meta.permission)) {
        for (var i = 0; i < router.meta.permission.length; i++) {
            if (!!permissions[router.meta.permission[i]]) {
                hasPermission = true;
                break;
            } else {
                hasPermission = false;
                break;
            }
        }
    }
    return hasPermission
}