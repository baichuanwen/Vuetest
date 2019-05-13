<template>
    <ul class="gcb-employee-tree">
        <li class="tree-item">
            <div class="tree-header">
                <Icon type="android-list" size="16" color="#248bfe"></Icon>
                <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
                <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
            </div>
            <EmployeeItem v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" :options="options"
            @itemSelect="itemNodeSelect" @itemAllSelect="itemAllSelect" @itemAllRemove="itemAllRemove"></EmployeeItem>
            <!--单选-->
            <ul class="tree-employee" v-show="!options.multiple">
              <li v-for="(eitem,i) in data.employees" :key="i" @click="itemSelect(eitem)" :class="{'active':eitem.id === selectitem.id}">
                  <span>{{eitem.employeeName}}</span>
              </li>
            </ul>
            <!--多选-->
            <ul class="tree-employee" v-show="options.multiple">
              <li v-for="(eitem,i) in data.employees" :key="i" @click="itemSelect(eitem)" :class="{'active':selectitem[eitem.id]}">
                  <i v-if="selectitem[eitem.id]" class="fa fa-check-square"></i>
                  <i v-if="!selectitem[eitem.id]" class="fa fa-square" style="color: #ccc"></i>
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
                        multiple: false,
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
        watch: {
            selectitem: function(val) {
                if (Object.getOwnPropertyNames(val).length - 1 === 0) this.data.$$allselect = false
            }
        },
        methods: {
            itemSelect(node) {
                this.$emit('itemSelect', node)
                this.$forceUpdate()
            },
            itemAllSelect(node) {
                this.$emit('itemAllSelect', node)
                this.$forceUpdate()
            },
            itemAllRemove(node) {
                this.$emit('itemAllRemove', node)
                this.$forceUpdate()
            },
            itemNodeSelect(node) {
                this.$emit('itemSelect', node)
                this.$forceUpdate()
            }
        },
        mounted() {
            let employeeQueryFun = this.options.isAuthData ? Component.api.employee.infoQuery : Component.api.employee.query
            if (!this.options.multiple) {
                employeeQueryFun({
                    departmentId: this.data.id,
                    isIncludeSelf: this.options.isIncludeSelf,
                    isIncludeDescendants: this.options.isIncludeDescendants,
                    isEnabled: true
                }).then((employees) => {
                    this.data.employees = employees
                })
            }
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