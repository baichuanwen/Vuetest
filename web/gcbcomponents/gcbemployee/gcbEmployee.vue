<template>
  <b-modal class="" size="lg" ref="gcbEmployee">
     <div slot="modal-header">选择人员</div>
     <Row :gutter="16">
       <Col :span="options.multiple ? 12 : 24">
          <Card dis-hover>
              <Row slot="title">
                <Input v-model="searchText" icon="ios-search" @keyup.native.enter="search" placeholder="请输入人员姓名"  @on-click="search" ></Input>
              </Row>
              <Row class="employ-tree">
                <div v-if="!searchMode">
                  <gcbEmployeeTree :data="employeeData" :options="options" :selectitem="selectItem" @itemSelect="itemSelect" @itemAllSelect="itemAllSelect" @itemAllRemove="itemAllRemove"></gcbEmployeeTree>
                </div>
                <div v-if="searchMode">
                  <ul class="tree-employee" v-show="!options.multiple">
                    <li v-for="(eitem,index) in searchemployeeData" :key="index" @click="searchSelect(eitem)" :class="{'active':eitem.id === selectItem.id}">{{ eitem.employeeName }}</li>
                  </ul>
                  <ul class="tree-employee" v-show="options.multiple">
                    <li v-for="(eitem,index) in searchemployeeData" :key="index" @click="searchSelect(eitem)" :class="{'active':selectItem[eitem.id]}">
                      <Icon v-if="!selectItem[eitem.id]" type="android-checkbox-outline-blank" size="18" color="#999"></Icon>
                      <Icon v-if="selectItem[eitem.id]" type="android-checkbox" size="18" color="#248bfe"></Icon>
                      <span>{{eitem.employeeName}}</span>
                    </li>
                  </ul>
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
              <Row class="employee-multiple-tree">
                <Col v-for="(val, key, index) in selectItem" :key="index">
                  <span>{{ val.employeeName }}</span>
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
    import gcbEmployeeTree from './gcbEmployeeTree'
    export default {
        components: {
            gcbEmployeeTree
        },
        data() {
            return {
                searchMode: false,
                searchText: '',
                employeeData: {},
                searchemployeeData: [],
                selectItem: {}
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
                    } else {
                        delete self.selectItem[node.id]
                    }
                }
                self.$forceUpdate()
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
                self.$forceUpdate()
            },
            remove(key) {
                delete this.selectItem[key]

                // 【功能虽然实现，但这边存在疑问】
                // 父组件中的selectItem 传入子组件中的selectitem不是一个引用，子组件中无法监听到selectitem的变化。
                let select = {}
                for (key in this.selectItem) {
                    select[key] = this.selectItem[key]
                }
                this.selectItem = select
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
                    let itemArray = []
                    for (let i in items) {
                        itemArray.push(items[i])
                    }
                    this.$emit('action', itemArray)
                }
            },
            open() {
                this.$refs.gcbEmployee.show()
            },
            close() {
                this.$refs.gcbEmployee.hide()
            },
            search() {
                // 搜索功能还未实现
                const self = this
                var employeeQueryFun = this.options.isAuthData ? Component.api.employee.infoQuery : Component.api.employee.query
                if (!self.searchText) {
                    self.searchMode = false
                    Component.api.department.tree({}).then((department) => {
                        self.employeeData = department
                    });
                    return false
                } else {
                    self.searchMode = true
                    employeeQueryFun({
                        employeeName: self.searchText,
                        isIncludeSelf: self.options.isIncludeSelf,
                        isIncludeDescendants: self.options.isIncludeDescendants,
                        isEnabled: true
                    }).then((employees) => {
                        self.searchemployeeData = employees
                    });
                }
            }
        },
        mounted() {
            let employeeOrganizationQueryFun = this.options.isAuthData ? Component.api.employee.infoOrganizationQuery : Component.api.employee.organizationQuery
            if (this.options.multiple) {
                employeeOrganizationQueryFun({
                    isIncludeSelf: this.options.isIncludeSelf,
                    isIncludeDescendants: this.options.isIncludeDescendants
                }).then((data) => {
                    this.employeeData = data
                })
            } else {
                Component.api.department.tree({}).then((department) => {
                    this.employeeData = department
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .employ-tree {
        overflow: auto;
        max-height: 400px;
        .tree-employee li,
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
                cursor: pointer;
            }
        }
        .tree-employee li {
            padding-left: 15px;
        }
    }

    .employee-multiple-tree {
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
