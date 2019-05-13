<template>
  <ul class="gcb-project-tree">
    <li class="tree-item">
      <div class="tree-header" @click="itemExpand">
        <Row>
          <CheckboxGroup>
            <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
            <i v-if="data.$$expand" class="fa fa-minus-square"></i>
            <Checkbox :label="data.departmentName"></Checkbox>
          </CheckboxGroup>
        </Row>
      </div>
      <project-item v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" v-show="data.$$expand"></project-item>
      <ul class="tree-project" v-show="data.$$expand">
        <CheckboxGroup>
          <li v-for="(pitem,i) in data.projects" :key="i" @click="toggleSelect($event,pitem)">
            <Checkbox :label="pitem.projectName"></Checkbox>
          </li>
        </CheckboxGroup>
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
        default() {
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
    data() {
      return{

      }
    },
    methods: {
      itemExpand(e) {
        e.stopPropagation()
        this.$set(this.data, '$$expand', !this.data.$$expand);
      },
      // 返回当前点击部门对象数据
      toggleSelect(e, node) {
        // 选中状态
        this.$emit('toggleSelect', node)
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
