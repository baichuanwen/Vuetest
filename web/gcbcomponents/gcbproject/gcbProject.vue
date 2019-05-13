<template>
  <b-modal class="" size="lg" ref="gcbEmployee">
     <div slot="modal-header">选择项目123</div>
     <Row :gutter="16">
       <Col :span="options.multiple ? 12 : 24">
          <Card dis-hover>
              <Row slot="title">
                <Input v-model="searchText" icon="ios-search" placeholder="请输入项目名称"  @on-click="search"></Input>
              </Row>
              <Row class="employ-tree">
                <div v-if="!searchMode">
                  <gcbProjectTree :data="projectData" :options="options" :selectitem="selectItem" @itemSelect="itemSelect" @itemAllSelect="itemAllSelect" @itemAllRemove="itemAllRemove"></gcbProjectTree>
                </div>
                <div v-if="searchMode">
                  <ul class="tree-employee" v-show="!options.multiple">
                    <li v-for="(eitem,index) in searchprojectData" :key="index" @click="searchSelect(eitem)" :class="{'active':eitem.id === selectItem.id}">{{ eitem.projectName }}</li>
                  </ul>
                  <ul class="tree-employee" v-show="options.multiple">
                    <li v-for="(eitem,index) in searchprojectData" :key="index" @click="searchSelect(eitem)" :class="{'active':selectItem[eitem.id]}">
                      <Icon v-if="!selectItem[eitem.id]" type="android-checkbox-outline-blank" size="18" color="#999"></Icon>
                      <Icon v-if="selectItem[eitem.id]" type="android-checkbox" size="18" color="#999"></Icon>
                      <span>{{eitem.projectName}}</span>
                    </li>
                  </ul>
                  <!--<ul class="tree-project">-->
                    <!--<li v-for="(pitem,i) in projectData" :key="i" @click="searchSelect(pitem)" :class="{'active':pitem.id === selectItem.id}">-->
                        <!--<span>{{pitem.projectName}}</span>-->
                    <!--</li>-->
                  <!--</ul>-->
                </div>
              </Row>
          </Card>
       </Col>
       <Col span="12" v-show="options.multiple">
         <Card dis-hover>
           <Row slot="title" type="flex" justify="space-between">
             <Col span="6"> <p>已选择 <span>{{ Object.getOwnPropertyNames(selectItem).length - 1 }}</span></p> </Col>
             <Col span="4"> <Button type="error" size="small" @click="clearAll">清除</Button> </Col>
           </Row>
           <Row class="project-multiple-tree">
             <Col v-for="(val, key, index) in selectItem" :key="index">
               <span>{{ val.projectName }}</span>
               <Icon type="close-round" size="16" color="#999" @click="remove(key)"></Icon>
             </Col>
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
    import gcbProjectTree from './gcbProjectTree'
    export default {
        components: {
          gcbProjectTree
        },
        data() {
            return {
                searchMode: false,
                searchText: '',
                projectData: {},
                selectItem: {},
                searchprojectData: {}
            }
        },
        methods: {
          itemSelect(node) {
            const self = this
            if (!self.options.multiple) {
              self.selectItem = node
            } else {
              if (!self.selectItem[node.id]) {
                self.selectItem[node.id] = node
                // console.log(node)
                // console.log(self.selectItem)
              } else {
                delete self.selectItem[node.id]
              }
            }
            this.$forceUpdate()
          },
          itemAllSelect(node) {
            const self = this
            if (!self.selectItem[node.id]) {
              self.selectItem[node.id] = node
            }
            self.selectItem = Object.assign({}, self.selectItem)
            self.$forceUpdate()
          },
          itemAllRemove(node) {
            const self = this
            delete self.selectItem[node.id]
            self.selectItem = Object.assign({}, self.selectItem)
            this.$forceUpdate()
          },
          searchSelect(item) {
            const self = this
            if (!self.options.multiple) {
              self.selectItem = item
            } else {
              if (!self.selectItem[item.id]) {
                self.selectItem[item.id] = item
              } else {
                delete self.selectItem[item.id]
              }
            }
            this.$forceUpdate()
          },
          remove(key) {
            delete this.selectItem[key]
            // console.log(this.selectItem)

            // 【功能虽然实现，但这边存在疑问】
            // 父组件中的selectItem 传入子组件中的selectitem不是一个引用，子组件中无法监听到selectitem的变化。
            let select = {}
            for (key in this.selectItem) {
              select[key] = this.selectItem[key]
            }
            this.selectItem = select
            // console.log(this.selectItem)
            this.$forceUpdate()
          },
          clearAll() {
            this.selectItem = {}
            this.$forceUpdate()
          },
          handleAction(items) {
            const self = this
            if (!self.options.multiple) {
              this.$emit('action', items)
            } else {
              // let itemArray = []
              // for (let i in items) {
              //   itemArray.push(items[i])
              //   console.log(items[i])
              // }
              console.log(items)
              this.$emit('action', items)
            }
          },
            open() {
                this.$refs.gcbEmployee.show()
            },
            close() {
                this.$refs.gcbEmployee.hide()
            },
            search() {
                const self = this
                if (!self.searchText) {
                    self.searchMode = false
                    var projectOrgQueryFun = this.options.isAuthData ? Component.api.project.infoOrganizationQuery : Component.api.project.organizationQuery;
                    projectOrgQueryFun({
                        isSubCompanyProject: this.options.isSubCompanyProject,
                        isIncludeCreatorProject: this.options.isIncludeCreatorProject
                    }).then((projects) => {
                        this.searchprojectData = projects
                    });
                    return false
                } else {
                    self.searchMode = true
                    var projectQueryFun = this.options.isAuthData ? Component.api.project.infoQuery : Component.api.project.query;
                    projectQueryFun({
                        projectName: this.searchText,
                        isSubCompanyProject: this.options.isSubCompanyProject,
                        isIncludeCreatorProject: this.options.isIncludeCreatorProject
                    }).then((projects) => {
                        this.searchprojectData = projects
                    });
                }
            }
        },
        mounted() {
          // console.log(this.selectItem)
          // console.log(typeof(this.selectItem))
          // var select = {}
          // this.selectItem = JSON.parse(JSON.stringify(this.selectItem))
          // console.log(this.selectItem)

          var projectOrgQueryFun = this.options.isAuthData ? Component.api.project.infoOrganizationQuery : Component.api.project.organizationQuery;
            projectOrgQueryFun({
                isSubCompanyProject: this.options.isSubCompanyProject,
                isIncludeCreatorProject: this.options.isIncludeCreatorProject
            }).then((projects) => {
                this.projectData = projects
            });
        }
    }
</script>
<style lang="less" scoped>
    .employ-tree {
        overflow: auto;
        max-height: 400px;
        .tree-project li,
        .tree-header {
            padding: 5px;
            width: 100%;
            i {
                color: #248bfe;
            }
            &.active {
                color: #248bfe;
                background: #F2F2F2;
            }
            &:hover {
                background: #F2F2F2;
            }
        }
        .tree-project li {
            padding-left: 15px;
        }
    }
    .project-multiple-tree {
      overflow: auto;
      height: 400px;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 3px 15px;
      }
    }
</style>
