<template>
  <ul class="gcb-deparment-tree">
    <li class="tree-item">
      <Row>
        <CheckboxGroup>
          <Icon type="android-list" size="18" color="#248bfe"></Icon>
          <Checkbox :label="data.departmentName"></Checkbox>
        </CheckboxGroup>
      </Row>
      <DepartmentItem v-for="(item,i) in data.children" :key="i" :data="item" @itemSelect="itemNodeSelect"></DepartmentItem>
    </li>
  </ul>
</template>
<script>
  import DepartmentItem from './departmentItem'

  export default {
    name: 'gcb-department-tree',
    components: {
      DepartmentItem
    },
    props: {
      // 公司对象
      data: {
        type: Object,
        default() {
          return {
            children: []
          }
        }
      }
    },
    methods: {
      // 返回当前点击部门对象数据
      itemSelect(e) {
        this.$emit('itemSelect', this.data)
      },
      // 返回当前点击部门对象数据
      itemNodeSelect(node) {
        this.$emit('itemSelect', node)
      }
    }
  }
</script>
<style lang="less" scoped>
  .gcb-deparment-tree {
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
