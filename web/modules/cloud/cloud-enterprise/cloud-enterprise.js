define(["businessModule"],
    function (module) {
        "use strict";
        module.controller("cloudEnterpriseCtrl", ["$scope", "$state", "api", "$uibModal", "$stateParams", "frame", "tools", "app", "component",
            function ($scope, $state, api, $uibModal, $stateParams, frame, tools, app, component) {
                $scope.visibi = true; // 操作栏默认不展示4.0增

                var $outScope = $scope;
                $scope.userInfo = app.employee;
                // $scope.userInfo.userIcon = tools.file.buildDownloadUrl(app.employee.iconUuid);
                // $scope.userInfo.lastName = app.employee.employeeName.charAt(app.employee.employeeName.length - 1,1);
                $scope.isSelecteAll = false;
                $scope.isSearch = false;
                // 权限
                $scope.hasPermission = tools.security.hasPermission;

                // 拉数据
                $scope.pagesInfo = {
                    fileSubjectionType: 1,
                    pageNo: 1,
                    pageSize: 15,
                    condition: null,
                    folderId: null,
                    orderType: 2, // 1： 正序 2：倒序
                    orderField: 'createTime' //name 按名称，createTime 按创建时间
                };
                $scope.listSearch = function (SearchRequest) {
                    if (SearchRequest) {
                        for (var k in SearchRequest) {
                            $scope.pagesInfo[k] = SearchRequest[k];
                        }
                    }
                    if ($scope.pagesInfo.condition == "") {
                        $scope.pagesInfo.condition = null;
                    }
                    if ($scope.pagesInfo.condition == null) {
                        $scope.isSearch = false;
                    }
                    // 分页限制
                    if (!$scope.pagesInfo.pageNo) $scope.pagesInfo.pageNo = 1;
                    if (!parseInt($scope.pagesInfo.pageNo)) {
                        $scope.pagesInfo.pageNo = 1;
                    } else {
                        $scope.pagesInfo.pageNo = parseInt($scope.pagesInfo.pageNo);
                    }
                    if ($scope.total || $scope.total == 0) {
                        if ($scope.pagesInfo.pageNo > Math.ceil($scope.total / $scope.pagesInfo.pageSize)) $scope.pagesInfo.pageNo = Math.ceil($scope.total / $scope.pagesInfo.pageSize);
                        if ($scope.pagesInfo.pageNo <= 0) $scope.pagesInfo.pageNo = 1;
                    }
                    api.cloud.listSearch($scope.pagesInfo).success(function (result) {
                        // 匹配图片
                        var imgReg = /^(.jpg|.png|.gif|.bmp|.jpeg)$/i,
                            excelReg = /^(.xls|.xlsx|.xlsm|.xlt|.xltx|.xltm)$/i,
                            cadReg = /^(.cad|.dwg|.dxf|.dwt|.dws)$/i,
                            pdfReg = /^(.pdf)$/i,
                            pptReg = /^(.ppt|.pps|.pptx)$/i,
                            wordReg = /^(.doc|.docx|.dot|.dotx|.docm)$/i;
                        result.page.records.forEach(function (v) {
                            if (v.type != 1) {
                                var temp = v.fullName;
                                temp = temp.split("."); -
                                temp.splice(temp.length - 1);
                                temp = temp.join(".");
                                if (temp.length > 250) temp = temp.slice(0, 250);
                                v.subName = temp;
                            } else {
                                v.subName = v.fullName;
                            }
                            if (v.type != 1) {
                                if (imgReg.test(v.attachmentSuffix)) {
                                    v.isImg = true;
                                } else if (excelReg.test(v.attachmentSuffix)) {
                                    v.isExcel = true;
                                } else if (cadReg.test(v.attachmentSuffix)) {
                                    v.isCad = true;
                                } else if (excelReg.test(v.attachmentSuffix)) {
                                    v.isExcel = true;
                                } else if (pdfReg.test(v.attachmentSuffix)) {
                                    v.isPdf = true;
                                } else if (pptReg.test(v.attachmentSuffix)) {
                                    v.isPpt = true;
                                } else if (wordReg.test(v.attachmentSuffix)) {
                                    v.isWord = true;
                                } else {
                                    v.isOther = true;
                                }
                                v.src = tools.file.buildDownloadUrl(v.attachmentUuid, v.fullName);
                            }
                        });
                        $scope.total = result.page.total;
                        $scope.data = result.page.records;
                        $scope.containUpload = result.containUpload;
                        $scope.isSelecteAll = false;
                    })
                };
                $scope.listSearch();

                //按创建日期排序
                $scope.srot = function () {
                    var imgObj = document.getElementById("srot");
                    var imgNObj = document.getElementById("srotfile");
                    imgNObj.src = "/client/business/cloud/images/auto.png";
                    if (imgObj.getAttribute("src", 2) == "/client/business/cloud/images/desc.png") {
                        imgObj.src = "/client/business/cloud/images/asc.png";
                        $scope.pagesInfo.orderField = 'createTime';
                        $scope.pagesInfo.orderType = 1;
                        $scope.listSearch();
                    } else {
                        imgObj.src = "/client/business/cloud/images/desc.png";
                        $scope.pagesInfo.orderField = 'createTime';
                        $scope.pagesInfo.orderType = 2;
                        $scope.listSearch();
                    }
                };
                //按名称排序
                $scope.srotFile = function () {
                    var imgObj = document.getElementById("srotfile");
                    var imgTObj = document.getElementById("srot");
                    imgTObj.src = "/client/business/cloud/images/auto.png";
                    if (imgObj.getAttribute("src", 2) == "/client/business/cloud/images/asc.png") {
                        imgObj.src = "/client/business/cloud/images/desc.png";
                        $scope.pagesInfo.orderField = 'name';
                        $scope.pagesInfo.orderType = 2;
                        $scope.listSearch();
                    } else {
                        imgObj.src = "/client/business/cloud/images/asc.png";
                        $scope.pagesInfo.orderField = 'name';
                        $scope.pagesInfo.orderType = 1;
                        $scope.listSearch();
                    }
                };

                // 全选
                $scope.selectAll = function () {
                    if (!$scope.isSelecteAll) {
                        $scope.data.forEach(function (v) {
                            v.isSelected = true;
                        });
                        $scope.isSelecteAll = true;
                    } else {
                        $scope.data.forEach(function (v) {
                            v.isSelected = false;
                        });
                        $scope.isSelecteAll = false;
                    }
                };
                // 单选
                $scope.select = function (item) {
                    item.isSelected = !item.isSelected;
                    var temp = true;
                    $scope.data.forEach(function (v) {
                        if (!v.isSelected) {
                            temp = false;
                            return false;
                        }
                    });
                    if (temp) {
                        $scope.isSelecteAll = true;
                    } else {
                        $scope.isSelecteAll = false;
                    }
                };

                // 点击进入二级
                $scope.goSub = function (item) {
                    if (item.type != 1) return;
                    $state.go("cloudEnterpriseSub", {
                        id: item.id,
                        name: item.fullName
                    });
                };

                // 创建共享
                $scope.createFile = function () {
                    $uibModal.open({
                        backdrop: "static",
                        templateUrl: "/client/business/cloud/cloud-modals/shrpubwModal/shrpubwModal.html",
                        controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {

                            $scope.request = {
                                name: null,
                                parentId: null,
                                shares: [],
                                fileSubjectionType: 1
                            };
                            // 创建
                            $scope.create = function () {
                                api.cloud.createFile($scope.request).success(function (result) {
                                    frame.tooltip.open({
                                        message: "文件创建成功",
                                        timeout: 2000
                                    });
                                    $uibModalInstance.close();
                                    $outScope.listSearch();
                                });
                            };
                            // 取消
                            $scope.cancel = function () {
                                $uibModalInstance.close();
                            };
                        }]
                    });
                };

                //移动 复制
                /* 复制权限 */
                $scope.copyPermission = tools.security.hasPermission([143])
                $scope.moveFile = function (item, parameter) {
                    $uibModal.open({
                        backdrop: "static",
                        templateUrl: "/client/business/cloud/cloud-modals/moveModal/moveModal.html",
                        controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                            $scope.title = "企业文档";
                            $scope.marksModel = [];
                            $scope.currents = [];
                            $scope.request = {
                                fileSubjectionType: 1,
                                condition: null,
                                fileType: 1,
                                folderId: null
                            };
                            var $subScope = $scope;
                            $subScope.isPar = false; //是否是首页
                            $scope.folderListSearch = function (SearchRequest, par, isPar) {
                                $scope.showEdits = false;
                                $scope.subName = "";
                                if (par) {
                                    $scope.marksModel = [];
                                }
                                if (SearchRequest) {
                                    for (var k in SearchRequest) {
                                        $scope.request[k] = SearchRequest[k];
                                    }
                                }
                                if (isPar) {
                                    $subScope.isPar = true;
                                }
                                api.cloud.listSearch($scope.request).success(function (result) {
                                    $scope.datas = result.page.records;
                                    $scope.containUpload = result.containUpload;
                                })
                            }
                            $scope.folderListSearch();

                            $scope.isSearchs = false;
                            //文件夹
                            $scope.goSubModal = function (items) {
                                $scope.showEdits = false;
                                $subScope.isPar = true;
                                $scope.subName = "";
                                if ($scope.isSearchs) {
                                    $scope.marksModel = [{
                                        name: items.fullName,
                                        id: items.id
                                    }];
                                    $scope.isSearchs = false;
                                } else {
                                    $scope.marksModel.push({
                                        name: items.fullName,
                                        id: items.id
                                    });
                                }
                                $scope.currents = items;
                                $scope.folderListSearch({
                                    folderId: items.id,
                                    fileType: 1
                                });
                                $subScope.folderId = items.id;
                            }

                            // 指定文件夹
                            $scope.goFileModel = function (item) {
                                $scope.showEdits = false;
                                $scope.subName = "";
                                $subScope.isPar = true; //是否是首页
                                $scope.marksModel.forEach(function (v, i) {
                                    if (v.id == item.id) {
                                        $scope.marksModel.splice(i + 1);
                                        $scope.currents = v;
                                        $scope.folderListSearch({
                                            condition: null,
                                            folderId: v.id
                                        });
                                    }
                                });
                            };
                            $scope.showEdits = false;
                            $scope.subName = "";
                            // 新增文件夹
                            $scope.createFolder = function () {
                                //添加文件夹的文本框
                                $scope.showEdits = true;
                            };
                            $scope.createFolderName = function (item) {
                                $scope.request = {
                                    name: item,
                                    parentId: $subScope.folderId,
                                    shares: null,
                                    fileSubjectionType: 1
                                };
                                if (!item) {
                                    frame.tooltip.open({
                                        icon: "warning",
                                        message: "请输入文件夹名称！",
                                        timeout: 2000
                                    });
                                    return;
                                }
                                api.cloud.createFile($scope.request).success(function (result) {
                                    frame.tooltip.open({
                                        message: "文件夹创建成功",
                                        timeout: 2000
                                    });
                                    $scope.folderListSearch({
                                        folderId: $subScope.folderId,
                                        fileType: 1
                                    });
                                    $scope.showEdits = false;
                                    $scope.subName = "";
                                });
                            };

                            // 确定移动
                            $scope.move = function (containUpload) {
                                if (!containUpload) {
                                    frame.tooltip.open({
                                        title: "提示",
                                        icon: "warning",
                                        message: "对不起，您没有上传权限，请联系管理人员赋予权限",
                                        timeout: 2000
                                    });
                                } else {
                                    if ($scope.folderId == null || !$scope.containUpload) {
                                        return;
                                    }
                                    /* 文件夹复制 */
                                    if (item.type == 1) {
                                        $scope.copeval = {
                                            folderId: item.id,
                                            targetFolderId: $subScope.folderId,
                                            moveWay: parameter
                                        }
                                        api.cloud.fileCopy($scope.copeval).success(function (result) {
                                            $uibModalInstance.close();
                                             frame.tooltip.open({
                                                 message: "文件夹复制成功",
                                                 timeout: 2000
                                             });
                                            $outScope.listSearch();
                                        })
                                    } else {
                                        $scope.removal = {
                                            folderId: $subScope.folderId,
                                            ids: [item.id],
                                            moveWay: parameter
                                        }
                                        api.cloud.fileRemoval($scope.removal).success(function (result) {
                                            $uibModalInstance.close();
                                            $outScope.listSearch();
                                        })
                                    }

                                }
                            };

                            // 取消
                            $scope.cancel = function () {
                                $uibModalInstance.close();
                            };
                        }]
                    });
                };

                // 删除
                $scope.delete = function (index, item) {
                    if (item.employeeId != $scope.userInfo.id && !item.canEdit && !$scope.hasPermission(143)) return;
                    frame.confirm.open({
                        title: "提示",
                        icon: "danger",
                        message: "您确定删除吗？",
                        confirm: function () {
                            api.cloud.deleteFile({
                                ids: [item.id]
                            }).success(function () {
                                frame.tooltip.open({
                                    message: "删除成功！",
                                    timeout: 2000
                                });
                                $scope.listSearch();
                            })
                        }
                    })
                };
                // 批量删除
                $scope.batchDelete = function () {
                    var selected = [];
                    $scope.data.forEach(function (v) {
                        if (v.isSelected) {
                            selected.push(v.id);
                        }
                    });
                    if (selected.length == 0) return;
                    frame.confirm.open({
                        title: "提示",
                        icon: "danger",
                        message: "确定删除吗？",
                        confirm: function () {
                            api.cloud.deleteFile({
                                ids: selected
                            }).success(function () {
                                frame.tooltip.open({
                                    message: "删除成功！",
                                    timeout: 2000
                                });
                                $scope.listSearch();
                                $scope.isSelecteAll = false;
                            })
                        }
                    });
                };
                // 重命名
                $scope.rename = function (item) {
                    if (item.employeeId != $scope.userInfo.id && !item.canEdit && !$scope.hasPermission(143)) return;
                    item.showEdit = true;
                    item.temp = item.subName;
                };
                $scope.confirmRename = function (item) {
                    if (item.temp == item.subName) {
                        item.showEdit = false;
                        return;
                    }
                    if (!item.subName) {
                        frame.tooltip.open({
                            icon: "warning",
                            message: "请输入文件或文件夹名称！",
                            timeout: 2000
                        });
                        return;
                    }
                    api.cloud.renameFile({
                        id: item.id,
                        name: item.subName
                    }).success(function () {
                        frame.tooltip.open({
                            message: "修改成功",
                            timeout: 2000
                        });
                        $scope.listSearch();
                        item.showEdit = false;
                    })
                };

                // 置顶
                $scope.setTop = function (item) {
                    api.cloud.setTop({
                        id: item.id
                    }).success(function () {
                        $scope.listSearch();
                    })
                };
                // 取消置顶
                $scope.cancleTop = function (item) {
                    api.cloud.cancelTop({
                        id: item.id
                    }).success(function () {
                        $scope.listSearch();
                    })
                };

                // 查看共享成员
                $scope.showEmployee = function (item) {
                    if (item.shareType == 1) return;
                    $uibModal.open({
                        backdrop: "static",
                        templateUrl: "/client/business/cloud/cloud-modals/employeeModal/employeeListModal.html",
                        controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                            $scope.sharesize = item.shareSize;
                            api.cloud.findShares({
                                id: item.id
                            }).success(function (result) {
                                result.shares.forEach(function (v) {
                                    if (!v.iconUuid) {
                                        v.lastName = v.employeeName; //.charAt(v.employeeName.length - 1, 1);
                                        return
                                    }
                                    v.iconSrc = tools.file.buildDownloadUrl(v.iconUuid);
                                });
                                $scope.employee = result.shares;
                            });
                            $scope.cancel = function () {
                                $uibModalInstance.close();
                            };
                        }]
                    });
                };

                // 共享
                $scope.share = function (item) {
                    // 如果本人或管理员或上一级
                    if (item.employeeId == $scope.userInfo.id || item.canEdit || $scope.hasPermission(143)) {
                        $uibModal.open({
                            backdrop: "static",
                            templateUrl: "/client/business/cloud/cloud-modals/shareCreatorDPModal/shareCreatorDPModal.html",
                            controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                                var $subScope = $scope;
                                $scope.current = null;
                                $scope.isSelecteAll = false;
                                $scope.parentEmployeeIds = [];
                                $scope.fileSubjectionType = item.fileSubjectionType;
                                // 项目文档才有 projectId
                                $scope.projectId = item.projectId;
                                // 全体成员
                                $scope.allMember = false;
                                // 选择人员
                                $scope.employee = [];
                                // 选择部门
                                $scope.department = [];

                                // 父级共享部门与人员
                                if (item.parentId) {
                                    api.cloud.findShares({
                                        id: item.parentId
                                    }).success(function (result) {
                                        result.shares.forEach(function (v) {
                                            if (v.id) {
                                                $scope.parentEmployeeIds.push(v.id);
                                            }
                                        });
                                    })
                                }

                                // 当前共享部门与人员
                                api.cloud.findShares({
                                    id: item.id
                                }).success(function (result) {
                                    // 创建人信息
                                    if (result.employee) {
                                        $scope.creator = result.employee;
                                        $scope.creator.iconSrc = tools.file.buildDownloadUrl(result.employee.iconUuid);
                                        $scope.creator.lastName = result.employee.employeeName; //.charAt(result.employee.employeeName.length - 1, 1);
                                    }
                                    // 共享人
                                    result.shares.forEach(function (v) {
                                        v.authority = [];
                                        // 权限
                                        if (v.permissions && v.permissions.length > 0) {
                                            v.permissions.forEach(function (p) {
                                                v.authority.push(p.permissionId);
                                            })
                                        }
                                        if (v.employeeId) {
                                            // if (!v.iconUuid) {
                                            //     v.lastName = v.employeeName; //.charAt(v.employeeName.length - 1, 1);
                                            //     return;
                                            // }
                                            v.iconSrc = tools.file.buildDownloadUrl(v.iconUuid);
                                            $scope.employee.push(v);
                                        }
                                        if (v.departmentId) {
                                            $scope.allMember = (v.departmentName == '全体成员');
                                            $scope.department.push(v);
                                        }
                                    });
                                });

                                // 选择部门
                                $scope.selectDeparment = function () {
                                    component.departmentMultipleAllChooseModal.open({
                                        title: "选择部门",
                                        selectedItems: $scope.department,
                                        confirm: function (selectitem) {
                                            $scope.department = selectitem;
                                            $scope.allMember = false;
                                        }
                                    });
                                };

                                // 选择成员
                                $scope.selectEmployee = function () {
                                    component.employeeMultipleChooseModal.open({
                                        title: "选择人员",
                                        selectedItems: $scope.employee,
                                        confirm: function (selectitem) {
                                            selectitem.forEach(function (v) {
                                                if (!v.iconUuid) {
                                                    v.lastName = v.employeeName; //.charAt(v.employeeName.length - 1, 1);
                                                    return;
                                                }
                                                v.iconSrc = tools.file.buildDownloadUrl(v.iconUuid);
                                            });
                                            $scope.employee = selectitem;
                                            // 若果是全体人员的话清空
                                            if ($scope.allMember) {
                                                $scope.department = [];
                                            }
                                            $scope.allMember = false;
                                        }
                                    });
                                };

                                $scope.access = {};
                                $scope.access = $subScope.access = [];

                                //设置权限
                                $scope.setAccess = function () {
                                    $uibModal.open({
                                        backdrop: "static",
                                        templateUrl: "/client/business/cloud/cloud-modals/setAccessModal/setAccessModal.html",
                                        controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                                            $scope.search = function () {
                                                // checkNum为当前选中人数
                                                var checkNum = 0;
                                                var authorities = [];
                                                $subScope.department.forEach(function (e) {
                                                    if (e.isSelected) {
                                                        checkNum++;
                                                        authorities = e.authority || [];
                                                    }
                                                });
                                                $subScope.employee.forEach(function (e) {
                                                    if (e.isSelected) {
                                                        checkNum++;
                                                        authorities = e.authority || [];
                                                    }
                                                });
                                                if (checkNum == 1 && authorities && authorities.length > 0) {
                                                    $scope.access = authorities;
                                                }
                                            };
                                            $scope.search();
                                            //确定
                                            $scope.confirmSetAccess = function () {
                                                var obj = document.getElementsByName("access");
                                                var check_val = [];
                                                var k;
                                                for (k in obj) {
                                                    if (obj[k].checked)
                                                        check_val.push(Number(obj[k].value));
                                                }
                                                $scope.access = $subScope.access = check_val;
                                                $subScope.isSetAccessDep = false;
                                                $subScope.isSetAccess = false;
                                                $subScope.employee.forEach(function (e) {
                                                    if (e.isSelected) {
                                                        e.authority = check_val;
                                                        e.isSelected = false;
                                                        $subScope.isSelecteAll = false;
                                                    }
                                                })
                                                $subScope.department.forEach(function (e) {
                                                    if (e.isSelected) {
                                                        e.authority = check_val;
                                                        e.isSelected = false;
                                                        $subScope.isSelecteAll = false;
                                                    }
                                                })
                                                $uibModalInstance.close();
                                            };
                                            //取消
                                            $scope.cancelSetAccess = function () {
                                                $uibModalInstance.close();
                                            }
                                        }]
                                    })
                                }

                                // 全选
                                $scope.selectAll = function () {
                                    if (!$scope.isSelecteAll) {
                                        $scope.department.forEach(function (v) {
                                            v.isSelected = true;
                                        });
                                        $scope.employee.forEach(function (v) {
                                            v.isSelected = true;
                                        });
                                        $scope.isSelecteAll = true;
                                        $subScope.isSetAccessDep = true;
                                        $subScope.isSetAccess = true;
                                    } else {
                                        $scope.department.forEach(function (v) {
                                            v.isSelected = false;
                                        });
                                        $scope.employee.forEach(function (v) {
                                            v.isSelected = false;
                                        });
                                        $scope.isSelecteAll = false;
                                        $subScope.isSetAccessDep = false;
                                        $subScope.isSetAccess = false;
                                    }
                                };

                                // 单选部门
                                $scope.selectDep = function (item) {
                                    $subScope.isSetAccessDep = false;
                                    item.isSelected = !item.isSelected;
                                    var temp = true;
                                    $scope.department.forEach(function (v) {
                                        if (!v.isSelected) {
                                            temp = false;
                                            return false;
                                        } else {
                                            $subScope.isSetAccessDep = true;
                                        }
                                    });
                                    if (temp) {
                                        $scope.isSelecteAll = true;
                                    } else {
                                        $scope.isSelecteAll = false;
                                    }
                                };
                                // 单选人员
                                $scope.select = function (item) {
                                    $subScope.isSetAccess = false;
                                    item.isSelected = !item.isSelected;
                                    var temp = true;
                                    $scope.employee.forEach(function (v) {
                                        if (!v.isSelected) {
                                            temp = false;
                                            return false;
                                        } else {
                                            $subScope.isSetAccess = true;
                                        }
                                    });
                                    if (temp) {
                                        $scope.isSelecteAll = true;
                                    } else {
                                        $scope.isSelecteAll = false;
                                    }
                                };
                                // 单个删除部门
                                $scope.deleteDeparment = function (index) {
                                    $scope.department.splice(index, 1);
                                    if ($scope.department.length < 1) {
                                        $subScope.isSetAccessDep = false;
                                    }
                                };
                                // 单个删除人员
                                $scope.delete = function (index) {
                                    $scope.employee.splice(index, 1);
                                    if ($scope.employee.length < 1) {
                                        $subScope.isSetAccess = false;
                                    }
                                };
                                // 删除多个
                                $scope.deleteSelected = function () {
                                    var unSelectedDep = [];
                                    $scope.department.forEach(function (v) {
                                        if (!v.isSelected) {
                                            unSelectedDep.push(v);
                                        }
                                    });
                                    var unSelected = [];
                                    $scope.employee.forEach(function (v) {
                                        if (!v.isSelected) {
                                            unSelected.push(v);
                                        }
                                    });
                                    if (unSelected.length != $scope.employee.length || unSelectedDep.length != $scope.department.length) {
                                        frame.confirm.open({
                                            title: "提示",
                                            icon: "danger",
                                            message: "确定删除吗？",
                                            confirm: function () {
                                                $scope.employee = unSelected;
                                                $scope.department = unSelectedDep;
                                                $scope.isSelecteAll = false;
                                                if (($scope.employee.length < 1) && ($scope.department.length < 1)) {
                                                    $subScope.isSetAccessDep = false;
                                                    $subScope.isSetAccess = false;
                                                }
                                            }
                                        })
                                    }
                                };
                                // 保存
                                $scope.editShare = function () {
                                    $scope.fileUsers = [];
                                    $scope.fileDepartments = [];
                                    var ids = [];
                                    var isOut = false;
                                    $scope.epermission = 0;
                                    $scope.dpermission = 0;

                                    $subScope.employee.forEach(function (v) {
                                        var eitem = {}
                                        if (v.id) {
                                            eitem.employeeId = (v.id);
                                        }
                                        if (v.employeeId) {
                                            eitem.employeeId = (v.employeeId);
                                        }
                                        if (v.authority) {
                                            eitem.permissionIds = tools.array.merge(v.authority);
                                            $scope.epermission = $scope.epermission + v.authority.length;
                                        }
                                        $scope.fileUsers.push(eitem)
                                    });
                                    $subScope.department.forEach(function (v) {
                                        var ditem = {}
                                        if (v.id) {
                                            ditem.departmentId = (v.id);
                                        }
                                        if (v.departmentId) {
                                            ditem.departmentId = (v.departmentId);
                                        }
                                        if (v.authority) {
                                            ditem.permissionIds = tools.array.merge(v.authority);
                                            $scope.dpermission = $scope.dpermission + v.authority.length;
                                        }
                                        $scope.fileDepartments.push(ditem)
                                    });

                                    $subScope.internalMethods = function () {
                                        // 判断父级成员
                                        // if ($scope.parentEmployeeIds.length && item.parentId) {
                                        //     var temp = [];
                                        //     $subScope.employee.forEach(function(v) {
                                        //         if (v.id) {
                                        //             if ($scope.parentEmployeeIds.indexOf(v.id) != -1) {
                                        //                 temp.push(v.id);
                                        //             } else {
                                        //                 isOut = true;
                                        //             }
                                        //         }
                                        //         if (v.employeeId) {
                                        //             if ($scope.parentEmployeeIds.indexOf(v.employeeId) != -1) {
                                        //                 temp.push(v.employeeId);
                                        //             } else {
                                        //                 isOut = true;
                                        //             }
                                        //         }
                                        //     });
                                        //     ids = temp;
                                        // }
                                        // 如果人数为0
                                        // if (!$scope.parentEmployeeIds.length && item.parentId && item.shareType != 1) {
                                        //     isOut = true;
                                        // }
                                        // if (isOut) {
                                        //     frame.confirm.open({
                                        //         message: "所选人员范围不能大于上级人员范围",
                                        //         subMessage: "超出范围的人员将被过滤",
                                        //         confirm: function() {
                                        //             api.cloud.editShare({
                                        //                 id: item.id,
                                        //                 fileUsers: $scope.fileUsers,
                                        //                 fileDepartments: $scope.fileDepartments
                                        //             }).success(function(result) {
                                        //                 $uibModalInstance.close();
                                        //                 $outScope.listSearch();
                                        //             });
                                        //         }
                                        //     })
                                        // } else {

                                        api.cloud.editShare({
                                            id: item.id,
                                            fileUsers: $scope.fileUsers,
                                            fileDepartments: $scope.fileDepartments
                                        }).success(function (result) {
                                            $uibModalInstance.close();
                                            $outScope.listSearch();
                                        });

                                        // }
                                    };

                                    if ($scope.fileUsers.length == 0 && $scope.fileDepartments.length == 0) {
                                        frame.confirm.open({
                                            title: "提示",
                                            icon: "warning",
                                            message: "确认此文件加不共享给任何人吗?",
                                            confirm: function () {
                                                $subScope.internalMethods();
                                                $uibModalInstance.close();
                                            }
                                        })
                                    } else {
                                        if (($scope.epermission == 0) && ($scope.dpermission == 0)) {
                                            $uibModal.open({
                                                backdrop: "static",
                                                templateUrl: "/client/business/cloud/cloud-modals/promptPermissionModal/promptPermissionModal.html",
                                                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                                                    $scope.confirm = function () {
                                                        $subScope.internalMethods();
                                                        $uibModalInstance.close();
                                                    }
                                                    /* 陈卫2018.7.24 修改点击设置不跳转问题 */
                                                    $scope.setAccess = function () {
                                                        if ($subScope.isSetAccess || $subScope.isSetAccessDep) {
                                                             $uibModalInstance.close();
                                                             $uibModal.open({
                                                                 backdrop: "static",
                                                                 templateUrl: "/client/business/cloud/cloud-modals/setAccessModal/setAccessModal.html",
                                                                 controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                                                                     $scope.search = function () {
                                                                         // checkNum为当前选中人数
                                                                         var checkNum = 0;
                                                                         var authorities = [];
                                                                         $subScope.department.forEach(function (e) {
                                                                             if (e.isSelected) {
                                                                                 checkNum++;
                                                                                 authorities = e.authority || [];
                                                                             }
                                                                         });
                                                                         $subScope.employee.forEach(function (e) {
                                                                             if (e.isSelected) {
                                                                                 checkNum++;
                                                                                 authorities = e.authority || [];
                                                                             }
                                                                         });
                                                                         if (checkNum == 1 && authorities && authorities.length > 0) {
                                                                             $scope.access = authorities;
                                                                         }
                                                                     };
                                                                     $scope.search();
                                                                     //确定
                                                                     $scope.confirmSetAccess = function () {
                                                                         var obj = document.getElementsByName("access");
                                                                         var check_val = [];
                                                                         var k;
                                                                         for (k in obj) {
                                                                             if (obj[k].checked)
                                                                                 check_val.push(Number(obj[k].value));
                                                                         }
                                                                         $scope.access = $subScope.access = check_val;
                                                                         $subScope.isSetAccessDep = false;
                                                                         $subScope.isSetAccess = false;
                                                                         $subScope.employee.forEach(function (e) {
                                                                             if (e.isSelected) {
                                                                                 e.authority = check_val;
                                                                                 e.isSelected = false;
                                                                                 $subScope.isSelecteAll = false;
                                                                             }
                                                                         })
                                                                         $subScope.department.forEach(function (e) {
                                                                             if (e.isSelected) {
                                                                                 e.authority = check_val;
                                                                                 e.isSelected = false;
                                                                                 $subScope.isSelecteAll = false;
                                                                             }
                                                                         })
                                                                         $uibModalInstance.close();
                                                                     };
                                                                     //取消
                                                                     $scope.cancelSetAccess = function () {
                                                                         $uibModalInstance.close();
                                                                     }
                                                                 }]
                                                             })
                                                        } else {
                                                            frame.tooltip.open({
                                                                icon: "warning",
                                                                message: "没有选择人员，请选择人员"
                                                            });
                                                            $uibModalInstance.close();
                                                        }

                                                    }
                                                }]
                                            })
                                        } else {
                                            $subScope.internalMethods();
                                        }
                                    }
                                }

                                // 取消
                                $scope.cancel = function () {
                                    $uibModalInstance.close();
                                };
                            }]
                        });
                    } else {
                        $uibModal.open({
                            backdrop: "static",
                            templateUrl: "/client/business/cloud/cloud-modals/sharePartModal/sharePartModal.html",
                            controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                                $scope.isInShare = false;
                                $scope.isPersonol = false;
                                // 是否为个人分享
                                if (item.shareType == 2) $scope.isPersonol = true;

                                api.cloud.findShares({
                                    id: item.id
                                }).success(function (result) {
                                    if (result.employee) {
                                        $scope.creator = result.employee;
                                        $scope.creator.iconSrc = tools.file.buildDownloadUrl(result.employee.iconUuid);
                                        $scope.creator.lastName = result.employee.employeeName; //.charAt(result.employee.employeeName.length - 1, 1);
                                    }
                                    result.shares.forEach(function (v) {
                                        v.iconSrc = tools.file.buildDownloadUrl(v.iconUuid);
                                        v.lastName = v.employeeName; //.charAt(v.employeeName.length - 1, 1);
                                        // 是否在分享成员中
                                        if (v.id) {
                                            if (v.id == $outScope.userInfo.id) {
                                                $scope.isInShare = true;
                                            }
                                        }
                                        if (v.employeeId) {
                                            if (v.employeeId == $outScope.userInfo.id) {
                                                $scope.isInShare = true;
                                            }
                                        }
                                    });
                                    $scope.employee = result.shares;
                                });

                                // 退出共享
                                $scope.quit = function () {
                                    frame.confirm.open({
                                        title: "提示",
                                        message: "确定退出共享吗?",
                                        confirm: function () {
                                            api.cloud.quitShare({
                                                id: item.id
                                            }).success(function () {
                                                frame.tooltip.open({
                                                    message: "已退出共享",
                                                    timeout: 2000
                                                });
                                                $uibModalInstance.close();
                                                $outScope.listSearch();
                                            });
                                        }
                                    })
                                };
                                // 取消
                                $scope.cancel = function () {
                                    $uibModalInstance.close();
                                };
                            }]
                        });
                    }
                };

                // 下载文件记录
                $scope.downloadRecord = function (item) {
                    api.cloud.downloadRecord({
                        id: item.id
                    });
                };

            }
        ])
    });