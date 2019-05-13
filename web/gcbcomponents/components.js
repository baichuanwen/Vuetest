// 选择部门 （ departmentChooseModal ）
// 功能：选择部门，搜索部门选择
// 传入值：配置对象
// 默认：{
// 标题（title）:"部门选择",
// 选中部门（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// }
// 返回值: 选中部门信息

// 选择多个部门 （ departmentMultipleChooseModal ）
// 功能：选择多个部门，搜索选择多个部门
// 传入值：配置对象
// 默认：{
// 标题（title）:"部门选择",
// 选中部门（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// }
// 返回值: 选中部门信息

// 选择多个部门 （ departmentMultipleAllChooseModal ）
// 功能：选择多个部门，搜索选择多个部门
// 传入值：配置对象
// 默认：{
// 标题（title）:"部门选择",
// 选中多个部门（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData: false,
// }
// 返回值: 选中部门多个信息

// 选择人员 （ employeeChooseModal ）
// 功能：选择人员，搜索选择人员
// 传入值：配置对象
// 默认：{
// 标题（title）:"人员选择",
// 选中人员（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData:false,
// isIncludeSelf:true,
// isIncludeDescendants:true
// }
// 返回值: 选中人员信息

// 选择多个人员 （ employeeMultipleChooseModal ）
// 功能：选择多个人员，搜索选择多个人员
// 传入值：配置对象
// 默认：{
// 标题（title）:"多个人员选择",
// 选中人员（selectedItem）:null,
// 父级共享人员id（itemIds）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData:false,
// isIncludeSelf:true,
// isIncludeDescendants:true
// }
// 返回值: 选中多个人员信息

// 选择项目 （ projectChooseModal ）
// 功能：选择项目，搜索选择项目
// 传入值：配置对象
// 默认：{
// 标题（title）:"项目选择",
// 选中项目（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData:false,
// isSubCompanyProject: false,
// isIncludeCreatorProject: false
// }
// 返回值: 选中项目信息

// 付费项目选择 （ payProjectChooseModal ）
// 功能：选择项目，搜索选择项目
// 传入值：配置对象
// 默认：{
// 标题（title）:"项目选择",
// 选中项目（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData: false,
// isSubCompanyProject: false,
// isIncludeCreatorProject: false
// }
// 返回值: 选中项目信息

// 选择项目 （ projectDepChooseModal ）
// 功能：选择项目，搜索选择项目
// 传入值：配置对象
// 默认：{
// 标题（title）:"项目选择",
// 选中项目（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData:false,
// 是否可以选择部门（canSelectDepartment）: false,
// 是否包含字部门下项目（isSubCompanyProject）: false,
// 是否包含创建者（isIncludeCreatorProject）: false
// }
// 返回值: 选中项目信息

// 选择多个项目 （ projectMultipleChooseModal ）
// 功能：选择多个项目，搜索选择多个项目
// 传入值：配置对象
// 默认：{
// 标题（title）:"多个项目选择",
// 选中项目（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData:false,
// isSubCompanyProject: false,
// isIncludeCreatorProject: false
// }
// 返回值: 选中多个项目信息

// 选择供应商 （ supplierChooseModal ）
// 功能：选择供应商，搜索选择供应商
// 传入值：配置对象
// 默认：{
// 标题（title）:"供应商选择",
// 选中供应商（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData:false,
// isSubCompanyProject: false,
// isIncludeCreatorProject: false
// }
// 返回值: 选中供应商信息

// 选择多个供应商 （ suppliersMultipleChooseModal ）
// 功能：选择多个供应商，搜索选择多个供应商
// 传入值：配置对象
// 默认：{
// 标题（title）:"多个供应商选择",
// 选中供应商（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData: false,
// 是否包含字部门下项目（isSubCompanyProject）: false,
// 是否包含创建者（isIncludeCreatorProject）: false
// }
// 返回值: 选中多个供应商信息

// 选择多个证书 （ certificateTypeMultipleChooseModal ）
// 功能：选择多个证书，搜索选择多个证书
// 传入值：配置对象
// 默认：{
// 标题（title）:"多个证书选择",
// 选中证书（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// isAuthData: false,
// 是否包含字部门下项目（isSubCompanyProject）: false,
// 是否包含创建者（isIncludeCreatorProject）: false
// }
// 返回值: 选中多个证书信息

// 选择合同 （ contractChooseModal ）
// 功能：选择合同，搜索选择合同
// 传入值：配置对象
// 默认：{
// 标题（title）:"合同选择",
// 选中合同（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// 项目id（projectId）: null
// }
// 返回值: 选中合同信息

// 选择合同 （ contractPaymentChooseModal ）
// 功能：选择合同，搜索选择合同
// 传入值：配置对象
// 默认：{
// 标题（title）:"合同选择",
// 选中合同（selectedItem）:null,
// 取消（cancel）:angular.noop,
// 确定（confirm）:angular.noop
// }
// 返回值: 选中合同信息





// modal 询问框
// 功能：询问框 弹出modal框
//this.$gcb.gcbModal.open({
//
// })
// 传入值：配置对象
// 默认：{
// 标题（title）:"弹框头部标题",
// 图标（icon）: danger success unknown warning ,
//}
// 传入值默认存在options中
// 返回值: 默认不返回


// tooltip提示框
// 功能：询问框 弹出提示框
//  this.$gcb.tooltip.open({
      //提示内容（message）:"",
      //图标（icon）: danger success unknown warning ,
      //消失时间(timeout):"2000"
// })
// 传入值默认存在options中
// 返回值: 默认不返回

