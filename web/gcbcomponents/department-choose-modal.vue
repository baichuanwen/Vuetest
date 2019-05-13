<template>
  <div>
    <div class="modal-header">
      <h3 class="modal-title text-center">选择部门</h3>
    </div>
    <div class="modal-body">
      <div id="department-choose-modal-root">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group has-feedback">
              <input type="text" class="form-control" v-model="searchText" placeholder="请输入部门名称"
                     @keydown="searchKeyDown($event)">
              <span class="glyphicon glyphicon-search form-control-feedback" @click="search()"
                    style="color:#999;"></span>
            </div>
          </div>
        </div>
        <div class="row" style="height: 400px;overflow: auto;">
          <div class="col-sm-12" v-show="!searchMode">
            <ul class="tree-list-group" style="padding-left: 0;">
              <li class="tree-list-item">
                <div class="tree-list-header" @dblclick="dbSelect(department);"
                     :class="" @click="currentSelect(department);">
                  <!--:class="{active:selectedItem.id == department.id}" @click="select(department);">-->
                  <i class="fa fa-plus-square text-primary"
                     :class="department.children ? (department.$$expend ? 'fa-minus-square' : 'fa-plus-square') : 'icon-placeholder'"
                     @click="openClose(department, $event)"></i>
                  <span>{{department.departmentName}}</span>
                </div>
                <!--<ul ng-init="parent=department;parent.$$expend=true;" ng-include="'departmentChooseTreeTemp'" class="tree-list-group" ng-show="department.$$expend"></ul>-->
                <ul class="tree-list-group" v-show="department.$$expend">
                  <role-tree :child="child" v-for="(child,idx) in department.children" :open-close="openClose"
                             v-show="department.$$expend"
                             :key="idx" :db-select="dbSelect" :current-select="currentSelect"
                             class="tree-list-group"></role-tree>
                </ul>
              </li>
            </ul>
          </div>
          <div class="col-sm-12" v-show="searchMode">
            <ul class="list-group">
              <li class="list-group-item hover" @dblclick="dbSelect(department)"
                  :class="{active:selectedItem.id == depart.id}" v-for="(depart, $index) in department"
                  :key="$index"
                  @click="currentSelect(depart)">{{depart.departmentName}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary btn-width-90" type="button" @click="confirm()">确定</button>
      <button class="btn btn-default btn-width-90" type="button" @click="cancel()">取消</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/libs/axios'
  import config from "@/config/index"
  // import api from './moudles/project/moudle'

  export default {
    props: ['opinions'],
    components: {
      'role-tree': {
        name: 'role-tree',
        template: `
                  <li class="tree-list--item">
                    <div class="tree-list-header" @dblclick="dbSelect(child)" @click="currentSelect(child)">
                        <i class="fa fa-plus-square text-primary" :class="child.children ? (child.$$expend ?  'fa-minus-square' : 'fa-plus-square') : 'icon-placeholder'" @click="openClose(child, $event)"></i>
                        <span>{{child.departmentName}}</span>
                    </div>
                    <!--<ul class="tree-list-group" ng-include="'departmentChooseTreeTemp'" ng-show="child.$$expend && child.children.length" ng-init="parent=child;"></ul>-->
                    <ul class="tree-list-group" v-show="child.$$expend && child.children">
                        <role-tree :child="children" v-for="(children,idx) in child.children" :open-close="openClose" v-show="child.$$expend"
                             :key="idx" :db-select="dbSelect" :current-select="currentSelect"
                             class="tree-list-group"></role-tree>
                    </ul>
                  </li>
                `,
        props: ['child', 'dbSelect', 'currentSelect', 'openClose']
      }
    },
    data() {
      return {
        tree: config.apiHost + 'web/department/tree',
        query: config.apiHost + 'web/department/query',
        defaults: {
          title: '选择部门',
          selectedItem: []
        },
        title: '选择部门',
        searchText: null,
        selectedItem: [],
        department: {},
        searchMode: false,
        clicked: false,
        cancelClick: false
      }
    },
    methods: {
      isEmpty: function (str) {
        return str == "" || str == null || str == undefined
      },
      openClose(child, e) {
        var e = e || event;
        if (e) {
          e.stopPropagation()
        }
        child.$$expend = !child.$$expend
      },
      //zp 添加双击展开节点时 避免多次触发点击事件 设置$timeout
      currentSelect: function (department) {
        if (this.clicked) {
          this.cancelClick = true
          return
        }
        this.clicked = true
        setTimeout(function () {
          if (this.cancelClick) {
            this.cancelClick = false
            this.clicked = false
            return
          }
          this.selectedItem = department
          //clean up
          this.cancelClick = false
          this.clicked = false
        }, 300)
        // this.selectedItem = department
      },
      dbSelect: function (department) {
        this.selectedItem = department
        console.log(1)
        console.log(this.selectedItem)
        this.confirm(department)
      },
      //zp 添加 父节点 双击展开子节点
      departmentDblClick: function (department, $event) {
        setTimeout(function () {
          department.$$expend = !department.$$expend
          console.log("我是双击")
        })
      },
      //end
      search: function ($event) {
        const self = this
        if (this.isEmpty(this.searchText)) {
          this.searchMode = false
        }
        else {
          this.searchMode = true
          axios.request({
            url: self.query,
            data:{
              departmentName: this.searchText
            },
            method:'post'
          }).then(function (departments) {
            console.log(departments)
            self.department = departments
          })
          // api.department.query({departmentName: this.searchText}).success(function (departments) {
          //   this.departments = departments
          // })
        }
      },

      searchKeyDown: function ($event) {
        if ($event.keyCode != 13) {
          return
        }
        this.search()
      },

      cancel: function () {
        // !(options.cancel() === false) && $uibModalInstance.close()  // TODO:隐藏此组件
      },

      confirm: function () {
        // !(options.confirm($scope.selectedItem) === false) && $uibModalInstance.close()
      }
    },
    mounted() {
      const self = this
      // this.title = this.options.title
      // this.selectedItem = this.options.selectedItem || {}

      axios.request({
        url:self.tree,
        data:{},
        method:'post'
      }).then(function (department) {
        ;(function fn_add_attr(arr) {
          for (const item  of arr.keys()) {
            arr[item].$$expend = false
            if (arr[item].children.length > 0) {
              fn_add_attr(arr[item].children)
            }
          }
        })(department.children)
        department.$$expend = true
        self.department = department
        console.log(self.department)
      })

      // api.department.tree({}).success(function (department) {
      //   this.department = department
      // })
    }
  }
</script>

<style scoped>
  #department-choose-modal-root {

  }
  #department-choose-modal-root .tree-list-header {
    cursor: pointer;
  }
  #department-choose-modal-root .fa-plus-square, #department-choose-modal-root .fa-minus-square {
    cursor: pointer;
  }
  #department-choose-modal-root .list-group-item.hover {
    color: #333;
  }
  #department-choose-modal-root .tree-list-header.active {
    color: #248bfe;
  }
  /*zp 添加 页面文字不被选中*/
  .tree-list-group, .list-group {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
