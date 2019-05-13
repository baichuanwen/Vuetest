/**
 * Created by lecons on 2018/4/4.
 */
define(["businessModule"],
    function (module) {
        "use strict";
        module.controller("wisdomWorkReportListCtrl", ["$scope", "$state", "api","component","$window","$uibModal","$document","$q","$filter","storage","tools","locals",
                function($scope, $state, api,component,$window,$uibModal,$document,$q,$filter,storage,tools,locals){
                    var outScope = $scope;
                    $scope.infos = {};
                    var getSession = locals.getObject("ApplyListParams");
                    $scope.pagesInfo = {
                        workReportType : 1
                    };
                    $scope.data = new Date().getFullYear();
                    $scope.params = {
                        departmentID: '',
                        month: '',
                        type: $scope.pagesInfo.workReportType,
                        year: new Date().getFullYear()
                    };
                    //日期下拉
                    $scope.data = new Date().getFullYear();
                    $scope.years = [
                        {name: $scope.data - 2},{name: $scope.data - 1},{name: $scope.data - 0}
                    ];
                    $scope.months = [
                        {name: '1'},{name: '2'},{name: '3'},{name: '4'},{name: '5'},{name: '6'},{name: '7'},
                        {name: '8'},{name: '9'},{name: '10'},{name: '11'},{name: '12'}
                    ];
                    $scope.yearToggle = function (item) {
                        $scope.data = item.name;
                    };
                    $scope.monthToggle = function (item) {
                        $scope.typeText = item.name;
                    };
                    // 判断权限
                    $scope.authority = function(num){
                        return tools.security.hasPermission(num);
                    };
                    $scope.openModal = function () {
                        component.departmentChooseModal.open({
                            title:"选择部门-单选",
                            selectedItem: $scope.departmentChoose.department,
                            confirm:function(department){
                                $scope.departmentChoose.department = department.departmentName;
                                $scope.params.departmentID = department.id;
                            }
                        });
                    };
                    //切换tab
                    $scope.tabsClick = function (index) {
                        $scope.pagesInfo.workReportType = index;
                        $scope.params.type = $scope.pagesInfo.workReportType;
                        $scope.getList();
                    };
                    // 获取列表
                    $scope.getList  = function(){
                        api.wisdom.report.dayReport(JSON.stringify($scope.params)).success(function(result){
                            $scope.infos = result;
                        });
                    };
                    $scope.departmentChoose = {
                        department:''
                    };
                    if (locals.isEmptyObject("ApplyListParams")) {
                        $scope.dateType = 1;
                        $scope.pagesInfo = {
                            workReportType : 1
                        };
                        $scope.params = {
                            departmentID: '',
                            month: '',
                            type: $scope.pagesInfo.workReportType,
                            year: new Date().getFullYear()
                        };
                        $scope.data = $scope.params.year;
                        $scope.tabsClick(1);
                    }else{
                        $scope.departmentChoose.department = locals.getObject("ApplyListParamsType");
                        $scope.params = getSession;
                        if($scope.params.month === ''){
                            $scope.typeText = ''
                        }else{
                            $scope.typeText = $scope.params.month - 0 + 1;
                        }
                        $scope.data = $scope.params.year;
                        $scope.tabsClick(getSession.type);
                    }
                    // 清除筛选条件
                    $scope.clean = function () {
                       $scope.departmentChoose.department = '';
                        $scope.typeText = '';
                        $scope.params.departmentID = '';
                        $scope.data = new Date().getFullYear();
                        $scope.params.year = $scope.data;
                        $scope.params.month = '';
                        $scope.getList();
                    };
                    // 点击搜索
                    $scope.search = function(){
                        $scope.params.year = $scope.data;
                        $scope.params.month = $scope.typeText ? $scope.typeText - 1 : '';
                        $scope.getList();
                    };
                    $scope.back = function(){
                        $state.go('overview');
                    };
                    //详情
                    $scope.waterClick = function (departmentID,departmentName) {
                        locals.setObject("ApplyListParams", $scope.params);
                        locals.setObject("ApplyListParamsType", $scope.departmentChoose.department);
                       $state.go('workReportDetail', {'type': $scope.params.type,'departmentID': departmentID,'departmentName': departmentName,'month': $scope.params.month,'year': $scope.params.year});
                    };
                    // 导出
                    $scope.exportExcel = function(){
                        api.wisdom.report.dailyReportExport($scope.params).success(function(data) {});
                    };
                }
            ]
        );
    });

