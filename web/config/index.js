// 配置文件

// 工程宝控件案例
import GcbDevCase from '@/gcbdevcase/module'
// 工作台
import Dashboard from '../modules/dashboard/module'
// 系统
import System from '../modules/system/module'
// 公告
import Announce from '../modules/announce/module'
// 日常巡检
import Inspection from '../modules/inspection/module'
// 工作汇报
import Report from '../modules/report/module'
// 质量
import Quality from '../modules/quality/module'
// 安全
import Security from '../modules/security/module'
// 任务
import Task from '../modules/task/module'
// 审批
import Approval from '../modules/approval/module'
// 项目看板
import Project from '../modules/project/module'
// 发票管理
import Contract from '../modules/contract/module'
// 合同管理
import Invoice from '../modules/invoice/module'
// 知识
import Knowledge from '../modules/knowledge/module'
// 考勤
import Attendance from '../modules/attendance/module'
// 云盘
import Cloud from '../modules/cloud/module'
// 施工日志
import Projectworklog from '../modules/projectworklog/module'
// 证书
import Certificate from '../modules/certificate/module'
// 劳务实名制
import Labormanage from '../modules/labormanage/module'
// 采购
import Purchase from '../modules/purchase/module'
// 库存
import Inventory from '../modules/inventory/module'
// 基础设置
import Basicsetting from '../modules/basicsetting/module'
// 智能报表
import Wisdom from '../modules/wisdom/module'

export default {
    // 开发环境
    dev: true,
    // 接口配置 //http://dev.lecons.cn/api
    // apiHost: 'http://dev.lecons.cn/api/',
    host: 'https://a.gcb365.com/',
    apiHost: 'https://a.gcb365.com/api/',
    // token在Cookie中存储的天数，默认1天
    cookieExpires: 1,
    // 模块
    gcbModules: [
        // 工程宝控件案例
        GcbDevCase,
        // 工作台
        Dashboard,
        // 系统
        System,
        // 公告
        Announce,
        // // 日常巡检
         Inspection,
        // // 工作汇报
        Report,
        // // 质量
         Quality,
         // 安全
         Security,
        // // 任务
         Task,
        // 审批
        Approval,
        // // 项目看板
        Project,
        // // 发票管理
         Contract,
        // // 合同管理
         Invoice,
        // // 知识
        Knowledge,
        // // 考勤 (原来check模块)
         Attendance,
        // // 云盘
         Cloud,
        // // 施工日志
        Projectworklog,
        // // 证书
         Certificate,
        // // 劳务实名制
        Labormanage,
        // // 采购
        Purchase,
        // // 库存
        Inventory,
        // // 基础设置
         Basicsetting,
        // // 智能报表
         Wisdom
    ]
}
