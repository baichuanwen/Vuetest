<template>
  <b-modal size="lg" ref="gcbKnowledgeType">
     <Row slot="modal-header">
        <span>选择分类</span>
        <Button type="error" size="large" @click="clearAll()" style="float: right">清空</Button>
     </Row>
     <Row :gutter="16">
       <Col :span="12">
          <Card dis-hover style="background-color:#f4f4f4">
              <Row slot="title">
                 <div style="font-size:16px">选择主分类</div>
              </Row>
              <ul class="certificate-check-tree">
                <li v-for="(citem,i) in knowledgeTypes" :key="i" @click="itemSelect(citem)">
                  <span>{{citem.categroyName}}</span>
                  <Icon v-if="citem.$$select" size="18" color="#248bfe" style="float:right;margin-right:20px" type="checkmark-round"></Icon>
                </li>
              </ul>
          </Card>
       </Col>
       <Col span="12">
          <Card dis-hover style="background-color:#f4f4f4">
              <Row slot="title" type="flex" justify="space-between">
              <div style="font-size:16px">选择子分类</div>
              </Row>
               <ul class="certificate-check-tree">
                  <li v-for="(sitem,i) in selectChilds" :key="i" @click="select(sitem, i)">
                    <span>{{sitem.categroyName}}</span>
                    <Icon v-if="sitem.$$select" size="18" color="#248bfe" style="float:right;margin-right:20px" type="checkmark-round"></Icon>
                  </li>
              </ul>
          </Card>
       </Col>
     </Row>
     <div slot="modal-footer">
          <Button type="primary" size="large" @click="handleAction()">确定</Button>
          <Button type="default" size="large" @click="close">取消</Button>
     </div>
  </b-modal>
</template>
<script>
    import Component from "../module";
    export default {
        data() {
            return {
                options: {
                  datas:[]
                },
                searchText: "",
                knowledgeTypes: {},
                knowledgeCategoryId:"",

              // 选中的父类
                selectItem: {},
                selectChilds: [],

              // 最终选中输出的类数组（可能是父类也可能是子类）
                selectItems: []
            };
        },
        methods: {
            itemSelect(node) {
                if (this.selectItem) {
                    if (this.selectItem.id == node.id) {
                          return ;
                    } else {
                        this.selectItem.$$select = false;
                        node.$$select = true;
                        this.selectItem = node;
                        this.selectItem.childs.forEach(element => {
                          element.$$select = false;
                        });
                        this.selectChilds = this.selectItem.childs;

                    }
                } else {
                      node.$$select = true;
                      this.selectItem = node;
                      this.selectItem.childs.forEach(element => {
                        element.$$select = false;
                      });
                }
            },
            select(item, i) {
              let self=this;
              this.selectChilds.splice(i, 1, item);
              this.selectItem.childs.map((element,index) => {
                if(index==i){
                 // element.$$select=!item.$$select
                  self.$set(element,"$$select",!item.$$select);
                }else{
                  element.$$select = false;
                }
              });
            },
             initChooseType(){
                this.knowledgeTypes=this.options.datas;
                this.knowledgeCategoryId=this.options.knowledgeCategoryId;
                if(this.knowledgeCategoryId){
                  this.knowledgeTypes.forEach((item,index)=> {
                    if(item.id==this.knowledgeCategoryId){
                      this.itemSelect(item);
                      return;
                    }else{
                      item.childs.forEach((iitem,index)=>{
                        if(iitem.id==this.knowledgeCategoryId){
                          this.itemSelect(item);
                          this.select(iitem,index)
                        }
                      })
                    }

                  });
                }
              },
            clearAll() {
                this.selectItem.$$select = false;
                this.selectItem = {};
                this.selectChilds = [];
                this.selectItems = [];
            },
            handleAction() {
                this.selectChilds.forEach(element => {
                    if (element.$$select) {
                        this.$set(element,"isChild",true)
                        this.selectItems.push(element);
                    }
                });
                if(!this.selectItems.length&&this.selectItem){
                  this.selectItems.push(this.selectItem);
                }
                this.$emit('action', this.selectItems)
            },
            open() {
                this.$refs.gcbKnowledgeType.show();
            },
            close() {
                this.$refs.gcbKnowledgeType.hide();
            }
        },
        mounted() {
          this.initChooseType();

        }
    };
</script>
<style lang="less" scoped>
  .ivu-row{    width: 100%;}
    .certificate-check-tree {
        overflow: auto;
        height: 400px;
        background-color: #fafafa;
        li {
            padding: 6px 0 6px 15px;
            cursor: pointer;
            &:hover {
                background: #f2f2f2;
            }
            span {
                display: inline-block;
                max-width: 290px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
