<template>
   <ul class="gcb-project-tree">
      <li class="tree-item">
          <div class="tree-header" @click="itemExpand">
              <!-- 单选 -->
              <Row> 
                <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
                <i v-if="data.$$expand" class="fa fa-minus-square"></i>
                <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
                <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
              </Row>
          </div>
          <project-item v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" @itemSelect="itemSelect" v-show="data.$$expand"></project-item>
          <ul class="tree-project" v-show="data.$$expand">
            <!-- 单选 -->
            <li v-for="(pitem,i) in data.projects" :key="i" @click="itemSelect(pitem)" :class="{'active':pitem.id === selectitem.id}">
                <span>{{pitem.projectName}}</span>
            </li>
          </ul>
      </li>
   </ul>
</template>
<script>
    import Component from '../module'
    export default {
        name: 'project-item',
        props: {
            // item部门对象
            data: {
                type: Object,
                default () {
                    return {
                        $$expand: false,
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
                // 选中状态
                this.$emit('itemSelect', node)
            }
        }
    }
</script>
<style lang="less" scoped>
    .gcb-project-tree {
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
        .tree-project li,
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
        .tree-project li {
            padding-left: 15px;
        }
    }
</style>