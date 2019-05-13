<template>
   <ul class="gcb-deparment-tree">
      <li class="tree-item">
        <!--单选-->
          <div class="tree-header" v-if="!options.multiple" @click="itemSelect(data)" :data-id="data.id"  :class="{'active': data.id === selectitem.id}">
              <span v-if="data.children.length" @click="itemExpand">
                  <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
                  <i v-if="data.$$expand" class="fa fa-minus-square"></i>
              </span>
              <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
              <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
          </div>
        <!--多选-->
          <div class="tree-header" v-if="options.multiple" :data-id="data.id"  :class="{'active': data.id === selectitem.id}">
                <span v-if="data.children.length || options.multiple" @click="itemExpand">
                    <i v-if="!data.$$expand" class="fa fa-plus-square"></i>
                    <i v-if="data.$$expand" class="fa fa-minus-square"></i>
                </span>
                    <i v-if="selectitem[data.id] && options.multiple" class="fa fa-check-square" @click="itemSelect(data)"></i>
                    <i v-if="!selectitem[data.id] && options.multiple" class="fa fa-square" @click="itemSelect(data)" style="color: #ccc"></i>
            <span v-if="data.departmentType !== 1" @click="itemExpand">{{data.departmentName}}</span>
            <span v-if="data.departmentType === 1" @click="itemExpand"><b>{{data.departmentName}}</b></span>
          </div>
          <department-item v-for="(item,i) in data.children" :key="i" :data="item" :options="options" :selectitem="selectitem" @itemSelect="itemSelect" v-show="data.$$expand"></department-item>
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
                        $selected:false,
                        id: '',
                        children: []
                    }
                }
            },
            // 配置参数
            options: {
              type: Object,
              default () {
                return {
                  multiple: false
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
              if (this.options.multiple) {
                this.data.$selected = !this.data.$selected
              }
              this.$emit('itemSelect', node)
              this.$forceUpdate()
            },
            itemNodeSelect(data){
              const self = this
              data.$selected = !data.$selected
              // this.$emit('itemSelect', data)
              this.$forceUpdate()
            }
        },
        mounted(){
          if(this.selectitem){
            if(this.selectitem[this.data.id]){
              this.$set(this.data, '$selected', true)
            }
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
