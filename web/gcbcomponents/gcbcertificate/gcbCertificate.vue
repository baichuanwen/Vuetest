<template>
  <b-modal class="" size="lg" ref="gcbCertificate">
     <div slot="modal-header">选择证书类型</div>
     <Row :gutter="16">
       <Col :span="12">
          <Card dis-hover>
              <Row slot="title">
                <Input v-model="searchText" icon="ios-search" placeholder="请输入证书类型"  @on-click="search"></Input>  
              </Row>
              <ul class="certificate-check-tree">
                <li v-for="(citem,i) in certificateData" :key="i" @click="itemSelect(citem)">
                  <i v-if="selectItem[citem.id]" class="fa fa-check-square"></i>
                  <i v-if="!selectItem[citem.id]" class="fa fa-square"></i>
                  <span>{{citem.typeName}}</span>
                </li>
              </ul>
          </Card>
       </Col>
       <Col span="12">
          <Card dis-hover>
              <Row slot="title" type="flex" justify="space-between">
                <Col span="6"> <p>已选择 <span>{{ selectItem.length }}</span></p> </Col>
                <Col span="4"> <Button type="error" size="small" @click="clearAll">清除</Button> </Col>
              </Row>
              <Row class="certificate-tree">
                <Col v-for="(val, key, index) in selectItem" :key="index">
                  <span>{{ val.typeName }}</span> 
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
    export default {
        data() {
            return {
                searchText: '',
                certificateData: {},
                certificateStorage: {},
                selectItem: {}
            }
        },
        methods: {
            itemSelect(node) {
                const self = this
                if (!self.selectItem[node.id]) {
                    self.selectItem[node.id] = node
                } else {
                    delete self.selectItem[node.id]
                }
                // 手动刷新
                self.$forceUpdate();
            },
            remove(key) {
                delete this.selectItem[key]
                this.$forceUpdate();
            },
            clearAll() {
                this.selectItem = {}
                this.$forceUpdate();
            },
            handleAction(items) {
                let itemArray = []
                for (let i in items) {
                    itemArray.push(items[i])
                }
                this.$emit('action', itemArray)
            },
            open() {
                this.$refs.gcbCertificate.show()
            },
            close() {
                this.$refs.gcbCertificate.hide()
            },
            search() {
                Component.api.certificate.getTypeList({
                    keywords: this.searchText
                }).then((certificate) => {
                    this.certificateData = certificate
                    this.certificateStorage && this.certificateData.forEach((item, index) => {
                        this.certificateStorage[item.id] = item
                    })
                });
            }
        },
        mounted() {
            Component.api.certificate.getTypeList({
                keywords: this.searchText
            }).then((certificate) => {
                this.certificateData = certificate
            });
        }
    }
</script>
<style lang="less" scoped>
    .certificate-check-tree {
        overflow: auto;
        height: 400px;
        li {
            padding: 2px 0 2px 15px;
            cursor: pointer;
            i {
                color: #248bfe;
            }
            .fa-square {
                color: #ccc;
            }
            &.active {
                color: #248bfe;
                background: #F2F2F2;
            }
            &:hover {
                background: #F2F2F2;
            }
        }
    }
    
    .certificate-tree {
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