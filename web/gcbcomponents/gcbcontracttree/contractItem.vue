<template>
   <ul class="gcb-tree-contract">
      <li class="tree-item">
          <div class="tree-header" v-if="data.records" @click="itemExpand">
              <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
              <i v-if="data.$$expand" class="fa fa-minus-square"></i>
              <span >{{data.name}}</span>
          </div>
          <ul class="tree-contract" v-show="data.$$expand">
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
          <contract-item v-for="(item,i) in data.records" :key="i" :data="item" :selectitem="selectitem" v-show="data.$$expand"></contract-item>
      </li>
   </ul>
</template>
<script>
    export default {
        name: 'contract-item',
        props: {
            data: {
                type: Object,
                default () {
                    return {
                        $$expand: false,
                        records: []
                    }
                }
            },
            selectitem: {
                type: Object
            }
        },
        methods: {
            itemExpand(e) {
                e.stopPropagation()
                this.$set(this.data, '$$expand', !this.data.$$expand);
            },
            // 返回当前点击对象数据
            itemSelect(e, ritem) {
                e.stopPropagation()
                this.$emit('itemSelect', ritem)
            }
        }
    }
</script>
<style lang="less" scoped>
    .gcb-tree-contract {
        margin: 0;
        list-style: none;
        padding-left: 15px;
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
                padding-left: 15px!important;
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