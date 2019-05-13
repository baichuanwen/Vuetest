/**
 * Created by lecons on 2018/4/4.
 */
define(["businessModule"],
    function (module) {
        "use strict";
        module.controller("reportSubDetailCtrl", ["$scope", "$state", "api","component","$window","$uibModal","$document","$q","$filter","storage","tools","$stateParams",
                function($scope, $state, api,component,$window,$uibModal,$document,$q,$filter,storage,tools,$stateParams){
                    var outScope = $scope;
                    var params,setSession = {};
                    // 判断权限
                    $scope.authority = function(num){
                        return tools.security.hasPermission(num);
                    };
                    $scope.routeParams = $stateParams;
                    // 获取列表
                    $scope.getList  = function(page){
                        switch ($stateParams.type - 0){
                            case 1:
                                $scope.params = {
                                    departmentID: $stateParams.departmentID,
                                    departmentName: $stateParams.departmentName,
                                    pageSize: 15,
                                    year: $stateParams.year,
                                    pageNo: page,
                                    month: $stateParams.month
                                };
                                api.wisdom.report.dailyReportEmployeeDetail(JSON.stringify($scope.params)).success(function(result){
                                    $scope.infos = result;
                                    $scope.total = result.items.total;
                                });
                                break;
                            case 2:
                                $scope.params = {
                                    departmentID: $stateParams.departmentID,
                                    departmentName: $stateParams.departmentName,
                                    pageSize: 15,
                                    year: $stateParams.year,
                                    pageNo: page,
                                    month: $stateParams.month
                                };
                                api.wisdom.report.weeklyReportEmployeeDetail(JSON.stringify($scope.params)).success(function(result){
                                    $scope.infos = result;
                                    $scope.total = result.items.total;
                                });
                                break;
                        }
                        // setSession.projectList = JSON.parse(JSON.stringify($scope.projectList));
                        // setSession.selectTypes = JSON.parse(JSON.stringify($scope.selectTypes));
                    };
                    $scope.getList(1);
                    //分页
                    $scope.listSearch = function (page) {
                        $scope.getList(page);
                    };
                    $scope.goToPage = function() {
                        if (!$scope.goPage) $scope.goPage = 1;
                        if (!parseInt($scope.goPage)) {
                            $scope.goPage = 1;
                        } else {
                            $scope.goPage = parseInt($scope.goPage);
                        }
                        if ($scope.total || $scope.total == 0) {
                            if ($scope.goPage > Math.ceil($scope.total / $scope.params.pageSize))
                                $scope.goPage = Math.ceil($scope.total / $scope.params.pageSize);
                            if ($scope.goPage <= 0) $scope.goPage = 1;
                        }
                        $scope.getList($scope.goPage);
                    };
                    $scope.back = function(){
                        $window.history.go(-1);
                    };
                    //跳转到详情
                    $scope.dailyReportYear = function (month) {
                        $state.go('workReportSubDetail', {'departmentID': $stateParams.departmentID,'departmentName': $stateParams.departmentName,'month':month,'year':$stateParams.year})
                    };
                    $scope.dailyReportYear = function (month,departmentID,departmentName) {
                        $state.go('workReportSubDetail', {'departmentID': departmentID,'departmentName': departmentName,'month':month,'year':$stateParams.year})
                    };
                    // 导出
                    $scope.exportClick = function(){
                        var params = {
                            departmentID: $stateParams.departmentID,
                            departmentName: $stateParams.departmentName,
                            year: $stateParams.year,
                            month: $stateParams.month
                        };
                        switch ($stateParams.type - 0){
                            case 1:
                                api.wisdom.report.dailyReportEmployeeDetailExport(params).success(function(result){
                                   
                                });
                                break;
                            case 2:
                                api.wisdom.report.weeklyReportEmployeeDetailExport(params).success(function(result){
                                    
                                });
                                break;
                        }
                    };
                }
            ]
        );
    });


