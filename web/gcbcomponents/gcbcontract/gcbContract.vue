<template>
  <b-modal class="" size="lg" ref="gcbContract">
     <div slot="modal-header">选择合同</div>
     <Row>
       <Col span="24">
          <Card dis-hover>
              <Row slot="title">
                <Input v-model="searchText" icon="ios-search" placeholder="请输入合同名称" @on-click="search"></Input>
              </Row>
              <Row class="employ-tree">
                <div v-if="!searchMode">
                  <gcbContractTree :data="contractData" :selectitem="selectItem" @itemSelect="itemSelect"></gcbContractTree>
                </div>
                <div v-if="searchMode">
                  <ul class="tree-contract">
                    <li v-for="(ritem,i) in contractData" :key="i" @click="searchSelect(ritem)">
                      <Row type="flex" align="middle">
                        <Col span="22">
                          <p>{{ ritem.contractName }}</p>
                          <p>甲方：{{ ritem.partyA }}</p>
                          <p>乙方：{{ ritem.partyB }}</p>
                        </Col>
                        <Col span="2">
                          <Icon  size="18" color="#248bfe"  type="checkmark-round" v-show="ritem.id === selectItem.id"></Icon>
                        </Col>
                      </Row>
                    </li>
                  </ul>
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
                searchMode: false,
                searchText: '',
                contractData: {},
                selectItem: {}
            }
        },
        methods: {
            itemSelect(node) {
                this.selectItem = node
            },
            searchSelect(item) {
                this.selectItem = item
            },
            handleAction(button) {
                this.$emit('action', button)
            },
            open() {
                this.$refs.gcbContract.show()
            },
            close() {
                this.$refs.gcbContract.hide()
            },
            search() {
                const self = this
                if (!self.searchText) {
                    self.searchMode = false
                    Component.api.contract.queryContractStructure({
                        contractName: this.searchText || null,
                        projectId: this.options.projectId,
                        tag: this.options.tag
                    }).then(contract => {
                        this.contractData = contract
                    });
                    return false
                } else {
                    self.searchMode = true
                    Component.api.contract.queryContractStructure({
                        contractName: this.searchText || null,
                        projectId: this.options.projectId,
                        tag: this.options.tag
                    }).then(contract => {
                        let contractData = []

                        function init(contract) {
                            if (contract.records) contractData = contractData.concat(contract.records)
                            if (contract.child && contract.child.length > 0) {
                                contract.child.forEach(function(record) {
                                    init(record)
                                })
                            }
                        }
                        init(contract)

                        this.contractData = contractData
                    });
                }
            }
        },
        mounted() {
            Component.api.contract.queryContractStructure({
                contractName: this.searchText || null,
                projectId: this.options.projectId,
                tag: this.options.tag
            }).then(contract => {
                this.contractData = contract
            });
        }
    }
</script>
<style lang="less" scoped>
    .employ-tree {
        overflow: auto;
        max-height: 400px;
        .tree-contract {
            li {
                padding: 5px 0 5px 15px!important;
                color: #939BA4;
                p:first-child {
                    color: #000;
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
    }
</style>