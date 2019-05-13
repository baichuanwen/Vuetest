<template>
  <b-modal class="" size="lg" ref="gcbProjectMultiple">
    <div slot="modal-header">选择项目</div>
    <Row :gutter="16">
      <Col :span="options.multiple ? 12 : 24">
        <Card dis-hover>
          <Row slot="title">
            <Input v-model="searchText" icon="ios-search" placeholder="请输入项目名称" @on-click="searchSelect()" @on-keydown="searchKeyDown($event)"></Input>
          </Row>
          <Row class="employ-tree">
            <div v-if="!searchMode">
              <gcbProjectTreeMultiple :data="projectData" :options="options" :selectitem="selectItem" @itemSelect="itemSelect"></gcbProjectTreeMultiple>
            </div>
            <div v-if="searchMode">
              <ul class="tree-employee" v-show="!options.multiple">
                <li v-for="(eitem,index) in searchprojectData" :key="index" @click="searchSelect(eitem)" :class="{'active':eitem.id === selectItem.id}">{{ eitem.employeeName }}</li>
              </ul>
              <ul class="tree-employee" v-show="options.multiple">
                <li v-for="(eitem,index) in searchprojectData" :key="index" @click="searchSelect(eitem)" :class="{'active':selectItem[eitem.id]}">
                  <Icon v-if="!selectItem[eitem.id]" type="android-checkbox-outline-blank" size="18" color="#999"></Icon>
                  <Icon v-if="selectItem[eitem.id]" type="android-checkbox" size="18" color="#999"></Icon>
                  <span>{{eitem.projectName}}</span>
                </li>
              </ul>
              <!--<ul class="tree-project">-->
                <!--<CheckboxGroup>-->
                  <!--<li v-for="(pitem,i) in projects" :key="i" :class="{'active':pitem.id === selectItem.id}">-->
                    <!--<Checkbox :label="pitem.projectName"></Checkbox>-->
                  <!--</li>-->
                <!--</CheckboxGroup>-->
              <!--</ul>-->
            </div>
          </Row>
        </Card>
      </Col>
      <Col span="12">
        <Card dis-hover class="selectNode">
          <Row slot="title" type="flex" justify="space-between">
            <Col span="4"><p>已选择 <span>0</span></p></Col>
            <Col span="4">
              <Button type="error" size="small">清除</Button>
            </Col>
          </Row>
          <Row class="employ-tree-node">
            <div class="panel-body">
              <div id="selected-box">
                <ul class="list-group">
                  <li class="" v-for="(project, $index) in selectedItems" :key="$index">
                    <div class="employee-member">
                      <span>{{project.projectName}}</span>
                      <i class="fa fa-window-close" aria-hidden="true" @click="remove(project)"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Row>
        </Card>
      </Col>
    </Row>
    <div slot="modal-footer">
      <Button type="primary" size="large" @click="handleAction(selectItem)">确定</Button>
      <Button type="default" size="large" @click="close">取消</Button>
    </div>
  </b-modal>
</template>
<script>
  import Component from '../module'

  export default {
    data() {
      return {
        options: {},
        searchText: '',
        projectData: {},
        searchprojectData: {},
        selectItem: {},
        selectedItems: [],
        searchMode: false,
        projects: {}
      }
    },
    methods: {
      itemSelect(node) {
        this.selectItem = node
      },
      searchSelect(item) {
        this.selectItem = item
      },
      toggleSelect(node) {
        // this.selectItem = node
        console.log(node)
        if (node.$selected) {
          this.remove(node)
        } else {
          this.select(node)
        }
      },
      handleAction(button) {
        this.$emit('action', button)
      },
      open() {
        this.$refs.gcbProjectMultiple.show()
      },
      close() {
        this.$refs.gcbProjectMultiple.hide()
      },
      search: function () {
        var projectQueryFun = this.options.isAuthData ? Component.api.project.infoQuery : Component.api.project.query;
        if (this.isEmpty(this.searchText)) {
          this.searchMode = false
        } else {
          this.searchMode = true
          projectQueryFun({
            projectName: this.searchText,
            isSubCompanyProject: this.options.isSubCompanyProject,
            isIncludeCreatorProject: this.options.isIncludeCreatorProject
          }).then((projects) => {
            this.searchprojectData = projects
          })
        }
      },
      searchKeyDown: function ($event) {
        if ($event.keyCode != 13) {
          return
        }
        this.searchSelect()
      },
      select: function (project) {
        project.$selected = true
        this.selectedItems.push(project)
      },
      remove: function (project) {
        var selectedItem
        console.log(project)
        for (var i = 0; i < this.selectedItems.length; i++) {
          selectedItem = this.selectedItems[i]
          if (selectedItem.id == project.id) {
            project.$selected = false
            this.selectedItems.splice(i, 1)
            break
          }
        }
      },
    },
    mounted() {
      var projectOrgQueryFun = this.options.isAuthData ? Component.api.project.infoOrganizationQuery : Component.api.project.organizationQuery;
      projectOrgQueryFun({
        isSubCompanyProject: this.options.isSubCompanyProject,
        isIncludeCreatorProject: this.options.isIncludeCreatorProject
      }).then((projects) => {
        console.log(projects)
        this.projectData = projects
      });
    }
  }
</script>
<style lang="less" scoped>
  .employ-tree {
    overflow: auto;
    max-height: 400px;
    height: 400px;
  }
  .employ-tree-node {
    height: 405px;
  }
  .selectNode {
    margin-left: 15px;
  }
  .employee-member {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    padding: 10px 15px;
  }
  .employee-member span {
    flex-grow: 1;
  }
  .ivu-card-body {
    overflow-y: auto;
  }
</style>
