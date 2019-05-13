<template>
  <b-modal class="" size="lg" ref="gcbDeparment">
     <div slot="modal-header">选择部门</div>
     <Row :gutter="16">
       <Col :span="options.multiple ? 12 : 24">
          <Card dis-hover>
              <Row slot="title">
                <Input v-model="searchText" icon="ios-search" placeholder="请输入部门名称" @on-click="search"></Input>
              </Row>
              <Row class="employ-tree">
                <div v-if="!searchMode">
                  <gcbDeparmentTree :data="deparmentData" :options="options" :selectitem="selectItem" @itemSelect="itemSelect"></gcbDeparmentTree>
                </div>
                <div v-if="searchMode">
                  <ul class="tree-employee">
                    <li v-for="(eitem,index) in deparmentData" :key="index" @click="searchSelect(eitem)" :class="{'active':eitem.id === selectItem.id}">{{ eitem.departmentName }}</li>
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
           <Row class="project-multiple-tree">
             <Col v-for="(val, key, index) in selectItem" :key="index">
               <span>{{ val.departmentName }}</span>
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
    import gcbDeparmentTree from './gcbDeparmentTree'
    export default {
        components:{
          gcbDeparmentTree
        },
        data() {
            return {
                searchMode: false,
                searchText: '',
                deparmentData: {},
                deparmentStorage: {},
                selectItem: {},
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
            searchSelect(item) {
                this.selectItem = item
            },
            handleAction(button) {
                this.$emit('action', button)
            },
            open() {
                this.$refs.gcbDeparment.show()
            },
            close() {
                this.$refs.gcbDeparment.hide()
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
            console.log('222:', this.selectItem)
            this.$forceUpdate()
          },
          clearAll() {
            this.selectItem = {}
            this.$forceUpdate()
          },
            search() {
                const self = this
                if (!self.searchText) {
                    self.searchMode = false
                    Component.api.department.tree({}).then((department) => {
                        this.deparmentData = department
                    });
                    return false
                } else {
                    self.searchMode = true
                    Component.api.department.query({
                        departmentName: this.searchText
                    }).then(department => {
                        this.deparmentData = department
                    });
                }
            }
        },
        mounted() {
            Component.api.department.tree({}).then((department) => {
                this.deparmentData = department
            });
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
