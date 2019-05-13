<template>
    <ul class="gcb-tree-contract">
        <li class="tree-item">
            <div class="tree-header">
                <Icon type="android-list" size="18" color="#248bfe"></Icon>
                <span>{{data.name}}</span>
            </div>
            <ul class="tree-contract">
              <li v-for="(ritem,i) in data.records" :key="i" @click="itemSelect($event,ritem)">
                <Row type="flex" align="middle">
                  <Col span="22">
                    <p>{{ ritem.contractName }}</p>
                    <p>甲方：{{ ritem.partyA }}</p>
                    <p>乙方：{{ ritem.partyB }}</p>
                  </Col>
                  <Col span="2">
                    <Icon  size="18" color="#248bfe"  type="checkmark-round" v-show="ritem.id === selectitem.id"></Icon>
                  </Col>
                </Row>
              </li>
            </ul>
            <ContractItem v-for="(item,i) in data.child" :key="i" :data="item" :selectitem="selectitem" @itemSelect="itemNodeSelect"></ContractItem>
        </li>
    </ul>
</template>
<script>
    import ContractItem from './contractItem'
    export default {
        name: 'gcb-tree-contract',
        components: {
            ContractItem
        },
        props: {
            data: {
                type: Object,
                default () {
                    return {
                        child: []
                    }
                }
            },
            selectitem: {
                type: Object
            }
        },
        methods: {
            // 返回当前点击部门对象数据
            itemSelect(e, ritem) {
                e.stopPropagation()
                this.$emit('itemSelect', ritem)
            },
            // 返回当前点击部门对象数据
            itemNodeSelect(node) {
                this.$emit('itemSelect', node)
            }
        }
    }
</script>
<style lang="less" scoped>
    .gcb-tree-contract {
        margin: 0;
        list-style: none;
        .tree-item {
            border: none;
            padding: 0;
            margin: 0;
            width: 100%;
            list-style: none;
            cursor: pointer;
        }
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
        .tree-header,
        {
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
    }
</style>