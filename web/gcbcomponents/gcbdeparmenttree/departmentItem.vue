<template>
   <ul class="gcb-deparment-tree">
      <li class="tree-item">
          <div class="tree-header" @click="itemSelect(data)"  :class="{'active': data.id === selectitem.id}">
              <span v-if="data.children.length" @click="itemExpand">
                  <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
                  <i v-if="data.$$expand" class="fa fa-minus-square"></i>
              </span>
              <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
              <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
          </div>
          <department-item v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" @itemSelect="itemSelect" v-show="data.$$expand"></department-item>
      </li>
   </ul>
</template>
<script>
    export default {
        name: 'department-item',
        props: {
            data: {
                type: Object,
                default () {
                    return {
                        $$expand: false,
                        id: '',
                        children: []
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
            // 返回当前点击部门对象数据
            itemSelect(node) {
                this.$emit('itemSelect', node)
            }
        }
    }
</script>
<style lang="less" scoped>
    .gcb-deparment-tree {
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
    }
</style>