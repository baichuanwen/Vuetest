<template>
   <ul class="gcb-employee-tree">
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
          <employee-item v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" @itemSelect="itemSelect" v-show="data.$$expand"></employee-item>
          <ul class="tree-employee" v-show="data.$$expand" >
            <!-- 单选 -->
            <li v-for="(eitem,i) in data.employees" :key="i" @click="itemSelect(eitem)" :class="{'active':eitem.id === selectitem.id}">
                <span>{{eitem.employeeName}}</span>
            </li>
          </ul>
      </li>
   </ul>
</template>
<script>
    import Component from '../module'
    export default {
        name: 'employee-item',
        props: {
            data: {
                type: Object,
                default () {
                    return {
                        $$expand: false,
                        children: []
                    }
                }
            },
            options: {
                type: Object,
                default () {
                    return {
                        isAuthData: false,
                        isIncludeSelf: true,
                        isIncludeDescendants: true
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
                var employeeQueryFun = this.options.isAuthData ? Component.api.employee.infoQuery : Component.api.employee.query
                employeeQueryFun({
                    departmentId: this.data.id,
                    isIncludeSelf: this.options.isIncludeSelf,
                    isIncludeDescendants: this.options.isIncludeDescendants,
                    isEnabled: true
                }).then((employees) => {
                    this.data.employees = employees
                });

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
    .gcb-employee-tree {
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
        .tree-employee li,
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
        .tree-employee li {
            padding-left: 15px;
        }
    }
</style>