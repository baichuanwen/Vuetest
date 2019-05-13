<template>
  <b-modal class="modal-body" size="lg" ref="gcbEmployee">
    <div slot="modal-header">选择项目</div>
    <Row :gutter="16">
      <Col span="12">
        <Card dis-hover>
          <Row slot="title">
            <Input v-model="searchText" icon="ios-search" placeholder="请输入项目名称" @on-click="search"></Input>
          </Row>
          <Row>
            <div>
              <label class="checkbox-inline"><input type="checkbox" v-model="isBuilding"><i></i> 在建项目</label>
              <label class="checkbox-inline"><input type="checkbox" v-model="isCompleted"><i></i> 竣工项目</label>
            </div>
          </Row>
          <Row class="employ-tree">
            <ul v-show="!searchMode" class="gcb-employee-tree">
              <li class="tree-item">
                <div class="tree-header" :class="{active:department.$selected}">
                  <i class="fa fa-plus-square text-primary cursor-pot"
                     :class="department.$$expend ? 'fa-minus-square' : 'fa-plus-square'"
                     @click="department.$$expend =! department.$$expend"></i>
                  <label class="checkbox-inline" @dblclick="department.$$expend =! department.$$expend">
                    <input type="checkbox" :checked="department.$selected"><i></i>
                    <span>{{department.departmentName}}</span>
                  </label>
                </div>
                <ul class="gcb-employee-tree" v-show="department.$$expend">
                  <role-tree :child="child" v-for="(child, index) in department.children" :open-close="openClose"
                             :toggle-select="toggleSelect"
                             :isBuilding="isBuilding" :buildingMap="buildingMap" :isCompleted="isCompleted"
                             :completedMap="completedMap"
                             :key="index"></role-tree>
                </ul>
                <ul class="gcb-employee-tree" v-show="department.$$expend">
                  <li class="tree-item hover"
                      v-show="isBuilding&&buildingMap[project.projectStatus]||isCompleted&&completedMap[project.projectStatus]"
                      :class="{active:project.$selected}" v-for="(project, $index) in department.projects"
                      :key="$index">
                    <label class="checkbox-inline">
                      <input type="checkbox" @click="toggleSelect(project)" :checked="project.$selected"><i></i>
                      <span>{{project.projectName}}</span>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
            <ul v-show="searchMode" class="gcb-employee-tree" style="padding-left: 0;">
              <li class="tree-item hover"
                  v-show="isBuilding&&buildingMap[project.projectStatus]||isCompleted&&completedMap[project.projectStatus]"
                  :class="{active:project.$selected}" v-for="(project, $index) in projects" :key="$index">
                <label class="checkbox-inline">
                  <input type="checkbox" @click="toggleSelect(project)" :checked="project.$selected"><i></i>
                  <span>{{project.projectName}}</span>
                </label>
              </li>
            </ul>
          </Row>
        </Card>
      </Col>
      <Col span="12">
        <Card dis-hover>
          <Row slot="title" type="flex" justify="space-between">
            <div class="col-sm-6">已选择 <span class="text-danger">{{selectedItems.length}}</span></div>
            <div class="col-sm-6 text-right">
              <button class="btn btn-danger btn-xs" type="button" @click="removeAll()">清空</button>
            </div>
          </Row>
          <Row class="employee-multiple-tree">
            <ul class="list-group" style="padding-left: 0;">
              <li class="list-group-item hover" v-for="(project, $index) in selectedItems" :key="$index">
                <div class="project-title">{{project.projectName}}</div>
                <div class="project-close-btn"><i class="fa fa-window-close" aria-hidden="true"
                                                  @click="remove(project)"></i></div>
              </li>
            </ul>
          </Row>
        </Card>
      </Col>
    </Row>
    <div slot="modal-footer">
      <Button type="primary" size="large" @click="confirm(selectItem)">确定</Button>
      <Button type="default" size="large" @click="cancel">取消</Button>
    </div>
  </b-modal>
</template>

<script>
  // import axios from '@/libs/axios'
  import config from "@/config/index"
  import Component from '../module'

  export default {
    props: ['opinions'],
    components: {
      'role-tree': {
        name: 'role-tree',
        template: `
            <li class="tree-item">
                <div class="tree-header" :class="{active:child.$selected}">
                    <i class="fa fa-plus-square text-primary cursor-pot" :class="child.$$expend ? 'fa-minus-square' : 'fa-plus-square'" @click="child.$$expend =! child.$$expend;"></i>
                    <label class="checkbox-inline" @dblclick="child.$$expend =! child.$$expend">
                        <input type="checkbox" :checked="child.$selected"><i></i>
                        <span>{{child.departmentName}}</span>
                    </label>
                </div>
                <ul class="gcb-employee-tree" v-show="child.$$expend" style="padding-left: 15px">
                     <role-tree :child="children" v-for="(children, index) in child.children" :open-close="openClose" :key="index" :toggle-select="toggleSelect"
                     :isBuilding="isBuilding" :buildingMap="buildingMap" :isCompleted="isCompleted" :completedMap="completedMap"></role-tree>
                </ul>
                <ul class="gcb-employee-tree" v-show="child.$$expend && child.projects">
                    <li class="tree-item hover" v-show="isBuilding&&buildingMap[project.projectStatus]||isCompleted&&completedMap[project.projectStatus]" :class="{active:project.$selected}" v-for="(project,index) in child.projects" :key="index">
                        <label class="checkbox-inline">
                            <input type="checkbox" @click="toggleSelect(project)" :checked="project.$selected"><i></i>
                            <span>{{project.projectName}}</span>
                        </label>
                    </li>
                </ul>
            </li>
                `,
        props: ['child', 'openClose', 'isBuilding', 'buildingMap', 'isCompleted', 'completedMap', 'toggleSelect']
      }
    },
    data() {
      return {
        host: config.apiHost + "web/project/organizationQuery",
        isBuilding: true,
        isCompleted: false,
        completedMap: {},
        buildingMap: {},
        defaults: {
          title: '项目选择',
          selectedItems: null,
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false
        },
        title: '',
        departmentCreateForm: {
          $invalid: '',
          $pristine: ''
        },
        selectedItems: [],
        searchMode: false,
        searchText: null,
        department: {},
        projects: [],
        selectedProjectCache: {},
        navDepartmentCache: {},
        navProjectCache: {},
        listProjectCache: {}
      }
    },
    methods: {
      open() {
        this.$refs.gcbEmployee.show()
      },
      close() {
        this.$refs.gcbEmployee.hide()
      },
      isEmpty: function (str) {
        return str == "" || str == null || str == undefined
      },

      openClose(child) {
        child.$$expend = !child.$$expend
      },

      toggleSelect: function (item) {
        if (item.$selected) {
          this.remove(item)
        } else {
          this.select(item)
        }
      },
      select: function (project) {
        project.$selected = true
        this.selectedProjectCache[project.id] = project
        this.selectedItems.push(project)
        // console.log(project);
        // var _project
        // _project = this.navProjectCache[project.id]
        // _project && (_project.$selected = true)
        // _project = this.listProjectCache[project.id]
        // _project && (_project.$selected = true)
      },

      remove: function (project) {
        // var selectedItem
        // for (var i = 0; i < this.selectedItems.length; i++) {
        //   selectedItem = this.selectedItems[i]
        //   if (selectedItem.id == project.id) {
        //     // project.$selected = false
        //     this.selectedItems.splice(i, 1)
        //     break
        //   }
        // }
        var projectId = project.id
        var init = function (data) {
          if (projectId === data.id) {
            data.$selected = false
          }
          if(data.children){
            for (var i = 0; i < data.children.length; i++) {
              if(data.children[i].id == projectId){
                data.children[i].$selected = false
              }
              init(data.children[i])
            }
          }
          if (data.projects) {
            for (var i = 0; i < data.projects.length; i++) {
              if(data.projects[i].id == projectId){
                data.projects[i].$selected = false
              }
              init(data.projects[i])
            }
          }
        }
        init(this.department)
        console.log(this.department)
      },

      removeAll: function () {
        // var project
        // var _project
        // for (var i = 0; i < this.selectedItems.length; i++) {
        //   project = this.selectedItems[i]
        //   delete this.selectedProjectCache[project.id]
        //   _project = this.navProjectCache[project.id]
        //   _project && (_project.$selected = false)
        //   _project = this.listProjectCache[project.id]
        //   _project && (_project.$selected = false)
        // }
        // this.selectedItems.length = 0
        var init = function (data) {
          data.$selected = false
          if (data.projects) {
            for (var i = 0; i < data.projects.length; i++) {
              init(data.projects[i])
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
        } else {
          this.searchMode = true
          projectQueryFun({
            projectName: this.searchText,
            isSubCompanyProject: this.options.isSubCompanyProject,
            isIncludeCreatorProject: this.options.isIncludeCreatorProject
          }).success(function (projects) {
            this.listProjectCache = {}
            projects.forEach(function (v) {
              if (v.simpleName) {
                v.projectName = v.simpleName
              }
            })
            this.projects = projects
            projects.forEach(function (project) {
              project.$selected = !!this.selectedProjectCache[project.id]
              this.listProjectCache[project.id] = project
            })
          })
        }
      },

      searchKeyDown: function ($event) {
        if ($event.keyCode != 13) {
          return
        }

        this.search()
      },

      cancel: function () {
        this.$refs.gcbEmployee.hide()
      },

      confirm: function () {
        // var items = this.selectedItems
        // let itemArray = []
        // for (let i in items) {
        //   itemArray.push(items[i])
        // }
        this.$emit('action', this.selectedItems)
      }
    },
    mounted() {
      this.buildingMap = {1: true, 2: true, 3: true, 5: true}
      this.completedMap = {4: true, 6: true}

      this.selectedItems.forEach(function (project) {
        this.selectedProjectCache[project.id] = project
      });

      const self = this
      var projectOrgQueryFun = this.options.isAuthData ? Component.api.project.infoOrganizationQuery : Component.api.project.organizationQuery;
      projectOrgQueryFun({
        isSubCompanyProject: this.options.isSubCompanyProject,
        isIncludeCreatorProject: this.options.isIncludeCreatorProject
      }).then((projects) => {
        ;(function fn_add_attr(arr) {
          for (const item  of arr.keys()) {
            arr[item].$$expend = false
            arr[item].$selected = false
            if (arr[item].children.length > 0) {
              fn_add_attr(arr[item].children)
            }
          }
        })(projects.children)

        var init = function (data) {
          if (data.projects) {
            for (var i = 0; i < data.projects.length; i++) {
              var project = data.projects[i]
              project.$selected = true
            }
            // projects.projects.forEach(function (project) {
            //   project.$selected = false
            // })
          }
        };
        init(projects.children)

        projects.$$expend = true
        projects.$selected = false
        self.department = projects // 数据格式

        console.log("projects:");
        console.log(self.department);
      })
    }
  }
</script>

<style scoped>
  .employ-tree {
    height: 400px;
    overflow-y: auto;
  }
  .gcb-employee-tree {
    margin: 0;
    list-style: none;
    padding-left: 15px;
  }
  .tree-item {
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    list-style: none;
    cursor: pointer;
  }
  .tree-employee li,
  .tree-header {
    padding: 5px;
    width: 100%;
  }
  .tree-employee li i,
  .tree-header i {
    color: #248bfe;
  }
  .tree-employee li {
    padding-left: 15px;
  }
  #project-choose-modal-root {
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  #project-choose-modal-root .list-group {
    margin: 0;
    padding-left: 15px;
  }
  #project-choose-modal-root .list-group-item.active {
    color: #333;
  }
  #project-choose-modal-root .tree-list-header {
    padding: 2px;
  }
  #project-choose-modal-root .list-group-item {
    padding: 2px;
  }
  #project-choose-modal-root .list-group-item > .checkbox-inline {
    width: 100%;
  }
  #project-choose-modal-left {
    padding-right: 0;
  }
  #project-choose-modal-left .panel-body {
    padding-bottom: 0;
  }
  #project-choose-modal-left #choose-box {
    border-top: 1px #ddd solid;
  }
  #project-choose-modal-left #choose-box .checkbox-inline {
    padding: 10px 0 10px 0;
  }
  #project-choose-modal-left #unselected-box .checkbox-inline {
    padding-left: 0;
    width: 98%;
  }
  #project-choose-modal-left #unselected-box .checkbox-inline i {
    top: -1px;
  }
  #project-choose-modal-left #unselected-box {
    padding: 5px;
    border-top: 1px #ddd solid;
    height: 350px;
    overflow: scroll;
  }
  #project-choose-modal-right .panel-body {
    padding: 5px 0 5px 5px;
  }
  #project-choose-modal-right #selected-box {
    height: 403px;
    overflow-y: scroll;
  }
  #project-choose-modal-right {

  }
  #project-choose-modal-right .project-title {
    display: table-cell;
    width: 275px;
  }
  #project-choose-modal-right .project-close-btn {
    display: table-cell;
    width: 25px;
    padding-left: 5px;
    color: #ccc;
    cursor: pointer;
  }

</style>
