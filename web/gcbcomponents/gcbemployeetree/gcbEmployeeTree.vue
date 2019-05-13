<template>
    <ul class="gcb-employee-tree">
        <li class="tree-item">
            <div class="tree-header">
                <Icon type="android-list" size="18" color="#248bfe"></Icon>
                <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
                <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
            </div>
            <EmployeeItem v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" :options="options" @itemSelect="itemNodeSelect"></EmployeeItem>
            <ul class="tree-employee">
              <!-- 单选 -->
              <li v-for="(eitem,i) in data.employees" :key="i" @click="itemSelect($event,eitem)" :class="{'active':eitem.id === selectitem.id}">
                  <span>{{eitem.employeeName}}</span>
              </li>
            </ul>
        </li>
    </ul>
</template>
<script>
    import Component from '../module'
    import EmployeeItem from './employeeItem'
    export default {
        name: 'gcb-employee-tree',
        components: {
            EmployeeItem
        },
        props: {
            // 公司对象
            data: {
                type: Object,
                default () {
                    return {
                        $$selected: false,
                        children: []
                    }
                }
            },
            // 配置参数
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
            // 返回当前点击部门对象数据
            itemSelect(e, node) {
                // 选中状态
                this.$emit('itemSelect', node)
            },
            // 返回当前点击部门对象数据
            itemNodeSelect(node) {
                // 选中状态
                this.$emit('itemSelect', node)
            }
        },
        mounted() {
            var employeeQueryFun = this.options.isAuthData ? Component.api.employee.infoQuery : Component.api.employee.query
            employeeQueryFun({
                departmentId: this.data.id,
                isIncludeSelf: this.options.isIncludeSelf,
                isIncludeDescendants: this.options.isIncludeDescendants,
                isEnabled: true
            }).then((employees) => {
                this.data.employees = employees
            });
        }
    }
</script>
<style lang="less" scoped>
    .gcb-employee-tree {
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
