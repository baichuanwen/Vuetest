<template>
    <ul class="gcb-deparment-tree">
        <li class="tree-item">
            <div class="tree-header" @click="itemSelect" :class="{'active': data.id === selectitem.id}">
                <Icon type="android-list" size="18" color="#248bfe"></Icon>
                <span v-if="data.departmentType !== 1">{{data.departmentName}}</span>
                <span v-if="data.departmentType === 1"><b>{{data.departmentName}}</b></span>
            </div>
            <DepartmentItem v-for="(item,i) in data.children" :key="i" :data="item" :selectitem="selectitem" @itemSelect="itemNodeSelect"></DepartmentItem>
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
            data: {
                type: Object,
                default () {
                    return {
                        id: '',
                        children: []
                    }
                }
            },
            selectitem: {
                type: Object
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