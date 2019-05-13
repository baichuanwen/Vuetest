<template>
    <ul class="gcb-project-tree">
        <li class="tree-item">
            <div class="tree-header">
                <Icon type="android-list" size="18" color="#248bfe"></Icon>
                <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
                <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
            </div>
            <ProjectItem v-for="(item,i) in data.children" :key="i" :data="item" :options="options" :selectitem="selectitem"
                         @itemSelect="itemNodeSelect" @itemAllSelect="itemAllSelect" @itemAllRemove="itemAllRemove"></ProjectItem>
            <!-- 单选 -->
            <ul class="tree-project" v-show="!options.multiple">
              <li v-for="(pitem,i) in data.projects" :key="i" v-if="data.projects" @click="itemSelect(pitem)" :class="{'active':pitem.id === selectitem.id}">
                  <span>{{pitem.projectName}}</span>
              </li>
            </ul>
            <!--多选-->
            <ul class="tree-project" v-show="options.multiple">
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
    import ProjectItem from './projectItem'
    export default {
        name: 'gcb-project-tree',
        components: {
            ProjectItem
        },
        props: {
            // 项目对象
            data: {
                type: Object,
                default () {
                    return {
                        $$selected: false,
                        children: []
                    }
                }
            },// 配置参数
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
            // 返回当前点击部门对象数据
            itemSelect(node) {
              // 选中状态
                this.$emit('itemSelect', node)
                this.$forceUpdate()
            },
            // 返回当前点击部门对象数据
            itemNodeSelect(node) {
                // 选中状态
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
            }
        },
        mounted() {
          var projectQueryFun = this.options.isAuthData ? Component.api.project.infoQuery : Component.api.project.query;
          projectQueryFun({
            projectName: this.searchText,
            isSubCompanyProject: this.options.isSubCompanyProject,
            isIncludeCreatorProject: this.options.isIncludeCreatorProject,
            isEnabled: true
          }).then((projects) => {
            this.data.projects = projects
          });
        }
    }
</script>
<style lang="less" scoped>
    .gcb-project-tree {
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
