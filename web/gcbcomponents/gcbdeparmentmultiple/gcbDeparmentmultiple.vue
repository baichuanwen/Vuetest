<template>
  <b-modal class="" size="lg" ref="gcbDeparmentMultiple">
     <div slot="modal-header">选择部门</div>
     <Row>
       <Col span="12">
          <Card dis-hover>
              <Row slot="title">
                <Input v-model="postData.text" icon="ios-search" placeholder="请输入部门名称" @click.native="search()" @keyup.native.enter="search()"></Input>
              </Row>
              <Row class="employ-tree">
                <gcbDeparmentMultipleTree :data="deparmentData" :options="options"  @itemSelect="itemSelect"></gcbDeparmentMultipleTree>
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
                       <i class="fa fa-window-close" aria-hidden="true" @click="remove(employee)"></i>
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
                postData: {
                    text: ''
                },
                deparmentData: {},
                selectItem: {}
            }
        },
        methods: {
            itemSelect(node) {
                this.selectItem = node
            },
            handleAction(button) {
                this.$emit('action', button)
            },
            open() {
                this.$refs.gcbDeparmentMultiple.show()
            },
            close() {
                this.$refs.gcbDeparmentMultiple.hide()
            },
            search() {
                // 搜索功能还未实现
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
    height: 400px;
  }
  .employ-tree-node {
    height: 405px;
  }
  .selectNode {
    margin-left: 15px;
  }
  .employee-member{
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    padding: 10px 15px;
  }
  .employee-member span{
    flex-grow: 1;
  }
</style>
