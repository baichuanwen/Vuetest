<template>
  <b-modal size="lg" ref="gcbCertificateType">
     <Row slot="modal-header">
        <span>选择类型</span>
        <Button type="error" size="large" @click="clearAll()" style="float: right">清空</Button>
     </Row>
     <Row :gutter="16">
       <Col :span="12">
          <Card dis-hover style="background-color:#f4f4f4">
              <Row slot="title">
                 <div style="font-size:16px">类型</div>
              </Row>
              <ul class="certificate-check-tree">
                <li v-for="(citem,i) in certificateData" :key="i" @click="itemSelect(citem)">
                  <span>{{citem.processTypeName}}</span>
                  <Icon v-if="citem.$$select" size="18" color="#248bfe" style="float:right;margin-right:20px" type="checkmark-round"></Icon>
                </li>
              </ul>
          </Card>
       </Col>
       <Col span="12">
          <Card dis-hover style="background-color:#f4f4f4">
              <Row slot="title" type="flex" justify="space-between">
              <div style="font-size:16px">流程</div>
              </Row>
               <ul class="certificate-check-tree">
                  <li v-for="(sitem,i) in selectTypes" :key="i" @click="select(sitem, i)">
                    <span>{{sitem.formName}}</span>
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
                options: {},
                searchText: "",
                certificateData: {},
                selectItem: {},
                selectTypes: [],
                selectItems: []
            };
        },
        methods: {
            itemSelect(node) {
                if (this.selectItem) {
                    if (this.selectItem.id == node.id) {} else {
                        this.selectItem.$$select = false;
                        node.$$select = true;
                        this.selectItem = node;
                        this.selectItem.processForms.forEach(element => {
                            element.$$select = true;
                        });
                        this.selectTypes = this.selectItem.processForms;
                    }
                } else {
                    node.$$select = true;
                    this.selectItem = node;
                    this.selectItem.processForms.forEach(element => {
                        element.$$select = true;
                    });
                    this.selectTypes = this.selectItem.processForms;
                }
            },
            select(item, i) {
                item.$$select = !item.$$select;
                this.selectTypes.splice(i, 1, item);
            },
            clearAll() {
                this.selectItem.$$select = false;
                this.selectItem = {};
                this.selectTypes = [];
                this.selectItems = [];
            },
            handleAction() {
                this.selectTypes.forEach(element => {
                    if (element.$$select) {
                        this.selectItems.push(element);
                    }
                })
                this.$emit('action', this.selectItems)
            },
            open() {
                this.$refs.gcbCertificateType.show();
            },
            close() {
                this.$refs.gcbCertificateType.hide();
            }
        },
        mounted() {
            Component.api.certificateType.processFormTypeList({}).then(certificate => {
                this.certificateData = certificate;
            });
        }
    };
</script>
<style lang="less" scoped>
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
