<template>
   <ul class="gcb-employee-tree">
      <li class="tree-item" v-show="data.employees.length > 0">
          <div class="tree-header" @click.stop="itemExpand">
              <Row> 
                <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
                <i v-if="data.$$expand" class="fa fa-minus-square"></i>
                <i v-if="data.$$allselect && options.multiple" class="fa fa-check-square" @click.stop="itemNodeAllSelect"></i>
                <i v-if="!data.$$allselect && options.multiple" class="fa fa-square" @click.stop="itemNodeAllSelect"></i>
                <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
                <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
              </Row>
          </div>
          <employee-item v-show="data.$$expand" v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" :options="options" 
          @itemSelect="itemSelect" @itemAllSelect="itemAllSelect" @itemAllRemove="itemAllRemove"></employee-item>
          <!--单选-->
          <ul class="tree-employee" v-show="data.$$expand && !options.multiple">
            <li v-for="(eitem,i) in data.employees" :key="i" @click="itemSelect(eitem)" :class="{'active':eitem.id === selectitem.id}">
                <span>{{eitem.employeeName}}</span>
            </li>
          </ul>
          <!--多选-->
          <ul class="tree-employee" v-show="data.$$expand && options.multiple">
            <li v-for="(eitem,i) in data.employees" :key="i" @click="itemSelect(eitem)" :class="{'active':selectitem[eitem.id]}">
                <i v-if="selectitem[eitem.id]" class="fa fa-check-square"></i>
                <i v-if="!selectitem[eitem.id]" class="fa fa-square"></i>
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
                        $$allselect: false,
                        children: []
                    }
                }
            },
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
            itemExpand() {
                var employeeQueryFun = this.options.isAuthData ? Component.api.employee.infoQuery : Component.api.employee.query
                if (!this.options.multiple) {
                    employeeQueryFun({
                        departmentId: this.data.id,
                        isIncludeSelf: this.options.isIncludeSelf,
                        isIncludeDescendants: this.options.isIncludeDescendants,
                        isEnabled: true
                    }).then((employees) => {
                        this.data.employees = employees
                    });
                }
                this.$set(this.data, '$$expand', !this.data.$$expand);
            },
            // 全选
            itemNodeAllSelect() {
                const self = this
                let init = function(depitem) {
                    depitem.$$allselect = !depitem.$$allselect
                    if (depitem.employees) {
                        depitem.employees.forEach((eitem, index) => {
                            if (self.data.$$allselect) {
                                // 全选
                                self.itemAllSelect(eitem)
                            } else {
                                // 全删
                                self.itemAllRemove(eitem)
                            }
                        })
                    }
                    if (depitem.children) {
                        for (var i = 0; i < depitem.children.length; i++) {
                            depitem.children[i].$$allselect = !depitem.$$allselect
                            init(depitem.children[i])
                        }
                    }
                }
                init(self.data)
            },
            itemAllSelect(node) {
                this.$emit('itemAllSelect', node)
                this.$forceUpdate()
            },
            itemAllRemove(node) {
                this.$emit('itemAllRemove', node)
                this.$forceUpdate()
            },
            itemSelect(node) {
                if (this.options.multiple) {
                    if (this.selectitem[node.id]) {
                        this.data.$$allselect = false
                    }
                }
                this.$emit('itemSelect', node)
                this.$forceUpdate()
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
            .fa-square {
                color: #ccc;
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