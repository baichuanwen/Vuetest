<template>
   <ul class="gcb-project-tree">
      <li class="tree-item">
          <div class="tree-header" @click="itemExpand">
              <!-- 单选 -->
              <Row>
                <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
                <i v-if="data.$$expand" class="fa fa-minus-square"></i>
                <i v-if="data.$$allselect && options.multiple" class="fa fa-check-square" @click.stop="itemNodeAllSelect"></i>
                <i v-if="!data.$$allselect && options.multiple" class="fa fa-square" @click.stop="itemNodeAllSelect" style="color: #ccc"></i>
                <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
                <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
              </Row>
          </div>
          <project-item v-for="(item,i) in data.children" :key="i" :data="item" :options="options" :selectitem="selectitem" @itemSelect="itemSelect"
                        @itemAllSelect="itemAllSelect" @itemAllRemove="itemAllRemove" v-show="data.$$expand"></project-item>
          <!-- 单选 -->
          <ul class="tree-project" v-show="data.$$expand && !options.multiple">
            <li v-for="(pitem,i) in data.projects" :key="i" @click="itemSelect(pitem)" :class="{'active':pitem.id === selectitem.id}">
                <span>{{pitem.projectName}}</span>
            </li>
          </ul>
          <!--多选-->
          <ul class="tree-project" v-show="data.$$expand && options.multiple">
            <li v-for="(eitem,i) in data.projects" :key="i" @click="itemSelect(eitem)" :class="{'active':selectitem[eitem.id]}">
              <i v-if="selectitem[eitem.id]" class="fa fa-check-square"></i>
              <i v-if="!selectitem[eitem.id]" class="fa fa-square" style="color: #ccc"></i>
              <span>{{eitem.projectName}}</span>
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
        methods: {
            itemExpand(e) {
                e.stopPropagation()
                var projectQueryFun = this.options.isAuthData ? Component.api.project.infoQuery : Component.api.project.query;
                projectQueryFun({
                    departmentId: this.data.id,
                    isSubCompanyProject: this.options.isSubCompanyProject,
                    isIncludeCreatorProject: this.options.isIncludeCreatorProject,
                    isEnabled: true
                  }).then((projects) => {
                    this.data.projects = projects
                  });

                this.$set(this.data, '$$expand', !this.data.$$expand)
            },
            // 全选
            itemNodeAllSelect() {
              const self = this
              let init = function(depitem) {
                depitem.$$allselect = !depitem.$$allselect
                if (depitem.projects) {
                  depitem.projects.forEach((eitem, index) => {
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
                    init(depitem.children[i]);
                  }
                }
              }
              if (!self.data.$$expand) {
                var projectQueryFun = this.options.isAuthData ? Component.api.project.infoQuery : Component.api.project.query;
                projectQueryFun({
                  departmentId: self.data.id,
                  isIncludeSelf: self.options.isIncludeSelf,
                  isIncludeDescendants: self.options.isIncludeDescendants,
                  isEnabled: true
                }).then((projects) => {
                  this.data.projects = projects
                  init(self.data)
                });
              } else {
                init(self.data)
              }
            },
            itemAllSelect(node) {
              this.$emit('itemAllSelect', node)
              this.$forceUpdate()
            },
            itemAllRemove(node) {
              this.$emit('itemAllRemove', node)
              this.$forceUpdate()
            },
            // 返回当前点击部门对象数据
            itemSelect(node) {
                // 选中状态
                if (!this.selectitem[node.department.id]) {
                  this.data.$$allselect = false
                }
                this.$emit('itemSelect', node)
                this.$forceUpdate()
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
    .gcb-project-tree .tree-employee li .fa-square[data-v-471c1742], .gcb-project-tree .tree-header .fa-square[data-v-471c1742] {
      color: #ccc;
    }
</style>
