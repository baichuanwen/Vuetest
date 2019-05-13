<template>
  <div>
    <div class="modal-header">
      <h4 class="modal-title text-center"><span>{{title}}</span></h4>
    </div>
    <div class="modal-body">
      <div id="department-choose-modal-root" class="row">
        <div id="department-choose-modal-left" class="col-sm-6">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group has-feedback">
                    <input type="text" class="form-control" placeholder="请输入部门名称" v-model="searchText"
                           @keydown="searchKeyDown($event)">
                    <span class="glyphicon glyphicon-search form-control-feedback" @click="search()"
                          style="color:#999;"></span>
                  </div>
                </div>
                <div id="unselected-box" class="col-sm-12">
                  <ul v-show="!searchMode" class="tree-list-group" style="padding-left: 0;width: 1000px;">
                    <li class="tree-list-item">
                      <div class="tree-list-header" :class="{active:department.$selected}">
                        <i class="fa fa-plus-square text-primary"
                           :class="department.$$expend ? 'fa-minus-square' : 'fa-plus-square'"
                           @click="currentSelect(department)"></i>
                        <label class="checkbox-inline">
                          <input type="checkbox" @click="toggleSelect(department, $event)" :checked="department.$selected"
                                 @dblclick="dbSelect(department)"><i></i>
                          <span>{{department.departmentName}}</span>
                        </label>
                      </div>
                      <!--<ul ng-init="parent=department;parent.$$expend=true;" ng-include="'departmentChooseTreeTemp'" class="tree-list-group" ng-show="department.$$expend"></ul>-->
                      <ul class="tree-list-group" v-show="department.$$expend">
                        <role-tree :child="child" v-for="(child,idx) in department.children"
                                   :toggle-select="toggleSelect"
                                   v-show="department.$$expend"
                                   :key="idx" :db-select="dbSelect" :current-select="currentSelect"
                                   class="tree-list-group"></role-tree>
                      </ul>
                    </li>
                  </ul>
                  <ul v-show="searchMode" class="list-group" style="padding-left: 0;">
                    <li class="list-group-item hover" :class="{active:department.$selected}"
                        v-for="(department, $index) in departments" :key="$index">
                      <label class="checkbox-inline">
                        <input type="checkbox" :checked="department.$selected"
                               @dblclick="dbSelect(department, $event)"><i></i>
                        <span>{{department.departmentName}}</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="department-choose-modal-right" class="col-sm-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="row">
                <div class="col-sm-6">已选择 <span class="text-danger">{{selectedItems.length}}</span></div>
                <div class="col-sm-6 text-right">
                  <button class="btn btn-danger btn-xs" type="button" @click="removeAll()">清空</button>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <div id="selected-box">
                <ul class="list-group" style="padding-left: 0;">
                  <li class="list-group-item hover" v-for="(department, $index) in selectedItems" :key="$index">
                    <div class="department-title">{{department.departmentName}}</div>
                    <div class="department-close-btn"><i class="fa fa-window-close" aria-hidden="true"
                                                         @click="remove(department)"></i></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary btn-width-90"
              :disabled="departmentCreateForm.$invalid || departmentCreateForm.$pristine" type="button"
              @click="confirm()">确定
      </button>
      <button class="btn btn-default btn-width-90" type="button" @click="cancel()">取消</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/libs/axios'
  import config from "@/config/index"

  export default {
    props: ['opinions'],
    components: {
      'role-tree': {
        name: 'role-tree',
        template: `
                <li class="tree-list--item">
                    <div class="tree-list-header" :class="{active:child.$selected}">
                        <i class="fa fa-plus-square text-primary" :class="child.$$expend ? 'fa-minus-square' : 'fa-plus-square'" @click="currentSelect(child)"></i>
                        <label class="checkbox-inline">
                            <input type="checkbox" @click="toggleSelect(child)" :checked="child.$selected"><i></i>
                            <span>{{child.departmentName}}</span>
                        </label>
                    </div>
                    <!--<ul class="tree-list-group" ng-include="'departmentChooseTreeTemp'" ng-show="child.$$expend && child.children.length" ng-init="parent=child;"></ul>-->
                    <ul class="tree-list-group" v-show="child.$$expend">
                        <role-tree :child="children" v-for="(children,idx) in child.children"  :toggle-select="toggleSelect"
                                   v-show="child.$$expend"
                                   :key="idx" :db-select="dbSelect" :current-select="currentSelect"
                                   class="tree-list-group"></role-tree>
                    </ul>
                </li>
                `,
        props: ['child', 'dbSelect', 'currentSelect', 'toggleSelect']
      }
    },
    data() {
      return {
        tree: config.apiHost + 'web/department/tree',
        query: config.apiHost + 'web/department/query',
        defaults: {
          title: '选择项目',
          selectedItem: [],
          isAuthData: false
        },
        title: '选择部门',
        departmentCreateForm: {
          $invalid: '',
          $pristine: ''
        },
        selectedItems: [], // 已选择部门
        searchMode: false, // 搜索模式
        searchText: null, // 搜索内容
        department: {}, // 部门
        departments: {}, // 部门
        selectedDepartmentCache: {}, // 选择的部门
        navDepartmentCache: {},
        listDepartmentCache: {}
      }
    },
    methods: {
      isEmpty: function (str) {
        return str == "" || str == null || str == undefined;
      },

      toggleSelect: function (item) {
        var i = this.selectedItems.indexOf(this.selectedDepartmentCache[item.id]);
        item.$selected = !item.$selected;

        if (!item.$selected) {
          this.selectedItems.splice(i, 1);
        } else {
          this.selectedItems.push(item);
          this.selectedDepartmentCache[item.id] = item

          if ((item.parent.id == this.department.id) && this.allDepartment) {
            var department
            var _department
            for (var i = 0; i < this.selectedItems.length; i++) {
              department = this.selectedItems[i]

              if (department.id == item.parent.id) {
                delete this.selectedDepartmentCache[department.id]
                this.selectedItems.splice(i, 1)
                _department = this.navDepartmentCache[department.id]
                _department && (_department.$selected = false)
                _department = listDepartmentCache[department.id]
                _department && (_department.$selected = false)
              }
              if (department.departmentId == item.parent.id) {
                delete this.selectedDepartmentCache[department.departmentId]
                this.selectedItems.splice(i, 1)
                _department = this.navDepartmentCache[department.departmentId]
                _department && (_department.$selected = false)
                _department = listDepartmentCache[department.departmentId]
                _department && (_department.$selected = false)
              }
            }
            this.allDepartment = false
          }
        }
      },

      remove: function (department) {
        var selectedItem
        var _department
        for (var i = 0; i < this.selectedItems.length; i++) {
          selectedItem = this.selectedItems[i]
          if (department.id) {
            if (selectedItem.id == department.id) {
              department.$selected = false
              this.selectedItems.splice(i, 1)
              break
            }
          }
          if (department.departmentId) {
            if (selectedItem.departmentId == department.departmentId) {
              department.$selected = false
              this.selectedItems.splice(i, 1)
              break
            }
          }
        }
        if (department.id) {
          delete this.selectedDepartmentCache[department.id]
          _department = this.navDepartmentCache[department.id]
          _department && (_department.$selected = false)
          _department = this.listDepartmentCache[department.id]
          _department && (_department.$selected = false)
        }
        if (department.departmentId) {
          delete this.selectedDepartmentCache[department.departmentId]
          _department = this.navDepartmentCache[department.departmentId]
          _department && (_department.$selected = false)
          _department = this.listDepartmentCache[department.departmentId]
          _department && (_department.$selected = false)
        }
      },

      removeAll: function () {
        var init = function (data) {
          data.$selected = false
          if (data.children) {
            for (var i = 0; i < data.children.length; i++) {
              init(data.children[i])
            }
          }
        }
        init(this.department)
        console.log(this.department)
        this.selectedItems.length = 0
        this.selectedItems = []
      },

      search: function ($event) {
        if (this.isEmpty(this.searchText)) {
          this.searchMode = false
        }
        else {
          this.searchMode = true
          this.departmentQueryFun({departmentName: this.searchText}).success(function (departments) {
            this.listDepartmentCache = {};
            this.departments = departments;
            this.departments.forEach(function (department) {
              this.department.$selected = !!this.selectedDepartmentCache[department.id];
              this.listDepartmentCache[department.id] = department;
            })
          })
        }
      },

      searchKeyDown: function ($event) {
        if ($event.keyCode != 13) {
          return
        }

        this.departments.search()
      },

      cancel: function () {
        // !(options.cancel() === false) && $uibModalInstance.close();
      },

      confirm: function () {
        // !(options.confirm(this.selectedItems) === false) && $uibModalInstance.close();
      },

      dbSelect: function (refs, e) {
        var e = e || event;
        if (e) {
          e.stopPropagation()
        }
        refs.$$expend = !refs.$$expend
      },

      currentSelect(refs) {
        var e = e || event;
        if (e) {
          e.stopPropagation()
        }
        refs.$$expend = !refs.$$expend
      }
    },
    mounted() {
      const self = this

      axios.request({
        url: self.tree,
        data: {},
        method: 'post'
      }).then(function (department) {
        ;(function fn_add_attr(arr) {
          for (const item  of arr.keys()) {
            arr[item].$$expend = false
            arr[item].$selected = false
            if (arr[item].children.length > 0) {
              fn_add_attr(arr[item].children)
            }
          }
        })(department.children)
        department.$$expend = true
        department.$selected = false
        self.department = department
        console.log(self.department)
      })
    }
  }
</script>

<style scoped>
  #department-choose-modal-root {
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  #department-choose-modal-root .list-group {
    margin: 0;
    /*padding-left: 31px;*/
    padding-left: 15px;
  }
  #department-choose-modal-root .list-group-item.active {
    color: #333;
  }
  #department-choose-modal-root .tree-list-header {
    padding: 2px;
  }
  #department-choose-modal-root .list-group-item {
    padding: 2px;
  }
  #department-choose-modal-left {
    padding-right: 0;
  }
  #department-choose-modal-left .panel-body {
    padding-bottom: 0;
  }
  #department-choose-modal-left #unselected-box .checkbox-inline {
    padding-left: 0;
  }
  #department-choose-modal-left #unselected-box .checkbox-inline i {
    top: -1px;
  }
  #department-choose-modal-left #unselected-box {
    padding: 5px;
    border-top: 1px #ddd solid;
    height: 391px;
    overflow: scroll;
  }
  #department-choose-modal-right .panel-body {
    padding: 5px 0 5px 5px;
  }
  #department-choose-modal-right #selected-box {
    height: 403px;
    overflow-y: scroll;
  }
  #department-choose-modal-right {

  }
  #department-choose-modal-right .department-title {
    display: table-cell;
    width: 275px;
  }
  #department-choose-modal-right .department-close-btn {
    display: table-cell;
    width: 25px;
    padding-left: 5px;
    color: #ccc;
    cursor: pointer;
  }

</style>
