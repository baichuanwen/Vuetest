import Config from '@/config'
import store from '@/store'
import { isEmptyObject, hasPermission } from '@/libs/tools'
export default {
    state: {
        sidebar: '',
        curNavItem: ''
    },
    getters: {
        sidebar: state => {
            return state.sidebar
        },
        curNavItem: state => {
            return state.curNavItem
        },
    },
    mutations: {
        setSidebar(state, sidebar) {
            state.sidebar = sidebar
        },
        setCurNavItem(state, curNavItem) {
            state.curNavItem = curNavItem;
        }
    },
    actions: {
        // 初始化sidebar数据
        formSidebar({ state, commit }) {
            return new Promise((resolve, reject) => {
                let sidebar = [];
                let customModules = localStorage.getItem("customModules");
                let permissions = store.state.user.permissions;
                if (customModules) {
                    customModules = customModules.split(",")
                } else {
                    customModules = [];
                }
                Config.gcbModules.forEach((imodule, index) => {
                    if (!imodule.module) return false
                        // 开发环境添加用法案例
                    if (!Config.dev && (imodule.module.title === '用法案例')) return false
                    if (customModules.indexOf(imodule.routes.name) > -1) return false;
                  let moduleItem = {
                        isActive: state.curNavItem.path.split("/")[1] == imodule.module.path.split("/")[1] ? true : false,
                        //isActive: state.curNavItem.meta.module == imodule.module.name ? true : false,
                        title: imodule.module.title ? imodule.module.title : '',
                        path: imodule.module.path ? imodule.module.path : '',
                        icon: imodule.module.icon ? imodule.module.icon : '',
                        active: false,
                        children: [],
                        name: imodule.module.name ? imodule.module.name : ''
                    }
                    if (imodule.module.children) {
                        if (imodule.module.children.length > 0) {
                            imodule.module.children.forEach((submodule, index) => {
                                let isHasPermission = true;
                                if (submodule.permission) {
                                    isHasPermission = hasPermission(submodule.permission);
                                }
                                if (isHasPermission) {
                                  //submodule.isActive = state.curNavItem == '/' + submodule.path ? true : false
                                  submodule.isActive = state.curNavItem.meta.module == submodule.name ? true : false,
                                  submodule.title = submodule.title
                                  submodule.path = submodule.path
                                  submodule.type = submodule.type ? submodule.type : ''
                                  submodule.active = false
                                  moduleItem.children.push(submodule)
                                }
                            })
                        }
                    }
                    sidebar.push(moduleItem)
                })
                commit('setSidebar', sidebar)
                resolve(sidebar)
            })
        },
        getCurNavItem({ state, commit }, curNavItem) {
            commit("setCurNavItem", curNavItem)
        }
    }
}
